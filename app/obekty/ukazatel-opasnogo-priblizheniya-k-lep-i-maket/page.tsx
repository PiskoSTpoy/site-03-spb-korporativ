import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W213, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 213. Девяносто второй тип объекта — проверка указателя опасного приближения к ЛЭП на макете перед работой у воздушной линии (ФНП № 461, п. 266, приложение № 9). Фактура — в комментарии к FACT_CHECK_W211–213
  в app/site-data.ts.
*/

const title = "Указатель опасного приближения к ЛЭП: макет";
const description =
  "ФНП № 461 (п. 266, приложение № 9): перед работой у ЛЭП указатель автокрана проверяют на макете 220/380 В с опорами от 6 м и пролётом от 15 м.";
const h1 = "Как проверяют указатель опасного приближения к ЛЭП перед работой крана у воздушной линии?";
const canonical = "/obekty/ukazatel-opasnogo-priblizheniya-k-lep-i-maket/";
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
  { id: "maket-lep", label: "Макет ЛЭП по приложению № 9" },
  { id: "kriteriy", label: "Когда прибор считается исправным" },
  { id: "imitator", label: "Переносной имитатор" },
  { id: "peterburg", label: "Воздушные линии на юго-западе Петербурга" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Обязательно ли проверять указатель ЛЭП перед каждой работой у линии?",
    a: "Да. По приложению № 9 к ФНП № 461 ограничитель или указатель опасного приближения проверяют на макете ЛЭП перед направлением крана в опасную зону линии.",
  },
  {
    q: "Как устроен макет ЛЭП для проверки?",
    a: "Трёхфазная четырёхпроводная линия 220/380 В из изолированных проводов на опорах высотой не менее 6 м, расстояние между опорами — не менее 15 м. Вдоль нижнего провода на расстоянии (1,5 ± 0,1) м натянут ограничительный канат.",
  },
  {
    q: "Когда указатель опасного приближения считается работоспособным?",
    a: "Если он срабатывает при выдвижении или наклоне стрелы раньше, чем оголовок стрелы коснётся ограничительного каната макета (приложение № 9).",
  },
  {
    q: "Можно ли обойтись без стационарного макета?",
    a: "Для установления состояния прибора приложение № 9 допускает переносной имитатор ЛЭП по методике из его эксплуатационных документов.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA у воздушной линии?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Наряд-допуск и согласование с сетевой организацией в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Указатель опасного приближения к ЛЭП", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором для работы у воздушной линии электропередачи",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Указатель опасного приближения к ЛЭП</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Петербург · работа у воздушной линии</span>
          <h1>{h1}</h1>
          <p>
            Приложение № 9 к ФНП № 461 требует проверить указатель опасного приближения к ЛЭП на макете линии перед тем, как кран направят в опасную зону. Макет — линия 220/380 В на опорах высотой от 6 м с пролётом от 15 м и ограничительным канатом в 1,5 м от нижнего провода. Прибор исправен, если срабатывает до касания каната оголовком стрелы. KRANNEVA подаёт XCMG QY60K к воздушной линии только с отметкой о такой проверке.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W213} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Макет ЛЭП для проверки указателя по приложению № 9 к ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Требование</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Линия</th><td>трёхфазная четырёхпроводная, 220/380 В, изолированные провода</td></tr>
              <tr><th scope="row">Высота опор</th><td className="dtable__num">не менее 6 м</td></tr>
              <tr><th scope="row">Расстояние между опорами</th><td className="dtable__num">не менее 15 м</td></tr>
              <tr><th scope="row">Ограничительный канат</th><td className="dtable__num">вдоль нижнего провода, (1,5 ± 0,1) м от него</td></tr>
              <tr><th scope="row">Критерий исправности</th><td>срабатывание до касания каната оголовком стрелы</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA к воздушной линии</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>отметку о проверке указателя ЛЭП, наряд-допуск заказчика, согласование сетевой организации</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="maket-lep">Макет ЛЭП по приложению № 9</h2>
        <p>
          Пункт 266 ФНП № 461 отсылает оценку ограничителя или указателя опасного приближения к ЛЭП к приложению № 9, а не к руководству по эксплуатации. Макет по приложению — трёхфазная четырёхпроводная линия 220/380 В из изолированных проводов на опорах не ниже 6 м, с пролётом не меньше 15 м, на специальной площадке. Вдоль нижнего провода на расстоянии (1,5 ± 0,1) м натягивают ограничительный канат или шнур. Отметку о проверке на таком макете KRANNEVA прикладывает к заявке на SANY STC400T у линии.
        </p>

        <h2 id="kriteriy">Когда прибор считается исправным</h2>
        <p>
          Критерий исправности в приложении № 9 к ФНП № 461 один: указатель срабатывает при выдвижении или наклоне стрелы раньше, чем её оголовок коснётся ограничительного каната. Канат стоит в полутора метрах от провода, поэтому запас до самой линии остаётся и при проверке. Отдельно приложение требует проверить прибор на макете именно перед направлением крана в опасную зону, а не раз в год. Для XCMG QY60K в заявке KRANNEVA это означает проверку перед каждой работой у воздушной линии.
        </p>

        <h2 id="imitator">Переносной имитатор</h2>
        <p>
          Переносной имитатор ЛЭП приложение № 9 к ФНП № 461 допускает для установления состояния указателя — по методике из эксплуатационных документов самого имитатора. Цифр для имитатора ФНП не задают: их даёт изготовитель прибора. Поэтому KRANNEVA к отметке о проверке Kato NK-250E-V на имитаторе прикладывает ссылку на его методику. Итог проверки ограничителей и указателей, как и у <Link href="/obekty/proverka-ogranichitelya-gruzopodemnosti-krana/">ограничителя грузоподъёмности</Link>, по пункту 269 оформляют актом к паспорту крана.
        </p>

        <h2 id="peterburg">Воздушные линии на юго-западе Петербурга</h2>
        <p>
          Воздушные линии 110 кВ проходят и по пригородам Петербурга: 1 октября 2026 года «Петербургский дневник» сообщил, что «Россети Ленэнерго» заменили 54 изолятора на такой линии, питающей около 28 тысяч жителей Стрельны, Горелова, Новогорелова и Новоселья. Номер линии в заметке не назван, про краны в ней ничего нет. Для заказчика вывод практический: на юго-западных площадках Liebherr LTM 1090-4.1 может оказаться рядом с высоковольтной ЛЭП. Размеры охранных зон и согласование с сетевой организацией разобраны на странице <Link href="/obekty/ohrannaya-zona-lep/">об охранной зоне ЛЭП</Link>.
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
        date={FACT_CHECK_W213}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 266, 269 и приложение № 9 (редакция от 16.04.2026)" },
          { href: "https://spbdnevnik.ru/news/2026-10-01/rosseti-lenenergo-povysili-nadezhnost-elektrosnabzheniya-28-tysyach-zhiteley-prigoroda-peterburga-i-lomonosovskogo-rayona-lenoblasti", label: "«Петербургский дневник», 01.10.2026 — «Россети Ленэнерго» повысили надёжность электроснабжения 28 тысяч жителей пригорода Петербурга и Ломоносовского района Ленобласти" },
        ]}
        note="Страница пересказывает пункт 266 и приложение № 9 ФНП № 461. Пример с линией 110 кВ — из новостной заметки, которая краны не упоминает; подача крана только с отметкой о проверке указателя — условие заявки KRANNEVA, а не норма."
      />
    </main>
  );
}
