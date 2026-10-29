import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W228, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 228. Сто седьмой тип объекта — параметры региона в паспорте крана (ФНП № 461, п. 251 «м»), иллюстрация — ветер в Петербурге 08.04.2026.
  Фактура — в комментарии к FACT_CHECK_W226–228 в app/site-data.ts. Региональные нормативные значения ветра и температуры не приводятся — не сверены.
*/

const title = "Параметры региона в паспорте крана для Петербурга";
const description =
  "Кран не допускают в работу, если паспорт не подходит региону: температурный диапазон, ветровой регион (п. 251 «м» ФНП). Что сверить до выезда в Петербурге.";
const h1 = "Что проверить в паспорте крана, чтобы его допустили к работе в Петербурге?";
const canonical = "/obekty/parametry-regiona-v-pasporte-krana-dlya-peterburga/";
const published = "2026-10-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "norma", label: "Что говорит п. 251 «м»" },
  { id: "pasport", label: "Какие строки паспорта сверяют" },
  { id: "veter", label: "Ветер в Петербурге: апрель 2026" },
  { id: "kto", label: "Кто отвечает за допуск" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Что значит «кран не соответствует региону» в ФНП?",
    a: "Подъёмное сооружение не допускают в работу, если оно не подходит параметрам окружающей среды и региона применения: температурному диапазону, ветровому региону, сейсмичности района (п. 251 «м» ФНП № 461).",
  },
  {
    q: "Какие данные паспорта нужно сверить для Петербурга?",
    a: "Диапазон рабочих температур, допустимую скорость ветра для работы и для нерабочего состояния, ветровой регион исполнения. Конкретные региональные значения берут из действующих сводов правил, а не из этой страницы.",
  },
  {
    q: "Кто не допускает кран в работу?",
    a: "Эксплуатирующая организация (п. 251 ФНП). Запрос копии паспорта у арендодателя до выезда — практика заказчика и KRANNEVA, но не требование этого пункта к арендодателю.",
  },
  {
    q: "Был ли в Петербурге сильный ветер в 2026 году?",
    a: "Да: 8 апреля 2026 года МЧС Петербурга по данным Северо-Западного УГМС предупреждало о порывах до 18 м/с и гололедице. Материал dp.ru о кранах не пишет.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Простой по ветру в ставку не входит.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Параметры региона в паспорте крана для Петербурга", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге со сверкой паспорта по температурному диапазону и ветровому региону",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Параметры региона в паспорте крана для Петербурга</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · паспорт и климат</span>
          <h1>{h1}</h1>
          <p>
            Кран не допускают в работу, если он не соответствует температурному диапазону, ветровому региону и сейсмичности района применения (п. 251 «м» ФНП № 461). KRANNEVA перед подачей SANY STC400T или Kato NK-250E-V сверяет с паспортом машины две строки — рабочий температурный диапазон и допустимый ветер, — потому что кран с неподходящим паспортом остановят на площадке.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W228} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Параметры региона, по которым кран могут не допустить (ФНП № 461, п. 251 «м»)</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Где смотреть</th>
                <th scope="col">Что сверяют</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Температурный диапазон</th><td>паспорт и руководство по эксплуатации</td><td>рабочий диапазон крана против температур места работы</td></tr>
              <tr><th scope="row">Ветровой регион</th><td>паспорт, руководство, ППР</td><td>допустимый ветер для работы и в нерабочем состоянии</td></tr>
              <tr><th scope="row">Сейсмичность района</th><td>паспорт крана</td><td>значение берут из паспорта</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: сверка паспорта перед подачей автокрана KRANNEVA в Петербурге</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>копия паспорта, температура на период работ, ограничение по ветру в ППР</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="norma">Что говорит п. 251 «м»</h2>
        <p>
          Эксплуатирующая организация не должна допускать подъёмное сооружение в работу, если оно не соответствует параметрам окружающей среды и региона применения: температурному диапазону, ветровому региону и сейсмичности района (п. 251 «м» ФНП № 461). Подпункт входит в перечень из тринадцати оснований, разобранный на странице <Link href="/obekty/kogda-kran-ne-dopuskayut-v-rabotu-po-p-251/">про п. 251</Link>. Числовых значений норма не задаёт: она отсылает к паспорту, и KRANNEVA региональных цифр без проверки в тексте не пишет.
        </p>

        <h2 id="pasport">Какие строки паспорта сверяют</h2>
        <p>
          В паспорте и руководстве по эксплуатации Kato NK-250E-V и других машин ищут две вещи: диапазон температур, в котором кран работает, и допустимую скорость ветра при работе и в нерабочем состоянии. Если на период работ ожидается температура ниже рабочего диапазона, KRANNEVA заменяет машину на подходящую по паспорту до выезда, а не на площадке. Страница <Link href="/obekty/veter-i-gololed/">про ветер и гололёд</Link> разбирает ветер и гололёд в день подачи.
        </p>

        <h2 id="veter">Ветер в Петербурге: апрель 2026</h2>
        <p>
          По материалу dp.ru от 8 апреля 2026 года, МЧС Петербурга по данным Северо-Западного УГМС предупреждало о порывах ветра до 18 м/с и гололедице, а в городе падали заборы и повреждались машины. О кранах публикация не пишет. Вывод KRANNEVA: для города, где порыв такой силы возможен весной, строка о допустимом ветре в паспорте крана — не формальность, и ППР должен содержать ограничение по ветру. Порядок действий при шторме описан на странице <Link href="/obekty/shtormovoy-veter-i-kran-v-nerabochem-sostoyanii/">про штормовой ветер и нерабочее состояние</Link>.
        </p>

        <h2 id="kto">Кто отвечает за допуск</h2>
        <p>
          Не допускает кран к работе эксплуатирующая организация, и пункт 251 адресован именно ей. Арендодатель в норме не назван, поэтому запрос копии паспорта до выезда — практика заказчика и KRANNEVA, а не требование этого пункта. Для заказчика с жёстким графиком выгоднее получить копию паспорта на этапе заявки: расхождение между диапазоном крана и погодой на объекте проще решить сменой машины, чем остановкой работ на площадке.
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
        date={FACT_CHECK_W228}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 251 «м» (редакция от 16.04.2026)" },
          { href: "https://www.dp.ru/a/2026/04/08/peterburzhci-zhalujutsja-na-silnij", label: "dp.ru, 08.04.2026: петербуржцы жалуются на сильный ветер — порывы до 18 м/с по данным МЧС и Северо-Западного УГМС" },
        ]}
        note="Страница пересказывает п. 251 «м» ФНП № 461. Нормативные значения ветра и температуры для Петербурга здесь не приводятся: они не сверены с первоисточником. dp.ru о кранах не пишет; значение строки паспорта для Петербурга — вывод KRANNEVA. Запрос копии паспорта и сверка диапазонов — практика компании, а не норма."
      />
    </main>
  );
}
