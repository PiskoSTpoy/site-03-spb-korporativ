import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W212, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 212. Девяносто первый тип объекта — браковка стропов: канатный, цепной или текстильный (ФНП № 461, п. 271–274). Фактура — в комментарии к FACT_CHECK_W211–213
  в app/site-data.ts.
*/

const title = "Браковка стропов: канатный, цепной, текстильный";
const description =
  "ФНП № 461 (п. 271–274): канатный строп — по обрывам на 3d, 6d и 30d, цепной — удлинение звена 3 % и износ 10 %, текстильный — бирка и порезы.";
const h1 = "Когда бракуют строп — канатный, цепной или текстильный — по ФНП № 461?";
const canonical = "/obekty/brakovka-stropov-kanatnyy-tsepnoy-ili-tekstilnyy/";
const published = "2026-10-22";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "kanatnyy", label: "Канатный строп" },
  { id: "tsepnoy", label: "Цепной строп" },
  { id: "tekstilnyy", label: "Текстильный строп" },
  { id: "metallicheskie-elementy", label: "Крюки, кольца и скобы" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько обрывов проволок допускается на канатном стропе?",
    a: "Для стропа из каната двойной свивки браковка наступает, если видимых обрывов наружных проволок больше 4 на длине 3d, 6 на длине 6d или 16 на длине 30d, где d — диаметр каната в мм (п. 271 ФНП № 461).",
  },
  {
    q: "Когда бракуют цепной строп?",
    a: "При удлинении звена более чем на 3 % от первоначального размера или при уменьшении диаметра сечения звена от износа более чем на 10 % (п. 272).",
  },
  {
    q: "Можно ли работать текстильным стропом без бирки?",
    a: "Нет. Пункт 273 ФНП № 461 не допускает к работе текстильный строп без клейма или бирки и с нечитаемыми сведениями об изготовителе и грузоподъёмности.",
  },
  {
    q: "Допустим ли небольшой поперечный порез ленты?",
    a: "Нет. Поперечные порезы или разрывы ленты бракуют строп независимо от размера (п. 273). Продольные допускаются только до 10 % длины ветви, а единичный — до 50 мм.",
  },
  {
    q: "Что проверяют у крюков, колец и скоб стропа?",
    a: "Трещины любого размера, износ или вмятины с потерей 10 % сечения и больше, остаточные деформации более 3 % и повреждённую резьбу (п. 274 ФНП № 461).",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Чьи стропы используются, фиксируется в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Браковка стропов", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с осмотром стропов по нормам браковки",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Браковка стропов</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · съёмные грузозахватные приспособления</span>
          <h1>{h1}</h1>
          <p>
            Канатный строп двойной свивки по пункту 271 ФНП № 461 бракуют, если видимых обрывов проволок больше 4 на длине трёх диаметров каната. Цепной строп выходит из работы при удлинении звена более 3 % или износе сечения более 10 %. Текстильный — уже без бирки или с любым поперечным порезом. KRANNEVA при подаче SANY STC400T осматривает стропы на месте вместе со стропальщиком по этим трём спискам.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W212} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Признаки браковки стропов по п. 271–274 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Вид стропа</th>
                <th scope="col">Главный измеряемый признак</th>
                <th scope="col">Брак без измерений</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Канатный (двойная свивка)</th><td>обрывов больше 4 / 6 / 16 на длине 3d / 6d / 30d</td><td>—</td></tr>
              <tr><th scope="row">Цепной</th><td>удлинение звена &gt; 3 %, износ диаметра сечения &gt; 10 %</td><td>—</td></tr>
              <tr><th scope="row">Текстильный (полимерная лента)</th><td>продольные порезы &gt; 10 % длины ветви, единичный &gt; 50 мм</td><td>нет бирки, узел на ленте, поперечный порез любого размера</td></tr>
              <tr><th scope="row">Металлические элементы любого стропа</th><td>потеря сечения ≥ 10 %, деформация &gt; 3 %</td><td>трещина любого размера, повреждённая резьба</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA со стропами на объекте</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что согласуют до выезда</th><td>чьи стропы, их вид и грузоподъёмность по бирке</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="kanatnyy">Канатный строп</h2>
        <p>
          Канатный строп из каната двойной свивки пункт 271 ФНП № 461 бракует по числу видимых обрывов наружных проволок на трёх отрезках: больше 4 на длине 3d, больше 6 на 6d и больше 16 на 30d. Буква d означает диаметр каната в миллиметрах, поэтому для стропа диаметром 20 мм короткий участок — 60 мм, а длинный — 600 мм. Норма относится к стропу, а не к грузовому канату самого XCMG QY60K: его KRANNEVA бракует по своим правилам.
        </p>

        <h2 id="tsepnoy">Цепной строп</h2>
        <p>
          Цепной строп по пункту 272 ФНП № 461 выходит из работы при двух измеряемых признаках: звено вытянулось больше чем на 3 % от первоначальной длины или диаметр его сечения от износа уменьшился больше чем на 10 %. Диаметр меряют в двух взаимно перпендикулярных направлениях. Значит, без исходных размеров из паспорта стропа браковку не провести — нужен документ изготовителя. KRANNEVA при работе Kato NK-250E-V с цепными стропами заказчика просит паспорт стропа до выезда.
        </p>

        <h2 id="tekstilnyy">Текстильный строп</h2>
        <p>
          Текстильный строп пункт 273 ФНП № 461 бракует по самому длинному списку: 14 признаков, из которых часть не требует линейки. Без бирки, с узлом на несущей ленте или с поперечным порезом любой длины строп к работе не допускают. Продольные порезы допустимы суммарно до 10 % длины ветви и не длиннее 50 мм поодиночке, загрязнение цементом или грунтом — не больше половины длины стропа. Для монтажа облицовки с Liebherr LTM 1090-4.1 KRANNEVA советует держать на объекте запасной текстильный строп.
        </p>

        <h2 id="metallicheskie-elementy">Крюки, кольца и скобы</h2>
        <p>
          Металлические элементы любого стропа — кольца, петли, скобы, карабины, звенья — пункт 274 ФНП № 461 запрещает эксплуатировать с трещиной любого размера. Износ или вмятины, уменьшившие сечение на 10 % и больше, тоже бракуют элемент, как и остаточная деформация свыше 3 % и повреждённая резьба. Порог 3 % совпадает с цепным стропом, а 10 % — с износом звена. Кто отвечает за стропы на подаче SANY STC400T, разобрано на странице <Link href="/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/">о стропах заказчика или арендодателя</Link>.
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
        date={FACT_CHECK_W212}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 271–274, таблица 3 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 271–274 ФНП № 461. Пример с канатом 20 мм — арифметика по формуле пункта, а не типовой строп; совет держать запасной текстильный строп — рекомендация KRANNEVA, а не норма."
      />
    </main>
  );
}
