import { SITE, BRAND, EDITORIAL } from "../site-data";
import { isoDate } from "./Sources";

/*
  Волна 147. Мета-строка и оглавление для страниц, свёрстанных по скелету
  статьи seo-2026-playbook (§1): автор-организация, дата публикации в <time>,
  дата сверки фактов и TOC по H2.

  Почему компонент, а не постбилд-вставка: попытка 25.09.2026 вставлять
  <nav> в готовый HTML скриптом дала React error #418 — Next 16 гидратирует
  всё дерево статического экспорта, и узел, которого не было в SSR, ломает
  гидратацию (см. app/STATUS.md). Здесь TOC — часть исходного React-дерева,
  клиент получает ровно ту разметку, которую ожидает.

  Мета-строка — <div>, а не <p>: первый <p> страницы должен быть прямым
  ответом (intro), а не подписью.
*/

export interface TocItem {
  id: string;
  label: string;
}

interface Props {
  /** Дата публикации, ISO ГГГГ-ММ-ДД. */
  published: string;
  /** Дата сверки фактов строкой из site-data (FACT_CHECK_W…). */
  checked: string;
  toc: TocItem[];
}

function ruShort(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function ArticleHead({ published, checked, toc }: Props) {
  const checkedIso = isoDate(checked);
  return (
    <>
      <div className="g26-meta">
        <span>{EDITORIAL}</span>
        <span aria-hidden="true">·</span>
        <span>опубликовано <time dateTime={published}>{ruShort(published)}</time></span>
        <span aria-hidden="true">·</span>
        <span>факты проверены {checkedIso ? <time dateTime={checkedIso}>{ruShort(checkedIso)}</time> : checked}</span>
      </div>
      {toc.length >= 3 && (
        <nav className="g26-toc" aria-label="Содержание">
          <b>Содержание</b>
          <ol>
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}

/** JSON-LD Article: автор и издатель — одна организация из layout.tsx. */
export function articleLd(opts: { headline: string; description: string; canonical: string; published: string; modified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: "ru-RU",
    datePublished: opts.published,
    dateModified: opts.modified ?? opts.published,
    author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: BRAND, url: SITE },
    publisher: { "@type": "Organization", "@id": `${SITE}/#organization`, name: BRAND },
    mainEntityOfPage: `${SITE}${opts.canonical}`,
  };
}
