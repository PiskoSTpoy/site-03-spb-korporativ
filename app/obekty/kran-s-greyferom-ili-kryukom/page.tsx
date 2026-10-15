import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W200, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 200. Семьдесят девятый тип объекта — выбор между краном с грейфером
  (электромагнитом) и крюковым краном со стропальщиком (ФНП № 461, п. 130,
  159 «к», 216). Грейфер в комплектации машин парка на сайте не заявлен —
  страница сравнивает режимы, а не продаёт грейфер.
  Фактура — в комментарии к FACT_CHECK_W199–201 в app/site-data.ts.
*/

const title = "Кран с грейфером или с крюком: что требует ФНП, п. 130";
const description =
  "ФНП № 461 (п. 130): при работе крана с грейфером людям нельзя находиться в зоне перемещения груза, место ограждают. Крюк требует стропальщика у груза.";
const h1 = "Что выбрать для сыпучего груза — кран с грейфером или с крюком и стропальщиком?";
const canonical = "/obekty/kran-s-greyferom-ili-kryukom/";
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
  { id: "chto-govorit-p130", label: "Что говорит пункт 130" },
  { id: "kryuk-i-stropalshchik", label: "Чем режим крюка отличается от грейфера" },
  { id: "chto-v-ppr", label: "Что записывают в ППР" },
  { id: "kak-vybrat", label: "Как выбрать режим для объекта" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли находиться рядом, когда кран работает грейфером?",
    a: "Нет. Пункт 130 ФНП № 461 запрещает нахождение людей и любые работы в зоне перемещения грузов краном с грейфером или электромагнитом. Персонал допускают только в перерыв, когда грейфер опущен на землю. KRANNEVA учитывает это при планировке площадки.",
  },
  {
    q: "Нужно ли ограждать место работы крана с грейфером?",
    a: "Да. По пункту 130 места работы кранов с грейфером или электромагнитом ограждают и обозначают предупредительными знаками. На стеснённой площадке KRANNEVA сначала проверяет, где поместится такое ограждение.",
  },
  {
    q: "Где описан порядок работы крана с грейфером?",
    a: "В руководстве по эксплуатации крана и самого грейфера либо в ППР эксплуатирующей или специализированной организации (п. 130). Пункт 159 «к» отдельно включает порядок работы кранов с грейфером или магнитом в раздел ППР и ТК.",
  },
  {
    q: "Есть ли грейфер у автокранов KRANNEVA?",
    a: "В перечне машин парка KRANNEVA на сайте грейфер не заявлен: SANY STC400T и XCMG QY60K работают крюком со стропальщиком. Сыпучий груз в этом режиме поднимают в таре, требования к таре входят в ППР по пункту 159 «и».",
  },
  {
    q: "Сколько стоит смена крюкового автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Тара и стропы для груза согласуются в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Кран с грейфером или с крюком", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда крюкового автокрана с оператором для подъёма груза в таре",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Кран с грейфером или с крюком</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · грейфер и крюк</span>
          <h1>{h1}</h1>
          <p>
            Пункт 130 ФНП № 461 запрещает людям находиться в зоне перемещения груза краном с грейфером или электромагнитом, а место работы требует ограждения и знаков. Крюковой кран, наоборот, работает со стропальщиком у груза. Выбор режима определяет планировку площадки сильнее, чем грузоподъёмность. В парке KRANNEVA на сайте заявлены крюковые автокраны SANY STC400T и XCMG QY60K, поэтому сыпучий груз они поднимают в таре.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W200} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грейфер или крюк: чем различаются требования ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Грейфер, электромагнит</th>
                <th scope="col">Крюк со стропальщиком</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Люди у груза</th><td>запрещены (п. 130)</td><td>стропальщик (п. 216)</td></tr>
              <tr><th scope="row">Допуск персонала</th><td>в перерыв, грейфер на земле</td><td>по сигналам, п. 248</td></tr>
              <tr><th scope="row">Ограждение места</th><td>обязательно, со знаками</td><td>по опасной зоне ППР</td></tr>
              <tr><th scope="row">Основание порядка</th><td>РЭ или ППР, п. 159 «к»</td><td>ППР, ТК, схемы строповки</td></tr>
              <tr><th scope="row">Сыпучий груз</th><td>зачерпывается напрямую</td><td>в таре, п. 159 «и»</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: крюковой режим KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Что согласуют</th><td>тара, стропы, схема строповки</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-govorit-p130">Что говорит пункт 130</h2>
        <p>
          Пункт 130 ФНП № 461 содержит три требования к кранам с грейфером, электромагнитом или управляемым захватом. Допуск к работе — только по указаниям руководства по эксплуатации крана и грейфера либо по ППР. В зоне перемещения груза не должно быть людей и посторонних работ, а персонал подходит лишь в перерыв, когда грейфер опущен на землю, а с электромагнита снято напряжение. Место работы ограждают и обозначают знаками. KRANNEVA читает этот пункт как требование к площадке, а не только к машине.
        </p>

        <h2 id="kryuk-i-stropalshchik">Чем режим крюка отличается от грейфера</h2>
        <p>
          Крюковой автокран SANY STC400T работает со стропальщиком, который по пункту 216 ФНП № 461 выполняет строповку и находится у груза в момент зацепки. У грейфера такой фигуры нет: зачерпывание идёт без людей, и норма прямо выводит персонал из зоны. Поэтому сравнивать два режима по одной лишь скорости некорректно. KRANNEVA сначала смотрит, можно ли на площадке отделить ограждённую зону без людей; во дворе Петербурга это часто невозможно, и тогда остаётся крюк с тарой.
        </p>

        <h2 id="chto-v-ppr">Что записывают в ППР</h2>
        <p>
          Пункт 159 ФНП № 461 перечисляет состав раздела ППР и ТК о безопасном производстве работ, и в нём два подпункта касаются выбора режима. Подпункт «к» — порядок работы кранов с грейфером или магнитом, подпункт «и» — требования к эксплуатации тары. Для крюкового XCMG QY60K KRANNEVA просит у заказчика именно второй: тип тары, её маркировку и массу брутто. Сам порядок подготовки ППР описан на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">про ППР и технологическую карту</Link>.
        </p>

        <h2 id="kak-vybrat">Как выбрать режим для объекта</h2>
        <p>
          Решающий вопрос для KRANNEVA — есть ли у грузовой операции место, куда в течение всей смены не зайдёт ни один человек. Если такого места нет, грейфер не проходит по пункту 130 независимо от удобства. Если груз штучный или в таре, крюк со стропальщиком решает задачу без отдельного ограждения грейферной зоны. Когда масса груза в таре неизвестна, действует запрет подъёма из пункта 114, о чём подробнее рассказывает страница <Link href="/obekty/vzveshivanie-gruza-po-pokazaniyam-krana/">про вес груза по показаниям крана</Link>.
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
        date={FACT_CHECK_W200}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 114, 130, 159 «и», «к», 216, 248 (редакция от 16.04.2026)" },
        ]}
        note="Страница сравнивает режимы работы по пунктам ФНП № 461. Грейфер в комплектации машин парка KRANNEVA на сайте не заявлен; цены аренды грейфера здесь не приводятся."
      />
    </main>
  );
}
