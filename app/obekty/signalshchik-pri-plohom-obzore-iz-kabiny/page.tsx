import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W195, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 195. Семьдесят четвёртый тип объекта — зона работ не просматривается из
  кабины: сигнальщик или радиосвязь (п. 153 ФНП № 461; п. 123 — граница для
  башенных кранов выше 36 м). Угол — плотная петербургская застройка. Чисел,
  которых нет в тексте пунктов, на странице нет. Фактура — в комментарии к
  FACT_CHECK_W195 в app/site-data.ts.
*/

const title = "Сигнальщик при плохом обзоре из кабины: п. 153 ФНП № 461";
const description =
  "ФНП № 461 (п. 153): если зона работ не видна из кабины и нет радио- или телефонной связи со стропальщиком, ИТР назначает сигнальщика из числа стропальщиков.";
const h1 = "Что делать, если крановщик не видит зону работ: сигнальщик или связь по п. 153?";
const canonical = "/obekty/signalshchik-pri-plohom-obzore-iz-kabiny/";
const published = "2026-10-12";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "uslovie", label: "Когда пункт 153 включается" },
  { id: "dva-puti", label: "Два способа: связь или сигнальщик" },
  { id: "kto-naznachaet", label: "Кто назначает сигнальщика" },
  { id: "plotnaya-zastroyka", label: "Плотная застройка Петербурга: где обзор пропадает" },
  { id: "granitsa-p123", label: "Граница: башенные краны выше 36 м" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Когда на площадке нужен сигнальщик?",
    a: "Когда зона, обслуживаемая краном, не просматривается из кабины полностью и между крановщиком и стропальщиком нет радио- или телефонной связи (п. 153 ФНП № 461). Если связь есть, сигнальщик из этого пункта не требуется.",
  },
  {
    q: "Кто может быть сигнальщиком?",
    a: "Работник из числа стропальщиков. Назначает его инженерно-технический работник, ответственный за безопасное производство работ с применением ПС (п. 153 ФНП № 461).",
  },
  {
    q: "Заменяет ли радиосвязь сигнальщика?",
    a: "Для стрелового крана — да: пункт 153 ФНП № 461 ставит сигнальщика на случай, когда зона не просматривается и связи нет. Обязательной радио- или телефонной связи без оговорки пункт требует для подъёмников и вышек, если зона не видна с места управления.",
  },
  {
    q: "Применим ли пункт 123 к автокрану?",
    a: "Нет. Пункт 123 ФНП № 461 касается возведения зданий и сооружений высотой более 36 м башенными кранами. Для автокрана на такой стройке действует пункт 153.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Сигнальщик при плохом обзоре из кабины", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: работа без полного обзора зоны из кабины",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Сигнальщик при плохом обзоре из кабины</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · связь и сигналы на площадке</span>
          <h1>{h1}</h1>
          <p>
            Пункт 153 ФНП № 461 ставит одно условие: если зона работ крана не просматривается из кабины полностью и между крановщиком и стропальщиком нет радио- или телефонной связи, инженерно-технический работник назначает сигнальщика из числа стропальщиков. KRANNEVA на площадках с SANY STC400T или XCMG QY60K в плотной застройке Петербурга решает эту задачу до подачи крана, а не после первого неудачного подъёма: связь или сигнальщик записаны в заявке и в ППР.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W195} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что ФНП № 461 требует при плохом обзоре зоны работ</caption>
            <thead>
              <tr>
                <th scope="col">Условие</th>
                <th scope="col">Пункт</th>
                <th scope="col">Что требуется</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Зона не видна из кабины, связи нет</th><td className="dtable__num">153</td><td>сигнальщик из числа стропальщиков; назначает ИТР, ответственный за безопасное производство работ</td></tr>
              <tr><th scope="row">Зона не видна, связь есть</th><td className="dtable__num">153</td><td>сигнальщик из этого пункта не требуется; сигналы идут по радио или телефону</td></tr>
              <tr><th scope="row">Подъёмник (вышка), зона не видна с места управления</th><td className="dtable__num">153</td><td>радио- или телефонная связь с оператором и людьми в люльке</td></tr>
              <tr><th scope="row">Здание выше 36 м, башенный кран</th><td className="dtable__num">123</td><td>двусторонняя радио- или телефонная связь; перечень команд утверждён внутренним актом</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA фиксирует до подачи крана</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что записывают заранее</th><td>способ передачи сигналов, имя сигнальщика, место его стоянки относительно крана</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="uslovie">Когда пункт 153 включается</h2>
        <p>
          Два условия одновременно запускают пункт 153 ФНП № 461 для крана KRANNEVA: зона, обслуживаемая краном, полностью не просматривается из кабины, и между крановщиком и стропальщиком нет радио- или телефонной связи. Одного плохого обзора мало: при исправной связи сигнальщика пункт не требует. Для XCMG QY60K это упрощает выбор — рация в кабине и у стропальщика снимает вопрос, пока она исправна, а потеря связи в смене превращает ситуацию в первый случай, и работу останавливают до назначения сигнальщика.
        </p>

        <h2 id="dva-puti">Два способа: связь или сигнальщик</h2>
        <p>
          Связь и сигнальщик решают одну задачу по-разному, и пункт 153 ФНП № 461 допускает оба — KRANNEVA выбирает способ по площадке. Радио- или телефонная связь передаёт команду крановщику напрямую, без третьего человека в цепочке. Сигнальщик — это стропальщик, которого ИТР назначил подавать сигналы с места, откуда видны и крановщик, и зона, и груз. SANY STC400T в стеснённом месте работает с тем способом, который записан в ППР, и меняется он только решением ответственного ИТР. Общий порядок подъёма груза и обязанности стропальщика у груза описаны на странице <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>.
        </p>

        <h2 id="kto-naznachaet">Кто назначает сигнальщика</h2>
        <p>
          Назначает сигнальщика инженерно-технический работник, ответственный за безопасное производство работ с применением ПС (п. 153 ФНП № 461), и выбирает он его из числа стропальщиков. Отдельного удостоверения «сигнальщика» пункт не вводит: допуск человека к работе у крана складывается из приказа, удостоверения с типом ПС и производственной инструкции под подпись (пп. 147, 151, 152). KRANNEVA просит заказчика назвать в заявке ИТР, ответственного за безопасное производство работ, потому что без него назначить сигнальщика на смене некому. Кто чей стропальщик на площадке — на странице <Link href="/obekty/stropalshchik-zakazchika-ili-arendodatelya/">про стропальщика заказчика или арендодателя</Link>.
        </p>

        <h2 id="plotnaya-zastroyka">Плотная застройка Петербурга: где обзор пропадает</h2>
        <p>
          Обзор из кабины SANY STC400T пропадает там, где зона строповки или приёма груза скрыта корпусом здания, забором стройплощадки, штабелем или самим грузом. Для площадок в плотной застройке центра это обычное положение: кран стоит на проезде, а груз принимают за углом или в глубине двора. KRANNEVA в этом случае проверяет на выезде два вопроса — видит ли крановщик SANY STC400T место приёма с рабочего места и есть ли между ним и стропальщиком связь. Условия работы во дворах с ограниченным подъездом разобраны на странице <Link href="/obekty/dvor-kolodets-istoricheskogo-tsentra/">про двор-колодец исторического центра</Link>, а работа у стены соседнего здания — на странице <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">про площадку вплотную к соседнему зданию</Link>.
        </p>
        <p>
          Отдельная причина потерять обзор — погода: пункт 132 ФНП № 461 останавливает работу, когда снегопад, дождь или туман мешают крановщику различать сигналы стропальщика или груз. Освещение площадки и короткий зимний день разобраны на странице <Link href="/obekty/korotkiy-svetovoy-den-i-osveshchenie-ploshchadki/">про короткий световой день</Link>.
        </p>

        <h2 id="granitsa-p123">Граница: башенные краны выше 36 м</h2>
        <p>
          Пункт 123 ФНП № 461 относится только к возведению зданий выше 36 м башенными кранами. Для них двусторонняя радио- или телефонная связь обязательна, а перечень и обозначение команд утверждает внутренний акт эксплуатирующей организации. Автокран KRANNEVA на той же стройке под пункт 123 не подпадает и работает по пункту 153. Стройку выше 60 м с автокраном разбирает страница <Link href="/obekty/vysotnyy-montazh-vyshe-60-metrov/">про высотный монтаж</Link>.
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
        date={FACT_CHECK_W195}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 123, 132, 147, 151–153 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 123, 153 и ссылается на пункты 132, 147, 151, 152 ФНП № 461 и не заменяет ППР. Таблица знаковой сигнализации, частоты радиосвязи и конкретные места стоянки сигнальщика здесь не приводятся: они определяются ППР и инструкциями для конкретной площадки."
      />
    </main>
  );
}
