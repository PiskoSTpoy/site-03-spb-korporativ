import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W198, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 198. Семьдесят седьмой тип объекта — смена участка работы и инструктаж
  по знаковой сигнализации (ФНП № 461, п. 248–249). Что считать «участком»,
  ФНП не определяет — на странице это помечено как толкование KRANNEVA.
  Фактура — в комментарии к FACT_CHECK_W196–198 в app/site-data.ts.
*/

const title = "Смена участка крана: инструктаж по знакам, п. 249 ФНП";
const description =
  "ФНП № 461 (п. 248–249): при смене участка работы крановщика и стропальщика инструктируют под подпись о знаковой сигнализации нового участка.";
const h1 = "Нужен ли новый инструктаж по знакам, когда кран переезжает на другой адрес?";
const canonical = "/obekty/smena-uchastka-i-instruktazh-po-znakam/";
const published = "2026-10-14";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-govorit-p249", label: "Что говорит пункт 249" },
  { id: "kto-ustanavlivaet-signaly", label: "Кто устанавливает порядок сигналов" },
  { id: "chto-takoe-uchastok", label: "Что считать участком работы" },
  { id: "chto-v-zayavke", label: "Что записать до подачи на новый адрес" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Нужен ли инструктаж, если кран переехал на соседний адрес?",
    a: "Пункт 249 ФНП № 461 требует инструктировать под подпись при смене участка работы. Что считать участком, ФНП не определяет, поэтому KRANNEVA при переезде на другой адрес проводит инструктаж по знакам заново.",
  },
  {
    q: "Кого инструктируют при смене участка?",
    a: "Крановщиков и стропальщиков (п. 249). Инструктаж проводят о знаковой сигнализации, которую применяют на новом участке работ, и фиксируют под подпись.",
  },
  {
    q: "Где записана система сигналов при радиосвязи?",
    a: "В производственных инструкциях для крановщиков и стропальщиков (п. 248 ФНП № 461). Эксплуатирующая организация устанавливает порядок обмена сигналами, знаковая сигнализация приведена в приложении № 7 к ФНП.",
  },
  {
    q: "Можно ли обойтись без подписи в инструктаже?",
    a: "Нет. Слова «под подпись» входят в текст пункта 249: без подписи инструктаж по нормативу не подтверждён. Форму журнала ФНП не задаёт, её определяет эксплуатирующая организация.",
  },
  {
    q: "Меняет ли переезд на другой адрес ставку KRANNEVA?",
    a: `Переезд отдельной ставкой не оформляется: ставка почасовая, ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Смена участка и инструктаж по знакам", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: переезд между адресами с инструктажем по знаковой сигнализации",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Смена участка и инструктаж по знакам</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · знаковая сигнализация</span>
          <h1>{h1}</h1>
          <p>
            Пункт 249 ФНП № 461 требует: при смене участка работы крановщики и стропальщики инструктируются под подпись о знаковой сигнализации, которую применяют на новом участке. Для заказчика KRANNEVA это значит, что переезд SANY STC400T между адресами сопровождается ещё одним документом — листом инструктажа с подписями. Порядок обмена сигналами, по пункту 248, устанавливает эксплуатирующая организация, а знаковая сигнализация приведена в приложении № 7 к ФНП.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W198} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что ФНП № 461 говорит о сигналах крановщика и стропальщика</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Пункт</th>
                <th scope="col">Что требуется</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Порядок обмена сигналами</th><td className="dtable__num">248</td><td>устанавливает эксплуатирующая организация</td></tr>
              <tr><th scope="row">Знаковая сигнализация и радиосвязь</th><td className="dtable__num">248</td><td>вносятся в производственные инструкции крановщиков и стропальщиков</td></tr>
              <tr><th scope="row">Таблица знаков</th><td className="dtable__num">248, прил. 7</td><td>знаковая сигнализация для крановщиков и стропальщиков</td></tr>
              <tr><th scope="row">Смена участка работы</th><td className="dtable__num">249</td><td>инструктаж под подпись о сигнализации нового участка</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA согласует до подачи на новый адрес</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что подписывают</th><td>список крановщиков и стропальщиков, способ обмена сигналами (знаки или радио), дата инструктажа</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-govorit-p249">Что говорит пункт 249</h2>
        <p>
          Пункт 249 ФНП № 461 состоит из одного условия: при смене участка работы крановщики и стропальщики должны быть проинструктированы под подпись о знаковой сигнализации, применяемой на новом участке. Подпись входит в текст нормы, поэтому устного напоминания у кабины XCMG QY60K недостаточно. KRANNEVA оформляет лист инструктажа до начала первой смены на новом адресе и оставляет копию в журнале производства работ у ответственного ИТР.
        </p>

        <h2 id="kto-ustanavlivaet-signaly">Кто устанавливает порядок сигналов</h2>
        <p>
          Порядок обмена сигналами между стропальщиками и крановщиками по пункту 248 устанавливает эксплуатирующая организация. Знаковая сигнализация и система обмена при радиопереговорной связи вносятся в производственные инструкции крановщиков и стропальщиков, а сами знаки приведены в приложении № 7. Чей именно стропальщик на площадке — заказчика или арендодателя, определяет договор: этот вопрос разобран на странице <Link href="/obekty/stropalshchik-zakazchika-ili-arendodatelya/">про стропальщика заказчика или арендодателя</Link>. Для SANY STC400T достаточно, чтобы инструкция и стропальщика, и крановщика содержала одну и ту же систему сигналов.
        </p>

        <h2 id="chto-takoe-uchastok">Что считать участком работы</h2>
        <p>
          ФНП № 461 не определяет, что именно является участком работы: другой адрес, другая захватка на том же объекте или другая сторона дома. Это толкование KRANNEVA, а не норма: при переезде на другой адрес и при смене позиции крана, после которой меняется схема подачи сигналов, инструктаж проводится заново. Дешевле повторить лист инструктажа, чем доказывать, что новый двор Петербурга был «тем же участком». Когда крановщику плохо виден груз из кабины, система сигналов связана с работой сигнальщика, как описано на странице <Link href="/obekty/signalshchik-pri-plohom-obzore-iz-kabiny/">про сигнальщика при плохом обзоре</Link>.
        </p>

        <h2 id="chto-v-zayavke">Что записать до подачи на новый адрес</h2>
        <p>
          В заявке на XCMG QY60K KRANNEVA просит указать, кто на новом адресе работает стропальщиком, будет ли радиосвязь и кто ведёт лист инструктажа. Перечень знаков берут из приложения № 7, а особенности площадки — например, подачу через проём или работу в стеснённом дворе — вносят в инструкции. Ставка почасовая и от числа подписей не зависит; переезд между адресами отдельной ставкой не оформляется. Общий порядок подъёма груза описывает страница <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>.
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
        date={FACT_CHECK_W198}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 248–249, приложение № 7 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 248–249 ФНП № 461. Определения «участка работы» в ФНП нет — толкование KRANNEVA помечено в тексте; форма листа инструктажа и сами знаки приложения № 7 здесь не воспроизводятся."
      />
    </main>
  );
}
