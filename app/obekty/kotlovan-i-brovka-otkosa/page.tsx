import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W159, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 159. Тридцать восьмой тип объекта — котлован и бровка откоса. Угол
  информационный/how-to: отступ опоры крана от основания откоса выемки.
  Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W159 в app/site-data.ts.
  Таблица 2 Приложения № 1 ФНП № 461 действует ТОЛЬКО для ненасыпного грунта;
  для насыпного и слабого печатать числа нельзя — устойчивость откоса и вылет
  опор считает ППР по данным изысканий. Поэтому на слабых грунтах дельты Невы
  таблица — не ответ, а причина заказать расчёт.
*/

const title = "Кран у котлована в Петербурге: отступ опор";
const description =
  "Отступ опоры автокрана от бровки котлована: Таблица 2 ФНП № 461 для ненасыпного грунта и почему на слабых грунтах дельты Невы нужен расчёт ППР.";
const h1 = "На какое расстояние отставить кран от края котлована?";
const canonical = "/obekty/kotlovan-i-brovka-otkosa/";
const published = "2026-09-29";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-zadaet", label: "Что задаёт отступ опоры от котлована" },
  { id: "tablica", label: "Таблица отступа по глубине и грунту" },
  { id: "nasypnoy", label: "Насыпной и слабый грунт: таблица не работает" },
  { id: "raschet", label: "Сколько стоит смена крана у котлована" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "На каком расстоянии от котлована можно ставить автокран?",
    a: "Отступ опоры от основания откоса задаёт Таблица 2 Приложения № 1 ФНП № 461 для ненасыпного грунта: при глубине 2 м это 3,0 м на песчаном грунте и 1,5 м на глинистом, при 5 м — 6,0 м и 3,5 м соответственно. KRANNEVA берёт глубину и вид грунта из отчёта изысканий по площадке.",
  },
  {
    q: "От какой точки котлована считается расстояние?",
    a: "Расстояние в Таблице 2 ФНП № 461 отсчитывается от основания откоса — нижней линии выемки, а не от верхней бровки — до оси ближайшей опоры крана. KRANNEVA сверяет геометрию откоса с разрезом котлована в ППР, потому что при пологом откосе верхняя бровка уходит от опоры дальше, чем кажется с уровня площадки.",
  },
  {
    q: "Что делать, если грунт вокруг котлована насыпной?",
    a: "Для насыпного грунта Таблица 2 Приложения № 1 ФНП № 461 не применяется: расстояние до опоры определяет расчёт в ППР по данным изысканий. На слабых грунтах дельты Невы KRANNEVA не подтверждает выезд по табличному числу — нужны отчёт об инженерных изысканиях и подготовленное основание под опоры.",
  },
  {
    q: "Можно ли поставить опору крана на край котлована с распорной крепью?",
    a: "При закреплённых стенках котлована расстояние определяет проект крепления и ППР, а не Таблица 2 ФНП № 461: таблица дана для незакреплённого откоса. KRANNEVA работает по разрезу из ППР, где показаны крепь, нагрузка от опоры и её вынос за пределы призмы обрушения.",
  },
  {
    q: "Сколько стоит смена крана на работах у котлована?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов: SANY STC400T — от ${rub(shiftTotal(light.rate))}, XCMG QY60K — от ${rub(shiftTotal(mid.rate))} без НДС. Класс KRANNEVA подбирает по массе груза и вылету от безопасной точки установки, а не от края котлована.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Котлован и бровка откоса", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для работ у котлована с отступом опор от бровки откоса",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Котлован и бровка откоса</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · котлован</span>
          <h1>{h1}</h1>
          <p>
            Опору автокрана отставляют от основания откоса котлована на расстояние из Таблицы 2
            Приложения № 1 ФНП № 461: для ненасыпного грунта при глубине 2 м это от 1,5 м на
            глинистом грунте до 3,0 м на песчаном, при глубине 5 м — от 3,5 до 6,0 м. KRANNEVA
            берёт глубину и вид грунта из отчёта изысканий, а на насыпных и слабых грунтах дельты
            Невы табличное число заменяет расчётом ППР: там устойчивость откоса под нагрузкой от
            опоры считают, а не читают из таблицы.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W159} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана на работы у котлована</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>подача арматуры, опалубки и бадей с бетоном в котлован, монтаж элементов крепления стенок, разгрузка труб и колодцев у бровки, извлечение бытовок и оборудования из выемки</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls} — по массе груза на вылете от безопасной точки установки, а не от края котлована</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>; на слабом грунте — гусеничный <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>отступ опоры от основания откоса (Таблица 2 Приложения № 1 ФНП № 461) и, как следствие, вылет до точки монтажа</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР с разрезом котлована, отметкой глубины, видом грунта и вылетом опор за пределы призмы обрушения (п. 98 ФНП № 461)</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>наличие отчёта об инженерных изысканиях: без вида грунта и глубины отступ опоры не подтверждается</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-zadaet">Что задаёт отступ опоры от котлована</h2>
        <p>
          Отступ опоры крана от котлована задаёт не удобство монтажа, а призма обрушения грунта:
          нагрузка от выносной опоры не должна попадать в неустойчивый клин у откоса. ФНП № 461
          закрывает это Таблицей 2 Приложения № 1 для ненасыпного грунта и требованием п. 98 вести
          работы в стеснённых условиях и над откосами по ППР. KRANNEVA получает от проектировщика
          разрез котлована и по нему выносит точку установки за призму обрушения.
        </p>
        <p>
          Точку отсчёта ФНП № 461 задаёт однозначно: расстояние меряется от основания откоса —
          нижней линии выемки — до оси ближайшей опоры крана. При пологом откосе верхняя бровка
          отходит от опоры дальше самой опасной точки, и заказчик, который меряет «от края ямы»,
          ставит кран ближе, чем разрешено. KRANNEVA сверяет геометрию по разрезу, а не по виду
          площадки сверху.
        </p>

        <h2 id="tablica">Таблица отступа по глубине и грунту</h2>
        <p>
          Расстояние по Таблице 2 Приложения № 1 ФНП № 461 растёт с глубиной котлована и падает с
          прочностью грунта: самый большой отступ нужен на песчаном грунте, самый малый — на
          глинистом. KRANNEVA сводит таблицу целиком, чтобы заказчик подставил свою глубину и вид
          грунта из изысканий и сразу увидел минимальный вынос опоры.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Минимальное расстояние от основания откоса до оси опоры крана, м (ненасыпной грунт; Таблица 2 Приложения № 1 ФНП № 461)</caption>
            <thead>
              <tr>
                <th scope="col">Глубина котлована</th>
                <th scope="col">Песчаный и гравийный</th>
                <th scope="col">Супесчаный</th>
                <th scope="col">Суглинистый</th>
                <th scope="col">Глинистый</th>
                <th scope="col">Лёссовый сухой</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">1 м</th><td className="dtable__num">1,5</td><td className="dtable__num">1,25</td><td className="dtable__num">1,0</td><td className="dtable__num">1,0</td><td className="dtable__num">1,0</td></tr>
              <tr><th scope="row">2 м</th><td className="dtable__num">3,0</td><td className="dtable__num">2,4</td><td className="dtable__num">2,0</td><td className="dtable__num">1,5</td><td className="dtable__num">2,0</td></tr>
              <tr><th scope="row">3 м</th><td className="dtable__num">4,0</td><td className="dtable__num">3,6</td><td className="dtable__num">3,25</td><td className="dtable__num">1,75</td><td className="dtable__num">2,5</td></tr>
              <tr><th scope="row">4 м</th><td className="dtable__num">5,0</td><td className="dtable__num">4,4</td><td className="dtable__num">4,0</td><td className="dtable__num">3,0</td><td className="dtable__num">3,0</td></tr>
              <tr><th scope="row">5 м</th><td className="dtable__num">6,0</td><td className="dtable__num">5,3</td><td className="dtable__num">4,75</td><td className="dtable__num">3,5</td><td className="dtable__num">3,5</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Отступ по Таблице 2 ФНП № 461 переводится в вылет: чем дальше опора от котлована, тем
          больше расстояние до точки монтажа и тем выше нужный класс крана. KRANNEVA считает вылет
          от безопасной точки установки — например, при котловане 4 м на суглинке опора уходит на
          4,0 м от основания откоса, и эти метры прибавляются к пролёту до груза. Поэтому у котлована
          класс машины определяется отступом, а не только массой.
        </p>

        <h2 id="nasypnoy">Насыпной и слабый грунт: таблица не работает</h2>
        <p>
          Насыпной грунт выводит Таблицу 2 Приложения № 1 ФНП № 461 из игры: заголовок таблицы прямо
          ограничивает её ненасыпным грунтом, а для насыпного расстояние до опоры определяет расчёт
          в ППР. В Петербурге это не редкий случай, а норма: значительная часть площадок в дельте
          Невы стоит на насыпных и текучих грунтах, где табличное число завышает устойчивость откоса.
          KRANNEVA на таких площадках не подтверждает выезд по таблице.
        </p>
        <p>
          Слабый грунт добавляет второе ограничение — несущую способность под самой опорой. Опору
          автокрана на текучих ленточных глинах и плывунных песках ставят только на подготовленное
          основание (п. 108 ФНП № 461), а при сомнениях KRANNEVA предлагает гусеничный Zoomlion QUY50
          с распределённой нагрузкой на грунт. Порядок работы на таких площадках разобран на странице{" "}
          <Link href="/obekty/slabye-grunty-i-torfyaniki/">площадка на слабых грунтах и торфе</Link>,
          а работа впритык к стене котлована рядом со зданием —{" "}
          <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">кран вплотную к соседнему зданию</Link>.
        </p>

        <h2 id="raschet">Сколько стоит смена крана у котлована</h2>
        <p>
          Стоимость смены у котлована KRANNEVA считает по единому прайсу: SANY STC400T —{" "}
          {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, XCMG QY60K —{" "}
          {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС. Отдельной наценки
          «за котлован» в прайсе нет: класс машины поднимает не сам котлован, а увеличенный вылет от
          отставленной опоры до точки монтажа.
        </p>
        <p>
          Выгоднее всего кран KRANNEVA работает у котлована, когда ППР с разрезом и данными изысканий
          готов до выезда: тогда точка установки и вылет известны заранее, и смену не тратят на замеры
          по месту. Условия договора и оформление для закупок — в разделе{" "}
          <Link href="/dlya-zakupok/">для закупок</Link>.
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
        date={FACT_CHECK_W159}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/", label: "ФНП «Правила безопасности ОПО, на которых используются подъёмные сооружения» (приказ Ростехнадзора от 26.11.2020 № 461, ред. 16.04.2026) — пп. 98, 108, 109, 133" },
          { href: "https://sudact.ru/law/prikaz-rostekhnadzora-ot-26112020-n-461-ob/federalnye-normy-i-pravila-v/prilozhenie-n-1/tablitsa-2_1/", label: "ФНП № 461, Приложение № 1, Таблица 2 — минимальное расстояние от основания откоса котлована до оси ближайших опор крана при ненасыпном грунте" },
          { href: "https://minstroyrf.gov.ru/docs/", label: "Минстрой России — раздел нормативных документов (СП по земляным работам и устойчивости откосов)" },
        ]}
        note="Числа Таблицы 2 сверены в двух публикациях (consultant.ru и sudact.ru), значения совпали. Таблица действует только для ненасыпного грунта: для насыпного и слабого грунта расстояние до опоры и вылет определяет расчёт ППР по данным инженерных изысканий — «типовых» чисел по такому грунту не приводим."
      />
    </main>
  );
}
