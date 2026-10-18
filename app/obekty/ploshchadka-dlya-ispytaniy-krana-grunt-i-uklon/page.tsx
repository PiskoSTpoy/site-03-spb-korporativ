import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W205, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 205. Восемьдесят четвёртый тип объекта — площадка для статических
  испытаний автокрана (ФНП № 461, п. 175, п. 171). Числа плотности грунта и
  уклона пункт не называет — отсылает к руководству по эксплуатации.
  Фактура — в комментарии к FACT_CHECK_W205–207 в app/site-data.ts.
*/

const title = "Площадка для испытаний автокрана: грунт, уклон, шины";
const description =
  "ФНП № 461 (п. 175): площадку для статических испытаний крана готовят по РЭ — плотность грунта и уклон; груз поднимают на 50–100 мм и держат 10 минут.";
const h1 = "Какую площадку готовят для статических испытаний автокрана?";
const canonical = "/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/";
const published = "2026-10-18";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-govorit-p175", label: "Что говорит пункт 175" },
  { id: "kak-prohodit-ispytanie", label: "Как идёт испытание на площадке" },
  { id: "chego-net", label: "Чего пункт 175 не определяет" },
  { id: "kto-gotovit", label: "Кто готовит площадку и что просит заказчик" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой уклон площадки допустим для испытаний автокрана?",
    a: "Пункт 175 ФНП № 461 числа не называет: плотность грунта и уклон должны соответствовать руководству по эксплуатации конкретного крана. KRANNEVA на сайте допустимый уклон SANY STC400T или XCMG QY60K не публикует и отсылает к РЭ машины.",
  },
  {
    q: "Нужны ли выносные опоры при статических испытаниях?",
    a: "Решение зависит от руководства по эксплуатации. Пункт 175 допускает испытания без выносных опор, если РЭ это разрешает, и в этом случае требует проверить давление в шинах колёс. Для автокрана на автомобильном шасси проверка шин входит в подготовку.",
  },
  {
    q: "На какую высоту поднимают груз при испытании?",
    a: "На 50–100 мм. Если за 10 минут поднятый груз не опустится на землю, а трещин, остаточных деформаций и других повреждений металлоконструкций и механизмов не найдено, результат положительный (п. 175 ФНП № 461).",
  },
  {
    q: "Должен ли заказчик готовить площадку для испытаний крана?",
    a: "ФНП этого не говорят: пункт 175 требует подготовить площадку, но не назначает исполнителя. Если освидетельствование проходит на базе арендодателя, площадка его. Если испытание на объекте заказчика, это условие договора, и KRANNEVA фиксирует его в заявке до выезда.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Статические испытания по ФНП в тариф смены не входят и согласуются отдельно.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Площадка для испытаний автокрана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с учётом требований к площадке для статических испытаний",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Площадка для испытаний автокрана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · площадка для испытаний</span>
          <h1>{h1}</h1>
          <p>
            Пункт 175 ФНП № 461 требует подготовить для статических испытаний крана стрелового типа площадку с плотностью грунта и уклоном по руководству по эксплуатации. Если кран стоит без выносных опор, проверяют давление в шинах; груз поднимают на 50–100 мм и держат 10 минут. KRANNEVA не публикует допустимый уклон для SANY STC400T и XCMG QY60K — число задаёт РЭ машины, а не сайт.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W205} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Площадка и ход статического испытания по п. 171 и 175 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Что требует ФНП</th>
                <th scope="col">Откуда число</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Плотность грунта и уклон</th><td>обеспечены «согласно РЭ крана» (п. 175)</td><td>руководство по эксплуатации, ФНП числа не дают</td></tr>
              <tr><th scope="row">Выносные опоры</th><td>испытание без опор допустимо, если РЭ разрешает</td><td>руководство по эксплуатации</td></tr>
              <tr><th scope="row">Давление в шинах</th><td>проверяют, если опоры не используют (автомобильное и пневмоколёсное шасси)</td><td>руководство по эксплуатации</td></tr>
              <tr><th scope="row">Нагрузка</th><td>125 % номинальной грузоподъёмности (п. 171)</td><td>ФНП, масса контрольных грузов ±3 %</td></tr>
              <tr><th scope="row">Высота подъёма груза</th><td>50–100 мм (п. 175)</td><td>ФНП</td></tr>
              <tr><th scope="row">Выдержка</th><td>10 минут без опускания на землю (п. 175)</td><td>ФНП</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: автокран KRANNEVA и площадка для испытаний</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что согласуют до выезда</th><td>кто готовит площадку, где проходит испытание, кто поставляет контрольные грузы</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-govorit-p175">Что говорит пункт 175</h2>
        <p>
          Пункт 175 ФНП № 461 начинается с площадки, а не с груза: для кранов стрелового типа и кранов-манипуляторов должна быть подготовлена площадка с требуемыми плотностью грунта и уклоном согласно руководству по эксплуатации. Испытание проверяет конструкцию, и если машина стоит на проседающем основании, результат теряет смысл. KRANNEVA читает это как требование к основанию под опорами SANY STC400T или XCMG QY60K, которое проверяют до того, как на крюк повесят первый контрольный груз.
        </p>

        <h2 id="kak-prohodit-ispytanie">Как идёт испытание на площадке</h2>
        <p>
          Статическое испытание по пунктам 171 и 175 идёт в шесть шагов. Тормоза отрегулированы по РЭ на момент из паспорта, ограничитель грузоподъёмности отключён, стрела стоит в положении наименьшей расчётной устойчивости. Затем груз в 125 % поднимают на 50–100 мм, выдерживают 10 минут и осматривают металлоконструкции. Остаточные деформации замеряют по оголовку стрелы в порядке пункта 172. Различие между статическим и динамическим испытанием разобрано на странице <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">про 125 % и 110 %</Link>.
        </p>

        <h2 id="chego-net">Чего пункт 175 не определяет</h2>
        <p>
          Пункт 175 не называет ни допустимый уклон в градусах, ни плотность грунта, ни размеры площадки, ни материал основания под опорами. Эти числа у SANY STC400T и XCMG QY60K записаны в руководствах изготовителя, и KRANNEVA их не переписывает на сайт. Для площадок на слабых основаниях Петербурга отдельные требования описаны на странице <Link href="/obekty/slabye-grunty-i-torfyaniki/">про слабые грунты и торфяники</Link>, а правило подкладок и опор — на странице <Link href="/obekty/pozharnyy-proezd-i-opory-krana/">про опоры крана</Link>.
        </p>

        <h2 id="kto-gotovit">Кто готовит площадку и что просит заказчик</h2>
        <p>
          Пункт 175 исполнителя не назначает, поэтому в договоре аренды это нужно записать явно: при испытании на базе арендодателя площадка его, при испытании на объекте заказчика — предмет согласования. Пункт 183 при этом возлагает на эксплуатирующую организацию обеспечение комплекта контрольных грузов с указанной фактической массой. KRANNEVA в заявке на смену просит уточнить, проходит ли освидетельствование на объекте, и сроки очередных испытаний сверяет по <Link href="/obekty/tehnicheskoe-osvidetelstvovanie-krana-v-pasporte/">записи в паспорте</Link>. Распределение площадки между сторонами — вывод KRANNEVA, не норма пункта.
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
        date={FACT_CHECK_W205}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 171, 172, 175, 183 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 171, 175 и 183 ФНП № 461. Числа плотности грунта и уклона пункт не называет; распределение подготовки площадки между арендодателем и заказчиком — толкование KRANNEVA."
      />
    </main>
  );
}
