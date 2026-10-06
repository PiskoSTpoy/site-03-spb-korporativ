import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W182, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 182. Шестьдесят первый тип — объект, где кран встал посреди смены.
  Угол практический: кто чинит, кто даёт принадлежности, что записать про
  замену и простой. Фактура — в комментарии к FACT_CHECK_W182 в
  app/site-data.ts. Сроков замены машины нормативы не содержат; есть ли
  резервная машина у KRANNEVA, в публичных условиях не указано.
*/

const title = "Поломка крана на объекте: кто чинит (ст. 634 ГК РФ)";
const description =
  "Ремонт и принадлежности крана — обязанность арендодателя весь срок договора (ст. 634 ГК РФ). Что записать в договор с KRANNEVA про замену и простой.";
const h1 = "Что делать, если арендованный кран сломался на объекте?";
const canonical = "/obekty/polomka-krana-na-obekte/";
const published = "2026-10-06";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "obyazannost", label: "Чья обязанность — ремонт крана" },
  { id: "prinadlezhnosti", label: "Что входит в принадлежности" },
  { id: "granitsa", label: "Где граница с ответственностью заказчика" },
  { id: "zamena", label: "Что записать про замену и простой" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто обязан чинить арендованный кран при поломке?",
    a: "Арендодатель. Статья 634 ГК РФ обязывает его в течение всего срока договора аренды с экипажем поддерживать надлежащее состояние транспортного средства, включая текущий и капитальный ремонт.",
  },
  {
    q: "Платит ли заказчик за ремонт крана?",
    a: "Статья 634 ГК РФ относит ремонт к обязанностям арендодателя. Заказчик отвечает только за повреждения, причина которых — обстоятельства на его стороне, и только если арендодатель это докажет (статья 639).",
  },
  {
    q: "Кто предоставляет стропы, траверсы и другие принадлежности?",
    a: "Статья 634 ГК РФ называет предоставление необходимых принадлежностей обязанностью арендодателя. Какие именно принадлежности нужны для вашего груза, стороны уточняют в заявке и записывают в договор.",
  },
  {
    q: "Есть ли у KRANNEVA резервная машина на замену?",
    a: "В публичных условиях KRANNEVA сведений о резервной машине и сроке замены нет, поэтому страница их не называет. Вопрос задают в заявке, а ответ записывают в договор до подтверждения даты.",
  },
  {
    q: "Оплачивается ли простой, если кран сломался?",
    a: "Нормативы не называют единого правила, а публичные условия KRANNEVA не описывают простой по вине арендодателя. Порядок учёта часов записывается в договор, чтобы смена не считалась отработанной за время ремонта.",
  },
  {
    q: "Сколько стоит смена крана?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Поломка крана на объекте", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: поломка и замена машины",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Поломка крана на объекте</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · поломка крана</span>
          <h1>{h1}</h1>
          <p>
            Статья 634 ГК РФ возлагает на арендодателя текущий и капитальный ремонт крана и
            предоставление необходимых принадлежностей весь срок договора. Поэтому поломка SANY
            STC400T или XCMG QY60K на площадке KRANNEVA — забота арендодателя, а заказчику остаётся
            записать в договор порядок замены машины и учёт часов простоя.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W182} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Кто за что отвечает при поломке арендованного крана (ГК РФ)</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Кто отвечает по закону</th>
                <th scope="col">Статья</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Текущий и капитальный ремонт</th><td>арендодатель весь срок договора</td><td>634</td></tr>
              <tr><th scope="row">Необходимые принадлежности</th><td>арендодатель</td><td>634</td></tr>
              <tr><th scope="row">Нормальная и безопасная эксплуатация</th><td>услуги экипажа арендодателя</td><td>635, ч. 1</td></tr>
              <tr><th scope="row">Повреждение по обстоятельствам арендатора</th><td>арендатор, если арендодатель докажет причину</td><td>639</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что публично известно об условиях KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Резервная машина и срок замены</th><td>в публичных условиях не указаны — уточняются в заявке</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="obyazannost">Чья обязанность — ремонт крана</h2>
        <p>
          Статья 634 ГК РФ обязывает арендодателя поддерживать транспортное средство в надлежащем
          состоянии в течение всего срока договора аренды с экипажем. Ремонт стрелы или
          гидравлики SANY STC400T, включая капитальный, KRANNEVA как арендодатель выполняет
          сам, а не перекладывает на заказчика.
        </p>
        <p>
          Часть 1 статьи 635 дополняет это требованием, чтобы услуги по управлению и технической
          эксплуатации обеспечивали нормальную и безопасную эксплуатацию крана. Содержание
          услуг экипажа XCMG QY60K, включая реакцию на неисправность, поэтому относится к зоне
          арендодателя, а заказчик KRANNEVA не отвечает за состояние машины сам по себе.
        </p>

        <h2 id="prinadlezhnosti">Что входит в принадлежности</h2>
        <p>
          Статья 634 называет предоставление необходимых принадлежностей отдельной обязанностью
          арендодателя. Какие принадлежности нужны для подъёма — стропы, траверса, гусек, —
          зависит от груза, и перечень KRANNEVA согласовывает с заказчиком в заявке до выезда.
        </p>
        <p>
          Порядок подъёма груза, при котором схема строповки и масса определяют набор принадлежностей,
          разбирает страница{" "}
          <Link href="/obekty/poryadok-podema-gruza/">порядка подъёма груза</Link>.
        </p>

        <h2 id="granitsa">Где граница с ответственностью заказчика</h2>
        <p>
          По статье 639 ГК РФ арендатор возмещает убытки от повреждения крана, если арендодатель
          докажет, что причина — обстоятельства, за которые арендатор отвечает по закону или
          договору. Просевшая площадка под опорами XCMG QY60K, подготовленная заказчиком,
          попадает в эту зону; износ узла по возрасту машины KRANNEVA — нет.
        </p>
        <p>
          Поэтому в договоре стоит описать, чья подготовка опорных поверхностей, а чья — состояние
          машины. Грунты и подготовка опор разобраны на странице{" "}
          <Link href="/obekty/slabye-grunty-i-torfyaniki/">слабых грунтов</Link>.
        </p>

        <h2 id="zamena">Что записать про замену и простой</h2>
        <p>
          Нормативы не называют срока замены сломавшегося крана и не описывают оплату простоя,
          поэтому оба условия KRANNEVA и заказчик записывают в договор. Практичный минимум:
          кто и в какой срок сообщает о поломке, подаётся ли замена, как считаются часы
          неработающей машины в минимальной смене.
        </p>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
          Включает ли смена часы простоя из-за поломки, публичные условия не указывают.
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
        date={FACT_CHECK_W182}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/428a78243bb52ef55af005802577d8692fa49a2d/", label: "КонсультантПлюс — ГК РФ, статья 634 «Обязанность арендодателя по содержанию транспортного средства»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/6423a1ffa8466b327fed0ae3dcb20552e66308fe/", label: "КонсультантПлюс — ГК РФ, статья 635 «Обязанности арендодателя по управлению и технической эксплуатации транспортного средства»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/4c100ed908bc4c8e6e197fb1cfe16dbc6a48edd9/", label: "КонсультантПлюс — ГК РФ, статья 639 «Ответственность за вред, причиненный транспортному средству»" },
        ]}
        note="Страница пересказывает общие правила статей 634, 635 и 639 ГК РФ и не заменяет договор. Срок замены крана, наличие резервной машины и порядок оплаты простоя нормативами не установлены и в публичных условиях KRANNEVA не указаны — страница их не называет."
      />
    </main>
  );
}
