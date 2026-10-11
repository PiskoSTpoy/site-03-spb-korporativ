import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W194, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 194. Семьдесят третий тип объекта — чей стропальщик работает у крана:
  персонал заказчика или персонал арендодателя (пп. 147 «б», 151, 152 ФНП № 461).
  Угол коммерческий/сравнительный. Распределение расходов на экипаж по ГК РФ
  разобрано на странице toplivo-i-ekipazh-v-stavke и здесь не повторяется.
  Фактура — в комментарии к FACT_CHECK_W194 в app/site-data.ts.
*/

const title = "Стропальщик заказчика или арендодателя: п. 147, 151, 152 ФНП";
const description =
  "Стропальщиков назначает приказом эксплуатирующая организация (п. 151 ФНП № 461); в удостоверении — тип ПС и виды работ (п. 147). Две схемы допуска.";
const h1 = "Чей стропальщик работает у крана: персонал заказчика или арендодателя?";
const canonical = "/obekty/stropalshchik-zakazchika-ili-arendodatelya/";
const published = "2026-10-12";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-trebuet-fnp", label: "Что требуют пункты 147, 151 и 152" },
  { id: "svoy-stropalshchik", label: "Схема 1: стропальщик заказчика" },
  { id: "stropalshchik-arendodatelya", label: "Схема 2: стропальщик арендодателя" },
  { id: "sravnenie", label: "Сравнение по пяти признакам" },
  { id: "chto-zapisat", label: "Что записать в договоре и заявке" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто назначает стропальщиков на площадке с арендованным краном?",
    a: "ФНП № 461 (п. 151) возлагает назначение крановщиков, их помощников и стропальщиков на эксплуатирующую организацию — внутренним распорядительным актом. Какая из сторон ею является на конкретной площадке, определяет договор аренды, поэтому в нём стропальщика называют прямо.",
  },
  {
    q: "Что должно быть в удостоверении стропальщика?",
    a: "Тип подъёмного сооружения, а также виды работ и оборудования, к которым человек допущен (п. 147 «б» ФНП № 461). Удостоверение без указания типа ПС под это требование не подходит.",
  },
  {
    q: "Нужна ли стропальщику производственная инструкция?",
    a: "Да. Эксплуатирующая организация обязана обеспечить персонал производственными инструкциями и выдавать их под подпись перед допуском к работе (п. 152 ФНП № 461). Инструкцию пишут на основе паспорта и руководства по эксплуатации конкретного крана (п. 147 «в»).",
  },
  {
    q: "Можно ли использовать стропальщика заказчика без приказа?",
    a: "Нет. Без распорядительного акта о назначении (п. 151 ФНП № 461) и удостоверения с типом ПС человек у крана не допущен — независимо от того, чей он работник.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Стропальщик заказчика или арендодателя", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: допуск стропальщиков на площадке",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Стропальщик заказчика или арендодателя</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · допуск персонала к крану</span>
          <h1>{h1}</h1>
          <p>
            Стропальщика, как и крановщика, назначает внутренним распорядительным актом эксплуатирующая организация (п. 151 ФНП № 461), и в удостоверении должны стоять тип подъёмного сооружения, виды работ и оборудование (п. 147 «б»). Поэтому KRANNEVA на площадке с XCMG QY60K или SANY STC400T спрашивает заказчика не «есть ли у вас стропальщик», а «чей приказ допускает этого человека к этому крану» — ответ определяет, чьё удостоверение и чью инструкцию проверяют перед первым подъёмом.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W194} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Две схемы допуска стропальщика к арендованному крану</caption>
            <thead>
              <tr>
                <th scope="col">Признак</th>
                <th scope="col">Стропальщик заказчика</th>
                <th scope="col">Стропальщик арендодателя</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Приказ о назначении (п. 151)</th><td>нужен приказ организации, которая назначает человека; копию передают арендодателю</td><td>приказ арендодателя; копию передают заказчику по запросу</td></tr>
              <tr><th scope="row">Удостоверение (п. 147 «б»)</th><td>тип ПС и виды работ должны совпадать с краном на площадке</td><td>указан тип ПС; сверяют с подаваемой машиной</td></tr>
              <tr><th scope="row">Инструкция под подпись (п. 152)</th><td>выдают и подписывают до первого подъёма на этом кране</td><td>выдана заранее; ознакомление с площадкой — отдельным инструктажем</td></tr>
              <tr><th scope="row">Знание площадки</th><td>знает грузы, схемы строповки, зону складирования</td><td>знает кран; грузы и схемы получает от заказчика</td></tr>
              <tr><th scope="row">Что подтверждает заказчик</th><td>допуск своих людей: приказ, удостоверение, подпись под инструкцией</td><td>порядок взаимодействия: кто подаёт команды и принимает груз</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA подаёт на площадку</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что готовит заказчик</th><td>приказ и удостоверение стропальщика, подпись под производственной инструкцией, схемы строповки грузов</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-trebuet-fnp">Что требуют пункты 147, 151 и 152</h2>
        <p>
          Три пункта ФНП № 461 задают допуск стропальщика, и ни один не различает «своих» и «чужих» работников. Пункт 151 обязывает эксплуатирующую организацию назначить внутренним распорядительным актом крановщиков, их помощников, стропальщиков, слесарей и электромонтёров. Пункт 147 «б» требует порядок проверки знаний и допуска с выдачей удостоверений, где указаны тип ПС, виды работ и оборудования. Пункт 152 обязывает выдавать персоналу производственные инструкции под подпись перед допуском. Для KRANNEVA из этого следует простая проверка: у любого человека у крана есть приказ, удостоверение с типом ПС и подпись в инструкции.
        </p>

        <h2 id="svoy-stropalshchik">Схема 1: стропальщик заказчика</h2>
        <p>
          Стропальщик заказчика знает грузы и площадку, но не знает XCMG QY60K, и именно в этом его слабое место при первой смене. Производственную инструкцию на конкретный кран, например XCMG QY60K, человек получает и подписывает до первого подъёма (п. 152 ФНП № 461). Удостоверение должно содержать тип подъёмного сооружения (п. 147 «б»): удостоверение стропальщика, допущенного только к мостовым кранам, для автокрана не подходит. Приказ о назначении оформляет организация, которой человек подчинён, и копию передают KRANNEVA до выезда.
        </p>

        <h2 id="stropalshchik-arendodatelya">Схема 2: стропальщик арендодателя</h2>
        <p>
          Стропальщик арендодателя знает SANY STC400T и порядок команд, но получает от заказчика то, чего знать не может: массу грузов, схемы строповки, зону складирования. KRANNEVA в этой схеме работает по паспорту груза: масса и размеры в заявке, место приёма отмечено до подачи SANY STC400T. Приказ и удостоверение у такого стропальщика уже есть, а производственную инструкцию по площадке заказчик дополняет отдельным инструктажем: схемы строповки заказчик утверждает до смены. Порядок подъёма груза и обязанности стропальщика у груза разобраны на странице <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>.
        </p>

        <h2 id="sravnenie">Сравнение по пяти признакам</h2>
        <p>
          Пять признаков таблицы сводятся к одному: чья подпись под инструкцией по пункту 152 ФНП № 461 стоит первой. При схеме 1 это заказчик, и пока подписи нет, SANY STC400T не поднимает груз. При схеме 2 подпись у арендодателя уже стоит, и вся нагрузка на заказчика сводится к схемам строповки и приёмке груза. Какую схему брать, зависит от повторяемости работ: при ежедневных подъёмах одного и того же груза выгоднее обучить своего стропальщика, при разовой смене проще принять стропальщика арендодателя. Расходы на экипаж по умолчанию распределяет ГК РФ — это разобрано на странице <Link href="/obekty/toplivo-i-ekipazh-v-stavke/">про топливо и экипаж в ставке</Link>.
        </p>

        <h2 id="chto-zapisat">Что записать в договоре и заявке</h2>
        <p>
          Четыре строки KRANNEVA просит зафиксировать до подачи крана: какая сторона назначает стропальщика, чей приказ допускает его к крану, кто выдаёт и принимает подпись под производственной инструкцией, кто подаёт команды у груза. ФНП оперирует понятием «эксплуатирующая организация» и не говорит, кто ею является при аренде, поэтому ответ записывают в договор прямо. Тот же раздел договора затрагивает <Link href="/obekty/subarenda-i-dogovory-s-tretimi-litsami/">субаренду и договоры с третьими лицами</Link>: передача крана субарендатору меняет, чей приказ действует на площадке.
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
        date={FACT_CHECK_W194}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 147, 151, 152 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 147, 151, 152 ФНП № 461 и не заменяет договор аренды. ФНП не определяет, кто является эксплуатирующей организацией при аренде крана с экипажем, — на странице это не утверждается. Обучение и аттестация стропальщиков, а также распределение расходов на экипаж по Гражданскому кодексу здесь не разбираются."
      />
    </main>
  );
}
