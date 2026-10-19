import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W208, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 208. Восемьдесят седьмой тип объекта — замена стального каната на автокране (ФНП № 461, п. 191–194). Фактура — в комментарии к FACT_CHECK_W208–210
  в app/site-data.ts.
*/

const title = "Замена каната на автокране: что проверить до подачи";
const description =
  "ФНП № 461 (п. 191): новый канат — по паспорту, с сертификатом изготовителя; после замены — проверка запасовки и обтяжка грузом, запись в паспорте.";
const h1 = "Что проверить перед подачей, если на кране заменили стальной канат?";
const canonical = "/obekty/zamena-kanata-na-krane-pered-podachey/";
const published = "2026-10-19";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-trebuet-p191", label: "Что требует пункт 191" },
  { id: "dokumenty", label: "Какие документы запросить" },
  { id: "obtyazhka", label: "Запасовка и обтяжка грузом" },
  { id: "chego-net", label: "Чего пункты 191–194 не называют" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой канат можно ставить на автокран вместо изношенного?",
    a: "Канат, который по назначению, длине и диаметру соответствует паспорту, имеет коэффициент использования не ниже установленного для группы классификации механизма и сертификат изготовителя (п. 191 ФНП № 461). Канат без документов к использованию не допускается.",
  },
  {
    q: "Можно ли ставить канат зарубежного производства?",
    a: "Можно, если по назначению он подходит для технологии использования подъёмного сооружения, его диаметр равен диаметру заменяемого каната, а коэффициент использования не ниже установленного для группы классификации механизма (п. 191 ФНП № 461).",
  },
  {
    q: "Что делают с канатом сразу после замены?",
    a: "Проверяют правильность запасовки и надёжность крепления концов, затем обтягивают канат грузом паспортной номинальной грузоподъёмности и делают запись в паспорте. Запись вносит инженерно-технический работник, ответственный за содержание ПС в работоспособном состоянии (п. 191).",
  },
  {
    q: "Можно ли заменить канат крестовой свивки на канат односторонней свивки?",
    a: "Нет, пункт 191 ФНП № 461 прямо запрещает такую замену. Тип свивки KRANNEVA сверяет по сертификату каната при подготовке заявки.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Условия на дату после замены каната согласуются в заявке по документам.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Замена каната на кране", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с проверкой документов на замену стального каната",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  offers: {
    "@type": "Offer",
    businessFunction: "https://schema.org/LeaseOut",
    priceCurrency: "RUB",
    priceSpecification: { "@type": "UnitPriceSpecification", price: String(light.rate), priceCurrency: "RUB", unitText: "HOUR", valueAddedTaxIncluded: false },
  },
};
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const artLd = articleLd({ headline: h1, description, canonical, published });

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Замена каната на кране</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · замена каната</span>
          <h1>{h1}</h1>
          <p>
            Пункт 191 ФНП № 461 допускает на кран только канат, который соответствует паспорту по назначению, длине и диаметру и имеет сертификат изготовителя, а после замены требует проверить запасовку и обтянуть канат грузом паспортной номинальной грузоподъёмности. KRANNEVA в заявке на смену SANY STC400T или XCMG QY60K просит копию сертификата каната и запись об обтяжке в паспорте.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W208} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Замена стального каната по п. 191–194 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Что говорит ФНП</th>
                <th scope="col">Что просит KRANNEVA</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Каким должен быть новый канат</th><td>по назначению, длине и диаметру — как в паспорте; коэффициент использования не ниже, чем для группы классификации механизма (п. 191)</td><td>копию сертификата и марку каната</td></tr>
              <tr><th scope="row">Что с канатом без документов</th><td>к использованию не допускается (п. 191)</td><td>сертификат изготовителя каната до выезда</td></tr>
              <tr><th scope="row">Канат зарубежного производства</th><td>допускается при том же назначении, равном диаметре и не меньшем коэффициенте использования (п. 191)</td><td>подтверждение диаметра и коэффициента</td></tr>
              <tr><th scope="row">Свивка</th><td>замена крестовой свивки на одностороннюю запрещена (п. 191)</td><td>тип свивки в сертификате</td></tr>
              <tr><th scope="row">Что делают после замены</th><td>проверка запасовки и креплений концов, обтяжка грузом паспортной грузоподъёмности, запись в паспорте (п. 191)</td><td>страницу паспорта с записью</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA после замены каната</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>копия сертификата каната, страница паспорта с записью об обтяжке, дата замены</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-trebuet-p191">Что требует пункт 191</h2>
        <p>
          Пункт 191 ФНП № 461 задаёт три условия для нового каната: соответствие паспорту по назначению, длине и диаметру, коэффициент использования по разрывному усилию не ниже установленного для группы классификации механизма и сертификат предприятия-изготовителя. Канат без этих документов к использованию не допускается. KRANNEVA сверяет эти условия по документам, когда на объект подаётся SANY STC400T с недавно перепасованной лебёдкой. Отдельный запрет пункта касается замены крестовой свивки на одностороннюю.
        </p>

        <h2 id="dokumenty">Какие документы запросить</h2>
        <p>
          Сертификат каната — главный документ: по нему определяют разрывное усилие каната в целом, а пункт 193 разрешает при суммарном разрывном усилии проволок умножать его на коэффициент 0,83. Проверочный расчёт использует три величины — разрывное усилие по сертификату, минимальный коэффициент использования из приложения № 1 и наибольшее натяжение ветви из паспорта. XCMG QY60K и другие краны парка KRANNEVA проходят эту проверку у эксплуатирующей организации, а арендатору достаточно копий. Про отметки в паспорте есть страница <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">про техническое освидетельствование в паспорте</Link>.
        </p>

        <h2 id="obtyazhka">Запасовка и обтяжка грузом</h2>
        <p>
          После замены изношенных грузовых и стреловых канатов, а также при любой перепасовке пункт 191 требует проверить правильность запасовки и надёжность крепления концов, затем обтянуть канат грузом, соответствующим паспортной номинальной грузоподъёмности. Запись в паспорт вносит инженерно-технический работник, ответственный за содержание ПС в работоспособном состоянии. Крепление нового каната по пункту 192 остаётся таким же, как у прежнего. Как организован испытательный груз, показано на странице <Link href="/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/">про площадку для испытаний</Link>.
        </p>

        <h2 id="chego-net">Чего пункты 191–194 не называют</h2>
        <p>
          Пункты 191–194 ФНП № 461 не называют ни срока службы каната, ни числа обрывов проволок для браковки: пункт 194 лишь отсылает к браковочным нормам самих ФНП. Не определена и форма записи об обтяжке, кроме того, что её делает ответственный инженер. Утверждение, что KRANNEVA вправе отказать в подаче при отсутствии сертификата, — условие заявки, а не норма ФНП. Похожая логика документов описана в разделе <Link href="/obekty/pusk-krana-v-rabotu-na-novom-obekte/">про пуск крана в работу на новом объекте</Link>.
        </p>

        <p>
          Ставка по смене: класс {light.cls} —{" "}
          {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, класс {mid.cls} —{" "}
          {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
        </p>
      </section>

      <section className="section wrap section--flush">
        <div className="section-head">
          <span className="eyebrow">Вопросы по объекту</span>
          <h2 id="faq">Частые вопросы</h2>
        </div>
        <div className="faq measure">
          {faqs.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Sources
        offer
        date={FACT_CHECK_W208}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 191–194 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 191–194 ФНП № 461. Срок службы каната, число обрывов для браковки и форму записи об обтяжке пункты 191–194 не называют; отказ в подаче без сертификата — условие заявки KRANNEVA, а не норма."
      />
    </main>
  );
}
