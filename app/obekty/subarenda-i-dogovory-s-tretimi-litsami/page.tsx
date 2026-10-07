import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W184, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 184. Шестьдесят третий тип — объект, где арендованный кран нужен
  не только заказчику, но и его субподрядчикам. Угол коммерческий/
  сравнительный: ст. 638 ГК РФ. Фактура — в комментарии к FACT_CHECK_W184
  в app/site-data.ts. Что договор KRANNEVA запрещает субаренду, нигде не
  сказано; что разрешает — тоже; страница этого не утверждает.
*/

const title = "Субаренда крана с экипажем: что разрешает ст. 638 ГК РФ";
const description =
  "Без запрета в договоре арендатор вправе сдать кран с экипажем в субаренду без согласия арендодателя (ст. 638 ГК РФ). Что записать в договор с KRANNEVA.";
const h1 = "Можно ли сдать арендованный кран в субаренду субподрядчику?";
const canonical = "/obekty/subarenda-i-dogovory-s-tretimi-litsami/";
const published = "2026-10-07";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "pravilo", label: "Что говорит статья 638" },
  { id: "subarenda", label: "Когда субаренда возможна без согласия" },
  { id: "dogovory", label: "Какие договоры арендатор заключает сам" },
  { id: "zapret", label: "Как запретить или разрешить в договоре" },
  { id: "subpodryad", label: "Почему субаренда редко решает вопрос субподрядчика" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Нужно ли согласие арендодателя на субаренду крана?",
    a: "Нет, если договором не предусмотрено иное. Часть 1 статьи 638 ГК РФ даёт арендатору право сдавать транспортное средство в субаренду без согласия арендодателя, когда договор аренды с экипажем этого не запрещает.",
  },
  {
    q: "Может ли договор запретить субаренду?",
    a: "Да. Оговорка «если договором не предусмотрено иное» в части 1 статьи 638 ГК РФ позволяет сторонам запретить субаренду или поставить её в зависимость от согласия арендодателя.",
  },
  {
    q: "Какие договоры арендатор вправе заключать с третьими лицами?",
    a: "Часть 2 статьи 638 ГК РФ разрешает без согласия арендодателя и от своего имени заключать договоры перевозки и иные договоры, если они не противоречат целям использования транспортного средства из договора аренды или его назначению.",
  },
  {
    q: "Разрешает ли договор KRANNEVA субаренду?",
    a: "В публичных условиях KRANNEVA запрета или разрешения субаренды нет, поэтому страница не утверждает ни того, ни другого. Вопрос задают в заявке, а ответ записывают в договор.",
  },
  {
    q: "Кто отвечает за кран, если им пользуется субарендатор?",
    a: "Страница на этот вопрос не отвечает: статья 638 ГК РФ ответственность не распределяет. Ответственность перед арендодателем и третьими лицами разбирает страница об ответственности и страховании при аренде крана.",
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
    { "@type": "ListItem", position: 3, name: "Субаренда и договоры с третьими лицами", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: субаренда и договоры с третьими лицами",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Субаренда и договоры с третьими лицами</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · субаренда крана</span>
          <h1>{h1}</h1>
          <p>
            Часть 1 статьи 638 ГК РФ разрешает арендатору транспортного средства с экипажем
            сдавать его в субаренду без согласия арендодателя, если договор не говорит иного.
            Поэтому заказчику SANY STC400T или XCMG QY60K от KRANNEVA важно заранее решить, нужна
            ли ему эта свобода, и записать запрет или разрешение в договор.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W184} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что статья 638 ГК РФ позволяет арендатору крана с экипажем</caption>
            <thead>
              <tr>
                <th scope="col">Действие</th>
                <th scope="col">Нужно ли согласие арендодателя</th>
                <th scope="col">Часть статьи</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Сдать кран в субаренду</th><td>нет, если договор не предусматривает иного</td><td>1</td></tr>
              <tr><th scope="row">Заключить договор перевозки или иной договор от своего имени</th><td>нет, если он не противоречит целям использования или назначению машины</td><td>2</td></tr>
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
              <tr><th scope="row">Запрет или разрешение субаренды</th><td>в публичных условиях не указано — уточняется в заявке</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="pravilo">Что говорит статья 638</h2>
        <p>
          Статья 638 ГК РФ состоит из двух частей и входит в параграф об аренде транспортных
          средств с экипажем. Обе части начинаются с правила «без согласия арендодателя», поэтому
          арендатор KRANNEVA по умолчанию свободнее, чем арендатор по общим нормам об аренде.
        </p>

        <h2 id="subarenda">Когда субаренда возможна без согласия</h2>
        <p>
          Часть 1 статьи 638 допускает субаренду без согласия арендодателя, если договором аренды
          с экипажем не предусмотрено иное. Экипаж XCMG QY60K при этом остаётся экипажем
          арендодателя, а статья 635 ГК РФ возлагает управление машиной именно на него.
        </p>
        <p>
          KRANNEVA описывает распределение топлива, сборов и экипажа на странице{" "}
          <Link href="/obekty/toplivo-i-ekipazh-v-stavke/">топлива и экипажа в ставке</Link>.
        </p>

        <h2 id="dogovory">Какие договоры арендатор заключает сам</h2>
        <p>
          Часть 2 статьи 638 разрешает арендатору от своего имени заключать договоры перевозки
          и иные договоры в рамках коммерческой эксплуатации машины. Граница одна: договор не
          должен противоречить целям использования, названным в договоре аренды, а если целей нет —
          назначению крана. Для SANY STC400T назначение — подъём и перемещение грузов, и договор с третьим лицом
          должен укладываться в него.
        </p>

        <h2 id="zapret">Как запретить или разрешить в договоре</h2>
        <p>
          Часть 1 статьи 638 ГК РФ с оговоркой «если договором не предусмотрено иное» диспозитивна: стороны
          вправе запретить субаренду, разрешить её только с письменного согласия или оставить
          без ограничений. Письменная форма договора с KRANNEVA обязательна, как показывает страница{" "}
          <Link href="/obekty/pismennyy-dogovor-i-prodlenie-arendy-krana/">письменного договора и продления</Link>.
        </p>

        <h2 id="subpodryad">Почему субаренда редко решает вопрос субподрядчика</h2>
        <p>
          Субаренда передаёт кран вместе с экипажем другой организации, а ППР и ответственный за
          безопасное производство работ закреплены за конкретной площадкой. Допуск субарендатора
          на площадку и ознакомление его работников с ППР остаются отдельной задачей, которую
          KRANNEVA разбирает на странице{" "}
          <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">ППР и технологической карты</Link>.
        </p>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
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
        date={FACT_CHECK_W184}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/dffc6d422e324ef03070bebf7b09ab05b7322745/", label: "КонсультантПлюс — ГК РФ, статья 638 «Договоры с третьими лицами об использовании транспортного средства»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/6423a1ffa8466b327fed0ae3dcb20552e66308fe/", label: "КонсультантПлюс — ГК РФ, статья 635 «Обязанности арендодателя по управлению и технической эксплуатации транспортного средства»" },
        ]}
        note="Страница пересказывает общие правила статьи 638 ГК РФ и не заменяет договор. Разрешает ли договор KRANNEVA субаренду и на каких условиях, в публичных условиях не указано — страница этого не утверждает. Допуск субарендатора на площадку нормативами статьи 638 не регулируется."
      />
    </main>
  );
}
