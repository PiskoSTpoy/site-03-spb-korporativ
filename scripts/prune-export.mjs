/*
  prune-export.mjs — убирает из out/ лишние копии страницы 404.

  Что происходит без него. При output: "export" вместе с trailingSlash: true
  Next кладёт одну и ту же страницу «не найдено» в ТРИ места:
      out/404.html          ← это и есть страница ошибки для статического хостинга
      out/404/index.html    ← побочный эффект trailingSlash
      out/_not-found/index.html ← внутреннее имя маршрута App Router

  Для хостинга полезен только первый файл: Cloudflare Pages, Netlify и GitHub
  Pages отдают на несуществующий адрес именно out/404.html. Два других — просто
  доступные по своим URL дубли, и они не безобидны:
    · один и тот же title и description на трёх адресах — прямой дубль;
    · «_not-found» — служебный слаг с подчёркиванием, попадающий в проверку
      формата URL;
    · страница, на которую нет ни одной внутренней ссылки, читается как
      осиротевшая, и в отчёте линтера она неотличима от настоящей потерянной
      страницы — то есть шумит там, где должен быть сигнал.

  Файл 404.html при этом остаётся нетронутым: он и должен существовать.
*/

import { rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "out");

const removed = [];
for (const dir of ["404", "_not-found"]) {
  const p = join(outDir, dir);
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true });
    removed.push(`out/${dir}/`);
  }
}

if (!existsSync(join(outDir, "404.html"))) {
  throw new Error("out/404.html не найден — удалять дубли 404 нельзя, страница ошибки пропала бы совсем");
}

console.log(`prune-export: удалены дубли страницы 404 (${removed.join(", ") || "нечего удалять"}); out/404.html на месте`);
