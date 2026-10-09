import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W188, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 188. Шестьдесят седьмой тип объекта — монтаж парусных конструкций (витражи, фермы,
  перегородки, стеновые панели). Угол коммерческий: кто руководит работой и что в ставке.
  Ветровые пороги закреплены за страницей veter-i-gololed, здесь их нет.
  Фактура — в комментарии к FACT_CHECK_W188 в app/site-data.ts.
*/

const title = "Монтаж витражей и панелей краном: работы по п. 163";
const description =
  "Пункт 163 ФНП № 461 относит монтаж витражей, ферм, перегородок и стеновых панелей к работам в местах действия опасных факторов. Что это значит для заказа.";
const h1 = "Кто руководит монтажом витражей и стеновых панелей краном?";
const canonical = "/obekty/montazh-vitrazhey-i-stenovyh-paneley/";
const published = "2026-10-09";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-takoe", label: "Какие работы пункт 163 считает опасными" },
  { id: "ppr", label: "ППР и непосредственное руководство" },
  { id: "primykanie", label: "Монтаж рядом с эксплуатируемым зданием" },
  { id: "veter", label: "Где искать ветровые пороги" },
  { id: "zakazchik", label: "Что подготовить заказчику до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Относится ли монтаж витражей к работам с повышенной опасностью?",
    a: "Пункт 163 ФНП № 461 относит монтаж конструкций с большой парусностью и габаритами, в том числе витражей, ферм, перегородок и стеновых панелей, к работам в местах действия опасных факторов.",
  },
  {
    q: "Кто должен руководить такими работами?",
    a: "Инженерно-технический работник, ответственный за безопасное производство работ с применением подъёмных сооружений. Руководство должно быть непосредственным, то есть на площадке во время монтажа.",
  },
  {
    q: "Нужен ли ППР на монтаж стеновых панелей?",
    a: "Да. Пункт 163 требует проводить такие работы в соответствии с ППР.",
  },
  {
    q: "Содержит ли пункт 163 допустимую скорость ветра?",
    a: "Нет. Пункт 163 задаёт порядок организации работ. Ветровые ограничения для парусных грузов рассмотрены на отдельной странице про ветер и гололёд.",
  },
  {
    q: "Сколько стоит смена на монтаж панелей?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС..`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Монтаж витражей и стеновых панелей", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: монтаж витражей, ферм и стеновых панелей",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Монтаж витражей и стеновых панелей</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · парусные конструкции</span>
          <h1>{h1}</h1>
          <p>
            Пункт 163 ФНП № 461 относит монтаж витражей, ферм, перегородок и стеновых панелей к работам в местах действия опасных факторов. Их ведут по ППР под непосредственным руководством инженерно-технического работника. Для заказа XCMG QY60K или SANY STC400T это означает ответственного на площадке до начала подъёма.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W188} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что пункт 163 ФНП № 461 требует при монтаже парусных конструкций</caption>
            <thead>
              <tr>
                <th scope="col">Требование</th>
                <th scope="col">Что означает на площадке</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Какие конструкции</th><td>витражи, фермы, перегородки, стеновые панели: большая парусность и габариты</td></tr>
              <tr><th scope="row">Статус работ</th><td>работы в местах действия опасных факторов</td></tr>
              <tr><th scope="row">Документ</th><td>работы ведутся по ППР</td></tr>
              <tr><th scope="row">Руководитель</th><td>непосредственно инженерно-технический работник, ответственный за безопасное производство работ с применением подъёмных сооружений</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA ставит на монтаж парусных конструкций</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Ответственный ИТР и ППР</th><td>назначает и утверждает заказчик как эксплуатирующая организация, KRANNEVA их не подменяет</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-takoe">Какие работы пункт 163 считает опасными</h2>
        <p>
          Монтаж конструкций с большой парусностью и габаритами пункт 163 ФНП № 461 называет прямо: витражи, фермы, перегородки, стеновые панели. Вторая группа — монтаж в зоне примыкания к эксплуатируемым зданиям и сооружениям. Обе группы KRANNEVA принимает в заявку как работы в местах действия опасных факторов.
        </p>

        <h2 id="ppr">ППР и непосредственное руководство</h2>
        <p>
          Монтаж таких конструкций ведут по ППР под непосредственным руководством инженерно-технического работника, ответственного за безопасное производство работ с применением подъёмных сооружений. Оператор XCMG QY60K подчиняется этому ответственному, а не подстраивает порядок подъёма сам. Как ППР устроен и кто его утверждает, разобрано на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">ППР и технологической карты</Link>.
        </p>

        <h2 id="primykanie">Монтаж рядом с эксплуатируемым зданием</h2>
        <p>
          Зона примыкания к эксплуатируемому зданию в пункте 163 приравнена к парусным конструкциям по статусу работ. Для заказчика SANY STC400T в петербургском дворе это значит одно ограничение сразу на оба случая: ППР и ответственный ИТР. Подробнее про стеснённые подходы — на странице <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">работы вплотную к соседнему зданию</Link>.
        </p>

      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="veter">Где искать ветровые пороги</h2>
        <p>
          Ветровые пороги для парусных грузов пункт 163 не содержит: он задаёт организацию работ, а не скорость ветра. Числовые пороги KRANNEVA разбирает отдельно на странице <Link href="/obekty/veter-i-gololed/">про ветер и гололёд</Link>, чтобы не смешивать два разных правила.
        </p>

        <h2 id="zakazchik">Что подготовить заказчику до выезда</h2>
        <p>
          До выезда заказчик называет KRANNEVA ответственного ИТР и передаёт ППР с описанием монтируемой конструкции: габарит, масса и точки строповки. Без этого монтаж витража или панели не начинают. Срок согласования ППР в публичных условиях KRANNEVA не назван.
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
        date={FACT_CHECK_W188}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 163 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 163 ФНП № 461 и не заменяет ППР. Ответственного ИТР и ППР назначает и утверждает эксплуатирующая организация. Ветровые пороги и массу панелей страница не назначает: они определяются проектом и паспортом крана."
      />
    </main>
  );
}
