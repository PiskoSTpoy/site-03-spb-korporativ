import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W226, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 226. Сто пятый тип объекта — расчёт многоветвевого стропа и схемы строповки (ФНП № 461, п. 216–217).
  Фактура — в комментарии к FACT_CHECK_W226–228 в app/site-data.ts. Числовой пример — арифметика по формуле, помечен как иллюстрация.
*/

const title = "Расчёт стропа: угол между ветвями и схемы строповки";
const description =
  "Строп считают при угле между ветвями 90°, а при более чем трёх ветвях учитывают три (п. 217 ФНП). Пример расчёта для груза 10 т и запас при замене ветви.";
const h1 = "Как рассчитать многоветвевой строп: какой угол между ветвями брать и сколько ветвей учитывать?";
const canonical = "/obekty/raschet-stropa-ugol-mezhdu-vetvyami-i-skhemy-strovki/";
const published = "2026-10-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "ugol", label: "Какой угол между ветвями брать в расчёте" },
  { id: "vetvi", label: "Сколько ветвей учитывать" },
  { id: "primer", label: "Пример расчёта для груза 10 т" },
  { id: "zamena", label: "Какой запас нужен при замене ветви" },
  { id: "shema", label: "Схема строповки и кто стропует" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой угол между ветвями стропа принимают в расчёте?",
    a: "В общем случае 90 градусов (п. 217 «е» ФНП № 461). Если строп предназначен для заранее известного груза, берут фактические углы между ветвями.",
  },
  {
    q: "Сколько ветвей стропа учитывают в расчёте?",
    a: "Не более трёх, даже если ветвей больше и они все воспринимают нагрузку. Расчётную нагрузку на ветвь определяют из условия равномерного натяжения.",
  },
  {
    q: "Какой запас прочности у заменяемой ветви стропа?",
    a: "Не менее 6 для стальных канатов, 4 для стальных цепей и 7 для круглопрядных стропов из лент или нитей на полимерной основе. Для специальных стропов до 5 перегрузок запас не менее 5.",
  },
  {
    q: "Где должна быть схема строповки?",
    a: "В ППР и технологических картах, которые эксплуатирующая организация выдаёт персоналу, связанному со строповкой (п. 217 «а», «б»). Стропальщик и крановщик знакомятся с документами под подпись.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Расчёт стропа заказчика в ставку не входит.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Расчёт стропа: угол между ветвями и схемы строповки", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором для подъёма груза на многоветвевом стропе по схеме строповки из ППР",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Расчёт стропа: угол между ветвями и схемы строповки</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как это устроено · строповка груза</span>
          <h1>{h1}</h1>
          <p>
            Многоветвевой строп из стальных канатов рассчитывают при угле между ветвями 90 градусов, а если ветвей больше трёх, в расчёте учитывают только три (п. 217 «е» ФНП № 461). Для заказчика KRANNEVA это значит одно: схема строповки и масса груза известны до выезда SANY STC400T, а расчёт стропа лежит в ППР, а не рождается на площадке.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W226} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Правила расчёта и замены ветвей стропа (ФНП № 461, п. 217 «е»)</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Значение по норме</th>
                <th scope="col">Когда применяется</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Угол между ветвями в расчёте</th><td className="dtable__num">90°</td><td>в общем случае</td></tr>
              <tr><th scope="row">Угол при заранее известном грузе</th><td>фактический угол</td><td>строп под конкретный груз</td></tr>
              <tr><th scope="row">Ветви, учитываемые в расчёте</th><td className="dtable__num">не более 3</td><td>строп с числом ветвей больше трёх</td></tr>
              <tr><th scope="row">Запас при замене ветви из каната</th><td className="dtable__num">не менее 6</td><td>замена отдельной ветви</td></tr>
              <tr><th scope="row">Запас при замене ветви из цепи</th><td className="dtable__num">не менее 4</td><td>замена отдельной ветви</td></tr>
              <tr><th scope="row">Запас при замене круглопрядной ветви</th><td className="dtable__num">не менее 7</td><td>ленты и нити на полимерной основе</td></tr>
              <tr><th scope="row">Запас спецстропа до 5 перегрузок</th><td className="dtable__num">не менее 5</td><td>пакетирующие и транспортирующие стропы</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA под груз на многоветвевом стропе</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>масса груза, схема строповки, чей строп — заказчика или арендодателя</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="ugol">Какой угол между ветвями брать в расчёте</h2>
        <p>
          Расчётную нагрузку на ветвь многоветвевого стропа определяют из условия равномерного натяжения всех ветвей и, в общем случае, при угле между ветвями 90 градусов (п. 217 «е» ФНП № 461). Для стропа, который делают под заранее известный груз, берут фактические углы. Ветвь растёт в нагрузке вместе с углом, поэтому KRANNEVA при подаче Zoomlion QUY50 просит у заказчика не только массу, но и высоту строповки: от неё зависит, какой угол реально получится.
        </p>

        <h2 id="vetvi">Сколько ветвей учитывать</h2>
        <p>
          Если у стропа больше трёх ветвей, воспринимающих расчётную нагрузку, норма разрешает учесть в расчёте не более трёх (п. 217 «е»). Практический смысл для KRANNEVA простой: четвёртая ветвь на неровной плите или раме не гарантированно натянута, и считать на неё нельзя. Для четырёхветвевого стропа это означает запас по схеме, который проектировщик ППР должен заложить заранее.
        </p>

        <h2 id="primer">Пример расчёта для груза 10 т</h2>
        <p>
          Для груза 10 т на двух ветвях нагрузка на ветвь равна 10 ÷ (2 × cos 45°) ≈ 7,07 т — это иллюстрация по формуле, а не норма и не данные объекта KRANNEVA. Угол между ветвями 90° даёт угол к вертикали 45°, отсюда 10 ÷ 1,414. Для четырёх ветвей, из которых по норме считают три, получается 10 ÷ (3 × 0,707) ≈ 4,71 т на ветвь. Запас прочности из п. 217 относится к замене ветви, поэтому для проверки таких ветвей из каната нужно разрывное усилие не меньше 7,07 × 6 ≈ 42,4 тс; в расчёте стропа окончательное число задаёт его изготовитель и ППР.
        </p>

        <h2 id="zamena">Какой запас нужен при замене ветви</h2>
        <p>
          При замене отдельных ветвей в эксплуатации норма требует запас не менее 6 для стальных канатов, 4 для стальных цепей и 7 для круглопрядных стропов из лент или нитей на полимерной основе (п. 217 «е»). Для специальных транспортирующих и пакетирующих стропов, которыми делают не более 5 перегрузок пакетов длинномерных грузов и затем утилизируют, запас снижен до 5. Браковка уже работающих стропов описана отдельно на странице <Link href="/obekty/brakovka-stropov-kanatnyy-tsepnoy-ili-tekstilnyy/">про браковку стропов</Link>, а вопрос, чей строп приезжает на объект, — на странице <Link href="/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/">про стропы заказчика или арендодателя</Link>.
        </p>

        <h2 id="shema">Схема строповки и кто стропует</h2>
        <p>
          Схемы строповки, складирования и кантовки входят в ППР и технологические карты, а эксплуатирующая организация выдаёт их персоналу, связанному со строповкой, и знакомит с ними под подпись инженерно-технических работников, стропальщиков и крановщиков (п. 217 «а»–«в»). Работу стропальщика выполняет человек с квалификацией по этой профессии (п. 216). Порядок самого подъёма — на странице <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>, состав ППР — на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">про ППР и технологическую карту</Link>.
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
        date={FACT_CHECK_W226}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 216–217 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 216–217 ФНП № 461. Числовой пример (10 т, 45°, 7,07 т) — арифметика по формуле, а не норма и не данные объекта; разрывное усилие и сам расчёт стропа задают изготовитель и ППР. Формула нагрузки на ветвь в ФНП не приведена — это общая геометрия. Запрос схемы строповки у заказчика — практика компании, а не норма."
      />
    </main>
  );
}
