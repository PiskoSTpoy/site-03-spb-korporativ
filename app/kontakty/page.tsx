import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE, SITE, BRAND, PHONE_HREF, PHONE_TEXT, FACT_CHECK, DISTRICTS } from "../site-data";

/*
  Волна приёмки (26.08.2026). Страницы контактов на сайте не было вообще:
  телефон стоял в шапке, подвале и мобильной панели, но отдельного документа
  «с кем и как связаться» не существовало, и критерий yc-contacts-page-linked
  падал на «страницы контактов нет».

  Что здесь можно и чего нельзя. Телефон, охват по районам и способ связи —
  это то, что на сайте уже опубликовано, поэтому они здесь просто собраны
  в одном месте. Реквизиты юридического лица (наименование, ИНН, ОГРН,
  юридический адрес) и боевой домен — данные заказчика, которых не существует;
  выдумывать правдоподобные значения запрещено правилами сети, поэтому строки
  таблицы честно пустые с пометкой «заполняется при запуске». Ровно та же
  оговорка уже стоит на главной под прайсом, так что страница не противоречит
  остальному сайту.
*/

const title = "Контакты — КРАН-СПБ, аренда автокрана в Петербурге";
const description =
  "Телефон, форма запроса КП и охват по районам Санкт-Петербурга. Реквизиты юридического лица не опубликованы: сайт демонстрационный.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/kontakty/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Контакты", item: `${SITE}/kontakty/` },
  ],
};
/*
  Узел организации на странице НЕ дублируем: он один на весь сайт и живёт
  в app/layout.tsx с идентификатором «#organization». Здесь только ссылка
  на него по @id — иначе на странице оказались бы два узла организации,
  то есть заявление о двух разных юридических лицах.
*/
const contactLd = {
  "@context": "https://schema.org", "@type": "ContactPage",
  name: title,
  url: `${SITE}/kontakty/`,
  inLanguage: "ru-RU",
  mainEntity: { "@id": `${SITE}/#organization` },
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><span>Контакты</span>
      </nav>

      <section className="section wrap prose section--open measure">
        <span className="eyebrow">Контакты</span>
        <h1>Как с нами связаться</h1>
        <p>
          Быстрее всего — по телефону {PHONE_TEXT}: на срочной заявке важнее назвать адрес объекта,
          вес и вылет, чем заполнить все поля формы. Если заявка идёт через закупку и нужен документ на юрлицо,
          удобнее форма — из неё сразу приходит спецификация, прайс по классу техники и проект
          договора с приложениями.
        </p>

        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Способы связи</caption>
            <tbody>
              <tr>
                <th scope="row">Телефон</th>
                <td><a href={PHONE_HREF}>{PHONE_TEXT}</a></td>
              </tr>
              <tr>
                <th scope="row">Запрос коммерческого предложения</th>
                <td><Link href="/#kp">форма на главной</Link> — ИНН проверяется по контрольной цифре прямо в форме</td>
              </tr>
              <tr>
                <th scope="row">Приём заявок</th>
                <td>круглосуточно, без выходных — телефон и форма работают без графика</td>
              </tr>
              <tr>
                <th scope="row">Регион работы</th>
                <td>Санкт-Петербург, {DISTRICTS.length} районов со своей логистикой подачи — <Link href="/geo/">раздел «География»</Link></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Реквизиты</h2>
        <p>
          Реквизитов на этой странице нет — не потому, что их скрывают, а потому что их пока не
          существует: сайт демонстрационный, юридическое лицо не зарегистрировано, боевой домен
          не подключён. Правдоподобные выдуманные ИНН и ОГРН здесь не стоят и не появятся:
          проверить их всё равно нельзя, а выглядели бы они как настоящие.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Сведения об организации</caption>
            <tbody>
              <tr><th scope="row">Наименование</th><td>{BRAND} <span className="ph">рабочее название проекта; фирменное наименование заполняется при регистрации</span></td></tr>
              <tr><th scope="row">ИНН / ОГРН</th><td>—<span className="ph">заполняется при регистрации юридического лица</span></td></tr>
              <tr><th scope="row">Юридический адрес</th><td>—<span className="ph">заполняется при регистрации юридического лица</span></td></tr>
              <tr><th scope="row">Электронная почта</th><td>—<span className="ph">заполняется при публикации на боевом домене</span></td></tr>
              <tr><th scope="row">Адрес сайта</th><td>—<span className="ph">боевой домен не выбран</span></td></tr>
            </tbody>
          </table>
        </div>

        <h2>Персональные данные</h2>
        <p>
          Форма запроса КП передаёт заполненные поля на сервер приёма заявок, то есть персональные
          данные обрабатываются по-настоящему, а не в демонстрационном режиме. Что именно
          собирается, зачем и как это прекратить — два отдельных документа:{" "}
          <Link href="/politika-obrabotki-personalnyh-dannyh/">политика обработки персональных
          данных</Link> и{" "}
          <Link href="/soglasie-na-obrabotku-personalnyh-dannyh/">согласие на обработку персональных
          данных</Link>. Разделение обязательно с 1 сентября 2025 года: согласие оформляется
          отдельно от иных документов оператора.
        </p>

        <p className="price-note">
          Сведения на странице сверены с первоисточниками {FACT_CHECK}.
        </p>
      </section>
    </main>
  );
}
