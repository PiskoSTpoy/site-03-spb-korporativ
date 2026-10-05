import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W179, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 179. Пятьдесят восьмой тип — площадка рядом с пожарным проездом.
  Угол практический / СПб: плотная застройка, дворы, где кран и проезд
  пожарной техники делят одну ширину.

  Разграничена с zhiloy-dvor-mnogokvartirnogo-doma (там запрет стоянки на
  площадках по п. 71 Правил противопожарного режима) и dvor-kolodets-
  istoricheskogo-tsentra. Здесь — ширина самого проезда и коридор до стены
  по СП 4.13130.2013, п. 8.1.2–8.1.6.

  Фактура — в комментарии к FACT_CHECK_W179 в app/site-data.ts. СП не
  называет кран: страница использует ширины как границу планирования, а не
  как утверждение о законности конкретной стоянки.
*/

const title = "Кран у пожарного проезда: ширина 3,5 / 4,2 / 6 м по СП";
const description =
  "СП 4.13130.2013 п. 8.1.4 задаёт ширину проезда 3,5, 4,2 или 6 м по высоте здания. Как KRANNEVA ставит опоры крана вне этого коридора.";
const h1 = "Где можно ставить опоры крана рядом с пожарным проездом и какой ширины он должен быть?";
const canonical = "/obekty/pozharnyy-proezd-i-opory-krana/";
const published = "2026-10-05";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "shirina", label: "Какой ширины должен быть проезд" },
  { id: "koridor", label: "Какой коридор остаётся до стены здания" },
  { id: "kran", label: "Что это значит для опор и стрелы крана" },
  { id: "ne-poluchaetsya", label: "Если места не хватает" },
  { id: "raschet", label: "Сколько стоит смена" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой ширины должен быть проезд для пожарных автомобилей?",
    a: "По пункту 8.1.4 СП 4.13130.2013 не менее 3,5 м для зданий высотой до 13 м включительно, не менее 4,2 м для зданий от 13 до 46 м включительно и не менее 6 м для зданий выше 46 м.",
  },
  {
    q: "Какое расстояние должно быть от подъезда до стены здания?",
    a: "Пункт 8.1.6 СП 4.13130.2013 для жилых и общественных зданий высотой до 28 м включительно задаёт расстояние от внутреннего края подъезда до стены 5–8 м, а для зданий выше 28 м — 8–10 м.",
  },
  {
    q: "Можно ли ставить кран на пожарный проезд?",
    a: "СП 4.13130 кран не упоминает, это норма для проектируемых проездов, а не разрешение или запрет на временную стоянку. KRANNEVA использует её ширины как границу планирования: опоры и корпус машины ставятся так, чтобы проезд оставался свободным по всей ширине.",
  },
  {
    q: "Считаются ли тротуары в ширину проезда?",
    a: "Пункт 8.1.5 разрешает включать в общую ширину проездов, совмещённых с подъездами к зданиям, примыкающие тротуары. Это правило проектирования; для планирования смены оно не отменяет необходимости оставить проезд свободным.",
  },
  {
    q: "Что делать, если проезд нельзя оставить свободным?",
    a: "Пункт 8.1.3 предусматривает документы предварительного планирования действий по тушению пожаров как способ подтвердить деятельность пожарной охраны, когда нормативная ширина недоступна. Такой вопрос решают заказчик, управляющая организация и пожарная охрана, а не арендодатель крана.",
  },
  {
    q: "Сколько стоит смена крана у пожарного проезда?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Отдельной наценки «за пожарный проезд» в прайсе нет.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Пожарный проезд и опоры крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана на площадке рядом с пожарным проездом",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Пожарный проезд и опоры крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · пожарный проезд</span>
          <h1>{h1}</h1>
          <p>
            Пункт 8.1.4 СП 4.13130.2013 задаёт ширину проезда для пожарных автомобилей не менее
            3,5 м у зданий до 13 м, 4,2 м у зданий от 13 до 46 м и 6 м у зданий выше 46 м, и
            поэтому KRANNEVA планирует опоры и корпус крана за пределами этой ширины. Сам
            свод правил кран не упоминает: он задаёт коридор, который остаётся свободным.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W179} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Проезд для пожарных автомобилей по СП 4.13130.2013, п. 8.1.4 и 8.1.6</caption>
            <thead>
              <tr>
                <th scope="col">Высота здания</th>
                <th scope="col">Ширина проезда, не менее</th>
                <th scope="col">Расстояние от края подъезда до стены</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">до 13 м включительно</th><td className="dtable__num">3,5 м</td><td className="dtable__num">5–8 м (до 28 м)</td></tr>
              <tr><th scope="row">от 13 до 28 м включительно</th><td className="dtable__num">4,2 м</td><td className="dtable__num">5–8 м</td></tr>
              <tr><th scope="row">от 28 до 46 м включительно</th><td className="dtable__num">4,2 м</td><td className="dtable__num">8–10 м</td></tr>
              <tr><th scope="row">выше 46 м</th><td className="dtable__num">6 м</td><td className="dtable__num">8–10 м</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники у пожарного проезда</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>ширина свободного проезда и место под опоры, а не высота подъёма</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="shirina">Какой ширины должен быть проезд</h2>
        <p>
          Пункт 8.1.4 СП 4.13130.2013 привязывает ширину проезда к высоте здания. Порогов три:
          3,5 м до 13 м включительно, 4,2 м от 13 до 46 м включительно и 6 м выше 46 м. Пункт 8.1.5 допускает
          включать в общую ширину проезда, совмещённого с подъездом к зданию, примыкающие
          тротуары. KRANNEVA берёт эти числа как минимальный коридор, который автокран не должен
          занимать.
        </p>
        <p>
          Высоту конкретного здания называет проектная документация дома, а не арендодатель
          крана, поэтому KRANNEVA просит её в заявке: от неё зависит, какой из трёх порогов —
          3,5, 4,2 или 6 м — действует на площадке.
        </p>

        <h2 id="koridor">Какой коридор остаётся до стены здания</h2>
        <p>
          Пункт 8.1.6 задаёт расстояние от внутреннего края подъезда до стены жилого или
          общественного здания: 5–8 м для зданий до 28 м включительно и 8–10 м для зданий
          выше 28 м. Пункт 8.1.2 добавляет, что в полосе между подъездом и зданием не
          допускаются ограждения (кроме палисадников), воздушные линии, рядовая посадка деревьев
          и иные конструкции, способные помешать работе пожарных автолестниц и автоподъёмников.
        </p>
        <p>
          Стрела XCMG QY60K над этой полосой — не конструкция в смысле пункта, но она
          поднимается там, где работает автолестница, и KRANNEVA учитывает это при выборе
          места: высокая стрела над коридором — повод заранее согласовать вопрос со службой,
          отвечающей за проезд.
        </p>

        <h2 id="kran">Что это значит для опор и стрелы крана</h2>
        <p>
          Опоры SANY STC400T и корпус машины занимают площадку шире самой колеи, поэтому у
          дома с проездом шириной 4,2 м кран ставится на землю вне полосы проезда, а не поверх
          неё. KRANNEVA начинает заявку с вопроса о схеме проездов: где проходит проезд, какова
          высота здания и где расположена площадка для опор.
        </p>
        <p>
          Правило запрета на стоянку на площадках для пожарной техники и сам порядок для двора
          разобраны на странице{" "}
          <Link href="/obekty/zhiloy-dvor-mnogokvartirnogo-doma/">жилого двора многоквартирного дома</Link>,
          а случай ограниченной арки и сомкнутых стен — на странице{" "}
          <Link href="/obekty/dvor-kolodets-istoricheskogo-tsentra/">двора-колодца центра</Link>.
        </p>

        <h2 id="ne-poluchaetsya">Если места не хватает</h2>
        <p>
          Пункт 8.1.3 СП 4.13130.2013 для случая, когда требования к проездам выполнить
          невозможно, называет другой путь: возможность работы пожарной охраны подтверждается
          документами предварительного планирования действий по тушению пожаров. KRANNEVA не
          оформляет такие документы и не решает вопрос за заказчика: кран ставится только
          после того, как заказчик или управляющая организация подтвердит порядок.
        </p>
        <p>
          Если площадки хватает только при перекрытии части проезда, подъём переносится на
          согласованный интервал либо меняется схема: стрела вылетом, достающим груз с другой
          стороны дома. Выбор класса идёт по вылету и высоте, а не по тоннажу.
        </p>

        <h2 id="raschet">Сколько стоит смена</h2>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))}, класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))} без НДС. Наценки «за пожарный проезд» в прайсе нет: считается
          тот же класс и та же ставка.
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
        date={FACT_CHECK_W179}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_148575/a91b622c83837aebecc09e6aa7a1f87c67b68bb8/", label: "КонсультантПлюс — СП 4.13130.2013, раздел 8.1 «Проходы, проезды и подъезды к жилым и общественным зданиям, сооружениям классов Ф1–Ф4»: пункты 8.1.2–8.1.6" },
        ]}
        note="СП 4.13130.2013 — свод правил для проектируемых проездов и подъездов к зданиям; он не называет автокран и не разрешает и не запрещает временную стоянку машины. Страница использует его ширины как границу планирования смены. Высоту конкретного здания и фактическую ширину проезда определяют проектная документация и заказчик, режим стоянки на пожарных площадках двора — Правила противопожарного режима."
      />
    </main>
  );
}
