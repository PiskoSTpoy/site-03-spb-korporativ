import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W185, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 185. Шестьдесят четвёртый тип — опасная зона крана, в которую
  попадает чужое имущество. Угол практический, для плотной застройки СПб.
  Фактура — подпункт «ж» п. 156 ФНП № 461 (читан напрямую); размеры зон
  берутся из приложения N 2 — оно не читалось, цифр не приводим.
*/

const title = "Опасная зона крана у чужого здания: что делает ППР";
const description =
  "Подпункт «ж» п. 156 ФНП № 461: ограничение зоны работы крана и согласование с владельцем имущества в опасной зоне. Что запросить у KRANNEVA.";
const h1 = "Что делать, если опасная зона крана захватывает чужое здание или проезд?";
const canonical = "/obekty/opasnaya-zona-krana-i-soglasovanie/";
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
  { id: "chto-eto", label: "Что считается опасной зоной" },
  { id: "chuzhoe", label: "Когда в зону попадает чужое имущество" },
  { id: "ogranichenie", label: "Как ограничивают зону работы крана" },
  { id: "soglasovanie", label: "С кем согласуют решение" },
  { id: "chto-zaprosit", label: "Что принести в заявку" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто определяет опасную зону крана?",
    a: "ППР. Подпункт «ж» пункта 156 ФНП № 461 включает определение опасных для людей зон в мероприятия ППР, а размеры зон должны соответствовать приложению № 2 к ФНП.",
  },
  {
    q: "Что делать, если в опасную зону попадает соседнее здание?",
    a: "Разработать мероприятия, предупреждающие возникновение там опасных зон. Подпункт «ж» пункта 156 ФНП № 461 называет такими мероприятиями принудительное ограничение зоны работы крана дополнительными средствами.",
  },
  {
    q: "Нужно ли согласие владельца соседнего имущества?",
    a: "Решения по ограничению зоны должны быть согласованы с собственником, владельцем или иным лицом, ответственным за безопасное использование и содержание имущества, попадающего в опасную зону (п. 156 «ж» ФНП № 461).",
  },
  {
    q: "Как должна меняться скорость поворота стрелы?",
    a: "Скорость поворота стрелы в сторону границы рабочей зоны ограничивают до минимальной, когда расстояние от груза до границы опасной зоны меньше 7 м (п. 156 «ж» ФНП № 461).",
  },
  {
    q: "Учитывает ли опасная зона падение самого крана?",
    a: "Нет. Подпункт «ж» пункта 156 ФНП № 461 прямо указывает, что при определении опасных зон не предусматривается возникновение зон от падения подъёмного сооружения и его узлов.",
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
    { "@type": "ListItem", position: 3, name: "Опасная зона крана и согласование", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: опасная зона у чужого имущества",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Опасная зона крана и согласование</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · опасная зона крана</span>
          <h1>{h1}</h1>
          <p>
            Подпункт «ж» пункта 156 ФНП № 461 требует ограничить зону работы крана так, чтобы в
            местах нахождения людей не возникало опасных зон, а решение согласовать с владельцем
            имущества, попавшего в зону. В плотной застройке Петербурга KRANNEVA подаёт SANY
            STC400T или XCMG QY60K только под такое решение, записанное в ППР.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W185} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что подпункт «ж» пункта 156 ФНП № 461 требует при опасной зоне</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Что установлено</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Что определяет ППР</th><td>опасные для людей зоны, размеры — по приложению № 2 к ФНП</td></tr>
              <tr><th scope="row">Если в зону попадает чужое здание или дорога</th><td>мероприятия, исключающие опасную зону в местах нахождения людей</td></tr>
              <tr><th scope="row">Чем ограничивают зону</th><td>дополнительные средства принудительного ограничения зоны работы крана</td></tr>
              <tr><th scope="row">Скорость поворота стрелы</th><td className="dtable__num">минимальная при расстоянии до границы зоны менее 7 м</td></tr>
              <tr><th scope="row">Согласование</th><td>с собственником или лицом, ответственным за имущество в зоне</td></tr>
              <tr><th scope="row">Падение самого крана</th><td>в опасных зонах не учитывается</td></tr>
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
              <tr><th scope="row">Размер опасной зоны в метрах</th><td>даёт ППР по приложению № 2 — страница числа не называет</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-eto">Что считается опасной зоной</h2>
        <p>
          Подпункт «ж» пункта 156 ФНП № 461 называет опасной зону, где действуют или могут действовать
          опасные факторы работы подъёмного сооружения. Он поручает
          её определить ППР, а размеры отсылает к приложению № 2 к ФНП, поэтому для SANY STC400T
          зону считает проектировщик площадки, а не диспетчер KRANNEVA.
        </p>

        <h2 id="chuzhoe">Когда в зону попадает чужое имущество</h2>
        <p>
          В стеснённой застройке груз XCMG QY60K может пройти над соседним зданием, двором или
          дорогой. Подпункт «ж» пункта 156 описывает именно этот случай: если в опасные зоны вблизи
          мест перемещения груза могут попасть эксплуатируемые здания, транспортные или пешеходные
          дороги и другие места нахождения людей, нужны мероприятия против возникновения там
          опасных зон.
        </p>
        <p>
          KRANNEVA разбирает тесную застройку вплотную к соседнему зданию на странице{" "}
          <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">работы вплотную к соседнему зданию</Link>.
        </p>

        <h2 id="ogranichenie">Как ограничивают зону работы крана</h2>
        <p>
          Подпункт «ж» пункта 156 ФНП № 461 требует оснастить кран дополнительными средствами ограничения зоны работы,
          которые принудительно удерживают стрелу в разрешённых границах. Скорость поворота стрелы
          к границе рабочей зоны снижают до минимальной, когда груз ближе 7 м до границы
          опасной зоны; настройку машины под это условие стороны уточняют в заявке.
        </p>

        <h2 id="soglasovanie">С кем согласуют решение</h2>
        <p>
          Подпункт «ж» пункта 156 ФНП № 461 требует согласовать решения по ограничению зоны с собственником, владельцем или иным лицом,
          отвечающим за безопасное использование и содержание имущества, попавшего в опасную
          зону. Для XCMG QY60K над двором жилого дома круг лиц зависит от того, кто
          отвечает за здание; согласие получает заказчик и прикладывает к ППР.
        </p>
        <p>
          KRANNEVA описывает жилой двор многоквартирного дома на странице{" "}
          <Link href="/obekty/zhiloy-dvor-mnogokvartirnogo-doma/">жилого двора многоквартирного дома</Link>.
        </p>

        <h2 id="chto-zaprosit">Что принести в заявку</h2>
        <p>
          В заявку KRANNEVA стоит приложить ППР с обозначенными опасными зонами, схему ограничения
          зоны работы и подтверждение согласования с владельцами имущества. Сроков согласования
          норматив не называет, поэтому порядок и сроки заказчик уточняет у владельцев сам.
        </p>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
          KRANNEVA разбирает сам ППР на странице{" "}
          <Link href="/obekty/ppr-i-tehnologicheskaya-karta-krana/">ППР и технологической карты</Link>.
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
        date={FACT_CHECK_W185}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 — ФНП «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения», пункт 156, подпункт «ж»" },
        ]}
        note="Страница пересказывает подпункт «ж» пункта 156 ФНП № 461 и не заменяет ППР. Размеры опасных зон из приложения № 2 к ФНП, сроки согласования с владельцами имущества и порядок настройки ограничителей конкретной машины нормативом в этом пункте не названы — страница их не приводит."
      />
    </main>
  );
}
