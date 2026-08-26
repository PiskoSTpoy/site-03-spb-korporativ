import type { Metadata } from "next";
import Link from "next/link";

const title = "Страница не найдена — КРАН-СПБ";
const description = "Такой страницы на сайте нет. Разделы: для закупок, объекты и спецификации, парк техники, география работ в Санкт-Петербурге.";

export const metadata: Metadata = { title, description, robots: { index: false, follow: true } };

/*
  Волна 126. Было: заголовок по центру и пять ОДИНАКОВЫХ залитых кнопок
  в ряд — пять первичных действий сразу, то есть ни одного первичного,
  плюс единственная страница сайта с центрированной вёрсткой, выпадавшая
  из общей левой оси документа.
  Стало: та же грамматика, что у оглавления главной (.doc-toc) — перечень
  разделов с номерами-клаузулами, — и ровно одно первичное действие.
  Ни одного нового компонента: используются уже существующие классы.
*/
const sections = [
  { href: "/dlya-zakupok/", label: "Для закупок: договор, аккредитация, приёмка" },
  { href: "/obekty/", label: "Объекты и спецификации подачи" },
  { href: "/park/", label: "Парк техники: технические листы" },
  { href: "/geo/", label: "География: районы Петербурга" },
  { href: "/documents/", label: "Допуски и документы" },
  { href: "/faq/", label: "Вопросы" },
];

export default function NotFound() {
  return (
    <main>
      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Ошибка 404</span>
          <h1>Такой страницы нет</h1>
          <p>Ссылка устарела или в адресе опечатка. Ниже — все разделы сайта; прайс-лист
            и форма запроса КП находятся на главной.</p>
        </div>
        <div style={{ marginBottom: 32 }}>
          <Link className="btn" href="/">Открыть главную с прайс-листом</Link>
        </div>
        <nav className="doc-toc" aria-label="Разделы сайта">
          <span className="doc-toc__eyebrow">Разделы сайта</span>
          <ol className="doc-toc__list">
            {sections.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>
                  <span className="doc-toc__num" aria-hidden="true" />
                  <span className="doc-toc__label">{s.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </main>
  );
}
