import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W209, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 209. Восемьдесят восьмой тип объекта — по какому документу оценивают узлы крана при освидетельствовании: РЭ или ФНП (ФНП № 461, п. 164, 170, 190). Фактура — в комментарии к FACT_CHECK_W208–210
  в app/site-data.ts.
*/

const title = "Оценка узлов крана: по руководству или по ФНП";
const description =
  "ФНП № 461 (п. 190): металлоконструкции — по приложению № 3, механизмы — по РЭ, канаты и цепи — по РЭ, иначе по ФНП; плохой итог — акт.";
const h1 = "По какому документу при освидетельствовании оценивают узлы крана — по руководству или по ФНП?";
const canonical = "/obekty/ocenka-uzlov-krana-po-ru-ili-po-fnp/";
const published = "2026-10-19";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "metallokonstruktsii", label: "Металлоконструкции" },
  { id: "mehanizmy", label: "Механизмы и системы управления" },
  { id: "kanaty-ogranichiteli", label: "Канаты, цепи, указатели и ограничители" },
  { id: "otritsatelnyy-rezultat", label: "Отрицательный результат и акт" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "По какому документу оценивают состояние металлоконструкций крана?",
    a: "По нормам браковки приложения № 3 к ФНП № 461, если они не противоречат руководству по эксплуатации (п. 190). Проверяют трещины, остаточные деформации, утонение стенок вследствие коррозии и ослабление соединений.",
  },
  {
    q: "Чем оценивают механизмы и системы управления?",
    a: "Данными руководства (инструкции) по эксплуатации подъёмного сооружения (п. 190 ФНП № 461). Другого основного документа для этой группы пункт не называет.",
  },
  {
    q: "Что делать, если в руководстве нет методики для каната или цепи?",
    a: "Применить требования самих ФНП: пункт 190 ставит их на второе место после методик РЭ для канатов, цепей, рельсовых путей и грузозахватных приспособлений.",
  },
  {
    q: "Что оформляют при отрицательном результате освидетельствования?",
    a: "Акт, в котором отражены выявленные несоответствия, превышения нормативных значений и описание признаков неработоспособного состояния (п. 190 ФНП № 461).",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Условия подачи после акта освидетельствования согласуются в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Оценка узлов крана: РЭ или ФНП", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с проверкой оценки узлов при техническом освидетельствовании",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Оценка узлов крана: РЭ или ФНП</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · оценка работоспособности узлов</span>
          <h1>{h1}</h1>
          <p>
            Пункт 190 ФНП № 461 делит узлы крана на четыре группы и для каждой называет свой документ: металлоконструкции оценивают по нормам браковки приложения № 3, механизмы и системы управления — по данным руководства по эксплуатации, канаты, цепи и грузозахватные приспособления — по методикам РЭ, а при их отсутствии по ФНП. KRANNEVA при подаче SANY STC400T или XCMG QY60K просит акт последнего освидетельствования и подтверждение, что оценка шла по этим документам.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W209} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Чем оценивают узлы крана по п. 190 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Узел</th>
                <th scope="col">Основной документ</th>
                <th scope="col">Если РЭ молчит</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Металлоконструкции и сварные, болтовые соединения</th><td>приложение № 3 к ФНП, если не противоречит РЭ</td><td>нормы браковки приложения № 3</td></tr>
              <tr><th scope="row">Механизмы и системы управления</th><td>данные руководства по эксплуатации</td><td>пункт не называет другого документа</td></tr>
              <tr><th scope="row">Канаты, цепи, рельсовые пути, грузозахватные приспособления</th><td>методики и браковочные показатели РЭ</td><td>требования ФНП</td></tr>
              <tr><th scope="row">Указатели, ограничители, регистраторы</th><td>РЭ крана или самого прибора</td><td>пункты 259–269 ФНП</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с актом освидетельствования</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>акт последнего технического освидетельствования, ссылка на РЭ, дата следующего</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="metallokonstruktsii">Металлоконструкции</h2>
        <p>
          Для металлоконструкций пункт 190 ФНП № 461 требует оценить работоспособность расчётных элементов и проверить отсутствие трещин, остаточных деформаций, утонения стенок вследствие коррозии и ослабления соединений кабины, лестниц, площадок и ограждений. Нормы браковки берут из приложения № 3, если они не противоречат руководству по эксплуатации. Значения самого приложения страница не пересказывает: KRANNEVA ссылается на документ, а не на цифры. SANY STC400T и XCMG QY60K оцениваются по своим РЭ в первую очередь.
        </p>

        <h2 id="mehanizmy">Механизмы и системы управления</h2>
        <p>
          Оценку механизмов и систем управления пункт 190 ФНП № 461 отдаёт целиком руководству по эксплуатации: работоспособность проверяют по данным, которые привёл изготовитель. Запасного документа пункт здесь не называет. Поэтому KRANNEVA при подготовке подачи Kato NK-250E-V или Liebherr LTM 1090-4.1 смотрит, что РЭ на машине доступно. Общий объём и порядок освидетельствования по пункту 164 тоже определяет РЭ, а ФНП применяются, только если в нём нет указаний.
        </p>

        <h2 id="kanaty-ogranichiteli">Канаты, цепи, указатели и ограничители</h2>
        <p>
          Для канатов, цепей, рельсовых путей и грузозахватных приспособлений пункт 190 ФНП № 461 ставит на первое место методики РЭ, а при их отсутствии — требования самих ФНП. Для указателей, ограничителей и регистраторов основой служит РЭ крана или соответствующего прибора, а без него — пункты 259–269. Про замену самого каната есть отдельная страница <Link href="/obekty/zamena-kanata-na-krane-pered-podachey/">про замену каната</Link>. XCMG QY60K подаётся с работающим ограничителем, так как пункт 170 требует проверять приборы в работе.
        </p>

        <h2 id="otritsatelnyy-rezultat">Отрицательный результат и акт</h2>
        <p>
          Отрицательный результат технического освидетельствования пункт 190 ФНП № 461 требует оформить актом: в нём отражают выявленные несоответствия требованиям документации и ФНП, превышение нормативных значений и признаки неработоспособного состояния. KRANNEVA не подаёт на объект кран с таким актом до устранения замечаний — это условие заявки, а не норма. Отметки об успешном итоге ведут в паспорте, подробнее на странице <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">про освидетельствование в паспорте</Link>.
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
        date={FACT_CHECK_W209}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 164, 170, 190 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 164, 170 и 190 ФНП № 461. Значения приложения № 3 не приводятся; отказ в подаче при акте с отрицательным итогом — условие заявки KRANNEVA, а не норма."
      />
    </main>
  );
}
