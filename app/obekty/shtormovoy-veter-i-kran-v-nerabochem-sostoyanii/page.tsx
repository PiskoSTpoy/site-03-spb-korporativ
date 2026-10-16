import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W204, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 204. Восемьдесят третий тип объекта — петербургская практика: что делать
  с краном, когда в городе объявлено штормовое предупреждение (ФНП № 461, п. 122
  о нерабочем состоянии и угоне ветром, п. 132 о паспортном пределе ветра).
  Пороги остановки конкретных машин не публикуются (см. veter-i-gololed).
  Погодные примеры — dp.ru: 22.09.2025 и 23.08.2024.
  Фактура — в комментарии к FACT_CHECK_W202–204 в app/site-data.ts.
*/

const title = "Штормовой ветер и кран в Петербурге: п. 122 и п. 132 ФНП";
const description =
  "ФНП № 461 (п. 122): кран в нерабочем состоянии обесточен и защищён от угона ветром. Петербургские предупреждения: 23 м/с в 2025, порывы 20–25 м/с в 2024.";
const h1 = "Что делать с краном, если в Петербурге объявлено штормовое предупреждение?";
const canonical = "/obekty/shtormovoy-veter-i-kran-v-nerabochem-sostoyanii/";
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
  { id: "dva-punkta", label: "Два пункта ФНП: работа и стоянка" },
  { id: "primery-peterburga", label: "Два предупреждения из практики Петербурга" },
  { id: "chto-reshaet-zakazchik", label: "Что остаётся за пределами нормы" },
  { id: "kak-podgotovitsya", label: "Как подготовить площадку заранее" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "При каком ветре кран должен прекратить работу?",
    a: "При скорости ветра выше предельной, которая указана в паспорте именно этого крана (п. 132 ФНП № 461). Единого числа норма не задаёт. KRANNEVA называет предел в карточке каждой машины парка, а не одной цифрой для всех автокранов.",
  },
  {
    q: "Что требует ФНП для крана в нерабочем состоянии?",
    a: "Пункт 122 ФНП № 461: смонтированное подъёмное сооружение в нерабочем состоянии должно быть обесточено и защищено от угона ветром. Порядок приведения в безопасное положение устанавливает эксплуатирующая организация. Для автокрана конкретные действия определяет руководство по эксплуатации машины.",
  },
  {
    q: "Какие предупреждения о ветре объявляли в Петербурге?",
    a: "23 августа 2024 года городская администрация объявила оранжевый уровень опасности при порывах 20–25 м/с. 22 сентября 2025 года МЧС по Петербургу сообщило о жёлтом уровне при ветре до 23 м/с. Оба случая взяты из публикаций Делового Петербурга.",
  },
  {
    q: "Означает ли жёлтый уровень остановку крана?",
    a: "Нет, такой связи в ФНП нет. Остановку определяет паспортный предел конкретной машины, а не цвет уровня опасности. KRANNEVA сопоставляет прогноз порывов с паспортным пределом SANY STC400T или XCMG QY60K и решает до выезда.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA, если её перенесли из-за ветра?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Порядок оплаты при переносе по погоде фиксируется в договоре, на сайте условия не заявлены.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Штормовой ветер и кран в нерабочем состоянии", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге с учётом штормовых предупреждений",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Штормовой ветер и кран в нерабочем состоянии</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · штормовой ветер</span>
          <h1>{h1}</h1>
          <p>
            Пункт 132 ФНП № 461 прекращает работу крана на открытом воздухе при ветре выше предела из паспорта, а пункт 122 требует, чтобы стоящий кран был обесточен и защищён от угона ветром. В Петербурге ветер до 23 м/с объявляли жёлтым уровнем опасности 22 сентября 2025 года, а порывы 20–25 м/с — оранжевым 23 августа 2024 года. Цвет уровня сам остановку не вызывает. KRANNEVA сопоставляет прогноз с паспортным пределом SANY STC400T и XCMG QY60K до выезда.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W204} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Ветер и кран: что требует ФНП № 461 и что известно из Петербурга</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Что требует норма</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Кран работает, ветер растёт</th><td>остановка при ветре выше паспортного предела</td><td className="dtable__num">132</td></tr>
              <tr><th scope="row">Кран стоит в нерабочем состоянии</th><td>обесточен, приняты меры против угона ветром</td><td className="dtable__num">122</td></tr>
              <tr><th scope="row">Приведение в безопасное положение</th><td>порядок устанавливает эксплуатирующая организация</td><td className="dtable__num">122</td></tr>
              <tr><th scope="row">22.09.2025, Петербург</th><td>МЧС: жёлтый уровень, ветер до 23 м/с</td><td>данные dp.ru</td></tr>
              <tr><th scope="row">23.08.2024, Петербург</th><td>администрация: оранжевый уровень, порывы 20–25 м/с</td><td>данные dp.ru</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача в ветреную погоду KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что сверяют до выезда</th><td>прогноз порывов и паспортный предел машины</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="dva-punkta">Два пункта ФНП: работа и стоянка</h2>
        <p>
          ФНП № 461 разделяет ветровую угрозу на два состояния крана. Пока машина работает, действует пункт 132: работу прекращают при скорости ветра выше предельно допустимой по паспорту. Когда кран стоит, действует пункт 122: он обесточен, и приняты меры по предотвращению угона ветром. Разбор условий остановки по пункту 132 вместе с видимостью и температурой — на странице <Link href="/obekty/veter-i-gololed/">про ветер и гололёд</Link>. KRANNEVA использует эту страницу для вопроса, что происходит после остановки.
        </p>

        <h2 id="primery-peterburga">Два предупреждения из практики Петербурга</h2>
        <p>
          23 августа 2024 года городская администрация объявила оранжевый уровень опасности: порывы ветра ожидались 20–25 м/с, в тот день прогнозировали также ливни и грозу. 22 сентября 2025 года МЧС по Петербургу сообщило о жёлтом уровне при ветре до 23 м/с, а Гидрометцентр держал предупреждение до 19:00, на побережье Финского залива ждали 18–23 м/с. Оба случая — осенне-летние ветровые события на уровне города. KRANNEVA приводит их как ориентир частоты, а не как порог для XCMG QY60K, у которого свой паспортный предел.
        </p>

        <h2 id="chto-reshaet-zakazchik">Что остаётся за пределами нормы</h2>
        <p>
          ФНП № 461 не называет цвет уровня опасности и не связывает его с остановкой крана. Нет в норме и перечня мер от угона: пункт 122 лишь требует «принять меры». Для автокрана конкретный порядок приведения в нерабочее положение берут из руководства по эксплуатации и из аварийной инструкции, которая подробно описана на странице <Link href="/obekty/avariynaya-instruktsiya-dlya-raboty-krana/">про аварийную инструкцию</Link>. Кто на объекте принимает решение об остановке, должно быть записано в этой инструкции, и KRANNEVA просит назвать это лицо до первой смены.
        </p>

        <h2 id="kak-podgotovitsya">Как подготовить площадку заранее</h2>
        <p>
          До выезда имеет смысл согласовать три вещи: кто смотрит прогноз порывов, при каком значении по паспорту SANY STC400T работа встаёт и где кран будет стоять после остановки. Последний вопрос связан с правилами стоянки во дворе, описанными на странице <Link href="/obekty/nochnaya-stoyanka-krana-vo-dvore/">про ночную стоянку крана</Link>. Эта последовательность — практика KRANNEVA, а не требование пункта 122; норма фиксирует только результат — обесточенный кран, защищённый от угона.
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
        date={FACT_CHECK_W204}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 122, 132 (редакция от 16.04.2026)" },
          { href: "https://www.dp.ru/a/2025/09/21/mchs-predupredilo-peterburzhcev", label: "Деловой Петербург, 21.09.2025 — МЧС предупредило петербуржцев о штормовом ветре в понедельник (жёлтый уровень, ветер до 23 м/с)" },
          { href: "https://www.dp.ru/a/2024/08/23/peterburzhcev-predupredili", label: "Деловой Петербург, 23.08.2024 — оранжевый уровень опасности, порывы 20–25 м/с" },
        ]}
        note="Страница не публикует паспортные пределы ветра конкретных машин и не связывает цвет уровня опасности с остановкой крана: в ФНП такой связи нет. Порядок «прогноз — паспортный предел — место стоянки» — практика KRANNEVA, а не норма."
      />
    </main>
  );
}
