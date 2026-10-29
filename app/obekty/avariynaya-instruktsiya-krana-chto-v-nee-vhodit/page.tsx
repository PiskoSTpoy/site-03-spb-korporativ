import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W229, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 229. Сто восьмой тип объекта — аварийная инструкция для работников ПС (ФНП № 461, п. 252–253).
  Фактура — в комментарии к FACT_CHECK_W229–231 в app/site-data.ts.
*/

const title = "Аварийная инструкция для крана: что в неё входит";
const description =
  "П. 253 ФНП № 461 называет десять сведений аварийной инструкции, п. 252 — вручение под подпись. Что в ней должно быть и что спросить до подачи крана.";
const h1 = "Что должно быть в аварийной инструкции для крановщика и стропальщика?";
const canonical = "/obekty/avariynaya-instruktsiya-krana-chto-v-nee-vhodit/";
const published = "2026-10-29";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "norma", label: "Что требуют п. 252 и 253" },
  { id: "kran-ili-ploshchadka", label: "Что к крану, что к площадке" },
  { id: "kto", label: "Кто выдаёт инструкцию" },
  { id: "proverka", label: "Что проверить до подачи" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько сведений должна содержать аварийная инструкция по ФНП?",
    a: "Десять: подпункты «а»–«к» п. 253 ФНП № 461 — от оперативных действий при аварии до порядка оповещения работников.",
  },
  {
    q: "Кому вручают аварийную инструкцию?",
    a: "Работникам эксплуатирующей организации, занятым эксплуатацией ПС, под подпись (п. 252 ФНП № 461).",
  },
  {
    q: "Входит ли в инструкцию эвакуация оператора из кабины?",
    a: "Да. Подпункт «д» п. 253 требует указать порядок приведения ПС в безопасное положение в нерабочем состоянии и схему эвакуации оператора, покидающего кабину.",
  },
  {
    q: "Нужно ли указывать места аптечек?",
    a: "Да. Подпункт «з» п. 253 требует указать места расположения медицинских аптечек первой помощи.",
  },
  {
    q: "Кто на площадке отвечает за схемы эвакуации?",
    a: "ФНП возлагает инструкцию на эксплуатирующую организацию. Распределение между заказчиком и арендодателем при аренде с оператором закрепляется договором; это вывод KRANNEVA, не норма.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Аварийная инструкция для крана: что в неё входит", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге со сверкой аварийной инструкции и схемы эвакуации оператора",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Аварийная инструкция для крана: что в неё входит</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · аварийные ситуации</span>
          <h1>{h1}</h1>
          <p>
            Пункт 253 ФНП № 461 перечисляет десять сведений (подпункты «а»–«к»), которые обязана содержать аварийная инструкция, а п. 252 требует доводить её до работников под подпись. Для SANY STC400T и Kato NK-250E-V KRANNEVA перед подачей сверяет с заказчиком те подпункты, что привязаны к площадке: схему эвакуации, места аптечек, порядок оповещения.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W229} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Сведения аварийной инструкции для работников, занятых эксплуатацией ПС (ФНП № 461, п. 253)</caption>
            <thead>
              <tr>
                <th scope="col">Подпункт</th><th scope="col">Что должно быть указано</th><th scope="col">К чему привязано (вывод KRANNEVA)</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">«а»</th><td>оперативные действия по предотвращению и локализации аварий</td><td>кран и площадка</td></tr>
              <tr><th scope="row">«б»</th><td>способы и методы ликвидации аварий</td><td>кран и площадка</td></tr>
              <tr><th scope="row">«в»</th><td>схемы эвакуации при взрыве, пожаре, выбросе токсичных веществ в помещении или на площадке, обслуживаемой ПС</td><td>площадка</td></tr>
              <tr><th scope="row">«г»</th><td>порядок использования системы пожаротушения при локальных возгораниях оборудования ОПО</td><td>площадка</td></tr>
              <tr><th scope="row">«д»</th><td>приведение ПС в безопасное положение в нерабочем состоянии; схема и порядок эвакуации оператора из кабины</td><td>кран</td></tr>
              <tr><th scope="row">«е»</th><td>места, отведённые в ОПО для нахождения ПС в нерабочем состоянии</td><td>площадка</td></tr>
              <tr><th scope="row">«ж»</th><td>места отключения вводов электропитания ПС</td><td>площадка</td></tr>
              <tr><th scope="row">«з»</th><td>места расположения медицинских аптечек первой помощи</td><td>площадка</td></tr>
              <tr><th scope="row">«и»</th><td>методы первой помощи при поражении током, ожогах, отравлении продуктами горения</td><td>персонал</td></tr>
              <tr><th scope="row">«к»</th><td>порядок оповещения работников ОПО об авариях и инцидентах</td><td>площадка</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: аварийная инструкция при подаче автокрана KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>лист ознакомления оператора с инструкцией, схема эвакуации и места аптечек на площадке заказчика</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="norma">Что требуют п. 252 и 253</h2>
        <p>
          ФНП № 461 обязывает организацию, эксплуатирующую опасный производственный объект с подъёмными сооружениями, разработать инструкции по действиям в аварийных ситуациях и довести их до работников под подпись (п. 252). Пункт 253 добавляет к специфике объекта десять обязательных сведений для занятых эксплуатацией ПС. KRANNEVA воспроизводит их в таблице выше без сокращения смысла.
        </p>

        <h2 id="kran-ili-ploshchadka">Кран и площадка в п. 253: что к чему относится</h2>
        <p>
          Подпункт «д» целиком относится к машине: безопасное положение в нерабочем состоянии и путь оператора из кабины. Для Kato NK-250E-V и SANY STC400T эти сведения берутся из руководства по эксплуатации конкретной модели. Подпункты «в», «г», «з» и «к» зависят от объекта заказчика: схемы эвакуации, пожаротушение, аптечки и оповещение у каждой площадки свои. Деление на «кран» и «площадку» — вывод KRANNEVA из формулировок; норма такой классификации не вводит.
        </p>
        <p>
          Подпункт «ж» о вводах электропитания KRANNEVA читает как относящийся к площадке: автокран приводится двигателем шасси, а вводы питания на объекте могут относиться к соседнему оборудованию. Применимость подпункта к самоходной машине в тексте ФНП не уточняется, поэтому вопрос лучше снять до подачи, а не на площадке.
        </p>

        <h2 id="kto">Кто выдаёт инструкцию при аренде с оператором</h2>
        <p>
          Адресатом обязанности из п. 252 названа эксплуатирующая организация. При аренде автокрана с оператором распределение ролей закрепляется договором: порядок разобран на странице <Link href="/obekty/pismennyy-dogovor-i-prodlenie-arendy-krana/">про письменный договор аренды</Link>. Оператор KRANNEVA получает инструкцию под подпись, а схемы эвакуации и места аптечек на объекте заказчик передаёт со своей стороны — это практика компании, а не требование пункта.
        </p>

        <h2 id="proverka">Что проверить до подачи крана</h2>
        <p>
          До выезда KRANNEVA просит у заказчика три документа: схему эвакуации с площадки, перечень мест аптечек и порядок оповещения. Параллельно оператор проходит инструктаж по знаковой сигнализации участка по п. 249, подробности — на странице <Link href="/obekty/smena-uchastka-i-instruktazh-po-znakam/">про смену участка и инструктаж</Link>. Отсутствие любого сведения из п. 253 заказчик может закрыть заранее; на площадке это превращается в простой, который в ставку не входит.
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
        date={FACT_CHECK_W229}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 252–253 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает п. 252–253 ФНП № 461. Деление сведений на «кран» и «площадку», трактовка подпункта «ж» для самоходной машины и перечень запрашиваемых у заказчика документов — вывод и практика KRANNEVA, а не норма. Региональные данные по Петербургу не приводятся: свежий проверенный источник не найден."
      />
    </main>
  );
}
