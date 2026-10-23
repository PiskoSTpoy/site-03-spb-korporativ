import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W216, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 216. Девяносто пятый тип объекта — разводка мостов Петербурга и окно подачи крана на остров или через Неву.
  Фактура — в комментарии к FACT_CHECK_W214–216 в app/site-data.ts. Связь «разводка → окно подачи» — толкование KRANNEVA.
*/

const title = "Разводка мостов в Петербурге и окно подачи крана";
const description =
  "Дворцовый мост в ночь на 10.04.2026 разводили с 1:10 до 2:50 и с 3:10 до 4:55. Как график Мостотреста влияет на окно подачи автокрана KRANNEVA.";
const h1 = "Как разводка мостов в Петербурге влияет на подачу автокрана на объект?";
const canonical = "/obekty/razvodka-mostov-i-okno-podachi-krana-v-spb/";
const published = "2026-10-23";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "grafik", label: "Что известно о графике 2026 года" },
  { id: "kogda-ne-razvodyat", label: "Когда мосты не разводят" },
  { id: "okno", label: "Окно подачи крана" },
  { id: "zayavka", label: "Что указать в заявке" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Во сколько разводят Дворцовый мост?",
    a: "В ночь на 10 апреля 2026 года, когда стартовал период разводки, Дворцовый мост разводили с 1:10 до 2:50 и с 3:10 до 4:55, Троицкий — с 1:20 до 4:50. Действующее расписание публикует «Мостотрест»: его нужно сверять на конкретную ночь.",
  },
  {
    q: "Какие мосты разводят дважды за ночь?",
    a: "По графику «Мостотреста» на 2026 год дважды за ночь разводят Благовещенский, Дворцовый, Володарский, Тучков и Биржевой мосты.",
  },
  {
    q: "Разводят ли мосты каждую ночь?",
    a: "Нет. Разводка зависит от погоды и от ежедневных заявок администрации «Волго-Балта»; мосты не разводят в праздничные ночи, при устойчивых отрицательных температурах, сильном ветре и серьёзном повышении уровня воды.",
  },
  {
    q: "Может ли мост сомкнуться раньше времени по графику?",
    a: "Может. Мосты разводят строго по графику, но сводят иногда раньше: если все караваны судов прошли, крылья опускают, чтобы не задерживать автомобильное движение.",
  },
  {
    q: "Где смотреть актуальный график?",
    a: "В бесплатном мобильном приложении «Мосты Петербурга» и на сайте «Мостотреста». Сторонние таблицы могут отставать от изменений.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Время прохода моста согласуется в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Разводка мостов и окно подачи", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с подачей через разводные мосты Петербурга",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Разводка мостов и окно подачи</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Петербургская практика · разводные мосты</span>
          <h1>{h1}</h1>
          <p>
            Период разводки мостов 2026 года стартовал в ночь с 9 на 10 апреля: Дворцовый мост в ту ночь разводили с 1:10 до 2:50 и с 3:10 до 4:55, Троицкий — с 1:20 до 4:50. Для автокрана это значит, что ночной маршрут через Неву зависит от того, сведены ли пролёты в конкретный час. KRANNEVA при подаче SANY STC400T на остров или через реку сверяет окно прохода моста с графиком «Мостотреста» на нужную ночь.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W216} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что известно о разводке мостов 2026 года из сообщений от 09.04.2026</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Значение</th>
                <th scope="col">Что проверить для подачи крана</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Старт периода разводки</th><td>ночь с 9 на 10 апреля</td><td>дата подачи относительно сезона</td></tr>
              <tr><th scope="row">Мосты через Большую Невку</th><td>с 20 апреля</td><td>не маршрут ли через Сампсониевский, Гренадерский, Кантемировский</td></tr>
              <tr><th scope="row">Дважды за ночь</th><td>Благовещенский, Дворцовый, Володарский, Тучков, Биржевой</td><td>два окна, между ними мост сведён</td></tr>
              <tr><th scope="row">Ночь на 10.04, Дворцовый</th><td>1:10–2:50 и 3:10–4:55</td><td>актуальное время на нужную ночь</td></tr>
              <tr><th scope="row">Ночь на 10.04, Троицкий</th><td>1:20–4:50</td><td>актуальное время на нужную ночь</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA через разводные мосты</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link></td></tr>
              <tr><th scope="row">Что согласуют до выезда</th><td>маршрут, ночь подачи, окно прохода моста по графику</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="grafik">Что известно о графике 2026 года</h2>
        <p>
          Период разводки мостов в Петербурге в 2026 году начался в ночь с 9 на 10 апреля, и первыми навигацию открыли Дворцовый и Троицкий мосты, сообщил «Петербургский дневник» 9 апреля. Мосты через Большую Невку подключились с 20 апреля. Строящийся Большой Смоленский мост, по словам губернатора, станет тринадцатой разводной автомобильной переправой города. По данным «Фонтанки», «Мостотрест» сохранил прежний график: Благовещенский, Дворцовый, Володарский, Тучков и Биржевой мосты разводят дважды за ночь.
        </p>

        <h2 id="kogda-ne-razvodyat">Когда мосты не разводят</h2>
        <p>
          Разводка мостов Петербурга по сообщению «Фонтанки» зависит от погоды и ежедневных заявок администрации «Волго-Балта». Мосты не разводят в праздничные ночи, при устойчивых отрицательных температурах, сильном ветре и серьёзном повышении уровня воды. Строго по графику мосты разводят, а свести их могут раньше, если караваны судов прошли. Для автокрана Kato NK-250E-V это означает, что график на бумаге — ориентир, а не гарантия: сведённый раньше пролёт открывает проезд раньше, а отменённая разводка оставляет мост сведённым всю ночь.
        </p>

        <h2 id="okno">Окно подачи крана</h2>
        <p>
          Окно подачи автокрана KRANNEVA через разводной мост — это интервал между двумя разводками, когда пролёты сведены и по ним можно проехать. Статьи об открытии навигации о кранах не пишут ничего, поэтому вывод здесь — толкование KRANNEVA: ночной перегон негабаритной техники через Неву планируют так, чтобы не оказаться у моста в часы разводки. Две разводки за ночь у Дворцового моста оставляют между собой короткий интервал, который в расписании на 10 апреля составлял 20 минут. Правила проезда негабарита в городе и спецразрешение описаны на странице о <Link href="/obekty/spetsrazreshenie-na-proezd-krana/">спецразрешении на проезд крана</Link>, а ночная работа — на странице о <Link href="/obekty/rabota-kranom-nochyu-i-v-vyhodnye/">работе краном ночью и в выходные</Link>.
        </p>

        <h2 id="zayavka">Что указать в заявке</h2>
        <p>
          Заявка на подачу Liebherr LTM 1090-4.1 через Неву должна называть ночь и мост маршрута: это позволяет KRANNEVA сверить время с графиком «Мостотреста» в день подачи. Без этих двух сведений окно подачи остаётся неизвестным. Если объект на острове, а мост на маршруте разводной, стоит назвать и запасной маршрут: график, по сообщению «Фонтанки», зависит от погоды и заявок, и ночью он может сдвинуться. Район объекта помогает выбрать страница <Link href="/geo/">о районах Петербурга</Link>.
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
        date={FACT_CHECK_W216}
        items={[
          { href: "https://spbdnevnik.ru/news/2026-04-09/aleksandr-beglov-v-peterburge-startuet-ezhegodnyy-period-razvodki-mostov-cherez-nevu", label: "«Петербургский дневник», 09.04.2026: «Александр Беглов: в Петербурге стартует ежегодный период разводки мостов через Неву»" },
          { href: "https://www.fontanka.ru/2026/04/09/76357939/", label: "«Фонтанка.ру», 09.04.2026: «В Петербурге стартует навигация на Неве: график разводки мостов в 2026 году»" },
        ]}
        note="Время разводки приведено на ночь 10 апреля 2026 года по сообщению от 09.04.2026 и не заменяет актуальный график «Мостотреста» на нужную ночь. Эти материалы ничего не говорят о кранах: связь «разводка моста → окно подачи крана» — толкование KRANNEVA, а не норма или позиция Мостотреста."
      />
    </main>
  );
}
