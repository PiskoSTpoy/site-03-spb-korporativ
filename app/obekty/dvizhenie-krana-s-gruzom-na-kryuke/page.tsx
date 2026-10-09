import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W187, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 187. Шестьдесят шестой тип объекта — перемещение стрелового самоходного крана с грузом на крюке.
  Угол информационный/how-to. Нагрузку и допустимость перемещения задаёт руководство
  по эксплуатации модели, страница чисел из него не придумывает.
  Фактура — в комментарии к FACT_CHECK_W187 в app/site-data.ts.
*/

const title = "Движение крана с грузом на крюке: основание по п. 161";
const description =
  "Пункт 161 ФНП № 461 разрешает стреловому самоходному крану ездить с грузом на крюке, если основание твёрдое и ровное. Что проверить до выезда.";
const h1 = "Можно ли перемещать автокран с грузом на крюке?";
const canonical = "/obekty/dvizhenie-krana-s-gruzom-na-kryuke/";
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
  { id: "razreshenie", label: "Когда перемещение с грузом вообще разрешено" },
  { id: "osnovanie", label: "Основание: твёрдое покрытие без просадки" },
  { id: "uklon", label: "Ровность и уклон" },
  { id: "raskachivanie", label: "Раскачивающийся груз и начало движения" },
  { id: "zakazchik", label: "Что подготовить заказчику до выезда" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли ехать автокраном с грузом на крюке?",
    a: "Пункт 161 ФНП № 461 разрешает это стреловым самоходным кранам. Нагрузку на кран и допустимость самого перемещения определяет руководство по эксплуатации конкретной модели.",
  },
  {
    q: "Какое покрытие нужно для проезда крана с грузом?",
    a: "Твёрдое, способное выдержать без просадки удельное давление не менее значений из паспорта или руководства по эксплуатации. Конкретный материал пункт 161 не называет.",
  },
  {
    q: "Какой уклон допустим при движении с грузом?",
    a: "Не более указанного в руководстве по эксплуатации крана. Числа в самом пункте 161 нет, поэтому для SANY STC400T и XCMG QY60K его берут из документации модели.",
  },
  {
    q: "Можно ли трогаться с места, если груз раскачивается?",
    a: "Нельзя. Пункт 161 запрещает движение крана с места при раскачивающемся грузе: сначала качание гасят.",
  },
  {
    q: "Сколько стоит смена, если часть времени кран движется с грузом?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС..`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Движение крана с грузом на крюке", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: перемещение крана с грузом на крюке",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Движение крана с грузом на крюке</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · перемещение с грузом</span>
          <h1>{h1}</h1>
          <p>
            Пункт 161 ФНП № 461 разрешает стреловому самоходному крану перемещаться с грузом на крюке, но только по твёрдому покрытию без просадки и в пределах нагрузки из руководства по эксплуатации. Для SANY STC400T и XCMG QY60K KRANNEVA сверяет эти условия до выезда, а не на площадке.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W187} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что пункт 161 ФНП № 461 требует при перемещении с грузом</caption>
            <thead>
              <tr>
                <th scope="col">Требование</th>
                <th scope="col">Что означает на площадке</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Допустимость</th><td>нагрузку на кран и саму возможность перемещения с грузом устанавливает руководство по эксплуатации крана</td></tr>
              <tr><th scope="row">Покрытие</th><td>твёрдое, способное выдержать без просадки удельное давление не менее указанного в паспорте или руководстве</td></tr>
              <tr><th scope="row">Ровность и уклон</th><td>основание ровное, уклон не более указанного в руководстве по эксплуатации</td></tr>
              <tr><th scope="row">Раскачивание</th><td>движение с места при раскачивающемся грузе запрещено</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что KRANNEVA ставит на перемещение с грузом</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Удельное давление и уклон</th><td>берутся из паспорта и руководства конкретной модели, KRANNEVA их не назначает</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="razreshenie">Когда перемещение с грузом вообще разрешено</h2>
        <p>
          Перемещение стрелового самоходного крана с грузом на крюке пункт 161 ФНП № 461 разрешает, но не безусловно. Нагрузку на кран и возможность такого перемещения определяет руководство по эксплуатации. Для XCMG QY60K и SANY STC400T это значит: ответ на вопрос «можно ли ехать с грузом» лежит в документации модели, а не в практике оператора.
        </p>

        <h2 id="osnovanie">Основание: твёрдое покрытие без просадки</h2>
        <p>
          Основание, по которому KRANNEVA перемещает кран с грузом, должно иметь твёрдое покрытие. Покрытие обязано выдерживать без просадки удельное давление не менее величин из паспорта или руководства по эксплуатации. Пункт не называет материал покрытия: плиты, щебень или асфальт подходят, только если выдерживают указанное давление.
        </p>

        <h2 id="uklon">Ровность и уклон</h2>
        <p>
          Ровность и уклон основания пункт 161 привязывает к руководству: уклон не должен превышать указанный в документе крана. Числа уклона в пункте нет, у SANY STC400T и XCMG QY60K оно своё. Поэтому заказчику стоит заранее показать KRANNEVA профиль проезда, а не словами «площадка ровная».
        </p>

        <h2 id="raskachivanie">Раскачивающийся груз и начало движения</h2>
        <p>
          Раскачивающийся груз запрещает трогаться: пункт 161 прямо запрещает движение крана с места, пока груз качается. Оператор XCMG QY60K сначала гасит качание, потом начинает ход. Для заказчика это минуты ожидания в смене, а не нарушение графика.
        </p>

      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="zakazchik">Что подготовить заказчику до выезда</h2>
        <p>
          До выезда заказчик передаёт KRANNEVA схему проезда, тип покрытия и признаки уклона там, где кран пойдёт с грузом. Эти данные нужны, чтобы сопоставить их с паспортными значениями SANY STC400T или XCMG QY60K. Срок такой сверки в публичных условиях KRANNEVA не назван.
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
        date={FACT_CHECK_W187}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 161 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 161 ФНП № 461 и не заменяет руководство по эксплуатации крана. Значения удельного давления и допустимого уклона в пункте не приведены: они берутся из паспорта и руководства конкретной модели, KRANNEVA их не назначает."
      />
    </main>
  );
}
