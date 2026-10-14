import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W197, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 197. Семьдесят шестой тип объекта — стропы, траверсы и клещи
  заказчика или арендодателя (ФНП № 461, п. 215–225). Требования идут к самому
  приспособлению, а не к его владельцу: осмотр стропов каждые 10 дней,
  траверс, клещей, захватов и тары — каждый месяц, запись в журнал осмотра.
  Кто владелец при аренде — ФНП не различает, на странице не утверждается.
  Фактура — в комментарии к FACT_CHECK_W196–198 в app/site-data.ts.
*/

const title = "Стропы и траверсы: чьи они при аренде крана, п. 224 ФНП";
const description =
  "ФНП № 461 (п. 215–225): стропы осматривают каждые 10 дней, траверсы и клещи — раз в месяц, запись в журнал. Какие бумаги нужны, если приспособления свои.";
const h1 = "Чьи стропы и траверсы поднимают груз при аренде крана с оператором?";
const canonical = "/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/";
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
  { id: "chto-trebuet-fnp", label: "Что ФНП требует от съёмного приспособления" },
  { id: "sroki-osmotra", label: "Сроки осмотра: стропы, траверсы, клещи, тара" },
  { id: "svoi-ili-chuzhie", label: "Свои приспособления или приспособления арендодателя" },
  { id: "posle-remonta", label: "Что требуется после ремонта" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Как часто осматривают стропы на объекте?",
    a: "KRANNEVA сверяет с записью в журнале: стропы осматривают каждые 10 дней, если ими работают регулярно (п. 224 ФНП № 461). Приспособления, которые применяют реже одного раза в 10 дней, осматривают перед началом работ.",
  },
  {
    q: "Как часто осматривают траверсы, клещи и захваты?",
    a: "KRANNEVA ждёт записи за последний месяц: траверсы, клещи, захваты и тару осматривают каждый месяц. Осмотр проводит инженерно-технический работник, назначенный эксплуатирующей организацией (п. 224).",
  },
  {
    q: "Нужно ли записывать осмотр стропов в журнал?",
    a: "Да, KRANNEVA требует эту запись до подъёма. Результаты осмотра съёмных грузозахватных приспособлений и тары заносятся в журнал осмотра (п. 225). Исключение одно: пакетирующие стропы, находящиеся на запакетированном грузе.",
  },
  {
    q: "Кто осматривает приспособление перед подъёмом?",
    a: "На площадке KRANNEVA стропальщик и крановщик осматривают его перед каждым применением по браковочным показателям из руководства по эксплуатации (п. 219 ФНП № 461). Это отдельный осмотр, он не заменяет периодический.",
  },
  {
    q: "Если у заказчика свои стропы, спрашивает ли KRANNEVA на них документы?",
    a: "Да. До первого подъёма на SANY STC400T или XCMG QY60K KRANNEVA просит маркировку, паспорт и страницу журнала осмотра: без них допуск приспособления к работе не подтверждён (п. 218, 251 «е»).",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Стропы и траверсы заказчика или арендодателя", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подъём на съёмных грузозахватных приспособлениях с журналом осмотра",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Стропы и траверсы заказчика или арендодателя</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · съёмные грузозахватные приспособления</span>
          <h1>{h1}</h1>
          <p>
            Пункт 224 ФНП № 461 задаёт ритм осмотра съёмных приспособлений: стропы — каждые 10 дней, траверсы, клещи, захваты и тару — каждый месяц, с записью в журнал по пункту 225. Эти требования привязаны к самому приспособлению, а не к тому, кому оно принадлежит. Поэтому KRANNEVA одинаково проверяет и свои стропы к SANY STC400T, и траверсу заказчика: маркировка, паспорт и журнал осмотра должны лежать на площадке до первого подъёма.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W197} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Периодичность осмотра по п. 224 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Приспособление</th>
                <th scope="col">Как часто осматривает ИТР</th>
                <th scope="col">Дополнительно</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Стропы</th><td className="dtable__num">каждые 10 дней</td><td>перед началом работ, если применяют реже раза в 10 дней</td></tr>
              <tr><th scope="row">Траверсы, клещи, захваты</th><td className="dtable__num">каждый месяц</td><td>ежегодно частичная разборка и ревизия (п. 220)</td></tr>
              <tr><th scope="row">Тара</th><td className="dtable__num">каждый месяц</td><td>после ремонта — испытание 110 % разности масс брутто и нетто (п. 222)</td></tr>
              <tr><th scope="row">Пакетирующие стропы</th><td className="dtable__num">перед каждым подъёмом пакета</td><td>подъём на 100–200 мм, выдержка не менее 30 секунд (п. 224)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA просит до первого подъёма</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Документы на приспособление</th><td>маркировка, паспорт, страница журнала осмотра с датой последнего осмотра</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-trebuet-fnp">Что ФНП требует от съёмного приспособления</h2>
        <p>
          Пункт 215 ФНП № 461 приравнивает требования к грузозахватным приспособлениям к требованиям к подъёмному сооружению, с которым они работают. Пункт 218 запрещает держать на местах работ негодные, немаркированные приспособления и приспособления с истёкшим сроком службы. Пункт 22 «в» обязывает эксплуатирующую организацию не допускать в работу неработоспособные приспособления и тару, а пункт 251 «е» не позволяет допускать кран без съёмных приспособлений, подходящих по массе и виду груза. Для KRANNEVA это означает: стропа без бирки не дойдёт до крюка XCMG QY60K, чья бы она ни была.
        </p>

        <h2 id="sroki-osmotra">Сроки осмотра: стропы, траверсы, клещи, тара</h2>
        <p>
          Осмотр съёмных приспособлений и тары по пункту 224, на который опирается KRANNEVA, проводит инженерно-технический работник, назначенный эксплуатирующей организацией. Траверсы, клещи, захваты и тару он осматривает каждый месяц, стропы — каждые 10 дней, а редко применяемые приспособления — перед началом работ. Пакетирующие стропы проверяют перед каждой операцией подъёма запакетированного груза: пакет поднимают на 100–200 мм и выдерживают не менее 30 секунд, а повреждённые приспособления изымают из работы. Отдельно пункт 219 возлагает осмотр перед применением на стропальщика и крановщика. Периодический осмотр ИТР и осмотр перед подъёмом — две разные процедуры, и ни одна не заменяет другую.
        </p>

        <h2 id="svoi-ili-chuzhie">Свои приспособления или приспособления арендодателя</h2>
        <p>
          ФНП № 461 не различает владельца приспособления при аренде: требования идут к самому стропу или траверсе. KRANNEVA поэтому не утверждает, что чьи-то стропы «по умолчанию в порядке». Если заказчик приносит свои клещи или траверсу, на площадке нужны маркировка изготовителя, паспорт и журнал осмотра с последней записью. Если заказчик пользуется приспособлениями KRANNEVA, эти же три документа предъявляются ему. Кто на площадке подписывает журнал, устанавливает договор и приказ о назначении ИТР, а о допуске стропальщиков рассказывает страница <Link href="/obekty/stropalshchik-zakazchika-ili-arendodatelya/">про стропальщика заказчика или арендодателя</Link>.
        </p>

        <h2 id="posle-remonta">Что требуется после ремонта</h2>
        <p>
          KRANNEVA опирается на пункт 221: он разрешает ремонт стропов заменой изношенных элементов без проекта, а ремонт других приспособлений ведут по проекту. После ремонта пункт 222 требует статических испытаний: приспособление нагружают на 125 процентов номинальной паспортной грузоподъёмности, тару — на 110 процентов разности масс брутто и нетто. Заменённые легкозаменяемые элементы маркируют по изготовителю и отмечают в паспорте (п. 223). Стропа, вернувшаяся из ремонта без записи об испытании, на SANY STC400T не поднимается. Как выстроен сам подъём, описывает страница <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>.
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
        date={FACT_CHECK_W197}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 22, 215–225, 251 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 215–225 ФНП № 461. Кто является владельцем приспособления при аренде, ФНП не различает, поэтому на странице это не утверждается; графики осмотра и внутренние инструкции эксплуатирующей организации здесь не приводятся."
      />
    </main>
  );
}
