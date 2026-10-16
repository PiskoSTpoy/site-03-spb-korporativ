import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W202, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 202. Восемьдесят первый тип объекта — таблички на кране (ФНП № 461,
  п. 121): заводской номер, паспортная грузоподъёмность, даты следующего полного
  и частичного освидетельствований. Сроки самих освидетельствований — на странице
  tehnicheskoe-osvidetelstvovanie-krana-v-pasporte, здесь не повторяются.
  Фактура — в комментарии к FACT_CHECK_W202–204 в app/site-data.ts.
*/

const title = "Таблички на кране перед подачей: что требует п. 121 ФНП";
const description =
  "ФНП № 461 (п. 121): на кране должна быть табличка с заводским номером, паспортной грузоподъёмностью и датами следующих освидетельствований.";
const h1 = "Какие таблички должны быть на кране, который подают на объект?";
const canonical = "/obekty/tablichki-na-krane-pered-podachey/";
const published = "2026-10-16";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-govorit-p121", label: "Что говорит пункт 121" },
  { id: "tri-pozitsii", label: "Три позиции таблички и откуда их сверять" },
  { id: "chego-net", label: "Чего пункт 121 не определяет" },
  { id: "pered-podachey", label: "Что проверяют до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Что должно быть указано на табличке крана по ФНП?",
    a: "Три сведения: заводской номер подъёмного сооружения, паспортная грузоподъёмность и даты следующего полного и частичного технического освидетельствования. Перечень дан в пункте 121 ФНП № 461. KRANNEVA просит фото таблички вместе с копией страницы паспорта до выезда.",
  },
  {
    q: "Где на кране должна висеть табличка?",
    a: "Пункт 121 ФНП № 461 место установки и размеры таблички не называет, а только перечисляет сведения. Расположение определяет документация изготовителя и эксплуатирующая организация. KRANNEVA на сайте точное место не утверждает.",
  },
  {
    q: "Что делать, если дата на табличке уже прошла?",
    a: "Нормативного сценария для этого случая пункт 121 не описывает. По существу прошедшая дата означает, что очередное освидетельствование по паспорту наступило раньше подачи. KRANNEVA в такой ситуации не подтверждает дату выезда, пока запись в паспорте не обновлена.",
  },
  {
    q: "Табличка относится к автокранам или только к башенным?",
    a: "Пункт 121 говорит о подъёмных сооружениях в эксплуатации без деления на типы, поэтому он охватывает и автокраны вроде SANY STC400T и XCMG QY60K. Тип крана определяет только где и как закреплена табличка у конкретной машины.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA с проверенными документами?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Проверка таблички и паспорта входит в подготовку подачи и отдельно не тарифицируется.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Таблички на кране перед подачей", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с проверкой таблички и паспорта до подачи на объект",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Таблички на кране перед подачей</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · таблички на кране</span>
          <h1>{h1}</h1>
          <p>
            Пункт 121 ФНП № 461 требует, чтобы на каждом подъёмном сооружении в эксплуатации была табличка с тремя сведениями: заводской номер, паспортная грузоподъёмность и даты следующего полного и частичного освидетельствования. Эти три позиции заказчик может сверить с паспортом ещё до выезда машины. KRANNEVA подаёт SANY STC400T и XCMG QY60K после такой сверки и просит прислать фото таблички вместе с копией страницы паспорта.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W202} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Табличка по п. 121 ФНП № 461: что указано и где сверять</caption>
            <thead>
              <tr>
                <th scope="col">Сведение на табличке</th>
                <th scope="col">С чем сверяют</th>
                <th scope="col">Что значит несовпадение</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Заводской номер</th><td>паспорт, раздел с общими сведениями</td><td>табличка может принадлежать другой машине</td></tr>
              <tr><th scope="row">Паспортная грузоподъёмность</th><td>паспорт и грузовая характеристика</td><td>расчёт ППР строят не на ту цифру</td></tr>
              <tr><th scope="row">Дата следующего полного освидетельствования</th><td>запись в паспорте (п. 189)</td><td>срок по бумаге и на машине расходятся</td></tr>
              <tr><th scope="row">Дата следующего частичного освидетельствования</th><td>запись в паспорте (п. 189)</td><td>срок по бумаге и на машине расходятся</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача с проверкой таблички KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>фото таблички, копия страницы паспорта с записью освидетельствования</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-govorit-p121">Что говорит пункт 121</h2>
        <p>
          Пункт 121 ФНП № 461 состоит из одного предложения: подъёмные сооружения, которые находятся в эксплуатации, должны быть снабжены табличками. В списке сведений три позиции, и ни одна из них не касается владельца или арендатора. Табличка нужна любому, кто находится рядом с краном и должен быстро понять, та ли это машина и в силе ли её освидетельствование. KRANNEVA читает пункт как требование к самой машине, которое заказчик проверяет глазами.
        </p>

        <h2 id="tri-pozitsii">Три позиции таблички и откуда их сверять</h2>
        <p>
          Паспортная грузоподъёмность на табличке XCMG QY60K — одна цифра из паспорта, а рабочая нагрузка зависит от вылета по грузовой характеристике. Поэтому цифра с таблички служит проверкой того, что на объект приехал именно тот кран, под который писали ППР, а не заменяет грузовую характеристику. Заводской номер сверяют с паспортом, даты следующих освидетельствований — с записью по пункту 189. Сами сроки (не реже 12 месяцев для частичного и не реже 3 лет для полного) разобраны на странице <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">про освидетельствование в паспорте</Link>.
        </p>

        <h2 id="chego-net">Чего пункт 121 не определяет</h2>
        <p>
          Пункт 121 не называет место установки таблички, её размер, материал и шрифт, а также не описывает действия при несовпадении. Всё это либо определено документацией изготовителя, либо остаётся на усмотрение эксплуатирующей организации. KRANNEVA поэтому не утверждает, где именно на SANY STC400T закреплена табличка: заказчик видит это у машины на объекте. Любой вывод «несовпадение означает запрет работ» — это толкование KRANNEVA, а не норма пункта.
        </p>

        <h2 id="pered-podachey">Что проверяют до выезда</h2>
        <p>
          Диспетчер KRANNEVA сверяет три вещи до подтверждения даты: заводской номер на фото таблички и в паспорте, паспортную грузоподъёмность и обе даты следующих освидетельствований. Если любая дата уже прошла к дню подачи, дату выезда не подтверждают, пока запись в паспорте не обновлена. Для работы на объекте с ППР это продолжение логики пункта 159 о схемах строповки и грузах, описанной на странице <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">про ППР и технологическую карту</Link>.
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
        date={FACT_CHECK_W202}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 121, 159, 165–170, 189 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает три сведения таблички по пункту 121 ФНП № 461. Место установки и размер таблички пункт не называет; вывод о том, что несовпадение с паспортом блокирует подачу, — толкование KRANNEVA."
      />
    </main>
  );
}
