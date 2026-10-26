import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W221, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 221. Сотый тип объекта — статические испытания стрелового крана, манипулятора и вышки: чем отличаются (ФНП № 461, п. 174, 176, 178).
  Фактура — в комментарии к FACT_CHECK_W220–222 в app/site-data.ts.
*/

const title = "Статические испытания крана, манипулятора и вышки";
const description =
  "Стреловой кран испытывают в положении наибольшего момента, вышку — грузом 110 % + 40 %, манипулятор — в наибольшей грузоподъёмности (п. 174, 176, 178 ФНП).";
const h1 = "Чем статические испытания стрелового крана отличаются от испытаний манипулятора и вышки?";
const canonical = "/obekty/staticheskie-ispytaniya-strelovogo-krana-manipulyatora-i-vyshki/";
const published = "2026-10-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "strelovoy", label: "Как испытывают стреловой кран" },
  { id: "manipulyator", label: "Как испытывают манипулятор и трубоукладчик" },
  { id: "vyshka", label: "Как испытывают подъёмник с люлькой" },
  { id: "sravnenie", label: "Что общего и что разное" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "В каком положении испытывают стреловой кран с несколькими грузовыми характеристиками?",
    a: "По п. 174 ФНП № 461 — в положении, соответствующем наибольшей грузоподъёмности и (или) наибольшему грузовому моменту, если это не противоречит руководству по эксплуатации. Для кранов со сменным стреловым оборудованием испытание идёт с установленным оборудованием.",
  },
  {
    q: "Нужно ли повторять испытания после замены стрелового оборудования?",
    a: "Да. Пункт 174 прямо требует подвергать краны испытаниям после замены стрелового оборудования. Испытание проводят с тем оборудованием, которое установлено на кране.",
  },
  {
    q: "Почему на вышке грузов два — 110 % и 40 %?",
    a: "Пункт 178 задаёт схему: груз 110 % номинальной грузоподъёмности лежит в люльке, второй груз 40 % подвешен к люльке на гибкой подвеске. Подъём останавливают, когда второй груз оторвался от земли на 50–100 мм, и выдерживают суммарный груз 10 минут.",
  },
  {
    q: "Считается ли отрыв опоры вышки потерей устойчивости?",
    a: "Нет. Пункт 178 оговаривает, что отрыв от земли одной из опор подъёмника (вышки) признаком потери устойчивости при этом испытании не считается. Любые движения с грузом 150 % номинала, кроме подъёма и опускания, запрещены.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Испытания в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Статические испытания крана, манипулятора и вышки", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: подача на статические испытания стрелового крана",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Статические испытания крана, манипулятора и вышки</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как это устроено · статические испытания</span>
          <h1>{h1}</h1>
          <p>
            Статические испытания стрелового крана по п. 174 ФНП № 461 проводят в положении наибольшей грузоподъёмности или наибольшего грузового момента, манипулятора по п. 176 — в положении наибольшей грузоподъёмности на горизонтальной площадке, а вышки с люлькой по п. 178 — грузом 110 % в люльке и 40 % на гибкой подвеске. Во всех трёх случаях груз поднимают на 50–100 мм и выдерживают не меньше 10 минут; KRANNEVA учитывает это при подаче Kato NK-250E-V на площадку испытаний.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W221} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Статические испытания по типу машины (ФНП № 461, п. 174, 176, 178)</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Положение и груз</th>
                <th scope="col">Подъём и выдержка</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Стреловой кран</th><td>наибольшая грузоподъёмность и (или) наибольший грузовой момент, если не противоречит РЭ</td><td>по п. 175: 50–100 мм, 10 минут</td><td>174</td></tr>
              <tr><th scope="row">Кран-трубоукладчик, кран-манипулятор</th><td>горизонтальная площадка, положение наибольшей грузоподъёмности</td><td>50–100 мм от земли, не менее 10 минут</td><td>176</td></tr>
              <tr><th scope="row">Подъёмник (вышка) с люлькой</th><td>положение наименьшей расчётной устойчивости; 110 % в люльке + 40 % на гибкой подвеске</td><td>50–100 мм для второго груза, 10 минут</td><td>178</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача стрелового автокрана KRANNEVA на испытания</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>тип испытуемой машины, вылет, наличие сменного стрелового оборудования</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="strelovoy">Как испытывают стреловой кран</h2>
        <p>
          Пункт 174 ФНП № 461 фиксирует для стрелового крана с одной или несколькими грузовыми характеристиками положение при периодическом или внеочередном освидетельствовании: наибольшая грузоподъёмность и (или) наибольший грузовой момент, если руководство по эксплуатации не возражает. Кран со сменным стреловым оборудованием испытывают с тем оборудованием, которое на нём стоит, а после замены оборудования испытания проводят заново. Кран без механизма изменения вылета проверяют на установленных вылетах — с этими же вылетами разрешена и дальнейшая работа. Для Liebherr LTM 1090-4.1 это значит, что запись о вылете и оборудовании в паспорте важна не меньше самой грузоподъёмности.
        </p>

        <h2 id="manipulyator">Как испытывают манипулятор и трубоукладчик</h2>
        <p>
          Кран-трубоукладчик и кран-манипулятор по п. 176 устанавливают на горизонтальной площадке в положение наибольшей грузоподъёмности, поднимают груз на 50–100 мм от земли и выдерживают не менее 10 минут. После установки сменного стрелового оборудования испытание повторяют в положении наибольшей грузоподъёмности с этим оборудованием. Критерий успеха: груз не опустился, трещин, остаточных деформаций и других повреждений нет. Замеры деформаций идут по п. 172, а требования к площадке — по п. 175, они описаны на странице о <Link href="/obekty/ploshchadka-dlya-ispytaniy-krana-grunt-i-uklon/">площадке для испытаний</Link>.
        </p>

        <h2 id="vyshka">Как испытывают подъёмник с люлькой</h2>
        <p>
          Подъёмник (вышку) с люлькой пункт 178 испытывает по особой схеме: груз 110 % номинальной грузоподъёмности лежит в люльке, второй груз 40 % висит на гибкой подвеске. Подъём останавливают, когда второй груз оторвался от земли на 50–100 мм, и держат суммарный груз 10 минут. Отрыв одной из опор не считается потерей устойчивости, а любые движения с грузом 150 % номинала, кроме подъёма и опускания, запрещены. Эта схема относится к самому подъёмнику; стреловой автокран KRANNEVA испытывается по п. 174, а не по п. 178.
        </p>

        <h2 id="sravnenie">Что общего и что разное</h2>
        <p>
          Три пункта ФНП № 461 сходятся в двух параметрах: подъём на 50–100 мм и выдержка не менее 10 минут. Различаются положение, состав груза и условие успеха: у вышки в нормативе говорится о повреждениях металлоконструкций, у крана и манипулятора — ещё и о трещинах и остаточных деформациях. Процент испытательного груза для стрелового крана и манипулятора пункты 174 и 176 прямо не называют, поэтому KRANNEVA не пишет «125 %» без ссылки; значение для крана читают в <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">статье о статических и динамических испытаниях</Link>.
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
        date={FACT_CHECK_W221}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 172, 174–176, 178 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 174, 176 и 178 ФНП № 461. Процент испытательного груза для стрелового крана и манипулятора эти пункты не называют, и мы его здесь не приводим. Подача автокрана KRANNEVA как источника груза — практика компании, а не норма."
      />
    </main>
  );
}
