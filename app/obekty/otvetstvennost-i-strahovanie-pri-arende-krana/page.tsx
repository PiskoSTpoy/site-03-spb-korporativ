import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W181, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 181. Шестидесятый тип — объект, где заказчик спрашивает, кто
  отвечает за ущерб. Угол коммерческий / сравнительный: ответственность и
  страхование при аренде крана с экипажем по ст. 637, 639, 640 ГК РФ.
  Фактура — в комментарии к FACT_CHECK_W181 в app/site-data.ts. Страхование
  опасных производственных объектов — предмет site-01, здесь не излагается;
  есть ли у KRANNEVA конкретный полис, в публичных условиях не указано.
*/

const title = "Кто отвечает за ущерб при аренде крана с экипажем (ГК РФ)";
const description =
  "За вред третьим лицам краном отвечает арендодатель, регресс — при вине арендатора (ст. 637, 639, 640 ГК РФ). Что записать в договор с KRANNEVA.";
const h1 = "Кто отвечает за ущерб и кто страхует кран при аренде с оператором?";
const canonical = "/obekty/otvetstvennost-i-strahovanie-pri-arende-krana/";
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
  { id: "tretim-litsam", label: "Кто отвечает за вред третьим лицам" },
  { id: "strahovanie", label: "Кто страхует кран и ответственность" },
  { id: "povrezhdenie-krana", label: "Кто платит, если кран повреждён" },
  { id: "dogovor", label: "Что сверить в договоре аренды" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто отвечает, если кран повредил соседний автомобиль или здание?",
    a: "По статье 640 ГК РФ вред третьим лицам арендованным краном возмещает арендодатель по правилам главы 59 ГК РФ. После выплаты он вправе предъявить арендатору регрессное требование, но только если докажет, что вред возник по вине арендатора.",
  },
  {
    q: "Кто по закону страхует кран при аренде с экипажем?",
    a: "Статья 637 ГК РФ возлагает на арендодателя обязанность страховать транспортное средство и ответственность за ущерб, если иное не предусмотрено договором. Обязанность возникает, когда такое страхование обязательно в силу закона или договора.",
  },
  {
    q: "Кто платит, если кран повредили на площадке заказчика?",
    a: "Статья 639 ГК РФ обязывает арендатора возместить убытки от гибели или повреждения транспортного средства, если арендодатель докажет, что причина — обстоятельства, за которые арендатор отвечает по закону или договору.",
  },
  {
    q: "Есть ли у KRANNEVA полис, и на какую сумму?",
    a: "В публичных условиях KRANNEVA сведений о полисе и лимитах нет, поэтому страница их не называет. Данные запрашиваются в заявке и записываются в договор до подтверждения даты.",
  },
  {
    q: "Можно ли в договоре распределить ответственность иначе?",
    a: "Статья 637 ГК РФ допускает иное распределение страхования по договору. Ответственность перед третьими лицами по статье 640 такой оговорки не содержит, поэтому договор регулирует прежде всего регресс и страхование.",
  },
  {
    q: "Сколько стоит смена крана?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Стоимость страхования в публичный прайс не вынесена.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Ответственность и страхование при аренде", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: ответственность и страхование",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Ответственность и страхование при аренде</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · ответственность и страхование</span>
          <h1>{h1}</h1>
          <p>
            Статья 640 ГК РФ возлагает вред третьим лицам от арендованного крана на арендодателя,
            а статья 639 — убытки от повреждения самого крана на арендатора, если причина в его
            обстоятельствах. Поэтому заказчик KRANNEVA сверяет в договоре три вещи: кто страхует
            машину, кто отвечает перед соседями площадки и на каких условиях действует регресс.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W181} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Кто отвечает при аренде крана с экипажем (ГК РФ)</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Кто отвечает по закону</th>
                <th scope="col">Статья</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Вред третьим лицам краном</th><td>арендодатель, с правом регресса при доказанной вине арендатора</td><td>640</td></tr>
              <tr><th scope="row">Гибель или повреждение крана</th><td>арендатор — если арендодатель докажет причину на стороне арендатора</td><td>639</td></tr>
              <tr><th scope="row">Страхование крана и ответственности</th><td>арендодатель, если иное не предусмотрено договором и страхование обязательно</td><td>637</td></tr>
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
              <tr><th scope="row">Полис и лимиты</th><td>в публичных условиях не указаны — запрашиваются в заявке</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="tretim-litsam">Кто отвечает за вред третьим лицам</h2>
        <p>
          Статья 640 ГК РФ делает арендодателя ответственным за вред, причинённый третьим лицам
          арендованным транспортным средством, его механизмами, устройствами и оборудованием.
          Вред от стрелы XCMG QY60K соседнему зданию возмещает KRANNEVA как арендодатель,
          а не заказчик, по правилам главы 59 ГК РФ.
        </p>
        <p>
          Арендодатель вправе предъявить заказчику регрессное требование на выплаченные суммы,
          но только если докажет, что вред возник по вине арендатора. Закон не перечисляет
          такие случаи: вина устанавливается по обстоятельствам конкретного события, поэтому
          договор KRANNEVA лучше дополнить описанием зон ответственности сторон на площадке.
        </p>

        <h2 id="strahovanie">Кто страхует кран и ответственность</h2>
        <p>
          Статья 637 ГК РФ возлагает страхование транспортного средства и ответственности
          на арендодателя, если договор не говорит иного, и только когда страхование обязательно
          по закону или договору. Страхование опасных производственных объектов регулирует отдельный
          закон, и страница его не пересказывает.
        </p>
        <p>
          В публичных условиях KRANNEVA сведений о полисе SANY STC400T или лимите ответственности
          нет, поэтому страница не называет ни компанию, ни сумму. Заказчик, для которого это
          условие допуска на площадку, запрашивает копию полиса в заявке.
        </p>

        <h2 id="povrezhdenie-krana">Кто платит, если кран повреждён</h2>
        <p>
          По статье 639 ГК РФ арендатор возмещает убытки от гибели или повреждения крана, но
          бремя доказывания лежит на арендодателе: он должен показать, что причина — обстоятельства,
          за которые арендатор отвечает по закону или договору. Заказчик KRANNEVA, на чьей площадке
          грунт под опорами не выдержал, отвечает, если это зафиксировано в договоре как его зона.
        </p>
        <p>
          Поэтому границу зон стоит описать конкретно: подготовка площадки и опорных поверхностей —
          заказчик, состояние машины и действия оператора — арендодатель. О том, как распределяются
          условия подачи, говорит страница{" "}
          <Link href="/obekty/toplivo-i-ekipazh-v-stavke/">топлива и экипажа в ставке</Link>.
        </p>

        <h2 id="dogovor">Что сверить в договоре аренды</h2>
        <p>
          Договор аренды крана с KRANNEVA стоит проверить по четырём строкам: кто страхует машину
          и ответственность, есть ли ссылка на полис, как записан регресс по статье 640 и чьей
          зоной названа подготовка опор. Договор строится по параграфу 3 главы 34 ГК РФ, как
          описано на странице <Link href="/documents/">документов</Link>.
        </p>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
          Стоимость страхования в эту цифру входит или не входит по условиям договора, а не по публичному прайсу.
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
        date={FACT_CHECK_W181}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/a6cd9a3d1fc4c7dad334b64f5cf7b8ad52031e36/", label: "КонсультантПлюс — ГК РФ, статья 637 «Страхование транспортного средства»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/4c100ed908bc4c8e6e197fb1cfe16dbc6a48edd9/", label: "КонсультантПлюс — ГК РФ, статья 639 «Ответственность за вред, причиненный транспортному средству»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/bb767d578129e775a71c297fef3bffb0a9e8a7c5/", label: "КонсультантПлюс — ГК РФ, статья 640 «Ответственность за вред, причиненный транспортным средством»" },
        ]}
        note="Страница пересказывает общие правила статей 637, 639 и 640 ГК РФ и не заменяет договор и юридическую консультацию. Наличие, компания и лимиты полиса KRANNEVA в публичных условиях не указаны — страница их не утверждает. Обязательное страхование опасных производственных объектов страница не рассматривает."
      />
    </main>
  );
}
