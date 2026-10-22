import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W211, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 211. Девяностый тип объекта — как проверяют ограничитель грузоподъёмности автокрана (ФНП № 461, п. 261–265, 269). Фактура — в комментарии к FACT_CHECK_W211–213
  в app/site-data.ts.
*/

const title = "Проверка ограничителя грузоподъёмности крана";
const description =
  "ФНП № 461 (п. 262): ОГП автокрана проверяют грузом в трёх точках характеристики; отключение при перегрузке не более 10 %, итог — акт к паспорту.";
const h1 = "Как проверяют ограничитель грузоподъёмности автокрана перед работой на объекте?";
const canonical = "/obekty/proverka-ogranichitelya-gruzopodemnosti-krana/";
const published = "2026-10-22";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "kto-proveryaet", label: "Кто проводит проверку" },
  { id: "tri-tochki", label: "Грузы и три точки характеристики" },
  { id: "peregruzka-10", label: "Порог отключения 10 %" },
  { id: "verhnee-nizhnee", label: "Верхнее и нижнее положение крюка" },
  { id: "akt-k-pasportu", label: "Акт и повторная проверка" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "При какой перегрузке должен срабатывать ограничитель автокрана?",
    a: "При допустимой перегрузке из паспорта крана, но не более 10 % для стреловых кранов, кранов-манипуляторов и подъёмников (п. 262 ФНП № 461). 15 % допускается для башенных кранов с моментом до 20 т·м и портальных, 25 % — для мостовых.",
  },
  {
    q: "В скольких точках проверяют ограничитель грузового момента?",
    a: "Не менее чем в трёх точках грузовой характеристики, если грузоподъёмность меняется с вылетом (п. 262). У автокрана она зависит от вылета всегда, поэтому одной точки недостаточно.",
  },
  {
    q: "Чем нагружают кран при проверке ОГП?",
    a: "Грузами или аттестованным устройством нагружения другого типа с погрешностью не более 3 % (п. 262 ФНП № 461).",
  },
  {
    q: "Нужно ли перепроверять ограничитель после смены стрелы или запасовки?",
    a: "Да. При изменении конфигурации — схемы запасовки или стрелового оборудования — проверки проводят повторно (п. 262).",
  },
  {
    q: "Где фиксируют результат проверки ограничителя?",
    a: "В акте, который становится неотъемлемым приложением к паспорту подъёмного сооружения (п. 269 ФНП № 461).",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Акт проверки ограничителя прикладывается к заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Проверка ограничителя грузоподъёмности", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором и актом проверки ограничителя грузоподъёмности",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Проверка ограничителя грузоподъёмности</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как сделать · приборы безопасности</span>
          <h1>{h1}</h1>
          <p>
            Ограничитель грузоподъёмности автокрана по пункту 262 ФНП № 461 должен отключить механизмы при перегрузке не выше паспортной и не более 10 %. Проверяют его грузами или аттестованным устройством с погрешностью до 3 %, минимум в трёх точках грузовой характеристики. Итог оформляют актом к паспорту крана. KRANNEVA перед подачей SANY STC400T или XCMG QY60K присылает заказчику этот акт вместе с паспортом.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W211} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Предельная перегрузка до отключения механизмов по п. 262 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Тип подъёмного сооружения</th>
                <th scope="col">Не более</th>
                <th scope="col">Особое условие</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Башенные (момент до 20 т·м) и портальные краны</th><td className="dtable__num">15 %</td><td>—</td></tr>
              <tr><th scope="row">Краны мостового типа</th><td className="dtable__num">25 %</td><td>груз не должен отрываться от земли</td></tr>
              <tr><th scope="row">Остальные: стреловые автокраны, манипуляторы, подъёмники, трубоукладчики</th><td className="dtable__num">10 %</td><td>не выше значения из паспорта крана</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с проверенным ограничителем</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>акт проверки ограничителя (приложение к паспорту), конфигурация стрелы на объекте</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="kto-proveryaet">Кто проводит проверку</h2>
        <p>
          Проверку ограничителей, указателей и регистратора пункт 261 ФНП № 461 поручает работникам, отвечающим требованиям пункта 20, и только в присутствии инженера, ответственного за содержание крана в работоспособном состоянии. Проверки сверх перечня пункта 259 делают по требованию эксплуатирующей организации, если параметр указан в паспорте прибора или крана (п. 260). Поэтому KRANNEVA называет в заявке на Liebherr LTM 1090-4.1 фамилию ответственного инженера, подписавшего последний акт.
        </p>

        <h2 id="tri-tochki">Грузы и три точки характеристики</h2>
        <p>
          Нагружают кран по пункту 262 ФНП № 461 контрольными грузами или аттестованным устройством нагружения с погрешностью не более 3 %. У автокрана грузоподъёмность меняется с вылетом, поэтому ограничитель грузового момента проверяют не менее чем в трёх точках грузовой характеристики. Ограничитель с несколькими режимами нельзя оставлять в режиме большей грузоподъёмности при фактической работе на меньшей. Для Kato NK-250E-V KRANNEVA сверяет режим ОГП с выбранной на объекте конфигурацией стрелы.
        </p>

        <h2 id="peregruzka-10">Порог отключения 10 %</h2>
        <p>
          Отключение всех механизмов, кроме опускания груза и уменьшения грузового момента, пункт 262 ФНП № 461 требует при перегрузке из паспорта, но не выше 10 % для стреловых кранов. После срабатывания проверяют, что никакой механизм, кроме опускания груза и уменьшения момента, уже не включается. Башенным и портальным кранам допускается 15 %, мостовым — 25 %, так что «чужую» цифру к автокрану не применяют. Для SANY STC400T порог берут из паспорта этой машины.
        </p>

        <h2 id="verhnee-nizhnee">Верхнее и нижнее положение крюка</h2>
        <p>
          Ограничитель верхнего положения пункт 263 ФНП № 461 проверяет без груза: после остановки механизма замеряют расстояние от крюковой подвески до упора или металлоконструкции. Нижнее положение по пункту 264 проверяют остановкой опускания и запасом каната: если РЭ молчит, на барабане остаётся не меньше полутора витков без учёта витков под зажимами. Пункт 265 добавляет проверку стрелы, которая при опускании или выдвижении упирается в крюк. На XCMG QY60K все три проверки входят в один акт.
        </p>

        <h2 id="akt-k-pasportu">Акт и повторная проверка</h2>
        <p>
          Результаты проверки ограничителей и указателей пункт 269 ФНП № 461 требует оформить актом, который становится неотъемлемым приложением к паспорту крана. Смена схемы запасовки или стрелового оборудования по пункту 262 означает повторную проверку. KRANNEVA просит заказчика заранее назвать вылет и массу груза, чтобы подать Liebherr LTM 1090-4.1 в уже проверенной конфигурации; это условие заявки, а не норма. Про таблички с датами освидетельствования — на странице <Link href="/obekty/tablichki-na-krane-pered-podachey/">о табличках на кране</Link>, про сами испытания — на странице <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">о статике 125 % и динамике 110 %</Link>.
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
        date={FACT_CHECK_W211}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 259–265, 269 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 259–265 и 269 ФНП № 461. Порог срабатывания конкретной машины берётся из её паспорта; просьба назвать вылет и массу груза заранее — условие заявки KRANNEVA, а не норма."
      />
    </main>
  );
}
