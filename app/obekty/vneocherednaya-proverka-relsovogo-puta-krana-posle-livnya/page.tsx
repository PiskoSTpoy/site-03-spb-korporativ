import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W222, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 222. Сто первый тип объекта — внеочередная проверка рельсового пути крана после ливня, оттепели и подтопления (ФНП № 461, п. 207–211, 214).
  Фактура — в комментарии к FACT_CHECK_W220–222 в app/site-data.ts.
*/

const title = "Рельсовый путь крана после ливня и подтопления";
const description =
  "После ливня или оттепели наземный путь крана проверяют внепланово (п. 211 ФНП), после подтопления — комплексно (п. 214). Что это значит в Петербурге.";
const h1 = "Когда рельсовый путь крана проверяют внепланово после ливня или подтопления?";
const canonical = "/obekty/vneocherednaya-proverka-relsovogo-puta-krana-posle-livnya/";
const published = "2026-10-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "vidy", label: "Какие проверки пути предусмотрены" },
  { id: "livni", label: "Что запускает внеочередную проверку" },
  { id: "podtopleniya", label: "Что значит подтопление для комплексного обследования" },
  { id: "spb", label: "Что из этого значит для Петербурга" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто проверяет рельсовый путь после ливня?",
    a: "Внеочередную проверку наземных рельсовых путей по п. 211 ФНП № 461 проводят в объёме плановой проверки под руководством инженерно-технического работника, ответственного за осуществление производственного контроля при эксплуатации подъёмных сооружений.",
  },
  {
    q: "Как часто проверяют рельсовый путь планово?",
    a: "Плановая проверка — не реже одного раза в 12 месяцев (п. 209). Осмотр после каждых 24 смен работы проводит крановщик под руководством ответственного за содержание в работоспособном состоянии (п. 208), ежесменный осмотр — тоже крановщик (п. 207).",
  },
  {
    q: "Когда нужно комплексное обследование пути?",
    a: "Не реже одного раза в три года, а также после подтоплений, наводнений, землетрясений и селей на территории нахождения подъёмного сооружения (п. 214). Обследование делает специализированная организация и оформляет актом (п. 212–213).",
  },
  {
    q: "Касается ли это автокрана на колёсном ходу?",
    a: "Нет. Пункты 207–214 относятся к кранам на рельсовом пути, например башенным и козловым на стройплощадке. Автокран KRANNEVA рельсового пути не использует, но арендатор с башенным краном рядом учитывает состояние его пути при организации работ.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Обследование рельсового пути в ставку не входит.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Рельсовый путь крана после ливня", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором на площадке с рельсовым краном: согласование работ после внеочередной проверки пути",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Рельсовый путь крана после ливня</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · рельсовый путь</span>
          <h1>{h1}</h1>
          <p>
            Внеочередная проверка наземных рельсовых путей крана проводится после ливней или зимних оттепелей в объёме плановой проверки (п. 211 ФНП № 461), а комплексное обследование пути — не реже одного раза в три года и после подтоплений и наводнений (п. 214). KRANNEVA подаёт автокраны на площадки, где рядом работает рельсовый кран, и поэтому сверяет у заказчика дату последней проверки пути до начала совместной смены.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W222} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Проверки рельсового пути подъёмного сооружения (ФНП № 461, п. 207–214)</caption>
            <thead>
              <tr>
                <th scope="col">Проверка</th>
                <th scope="col">Периодичность или повод</th>
                <th scope="col">Кто проводит</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Ежесменный осмотр</th><td>каждая смена</td><td>крановщик (оператор)</td><td>207</td></tr>
              <tr><th scope="row">Осмотр состояния пути</th><td>после каждых 24 смен работы</td><td>крановщик под руководством ИТР, ответственного за содержание ПС</td><td>208</td></tr>
              <tr><th scope="row">Плановая проверка</th><td>не реже одного раза в 12 месяцев</td><td>работники по п. 207–208 под руководством ИТР по производственному контролю</td><td>209</td></tr>
              <tr><th scope="row">Внеочередная проверка наземных путей</th><td>после ливней или зимних оттепелей</td><td>в объёме плановой, под руководством того же ИТР</td><td>211</td></tr>
              <tr><th scope="row">Комплексное обследование</th><td>не реже раза в три года; после подтоплений, наводнений, землетрясений, селей</td><td>специализированная организация, акт</td><td>212–214</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA рядом с краном на рельсовом пути</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>дата последней плановой и внеочередной проверки пути, наличие актов в паспорте пути</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="vidy">Какие проверки пути предусмотрены</h2>
        <p>
          ФНП № 461 разделяет проверку рельсового пути на ежесменный осмотр и плановую или внеочередную проверку (п. 206). Крановщик осматривает путь каждую смену (п. 207), после каждых 24 смен осмотр проводится под руководством ответственного за содержание крана в работоспособном состоянии (п. 208), а плановая проверка идёт не реже одного раза в 12 месяцев и подтверждает соответствие пути проектной документации (п. 209). Результаты осмотров вносят в паспорт рельсового пути или вахтенные журналы, акты плановых и внеочередных проверок хранят с паспортами кранов (п. 210).
        </p>

        <h2 id="livni">Что запускает внеочередную проверку</h2>
        <p>
          Пункт 211 ФНП № 461 называет два повода для внеочередной проверки наземных рельсовых путей: ливни и зимние оттепели. Проверка проводится в объёме плановой под руководством инженерно-технического работника, ответственного за производственный контроль. Норма не задаёт количество осадков, при котором проверку обязательно проводить, и KRANNEVA таких порогов не придумывает: решение об объёме и сроке лежит на эксплуатирующей организации крана. Сопоставимая с этим тема — <Link href="/obekty/veter-i-gololed/">ветер и гололёд на площадке</Link>.
        </p>

        <h2 id="podtopleniya">Что значит подтопление для комплексного обследования</h2>
        <p>
          Комплексное обследование рельсового пути по п. 214 проводят не реже одного раза в три года и дополнительно после подтоплений, наводнений, землетрясений и селей на территории нахождения подъёмного сооружения. Обследование выполняет специализированная организация: она проверяет службу эксплуатации, документацию, поэлементное состояние пути, делает инструментальные замеры, включая сопротивление заземления, и составляет ведомость дефектов (п. 212); итог оформляют актом (п. 213). Для площадки у воды стоит прочитать также страницу о <Link href="/obekty/nagonnoe-navodnenie-nevy/">нагонном наводнении на Неве</Link>.
        </p>

        <h2 id="spb">Что из этого значит для Петербурга</h2>
        <p>
          Дамба Петербурга простояла закрытой 15,5 часа — это даёт повод для внеочередных проверок. По данным «Фонтанки» от 31 декабря 2024 года, затворы закрыли утром 30 декабря из-за непогоды и открыли через полчаса после полуночи 31 декабря. Вечером 29 декабря был объявлен жёлтый уровень опасности из-за ветра до 18 м/с. Заметка не говорит о кранах и о подтоплении площадок, и связь с п. 211 и п. 214 — вывод KRANNEVA: ветер, осадки и нагон — поводы запросить у заказчика свежий акт состояния пути. Подробнее о воде — на странице про <Link href="/obekty/nagonnoe-navodnenie-nevy/">нагон на Неве</Link>.
        </p>

        <p>
          Ставка KRANNEVA по смене: класс {light.cls} —{" "}
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
        date={FACT_CHECK_W222}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 206–214 (редакция от 16.04.2026)" },
          { href: "https://www.fontanka.ru/2024/12/31/74949905/", label: "Фонтанка.ру, 31.12.2024: затворы дамбы в Петербурге открыли после 15,5 часа закрытия" },
        ]}
        note="Страница пересказывает пункты 206–214 ФНП № 461. Пороги осадков для внеочередной проверки норма не задаёт, и мы их не приводим. Фонтанка о кранах и рельсовых путях не пишет: связь между непогодой и проверкой пути — вывод KRANNEVA. Сверка пути у заказчика — практика компании, а не норма."
      />
    </main>
  );
}
