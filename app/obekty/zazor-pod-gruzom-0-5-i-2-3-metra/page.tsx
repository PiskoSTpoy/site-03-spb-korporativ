import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W203, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 203. Восемьдесят второй тип объекта — зазор под перемещаемым грузом при
  подъёме у фасада: 0,5 м до выступающих частей здания и 2,3 м до перекрытий и
  площадок, где могут находиться люди (ФНП № 461, п. 156 «к»–«м»). Зазор 0,5 м
  при подаче в проём (п. 162) разобран на podacha-gruza-v-proem-perekrytiya.
  Фактура — в комментарии к FACT_CHECK_W202–204 в app/site-data.ts.
*/

const title = "Зазор под грузом: 0,5 и 2,3 м по п. 156 ФНП № 461";
const description =
  "ФНП № 461 (п. 156 «к»): низ груза — не ближе 0,5 м к выступам здания и 2,3 м к площадкам, где могут быть люди. Как выбрать значение для подъёма у фасада.";
const h1 = "Какой зазор нужен под грузом у фасада — 0,5 или 2,3 метра?";
const canonical = "/obekty/zazor-pod-gruzom-0-5-i-2-3-metra/";
const published = "2026-10-16";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "dva-chisla", label: "Два числа подпункта «к»" },
  { id: "chto-pod-gruzom", label: "Что лежит под траекторией груза" },
  { id: "strop-i-vystupy", label: "Длина стропа и выступы фасада" },
  { id: "kak-zapisat", label: "Как зазор попадает в ППР" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какое расстояние от груза до здания требует ФНП?",
    a: "Подпункт «к» пункта 156 ФНП № 461 задаёт два значения для расстояния от низа перемещаемого груза: не менее 0,5 м до наиболее выступающих по вертикали частей здания и не менее 2,3 м до перекрытий и площадок, где могут находиться люди. KRANNEVA записывает оба значения в схему подачи.",
  },
  {
    q: "Откуда считают расстояние — от груза или от крюка?",
    a: "От низа перемещаемого груза, с учётом длин стропов по высоте и размеров траверс, если они применяются. Это прямо указано в подпункте «к». Поэтому один и тот же груз на коротких и на длинных стропах требует разного запаса высоты.",
  },
  {
    q: "Что значит 2,3 м — высота человека?",
    a: "Пункт 156 не поясняет происхождение числа 2,3 м, а называет его нормой для перекрытий и площадок, где могут находиться люди. Соотнесение с ростом человека — толкование KRANNEVA, на норму не ссылаемся.",
  },
  {
    q: "Касается ли подпункт «л» про консоль противовеса автокрана?",
    a: "Подпункт «л» говорит о частях стрелы и консоли противовеса с блоками балласта. Консоль с блоками характерна для башенных кранов, поэтому для автокрана SANY STC400T применимость подпункта — толкование KRANNEVA, числа в нём нет.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA для подъёма у фасада?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Разрез здания и длина стропов согласуются в заявке до выезда.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Зазор под грузом: 0,5 и 2,3 метра", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором для подъёма груза вдоль фасада с зазором по ППР",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Зазор под грузом: 0,5 и 2,3 метра</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · зазор под грузом</span>
          <h1>{h1}</h1>
          <p>
            Подпункт «к» пункта 156 ФНП № 461 задаёт два разных зазора под перемещаемым грузом: не менее 0,5 м до выступающих частей здания и не менее 2,3 м до перекрытий и площадок, где могут находиться люди. Какое из двух значений действует, определяет то, что лежит под траекторией, а не тип крана. Отсчёт идёт от низа груза с учётом стропов и траверс. KRANNEVA заносит оба значения в схему подачи для SANY STC400T и XCMG QY60K.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W203} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Зазоры по п. 156 ФНП № 461: какой когда применяется</caption>
            <thead>
              <tr>
                <th scope="col">Что под траекторией груза</th>
                <th scope="col">Зазор от низа груза</th>
                <th scope="col">Подпункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Выступающая часть здания без людей</th><td className="dtable__num">не менее 0,5 м</td><td>«к»</td></tr>
              <tr><th scope="row">Перекрытие или площадка, где могут быть люди</th><td className="dtable__num">не менее 2,3 м</td><td>«к»</td></tr>
              <tr><th scope="row">Стрела и консоль противовеса с балластом</th><td>число не названо</td><td>«л»</td></tr>
              <tr><th scope="row">Карнизы, балконы, эркеры, козырьки, входы</th><td>размеры выступов — в ППР</td><td>«м»</td></tr>
              <tr><th scope="row">Здание на полную высоту при стреле над ним</th><td>разрез в ППР</td><td>«и»</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подъём у фасада KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что согласуют</th><td>разрез здания, длина стропов, вылет и высота подъёма</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="dva-chisla">Два числа подпункта «к»</h2>
        <p>
          В подпункте «к» пункта 156 ФНП № 461 два числа относятся к разным объектам под грузом. Для наиболее выступающих по вертикали частей здания зазор не менее 0,5 м, для перекрытий и площадок, где могут находиться люди, — не менее 2,3 м. Это не диапазон допуска, а два отдельных правила. KRANNEVA в схеме подачи выписывает для каждого места траектории, какое из них применимо.
        </p>

        <h2 id="chto-pod-gruzom">Что лежит под траекторией груза</h2>
        <p>
          Выбор между 0,5 и 2,3 м зависит от того, может ли человек оказаться на выступе или площадке под грузом. Козырёк над входом, где проходят люди, попадает под 2,3 м. Глухой карниз без доступа на него — под 0,5 м. Отнесение конкретного выступа к одной из двух групп — решение автора ППР, и пункт 156 его не делает за него. KRANNEVA запрашивает у заказчика разрез здания, чтобы увидеть, какие выступы вообще есть на маршруте XCMG QY60K.
        </p>

        <h2 id="strop-i-vystupy">Длина стропа и выступы фасада</h2>
        <p>
          Подпункт «к» пункта 156 требует считать зазор с учётом длин стропов по высоте и размеров траверс. Груз на коротких стропах висит ближе к крюку, и запас до выступов фасада выше, чем при длинных. Траверса добавляет собственную высоту. Подпункт «м» отдельно требует показать в ППР размеры выступов в горизонтальной плоскости: карнизы, балконы, ограждения, эркеры, козырьки и входы. Соседний подпункт «л» про консоль противовеса относится к башенным кранам, и для автокрана это толкование KRANNEVA, числа у него нет.
        </p>

        <h2 id="kak-zapisat">Как зазор попадает в ППР</h2>
        <p>
          В ППР зазор записывают рядом с разрезом здания по подпункту «и», где показаны положения стрелы над зданием при минимальном и максимальном вылете. Перечень остальных элементов ППР приведён на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">про ППР и технологическую карту</Link>. Подача груза именно в проём перекрытия с зазором 0,5 м по другому пункту разобрана отдельно: <Link href="/obekty/podacha-gruza-v-proem-perekrytiya/">подача груза в проём перекрытия</Link>. Опасные зоны вокруг фасада при работе крана — на странице <Link href="/obekty/opasnaya-zona-krana-i-soglasovanie/">про опасную зону</Link>.
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
        date={FACT_CHECK_W203}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 156, подпункты «и», «к», «л», «м» (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает значения 0,5 и 2,3 м из подпункта «к» пункта 156 ФНП № 461. Происхождение числа 2,3 м в пункте не поясняется; применимость подпункта «л» к автокрану и отнесение выступа к группе — толкования KRANNEVA."
      />
    </main>
  );
}
