import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W175, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 175. Пятьдесят четвёртый тип объекта — несколько коротких подъёмов
  на одном или соседних адресах. Угол коммерческий/сравнительный.

  Без новых внешних источников: единственные числа — ставки PRICE и
  минимальная смена MIN_SHIFT_HOURS; остальное — арифметика на странице.
  Условия учёта времени («время в пути к объекту и обратно не
  тарифицируется», простой по вине заказчика отдельной строкой в рапорте)
  взяты из таблицы условий на главной. Правило переезда между адресами
  внутри одной смены в публичных условиях не прописано — страница так и
  говорит и не выдумывает его.
*/

const title = "Несколько подъёмов в одну смену или отдельные выезды крана";
const description =
  "Три выезда автокрана по 8 часов стоят втрое больше одной смены. Считаем по прайсу, когда подъёмы выгодно собрать в одну смену, а когда нет.";
const h1 = "Что выгоднее: несколько подъёмов в одну смену или отдельные выезды крана?";
const canonical = "/obekty/neskolko-podemov-v-odnu-smenu/";
const published = "2026-10-04";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];
const heavy = PRICE[2];

const toc = [
  { id: "pochemu", label: "Почему короткий выезд стоит как смена" },
  { id: "arifmetika", label: "Сколько стоят один, два и три выезда" },
  { id: "tyazhelyy", label: "Подъёмы разных классов: когда хватает одного крана" },
  { id: "kogda-ne-sobirat", label: "Когда подъёмы не стоит собирать в одну смену" },
  { id: "zayavka", label: "Что указать в заявке" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Почему короткий подъём на 2 часа оплачивается как полная смена?",
    a: `Минимальная оплачиваемая смена KRANNEVA — ${MIN_SHIFT_HOURS} часов на объекте. Кран и экипаж выделяются на всю смену, поэтому два часа работы не отменяют остальные шесть часов занятости техники. Время в пути к объекту и обратно при этом не тарифицируется.`,
  },
  {
    q: "Сколько стоят три отдельных выезда крана 25–40 т?",
    a: `Три смены по ${rub(shiftTotal(light.rate))} — ${rub(shiftTotal(light.rate) * 3)} без НДС. Одна смена, в которую уложились все три подъёма, стоит ${rub(shiftTotal(light.rate))}, то есть разница равна ${rub(shiftTotal(light.rate) * 2)}.`,
  },
  {
    q: "Можно ли в одну смену объехать несколько адресов?",
    a: "Правило переезда между адресами внутри одной смены в публичных условиях KRANNEVA не прописано, поэтому его согласуют в заявке заранее — вместе с маршрутом и допусками на каждый адрес. Для каждого адреса отдельно проверяются пропуск, охранный статус территории и доступ техники.",
  },
  {
    q: "Если на одной площадке нужен и лёгкий, и тяжёлый подъём, брать два крана?",
    a: `Часто хватает одного: если кран класса ${heavy.cls} приезжает ради тяжёлого подъёма, его смена уже оплачена, и лёгкие подъёмы в те же часы не требуют второй машины. Второй кран ${light.cls} добавит ещё ${rub(shiftTotal(light.rate))}, но может быть нужен, если подъёмы идут одновременно в разных точках.`,
  },
  {
    q: "Как фиксируется простой, если подъёмы переносятся?",
    a: "Сменный рапорт подписывается на объекте представителем заказчика в день работы. Простой по вине заказчика фиксируется в рапорте отдельной строкой — поэтому порядок подъёмов лучше согласовать до начала смены.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Несколько подъёмов в одну смену", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана на смену для нескольких подъёмов на одном объекте",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Несколько подъёмов в одну смену</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · несколько подъёмов</span>
          <h1>{h1}</h1>
          <p>
            Три отдельных выезда крана {light.cls} стоят {rub(shiftTotal(light.rate) * 3)} без НДС,
            одна смена с теми же тремя подъёмами — {rub(shiftTotal(light.rate))}, потому что
            минимальная смена KRANNEVA равна {MIN_SHIFT_HOURS} часам независимо от того, сколько из них
            кран поднимает груз. Выигрыш реален, пока подъёмы укладываются в смену и не требуют
            разных классов в разных точках одновременно.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W175} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Один выезд, два и три: стоимость по классам KRANNEVA, без НДС</caption>
            <thead>
              <tr>
                <th scope="col">Класс</th>
                <th scope="col">Один выезд</th>
                <th scope="col">Два выезда</th>
                <th scope="col">Три выезда</th>
              </tr>
            </thead>
            <tbody>
              {[light, mid, heavy].map((p) => (
                <tr key={p.cls}>
                  <th scope="row">{p.cls} ({p.models.split(",")[0]})</th>
                  <td className="dtable__num">{rub(shiftTotal(p.rate))}</td>
                  <td className="dtable__num">{rub(shiftTotal(p.rate) * 2)}</td>
                  <td className="dtable__num">{rub(shiftTotal(p.rate) * 3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="pochemu">Почему короткий выезд стоит как смена</h2>
        <p>
          Минимальная оплачиваемая смена KRANNEVA — {MIN_SHIFT_HOURS} часов на объекте, и это
          основание всех расчётов на сайте. Кран и экипаж занимаются на всю смену, поэтому
          подъём на два часа и подъём на восемь часов оплачиваются одинаково, если вся работа
          укладывается в минимум. Время в пути к объекту и обратно в смену не входит и отдельно
          не тарифицируется.
        </p>
        <p>
          Следствие для заказчика KRANNEVA: платить за короткие подъёмы по отдельности невыгодно, пока их
          можно собрать. Подъёмы, которые заказчик сам разнёс на разные дни — например,
          монтаж блока в понедельник и вывоз упаковки в четверг, — это отдельные смены с
          отдельным подтверждением даты, допусками и подачей техники.
        </p>

        <h2 id="arifmetika">Сколько стоят один, два и три выезда</h2>
        <p>
          По ставке {light.cls} ({light.models}) один выезд стоит {rub(light.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, два — {rub(shiftTotal(light.rate) * 2)}, три —{" "}
          {rub(shiftTotal(light.rate) * 3)}. Для класса {mid.cls} ({mid.models.split(",")[0]}) те же
          три выезда составляют {rub(shiftTotal(mid.rate) * 3)}, для класса {heavy.cls} —{" "}
          {rub(shiftTotal(heavy.rate) * 3)}. Таблица выше собрана из того же прайса KRANNEVA, что
          и расчёт на главной странице.
        </p>
        <p>
          Разница между тремя выездами и одной сменой в прайсе KRANNEVA — две полные ставки смены: {rub(shiftTotal(light.rate) * 2)}{" "}
          для {light.cls}, {rub(shiftTotal(mid.rate) * 2)} для {mid.cls}, {rub(shiftTotal(heavy.rate) * 2)} для{" "}
          {heavy.cls}. Это цена, которую заказчик платит за то, что не договорился о порядке
          подъёмов заранее.
        </p>

        <h2 id="tyazhelyy">Подъёмы разных классов: когда хватает одного крана</h2>
        <p>
          Если на площадке один подъём требует кран класса {heavy.cls}, а остальные подъёмы
          лёгкие, второй кран часто не нужен. Liebherr LTM 1090-4.1 или Liebherr LTM 1130-5.1,
          приехавшие ради тяжёлого подъёма, уже оплачены на всю смену — и в её оставшиеся часы
          могут поднять лёгкие грузы, если те лежат в пределах вылета машины.
        </p>
        <p>
          KRANNEVA подбирает класс по вылету, а не по тоннажу: тот же принцип разобран на страницах{" "}
          <Link href="/obekty/montazh-liftovogo-oborudovaniya/">монтажа лифтового оборудования</Link> и{" "}
          <Link href="/obekty/montazh-tyazhelogo-oborudovaniya/">тяжёлого оборудования</Link>:
          грузоподъёмность на нужном вылете берут из грузовой таблицы конкретной машины.
          Если подъёмы идут одновременно в разных точках, нужны два крана — этот случай разобран
          на странице <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">двух кранов на одной площадке</Link>.
        </p>

        <h2 id="kogda-ne-sobirat">Когда подъёмы не стоит собирать в одну смену</h2>
        <p>
          KRANNEVA не советует собирать подъёмы в одну смену, если их суммарное время превышает{" "}
          {MIN_SHIFT_HOURS} часов: тогда время сверх минимума выходит за рамки одной смены, а
          экипаж работает с нагрузкой, которую заказчик сам не планировал. Лучше разделить
          подъёмы на две смены, чем растягивать одну до конца светового дня.
        </p>
        <p>
          Не стоит собирать и подъёмы с разными режимами допуска. Если один адрес находится в
          зоне ограничений — например, под охраной КГИОП, у школы или на проезжей части, — а
          другой на обычной площадке, KRANNEVA оформляет допуски на каждый адрес отдельно,
          и общий срок определяет самый долгий из них. Правило переезда между адресами внутри
          одной смены в публичных условиях не прописано и согласуется в заявке.
        </p>

        <h2 id="zayavka">Что указать в заявке</h2>
        <p>
          В заявке на несколько подъёмов KRANNEVA просит перечень грузов с размерами и
          ориентировочной массой, их точки установки и точки забора относительно оси крана, а
          также порядок подъёмов. По этому перечню диспетчер определяет класс машины и
          проверяет, помещаются ли подъёмы в {MIN_SHIFT_HOURS} часов. Массу оборудования
          указывает его поставщик по паспорту — KRANNEVA типовых масс не использует.
        </p>
        <p>
          Если порядок подъёмов может измениться в день работы, лучше сказать об этом в
          заявке: простой по вине заказчика фиксируется в сменном рапорте отдельной строкой и
          оплачивается по ставке смены. Итоговую стоимость по вашему адресу фиксирует коммерческое
          предложение — расчёт на странице показывает порядок цифр, а не оферту.
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
        date={FACT_CHECK_W175}
        items={[
          { href: "/", label: "KRANNEVA — условия договора и расчётов: минимальная смена, учёт времени, простой по вине заказчика (главная страница, раздел «Условия»)" },
          { href: "/park/", label: "KRANNEVA — спецификации парка: вылет и высота подъёма по каждой машине" },
        ]}
        note="Страница использует только ставки и условия KRANNEVA, поэтому внешних нормативных источников у неё нет. Правило переезда между адресами внутри одной смены и тарификация времени сверх восьми часов в публичных условиях не раскрыты и страница их не выдумывает. Массу и размеры грузов страница числом не называет — это данные поставщика оборудования."
      />
    </main>
  );
}
