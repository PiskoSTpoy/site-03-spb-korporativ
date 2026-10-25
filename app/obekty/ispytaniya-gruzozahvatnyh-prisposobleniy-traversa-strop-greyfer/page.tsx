import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W218, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 218. Девяносто седьмой тип объекта — испытания грузозахватных приспособлений: многоветвевой строп, специальное приспособление, грейфер (ФНП № 461, п. 229–234).
  Фактура — в комментарии к FACT_CHECK_W217–219 в app/site-data.ts.
*/

const title = "Испытания траверсы, строп и грейфера: нагрузка 125 %";
const description =
  "Грузозахватное приспособление испытывают нагрузкой на 25 % выше грузоподъёмности: подъём на 50–100 мм, выдержка 10 минут (п. 232 ФНП). Сравнение для KRANNEVA.";
const h1 = "Как испытывают траверсу, многоветвевой строп и грейфер перед работой с краном?";
const canonical = "/obekty/ispytaniya-gruzozahvatnyh-prisposobleniy-traversa-strop-greyfer/";
const published = "2026-10-25";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "obshchee", label: "Общий порядок статических испытаний" },
  { id: "sravnenie", label: "Строп, спецприспособление и грейфер: чем отличаются" },
  { id: "primer", label: "Пример расчёта нагрузки" },
  { id: "rezultat", label: "Результат и акт" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой нагрузкой испытывают грузозахватное приспособление?",
    a: "По п. 232 ФНП № 461 приспособление испытывают статической нагрузкой, превышающей его грузоподъёмность на 25 %. Груз поднимают с малыми ускорениями на 50–100 мм и выдерживают не менее 10 минут.",
  },
  {
    q: "Под каким углом испытывают многоветвевой строп?",
    a: "Пункт 230 требует располагать ветви под углом 90 градусов по вертикали друг к другу. Другой угол допускается с пересчётом испытательных нагрузок.",
  },
  {
    q: "Как испытывают грейфер?",
    a: "Пункт 231 предписывает симметричное нагружение челюстей испытательным грузом. Если груза не хватает, часть предварительно взвешенной массы кладут внутрь грейфера, а добавку подвешивают к челюстям снизу; схема указывается в руководстве по эксплуатации.",
  },
  {
    q: "Когда приспособление не допускают к работе?",
    a: "Если после снятия нагрузки обнаружена остаточная деформация, приспособление к работе не допускают (п. 233). Результаты испытаний оформляют актом или протоколом (п. 234); при отрицательном итоге изделие направляют в ремонт или на утилизацию.",
  },
  {
    q: "Допустимо ли отклонение массы испытательного груза?",
    a: "Для специальных приспособлений, которые нельзя зацепить за испытательные грузы, п. 231 допускает отклонение по массе не более 3 %. Масса самих изделий при этом входит в испытательный груз.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Испытания приспособлений в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Испытания траверсы, строп и грейфера", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: сверка испытаний грузозахватных приспособлений перед подачей",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Испытания траверсы, строп и грейфера</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Сравнение · грузозахватные приспособления</span>
          <h1>{h1}</h1>
          <p>
            Грузозахватное приспособление испытывают статической нагрузкой на 25 % выше его грузоподъёмности: груз поднимают на 50–100 мм и выдерживают не менее 10 минут (п. 232 ФНП № 461). Для многоветвевого стропа добавлено условие по углу между ветвями, для грейфера — симметричное нагружение челюстей. KRANNEVA при подаче Zoomlion QUY50 сверяет акты на такие изделия до выезда, потому что траверса без действующего акта не подвешивается к крюку.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W218} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Как испытывают разные грузозахватные приспособления (ФНП № 461, п. 230–232)</caption>
            <thead>
              <tr>
                <th scope="col">Изделие</th>
                <th scope="col">Как нагружают</th>
                <th scope="col">Особое условие</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Многоветвевой строп</th><td>на 25 % выше грузоподъёмности, подъём на 50–100 мм, выдержка от 10 минут</td><td>ветви под 90° по вертикали друг к другу; другой угол — с пересчётом нагрузок</td><td>230, 232</td></tr>
              <tr><th scope="row">Специальное приспособление, не цепляемое за испытательные грузы</th><td>испытательный груз присоединяют по схеме из инструкции по испытаниям</td><td>масса изделий входит в груз; отклонение массы не более 3 %</td><td>231</td></tr>
              <tr><th scope="row">Грейфер</th><td>симметричное нагружение челюстей</td><td>часть груза — внутрь грейфера, добавка подвешена к челюстям снизу</td><td>231</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с проверкой актов на приспособления</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что сверяют до выезда</th><td>акт или протокол испытаний траверсы, стропов, грейфера</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="obshchee">Общий порядок статических испытаний</h2>
        <p>
          Порядок статических испытаний грузозахватного приспособления по п. 232 ФНП № 461 состоит из двух действий: испытательный груз с малыми ускорениями поднимают на 50–100 мм и выдерживают не менее 10 минут, затем опускают на площадку. Нагрузка превышает грузоподъёмность приспособления на 25 %. Пункт 229 оставляет необходимость, условия и способы испытаний за эксплуатационной документацией изготовителя, поэтому для траверсы под Liebherr LTM 1130-5.1 нормой служит и ФНП, и паспорт изделия, и KRANNEVA сверяет оба документа. О том, чья это забота при аренде, рассказывает страница о <Link href="/obekty/stropy-i-traversy-zakazchika-ili-arendodatelya/">стропах и траверсах заказчика или арендодателя</Link>.
        </p>

        <h2 id="sravnenie">Строп, спецприспособление и грейфер: чем отличаются</h2>
        <p>
          Три вида приспособлений по п. 230–231 ФНП № 461 различаются не величиной нагрузки, а способом её приложения. У многоветвевого стропа п. 230 фиксирует угол 90 градусов между ветвями по вертикали и разрешает иной угол с пересчётом. У специального приспособления, к которому нельзя зацепить испытательные грузы, п. 231 требует схему надёжного присоединения груза и допускает отклонение по массе до 3 %. У грейфера нагружают симметрично челюсти, причём схема подвешивания берётся из руководства по эксплуатации. KRANNEVA при работе XCMG QY60K с грейфером требует именно такой акт, а не общий протокол на «такелаж».
        </p>

        <h2 id="primer">Пример расчёта нагрузки</h2>
        <p>
          Испытательная нагрузка по п. 232 ФНП № 461 для приспособления грузоподъёмностью 10 тонн равна 12,5 тонны: 10 × 1,25. Для траверсы на 16 тонн получается 20 тонн. Это арифметика по формуле пункта; проверка массы груза и его присоединения остаётся за организацией, которая проводит испытания. Если у изделия иная грузоподъёмность, значение берут из паспорта, а расчёт повторяют с тем же коэффициентом. Сам коэффициент 125 % совпадает с нагрузкой статических испытаний самого крана, о которых идёт речь на странице о <Link href="/obekty/staticheskie-i-dinamicheskie-ispytaniya-125-i-110/">статических и динамических испытаниях 125 % и 110 %</Link>.
        </p>

        <h2 id="rezultat">Результат и акт</h2>
        <p>
          Результат статических испытаний по п. 233–234 ФНП № 461 оценивают после снятия нагрузки: остаточная деформация закрывает изделию допуск к работе. Испытания прекращают или приостанавливают при аварийной ситуации, угрожающей людям, а продолжают только после устранения причин. Акт или протокол при положительном итоге подтверждает, что приспособление выдержало испытания и соответствует паспорту и РЭ; при отрицательном — фиксирует дефекты и вероятные причины, а изделие уходит в ремонт или на утилизацию; такое изделие KRANNEVA к крюку не подвешивает. Браковку стропов в эксплуатации ведут по другим пунктам: см. <Link href="/obekty/brakovka-stropov-kanatnyy-tsepnoy-ili-tekstilnyy/">браковку стропов канатных, цепных и текстильных</Link>.
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
        date={FACT_CHECK_W218}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 229–234 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 229–234 ФНП № 461. Пример с грузоподъёмностью 10 и 16 тонн — арифметика по формуле пункта, не данные конкретного изделия. Что KRANNEVA сверяет акты на приспособления до выезда — практика компании, а не норма."
      />
    </main>
  );
}
