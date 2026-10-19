import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W210, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 210. Восемьдесят девятый тип объекта — влажный климат Санкт-Петербурга и оценка утонения стенок вследствие коррозии (ФНП № 461, п. 170 «а», п. 190; dp.ru, 24.05.2022). Фактура — в комментарии к FACT_CHECK_W208–210
  в app/site-data.ts.
*/

const title = "Коррозия крана во влажном Петербурге: что смотрят";
const description =
  "ФНП № 461 (п. 190): при освидетельствовании проверяют утонение стенок от коррозии; в Петербурге, по данным dp.ru, 180 пасмурных дней и 662 мм осадков в год.";
const h1 = "Почему в Петербурге при осмотре крана отдельно смотрят на коррозию металлоконструкций?";
const canonical = "/obekty/korroziya-i-vlazhnyy-klimat-pri-osmotre-krana/";
const published = "2026-10-19";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-proveryayut", label: "Что проверяют по пункту 190" },
  { id: "klimat-spb", label: "Что известно о климате Петербурга" },
  { id: "chto-prosit", label: "Что просит KRANNEVA" },
  { id: "chego-net", label: "Что страница не утверждает" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Что проверяют на коррозию при техническом освидетельствовании крана?",
    a: "Утонение стенок металлоконструкций вследствие коррозии, а также трещины, остаточные деформации и ослабление соединений кабины, лестниц, площадок и ограждений (п. 190 ФНП № 461).",
  },
  {
    q: "Сколько пасмурных дней в Петербурге?",
    a: "По данным статьи dp.ru от 24 мая 2022 года — 180 дней в году. Для сравнения, в Москве 172. Первоисточник статистики статья не называет.",
  },
  {
    q: "Сколько осадков выпадает в Петербурге за год?",
    a: "Годовая норма — 662 мм по данным той же статьи dp.ru. Это не заменяет справочных данных Росгидромета, которые KRANNEVA на странице не приводит.",
  },
  {
    q: "Нужно ли арендатору проверять коррозию самому?",
    a: "Нет, освидетельствование проводит инженерно-технический работник эксплуатирующей организации (п. 167 ФНП № 461). Арендатор может запросить акт и фото; это условие заявки KRANNEVA, не норма.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Доплаты за осмотр на этой странице не называются: условия согласуются в заявке.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Коррозия и влажный климат", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге с учётом осмотра металлоконструкций на коррозию",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Коррозия и влажный климат</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · коррозия металлоконструкций</span>
          <h1>{h1}</h1>
          <p>
            Пункт 190 ФНП № 461 требует при освидетельствовании проверять утонение стенок металлоконструкций вследствие коррозии, а Петербург, по данным dp.ru за 24 мая 2022 года, имеет 180 пасмурных дней и годовую норму осадков 662 мм. KRANNEVA связывает эти два факта в практике подачи SANY STC400T и XCMG QY60K: просит свежий акт освидетельствования и снимки узлов, которые чаще всего держат влагу.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W210} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Осмотр на коррозию по п. 170 «а» и п. 190 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Что проверяют</th>
                <th scope="col">Что говорит ФНП</th>
                <th scope="col">Что просит KRANNEVA</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Утонение стенок вследствие коррозии</th><td>проверяется при техническом освидетельствовании (п. 190)</td><td>дату и итог последнего освидетельствования</td></tr>
              <tr><th scope="row">Трещины и остаточные деформации</th><td>отсутствие подтверждается при освидетельствовании (п. 190)</td><td>запись в паспорте</td></tr>
              <tr><th scope="row">Кабина, лестницы, площадки, ограждения</th><td>состояние проверяется (п. 170 «а»)</td><td>фото площадок и лестниц</td></tr>
              <tr><th scope="row">Сварные, болтовые соединения</th><td>отсутствие ослабления проверяется (п. 170 «а», п. 190)</td><td>акт без замечаний</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA в сезон дождей и слякоти</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что присылают до выезда</th><td>акт освидетельствования, фото лестниц и площадок, дата последней покраски</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-proveryayut">Что проверяют по пункту 190</h2>
        <p>
          Пункт 190 ФНП № 461 включает в проверку при освидетельствовании утонение стенок вследствие коррозии, а пункт 170 «а» — состояние металлоконструкций, сварных и болтовых соединений, кабины, лестниц, площадок и ограждений. Нормы браковки берут из приложения № 3, если они не противоречат РЭ. KRANNEVA для SANY STC400T использует эти пункты как перечень вопросов к документам: что осматривали, когда и с каким итогом. Сам порядок описан на странице <Link href="/obekty/ocenka-uzlov-krana-po-ru-ili-po-fnp/">про оценку узлов по РЭ или ФНП</Link>.
        </p>

        <h2 id="klimat-spb">Что известно о климате Петербурга</h2>
        <p>
          В Петербурге, по данным статьи dp.ru от 24 мая 2022 года, 180 пасмурных дней в году, годовая норма осадков — 662 мм, а высокая влажность названа минусом морского климата. Для сравнения, в той же статье в Москве 172 пасмурных дня. Первоисточник статистики статья не называет, поэтому KRANNEVA приводит эти числа как данные издания, а не как метеорологическую норму. Зимнюю сторону вопроса — гололёд и наледь — разбирает страница <Link href="/obekty/veter-i-gololed/">про ветер и гололёд</Link>.
        </p>

        <h2 id="chto-prosit">Что просит KRANNEVA</h2>
        <p>
          Перед подачей XCMG QY60K или Kato NK-250E-V KRANNEVA просит у арендодателя акт последнего освидетельствования, запись в паспорте и фотографии лестниц, площадок и ограждений, а на объекте крановщик при приёмке смотрит те же места. Это условие заявки: ФНП не обязывают присылать фото. Связка с климатом практическая: в городе, где пасмурных дней около половины года, влага дольше держится на узлах, и осмотр лестниц и площадок даёт быстрый ответ.
        </p>

        <h2 id="chego-net">Что страница не утверждает</h2>
        <p>
          Страница не утверждает, что петербургский климат ускоряет коррозию конкретного крана на определённую величину: такой зависимости нет ни в ФНП № 461, ни в статье dp.ru. Не приводятся и допустимые толщины стенок — их определяет приложение № 3 и руководство по эксплуатации. Решение о пригодности металлоконструкции принимает инженерно-технический работник, проводящий освидетельствование по пункту 167, а не арендатор по фотографии.
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
        date={FACT_CHECK_W210}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 167, 170, 190 (редакция от 16.04.2026)" },
          { href: "https://www.dp.ru/a/2022/05/23/Pogoda_blagodat", label: "Деловой Петербург, «Погода — благодать: миф о петербургском климате сильно преувеличен», 24.05.2022 — 180 пасмурных дней, 662 мм осадков в год; первоисточник статистики в статье не назван" },
        ]}
        note="Страница пересказывает пункты 167, 170 и 190 ФНП № 461 и статью dp.ru. Зависимость скорости коррозии от климата и допустимые толщины стенок не утверждаются; просьба о фото — условие заявки KRANNEVA, а не норма."
      />
    </main>
  );
}
