/*
  make-webp.mjs — обход public/images и выпуск WebP-двойников.

  Зачем. Критерий img-modern-formats падал на «4 растровых изображения, ни
  одного WebP», а критерий page-weight-budget — на park-hero.jpg (447 КБ при
  бюджете 300 КБ на изображение). Разметка после этого скрипта отдаёт WebP
  через <picture><source type="image/webp">, а исходный JPEG остаётся в <img>
  как запасной вариант — атрибуты width/height и alt у него не трогаются.

  Два правила, которые здесь соблюдены буквально:

  1. Если WebP получился НЕ меньше оригинала (так бывает на схемах и на уже
     сильно пережатых JPEG), он удаляется и в разметке остаётся только
     оригинал. Отдавать более тяжёлый «современный формат» — это отрицательная
     оптимизация с красивым названием.

  2. park-hero.jpg пересобран из самого себя в 1440×960 вместо 1920×1280.
     Причина не косметическая: контейнер страницы шире 1180 CSS-пикселей не
     бывает (--maxw), то есть 1920 — это полтора экрана мимо кассы, и ни при
     каком качестве JPEG в 300 КБ на этой ширине не помещался (замер: q68
     давал 314 КБ, а WebP q68 — 268 КБ при заметной потере детали).
     Пропорция 3:2 сохранена, поэтому width/height в разметке меняются
     согласованно и сдвига макета не возникает. Повторный прогон уже
     обработанного файла — повторное JPEG-сжатие, поэтому шаг ресайза
     выполняется только если файл ещё шире 1440 (см. RESIZE ниже).

  Поставщик исходников и лицензии не меняются: файлы те же, что были,
  просто в другом размере и с WebP-двойником рядом.
*/

import sharp from "sharp";
import { readdirSync, statSync, existsSync, unlinkSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, extname, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const imagesDir = join(appRoot, "public", "images");

/** Файлы, которые нужно ужать до указанной ширины, если они шире. */
const RESIZE = { "hero/park-hero.jpg": 1440 };

const RASTER = new Set([".jpg", ".jpeg", ".png"]);
const kb = (n) => `${(n / 1024).toFixed(0)} КБ`;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (RASTER.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

for (const file of walk(imagesDir)) {
  const rel = relative(imagesDir, file).replace(/\\/g, "/");

  const targetWidth = RESIZE[rel];
  if (targetWidth) {
    const meta = await sharp(file).metadata();
    if (meta.width > targetWidth) {
      const before = statSync(file).size;
      const buf = await sharp(file)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true })
        .toBuffer();
      await sharp(buf).toFile(file + ".tmp");
      renameSync(file + ".tmp", file);
      const after = await sharp(file).metadata();
      console.log(
        `resize ${rel}: ${meta.width}×${meta.height} ${kb(before)} → ` +
          `${after.width}×${after.height} ${kb(statSync(file).size)}`,
      );
    }
  }

  const webp = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const buf = await sharp(file).webp({ quality: 80 }).toBuffer();
  const originalSize = statSync(file).size;

  if (buf.length >= originalSize) {
    if (existsSync(webp)) unlinkSync(webp);
    console.log(`skip   ${rel}: webp ${kb(buf.length)} не меньше оригинала ${kb(originalSize)}`);
    continue;
  }
  await sharp(buf).toFile(webp);
  console.log(
    `webp   ${rel}: ${kb(originalSize)} → ${kb(statSync(webp).size)} ` +
      `(−${Math.round((1 - statSync(webp).size / originalSize) * 100)} %)`,
  );
}
