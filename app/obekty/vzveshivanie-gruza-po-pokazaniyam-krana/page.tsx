import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W196, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 196. Семьдесят пятый тип объекта — вес груза «по показаниям крана»
  (п. 134 ФНП № 461: ограничители, указатели и регистраторы не используются для
  учёта веса). Связка с п. 114 и 127 (масса неизвестна / нет маркировки веса) и
  п. 22 «г», 251 «д» (кран с неработоспособным ограничителем не работает).
  Чисел, которых нет в тексте пунктов, на странице нет. Фактура — в комментарии
  к FACT_CHECK_W196 в app/site-data.ts.
*/

const title = "Вес груза по показаниям крана: п. 134 ФНП № 461";
const description =
  "ФНП № 461 (п. 134): ограничители, указатели и регистраторы крана не используют для учёта веса груза. Откуда брать массу и что записать в заявке.";
const h1 = "Можно ли взвешивать груз по показаниям крана: что говорит п. 134?";
const canonical = "/obekty/vzveshivanie-gruza-po-pokazaniyam-krana/";
const published = "2026-10-14";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-zapreshchaet", label: "Что именно запрещает пункт 134" },
  { id: "zachem-ogranichitel", label: "Зачем крану ограничитель, если он не весы" },
  { id: "otkuda-massa", label: "Откуда берётся масса груза" },
  { id: "chto-v-zayavke", label: "Что записать в заявке, когда вес важен для расчёта" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли принимать груз по весу, который показал указатель крана?",
    a: "Нет. Пункт 134 ФНП № 461 прямо говорит, что ограничители, указатели и регистраторы не используются для учёта веса грузов (материалов), перемещаемых подъёмным сооружением. Вес для приёмки берут из документов на груз или с весов.",
  },
  {
    q: "Для чего тогда на кране ограничитель и регистратор?",
    a: "Для защиты и контроля работы машины. Эксплуатирующая организация не должна использовать подъёмное сооружение с неработоспособными ограничителями, указателями и регистраторами (п. 22 «г» ФНП № 461), а такой кран не допускают в работу (п. 251 «д»).",
  },
  {
    q: "Что делать, если масса груза неизвестна?",
    a: "Поднимать нельзя: пункт 114 ФНП № 461 запрещает подъём груза, масса которого неизвестна. Массу сначала устанавливают по документам или маркировке, и только потом строповка.",
  },
  {
    q: "Кто руководит работой, если на грузе нет маркировки веса?",
    a: "Инженерно-технический работник, ответственный за безопасное производство работ с применением ПС: пункт 127 ФНП № 461 требует его непосредственного руководства, когда нет маркировки веса груза и схем строповки.",
  },
  {
    q: "Зависит ли ставка KRANNEVA от веса поднятого груза?",
    a: `Нет, ставка почасовая и зависит от класса техники: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Вес груза по показаниям крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подъём груза с документально установленной массой",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Вес груза по показаниям крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · масса груза и приёмка</span>
          <h1>{h1}</h1>
          <p>
            Пункт 134 ФНП № 461 запрещает использовать ограничители, указатели и регистраторы подъёмного сооружения для учёта веса перемещаемых грузов. Для заказчика KRANNEVA это значит одно: цифра на дисплее SANY STC400T или XCMG QY60K не заменяет весы и не годится для акта приёмки материала. Массу груза нужно знать до подъёма — из документов и маркировки, — а пункт 114 запрещает поднимать груз неизвестной массы.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W196} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что ФНП № 461 говорит о весе груза и приборах крана</caption>
            <thead>
              <tr>
                <th scope="col">Ситуация</th>
                <th scope="col">Пункт</th>
                <th scope="col">Что требуется</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Нужен вес груза для учёта</th><td className="dtable__num">134</td><td>показания ограничителей, указателей и регистраторов для этого не используют</td></tr>
              <tr><th scope="row">Масса груза неизвестна</th><td className="dtable__num">114</td><td>подъём запрещён</td></tr>
              <tr><th scope="row">Нет маркировки веса и схем строповки</th><td className="dtable__num">127</td><td>работа под непосредственным руководством ИТР по безопасному производству работ</td></tr>
              <tr><th scope="row">Ограничитель или указатель неисправен</th><td className="dtable__num">22 «г», 251 «д»</td><td>кран не эксплуатируют и в работу не допускают</td></tr>
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
              <tr><th scope="row">Что записывают заранее</th><td>масса самого тяжёлого груза, документ, по которому она установлена, наличие маркировки</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-zapreshchaet">Что именно запрещает пункт 134</h2>
        <p>
          Пункт 134 ФНП № 461 называет три вида приборов — ограничители, указатели и регистраторы — и запрещает использовать их для учёта веса грузов и материалов, которые перемещает подъёмное сооружение. Запрет сформулирован без оговорок о точности: он касается самого назначения прибора, а не качества его калибровки. KRANNEVA поэтому не выставляет вес «по крану» ни в акте, ни в закрывающих документах на смену на SANY STC400T: учётная цифра должна прийти из документа на груз.
        </p>

        <h2 id="zachem-ogranichitel">Зачем крану ограничитель, если он не весы</h2>
        <p>
          Ограничитель на XCMG QY60K нужен для защиты: пункт 22 «г» ФНП № 461 запрещает эксплуатировать подъёмное сооружение с неработоспособными ограничителями, указателями и регистраторами. Пункт 251 «д» идёт дальше и называет неработоспособность указателей, ограничителей рабочих параметров и рабочих движений и регистраторов основанием не допускать кран в работу. Получается два разных вопроса: прибор должен работать для безопасности, но результатом его работы нельзя подменять взвешивание. Исправный прибор — условие допуска крана, а не метод учёта.
        </p>

        <h2 id="otkuda-massa">Откуда берётся масса груза</h2>
        <p>
          ФНП № 461 не перечисляет документы, по которым определяют массу, но задаёт два жёстких ограничителя. Пункт 114 запрещает подъём груза неизвестной массы, а пункт 127 при отсутствии маркировки веса и схем строповки передаёт работу под непосредственное руководство инженерно-технического работника, ответственного за безопасное производство работ. Схемы строповки и перечень применяемых приспособлений входят в ППР и технологические карты (п. 217 «б»). Для KRANNEVA это порядок действий: масса груза установлена до выезда SANY STC400T, а если её нельзя установить, подъём не начинается. Сам порядок подъёма описан на странице <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>, а состав ППР — на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">про ППР и технологическую карту</Link>.
        </p>

        <h2 id="chto-v-zayavke">Что записать в заявке, когда вес важен для расчёта</h2>
        <p>
          Если заказчику нужен вес поднятого груза для расчётов с поставщиком, KRANNEVA советует получить его из товарно-сопроводительных документов или с весов, а в заявке на XCMG QY60K указать массу самого тяжёлого места и источник цифры. Ставка KRANNEVA почасовая и от поднятых тонн не зависит, поэтому для оплаты смены взвешивание не требуется. Заказчику вес нужен для другого: чтобы выбрать класс техники по грузоподъёмности на нужном вылете и чтобы подтвердить, что подъём не начинается с неизвестной массой. Разгрузку автомашины с документами на груз разбирает страница <Link href="/obekty/razgruzka-avtomashiny-kranom/">про разгрузку автомашины краном</Link>.
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
        date={FACT_CHECK_W196}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 22, 114, 127, 134, 217, 251 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 114, 127 и 134 ФНП № 461 и ссылается на пункты 22, 217, 251. Точность показаний конкретного ограничителя, перечень документов, по которым устанавливают массу, и порядок взвешивания на весах здесь не приводятся: ФНП их не задаёт, а они зависят от груза и договора поставки."
      />
    </main>
  );
}
