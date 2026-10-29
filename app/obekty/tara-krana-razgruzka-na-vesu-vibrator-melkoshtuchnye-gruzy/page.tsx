import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W227, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 227. Сто шестой тип объекта — тара крана: разгрузка на весу, вибратор, мелкоштучные грузы (ФНП № 461, п. 226–228).
  Фактура — в комментарии к FACT_CHECK_W226–228 в app/site-data.ts. П. 226 написан для башенных кранов — так и сказано на странице.
*/

const title = "Тара крана: разгрузка на весу, вибратор, мелкоштучные грузы";
const description =
  "Тару с бетоном разгружают на весу не менее 10 секунд, вибратор не сильнее 4 кН, кирпич на поддоне без ограждения поднимать нельзя (п. 226–228 ФНП).";
const h1 = "Как поднимать бетон и кирпич в таре краном: сколько занимает разгрузка и какой груз допустим?";
const canonical = "/obekty/tara-krana-razgruzka-na-vesu-vibrator-melkoshtuchnye-gruzy/";
const published = "2026-10-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "na-vesu", label: "Разгрузка тары на весу" },
  { id: "vibrator", label: "Тара с вибратором" },
  { id: "melkoshtuchnye", label: "Мелкоштучные грузы и кирпич на поддоне" },
  { id: "avtokran", label: "Что из этого относится к автокрану" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько времени должна длиться разгрузка тары на весу?",
    a: "Не менее 10 секунд, равномерно. Мгновенная разгрузка тары на весу запрещена (п. 226 ФНП № 461).",
  },
  {
    q: "Какая масса допустима для тары с вибратором?",
    a: "Суммарная масса тары с грузом не более 50 процентов максимальной грузоподъёмности крана. Возмущающая сила вибратора не должна превышать 4 кН (п. 226–227).",
  },
  {
    q: "Можно ли поднимать кирпич на поддоне без ограждения?",
    a: "Только при погрузке и разгрузке транспорта на землю и с земли, если иное не указано в руководстве по эксплуатации, документах на тару или ППР. К рабочему месту каменщика пакет поднимают в таре, исключающей падение кирпича (п. 228).",
  },
  {
    q: "Относится ли п. 226 к автокранам?",
    a: "Текст пункта прямо назван для башенных кранов. Для автокрана KRANNEVA те же числа заказчик и ППР используют как ориентир, но обязательной нормой для стрелового крана п. 226 не является.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Бадья и поддоны заказчика в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Тара крана: разгрузка на весу, вибратор, мелкоштучные грузы", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором для подачи бетона в бадье и штучных грузов в таре",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Тара крана: разгрузка на весу, вибратор, мелкоштучные грузы</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · тара и штучные грузы</span>
          <h1>{h1}</h1>
          <p>
            Тару с бетоном разгружают на весу равномерно не менее 10 секунд, а мгновенная разгрузка запрещена (п. 226 ФНП № 461). KRANNEVA подаёт SANY STC400T под бадью и поддоны и до выезда уточняет у заказчика, какая тара, есть ли в ней вибратор и как груз будет выгружаться: от этого зависят допустимая масса и порядок подъёма.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W227} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Тара и груз: что ограничивает ФНП № 461 (п. 226–228)</caption>
            <thead>
              <tr>
                <th scope="col">Тара или груз</th>
                <th scope="col">Ограничение</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Тара без вибратора (кроме грейфера)</th><td>масса тары с грузом в пределах грузоподъёмности крана, не более 8 циклов в час</td><td>226</td></tr>
              <tr><th scope="row">Тара с вибратором</th><td>не более 50 % максимальной грузоподъёмности крана</td><td>226</td></tr>
              <tr><th scope="row">Одноканатный грейфер, не допускающий разгрузку на весу</th><td>не более 50 % грузоподъёмности крана</td><td>226</td></tr>
              <tr><th scope="row">Разгрузка тары на весу</th><td>равномерно, не менее 10 секунд; мгновенная запрещена</td><td>226</td></tr>
              <tr><th scope="row">Вибратор на таре</th><td>ось вращения дисбалансов вертикальна, сила не более 4 кН</td><td>227</td></tr>
              <tr><th scope="row">Мелкоштучные грузы</th><td>только в специальной таре, без выпадения частей</td><td>228</td></tr>
              <tr><th scope="row">Кирпич на поддоне без ограждения</th><td>только погрузка и разгрузка транспорта на землю и с земли</td><td>228</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA под тару и штучные грузы</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>вид и масса тары, наличие вибратора, способ разгрузки, схема строповки</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="na-vesu">Разгрузка тары на весу</h2>
        <p>
          Башенный кран с тарой на весу делает не более 8 циклов в час, а разгрузка идёт не менее 10 секунд (п. 226 ФНП № 461). Группа классификации берётся из паспорта крана. Резкий сброс бетона из бадьи раскачивает груз и ударяет по стреле, и норма запрещает его прямо. Для планирования смены с Zoomlion QUY50 из этого следует простой расчёт: за час крановщик успевает не больше восьми циклов, а не «сколько позволит бетононасос».
        </p>

        <h2 id="vibrator">Тара с вибратором</h2>
        <p>
          Масса тары с вибратором и грузом не превышает 50 процентов максимальной грузоподъёмности крана (п. 226 ФНП № 461). Сам вибратор ставят при вертикальной оси дисбалансов, сила не более 4 кН (п. 227). Максимальной считают наибольшую грузоподъёмность среди всех исполнений крана, а не ту, что на выбранном вылете. KRANNEVA поэтому переводит вес бадьи с бетоном в проценты от паспортной цифры до выезда, а не на площадке.
        </p>

        <h2 id="melkoshtuchnye">Мелкоштучные грузы и кирпич на поддоне</h2>
        <p>
          Мелкоштучные грузы разрешено перемещать только в специальной таре, чтобы исключить выпадение частей, а кирпич на поддоне без ограждения допускается поднимать лишь при погрузке и разгрузке транспорта на землю и с земли (п. 228 ФНП № 461). Подъём пакетов к рабочему месту каменщика в таре без защиты от падения запрещён. Исключение возможно, если иное написано в руководстве по эксплуатации тары или в ППР, поэтому ссылка на ППР стоит в договоре первой. Подробности о порядке подъёма — на странице <Link href="/obekty/poryadok-podema-gruza/">про порядок подъёма груза</Link>.
        </p>

        <h2 id="avtokran">Что из этого относится к автокрану</h2>
        <p>
          Пункт 226 назван в тексте ФНП для башенных кранов, а пункты 227–228 такого уточнения не содержат. Вывод KRANNEVA: числа 8 циклов, 50 процентов и 10 секунд для стрелового автокрана не обязательная норма, но заказчик и проектировщик ППР берут их как проверенный ориентир, и мы не возражаем. Грейфер для сыпучих грузов разобран на странице <Link href="/obekty/kran-s-greyferom-ili-kryukom/">про грейфер или крюк</Link>, а перечень оснастки заказчика — на странице <Link href="/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/">про стропы и траверсы</Link>.
        </p>

        <p>
          Ставка KRANNEVA по смене: класс {light.cls} —{" "}
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
        date={FACT_CHECK_W227}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 226–228 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 226–228 ФНП № 461. Пункт 226 в тексте относится к башенным кранам; применимость цифр к стреловому автокрану — вывод KRANNEVA, а не норма. Допустимую массу конкретной бадьи считает проектировщик ППР по паспорту крана. Запрос вида тары и способа разгрузки у заказчика — практика компании."
      />
    </main>
  );
}
