import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W186, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 186. Шестьдесят пятый тип — подача груза в проём (люк) перекрытия
  или покрытия. Угол практический: как работает подача через проём и что
  заказчик должен подготовить до выезда. Фактура — в комментарии к
  FACT_CHECK_W186 в app/site-data.ts. Размеры проёма, масса груза и схема
  строповки страницей не назначаются: это задача ППР конкретного объекта.
*/

const title = "Подача груза в проём перекрытия: зазор 0,5 м и ППР";
const description =
  "Пункт 162 ФНП № 461 требует подавать груз в проём перекрытия по ППР, с зазором не менее 0,5 м и на минимальной скорости. Что подготовить до выезда крана.";
const h1 = "Как подать груз в проём перекрытия без раскачивания?";
const canonical = "/obekty/podacha-gruza-v-proem-perekrytiya/";
const published = "2026-10-08";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "ppr", label: "Подача по ППР, а не по договорённости на месте" },
  { id: "zazor", label: "Зазор 0,5 метра и минимальная скорость" },
  { id: "stropa", label: "Как строп проходит через проём" },
  { id: "signal", label: "Сигнализация и запрет нахождения под грузом" },
  { id: "zakazchik", label: "Что подготовить заказчику до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Обязателен ли ППР для подачи груза в проём?",
    a: "Да. Пункт 162 ФНП № 461 требует подавать грузы в проёмы и люки перекрытий и покрытий по специально разработанному ППР.",
  },
  {
    q: "Какой зазор нужен между краем проёма и грузом?",
    a: "Не менее 0,5 метра. Зазор отсчитывается до груза или до крюковой обоймы, если она опускается в проём, и должен обеспечивать свободное прохождение через проём.",
  },
  {
    q: "Можно ли подойти к грузу, пока он висит над проёмом?",
    a: "Стропальщику разрешено подойти к грузу или отойти от него, когда груз опущен или поднят не выше 1 метра от уровня площадки, где стоит стропальщик. Пункт 162 не разрешает подходить к грузу над проёмом на большей высоте.",
  },
  {
    q: "Кто оборудует сигнализацию у проёма?",
    a: "Пункт 162 возлагает на площадку световую сигнализацию у места приёма или отправки груза и у самого проёма, а также надписи и знаки, запрещающие нахождение людей под грузом. Что именно установит заказчик, в пункте не расписано, поэтому это фиксируют в ППР.",
  },
  {
    q: "Сколько стоит смена крана, если подача через проём занимает весь день?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Сколько грузов пройдёт через проём, в ставку не входит отдельной строкой: это уточняется в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Подача груза в проём перекрытия", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подача груза в проём перекрытия",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Подача груза в проём перекрытия</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · подача через проём</span>
          <h1>{h1}</h1>
          <p>
            Пункт 162 ФНП № 461 требует подавать грузы в проёмы и люки перекрытий и покрытий
            по специально разработанному ППР, с зазором не менее 0,5 метра между краем проёма и грузом.
            На площадке, где KRANNEVA ставит SANY STC400T или XCMG QY60K, этот зазор задаёт
            не удобство оператора, а то, что записано в ППР до выезда.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W186} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что пункт 162 ФНП № 461 требует при подаче через проём</caption>
            <thead>
              <tr>
                <th scope="col">Требование</th>
                <th scope="col">Что означает на площадке</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">ППР</th><td>подача по специально разработанному плану, не по договорённости на месте</td></tr>
              <tr><th scope="row">Зазор</th><td>не менее 0,5 м между краем проёма и грузом или крюковой обоймой</td></tr>
              <tr><th scope="row">Скорость</th><td>опускать груз и поднимать крюк на минимальной скорости, без раскачивания</td></tr>
              <tr><th scope="row">Подход стропальщика</th><td>разрешён, когда груз опущен или поднят не выше 1 м от его площадки</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA ставит на подачу через проём</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Размер проёма и масса груза</th><td>задаёт заказчик в ППР, KRANNEVA их не назначает</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="ppr">Подача по ППР, а не по договорённости на месте</h2>
        <p>
          Пункт 162 ФНП № 461 не оставляет выбора: подача груза в проём перекрытия или покрытия
          выполняется по специально разработанному ППР. План фиксирует, через какой проём идёт
          груз, где стоит стропальщик и в какой момент подход к грузу разрешён. Без такого плана
          оператор SANY STC400T или XCMG QY60K вынужден решать на месте, и именно это пункт
          запрещает.
        </p>
        <p>
          Что в ППР вносит KRANNEVA, а что заказчик, разобрано на странице{" "}
          <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">ППР и технологической карты</Link>.
        </p>

        <h2 id="zazor">Зазор 0,5 метра и минимальная скорость</h2>
        <p>
          Расстояние между краем проёма и грузом должно быть не менее 0,5 метра. Зазор отсчитывается
          до груза или до крюковой обоймы, если она опускается в проём, и должен позволять грузу
          свободно пройти через проём. Пункт также требует опускать груз и поднимать крюк со стропами
          на минимальной скорости, не допуская раскачивания.
        </p>
        <p>
          Пункт 162 говорит о скорости и отсутствии раскачивания, но не задаёт их численные значения:
          конкретный режим подъёма определяет ППР.
        </p>

        <h2 id="stropa">Как строп проходит через проём</h2>
        <p>
          Если строп поднимается через проём, его крюки навешиваются на разъёмное звено, а строп
          направляется снизу пеньковым канатом. Канат отцепляется только после того, как строп
          полностью выведен из проёма. Стропальщику разрешено подойти к грузу или отойти от него,
          когда груз опущен или поднят не выше 1 метра от уровня площадки, где стоит стропальщик.
        </p>

        <h2 id="signal">Сигнализация и запрет нахождения под грузом</h2>
        <p>
          У места приёма или отправки грузов, а также у самого проёма в перекрытии или покрытии
          должна быть световая сигнализация. Она предупреждает о нахождении груза над проёмом и
          о его опускании. Рядом размещают надписи и знаки, запрещающие нахождение людей под
          перемещаемым грузом. Эти элементы площадки пункт 162 описывает, но не определяет их
          количество и расположение: это вносят в ППР.
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="zakazchik">Что подготовить заказчику до выезда</h2>
        <p>
          До выезда заказчик передаёт размер проёма, отметку перекрытия и массу груза, которую
          он указывает в заявке. Без этих данных ППР по пункту 162 составить нельзя, потому что
          план строится именно на них. Срок согласования плана в публичных условиях KRANNEVA не назван.
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
        date={FACT_CHECK_W186}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 162 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 162 ФНП № 461 и не заменяет ППР. Размер проёма, масса груза и схема строповки назначаются проектом конкретного объекта, KRANNEVA их не определяет. Пункт 162 не устанавливает количество световых сигналов и знаков: это решается в ППР."
      />
    </main>
  );
}
