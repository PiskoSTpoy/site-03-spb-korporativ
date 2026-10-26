import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W220, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 220. Девяносто девятый тип объекта — проверки приборов безопасности при техническом диагностировании крана (ФНП № 461, п. 259–260).
  Фактура — в комментарии к FACT_CHECK_W220–222 в app/site-data.ts.
*/

const title = "Какие приборы безопасности проверяют у крана (п. 259)";
const description =
  "При диагностировании крана п. 259 ФНП № 461 требует проверить 20 устройств: от ограничителя грузоподъёмности до противоугонных захватов. Что сверяет KRANNEVA.";
const h1 = "Какие приборы безопасности проверяют у крана при техническом диагностировании?";
const canonical = "/obekty/proverka-priborov-bezopasnosti-krana-pri-diagnostirovanii/";
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
  { id: "perechen", label: "Что входит в перечень пункта 259" },
  { id: "avtokran", label: "Какие подпункты касаются автокрана" },
  { id: "posle", label: "Что идёт после проверки приборов" },
  { id: "p260", label: "Проверки сверх перечня" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько устройств перечисляет пункт 259 ФНП № 461?",
    a: "Перечень идёт подпунктами от «а» до «ф» — это 20 позиций: от световых и звуковых указателей до тупиковых упоров кранов на рельсовом пути. Часть позиций относится к подъёмникам с люлькой и строительным подъёмникам, на стреловом автокране их не проверяют.",
  },
  {
    q: "Когда проверяют ограничитель грузоподъёмности?",
    a: "Подпункт «б» пункта 259 включает его в проверку работоспособности при техническом диагностировании. Порядок проверки в эксплуатации описан отдельно, в пунктах 261–265, и разобран на странице об ограничителе грузоподъёмности.",
  },
  {
    q: "Что делают после положительной проверки приборов?",
    a: "Пункт 259 прямо говорит: при положительных результатах проверки по подпунктам «а»–«ф» проводятся статические и динамические испытания. Приборы проверяют раньше груза, а не наоборот.",
  },
  {
    q: "Можно ли добавить проверки, которых нет в пункте 259?",
    a: "Да, пункт 260 разрешает проверки сверх перечня по требованию эксплуатирующей организации, если проверяемый параметр дополнительно указан в паспорте прибора или в паспорте подъёмного сооружения.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Диагностирование и проверки приборов в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Приборы безопасности при диагностировании", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: сверка приборов безопасности по паспорту перед подачей",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Приборы безопасности при диагностировании</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как это устроено · приборы безопасности</span>
          <h1>{h1}</h1>
          <p>
            Пункт 259 ФНП № 461 перечисляет 20 устройств, работоспособность которых проверяют при техническом диагностировании подъёмного сооружения: подпункты «а»–«ф», от световых и звуковых указателей до тупиковых упоров. Для стрелового автокрана на этот перечень опирается проверка, которую KRANNEVA сверяет по паспорту перед подачей SANY STC400T: ограничитель грузоподъёмности, защита от ЛЭП, регистратор параметров, указатель угла наклона.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W220} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Приборы из пункта 259 ФНП № 461, которые есть на стреловом автокране</caption>
            <thead>
              <tr>
                <th scope="col">Устройство</th>
                <th scope="col">Подпункт</th>
                <th scope="col">Что проверяют</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Ограничитель грузоподъёмности, грузового момента, предельного груза</th><td>«б»</td><td>работоспособность и соответствие документации изготовителя</td></tr>
              <tr><th scope="row">Ограничители верхнего положения крюка, подъёма и опускания стрелы</th><td>«в»</td><td>автоматическая остановка механизма</td></tr>
              <tr><th scope="row">Ограничитель перемещения груза в запрещённой зоне (над кабиной)</th><td>«г»</td><td>срабатывание при заходе груза над кабиной шасси</td></tr>
              <tr><th scope="row">Регистратор параметров с часами и календарём</th><td>«д»</td><td>запись и точность времени</td></tr>
              <tr><th scope="row">Защита от опасного приближения к ЛЭП</th><td>«е»</td><td>срабатывание указателя</td></tr>
              <tr><th scope="row">Указатель угла наклона самоходного ПС</th><td>«п»</td><td>показания на выставленном кране</td></tr>
              <tr><th scope="row">Сигнализатор предельной скорости ветра</th><td>«т»</td><td>порог сигнала</td></tr>
              <tr><th scope="row">Противоугонные захваты</th><td>«у»</td><td>наличие и работоспособность</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача стрелового автокрана KRANNEVA со сверкой приборов</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что сверяют до выезда</th><td>записи о проверке приборов безопасности в паспорте и в акте диагностирования</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="perechen">Что входит в перечень пункта 259</h2>
        <p>
          Пункт 259 ФНП № 461 требует при техническом диагностировании подъёмного сооружения проверить работоспособность и соответствие документации изготовителя у металлоконструкций, узлов, механизмов, гидро- и пневмосистем, электрооборудования, указателей, ограничителей, регистраторов и средств автоматической остановки. Дальше норма перечисляет конкретные устройства подпунктами «а»–«ф»: ограничители, сигнализаторы, блокировки, защиты, регистратор. Перечень общий для всех типов подъёмных сооружений, поэтому KRANNEVA отделяет в нём позиции, относящиеся к стреловому крану на автошасси.
        </p>

        <h2 id="avtokran">Какие подпункты касаются автокрана</h2>
        <p>
          Для стрелового автокрана Liebherr LTM 1090-4.1 или XCMG QY60K применимы подпункты «а»–«е», «з», «п», «т» и «у». Это указатели, ограничитель грузоподъёмности, остановка механизмов, защита от перемещения груза над кабиной, регистратор, защита от ЛЭП, блокировки, указатель наклона, сигнализатор ветра и противоугонные захваты. Подпункты про люльки, ловители и строительные подъёмники («и», «к»–«р») относятся к другим машинам, а «ф» — к кранам на рельсовом пути. Сигнализатор ветра из подпункта «т» связан с правилами для нерабочего состояния, описанными на странице о <Link href="/obekty/shtormovoy-veter-i-kran-v-nerabochem-sostoyanii/">штормовом ветре</Link>.
        </p>

        <h2 id="posle">Что идёт после проверки приборов</h2>
        <p>
          Пункт 259 задаёт порядок: только при положительных результатах проверки по подпунктам «а»–«ф» проводятся статические и динамические испытания. Такая очерёдность защищает людей: кран с неисправным ограничителем не поднимает испытательный груз сверх паспортного. Сами испытания разобраны на страницах о <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">статических и динамических испытаниях</Link> и о <Link href="/obekty/ispytaniya-krana-na-gruzovuyu-ustoychivost/">грузовой устойчивости</Link>. Ограничитель грузоподъёмности в эксплуатации проверяют по другим пунктам — <Link href="/obekty/proverka-ogranichitelya-gruzopodemnosti-krana/">261–265</Link>.
        </p>

        <h2 id="p260">Проверки сверх перечня</h2>
        <p>
          Пункт 260 ФНП № 461 допускает проверки, не названные в пункте 259, по требованию эксплуатирующей организации — при условии, что проверяемый параметр или характеристика дополнительно приведены в паспорте прибора, ограничителя, регистратора или самого подъёмного сооружения. KRANNEVA для арендатора формулирует так: расширить программу проверок можно только опираясь на паспорт, а не на пожелание. Указатель опасного приближения к ЛЭП из подпункта «е» подробнее описан на странице об <Link href="/obekty/ukazatel-opasnogo-priblizheniya-k-lep-i-maket/">указателе и макете ЛЭП</Link>.
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
        date={FACT_CHECK_W220}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 259–260 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 259–260 ФНП № 461. Критерии срабатывания каждого прибора норма не называет — они в документации изготовителя, и мы их не приводим. Отнесение подпунктов к стреловому автокрану — вывод KRANNEVA по назначению устройств, а не текст нормы; то, что KRANNEVA сверяет записи по паспорту до выезда, — практика компании."
      />
    </main>
  );
}
