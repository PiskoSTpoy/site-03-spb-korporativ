import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W183, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 183. Шестьдесят второй тип — объект, где подъём идёт по ППР или
  технологической карте. Угол информационный/how-to. Фактура — в комментарии
  к FACT_CHECK_W183 в app/site-data.ts. Содержание ППР пересказано по п. 156
  ФНП № 461 коротко, без копирования перечня; сроков разработки ППР норматив
  не содержит — страница их не называет.
*/

const title = "ППР и техкарта на кран: что в них входит (ФНП № 461)";
const description =
  "Пункты 155–158 ФНП № 461: что должен предусмотреть ППР, кто его утверждает и кому его выдают до работ. Что запросить у KRANNEVA до подъёма.";
const h1 = "Что должен содержать ППР на подъём автокраном?";
const canonical = "/obekty/ppr-i-tehnologicheskaya-karta-krana/";
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
  { id: "kto-utverzhdaet", label: "Кто утверждает ППР и кому его выдают" },
  { id: "soderzhanie", label: "Что обязан предусмотреть ППР" },
  { id: "ppr-i-pos", label: "Чем ППР отличается от ПОС" },
  { id: "ozvakomlenie", label: "Кто расписывается в ознакомлении" },
  { id: "chto-zaprosit", label: "Что запросить у арендодателя до подъёма" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто утверждает ППР на работу автокрана?",
    a: "Эксплуатирующая организация. Пункт 157 ФНП № 461 требует утвердить ППР или технологическую карту и выдать их на участки работ до начала ведения работ.",
  },
  {
    q: "Чем технологическая карта отличается от ППР?",
    a: "Пункт 157 ФНП № 461 ставит их рядом и предъявляет к ним одинаковые требования по утверждению и выдаче. Различие по объёму работ и составу документа норматив в пунктах 155–158 не раскрывает.",
  },
  {
    q: "Кто должен быть ознакомлен с ППР?",
    a: "По пункту 158 ФНП № 461 — инженерно-технические работники, ответственные за безопасное производство работ, крановщики (операторы), машинисты подъёмников, рабочие люльки и стропальщики, причём под подпись до начала работ.",
  },
  {
    q: "Что ППР говорит про схемы строповки?",
    a: "Подпункт «д» пункта 156 ФНП № 461 требует включить в ППР перечень грузозахватных приспособлений и графические схемы строповки с указанием способов обвязки и безопасной кантовки.",
  },
  {
    q: "Сколько времени делают ППР?",
    a: "Нормативы срока разработки не называют, а публичные условия KRANNEVA его не указывают. Срок согласуют с проектировщиком заказчика заранее, до подтверждения даты выезда.",
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
    { "@type": "ListItem", position: 3, name: "ППР и технологическая карта", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подъём по ППР или технологической карте",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>ППР и технологическая карта</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · ППР и технологическая карта</span>
          <h1>{h1}</h1>
          <p>
            Пункт 156 ФНП № 461 требует от ППР с применением подъёмного сооружения привязки крана
            к условиям площадки: грузоподъёмность, вылет, ветер, безопасные расстояния, схемы
            строповки. Поэтому KRANNEVA подаёт SANY STC400T или XCMG QY60K под готовый ППР
            заказчика, а не сочиняет его на месте.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W183} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что ФНП № 461 говорит об ППР и технологической карте</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Что установлено</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Что предусмотреть в ПОС</th><td>соответствие крана условиям работ, безопасные расстояния, несколько кранов, склады</td><td>155</td></tr>
              <tr><th scope="row">Что предусмотреть в ППР</th><td>то же плюс схемы строповки, опасные зоны, подъездные пути</td><td>156</td></tr>
              <tr><th scope="row">Кто утверждает и когда выдаёт</th><td>эксплуатирующая организация, до начала работ</td><td>157</td></tr>
              <tr><th scope="row">Кто ознакамливается</th><td>ИТР, крановщики, стропальщики — под подпись до работ</td><td>158</td></tr>
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
              <tr><th scope="row">Срок разработки ППР</th><td>нормативом не задан — согласуется с проектировщиком заказчика</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="kto-utverzhdaet">Кто утверждает ППР и кому его выдают</h2>
        <p>
          Пункт 157 ФНП № 461 возлагает утверждение ППР и технологической карты на организацию,
          эксплуатирующую подъёмное сооружение, и требует выдать документ на участок работ до их
          начала. Когда на объект приходит SANY STC400T, эксплуатирующей организацией по
          договору аренды с экипажем остаётся KRANNEVA, но схему площадки и подъёма готовит
          проектировщик заказчика.
        </p>

        <h2 id="soderzhanie">Что обязан предусмотреть ППР</h2>
        <p>
          Пункт 156 ФНП № 461 задаёт состав ППР. В нём: соответствие крана условиям работ по
          грузоподъёмности, высоте и вылету, ветровой нагрузке, безопасные расстояния до сетей и
          ЛЭП, откосов, строений и складов, перечень грузозахватных приспособлений со схемами
          строповки, места складирования и подъездные пути. XCMG QY60K выбирают по этой
          грузовой характеристике, а не по общему тоннажу.
        </p>
        <p>
          Отдельный подпункт требует определить опасные для людей зоны работы крана. Эту часть
          ППР разбирает страница{" "}
          <Link href="/obekty/opasnaya-zona-krana-i-soglasovanie/">опасной зоны крана</Link>.
        </p>

        <h2 id="ppr-i-pos">Чем ППР отличается от ПОС</h2>
        <p>
          Пункт 155 ФНП № 461 описывает требования к проекту организации строительства, а пункт
          156 начинается словами «если это не указано в ПОС». Значит, ППР вправе не повторять
          то, что уже решено в ПОС. Какой из документов заказчик передаёт KRANNEVA, определяет
          заявка, а требования к содержанию остаются теми же.
        </p>
        <p>
          Если на площадке работают два крана, взаимное положение машин задаёт тот же ППР; этот
          случай описан на странице{" "}
          <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">двух кранов на одной площадке</Link>.
        </p>

        <h2 id="ozvakomlenie">Кто расписывается в ознакомлении</h2>
        <p>
          Пункт 158 ФНП № 461 называет шесть групп работников: ответственные ИТР, крановщики
          (операторы), машинисты подъёмников, рабочие люльки и стропальщики. Оператор крана
          KRANNEVA расписывается в ППР до первого подъёма, и ту же подпись обязан поставить
          каждый стропальщик на площадке, чья бы организация его ни направила.
        </p>

        <h2 id="chto-zaprosit">Что запросить у арендодателя до подъёма</h2>
        <p>
          Практичный минимум для заявки в KRANNEVA: утверждённый ППР или технологическая карта,
          массы и вылеты самых тяжёлых подъёмов, схемы строповки, план площадки с подъездами.
          Нормативы не определяют срок подготовки ППР, поэтому сроки заявки зависят от
          проектировщика, а не от крана.
        </p>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
          Порядок подъёма груза после ППР описан на странице{" "}
          <Link href="/obekty/poryadok-podema-gruza/">порядка подъёма</Link>.
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
        date={FACT_CHECK_W183}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 — ФНП «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения», пункты 155–158" },
        ]}
        note="Страница пересказывает пункты 155–158 ФНП № 461 и не заменяет ППР, разработанный проектировщиком. Срок разработки ППР, различие объёма ППР и технологической карты нормативами в этих пунктах не установлены, а публичные условия KRANNEVA их не называют — страница их не утверждает."
      />
    </main>
  );
}
