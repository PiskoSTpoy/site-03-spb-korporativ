/*
  emit-redirects.mjs — выпускает 301-редиректы для СТАТИЧЕСКОЙ сборки (out/).

  Зачем он существует. С переходом на output: "export" функция redirects()
  в next.config.ts перестаёт применяться к выгружаемым файлам: Next её просто
  игнорирует, без ошибки. Все 23 старых URL из redirects.json начали бы отдавать
  404 — то есть включение экспорта «как есть» сломало бы то, что работало.

  Что делает скрипт. Из одного источника (redirects.json) выпускает два
  независимых механизма, чтобы не зависеть от того, куда сайт в итоге поедет:

    1. out/_redirects — формат Cloudflare Pages и Netlify. Это НАСТОЯЩИЕ
       HTTP 301: браузер и поисковик получают статус, вес старого URL
       передаётся преемнику полностью. Предпочтительный путь.

    2. HTML-заглушки out/<старый-url>/index.html — meta refresh + noindex +
       canonical на преемника + видимая ссылка. Работают на ЛЮБОМ статическом
       хостинге, включая тот, который про _redirects ничего не знает.
       Передают вес хуже, чем 301, поэтому это запасной путь, а не основной.

  Почему оба, а не один. Площадка деплоя для site-03 ещё не выбрана (боевого
  домена нет). Механизмы не конфликтуют: если хостинг понимает _redirects,
  посетитель получает 301 и до заглушки не доходит; если не понимает —
  отрабатывает заглушка. Худший случай — «фоллбэк вместо 301», а не 404.

  Заглушка намеренно оформлена так, чтобы её нельзя было принять за страницу
  сайта: noindex,nofollow в robots, canonical на преемника, никакой навигации
  и никакого контента, кроме одной ссылки «перейти вручную» (нужна, если
  у посетителя выключен JS и meta refresh заблокирован расширением).
  tools/site_audit.py отдельно проверяет, что у каждой такой заглушки есть
  noindex, а tools/rubric_lint.py исключает их из числа страниц сайта.
*/

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const outDir = join(appRoot, "out");

const { redirects } = JSON.parse(readFileSync(join(appRoot, "redirects.json"), "utf8"));

/** Абсолютный адрес сайта нужен заглушкам для canonical. */
const SITE = readFileSync(join(appRoot, "app", "site-data.ts"), "utf8")
  .match(/export const SITE = "([^"]+)"/)?.[1];
if (!SITE) throw new Error("Не удалось прочитать SITE из app/site-data.ts");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ── 1. out/_redirects ─────────────────────────────────────────────────────
// Пишем оба написания источника — со слешем на конце и без. У сайта включён
// trailingSlash: true, каноническая форма — со слешем, но входящая ссылка
// из старого индекса может быть какой угодно, и правило должно ловить обе.
const lines = [
  "# Сгенерировано scripts/emit-redirects.mjs из redirects.json — руками не править.",
  "# Формат понимают Cloudflare Pages и Netlify. Это настоящие HTTP 301.",
  "# На хостинге, который этот файл игнорирует, срабатывают HTML-заглушки",
  "# с meta refresh, выпущенные тем же скриптом.",
  "",
];
for (const r of redirects) {
  const src = r.source.replace(/\/$/, "");
  const code = r.statusCode ?? 301;
  lines.push(`${src}  ${r.destination}  ${code}`);
  lines.push(`${src}/  ${r.destination}  ${code}`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "_redirects"), lines.join("\n") + "\n", "utf8");

// ── 2. HTML-заглушки ──────────────────────────────────────────────────────
let stubs = 0;
for (const r of redirects) {
  const src = r.source.replace(/^\//, "").replace(/\/$/, "");
  const target = r.destination;
  const abs = SITE.replace(/\/$/, "") + target;
  const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<link rel="canonical" href="${esc(abs)}">
<title>Страница переехала</title>
</head>
<body>
<p>Страница переехала на <a href="${esc(target)}">${esc(abs)}</a>.</p>
</body>
</html>
`;
  const dir = join(outDir, src);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
  stubs += 1;
}

console.log(`emit-redirects: _redirects (${redirects.length} правил) + ${stubs} HTML-заглушек`);
