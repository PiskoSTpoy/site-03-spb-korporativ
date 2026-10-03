import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W172, MIN_SHIFT_HOURS, PRICE, PARK, rub, shiftTotal } from "../../site-data";

/*
  Волна 172. Пятьдесят первый тип объекта — монтаж лифтового оборудования
  и подъём кабины в шахту. Угол коммерческий/сравнительный.

  Фактура — только уже установленные на сайте факты (PARK, PRICE), без
  новых внешних источников: см. комментарий к FACT_CHECK_W172 в
  app/site-data.ts. Тот же приём, что и на montazh-tyazhelogo-oborudovaniya
  (Волна 169). Принцип «кран выбирают по высоте и вылету для конкретной
  точки, а не по одной паспортной цифре» уже на четырёх других страницах —
  ссылаемся, не пересказываем. Массу кабины и противовеса не печатаем
  числом: это паспортная величина поставщика лифта.
*/

const title = "Кран для монтажа лифтового оборудования: высота и вылет";
const description =
  "Кран для подъёма кабины лифта в шахту подбирают по высоте и вылету от площадки во дворе до оси шахты — сравнение машин парка KRANNEVA 41–130 т.";
const h1 = "Какой кран выбрать для подъёма лифтового оборудования и кабины в шахту?";
const canonical = "/obekty/montazh-liftovogo-oborudovaniya/";
const published = "2026-10-03";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const mid = PRICE[1];
const heavy = PRICE[2];

const byName = (name: string) => PARK.find((p) => p.name === name)!;
const liftPark = [
  byName("Kato NK-250E-V"),
  byName("XCMG QY60K"),
  byName("Zoomlion ZTC1000V"),
  byName("Liebherr LTM 1130-5.1"),
];

const toc = [
  { id: "printsip", label: "Почему высота шахты важнее массы кабины" },
  { id: "sravnenie", label: "Какая машина парка достаёт до верха шахты" },
  { id: "dvor", label: "Вылет от площадки во дворе до оси шахты" },
  { id: "chto-ne-pechataem", label: "Что не входит в заявку: масса кабины и противовеса" },
  { id: "raschet", label: "Сколько стоит смена для монтажа лифтового оборудования" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Хватит ли одной машины на весь монтаж лифтового оборудования?",
    a: "Зависит от того, что поднимают в одну смену. Кабину, противовес и направляющие нередко поднимают порознь, а не одним циклом. KRANNEVA подбирает машину по самой требовательной операции графика монтажа — обычно это подъём кабины на полную высоту шахты.",
  },
  {
    q: "Какой кран нужен для лифтовой шахты высотного здания?",
    a: `Для шахты, которая доходит до отметки выше 60 м, в парке KRANNEVA работают те же три машины, что и на высотном монтаже вообще: Liebherr LTM 1090-4.1, Zoomlion ZTC1000V — ${liftPark[2].height}, Liebherr LTM 1130-5.1 — ${liftPark[3].height}. Подробное сравнение — на странице про монтаж выше 60 метров.`,
  },
  {
    q: "Можно ли поднять кабину лифта краном в тесном дворе исторического центра?",
    a: `Да, если позволяет вылет от доступной точки установки до оси шахты. Для узкого проезда и ограниченного разворота KRANNEVA использует Kato NK-250E-V — минимальный радиус разворота 9,5 м и уменьшенный опорный контур. Подробно о въезде в такой двор — на отдельной странице раздела «Объекты».`,
  },
  {
    q: "Нужно ли сообщать массу кабины и противовеса заранее?",
    a: "Да, с паспортом конкретной модели лифта. KRANNEVA сверяет массу кабины, противовеса и секций направляющих с грузовой таблицей машины на нужном вылете и высоте до подтверждения даты. Типового числа «масса кабины лифта» для расчёта не используется — модели расходятся по массе в разы.",
  },
  {
    q: "Нужны ли для монтажа лифтового оборудования два крана одновременно?",
    a: "Иногда — например, если направляющие шахты заводят одним краном, а кабину в это же окно поднимает второй. Совместная работа двух кранов KRANNEVA на одной площадке возможна только по ППР или технологической карте, с нагрузкой на каждую машину не выше её собственной грузоподъёмности на её вылете.",
  },
  {
    q: "Сколько стоит смена крана для монтажа лифтового оборудования?",
    a: `От класса ${mid.cls} — от ${rub(shiftTotal(mid.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. Такелаж и расчёт строповки кабины считаются отдельно, если монтажная организация лифта не привозит свою оснастку.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Монтаж лифтового оборудования", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для подъёма кабины лифта и лифтового оборудования в шахту",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Монтаж лифтового оборудования</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · монтаж лифтового оборудования</span>
          <h1>{h1}</h1>
          <p>
            Решает не паспортная масса кабины лифта, а высота шахты и вылет от доступной точки
            установки крана во дворе до её оси: кабину заводят сверху через приямок или проём
            машинного помещения, и до этой точки должна доставать стрела на нужном вылете.
            KRANNEVA подбирает машину из парка класса {mid.cls}–{heavy.cls} — от XCMG QY60K до
            Liebherr LTM 1130-5.1 — по высоте шахты и доступному вылету, а не по заявленному
            тоннажу кабины.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W172} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана для монтажа лифтового оборудования</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>подъём кабины и противовеса лифта в шахту через приямок или проём машинного помещения, монтаж направляющих и секций шахты, разгрузка лифтового оборудования на площадке</td></tr>
              <tr><th scope="row">Класс техники</th><td>{mid.cls}–{heavy.cls} — по высоте шахты и вылету от площадки во дворе</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link> для тесного двора, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link>, <Link href="/park/liebherr-ltm-1130/">Liebherr LTM 1130-5.1</Link> для высотной шахты</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>высота подъёма до верха шахты и вылет от точки установки до её оси, не номинальная грузоподъёмность машины</td></tr>
              <tr><th scope="row">Что не входит в подачу</th><td>масса кабины, противовеса и секций направляющих числом — паспортные данные конкретной модели лифта у его поставщика</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(mid.rate)}/час без НДС ({mid.cls}), {rub(heavy.rate)} ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="printsip">Почему высота шахты важнее массы кабины</h2>
        <p>
          Кабину лифта опускают в шахту сверху, и первым KRANNEVA проверяет, достаёт ли стрела
          машины до верхней отметки шахты с нужным вылетом. Выдерживает ли машина массу кабины —
          вопрос второй: масса современной пассажирской кабины редко выходит за рамки младших
          классов парка, а высота шахты высотного жилого дома легко превышает досягаемость 40- и
          60-тонных машин. Тот же принцип — грузоподъёмность и досягаемость на конкретной
          точке важнее паспортной цифры — уже разобран на странице{" "}
          <Link href="/obekty/montazh-tyazhelogo-oborudovaniya/">монтажа тяжёлого технологического
          оборудования</Link> и на странице{" "}
          <Link href="/obekty/podem-lyudey-v-lyulke-kranom/">подъёма людей в люльке</Link>, где
          п. 237 ФНП № 461 требует двукратный запас именно по грузовой таблице на рабочем
          вылете, а не по номиналу машины.
        </p>
        <p>
          Ошибка «возьмём кран потяжелее, раз лифт тяжёлый» здесь дороже, чем на обычном
          монтаже: более тяжёлый класс не решает задачу высоты, если стрела физически короче
          шахты. KRANNEVA для высотных шахт сразу предлагает машину с длинной стрелой или гуськом,
          а не технику с большим номинальным тоннажом и недостаточной высотой подъёма.
        </p>

        <h2 id="sravnenie">Какая машина парка достаёт до верха шахты</h2>
        <p>
          KRANNEVA сравнивает четыре машины парка по высоте подъёма и вылету стрелы для монтажа
          лифтового оборудования — от компактной машины для тесного двора до техники для шахты
          высотного здания.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Высота подъёма и вылет для монтажа лифтового оборудования</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Высота подъёма</th>
                <th scope="col">Стрела</th>
                <th scope="col">Для какой шахты</th>
              </tr>
            </thead>
            <tbody>
              {liftPark.map((p) => (
                <tr key={p.href}>
                  <th scope="row"><Link href={p.href}>{p.name}</Link></th>
                  <td>{p.height}</td>
                  <td>{p.boom}</td>
                  <td>{p.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Для шахт выше 60 м KRANNEVA сравнивает три самых высоких машины парка — Liebherr LTM
          1090-4.1, Zoomlion ZTC1000V и Liebherr LTM 1130-5.1 — подробно это разобрано на
          странице{" "}
          <Link href="/obekty/vysotnyy-montazh-vyshe-60-metrov/">монтажа на высоте больше 60
          метров</Link>: логика выбора та же, а здесь прибавляется требование по положению
          стрелы точно над осью шахты, а не просто над точкой монтажа.
        </p>

        <h2 id="dvor">Вылет от площадки во дворе до оси шахты</h2>
        <p>
          Шахту лифта в жилом доме KRANNEVA чаще всего монтирует с внутреннего двора, а не с
          фасада улицы. Доступная точка установки крана там обычно дальше от оси шахты, чем
          хотелось бы по паспортной грузовой таблице. Для домов исторического центра с узкой
          аркой и
          тесным двором-колодцем ограничение по въезду и развороту уже разобрано отдельно —{" "}
          <Link href="/obekty/dvor-kolodets-istoricheskogo-tsentra/">какой автокран пройдёт в
          двор-колодец</Link>; здесь это ограничение не повторяется числом, а добавляется к
          расчёту вылета до оси шахты.
        </p>
        <p>
          Если по графику монтажа направляющие шахты заводят одновременно с подъёмом кабины
          другим краном, действует тот же порядок, что и на странице{" "}
          <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">про два крана на одной
          площадке</Link>: совместная работа только по ППР или технологической карте, нагрузка на
          каждую машину — не выше её собственной грузоподъёмности на её собственном вылете.
        </p>

        <h2 id="chto-ne-pechataem">Что не входит в заявку: масса кабины и противовеса</h2>
        <p>
          Массу кабины, противовеса и секций направляющих конкретной модели лифта KRANNEVA не
          указывает типовым числом — это паспортная величина, которую называет монтажная
          организация лифта или его поставщик, и она расходится в разы между моделями и
          производителями. Диспетчер запрашивает эти данные вместе с паспортом до расчёта
          класса техники, тем же порядком, что и для технологического оборудования на странице{" "}
          <Link href="/obekty/montazh-tyazhelogo-oborudovaniya/">монтажа тяжёлого
          оборудования</Link>.
        </p>

        <h2 id="raschet">Сколько стоит смена для монтажа лифтового оборудования</h2>
        <p>
          Ставка KRANNEVA: класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))}, класс {heavy.cls} — {rub(heavy.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС. Расчёт строповки кабины и
          нестандартный такелаж в ставку не входят, если их не привозит монтажная организация
          лифта со своей оснасткой. Порядок приёмки такой смены — на странице{" "}
          <Link href="/dlya-zakupok/priemka-i-oplata/">приёмки и оплаты</Link>.
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
        date={FACT_CHECK_W172}
        items={[
          { href: "/park/", label: "KRANNEVA — спецификации парка: высота подъёма, вылет стрелы, тоннаж по каждой машине" },
          { href: "https://www.garant.ru/products/ipo/prime/doc/400065076/", label: "ГАРАНТ — приказ Ростехнадзора от 26.11.2020 № 461, п. 132: условия прекращения работ по ветру, температуре, видимости" },
        ]}
        note="Массу и габариты конкретной кабины, противовеса и секций направляющих страница не называет числом — это паспортные величины поставщика лифтового оборудования, а не типовое значение по рынку. Грузоподъёмность машин парка на конкретном вылете и высоте считается индивидуально по грузовой таблице и на странице не печатается единым числом."
      />
    </main>
  );
}
