// Патч под скилл seo-2026-playbook: id на H2 + серверный (не клиентский) TOC.
//
// ПОПЫТКА вставить новый <nav class="g26-toc"> в статический HTML — ОТКАЧЕНО
// 25.09.2026. Гипотеза была: раз в кодовой базе нет 'use client' компонентов
// на страницах контента (grep не нашёл), то вставка нового узла в HTML не
// столкнётся с клиентской гидратацией. Гипотеза оказалась НЕВЕРНОЙ: Next.js
// 16 гидратирует весь дерево статического экспорта на клиенте независимо от
// того, есть ли в дереве интерактивные 'use client' острова — живая проверка
// в браузере показала `Uncaught ... Minified React error #418` (hydration
// failed) на странице с вставленным TOC. Тот же класс бага, что на manipmo.ru
// (Vue), только с другим движком. Оставлен только id на H2 — это атрибут на
// уже существующем узле, не новый узел, и живьём проверено, что консоль с
// ним чистая (см. STATUS.md).
//
// Запуск: node scripts/geo2026-postbuild.mjs (добавлено последним в
// package.json → postbuild, после prune-export/emit-redirects/emit-sitemap).
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const TR = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};
const stripTags = (s) => s.replace(/<[^>]+>/g, "");
function slugify(text) {
  const lower = stripTags(text).toLowerCase();
  let out = "";
  for (const ch of lower) {
    if (TR[ch] !== undefined) out += TR[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
    else out += "-";
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function patchOne(path) {
  let html = readFileSync(path, "utf8");
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) return false;
  let main = m.group ? m.group(1) : m[1];
  const used = new Set();
  const items = [];
  let changed = false;

  main = main.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (full, attrs, text) => {
    let id;
    const idm = attrs.match(/id="([^"]*)"/);
    if (idm) {
      id = idm[1];
    } else {
      const base = slugify(text);
      id = base;
      let i = 2;
      while (used.has(id)) id = `${base}-${i++}`;
      attrs = ` id="${id}"${attrs}`;
      changed = true;
    }
    used.add(id);
    items.push({ id, text: stripTags(text).trim() });
    return `<h2${attrs}>${text}</h2>`;
  });

  if (!changed) return false;
  html = html.slice(0, m.index) + `<main${m[0].match(/<main([^>]*)>/)[1]}>` + main + "</main>" + html.slice(m.index + m[0].length);
  writeFileSync(path, html, "utf8");
  return true;
}

const files = walk(OUT);
let n = 0;
for (const f of files) if (patchOne(f)) n++;
console.log(`geo2026-postbuild: обработано ${files.length} файлов, изменено ${n}`);
