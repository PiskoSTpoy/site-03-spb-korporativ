import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W199, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 199. Семьдесят восьмой тип объекта — инструкция о действиях в аварийных
  ситуациях на площадке с краном (ФНП № 461, п. 252–253). Перечень «а»–«к»
  пересказан своими словами; форма инструкции в ФНП не задана.
  Фактура — в комментарии к FACT_CHECK_W199–201 в app/site-data.ts.
*/

const title = "Аварийная инструкция при работе крана: п. 252–253 ФНП";
const description =
  "ФНП № 461 (п. 252–253): инструкцию о действиях в аварийных ситуациях доводят под подпись, в ней 10 обязательных сведений — от эвакуации до аптечек.";
const h1 = "Что должно быть в инструкции на случай аварии крана на объекте?";
const canonical = "/obekty/avariynaya-instruktsiya-dlya-raboty-krana/";
const published = "2026-10-15";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-trebuet-p252", label: "Что требует пункт 252" },
  { id: "desyat-svedeniy", label: "Десять сведений пункта 253" },
  { id: "chto-kasaetsya-avtokrana", label: "Что из списка важно для автокрана" },
  { id: "chto-soglasovat", label: "Что согласовать до первой смены" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Обязательна ли инструкция о действиях при аварии крана?",
    a: "Да. Пункт 252 ФНП № 461 требует, чтобы организация, эксплуатирующая опасный объект с подъёмными сооружениями, разработала такие инструкции и довела их до работников под подпись. KRANNEVA сверяет её наличие до первой смены.",
  },
  {
    q: "Сколько обязательных разделов у аварийной инструкции?",
    a: "Пункт 253 ФНП № 461 перечисляет десять групп сведений — подпункты «а»–«к»: от действий по локализации аварии до порядка оповещения работников. Специфику конкретного объекта KRANNEVA просит добавить отдельно.",
  },
  {
    q: "Что в аварийной инструкции касается самого крановщика?",
    a: "Подпункт «д» пункта 253: как привести кран в безопасное положение в нерабочем состоянии, а также схема и порядок эвакуации крановщика, покидающего кабину. Для автокранов KRANNEVA этот раздел согласуют с руководством по эксплуатации машины.",
  },
  {
    q: "Кто подписывает аварийную инструкцию на площадке?",
    a: "Работники, до которых её доводят, — под подпись (п. 252). Кто именно эксплуатирующая организация при аренде с экипажем, ФНП не определяет; KRANNEVA фиксирует это в договоре до выезда.",
  },
  {
    q: "Влияет ли подготовка аварийной инструкции на ставку KRANNEVA?",
    a: `Нет, ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Сверка документов проходит до выезда.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Аварийная инструкция для работы крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: сверка инструкции о действиях в аварийных ситуациях до первой смены",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Аварийная инструкция для работы крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · аварийные ситуации</span>
          <h1>{h1}</h1>
          <p>
            Пункт 253 ФНП № 461 называет 10 групп сведений, которые обязана содержать инструкция о действиях в аварийных ситуациях: от локализации аварии до мест аптечек и порядка оповещения. Пункт 252 добавляет, что инструкцию доводят до работников под подпись. Для заказчика KRANNEVA это ещё один документ, который сверяют до первой смены SANY STC400T: без него площадка формально не готова к работе крана.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W199} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Десять сведений аварийной инструкции по пункту 253 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Подпункт</th>
                <th scope="col">О чём раздел</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">«а», «б»</th><td>как предотвратить, локализовать и ликвидировать аварию</td></tr>
              <tr><th scope="row">«в»</th><td>эвакуация при взрыве, пожаре, выбросе</td></tr>
              <tr><th scope="row">«г»</th><td>пожаротушение при локальном возгорании</td></tr>
              <tr><th scope="row">«д»</th><td>безопасное положение крана, эвакуация из кабины</td></tr>
              <tr><th scope="row">«е»</th><td>места стоянки крана в нерабочем состоянии</td></tr>
              <tr><th scope="row">«ж»</th><td>где отключают ввод электропитания</td></tr>
              <tr><th scope="row">«з», «и»</th><td>аптечки и первая помощь</td></tr>
              <tr><th scope="row">«к»</th><td>оповещение об авариях и инцидентах</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA сверяет до первой смены</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что проверяют</th><td>инструкция, лист подписей, место стоянки крана</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-trebuet-p252">Что требует пункт 252</h2>
        <p>
          Пункт 252 ФНП № 461 обязывает организацию, эксплуатирующую опасный производственный объект с подъёмными сооружениями, разработать инструкции о действиях работников в аварийных ситуациях. Вторая половина нормы так же важна: инструкции доводят до работников под подпись. Поэтому KRANNEVA просит у заказчика не только сам документ, но и лист ознакомления, где есть фамилии стропальщиков смены. Кто считается эксплуатирующей организацией при аренде с экипажем, ФНП не определяет, и это записывают в договор.
        </p>

        <h2 id="desyat-svedeniy">Десять сведений пункта 253</h2>
        <p>
          Перечень пункта 253 ФНП № 461 из 10 подпунктов задаёт минимум, а специфику объекта организация добавляет сама. В список входят действия по локализации и ликвидации аварии, схемы эвакуации, порядок пожаротушения, места отключения электропитания, аптечки, первая помощь при ожогах и поражении током, оповещение работников. Таблица выше сводит подпункты в восемь строк, потому что «а» с «б» и «з» с «и» описывают одну задачу. KRANNEVA сверяет наличие каждого раздела, а не его объём: форму и длину инструкции ФНП не задаёт.
        </p>

        <h2 id="chto-kasaetsya-avtokrana">Что из списка важно для автокрана</h2>
        <p>
          Для автокрана XCMG QY60K на городской площадке ключевые подпункты — «д» и «е» пункта 253. Первый требует описать, как привести кран в безопасное положение в нерабочем состоянии и как крановщик покидает кабину при эвакуации. Второй — указать места, отведённые для крана в нерабочем состоянии. Подпункт «ж» про ввод электропитания относится к кранам с внешним питанием и для дизельного автокрана KRANNEVA обычно неприменим — это толкование, а не норма. Как уложить кран на ночь вне площадки, разобрано на странице <Link href="/obekty/nochnaya-stoyanka-krana-vo-dvore/">про ночную стоянку крана во дворе</Link>.
        </p>

        <h2 id="chto-soglasovat">Что согласовать до первой смены</h2>
        <p>
          До подачи SANY STC400T KRANNEVA просит назвать три вещи: где лежит аварийная инструкция, кто из персонала смены расписался в ней и где кран будет стоять в нерабочем состоянии. Если на площадке работают два крана, условия их совместной работы записывают в ППР, как описано на странице <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">про два крана на одной площадке</Link>. При поломке самой машины действует отдельный порядок: он изложен на странице <Link href="/obekty/polomka-krana-na-obekte/">про поломку крана на объекте</Link>. Ставка почасовая и от сверки документов не меняется.
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
        date={FACT_CHECK_W199}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 252–253 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 252–253 ФНП № 461 своими словами. Форму аварийной инструкции ФНП не задаёт; неприменимость подпункта «ж» к дизельному автокрану — толкование KRANNEVA, помечено в тексте."
      />
    </main>
  );
}
