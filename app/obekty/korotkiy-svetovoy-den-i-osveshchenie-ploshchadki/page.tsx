import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W192, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 192. Семьдесят первый тип объекта — зимняя смена при коротком световом дне
  Петербурга (59,94° с. ш.). Угол практический/петербургский: 22 декабря светло
  5 ч 53 мин при минимальной смене 8 ч. Нормы освещённости — ГОСТ 12.1.046-2014,
  таблица 2; видимость сигналов — п. 132 ФНП № 461 (разобран на veter-i-gololed,
  здесь только в связке с освещением). Время восхода/захода — собственный расчёт по
  алгоритму NOAA, сверен с цифрой главного синоптика Петербурга за 22.12.2022.
  Фактура — в комментарии к FACT_CHECK_W192 в app/site-data.ts.
*/

const title = "Короткий световой день в Петербурге: свет для крана";
const description =
  "22 декабря в Петербурге светло 5 ч 53 мин (10:00–15:53), смена крана — 8 часов. Сколько люкс требует ГОСТ 12.1.046-2014 на площадке приёма груза и у крюка.";
const h1 = "Как работает кран в Петербурге зимой, когда световой день короче смены?";
const canonical = "/obekty/korotkiy-svetovoy-den-i-osveshchenie-ploshchadki/";
const published = "2026-10-10";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "shest-chasov", label: "Шесть часов света против восьми часов смены" },
  { id: "lyuksy", label: "Сколько люкс нужно на площадке приёма груза и у крюка" },
  { id: "izmerenie", label: "Измерение освещённости до начала смены" },
  { id: "signaly-132", label: "Видимость сигналов стропальщика по п. 132" },
  { id: "planirovanie", label: "Как KRANNEVA планирует зимнюю смену" },
  { id: "zakazchik", label: "Что подготовить заказчику до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько длится световой день в Петербурге в декабре?",
    a: "22 декабря 2026 года — 5 часов 53 минуты: восход в 10:00, заход в 15:53 (расчёт по алгоритму NOAA для широты 59,94° с. ш.). Главный синоптик Петербурга Александр Колесов называл для 22 декабря 2022 года 5 часов 52 минуты. 1 декабря светло 6 ч 30 мин, 1 февраля — уже 7 ч 57 мин.",
  },
  {
    q: "Можно ли работать автокраном в темноте?",
    a: "Да, при освещении площадки по норме. ГОСТ 12.1.046-2014 задаёт для погрузки, подъёма и разгрузки грузоподъёмными кранами 50 лк на площадках приёма и подачи и 20 лк на крюке крана во всех его положениях со стороны машиниста. Останавливает работу не темнота сама по себе, а неразличимость сигналов стропальщика или груза (п. 132 ФНП № 461).",
  },
  {
    q: "Сколько люкс нужно для монтажа конструкций краном ночью?",
    a: "30 лк по всей высоте сборки — норма таблицы 2 ГОСТ 12.1.046-2014 для монтажа стальных, железобетонных и деревянных конструкций. Для автомобильных дорог на площадке норма 10 лк на проезжей части.",
  },
  {
    q: "Кто измеряет освещённость на площадке?",
    a: "ГОСТ 12.1.046-2014 требует измерять освещённость перед началом работ (п. 6.5) и считает установку соответствующей норме, если измеренная средняя освещённость не ниже нормируемой (п. 6.4). Ответственную сторону стандарт не называет; освещение площадки — часть её подготовки заказчиком, KRANNEVA сверяет результат до первого подъёма.",
  },
  {
    q: "Меняется ли ставка крана зимой?",
    a: `Нет. Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС круглый год. Короткий световой день не сокращает минимальную смену.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Короткий световой день", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: зимняя смена при искусственном освещении площадки",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Короткий световой день</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · зимняя смена в Петербурге</span>
          <h1>{h1}</h1>
          <p>
            5 часов 53 минуты длится световой день в Петербурге 22 декабря 2026 года: восход в 10:00, заход в 15:53 по расчёту для широты 59,94° с. ш. Минимальная смена KRANNEVA — {MIN_SHIFT_HOURS} часов, поэтому с середины ноября до конца января часть смены автокрана SANY STC400T проходит при искусственном освещении. Норму освещённости задаёт ГОСТ 12.1.046-2014: 50 лк на площадке приёма и подачи груза и 20 лк на крюке крана со стороны машиниста.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W192} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Световой день в Петербурге зимой 2026/27 (расчёт по алгоритму NOAA, 59,94° с. ш., 30,31° в. д.)</caption>
            <thead>
              <tr>
                <th scope="col">Дата</th>
                <th scope="col">Восход</th>
                <th scope="col">Заход</th>
                <th scope="col">Светло</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">15 ноября 2026</th><td className="dtable__num">08:55</td><td className="dtable__num">16:31</td><td className="dtable__num">7 ч 35 мин</td></tr>
              <tr><th scope="row">1 декабря 2026</th><td className="dtable__num">09:32</td><td className="dtable__num">16:02</td><td className="dtable__num">6 ч 30 мин</td></tr>
              <tr><th scope="row">22 декабря 2026</th><td className="dtable__num">10:00</td><td className="dtable__num">15:53</td><td className="dtable__num">5 ч 53 мин</td></tr>
              <tr><th scope="row">15 января 2027</th><td className="dtable__num">09:46</td><td className="dtable__num">16:28</td><td className="dtable__num">6 ч 42 мин</td></tr>
              <tr><th scope="row">1 февраля 2027</th><td className="dtable__num">09:13</td><td className="dtable__num">17:10</td><td className="dtable__num">7 ч 57 мин</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Нормы освещённости для работы крана — таблица 2 ГОСТ 12.1.046-2014</caption>
            <thead>
              <tr>
                <th scope="col">Участок работ</th>
                <th scope="col">Плоскость</th>
                <th scope="col">Освещённость</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Погрузка, установка, подъём и разгрузка грузоподъёмными кранами</th><td>горизонтальная — площадки приёма и подачи оборудования, конструкций и материалов</td><td className="dtable__num">50 лк</td></tr>
              <tr><th scope="row">То же — крюк крана</th><td>вертикальная — крюк во всех положениях со стороны машиниста</td><td className="dtable__num">20 лк</td></tr>
              <tr><th scope="row">Монтаж стальных, железобетонных и деревянных конструкций</th><td>вертикальная — по всей высоте сборки</td><td className="dtable__num">30 лк</td></tr>
              <tr><th scope="row">Автомобильные дороги на площадке</th><td>горизонтальная — проезжая часть</td><td className="dtable__num">10 лк</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA подаёт на зимнюю смену</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>освещённость площадки приёма груза и крюка; различимость сигналов стропальщика (п. 132 ФНП № 461)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="shest-chasov">Шесть часов света против восьми часов смены</h2>
        <p>
          Два часа и больше зимней смены KRANNEVA в Петербурге проходят без дневного света: 22 декабря солнце над горизонтом с 10:00 до 15:53, а минимальная смена длится {MIN_SHIFT_HOURS} часов. Главный синоптик Петербурга Александр Колесов для 22 декабря 2022 года называл 5 часов 52 минуты и высоту солнца 6°36′ над горизонтом — при таком угле здания центра отбрасывают тени во весь двор, и площадка приёма груза во дворе-колодце остаётся в тени весь день. Для SANY STC400T это означает, что искусственное освещение площадки в декабре нужно не только утром и вечером, но и в середине смены, если подъём идёт в тень. С 1 февраля световой день уже 7 ч 57 мин, и к марту вопрос снимается сам.
        </p>

        <h2 id="lyuksy">Сколько люкс нужно на площадке приёма груза и у крюка</h2>
        <p>
          50 лк в горизонтальной плоскости на площадках приёма и подачи оборудования, конструкций и материалов — норма таблицы 2 ГОСТ 12.1.046-2014 для погрузки, установки, подъёма и разгрузки грузоподъёмными кранами. Вторая строка той же позиции задаёт 20 лк на крюке крана во всех его положениях со стороны машиниста, то есть освещённость нужна не только внизу, но и по траектории крюка. Монтаж стальных и железобетонных конструкций требует 30 лк по всей высоте сборки, автомобильные дороги на площадке — 10 лк. KRANNEVA сверяет с этими строками задачу смены: для XCMG QY60K на монтаже каркаса норма выше, чем для разгрузки машины на площадку.
        </p>

        <h2 id="izmerenie">Измерение освещённости до начала смены</h2>
        <p>
          Пункт 6.5 ГОСТ 12.1.046-2014 требует измерять освещённость перед началом работ, а пункт 6.4 признаёт осветительную установку соответствующей норме, если измеренная средняя освещённость не ниже нормируемой. Общее равномерное освещение стандарт допускает только там, где норма не выше 10 лк (п. 4.4), то есть для площадки приёма груза с нормой 50 лк нужны локализованные прожекторы, а не одна мачта на всю стройплощадку. Пункт 4.2 стандарта отдельно требует оснащать строительные машины наружным освещением; на автокранах KRANNEVA это штатные рабочие фары SANY STC400T, которые освещают зону опор и стрелы, но не заменяют освещение площадки приёма груза.
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="signaly-132">Видимость сигналов стропальщика по п. 132</h2>
        <p>
          Снегопад, дождь и туман, при которых крановщик плохо различает сигналы стропальщика или перемещаемый груз, пункт 132 ФНП № 461 называет условием прекращения работы на открытом воздухе. Сумерки в пункте не упомянуты, но критерий тот же — различимость сигналов и груза, и при освещённости ниже нормы ГОСТ 12.1.046-2014 этот критерий не выполняется. KRANNEVA решает вопрос двумя средствами: освещённой площадкой приёма груза по норме 50 лк и порядком обмена сигналами, который эксплуатирующая организация обязана установить по пункту 122 ФНП № 461. Для XCMG QY60K на вылете, где стропальщика с кабины уже не видно, используется радиосвязь. Ветер, температура и гололёд разобраны на странице <Link href="/obekty/veter-i-gololed/">про ветер и гололёд</Link>.
        </p>

        <h2 id="planirovanie">Как KRANNEVA планирует зимнюю смену</h2>
        <p>
          Светлые часы между 10:00 и 15:30 KRANNEVA отдаёт в декабре подъёмам с точной посадкой груза: монтажу оборудования и установке конструкций в проектное положение. Разгрузка машин и перемещение грузов по площадке складирования уходят на тёмные края смены при искусственном освещении. Смена SANY STC400T при этом остаётся {MIN_SHIFT_HOURS}-часовой: короткий световой день не сокращает минимальную смену и не меняет ставку. Если заказчик не может обеспечить 50 лк на площадке приёма, зимой это сдвигает начало смены к восходу и ограничивает число подъёмов, которые успевают пройти при дневном свете.
        </p>

        <h2 id="zakazchik">Что подготовить заказчику до выезда</h2>
        <p>
          Три позиции заказчик готовит к зимней смене KRANNEVA. Первая — освещение площадки приёма и подачи груза не ниже 50 лк и крюка со стороны машиниста не ниже 20 лк (таблица 2 ГОСТ 12.1.046-2014). Вторая — замер освещённости перед началом работ (п. 6.5 того же стандарта). Третья — порядок обмена сигналами, включая радиосвязь для вылета, с которого стропальщик не виден (п. 122 ФНП № 461). Для XCMG QY60K в заявке указывают, какие подъёмы требуют точной посадки — они попадут в светлые часы. Освещение площадки заказчика KRANNEVA не привозит и не проектирует.
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
        date={FACT_CHECK_W192}
        items={[
          { href: "https://meganorm.ru/mega_doc/norm/gost_gosudarstvennyj-standart/2/gost_12_1_046-2014_mezhgosudarstvennyy_standart_sistema.html", label: "ГОСТ 12.1.046-2014 «Система стандартов безопасности труда. Строительство. Нормы освещения строительных площадок» — пункты 4.2, 4.4, 6.4, 6.5, таблица 2 (введён с 01.07.2015 взамен ГОСТ 12.1.046-85)" },
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 122, 132 (редакция от 16.04.2026)" },
          { href: "https://www.fontanka.ru/2023/02/03/72028553/", label: "«Фонтанка.ру», 03.02.2023 — главный синоптик Петербурга Александр Колесов: световой день 22 декабря 2022 года 5 ч 52 мин, высота солнца 6°36′" },
          { href: "https://gml.noaa.gov/grad/solcalc/", label: "NOAA Global Monitoring Laboratory — Solar Calculator: алгоритм расчёта восхода и захода, по которому посчитана таблица светового дня" },
        ]}
        note="Время восхода и захода — собственный расчёт по алгоритму NOAA для координат центра Петербурга без учёта застройки и рельефа; точность около минуты. Таблица 2 ГОСТ 12.1.046-2014 прочитана в открытой публикации текста стандарта, значения стоит сверить с официальным изданием. Освещение площадки проектирует и обеспечивает заказчик; KRANNEVA не назначает число и мощность прожекторов."
      />
    </main>
  );
}
