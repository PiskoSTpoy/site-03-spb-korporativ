import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W230, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 230. Сто девятый тип объекта — что проверяют при техническом освидетельствовании крана и подъёмника (ФНП № 461, п. 168–170).
  Фактура — в комментарии к FACT_CHECK_W229–231 в app/site-data.ts.
*/

const title = "Техосвидетельствование: что проверяют у крана и подъёмника";
const description =
  "П. 170 ФНП № 461: у крана девять проверок «а»–«и», у подъёмника (вышки) семь «а»–«ж». Таблица сравнения, полное и частичное освидетельствование.";
const h1 = "Что проверяют при техническом освидетельствовании крана и подъёмника (вышки)?";
const canonical = "/obekty/tehosvidetelstvovanie-krana-i-podemnika-chto-proveryayut/";
const published = "2026-10-29";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "tsel", label: "Что должно подтвердить освидетельствование" },
  { id: "polnoe-i-chastichnoe", label: "Полное и частичное освидетельствование" },
  { id: "kran", label: "Девять проверок крана" },
  { id: "podemnik", label: "Семь проверок подъёмника" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько проверок в п. 170 для крана?",
    a: "Девять подпунктов «а»–«и» плюс общий осмотр механизмов, тормозов, гидро- и электрооборудования, указателей, ограничителей и регистраторов в работе.",
  },
  {
    q: "Чем проверки подъёмника отличаются от проверок крана?",
    a: "У подъёмника нет проверок крюка, канатов и рельсового пути; есть гидравлическое оборудование и заземление, а у строительных подъёмников — ловители и точность остановки кабины.",
  },
  {
    q: "Проводят ли испытания при частичном освидетельствовании?",
    a: "Нет. Статические и динамические испытания при частичном освидетельствовании не проводятся (п. 169 ФНП № 461).",
  },
  {
    q: "Где хранится результат освидетельствования?",
    a: "Запись вносят в паспорт ПС; порядок описан на отдельной странице KRANNEVA. Сам п. 168 говорит о том, что должно быть подтверждено.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Техосвидетельствование: что проверяют у крана и подъёмника", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге с проверкой записи о техническом освидетельствовании в паспорте",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Техосвидетельствование: что проверяют у крана и подъёмника</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · техническое освидетельствование</span>
          <h1>{h1}</h1>
          <p>
            Пункт 170 ФНП № 461 отдельно перечисляет проверки для крана — девять подпунктов «а»–«и» — и для подъёмника (вышки) — семь подпунктов «а»–«ж». Общий набор (п. 169) шире только при полном освидетельствовании: осмотр, статические и динамические испытания, проверка устойчивости. KRANNEVA запрашивает запись об освидетельствовании SANY STC400T и Kato NK-250E-V в паспорте до подачи.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W230} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Сравнение проверок крана и подъёмника при техническом освидетельствовании (ФНП № 461, п. 170)</caption>
            <thead>
              <tr>
                <th scope="col">Объект проверки</th><th scope="col">Кран</th><th scope="col">Подъёмник (вышка)</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Металлоконструкции, сварные и болтовые соединения, кабина, лестницы, площадки, ограждения</th><td>да, подпункт «а»</td><td>да, подпункт «а»</td></tr>
              <tr><th scope="row">Крепление осей и пальцев</th><td>да, «е»</td><td>да, «в»</td></tr>
              <tr><th scope="row">Масса противовеса и балласта по чертежу и паспорту</th><td>да, «д»</td><td>да, «б» (при наличии)</td></tr>
              <tr><th scope="row">Заземление, изоляция проводов</th><td>да, «г»: с измерением сопротивления</td><td>да, «д»: электрическое заземление</td></tr>
              <tr><th scope="row">Крюк и блоки</th><td>да, «б»</td><td>нет</td></tr>
              <tr><th scope="row">Расстояние между крюковой подвеской и упором при срабатывании концевого выключателя</th><td>да, «в»</td><td>нет</td></tr>
              <tr><th scope="row">Канаты и их крепление</th><td>да, «з»</td><td>нет</td></tr>
              <tr><th scope="row">Рельсовый путь</th><td>да, «ж»</td><td>нет</td></tr>
              <tr><th scope="row">Освещение и сигнализация</th><td>да, «и»</td><td>нет</td></tr>
              <tr><th scope="row">Гидравлическое оборудование</th><td>в общем объёме проверки в работе</td><td>да, «г» (при наличии)</td></tr>
              <tr><th scope="row">Ловители с испытаниями; точность остановки кабины</th><td>нет</td><td>да, «е», «ж» (строительные подъёмники)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: запись об освидетельствовании при подаче автокрана KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>копия паспорта с записью о последнем освидетельствовании и датой следующего</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="tsel">Что должно подтвердить освидетельствование</h2>
        <p>
          Результат технического освидетельствования по п. 168 ФНП № 461 подтверждает две вещи: подъёмное сооружение и его установка соответствуют эксплуатационной документации и ФНП, а само сооружение находится в состоянии, обеспечивающем безопасную работу. Для автокрана Kato NK-250E-V это означает, что запись в паспорте — итог проверки, а не формальная отметка.
        </p>

        <h2 id="polnoe-i-chastichnoe">Полное и частичное освидетельствование</h2>
        <p>
          При полном освидетельствовании ПС проходит осмотр, статические испытания, динамические испытания и, если в паспорте есть характеристики устойчивости, испытания на устойчивость (п. 169; для ПС, не требующих дополнительного монтажа на месте, устойчивость не проверяют). При частичном освидетельствовании статические и динамические испытания не проводят. Испытания 125 % и 110 % KRANNEVA разбирает на странице <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">про статические и динамические испытания</Link>.
        </p>

        <h2 id="kran">Девять проверок крана</h2>
        <p>
          К общему осмотру и проверке в работе механизмов, тормозов, гидро- и электрооборудования, указателей, ограничителей и регистраторов (п. 170) для крана добавлены девять подпунктов: от состояния металлоконструкций до освещения и сигнализации. Подпункт «в» задаёт расстояние между крюковой подвеской и упором при срабатывании концевого выключателя — по этой строке автокран SANY STC400T проверяют как кран, а не как подъёмник.
        </p>

        <h2 id="podemnik">Семь проверок подъёмника (вышки)</h2>
        <p>
          Подъёмнику по п. 170 отведено семь проверок против девяти у крана. В списке нет крюка, канатов и рельсового пути, зато есть гидравлическое оборудование и электрическое заземление. Для строительных подъёмников добавлены испытания ловителей и проверка точности остановки кабины с полной нагрузкой и без неё. Норма браковки сборочных единиц, канатов и рельсовых путей указывается в руководстве по эксплуатации; без неё рельсовые пути бракуют по приложению № 3 к ФНП.
        </p>
        <p>
          Запись об освидетельствовании в паспорте KRANNEVA сверяет вместе со строкой о следующем сроке; порядок записи описан на странице <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">про освидетельствование в паспорте</Link>.
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
        date={FACT_CHECK_W230}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 168–170 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает п. 168–170 ФНП № 461. Нормы браковки и допуски приложений не приводятся. Запрос копии паспорта до подачи — практика KRANNEVA, а не требование нормы. Региональные данные по Петербургу не приводятся: проверенный источник не найден."
      />
    </main>
  );
}
