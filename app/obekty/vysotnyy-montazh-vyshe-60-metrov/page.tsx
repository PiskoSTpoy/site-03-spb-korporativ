import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W166, MIN_SHIFT_HOURS, PARK, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 166. Сорок пятый тип объекта — высотный монтаж выше 60 м (мачты,
  оборудование на кровле высотного здания). Угол коммерческий/сравнительный:
  какие машины парка достают выше 60 м и сколько стоит переход в тяжёлый класс.

  Фактура — в комментарии к FACT_CHECK_W166 в app/site-data.ts. Высоты и стрелы —
  только из PARK. Грузоподъёмность на высоте не печатаем: она в грузовой таблице
  машины. Порог ветра числом не называем — п. 132 ФНП № 461 отсылает к паспорту.
*/

const title = "Кран для монтажа выше 60 метров: какую машину брать";
const description =
  "Выше 60 м в парке KRANNEVA поднимают три машины: Liebherr LTM 1090-4.1 — до 69 м, Zoomlion ZTC1000V — 82,5 м, Liebherr LTM 1130-5.1 — 91,0 м. Ставки и условия.";
const h1 = "Какой автокран нужен для монтажа на высоте больше 60 метров?";
const canonical = "/obekty/vysotnyy-montazh-vyshe-60-metrov/";
const published = "2026-10-01";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];
const heavy = PRICE[2];

const byName = (name: string) => PARK.find((m) => m.name === name)!;
const sany = byName("SANY STC400T");
const xcmg = byName("XCMG QY60K");
const ltm1090 = byName("Liebherr LTM 1090-4.1");
const ztc = byName("Zoomlion ZTC1000V");
const ltm1130 = byName("Liebherr LTM 1130-5.1");

const toc = [
  { id: "granitsa", label: "Почему граница проходит по 60 метрам" },
  { id: "sravnenie", label: "Пять машин парка: стрела, высота, ставка" },
  { id: "strela-ili-gusek", label: "Стрела или гусёк: что выбрать на высоте" },
  { id: "veter", label: "Что останавливает высотный монтаж" },
  { id: "raschet", label: "Сколько стоит переход в тяжёлый класс" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой автокран достаёт выше 60 метров?",
    a: `В парке KRANNEVA выше 60 м работают три машины класса ${heavy.cls}: Liebherr LTM 1090-4.1 — ${ltm1090.height}, Zoomlion ZTC1000V — ${ztc.height}, Liebherr LTM 1130-5.1 — ${ltm1130.height}. SANY STC400T и XCMG QY60K заканчиваются у отметки 60 м и на этой высоте работают только с гуськом.`,
  },
  {
    q: "Хватит ли 40-тонного крана для монтажа на 55 метрах?",
    a: `SANY STC400T поднимает на ${sany.height}, но основная стрела у него ${sany.boom}: выше работает гусёк, а грузоподъёмность на гуське берётся из грузовой таблицы и заметно ниже номинала. KRANNEVA подтверждает 40-тонник на 55 м только после сверки массы груза и вылета с таблицей.`,
  },
  {
    q: "При каком ветре останавливают высотный монтаж?",
    a: "П. 132 ФНП № 461 требует прекратить работу крана на открытом воздухе при ветре выше предельной скорости из паспорта машины; единого числа для всех кранов в ФНП нет. KRANNEVA называет порог по паспорту конкретной модели и дополнительно учитывает парусность груза, записанную в ППР.",
  },
  {
    q: "Сколько стоит смена крана на высотный монтаж?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов в классе ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС; для сравнения класс ${mid.cls} — от ${rub(shiftTotal(mid.rate))}. Разницу KRANNEVA показывает до заявки, чтобы заказчик видел цену перехода через отметку 60 м.`,
  },
  {
    q: "Нужно ли согласование для крана со стрелой выше 60 метров в Петербурге?",
    a: "Зависит от адреса: на приаэродромной территории Пулково высота объектов, включая временные, согласуется отдельно. KRANNEVA проверяет адрес до подбора машины; порядок разобран на странице о приаэродромной территории. Для остальных адресов Liebherr LTM 1130-5.1 и Zoomlion ZTC1000V подбираются по грузовой таблице и ППР.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Высотный монтаж выше 60 метров", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для высотного монтажа выше 60 метров",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  offers: {
    "@type": "Offer",
    businessFunction: "https://schema.org/LeaseOut",
    priceCurrency: "RUB",
    priceSpecification: { "@type": "UnitPriceSpecification", price: String(heavy.rate), priceCurrency: "RUB", unitText: "HOUR", valueAddedTaxIncluded: false },
  },
};
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const artLd = articleLd({ headline: h1, description, canonical, published });

const rows = [
  { m: sany, rate: light.rate },
  { m: xcmg, rate: mid.rate },
  { m: ltm1090, rate: heavy.rate },
  { m: ztc, rate: heavy.rate },
  { m: ltm1130, rate: heavy.rate },
];

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Высотный монтаж выше 60 метров</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · высотный монтаж</span>
          <h1>{h1}</h1>
          <p>
            Выше 60 метров в парке KRANNEVA поднимают груз три машины класса {heavy.cls}: Liebherr
            LTM 1090-4.1 — {ltm1090.height}, Zoomlion ZTC1000V — {ztc.height}, Liebherr LTM
            1130-5.1 — {ltm1130.height}. SANY STC400T и XCMG QY60K упираются в отметку 60 м.
            Переход через эту границу меняет ставку с {rub(mid.rate)} до {rub(heavy.rate)} за час,
            поэтому высоту установки груза стоит назвать в заявке первой строкой.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W166} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана на высотный монтаж</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>секции мачт и вышек, оборудование на кровле высотного здания, фасадные элементы и вентустановки верхних этажей</td></tr>
              <tr><th scope="row">Класс техники</th><td>{heavy.cls} выше 60 м; {light.cls} и {mid.cls} — до 60 м с гуськом</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href={ltm1090.href}>Liebherr LTM 1090-4.1</Link>, <Link href={ztc.href}>Zoomlion ZTC1000V</Link>, <Link href={ltm1130.href}>Liebherr LTM 1130-5.1</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>грузоподъёмность на высоте и вылете по грузовой таблице, а не номинальный тоннаж</td></tr>
              <tr><th scope="row">Погодное условие</th><td>ветер и температура — по паспорту машины, видимость — по п. 132 ФНП № 461</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>маршрут машины класса {heavy.cls} и, у Пулково, согласование высоты</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">{rub(heavy.rate)}/час без НДС ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="granitsa">Почему граница проходит по 60 метрам</h2>
        <p>
          Отметка 60 м — предел двух младших машин парка KRANNEVA: SANY STC400T поднимает на{" "}
          {sany.height}, XCMG QY60K — {xcmg.height}. Обе достают туда только с гуськом, а основная
          стрела у них {sany.boom} и {xcmg.boom}. Выше остаётся класс {heavy.cls}, и ставка
          меняется скачком. Граница взята из паспортных данных парка, а не из норматива: в ФНП
          № 461 «высотного» порога для автокранов нет.
        </p>
        <p>
          Высота подъёма в паспорте — не высота здания. KRANNEVA считает от отметки установки
          груза и прибавляет высоту самого груза, длину стропов и запас над парапетом. Для
          кровли на 52 м этот набор легко выводит задачу за 60 м, и заявка «кран на 50 метров»
          оборачивается заменой машины на площадке.
        </p>

        <h2 id="sravnenie">Пять машин парка: стрела, высота, ставка</h2>
        <p>
          Пять автокранов KRANNEVA различаются по высоте подъёма от {sany.height} до{" "}
          {ltm1130.height}, а по часовой ставке — от {rub(light.rate)} до {rub(heavy.rate)}.
          Таблица сводит эти параметры; три нижние строки стоят одинаково, хотя разница по высоте
          между ними больше 20 м.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Автокраны парка KRANNEVA по высоте подъёма и ставке</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Тоннаж</th>
                <th scope="col">Основная стрела</th>
                <th scope="col">Высота подъёма</th>
                <th scope="col">Ставка, ₽/час</th>
                <th scope="col">Смена {MIN_SHIFT_HOURS} ч</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ m, rate }) => (
                <tr key={m.name}>
                  <th scope="row"><Link href={m.href}>{m.name}</Link></th>
                  <td>{m.tonnage}</td>
                  <td>{m.boom}</td>
                  <td>{m.height}</td>
                  <td className="dtable__num">{rub(rate)}</td>
                  <td className="dtable__num">{rub(shiftTotal(rate))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Одинаковая ставка трёх тяжёлых машин KRANNEVA даёт заказчику свободу выбора: между
          Liebherr LTM 1090-4.1 и Liebherr LTM 1130-5.1 решает не цена часа, а грузовая таблица и
          проходимость маршрута. Запас по высоте в 20 м в этом классе бесплатен, а запас по
          габариту машины — нет: 130-тонник требует больше места под опоры.
        </p>

        <h2 id="strela-ili-gusek">Стрела или гусёк: что выбрать на высоте</h2>
        <p>
          Zoomlion ZTC1000V достаёт высоту основной стрелой {ztc.boom} — самой длинной чистой
          телескопической стрелой парка KRANNEVA, — а Liebherr LTM 1130-5.1 набирает свои{" "}
          {ltm1130.height} с удлинителем. Разница практическая: гусёк и удлинитель монтируются
          на площадке и занимают время смены, а грузоподъёмность на них ниже, чем на основной
          стреле той же длины.
        </p>
        <p>
          Правило подбора KRANNEVA для высоты 60–65 м: если груз проходит по таблице Zoomlion
          ZTC1000V на основной стреле, берётся эта машина, потому что смена начинается с подъёма,
          а не со сборки гуська. Liebherr LTM 1130-5.1 остаётся для груза тяжелее и для отметок,
          куда 64,5 м стрелы не хватает. Решение проверяется грузовой таблицей, а не этим
          правилом.
        </p>

        <h2 id="veter">Что останавливает высотный монтаж</h2>
        <p>
          Пункт 132 ФНП № 461 называет три причины остановить кран на открытом воздухе: ветер
          выше предельной скорости из паспорта, температура ниже паспортной и снегопад, дождь или
          туман, при которых крановщик плохо различает сигналы стропальщика или груз. На высоте
          60–90 м третья причина заслуживает отдельной строки ППР: груз у оголовка стрелы
          крановщик видит хуже, чем у земли, и туман или снег на этой высоте могут закрыть его
          раньше. KRANNEVA просит записать в ППР радиосвязь со стропальщиком на отметке монтажа.
        </p>
        <p>
          Ветровой порог KRANNEVA числом не обобщает: у каждой из пяти машин он свой и записан в
          паспорте, а для груза с большой парусностью ППР задаёт более жёсткое значение. Как
          ветер с залива меняет зимнюю смену, разобрано на странице{" "}
          <Link href="/obekty/poberezhe-finskogo-zaliva-zimoy/">про побережье Финского залива</Link>;
          высотные ограничения у аэропорта — на странице{" "}
          <Link href="/obekty/priaerodromnaya-territoriya/">о приаэродромной территории</Link>.
        </p>

        <h2 id="raschet">Сколько стоит переход в тяжёлый класс</h2>
        <p>
          Переход с XCMG QY60K на машину класса {heavy.cls} добавляет к смене KRANNEVA{" "}
          {rub(shiftTotal(heavy.rate) - shiftTotal(mid.rate))}: {rub(mid.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} против {rub(heavy.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС. От SANY STC400T разница
          составляет {rub(shiftTotal(heavy.rate) - shiftTotal(light.rate))} за смену. Дешевле
          узнать нужную высоту до заявки, чем оплатить подачу 60-тонника, который не достал до
          отметки. Маршрут тяжёлой машины согласуется отдельно — условия в{" "}
          <Link href="/#price">прайсе</Link>.
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
        date={FACT_CHECK_W166}
        items={[
          { href: "https://www.garant.ru/products/ipo/prime/doc/400065076/", label: "ГАРАНТ — приказ Ростехнадзора от 26.11.2020 № 461 (ФНП по подъёмным сооружениям), п. 132: когда прекращают работу крана на открытом воздухе" },
          { href: "https://kranneva.ru/park/", label: "KRANNEVA — парк техники: длина стрелы и высота подъёма по каждой модели" },
        ]}
        note="Высоты и длины стрел — паспортные данные моделей со страниц парка. Грузоподъёмность на высоте и предельную скорость ветра числом не печатаем: первая берётся из грузовой таблицы машины на конкретном вылете, вторая — из паспорта крана и ППР. «Высотного» порога 60 м в ФНП № 461 нет — это граница между классами нашего парка."
      />
    </main>
  );
}
