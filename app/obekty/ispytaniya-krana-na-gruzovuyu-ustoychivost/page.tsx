import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W217, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 217. Девяносто шестой тип объекта — испытания стрелового самоходного крана на грузовую устойчивость (ФНП № 461, п. 186–188).
  Фактура — в комментарии к FACT_CHECK_W217–219 в app/site-data.ts.
*/

const title = "Испытания крана на грузовую устойчивость: когда нужны";
const description =
  "Испытания стрелового крана на грузовую устойчивость нужны, если в паспорте нет ссылки на прошлые (п. 186 ФНП). Что проверить до подачи крана KRANNEVA.";
const h1 = "Когда стреловому самоходному крану нужны испытания на грузовую устойчивость?";
const canonical = "/obekty/ispytaniya-krana-na-gruzovuyu-ustoychivost/";
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
  { id: "kogda", label: "Когда испытания обязательны" },
  { id: "polozhenie", label: "В каком положении кран испытывают" },
  { id: "povtornye", label: "Что с повторными освидетельствованиями" },
  { id: "pasport", label: "Что проверить в паспорте до подачи" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Нужно ли испытывать автокран на устойчивость каждый год?",
    a: "Пункт 186 ФНП № 461 привязывает испытания к первичному освидетельствованию и к ремонту расчётных элементов, а не к календарю. Пункт 187 для повторных освидетельствований кранов стрелового типа и подъёмников с люлькой на оголовке стрелы испытания на устойчивость исключает, если иное не указано в руководстве по эксплуатации.",
  },
  {
    q: "Что считается ремонтом расчётных элементов?",
    a: "По п. 186 это ремонт стрелы, гуська, аутригеров или опорно-поворотного устройства с заменой элементов либо с применением сварки. Отдельным основанием названо изменение первоначальных геометрических размеров конструкции.",
  },
  {
    q: "Чем эти испытания отличаются от статических на 125 %?",
    a: "Статические и динамические испытания проверяют прочность и механизмы грузом сверх паспортного (п. 171, 179), а испытания на устойчивость — запас против опрокидывания. В пунктах 186–188 процент груза не указан: параметры берут из руководства по эксплуатации крана.",
  },
  {
    q: "Где посмотреть, проводились ли такие испытания?",
    a: "В паспорте крана: п. 186 прямо говорит о ссылках на результаты ранее проведённых испытаний в паспорте. Если ссылки нет, это и есть основание провести испытания при первичном освидетельствовании.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Сами испытания в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Испытания на грузовую устойчивость", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: проверка испытаний на грузовую устойчивость перед подачей",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Испытания на грузовую устойчивость</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как это устроено · испытания крана</span>
          <h1>{h1}</h1>
          <p>
            Испытания на грузовую устойчивость проводят при первичном техническом освидетельствовании стрелового самоходного крана, если в паспорте нет ссылок на такие испытания, а также после ремонта стрелы, гуська, аутригеров или опорно-поворотного устройства с заменой элементов, сваркой либо изменением размеров (п. 186 ФНП № 461). KRANNEVA перед подачей SANY STC400T сверяет паспорт: запись об испытаниях или её отсутствие определяет, потребуется ли проверка до начала работ.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W217} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Когда испытания на грузовую устойчивость нужны, а когда нет (ФНП № 461, п. 186–187)</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Испытания на устойчивость</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Первичное освидетельствование, в паспорте нет ссылки на прошлые испытания</th><td>проводят</td><td>186</td></tr>
              <tr><th scope="row">Ремонт стрелы, гуська, аутригеров или опорно-поворотного устройства с заменой элементов или сваркой</th><td>проводят</td><td>186</td></tr>
              <tr><th scope="row">Изменение первоначальных геометрических размеров конструкции</th><td>проводят</td><td>186</td></tr>
              <tr><th scope="row">Повторное освидетельствование крана стрелового типа или подъёмника с люлькой на оголовке стрелы</th><td>не проводят, если иное не сказано в РЭ</td><td>187</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача стрелового автокрана KRANNEVA с проверкой паспорта</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что сверяют до выезда</th><td>запись об испытаниях на устойчивость и сведения о ремонте металлоконструкций в паспорте</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="kogda">Когда испытания обязательны</h2>
        <p>
          Пункт 186 ФНП № 461 называет два случая, когда стреловой самоходный кран проходит испытания на грузовую устойчивость: первичное освидетельствование без записи об испытаниях в паспорте и ремонт расчётных элементов. Расчётными элементами норма считает стрелу, гусёк, аутригеры и опорно-поворотное устройство; основанием служит замена элементов, сварка либо изменение первоначальных геометрических размеров. Для Liebherr LTM 1090-4.1 это означает: запись в паспорте о ремонте аутригера со сваркой возвращает вопрос об устойчивости, даже если кран давно работает.
        </p>

        <h2 id="polozhenie">В каком положении кран испытывают</h2>
        <p>
          Пункт 188 требует проводить испытания на устойчивость в таких положениях и вариантах исполнения в пределах рабочей зоны, при которых устойчивость крана минимальна. Выбор положения, таким образом, не зависит от удобства площадки: проверяют самый невыгодный вариант, а не типовой. Если для разных положений или рабочих зон заданы разные нагрузки, пункт 188 отдельно оговаривает порядок, и читать его нужно вместе с руководством по эксплуатации. Величину испытательного груза пункты 186–188 не называют, поэтому KRANNEVA не приводит процент и отсылает к РЭ конкретной модели. Требования к самой площадке описаны на странице о <Link href="/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/">площадке для испытаний: грунт и уклон</Link>.
        </p>

        <h2 id="povtornye">Что с повторными освидетельствованиями</h2>
        <p>
          Пункт 187 ФНП № 461 снимает испытания на устойчивость при повторных освидетельствованиях с кранов стрелового типа и подъёмников (вышек), у которых люлька закреплена на оголовке стрелы, если иное не указано в руководстве по эксплуатации. Для Kato NK-250E-V в паспорте и РЭ это поэтому первое, что нужно прочитать. Статические и динамические испытания остаются отдельной темой: грузом на 25 % и 10 % выше паспортного кран проверяют по другим пунктам, и они описаны на странице о <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">статических и динамических испытаниях</Link>.
        </p>

        <h2 id="pasport">Что проверить в паспорте до подачи</h2>
        <p>
          Паспорт стрелового крана по п. 186 ФНП № 461 должен содержать либо ссылку на испытания на устойчивость, либо понятную историю того, почему их не проводили. KRANNEVA рекомендует искать три записи: результат первичных испытаний, сведения о ремонте стрелы, гуська, аутригеров и опорно-поворотного устройства, а также отметку об изменении размеров конструкции. Срок очередного освидетельствования читают по другой странице — <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">о сроке освидетельствования в паспорте</Link>. Выбор и допуск крана к работе в целом описан в перечне <Link href="/obekty/kogda-kran-ne-dopuskayut-v-rabotu-po-p-251/">пункта 251 ФНП</Link>.
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
        date={FACT_CHECK_W217}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 186–188 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 186–188 ФНП № 461. Величину испытательной нагрузки на устойчивость эти пункты не называют, и мы её не приводим: она задаётся руководством по эксплуатации конкретной модели. Что KRANNEVA сверяет паспорт до выезда — практика компании, а не норма."
      />
    </main>
  );
}
