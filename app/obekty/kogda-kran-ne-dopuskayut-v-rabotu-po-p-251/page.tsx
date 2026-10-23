import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W215, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 215. Девяносто четвёртый тип объекта — перечень обстоятельств, при которых кран не допускают в работу (ФНП № 461, п. 251 «а»–«н»).
  Фактура — в комментарии к FACT_CHECK_W214–216 в app/site-data.ts.
*/

const title = "Когда кран не допускают в работу: перечень п. 251";
const description =
  "ФНП № 461 (п. 251): эксплуатирующая организация не допускает кран в работу при 13 обстоятельствах — от неаттестованного персонала до дефектов основания.";
const h1 = "В каких случаях кран нельзя допускать в работу по пункту 251 ФНП № 461?";
const canonical = "/obekty/kogda-kran-ne-dopuskayut-v-rabotu-po-p-251/";
const published = "2026-10-23";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "lyudi", label: "Люди: персонал и ответственные" },
  { id: "dokumenty", label: "Документы и освидетельствование" },
  { id: "tehnika", label: "Техника и грузозахватные приспособления" },
  { id: "rabota", label: "Организация работ" },
  { id: "sreda", label: "Регион и основание" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто по пункту 251 не должен допускать кран в работу?",
    a: "Эксплуатирующая организация. Пункт 251 ФНП № 461 адресован ей: допуск запрещён, если при проверке выявлено хотя бы одно из перечисленных обстоятельств.",
  },
  {
    q: "Достаточно ли одного нарушения из перечня?",
    a: "Да. Перечень а)–н) построен как набор самостоятельных оснований: любое установленное при проверке обстоятельство означает, что кран в работу не допускают, пока оно не устранено.",
  },
  {
    q: "Какие ответственные специалисты должны быть назначены?",
    a: "Три: ответственный за осуществление производственного контроля, ответственный за содержание подъёмного сооружения в работоспособном состоянии и ответственный за безопасное производство работ с применением ПС. Если не назначен хотя бы один — допуск запрещён (п. 251 «б»).",
  },
  {
    q: "Что значит «не соответствует параметрам региона»?",
    a: "По подпункту «м» подъёмное сооружение не должно эксплуатироваться, если оно не подходит по температурному диапазону, ветровому району или сейсмичности места применения. Значения берут из паспорта и руководства по эксплуатации машины.",
  },
  {
    q: "Допускают ли кран без паспорта?",
    a: "Нет. Подпункт «и» перечисляет отсутствие паспорта подъёмного сооружения и (или) руководства по эксплуатации среди обстоятельств, при которых кран в работу не допускают.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Документы по перечню пункта 251 запрашиваются в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Когда кран не допускают в работу", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с проверкой допуска к работе по п. 251 ФНП № 461",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Когда кран не допускают в работу</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · допуск техники к работе</span>
          <h1>{h1}</h1>
          <p>
            Пункт 251 ФНП № 461 перечисляет тринадцать обстоятельств а)–н), при которых эксплуатирующая организация не должна допускать подъёмное сооружение в работу: достаточно одного. Часть относится к людям (неаттестованный персонал, не назначены три ответственных), часть — к документам и технике, часть — к месту работы (регион, основание). KRANNEVA сверяет эти пункты с паспортом SANY STC400T и приказами до выезда на объект.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W215} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Группы оснований п. 251 ФНП № 461 и подпункты</caption>
            <thead>
              <tr>
                <th scope="col">Группа</th>
                <th scope="col">Подпункты</th>
                <th scope="col">Что проверяют</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Люди</th><td>«а», «б»</td><td>аттестация персонала, три назначенных ответственных</td></tr>
              <tr><th scope="row">Документы</th><td>«в», «г», «и»</td><td>техническое освидетельствование, экспертиза, предписания, паспорт и РЭ</td></tr>
              <tr><th scope="row">Техника</th><td>«д», «е»</td><td>трещины, ограничители, износ узлов, съёмные грузозахватные приспособления</td></tr>
              <tr><th scope="row">Организация работ</th><td>«ж», «з», «к», «л»</td><td>ППР, ТК, наряды-допуски, их выполнение, соответствие технологии</td></tr>
              <tr><th scope="row">Регион и основание</th><td>«м», «н»</td><td>температура, ветровой район, сейсмичность, дефекты оснований</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: допуск автокрана KRANNEVA к работе на объекте</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что запрашивают до выезда</th><td>паспорт и РЭ, приказы об ответственных, акт освидетельствования</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="lyudi">Люди: персонал и ответственные</h2>
        <p>
          Первые два основания пункта 251 ФНП № 461 касаются людей, а не техники. Подпункт «а» запрещает допуск, если подъёмное сооружение обслуживает неаттестованный персонал. Подпункт «б» — если не назначен хотя бы один из трёх специалистов: ответственный за производственный контроль, за содержание в работоспособном состоянии и за безопасное производство работ. Для Kato NK-250E-V на объекте KRANNEVA ожидает увидеть три приказа, а не один. Как замещают ответственного в отпуск, разобрано на странице о <Link href="/obekty/zameshchenie-otvetstvennogo-inzhenera-v-otpusk-i-prazdnik/">замещении ответственного инженера</Link>.
        </p>

        <h2 id="dokumenty">Документы и освидетельствование</h2>
        <p>
          Документальные основания пункт 251 ФНП № 461 разносит по подпунктам «в», «г» и «и». Кран не допускают без проведённого технического освидетельствования и без экспертизы промышленной безопасности в случаях, где её требуют ФНП; при невыполненных предписаниях федеральных органов надзора; при отсутствии паспорта или руководства по эксплуатации. XCMG QY60K приходит на объект KRANNEVA с паспортом, и именно его даты освидетельствования сверяют в первую очередь — порядок описан на странице о <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">сроках освидетельствования</Link>.
        </p>

        <h2 id="tehnika">Техника и грузозахватные приспособления</h2>
        <p>
          Технические основания подпункта «д» пункта 251 ФНП № 461 — трещины или остаточные деформации металлоконструкций, ослабление креплений, неработоспособные заземление, указатели, ограничители, регистраторы и блокировки, недопустимый износ крюков, колёс, канатов, цепей и тормозов, а также неисправная система управления. Подпункт «е» добавляет: нет съёмных грузозахватных приспособлений, подходящих по массе и виду груза, или они неработоспособны. KRANNEVA оценивает канаты по пункту 270, разобранном на странице <Link href="/obekty/brakovka-gruzovogo-kanata-krana-po-obryvam-i-iznosu/">о браковке грузового каната</Link>, а для стропов — в пунктах 271–274.
        </p>

        <h2 id="rabota">Организация работ</h2>
        <p>
          Четыре основания пункта 251 ФНП № 461 описывают организацию работ вокруг Liebherr LTM 1090-4.1 в парке KRANNEVA. Подпункт «ж»: нет ППР, технологической карты или наряда-допуска там, где ФНП их требуют. Подпункт «з»: не выполнены меры из этих документов. Подпункт «к»: работа идёт с нарушениями ФНП, ППР и инструкций. Подпункт «л»: подъёмное сооружение не соответствует технологическому процессу, в котором задействовано. Первые два подпункта связаны с документами из страницы о <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">ППР и технологической карте</Link>.
        </p>

        <h2 id="sreda">Регион и основание</h2>
        <p>
          Два последних основания пункта 251 ФНП № 461 связывают кран с местом. Подпункт «м»: подъёмное сооружение не соответствует параметрам окружающей среды и региона — температурному диапазону, ветровому району, сейсмичности. Подпункт «н»: здания, сооружения и конструкции, воспринимающие нагрузки от крана, имеют недопустимые дефекты, превышающие допустимые величины проектной документации, либо для них не проведена экспертиза в случаях пункта 257. Для SANY STC400T компании KRANNEVA на петербургском основании это значит: прочность основания и температурный диапазон машины сверяют с документами, а не с впечатлением о площадке.
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
        date={FACT_CHECK_W215}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 251 «а»–«н», пункт 257 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 251 ФНП № 461. Пункт обязывает эксплуатирующую организацию, а не арендатора; что арендодатель KRANNEVA запрашивает документы до выезда и сверяет их с перечнем, — практика компании, а не норма. Перечень сгруппирован редакцией для удобства, в тексте пункта подпункты идут подряд."
      />
    </main>
  );
}
