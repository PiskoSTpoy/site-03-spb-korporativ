import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W206, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 206. Восемьдесят пятый тип объекта — сравнение статических (125 %) и
  динамических (110 %) испытаний крана по ФНП № 461, п. 171, 174, 179–181, 186.
  Сроки освидетельствований — на странице tehnicheskoe-osvidetelstvovanie-krana-v-pasporte,
  площадка — на ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon; здесь не повторяются.
  Фактура — в комментарии к FACT_CHECK_W205–207 в app/site-data.ts.
*/

const title = "Статические и динамические испытания крана: 125 % и 110 %";
const description =
  "ФНП № 461: статические испытания крана идут грузом 125 % (п. 171), динамические — грузом 110 % не менее трёх циклов (п. 179). В чём разница и что проверяют.";
const h1 = "Чем статические испытания крана отличаются от динамических: 125 % и 110 %?";
const canonical = "/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/";
const published = "2026-10-18";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "raznitsa", label: "Разница в одной таблице" },
  { id: "staticheskie", label: "Статические испытания: 125 %" },
  { id: "dinamicheskie", label: "Динамические испытания: 110 %" },
  { id: "kogda-povtoryayut", label: "Когда испытания проводят заново" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Каким грузом проводят статические испытания крана?",
    a: "Грузом 125 % от номинальной паспортной грузоподъёмности для подъёмных сооружений всех типов, кроме подъёмников (п. 171 ФНП № 461). Масса контрольных грузов не должна отличаться от нужной более чем на 3 %.",
  },
  {
    q: "Каким грузом проводят динамические испытания?",
    a: "Грузом, масса которого на 10 % превышает паспортную грузоподъёмность, то есть 110 % (п. 179 ФНП № 461). Груз поднимают и опускают не менее трёх раз, проверяя тормоза и совмещение рабочих движений, как указано в РЭ.",
  },
  {
    q: "Что проверяют при статическом испытании, а что при динамическом?",
    a: "Статическое проверяет конструктивную пригодность крана и сборочных единиц, динамическое — действие механизмов и тормозов. Пункты 171 и 179 ФНП № 461 разделяют цели, и KRANNEVA сопоставляет их с записью в паспорте SANY STC400T или XCMG QY60K.",
  },
  {
    q: "Когда кран испытывают на грузовую устойчивость?",
    a: "При первичном освидетельствовании самоходного стрелового крана, если в паспорте нет ссылок на такие испытания, и после ремонта расчётных элементов металлоконструкции с заменой элементов или сваркой (п. 186 ФНП № 461). При повторных освидетельствованиях таких испытаний у стреловых кранов обычно нет.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Испытания по ФНП в тариф смены не входят и оформляются отдельно.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Статические и динамические испытания крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с подтверждённым техническим освидетельствованием и испытаниями по паспорту",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Статические и динамические испытания крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · испытания крана</span>
          <h1>{h1}</h1>
          <p>
            ФНП № 461 различает два испытания: статическое грузом 125 % от паспортной грузоподъёмности (п. 171) и динамическое грузом 110 % не менее трёх раз (п. 179). Первое проверяет конструкцию крана, второе — действие механизмов и тормозов. KRANNEVA сверяет записи о них в паспорте SANY STC400T и XCMG QY60K перед подачей на объект.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W206} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Статические и динамические испытания крана по ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Статические (п. 171, 175)</th>
                <th scope="col">Динамические (п. 179)</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Цель</th><td>проверка конструктивной пригодности крана и сборочных единиц</td><td>проверка действия механизмов и тормозов</td></tr>
              <tr><th scope="row">Груз</th><td>125 % паспортной грузоподъёмности</td><td>110 % паспортной грузоподъёмности</td></tr>
              <tr><th scope="row">Что делают с грузом</th><td>поднимают на 50–100 мм, держат 10 минут</td><td>поднимают и опускают не менее трёх раз, совмещают рабочие движения</td></tr>
              <tr><th scope="row">Ограничитель грузоподъёмности</th><td>отключён на время испытания</td><td>в ФНП для динамического испытания не сказано</td></tr>
              <tr><th scope="row">Допуск по массе контрольных грузов</th><td>не более 3 % от необходимой</td><td>в ФНП не указан</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: автокран KRANNEVA и записи об испытаниях</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>копия страницы паспорта с записью о последнем освидетельствовании</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="raznitsa">Разница в одной таблице</h2>
        <p>
          Две цифры, 125 % и 110 %, разводят испытания по назначению: больший груз на малой высоте проверяет металл, меньший груз в движении проверяет механизмы. Для KRANNEVA это важно при чтении паспорта SANY STC400T: запись об «испытании» без указания вида ничего не говорит о том, какая именно проверка выполнена. Обе процедуры входят в техническое освидетельствование, сроки которого разобраны на странице <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">про освидетельствование в паспорте</Link>.
        </p>

        <h2 id="staticheskie">Статические испытания: 125 %</h2>
        <p>
          Пункт 171 ФНП № 461 задаёт для статических испытаний три условия: тормоза отрегулированы на момент из паспорта, ограничитель грузоподъёмности отключён, усилия в канатах и элементах конструкции наибольшие. У стрелового крана по пункту 174 это положение наибольшей грузоподъёмности или наибольшего грузового момента, если РЭ не возражает. Подготовка площадки под такое испытание описана на странице <Link href="/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/">про грунт и уклон</Link>.
        </p>

        <h2 id="dinamicheskie">Динамические испытания: 110 %</h2>
        <p>
          Пункт 179 ФНП № 461 требует груз на 10 % тяжелее паспортной грузоподъёмности и не менее трёх подъёмов и опусканий. Одновременно проверяют остальные механизмы при совмещении рабочих движений, которые разрешает РЭ. Пункт 181 освобождает от динамики подъёмное сооружение, которое только поднимает и опускает груз; автокран KRANNEVA, у которого есть поворот, изменение вылета и подъём, под это исключение не подпадает — это толкование KRANNEVA по составу механизмов.
        </p>

        <h2 id="kogda-povtoryayut">Когда испытания проводят заново</h2>
        <p>
          Пункт 174 ФНП № 461 требует испытаний после замены стрелового оборудования. Пункт 186 добавляет испытания на грузовую устойчивость при первичном освидетельствовании, если в паспорте нет ссылок на прежние. Те же испытания нужны после ремонта расчётных элементов стрелы, гуська, аутригеров или опорно-поворотного устройства с заменой или сваркой. KRANNEVA поэтому просит у владельца машины запись о последнем ремонте металлоконструкции, если такой был. Отдельная история поломок на объекте описана на странице <Link href="/obekty/polomka-krana-na-obekte/">про поломку крана</Link>.
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
        date={FACT_CHECK_W206}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 171, 174, 175, 179, 181, 186 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 171, 174, 175, 179, 181 и 186 ФНП № 461. Критерии положительного результата динамического испытания пункт 179 не называет; вывод о том, что исключение пункта 181 не относится к автокрану, — толкование KRANNEVA."
      />
    </main>
  );
}
