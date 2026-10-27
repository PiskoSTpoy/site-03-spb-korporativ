import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W225, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 225. Сто четвёртый тип объекта — переезд через путь крана и пересечение путей крана с заводскими и железнодорожными (ФНП № 461, п. 201–202), иллюстрация — порт Петербурга.
  Фактура — в комментарии к FACT_CHECK_W223–225 в app/site-data.ts.
*/

const title = "Пересечение путей крана с железной дорогой в порту";
const description =
  "Портальный кран пересекает железнодорожные пути после мероприятий против столкновения и согласования с ведающей движением организацией (п. 202 ФНП).";
const h1 = "Можно ли пересекать пути портального крана с железнодорожными и кто это согласует?";
const canonical = "/obekty/peresechenie-relsovogo-puta-krana-s-zheleznoy-dorogoy/";
const published = "2026-10-27";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "pereezd", label: "Кто обустраивает переезд через путь крана" },
  { id: "zavodskoy", label: "Пересечение с путями заводского транспорта" },
  { id: "zheleznaya-doroga", label: "Пересечение с железнодорожными путями" },
  { id: "port", label: "Что из этого значит для порта Петербурга" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто обустраивает переезд транспорта через путь крана?",
    a: "Эксплуатирующая организация, с учётом интенсивности движения транспортных средств. Это правило п. 201 ФНП № 461 относится к подъёмным сооружениям, которые ходят по наземному рельсовому пути.",
  },
  {
    q: "Какие краны упомянуты в норме о пересечении с заводским транспортом?",
    a: "Козловые, башенные и портальные (п. 202). Пересечение допускается после разработки эксплуатирующей организацией мероприятий по предупреждению столкновения работающих кранов с подвижным составом.",
  },
  {
    q: "Нужно ли согласование для пересечения с железной дорогой?",
    a: "Да, для портального крана. Кроме мероприятий эксплуатирующей организации, пересечение с железнодорожными путями согласовывает организация, в ведении которой находится движение на этих путях (п. 202).",
  },
  {
    q: "Касается ли это автокрана на колёсном ходу?",
    a: "Нет. Пункты 201–202 написаны для кранов на рельсовом пути. Автокран KRANNEVA рельсового хода не имеет, но на территории порта или завода заказчик задаёт маршрут и места пересечения путей, и это согласовывается до выезда.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Согласование пересечений путей в ставку не входит.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Пересечение путей крана с железной дорогой", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором на территории порта и завода с рельсовыми и железнодорожными путями: согласование маршрута подачи",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Пересечение путей крана с железной дорогой</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · порт и заводские пути</span>
          <h1>{h1}</h1>
          <p>
            Пересечение путей портального крана с железнодорожными допускается только после мероприятий эксплуатирующей организации по предупреждению столкновения и после согласования с организацией, которая ведает движением на этих путях (п. 202 ФНП № 461). KRANNEVA подаёт автокраны на портовые и заводские территории с рельсовыми путями и заранее просит у заказчика схему пересечений, по которой идёт маршрут машины.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W225} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Переезды и пересечения путей кранов (ФНП № 461, п. 201–202)</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Что требует норма</th>
                <th scope="col">Кто отвечает</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Переезд транспорта через наземный путь крана</th><td>обустроить с учётом интенсивности движения</td><td>эксплуатирующая организация</td><td>201</td></tr>
              <tr><th scope="row">Козловой, башенный, портальный кран и заводской рельсовый транспорт</th><td>мероприятия против столкновения с подвижным составом</td><td>эксплуатирующая организация</td><td>202</td></tr>
              <tr><th scope="row">Портальный кран и железнодорожные пути</th><td>те же мероприятия и согласование</td><td>эксплуатирующая организация и организация, ведающая движением</td><td>202</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA на территорию с рельсовыми и железнодорожными путями</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>схема пересечений путей на маршруте, ответственный за движение на путях, допуск на территорию</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="pereezd">Кто обустраивает переезд через путь крана</h2>
        <p>
          Переезд транспортных средств через путь крана, движущегося по наземному рельсу, обустраивает эксплуатирующая организация, и делает это с учётом интенсивности движения (п. 201 ФНП № 461). Норма не называет ширину, покрытие или тип ограждения, и KRANNEVA типовых размеров не придумывает. Практический вопрос для автокрана другой: по какому переезду машина въедет на площадку и кто остановит движение крана на это время.
        </p>

        <h2 id="zavodskoy">Пересечение с путями заводского транспорта</h2>
        <p>
          Пересечение путей козловых, башенных и портальных кранов с рельсовыми путями заводского транспорта допускается после разработки эксплуатирующей организацией мероприятий по предупреждению столкновения работающих кранов с подвижным составом (п. 202 ФНП № 461). Сами мероприятия норма не перечисляет. Для заказчика это означает документ, который существует до начала работ, и KRANNEVA просит показать его, если маршрут автокрана пересекает такие пути.
        </p>

        <h2 id="zheleznaya-doroga">Пересечение с железнодорожными путями</h2>
        <p>
          Для портального крана п. 202 добавляет второе условие: пересечение с железнодорожными путями допускается после тех же мероприятий и после согласования организацией, в ведении которой находится организация движения на этих путях. Согласующий здесь не эксплуатирующая организация крана, а владелец или распорядитель путей. Родственные темы — <Link href="/obekty/gotovnost-relsovogo-puta-krana-akt-tupikovye-upory/">готовность рельсового пути крана</Link> и <Link href="/obekty/port-i-terminal/">порт и терминал</Link>.
        </p>

        <h2 id="port">Что из этого значит для порта Петербурга</h2>
        <p>
          В описании Большого порта Санкт-Петербург на портале peterburg2.ru сказано, что в порту больше 200 причалов, протяжённость линии составляет примерно 31 километр, навигация идёт круглый год, а зимой суда проводят ледоколы. У материала нет даты публикации, и о кранах и железнодорожных путях он не говорит. Вывод KRANNEVA: на такой протяжённости причального фронта пересечения путей встречаются часто, поэтому схему пересечений на маршруте автокрана запрашивают у терминала до выезда, а не на проходной.
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
        date={FACT_CHECK_W225}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 201–202 (редакция от 16.04.2026)" },
          { href: "https://peterburg2.ru/restplaces/bolshoy-port-27951.html", label: "peterburg2.ru: описание Большого порта Санкт-Петербург (материал без даты публикации)" },
        ]}
        note="Страница пересказывает пункты 201–202 ФНП № 461. Состав мероприятий против столкновения норма не задаёт, и мы его не приводим. Портал peterburg2.ru о кранах и железнодорожных путях не пишет и дат не даёт: связь между протяжённостью порта и частотой пересечений — вывод KRANNEVA. Запрос схемы пересечений у заказчика — практика компании, а не норма."
      />
    </main>
  );
}
