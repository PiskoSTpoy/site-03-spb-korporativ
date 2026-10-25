import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W219, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 219. Девяносто восьмой тип объекта — комплект испытательных грузов, два механизма подъёма и сменные грузозахватные органы (ФНП № 461, п. 180–183);
  региональная иллюстрация — испытание Zoomlion ZCC32000 на ЛАЭС-2 (Ленинградская область), 500 т.
  Фактура — в комментарии к FACT_CHECK_W217–219 в app/site-data.ts.
*/

const title = "Испытательные грузы для крана: чей комплект и какая масса";
const description =
  "Комплект испытательных грузов с фактической массой обеспечивает эксплуатирующая организация (п. 183 ФНП). Что это значит для заказчика крана KRANNEVA.";
const h1 = "Кто обеспечивает испытательные грузы для испытаний крана и что проверяют у сменных органов?";
const canonical = "/obekty/komplekt-ispytatelnyh-gruzov-i-smennye-organy-krana/";
const published = "2026-10-25";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "komplekt", label: "Кто обеспечивает комплект грузов" },
  { id: "mehanizmy", label: "Два механизма подъёма" },
  { id: "organy", label: "Сменные грузозахватные органы" },
  { id: "primer", label: "Масштаб: 500 тонн на ЛАЭС-2" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто должен обеспечить испытательные грузы?",
    a: "По п. 183 ФНП № 461 комплект испытательных (контрольных) грузов с указанием их фактической массы обеспечивает эксплуатирующая организация. Если испытания идут после ремонта на территории специализированной организации, грузы обеспечивает она.",
  },
  {
    q: "Почему важна именно фактическая масса груза?",
    a: "Нагрузку испытаний считают от паспортной грузоподъёмности: 125 % для статических и 110 % для динамических. Номинальная масса блока не подтверждает эти проценты; пункт 183 поэтому требует указывать фактическую массу.",
  },
  {
    q: "Нужно ли испытывать каждый механизм подъёма?",
    a: "Да, если у крана два и более механизма подъёма и предусмотрена их раздельная работа. Пункт 180 требует провести статические и динамические испытания в отношении каждого такого механизма.",
  },
  {
    q: "Проводят ли динамические испытания, если кран только поднимает и опускает груз?",
    a: "Нет. Пункт 181 освобождает от динамических испытаний подъёмные сооружения, которые используются только для подъёма и опускания груза.",
  },
  {
    q: "С какими грузозахватными органами испытывают кран?",
    a: "Вновь смонтированный кран испытывают со всеми органами, указанными в паспорте. При повторных испытаниях в периодическое освидетельствование разрешено использовать только тот орган, который установлен на момент испытаний (п. 182).",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Испытательные грузы в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Испытательные грузы и сменные органы", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подготовка испытательных грузов и сменных грузозахватных органов",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Испытательные грузы и сменные органы</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Северо-Запада · испытания крана</span>
          <h1>{h1}</h1>
          <p>
            Комплект испытательных грузов с указанием их фактической массы обеспечивает эксплуатирующая организация, а при испытаниях после ремонта у специализированной организации — она сама (п. 183 ФНП № 461). Для крана с несколькими механизмами подъёма п. 180 требует отдельных испытаний каждого, а п. 182 различает первичные испытания со всеми сменными органами и повторные с установленным. KRANNEVA при подаче Kato NK-250E-V сверяет, какой орган указан в паспорте и какой будет на крюке.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W219} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что требуют пункты 180–183 ФНП № 461 при испытаниях крана</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Требование</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Два и более механизма подъёма, предусмотрена раздельная работа</th><td>статические и динамические испытания каждого механизма</td><td>180</td></tr>
              <tr><th scope="row">Кран только поднимает и опускает груз</th><td>динамические испытания не проводят</td><td>181</td></tr>
              <tr><th scope="row">Вновь смонтированный кран с несколькими сменными органами</th><td>испытания со всеми органами из паспорта</td><td>182</td></tr>
              <tr><th scope="row">Повторные испытания при периодическом освидетельствовании</th><td>только с тем органом, который установлен</td><td>182</td></tr>
              <tr><th scope="row">Испытательные грузы</th><td>комплект с фактической массой; обеспечивает эксплуатирующая или специализированная организация</td><td>183</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с проверкой грузозахватного органа</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link></td></tr>
              <tr><th scope="row">Что сверяют до выезда</th><td>какие грузозахватные органы указаны в паспорте и какой нужен на объекте</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="komplekt">Кто обеспечивает комплект грузов</h2>
        <p>
          Пункт 183 ФНП № 461 возлагает обеспечение комплекта испытательных грузов на эксплуатирующую организацию и требует, чтобы у каждого груза была указана фактическая масса. Если испытания проходят по завершении ремонта или реконструкции на территории специализированной организации, грузы приносит она. Фактическая масса важна потому, что нагрузку считают в процентах от паспортной грузоподъёмности, а номинал блока этого не гарантирует. Для заказчика Liebherr LTM 1090-4.1 из этого следует практический вопрос к исполнителю: откуда берётся комплект и подтверждена ли масса. Площадку под такие грузы описывает страница о <Link href="/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/">площадке для испытаний</Link>.
        </p>

        <h2 id="mehanizmy">Два механизма подъёма</h2>
        <p>
          Кран с двумя и более механизмами подъёма при раздельной работе проходит статические и динамические испытания по каждому механизму, а не один раз на весь кран (п. 180 ФНП № 461). Пункт 181 смягчает требование для машин, которые только поднимают и опускают груз: динамические испытания у них не проводят. Если у Kato NK-250E-V паспорт предусматривает раздельную работу двух подъёмов, это значит две записи об испытаниях в акте. Какие проценты нагрузки применяют, описано на странице о <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">статических и динамических испытаниях</Link>.
        </p>

        <h2 id="organy">Сменные грузозахватные органы</h2>
        <p>
          Пункт 182 ФНП № 461 различает два случая: вновь смонтированный кран испытывают со всеми грузозахватными органами из паспорта, а при периодическом освидетельствовании разрешено повторять испытания только с тем органом, который установлен в этот момент. Для SANY STC400T это значит, что запись в акте относится к конкретному органу. KRANNEVA советует называть в заявке нужный орган заранее, чтобы паспорт и акт подтверждали именно его. Что делать со стропами и траверсами заказчика, сказано на странице о <Link href="/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/">стропах и траверсах заказчика или арендодателя</Link>.
        </p>

        <h2 id="primer">Масштаб: 500 тонн на ЛАЭС-2</h2>
        <p>
          Испытательный груз в 500 тонн поднимал гусеничный кран Zoomlion ZCC32000 на стройке третьего энергоблока Ленинградской АЭС-2, сообщил портал «ВСЁ» (www1.ru) 11 сентября 2025 года. Груз на металлической раме подняли на 100 мм, выдержали 10 минут и опустили на площадку. Этот порядок совпадает по форме с п. 232 ФНП № 461 для приспособлений: подъём на 50–100 мм и выдержка не менее 10 минут. Заметка ничего не говорит о Петербурге и о комплекте грузов по п. 183; KRANNEVA приводит её только как пример масштаба, в котором испытательная нагрузка измеряется сотнями тонн, а для автокрана 25–80 т комплект на порядок меньше.
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
        date={FACT_CHECK_W219}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 180–183 (редакция от 16.04.2026)" },
          { href: "https://www1.ru/news/2025/09/11/gigantskii-kran-uspesno-ispytali-na-stroike-leningradskoi-aes-2.amp.html", label: "«ВСЁ» (www1.ru), 11.09.2025: гигантский кран успешно испытали на стройке Ленинградской АЭС-2" },
        ]}
        note="Страница пересказывает пункты 180–183 ФНП № 461. Заметка об АЭС-2 не относится к автокранам и к Петербургу и не говорит о комплекте грузов по п. 183: это иллюстрация масштаба, а не норма. Что KRANNEVA советует называть грузозахватный орган в заявке — практика компании, а не норма."
      />
    </main>
  );
}
