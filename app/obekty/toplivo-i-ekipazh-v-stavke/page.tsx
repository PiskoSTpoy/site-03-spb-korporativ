import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W178, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 178. Пятьдесят седьмой тип — объект, где заказчик сравнивает ставки
  разных арендодателей. Угол коммерческий / сравнительный: что входит в ставку
  аренды с экипажем по умолчанию по ГК РФ и что сверять в договоре.

  Фактура — в комментарии к FACT_CHECK_W178 в app/site-data.ts. Что именно
  входит в ставку KRANNEVA сверх публичных условий (топливо, сборы), в
  публичных условиях не прописано — страница этого не выдумывает и
  отсылает к договору.
*/

const title = "Кто платит за экипаж и топливо при аренде крана (ГК РФ)";
const description =
  "Экипаж по умолчанию оплачивает арендодатель, топливо — арендатор (ст. 635–636 ГК РФ). Что сверить в договоре аренды крана KRANNEVA.";
const h1 = "Кто платит за экипаж и топливо при аренде крана с оператором?";
const canonical = "/obekty/toplivo-i-ekipazh-v-stavke/";
const published = "2026-10-05";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "ekipazh", label: "Кто платит за экипаж по умолчанию" },
  { id: "toplivo", label: "Кто платит за топливо по умолчанию" },
  { id: "podchinenie", label: "Кому подчиняется оператор на площадке" },
  { id: "sravnenie", label: "Как сравнивать ставки разных арендодателей" },
  { id: "raschet", label: "Что публично известно о ставке KRANNEVA" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто по закону платит оператору крана при аренде с экипажем?",
    a: "Арендодатель. По части 2 статьи 635 ГК РФ члены экипажа — работники арендодателя, и, если договор не предусматривает иное, расходы на оплату их услуг и на их содержание несёт арендодатель.",
  },
  {
    q: "Кто платит за дизельное топливо?",
    a: "По статье 636 ГК РФ — арендатор, если иное не предусмотрено договором: топливо, другие расходуемые материалы и сборы названы в статье прямо. Поэтому до подписания договора важно прочитать, не переложено ли топливо в ставку или не оговорено ли отдельно.",
  },
  {
    q: "Включено ли топливо в ставку KRANNEVA?",
    a: "В публичных условиях KRANNEVA строки о топливе нет, поэтому страница не утверждает ни «включено», ни «не включено». Условие фиксируется в договоре до подтверждения даты, и заказчик может задать этот вопрос в заявке.",
  },
  {
    q: "Кому оператор подчиняется на площадке?",
    a: "По части 2 статьи 635 ГК РФ — арендодателю по вопросам управления и технической эксплуатации и арендатору по вопросам коммерческой эксплуатации машины. Граница между двумя группами вопросов определяется договором и практикой.",
  },
  {
    q: "Можно ли в договоре распределить эти расходы по-другому?",
    a: "Да. Обе статьи начинаются с оговорки о том, что договор может предусматривать иное, поэтому стороны вправе записать, что топливо оплачивает арендодатель или что оператора оплачивает заказчик отдельной строкой.",
  },
  {
    q: "Сколько стоит смена крана без учёта топлива?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Расходы на топливо и сборы в эти суммы входят или не входят по условиям договора, а не по публичному прайсу.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Топливо и экипаж в ставке", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: экипаж и топливо в договоре",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Топливо и экипаж в ставке</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · топливо и экипаж</span>
          <h1>{h1}</h1>
          <p>
            Статья 635 ГК РФ возлагает оплату экипажа на арендодателя, а статья 636 — оплату
            топлива, расходуемых материалов и сборов на арендатора, и обе оговаривают, что
            договор вправе распределить эти расходы иначе. Поэтому при сравнении ставок крана
            заказчик KRANNEVA смотрит не на цифру в час, а на строки договора о топливе и сборах.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W178} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Кто платит по умолчанию при аренде с экипажем (ГК РФ)</caption>
            <thead>
              <tr>
                <th scope="col">Расход</th>
                <th scope="col">Кто несёт по умолчанию</th>
                <th scope="col">Статья</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Оплата услуг экипажа и его содержание</th><td>арендодатель, если договор не предусматривает иное</td><td>635, ч. 2</td></tr>
              <tr><th scope="row">Топливо и другие расходуемые материалы</th><td>арендатор, если иное не предусмотрено договором</td><td>636</td></tr>
              <tr><th scope="row">Сборы</th><td>арендатор, если иное не предусмотрено договором</td><td>636</td></tr>
              <tr><th scope="row">Услуги по управлению и технической эксплуатации</th><td>арендодатель: они должны обеспечивать нормальную и безопасную эксплуатацию</td><td>635, ч. 1</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что публично известно о ставке</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Время в пути</th><td>не тарифицируется</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Топливо и сборы</th><td>в публичных условиях не указаны — условие фиксируется в договоре</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="ekipazh">Кто платит за экипаж по умолчанию</h2>
        <p>
          По части 2 статьи 635 ГК РФ члены экипажа — работники арендодателя, и расходы на
          оплату их услуг и на их содержание несёт арендодатель, если договор не говорит иного.
          Оператор SANY STC400T или XCMG QY60K, выезжающий от KRANNEVA, поэтому не оплачивается
          заказчиком отдельно, пока договор этого не предусматривает.
        </p>
        <p>
          Часть 1 статьи 635, из параграфа, по которому строится договор KRANNEVA, добавляет, что услуги по управлению и технической эксплуатации
          должны обеспечивать нормальную и безопасную эксплуатацию машины в соответствии с целями
          аренды, указанными в договоре. Цель — например, «подъём строительных конструкций на
          объекте» — стоит записать в договор конкретно: от неё зависит объём этих услуг.
        </p>

        <h2 id="toplivo">Кто платит за топливо по умолчанию</h2>
        <p>
          Статья 636 ГК РФ относит топливо к арендатору. Она из того же параграфа, что и договор
          KRANNEVA: расходы на коммерческую эксплуатацию, в том числе на топливо, другие
          расходуемые материалы и сборы, несёт арендатор, если договор не предусматривает иное. Для заказчика это
          означает, что строка о топливе в договоре аренды крана — не формальность, а выбор
          между двумя схемами оплаты.
        </p>
        <p>
          В публичных условиях KRANNEVA строки о топливе нет, поэтому страница не называет её ни
          «включённой», ни «отдельной». Заказчик, которому важно знать, спрашивает об этом в
          заявке, и ответ попадает в договор. Структура договора описана на странице{" "}
          <Link href="/documents/">документов</Link>: он строится по параграфу 3 главы 34 ГК РФ.
        </p>

        <h2 id="podchinenie">Кому подчиняется оператор на площадке</h2>
        <p>
          Часть 2 статьи 635 делит распоряжения на две группы: по управлению и технической
          эксплуатации оператор подчиняется арендодателю, по коммерческой эксплуатации —
          арендатору. Практически заказчик определяет, какой груз поднять и куда, а решения о
          том, как безопасно поставить кран и вести подъём, остаются за стороной
          арендодателя.
        </p>
        <p>
          Граница между двумя группами распоряжений важна на площадках с ограничениями KRANNEVA: например, там, где оператор вправе остановить
          подъём по пункту 132 ФНП № 461 — о нём говорит страница{" "}
          <Link href="/obekty/veter-i-gololed/">ветра и гололёда</Link>.
        </p>

        <h2 id="sravnenie">Как сравнивать ставки разных арендодателей</h2>
        <p>
          Две ставки крана в рублях за час, например {rub(light.rate)} и {rub(mid.rate)} у KRANNEVA, сопоставимы только тогда, когда у обеих одинаково решены
          топливо, сборы, подача и время в пути. Сводная таблица условий KRANNEVA публикует
          минимальную смену в {MIN_SHIFT_HOURS} часов и время в пути вне тарификации, но топливо в ней не
          упомянуто. Поэтому сравнивают не ставку, а итог смены по договору.
        </p>
        <p>
          Пример арифметики: смена SANY STC400T при минимальных {MIN_SHIFT_HOURS} часах по прайсу —{" "}
          {rub(shiftTotal(light.rate))}. Если у другого арендодателя ставка ниже, а топливо оплачивает
          заказчик отдельно, итог смены зависит от расхода топлива, которого публичный прайс не
          называет.
        </p>

        <h2 id="raschet">Что публично известно о ставке KRANNEVA</h2>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))}, класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))} без НДС. Всё остальное — топливо, сборы, особые условия
          площадки — фиксируется договором до подтверждения даты выезда.
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
        date={FACT_CHECK_W178}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/6423a1ffa8466b327fed0ae3dcb20552e66308fe/", label: "КонсультантПлюс — ГК РФ, статья 635 «Обязанности арендодателя по управлению и технической эксплуатации транспортного средства»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/e2f613ee9ba1e4c2834c9877d64a4e724efa7e57/", label: "КонсультантПлюс — ГК РФ, статья 636 «Обязанность арендатора по оплате расходов, связанных с коммерческой эксплуатацией транспортного средства»" },
        ]}
        note="Страница пересказывает общие правила статей 635 и 636 ГК РФ, действующие при отсутствии иного условия в договоре, и не заменяет договор. Включено ли топливо в ставку KRANNEVA, в публичных условиях не указано — страница этого не утверждает. Применимость параграфа 3 главы 34 ГК РФ к конкретной спецтехнике зависит от условий договора."
      />
    </main>
  );
}
