import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W207, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 207. Восемьдесят шестой тип объекта — замещение ответственного
  инженерно-технического работника на время отпуска, болезни и нерабочих
  праздничных дней (ФНП № 461, п. 148–149, п. 153). Календарь: 4 ноября 2026 года —
  нерабочий праздничный день. Фактура — в комментарии к FACT_CHECK_W205–207
  в app/site-data.ts.
*/

const title = "Кто замещает ответственного инженера по крану в отпуск";
const description =
  "ФНП № 461 (п. 149): на время отпуска, болезни и командировки обязанности ответственного ИТР возлагает приказ на замещающего по должности с аттестацией.";
const h1 = "Кто отвечает за работу крана, когда ответственный инженер в отпуске или болеет?";
const canonical = "/obekty/zameshchenie-otvetstvennogo-inzhenera-v-otpusk-i-prazdnik/";
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
  { id: "chto-govorit-p149", label: "Что говорит пункт 149" },
  { id: "chto-zaprosit", label: "Что запросить у арендодателя" },
  { id: "chego-net", label: "Чего пункт 149 не определяет" },
  { id: "4-noyabrya", label: "Смена 4 ноября 2026 года" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто заменяет ответственного инженера по безопасному производству работ краном?",
    a: "Работник, которого внутренний распорядительный акт эксплуатирующей организации назначает замещающим по должности. Он должен иметь соответствующую квалификацию, пройти обучение и аттестацию (п. 149 ФНП № 461). Одного устного распоряжения пункт не предусматривает.",
  },
  {
    q: "Какие случаи отсутствия охватывает пункт 149?",
    a: "Отпуск, командировку, болезнь и другие случаи отсутствия ответственных инженерно-технических работников. Перечень открытый: слова «в других случаях» включают, например, нерабочий праздничный день, если ответственный в этот день не на смене.",
  },
  {
    q: "Кто назначает сигнальщика, если ответственный инженер отсутствует?",
    a: "Сигнальщика назначает инженерно-технический работник, ответственный за безопасное производство работ с применением ПС (п. 153 ФНП № 461). На время отсутствия это замещающий по приказу по пункту 149, поэтому KRANNEVA просит его фамилию в заявке до выезда.",
  },
  {
    q: "Работает ли кран KRANNEVA 4 ноября 2026 года?",
    a: "4 ноября 2026 года — среда и нерабочий праздничный день по федеральному производственному календарю. KRANNEVA принимает заявку на эту дату как на выходной день и заранее согласует, кто на стороне заказчика и арендодателя замещает ответственных.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Доплаты за нерабочий день на этой странице не называются: условия смены в праздничный день согласуются в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Замещение ответственного инженера", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с согласованием замещающего ответственного инженера на время отсутствия",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Замещение ответственного инженера</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · замещение ответственных</span>
          <h1>{h1}</h1>
          <p>
            Пункт 149 ФНП № 461 говорит, что на время отпуска, командировки, болезни и в других случаях отсутствия ответственных инженерно-технических работников их обязанности возлагает внутренний распорядительный акт на замещающих по должности — с квалификацией, обучением и аттестацией. KRANNEVA в заявке на смену SANY STC400T или XCMG QY60K просит указать фамилию замещающего до выезда, особенно в нерабочий праздничный день.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W207} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Замещение ответственного работника по п. 148–149 и 153 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Что говорит ФНП</th>
                <th scope="col">Что просит KRANNEVA</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Чем оформляется замещение</th><td>внутренним распорядительным актом (п. 149)</td><td>копию приказа или выписку из него</td></tr>
              <tr><th scope="row">Кто может замещать</th><td>работник, замещающий по должности, с квалификацией, обучением, аттестацией (п. 149)</td><td>фамилию и должность, номер удостоверения об аттестации</td></tr>
              <tr><th scope="row">Какие случаи охвачены</th><td>отпуск, командировка, болезнь и другие случаи (п. 149)</td><td>даты, когда ответственный не на связи</td></tr>
              <tr><th scope="row">Кто назначает сигнальщика</th><td>ИТР, ответственный за безопасное производство работ (п. 153)</td><td>фамилию того, кто на смене даёт допуск</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с указанным замещающим</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>фамилия и должность замещающего, копия приказа, телефон на смену</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-govorit-p149">Что говорит пункт 149</h2>
        <p>
          Пункт 149 ФНП № 461 отвечает на практический вопрос: если ответственный за безопасное производство работ краном в отпуске или болеет, обязанности не исчезают, а переходят к названному в приказе работнику. Замещающий должен быть таким же по должности, иметь квалификацию, пройти обучение и аттестацию. KRANNEVA опирается на этот пункт, когда принимает заявку на подачу SANY STC400T на объект, где ответственный инженер заказчика отсутствует в день работ.
        </p>

        <h2 id="chto-zaprosit">Что запросить у арендодателя</h2>
        <p>
          У арендодателя KRANNEVA просит фамилию и должность замещающего, копию приказа о замещении и подтверждение, что у замещающего есть аттестация по этим обязанностям. Пункт 148 при этом оставляет число инженерно-технических работников на усмотрение эксплуатирующей организации по её внутреннему акту, поэтому «свободного» замещающего по ФНП может не быть вовсе. Если сигнальщика назначает инженер по пункту 153, то подробности про <Link href="/obekty/signalshchik-pri-plohom-obzore-iz-kabiny/">сигнальщика при плохом обзоре</Link> относятся и к замещающему.
        </p>

        <h2 id="chego-net">Чего пункт 149 не определяет</h2>
        <p>
          Пункт 149 не называет ни форму акта, ни срок, на который назначают замещающего, ни порядок передачи дел, ни перечень документов у замещающего. Нет в нём и особого правила для нерабочих праздничных дней. Включение такого дня в «другие случаи» отсутствия — толкование KRANNEVA, а не норма. Для подачи в выходные есть отдельная страница <Link href="/obekty/rabota-kranom-nochyu-i-v-vyhodnye/">про работу ночью и в выходные</Link>, где разобраны тихие часы.
        </p>

        <h2 id="4-noyabrya">Смена 4 ноября 2026 года</h2>
        <p>
          День народного единства 4 ноября 2026 года выпадает на среду и по федеральному производственному календарю нерабочий, поэтому многие ответственные инженеры заказчиков в этот день не на объекте. Для KRANNEVA это конкретный случай по пункту 149: до подачи SANY STC400T или XCMG QY60K нужен приказ о замещающем на 4 ноября и телефон на смену. Календарь одинаков для Санкт-Петербурга и остальной России, а особенность города — высокая плотность стройплощадок, где допуск ведёт генподрядчик, и к нему тоже нужна фамилия.
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
        date={FACT_CHECK_W207}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 148, 149, 153 (редакция от 16.04.2026)" },
          { href: "https://kurs.alfabank.ru/work-calendar/", label: "Производственный календарь на 2026 год — 4 ноября, День народного единства, нерабочий праздничный день" },
        ]}
        note="Страница пересказывает пункты 148, 149 и 153 ФНП № 461. Форму акта и срок замещения пункт 149 не называет; отнесение нерабочего праздничного дня к «другим случаям» отсутствия — толкование KRANNEVA."
      />
    </main>
  );
}
