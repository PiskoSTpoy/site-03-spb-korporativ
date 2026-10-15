import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W201, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 201. Восьмидесятый тип объекта — где автокран стоит ночью при
  многодневной работе во дворе Петербурга (ПДД п. 17.1, 17.2, 17.4; КоАП РФ
  ст. 12.28 ч. 2; ФНП № 461 п. 253 «е»). То, что автокран попадает под запрет
  стоянки грузовых автомобилей >3,5 т, — толкование KRANNEVA, помечено в тексте.
  Фактура — в комментарии к FACT_CHECK_W199–201 в app/site-data.ts.
*/

const title = "Ночная стоянка автокрана во дворе Петербурга: ПДД 17.2";
const description =
  "ПДД 17.2 и 17.4: во дворе нельзя ставить грузовой автомобиль тяжелее 3,5 т вне выделенных мест, штраф в Петербурге — 3000 ₽ (КоАП 12.28 ч. 2).";
const h1 = "Можно ли оставить автокран на ночь во дворе, если работа идёт несколько дней?";
const canonical = "/obekty/nochnaya-stoyanka-krana-vo-dvore/";
const published = "2026-10-15";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-zapreshchaet-pdd", label: "Что запрещает пункт 17.2 ПДД" },
  { id: "shtraf-v-peterburge", label: "Какой штраф действует в Петербурге" },
  { id: "mesto-v-instruktsii", label: "Место крана в нерабочем состоянии" },
  { id: "varianty-nochevki", label: "Три варианта на ночь" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли ставить автокран во дворе жилого дома на ночь?",
    a: "Пункты 17.2 и 17.4 ПДД запрещают во дворах стоянку грузовых автомобилей с разрешённой максимальной массой более 3,5 т вне специально выделенных мест. KRANNEVA исходит из того, что автокран на грузовом шасси под этот запрет попадает.",
  },
  {
    q: "Какой штраф за стоянку грузовика во дворе в Санкт-Петербурге?",
    a: "3000 рублей по части 2 статьи 12.28 КоАП РФ — для Москвы и Санкт-Петербурга сумма вдвое выше, чем по части 1 (1500 рублей). KRANNEVA не оставляет кран во дворе вне отведённого места.",
  },
  {
    q: "Распространяется ли запрет на двор без знака «Жилая зона»?",
    a: "Да. Пункт 17.4 ПДД прямо распространяет требования раздела 17 на дворовые территории, поэтому отсутствие знаков 5.21 и 5.22 у арки петербургского двора запрет не снимает. KRANNEVA планирует ночёвку с учётом этого.",
  },
  {
    q: "Где кран должен стоять в нерабочем состоянии по ФНП?",
    a: "Подпункт «е» пункта 253 ФНП № 461 требует указать в аварийной инструкции места, отведённые для подъёмного сооружения в нерабочем состоянии. KRANNEVA просит назвать это место до подачи крана.",
  },
  {
    q: "Как считается многодневная работа KRANNEVA?",
    a: `Каждая смена — по почасовой ставке: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Вариант ночёвки фиксируется в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Ночная стоянка крана во дворе", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором на несколько смен во дворе с планом ночной стоянки",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Ночная стоянка крана во дворе</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · многодневная работа</span>
          <h1>{h1}</h1>
          <p>
            Пункт 17.2 ПДД запрещает в жилой зоне стоянку грузовых автомобилей с разрешённой максимальной массой более 3,5 т вне специально выделенных мест, а пункт 17.4 распространяет запрет на дворы. В Санкт-Петербурге нарушение стоит 3000 рублей по части 2 статьи 12.28 КоАП РФ. Поэтому KRANNEVA при работе SANY STC400T во дворе в течение нескольких дней заранее решает, где кран проведёт ночь: на огороженной площадке, на выделенном месте или на базе.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W201} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Нормы, которые определяют ночную стоянку автокрана во дворе</caption>
            <thead>
              <tr>
                <th scope="col">Норма</th>
                <th scope="col">Что устанавливает</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">ПДД, п. 17.1</th><td>жилая зона — между знаками 5.21 и 5.22</td></tr>
              <tr><th scope="row">ПДД, п. 17.2</th><td>грузовым тяжелее 3,5 т — только выделенные места</td></tr>
              <tr><th scope="row">ПДД, п. 17.4</th><td>раздел 17 действует и во дворах</td></tr>
              <tr><th scope="row">КоАП, ст. 12.28</th><td>1500 ₽, в Петербурге — 3000 ₽</td></tr>
              <tr><th scope="row">ФНП, п. 253 «е»</th><td>место крана в нерабочем состоянии</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA согласует до многодневной подачи</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что записывают</th><td>место ночёвки и кто за него отвечает</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-zapreshchaet-pdd">Что запрещает пункт 17.2 ПДД</h2>
        <p>
          Пункт 17.2 ПДД перечисляет четыре запрета в жилой зоне: сквозное движение, учебную езду, стоянку с работающим двигателем и стоянку грузовых автомобилей тяжелее 3,5 т или автобусов вне выделенных мест. Для крана важен последний: разрешённая максимальная масса автокрана на грузовом шасси многократно выше порога. KRANNEVA исходит из того, что SANY STC400T во дворе подпадает под этот запрет, — это толкование, но спорить о нём с инспектором дороже, чем перегнать машину. Пункт 17.4 закрывает вопрос о дворах без знаков: раздел 17 действует и там.
        </p>

        <h2 id="shtraf-v-peterburge">Какой штраф действует в Петербурге</h2>
        <p>
          Статья 12.28 КоАП РФ устанавливает за нарушение правил жилых зон штраф 1500 рублей, а часть 2 той же статьи — 3000 рублей для Москвы и Санкт-Петербурга. Петербург попадает в повышенную часть как город федерального значения, поэтому у заказчика KRANNEVA в центре штраф вдвое выше, чем в Ленинградской области. Сумма невелика на фоне ставки смены, но двор многоквартирного дома — место, где жители фиксируют нарушения сами. Работа ночью в таком дворе ограничена ещё и законом о тишине, о чём рассказывает страница <Link href="/obekty/rabota-kranom-nochyu-i-v-vyhodnye/">про работу краном ночью</Link>.
        </p>

        <h2 id="mesto-v-instruktsii">Место крана в нерабочем состоянии</h2>
        <p>
          Подпункт «е» пункта 253 ФНП № 461 требует указать в инструкции о действиях в аварийных ситуациях места, отведённые для подъёмного сооружения в нерабочем состоянии. Значит, место ночёвки XCMG QY60K — не только вопрос ПДД, но и строка документа эксплуатирующей организации. KRANNEVA просит вписать его до первой смены, а не искать вечером. Что ещё входит в эту инструкцию, разобрано на странице <Link href="/obekty/avariynaya-instruktsiya-dlya-raboty-krana/">про аварийную инструкцию для работы крана</Link>.
        </p>

        <h2 id="varianty-nochevki">Три варианта на ночь</h2>
        <p>
          На многодневном объекте KRANNEVA выбирает из трёх вариантов. Первый — огороженная стройплощадка с местом для крана, указанным в ППР: двором общего пользования она в это время не является, это толкование, которое подтверждает ограждение. Второй — специально выделенное и обозначенное знаками место, которое позволяет пункт 17.2. Третий — возврат на базу после каждой смены, когда во дворе-колодце нет ни ограждения, ни места; как проходит в такой двор кран, описано на странице <Link href="/obekty/dvor-kolodets-istoricheskogo-tsentra/">про двор-колодец исторического центра</Link>. Выбранный вариант фиксируют в заявке.
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
        date={FACT_CHECK_W201}
        items={[
          { href: "https://pddmaster.ru/documents/pdd/17-pdd", label: "Правила дорожного движения РФ, раздел 17 «Движение в жилых зонах» — пункты 17.1, 17.2, 17.4" },
          { href: "https://www.zakonrf.info/koap/12.28/", label: "КоАП РФ, статья 12.28 «Нарушение правил, установленных для движения транспортных средств в жилых зонах» — части 1 и 2 (действующая редакция)" },
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 (ФНП ПС) — пункт 253, подпункт «е» (редакция от 16.04.2026)" },
        ]}
        note="Применение запрета пункта 17.2 ПДД к автокрану и статус огороженной стройплощадки — толкования KRANNEVA, помечены в тексте; судебная практика здесь не разбирается."
      />
    </main>
  );
}
