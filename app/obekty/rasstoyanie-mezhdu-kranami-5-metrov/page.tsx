import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W189, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 189. Шестьдесят восьмой тип объекта — минимальное расстояние между совместно работающими
  подъёмными сооружениями по п. 160 ФНП № 461. Угол практический: стеснённые дворы СПб.
  Страница уточняет dva-krana-na-odnoy-ploshchadke, где расстояние до 09.10 было указано неверно.
  Фактура — в комментарии к FACT_CHECK_W189 в app/site-data.ts.
*/

const title = "Расстояние между двумя кранами: 5 м по п. 160";
const description =
  "Пункт 160 ФНП № 461 требует не менее 5 метров между совместно работающими кранами, стрелами и грузами. Для башенных кранов добавлен зазор по высоте 1 м.";
const h1 = "Какое расстояние должно быть между двумя кранами на стройплощадке?";
const canonical = "/obekty/rasstoyanie-mezhdu-kranami-5-metrov/";
const published = "2026-10-09";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "pyat-metrov", label: "Пять метров по горизонтали: что именно измеряется" },
  { id: "raznye-tipy", label: "Автокран рядом с башенным краном" },
  { id: "bashennye", label: "Башенные краны: уровни стрел" },
  { id: "stoyanka", label: "Стоянка кранов в нерабочее время" },
  { id: "zakazchik", label: "Что подготовить заказчику до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какое минимальное расстояние между двумя кранами на стройплощадке?",
    a: "Не менее 5 метров по горизонтали. Пункт 160 ФНП № 461 распространяет это на краны, их стрелы, стрелу одного и груз на стреле другого, а также на перемещаемые грузы.",
  },
  {
    q: "Меняется ли расстояние, если краны разных типов?",
    a: "Нет. Пункт 160 требует соблюдать те же 5 метров при одновременной работе подъёмных сооружений различных типов.",
  },
  {
    q: "Какая разность уровней нужна у башенных кранов?",
    a: "Не менее 1 метра по вертикали между балочными стрелами или противовесными консолями, включая канаты подвески и грузовые канаты.",
  },
  {
    q: "Что требуется при стоянке башенных кранов в нерабочее время?",
    a: "Не менее 2 метров по горизонтали и 1 метра по вертикали между кранами или их частями. Обойма поднята, тележка на минимальном вылете, кран на противоугонных захватах.",
  },
  {
    q: "Сколько стоит смена, если рядом работает другой кран?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС..`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Расстояние между двумя кранами", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: работа рядом с другим подъёмным сооружением",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Расстояние между двумя кранами</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · совместная работа кранов</span>
          <h1>{h1}</h1>
          <p>
            Не менее 5 метров по горизонтали должно быть между совместно работающими подъёмными сооружениями на строительном объекте: пункт 160 ФНП № 461 относит это и к стрелам, и к перемещаемым грузам. KRANNEVA закладывает эти 5 метров в схему размещения SANY STC400T и XCMG QY60K, когда рядом уже работает другой кран.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W189} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что пункт 160 ФНП № 461 требует от совместно работающих кранов</caption>
            <thead>
              <tr>
                <th scope="col">Требование</th>
                <th scope="col">Что означает на площадке</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">По горизонтали</th><td>не менее 5 м между кранами, их стрелами, стрелой одного и грузом на стреле другого, а также между грузами</td></tr>
              <tr><th scope="row">Разные типы</th><td>то же расстояние при одновременной работе подъёмных сооружений разных типов на площадке</td></tr>
              <tr><th scope="row">Башенные краны</th><td>стрелы и противовесные консоли на разных уровнях, разность уровней не менее 1 м по вертикали</td></tr>
              <tr><th scope="row">Стоянка в нерабочее время</th><td>не менее 2 м по горизонтали и 1 м по вертикали между кранами или их частями</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA ставит рядом с другим краном</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Схема размещения</th><td>условия совместной работы фиксируются в ППР заказчика, KRANNEVA их не назначает</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="pyat-metrov">Пять метров по горизонтали: что именно измеряется</h2>
        <p>
          Пять метров пункт 160 ФНП № 461 требует соблюдать сразу в четырёх измерениях: между самими подъёмными сооружениями, между их стрелами, между стрелой одного и грузом на стреле другого, а также между перемещаемыми грузами. Для SANY STC400T это значит, что 5 метров считают не от колёс до колёс, а по самой близкой точке стрелы или груза.
        </p>

        <h2 id="raznye-tipy">Автокран рядом с башенным краном</h2>
        <p>
          Те же 5 метров пункт 160 сохраняет, когда одновременно работают подъёмные сооружения разных типов. Автокран XCMG QY60K рядом с башенным краном подчиняется тому же расстоянию, что и два автокрана. Монтаж башенного крана автокраном разобран на странице <Link href="/obekty/montazh-bashennogo-krana-avtokranom/">про монтаж башенного крана</Link>.
        </p>

        <h2 id="bashennye">Башенные краны: уровни стрел</h2>
        <p>
          Пересечение зон обслуживания башенных кранов пункт 160 разрешает только при разных уровнях стрел и противовесных консолей. Однотипные краны должны иметь разное число секций башни. Разность уровней балочных стрел и консолей, включая канаты, составляет не менее 1 метра. Это правило относится к башенным кранам заказчика; KRANNEVA как оператор автокрана SANY STC400T его не назначает, но учитывает при размещении машины.
        </p>

      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="stoyanka">Стоянка кранов в нерабочее время</h2>
        <p>
          Нерабочее время добавляет к 5 метрам отдельные нормы для кранов заказчика рядом с техникой KRANNEVA: между кранами или их частями не менее 2 метров по горизонтали и 1 метра по вертикали. Крюковая обойма в это время находится в верхнем положении, грузовая тележка — на минимальном вылете, кран стоит на противоугонных захватах. Эти условия относятся к башенным кранам на стоянке, а не к автокранам KRANNEVA.
        </p>

        <h2 id="zakazchik">Что подготовить заказчику до выезда</h2>
        <p>
          До выезда заказчик передаёт KRANNEVA план площадки с расположением уже работающих кранов и их зон. Без плана расстояние в 5 метров для XCMG QY60K проверить нельзя. KRANNEVA сверяет план с ППР: условия совместной безопасной работы башенных кранов пункт 160 требует обязательно приводить в ППР.
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
        date={FACT_CHECK_W189}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 160 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 160 ФНП № 461 и не заменяет ППР. Схему размещения кранов и условия совместной безопасной работы определяет проект конкретной площадки. Работа двух кранов с общим грузом регулируется пунктом 127 и разобрана на отдельной странице."
      />
    </main>
  );
}
