/*
  emit-sitemap.mjs — собирает sitemap.xml из фактического дерева маршрутов
  и проставляет lastmod по РЕАЛЬНОМУ изменению содержимого страницы.

  ── Что было не так ────────────────────────────────────────────────────────
  public/sitemap.xml вёлся руками: список URL мог разойтись с деревом app/,
  а lastmod не было вовсе. Соблазн «поставить дату сборки» здесь вреднее,
  чем отсутствие тега: Google учитывает lastmod, только пока тот последовательно
  и проверяемо точен, и одинаковая дата у всех сорока с лишним страниц
  обесценивает сигнал сразу для всего домена.

  ── Почему не mtime исходника ──────────────────────────────────────────────
  Первая версия этого скрипта брала mtime файла app/<route>/page.tsx. Это лучше
  даты сборки, но ломается двумя очень обычными способами:
    · свежий `git clone` выставляет всем файлам время клонирования — и первая
      же сборка после него объявляет весь сайт изменённым одномоментно;
    · правка, которая не меняет ни одного слова на странице (переименовали
      переменную, добавили комментарий, прогнали форматтер), двигает mtime и
      врёт поисковику о свежести.
  Оба случая — не гипотетические: этот сайт получил canonical и og:image
  скриптом сразу во все страницы, и mtime у сорока пяти файлов немедленно стал
  одинаковым, хотя часть правок вообще не касалась видимого текста.

  ── Как считается сейчас ───────────────────────────────────────────────────
  lastmod хранится в sitemap-lastmod.json рядом с проектом и обновляется только
  тогда, когда изменился ОТПЕЧАТОК СОДЕРЖИМОГО страницы: <title>, description,
  микроразметка JSON-LD и всё, что внутри <main>. Служебное — адреса чанков
  с хешами, инлайн-payload React, шапка и подвал — из отпечатка вычищается:
  смена версии Next или правка подвала не должна объявлять «изменились все
  45 страниц».

  Отсюда два практических следствия:
    · две сборки подряд без правок контента дают побайтово одинаковый
      sitemap.xml — контроль, который можно запустить руками;
    · дата переживает `git clone`, потому что живёт в файле, а не в файловой
      системе. Файл обязан попадать в репозиторий: удалить его — значит
      обнулить историю и объявить сайт изменённым целиком.

  Честная оговорка, которую стоит знать при чтении текущего sitemap.xml:
  манифест заведён в ту же волну, что и правки canonical/og:image/оговорки
  про оферту, то есть в сборку, где содержимое изменилось действительно у всех
  страниц. Поэтому в ПЕРВОМ выпуске у всех 45 адресов одна дата — и это не
  дата сборки, а честная дата их общей правки. Разойтись даты смогут начиная
  со следующей частичной правки.
*/

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const appDir = join(appRoot, "app");
const outDir = join(appRoot, "out");
const publicDir = join(appRoot, "public");
const manifestPath = join(appRoot, "sitemap-lastmod.json");

const SITE = readFileSync(join(appDir, "site-data.ts"), "utf8")
  .match(/export const SITE = "([^"]+)"/)?.[1];
if (!SITE) throw new Error("Не удалось прочитать SITE из app/site-data.ts");
const origin = SITE.replace(/\/$/, "");

/** Обход app/ в поисках page.tsx. Служебные каталоги пропускаем. */
function routes(dir, prefix = "") {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "components" || entry.name.startsWith("_")) continue;
    const sub = join(dir, entry.name);
    const url = `${prefix}/${entry.name}`;
    if (existsSync(join(sub, "page.tsx"))) found.push(`${url}/`);
    found.push(...routes(sub, url));
  }
  return found;
}

const all = [];
if (existsSync(join(appDir, "page.tsx"))) all.push("/");
all.push(...routes(appDir));

/**
 * Отпечаток содержимого страницы по собранному HTML.
 * Берём то, что видит и индексирует поисковик, и выбрасываем то, что меняется
 * от сборки к сборке или общее для всего сайта.
 */
function fingerprint(url) {
  const file = join(outDir, url === "/" ? "index.html" : join(url, "index.html"));
  if (!existsSync(file)) return null;
  let html = readFileSync(file, "utf8");

  // Инлайн-payload React: то же содержимое во второй раз, но с внутренними
  // идентификаторами, которые прыгают между сборками.
  html = html.replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, "");
  // Адреса ассетов с контент-хешами: смена версии Next не есть правка страницы.
  html = html.replace(/\/_next\/static\/[^"']+/g, "/_next/");
  /*
    Домен сайта из отпечатка тоже вычищается. Он стоит в canonical, og:url и
    в каждом узле JSON-LD, то есть общий для всех страниц разом — ровно та
    категория, которую шапка этого файла велит из отпечатка выбрасывать.
    Без этой строки первая же смена домена (переезд с плейсхолдера на боевой
    адрес) меняет отпечаток у всех сорока пяти страниц одномоментно, и карта
    сайта объявляет правку всего домена в один и тот же миг — тот самый
    дефект, из-за которого выше уже выброшены хеши ассетов и inline-payload.
  */
  html = html.split(origin).join("");

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const ld = (html.match(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? []).join("");
  let main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";

  /*
    Волна 126. Оформительские атрибуты из отпечатка вычищаются.

    ПОЧЕМУ. Шапка этого файла с самого начала утверждает: «правка, которая
    не меняет ни одного слова на странице, двигает дату и врёт поисковику
    о свежести». Ровно это и произошло в волне визуальной полировки: ни одного
    слова текста не изменилось, но inline-стили вёрстки переехали в классы CSS —
    и отпечаток сменился у всех 45 страниц разом, то есть карта сайта объявила
    одномоментную правку всего домена. Тот же дефект, из-за которого автор
    скрипта отказался от mtime, просто зашедший с другой стороны.

    ЧТО ИМЕННО СНИМАЕТСЯ. Только class и style — атрибуты, не несущие ни текста,
    ни смысла для индексации. alt, aria-*, href, scope, datetime, width/height
    в отпечатке остаются: их правка — это правка содержания.
  */
  main = main.replace(/\s(?:class|style)="[^"]*"/g, "");

  return createHash("sha256").update([title, desc, ld, main].join(" ")).digest("hex").slice(0, 16);
}

/** W3C Datetime — формат, который читают и Google, и Яндекс. */
function w3c(date) {
  const pad = (n, w = 2) => String(Math.abs(n)).padStart(w, "0");
  const off = -date.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${sign}${pad(Math.floor(Math.abs(off) / 60))}:${pad(Math.abs(off) % 60)}`
  );
}

const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { _comment: "lastmod страниц по отпечатку содержимого. Ведёт scripts/emit-sitemap.mjs — руками не править, из репозитория не удалять.", pages: {} };
manifest.pages ??= {};

/** Прежние changefreq/priority — чтобы правка касалась только lastmod. */
const prev = new Map();
const prevPath = join(publicDir, "sitemap.xml");
if (existsSync(prevPath)) {
  for (const m of readFileSync(prevPath, "utf8").matchAll(/<url>(.*?)<\/url>/gs)) {
    const loc = m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc) continue;
    prev.set(loc.replace(origin, "") || "/", {
      changefreq: m[1].match(/<changefreq>([^<]+)<\/changefreq>/)?.[1],
      priority: m[1].match(/<priority>([^<]+)<\/priority>/)?.[1],
    });
  }
}

function fallbackMeta(url) {
  const depth = url.split("/").filter(Boolean).length;
  if (depth === 0) return { changefreq: "weekly", priority: "1.0" };
  if (depth === 1) return { changefreq: "monthly", priority: "0.8" };
  return { changefreq: "monthly", priority: "0.6" };
}

const now = w3c(new Date());
let changed = 0;
all.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];
for (const url of all) {
  const hash = fingerprint(url);
  if (hash === null) {
    console.warn(`emit-sitemap: нет собранного HTML для ${url} — пропущен`);
    continue;
  }
  const rec = manifest.pages[url];
  if (!rec || rec.hash !== hash) {
    manifest.pages[url] = { hash, lastmod: now };
    changed += 1;
  }
  const meta = prev.get(url) ?? fallbackMeta(url);
  lines.push(
    `  <url><loc>${origin}${url}</loc><lastmod>${manifest.pages[url].lastmod}</lastmod>` +
      `<changefreq>${meta.changefreq ?? "monthly"}</changefreq>` +
      `<priority>${meta.priority ?? "0.6"}</priority></url>`,
  );
}
lines.push("</urlset>", "");
const xml = lines.join("\n");

// Адреса, которых в дереве больше нет, из манифеста убираем — иначе он копит
// мусор и однажды его нельзя будет прочитать глазами.
for (const url of Object.keys(manifest.pages)) {
  if (!all.includes(url)) delete manifest.pages[url];
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), xml, "utf8");
if (existsSync(outDir)) writeFileSync(join(outDir, "sitemap.xml"), xml, "utf8");

const stamps = new Set(xml.match(/<lastmod>[^<]+<\/lastmod>/g));
console.log(
  `emit-sitemap: ${all.length} URL, обновлён lastmod у ${changed}, различных значений ${stamps.size}`,
);
