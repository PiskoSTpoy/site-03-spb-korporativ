/*
  make-og-image.mjs — единая карточка для соцсетей и мессенджеров.

  Зачем. site_audit.py помечал «нет og:image» на всех 45 страницах: og:title и
  og:description проставлены давно, а картинки не было. Ссылка на сайт в письме,
  Телеграме или Тимсе разворачивается в карточку без изображения — то есть в
  переписке отдела закупок выглядит как ссылка без превью.

  Почему картинка сгенерирована, а не снята. На сайте нет ни одной фотографии
  НАШЕЙ техники — все три фото честно подписаны «фото модели, не единица нашего
  парка». Ставить такое фото в карточку с названием компании значит намекать,
  что на нём наша машина. Поэтому карточка типографская: название, предмет
  и география — ровно те факты, которые уже стоят в <h1> главной, и ни одного
  нового утверждения (ни парка, ни стажа, ни рейтинга).

  Размер 1200×630 — минимум, который Telegram, VK, WhatsApp и Open Graph
  показывают крупной карточкой, а не мелким значком. Палитра — из globals.css,
  без новых цветов. Файл кладётся в public/ один и на весь сайт.
*/

import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const siteData = readFileSync(join(appRoot, "app", "site-data.ts"), "utf8");

const BRAND = siteData.match(/export const BRAND = "([^"]+)"/)?.[1];
if (!BRAND) throw new Error("Не удалось прочитать BRAND из app/site-data.ts");

const INK = "#0B1C2C";
const ACCENT = "#1F5C8B";
const LINE = "#DDE3E8";
const MUTED = "#8FA3B0";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${ACCENT}"/>
  <g font-family="Segoe UI, Arial, Helvetica, sans-serif">
    <text x="80" y="150" fill="${ACCENT}" font-size="26" font-weight="700" letter-spacing="6">САНКТ-ПЕТЕРБУРГ</text>
    <text x="80" y="270" fill="#FFFFFF" font-size="86" font-weight="800" letter-spacing="-2">${BRAND}</text>
    <text x="80" y="360" fill="#FFFFFF" font-size="42" font-weight="600">Аренда автокрана 25–130 тонн с экипажем</text>
    <line x1="80" y1="430" x2="1120" y2="430" stroke="${LINE}" stroke-opacity="0.25" stroke-width="2"/>
    <text x="80" y="492" fill="${MUTED}" font-size="30">Открытый прайс · допуски и пропуска · документы в закупку</text>
    <text x="80" y="546" fill="${MUTED}" font-size="30">Порт, намыв, промзона, объекты под охраной КГИОП</text>
  </g>
</svg>`;

/*
  Кладём в app/opengraph-image.png, а не в public/. Это файловая конвенция
  App Router: Next сам проставляет og:image и twitter:image со всеми размерами
  на КАЖДУЮ страницу сегмента, включая новые, — иначе пришлось бы дописывать
  openGraph.images в metadata сорока пяти страниц и не забыть про сорок шестую.
  Подпись к картинке лежит рядом в app/opengraph-image.alt.txt.
*/
const out = join(appRoot, "app", "opengraph-image.png");
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`make-og-image: app/opengraph-image.png 1200×630, ${(statSync(out).size / 1024).toFixed(0)} КБ`);
