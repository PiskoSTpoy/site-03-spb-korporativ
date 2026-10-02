import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W169, MIN_SHIFT_HOURS, PRICE, PARK, rub, shiftTotal } from "../../site-data";

/*
  Волна 169. Сорок восьмой тип объекта — монтаж тяжёлого технологического
  оборудования. Угол коммерческий/сравнительный.

  Фактура — только уже установленные на сайте факты (PARK, PRICE), без
  новых внешних источников: см. комментарий к FACT_CHECK_W169 в
  app/site-data.ts. Принцип «грузоподъёмность на вылете, не номинальный
  тоннаж» — тот же, что уже на страницах подъёма людей в люльке (п. 237
  ФНП № 461) и двух кранов на площадке (п. 127). Массу оборудования
  заказчика числом не печатаем — это паспортная величина.
*/

const title = "Кран для монтажа тяжёлого оборудования: вылет, не тоннаж";
const description =
  "Кран для тяжёлого оборудования подбирают по грузоподъёмности на вылете, не по тоннажу — сравнение пяти машин парка KRANNEVA 60–130 т.";
const h1 = "Как подобрать кран для монтажа тяжёлого технологического оборудования?";
const canonical = "/obekty/montazh-tyazhelogo-oborudovaniya/";
const published = "2026-10-02";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const mid = PRICE[1];
const heavy = PRICE[2];

const heavyPark = PARK.filter((p) =>
  ["XCMG QY60K", "Liebherr LTM 1090-4.1", "Zoomlion ZTC1000V", "Liebherr LTM 1130-5.1", "Zoomlion QUY50"].includes(p.name)
);

const toc = [
  { id: "printsip", label: "Почему номинальный тоннаж не главное число" },
  { id: "sravnenie", label: "Пять машин парка для тяжёлого монтажа" },
  { id: "vylet", label: "Как вылет меняет допустимый груз" },
  { id: "ogranicheniya", label: "Что ещё останавливает монтаж" },
  { id: "raschet", label: "Сколько стоит смена под тяжёлый монтаж" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли выбрать кран по паспортной грузоподъёмности без расчёта вылета?",
    a: "Нет: паспортная грузоподъёмность — это максимум на минимальном вылете у самой опоры. На рабочем вылете, где реально встанет оборудование относительно крана, допустимый груз всегда меньше. KRANNEVA запрашивает расстояние от опор крана до места установки до того, как называет класс техники.",
  },
  {
    q: "Чем Zoomlion ZTC1000V отличается от Liebherr LTM 1130-5.1 для тяжёлого монтажа?",
    a: `В парке KRANNEVA у Zoomlion ZTC1000V самая длинная чистая телескопическая стрела — ${heavyPark.find((p) => p.name === "Zoomlion ZTC1000V")?.boom}, у Liebherr LTM 1130-5.1 — паспортная грузоподъёмность выше, ${heavyPark.find((p) => p.name === "Liebherr LTM 1130-5.1")?.tonnage}. Для оборудования, которое ставят далеко от края площадки, выигрывает вылет; для самого тяжёлого груза на коротком плече — грузоподъёмность.`,
  },
  {
    q: "Подходит ли гусеничный кран для монтажа тяжёлого оборудования?",
    a: "Да, если площадка не имеет твёрдого покрытия: Zoomlion QUY50 в парке KRANNEVA — гусеничный кран, который держит нагрузку без точечного давления опор автокрана. На подготовленной бетонной площадке автокран KRANNEVA обычно быстрее в подаче и не требует перевозки гусениц.",
  },
  {
    q: "Нужно ли сообщать массу оборудования заранее?",
    a: "Да, и желательно с паспортом: диспетчер KRANNEVA сверяет массу и центр тяжести оборудования с грузовой таблицей машины на нужном вылете до подтверждения даты. Без паспортных данных оборудования расчёт не сделать — типовых чисел «для трансформатора» или «для теплообменника» KRANNEVA не использует, потому что модели расходятся по массе в разы.",
  },
  {
    q: "Что если оборудование тяжелее, чем может поднять любая машина парка?",
    a: "KRANNEVA привлекает партнёрскую сеть для более тяжёлых классов — гусеничные краны большей грузоподъёмности не входят в собственный парк. Порядок привлечения партнёрской техники описан на странице расширения спецификации.",
  },
  {
    q: "Сколько стоит смена крана для монтажа тяжёлого оборудования?",
    a: `У KRANNEVA от класса ${mid.cls} — от ${rub(shiftTotal(mid.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. Такелаж и расчёт строповки в эту ставку не входят, если оборудование требует нестандартной схемы подъёма.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Монтаж тяжёлого оборудования", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для монтажа тяжёлого технологического оборудования",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  offers: {
    "@type": "Offer",
    businessFunction: "https://schema.org/LeaseOut",
    priceCurrency: "RUB",
    priceSpecification: { "@type": "UnitPriceSpecification", price: String(mid.rate), priceCurrency: "RUB", unitText: "HOUR", valueAddedTaxIncluded: false },
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Монтаж тяжёлого оборудования</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · монтаж тяжёлого оборудования</span>
          <h1>{h1}</h1>
          <p>
            Решает не паспортный тоннаж машины, а её грузоподъёмность на конкретном рабочем
            вылете: оборудование редко устанавливают прямо у опоры крана, а грузовая таблица
            падает с увеличением вылета быстрее, чем кажется по максимальной цифре в паспорте.
            KRANNEVA подбирает машину из пяти в парке класса {mid.cls}–{heavy.cls} — от XCMG
            QY60K до Liebherr LTM 1130-5.1 — по вылету от опор до места установки и паспортной
            массе оборудования заказчика.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W169} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана для монтажа тяжёлого оборудования</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж трансформаторов, теплообменников, компрессоров, резервуаров на фундамент</td></tr>
              <tr><th scope="row">Класс техники</th><td>{mid.cls}–{heavy.cls} — по грузоподъёмности на рабочем вылете</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link>, <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link>, <Link href="/park/liebherr-ltm-1130/">Liebherr LTM 1130-5.1</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>грузоподъёмность на вылете от опор крана до места установки, не номинальный тоннаж</td></tr>
              <tr><th scope="row">Что не входит в подачу</th><td>такелаж и расчёт нестандартной строповки — отдельная позиция по паспорту оборудования</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(mid.rate)}/час без НДС ({mid.cls}), {rub(heavy.rate)} ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="printsip">Почему номинальный тоннаж не главное число</h2>
        <p>
          Паспортная грузоподъёмность крана — максимум на минимальном вылете, у самой опоры.
          Liebherr LTM 1130-5.1 поднимает 130 т на коротком вылете от 3,0 м, но стоит
          оборудованию оказаться дальше от опор — и доступная грузоподъёмность падает по
          грузовой таблице, иногда в несколько раз. KRANNEVA считает подбор машины именно по
          этой таблице на нужном вылете, а не по цифре с сайта производителя.
        </p>
        <p>
          Ошибка «берём кран потяжелее на всякий случай» стоит денег без пользы: более тяжёлый
          класс не решает проблему вылета, если опоры физически нельзя подвинуть ближе к месту
          установки. KRANNEVA для технологического оборудования, которое ставят в глубине цеха
          или за фундаментом соседнего оборудования, предлагает машину с длинной стрелой, а не
          просто с большим номинальным тоннажом.
        </p>

        <h2 id="sravnenie">Пять машин парка для тяжёлого монтажа</h2>
        <p>
          В классе {mid.cls}–{heavy.cls} у KRANNEVA пять машин с разным соотношением
          грузоподъёмности, вылета стрелы и типа хода — таблица ниже показывает паспортные
          параметры, а не расчётную грузоподъёмность на конкретном вылете.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Параметры парка для монтажа тяжёлого оборудования</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Тоннаж</th>
                <th scope="col">Стрела</th>
                <th scope="col">Для какой задачи</th>
              </tr>
            </thead>
            <tbody>
              {heavyPark.map((p) => (
                <tr key={p.href}>
                  <th scope="row"><Link href={p.href}>{p.name}</Link></th>
                  <td>{p.tonnage}</td>
                  <td>{p.boom}</td>
                  <td>{p.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="vylet">Как вылет меняет допустимый груз</h2>
        <p>
          У Zoomlion ZTC1000V самая длинная чистая телескопическая стрела парка — 64,5 м, что
          даёт больше гибкости по вылету без гуська. Liebherr LTM 1130-5.1 — самый тяжёлый груз
          в парке при коротком вылете от 3,0 м, то есть там, где оборудование можно поставить
          почти вплотную к опорам. Выбор между ними — это выбор между вылетом и
          грузоподъёмностью на коротком плече, а не между «сильнее» и «слабее» машиной.
        </p>
        <p>
          Liebherr LTM 1090-4.1 в парке KRANNEVA с приводом 8×8 остаётся решением для
          неподготовленного подъезда — промышленной площадки без асфальта, где другим колёсным
          машинам нужна дополнительная подготовка пути. Для такого оборудования, как указано на
          странице <Link href="/obekty/promzona/">промзоны и действующего производства</Link>,
          KRANNEVA считает вылет не только до оборудования, но и до границы доступной по
          пропускному режиму площадки.
        </p>

        <h2 id="ogranicheniya">Что ещё останавливает монтаж</h2>
        <p>
          Пункт 132 ФНП № 461 прекращает работу при ветре сильнее паспортного предела машины,
          при температуре ниже паспортной, при снегопаде, дожде или тумане, когда крановщик
          плохо различает сигналы или сам груз. Для тяжёлого технологического оборудования это
          особенно чувствительно: груз большой площади парусности реагирует на ветер раньше,
          чем компактный груз той же массы, поэтому KRANNEVA сверяет прогноз с паспортом машины
          накануне смены, а не в день монтажа.
        </p>
        <p>
          Если оборудование монтируют двумя кранами KRANNEVA одновременно — например, длинный
          теплообменник, который неудобно поднимать одной точкой строповки, — действует тот же
          принцип распределения нагрузки, что и на странице{" "}
          <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">про два крана на одной площадке</Link>:
          совместный подъём только по ППР или ТК, нагрузка на каждую машину не выше её
          грузоподъёмности на её собственном вылете.
        </p>

        <h2 id="raschet">Сколько стоит смена под тяжёлый монтаж</h2>
        <p>
          Ставка KRANNEVA: класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))}, класс {heavy.cls} — {rub(heavy.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС. Расчёт строповки и
          нестандартный такелаж оборудования в ставку не входят — это отдельная позиция,
          которую считают по паспорту конкретной единицы. Как оформляется такая смена в
          закупке — на странице <Link href="/dlya-zakupok/priemka-i-oplata/">приёмки и оплаты</Link>.
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
        date={FACT_CHECK_W169}
        items={[
          { href: "/park/", label: "KRANNEVA — спецификации парка: тоннаж, вылет стрелы, высота подъёма по каждой машине" },
          { href: "https://www.garant.ru/products/ipo/prime/doc/400065076/", label: "ГАРАНТ — приказ Ростехнадзора от 26.11.2020 № 461, п. 132: условия прекращения работы по ветру, температуре, видимости" },
        ]}
        note="Массу и габариты конкретной единицы технологического оборудования страница не называет числом — это паспортная величина оборудования заказчика, а не типовое значение по рынку. Грузоподъёмность машин парка на конкретном вылете (не номинальный тоннаж) считается индивидуально по грузовой таблице и на странице не печатается единым числом."
      />
    </main>
  );
}
