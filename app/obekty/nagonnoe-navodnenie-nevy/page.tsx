import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W164, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 164. Сорок третий тип объекта — площадка в зоне нагонного наводнения
  на Неве. Угол практический/СПб-специфика. Скелет статьи seo-2026-playbook.

  Фактура — в комментарии к FACT_CHECK_W164 в app/site-data.ts (Дирекция КЗС,
  dambaspb.ru). Пункта ФНП «остановить кран при угрозе наводнения» мы не
  проверяли и в тексте его не заявляем: остановку и вывод техники относим к
  ППР по площадке. Ветер и нагон с залива — на странице
  poberezhe-finskogo-zaliva-zimoy; здесь не дублируем.
*/

const title = "Кран на низком берегу Невы: нагонное наводнение";
const description =
  "Нагонное наводнение в Петербурге — подъём воды выше 160 см по Балтийской системе высот; при угрозе дамба закрывает 64 затвора. Как планировать смену крана.";
const h1 = "Что делать со сменой крана на низком берегу, если угрожает нагонное наводнение?";
const canonical = "/obekty/nagonnoe-navodnenie-nevy/";
const published = "2026-09-30";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const heavy = PRICE[2];

const toc = [
  { id: "uroven", label: "С какого уровня воды начинается наводнение" },
  { id: "damba", label: "Что делает комплекс защитных сооружений" },
  { id: "tablitsa", label: "Три градации опасности и что они значат для смены" },
  { id: "ppr", label: "Что закладывают в ППР для низкого берега" },
  { id: "raschet", label: "Сколько стоит простой и перенос смены" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "С какого уровня воды в Петербурге считается наводнение?",
    a: "Дирекция комплекса защитных сооружений относит к опасным наводнениям подъём воды 161–211 см, к особо опасным — 211–299 см, к катастрофическим — от 300 см; отсчёт ведётся по Балтийской системе высот. KRANNEVA использует эту шкалу как ориентир при планировании смен на низком берегу.",
  },
  {
    q: "Защищает ли дамба площадку от нагонного наводнения?",
    a: "При угрозе нагонного наводнения все 64 затвора водопропускных сооружений и два затвора судопропускных сооружений перекрываются в автоматизированном режиме. По данным Дирекции КЗС, в 2011–2018 годах предотвращено 14 нагонных наводнений, из них 7 особо опасных. Дамба снижает риск, но решение о смене принимается по ППР площадки.",
  },
  {
    q: "Нужно ли останавливать кран при угрозе подтопления?",
    a: "Решение об остановке и выводе техники с низкого берега KRANNEVA закладывает в раздел ППР по площадке, а не берёт из общей нормы: пункта ФНП № 461 с такой формулировкой мы не проверяли. В ППР записывают, при каком прогнозе смена останавливается и куда уходит машина.",
  },
  {
    q: "Кто платит за простой, если смену остановили из-за прогноза воды?",
    a: "Порядок фиксируется в заявке и договоре до выезда: KRANNEVA называет условия простоя и переноса на этапе согласования. Ставка простоя в общем прайсе не задана, поэтому её не печатаем — она оговаривается по конкретному объекту.",
  },
  {
    q: "Сколько стоит смена крана на низком берегу?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов: SANY STC400T — от ${rub(shiftTotal(light.rate))}, кран класса ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. Место размещения на возвышенности и вывод техники входят в подготовку, а не в цену часа.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Площадка в зоне нагонного наводнения на Неве", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана на площадке в зоне нагонного наводнения на Неве",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Площадка в зоне нагонного наводнения на Неве</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · нагонное наводнение</span>
          <h1>{h1}</h1>
          <p>
            В Петербурге опасным считается нагонное наводнение с подъёмом воды выше 160 см по
            Балтийской системе высот, а при угрозе комплекс защитных сооружений перекрывает 64
            затвора водопропускных и два судопропускных сооружений. KRANNEVA закладывает такой
            прогноз в ППР площадки на низком берегу: при каком уровне смена останавливается и куда
            уходит машина, решается до выезда, а не на месте.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W164} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана на низкий берег в зоне нагонного наводнения</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж и разгрузка на набережных, причалах и намывных участках невысокого рельефа, где подъём воды доходит до площадки</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{heavy.cls} — по задаче; на низком берегу дополнительно важна скорость вывода машины</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link> (гусеничный, для неукреплённых участков)</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>прогноз подъёма воды на смену и наличие маршрута вывода техники с низкого берега</td></tr>
              <tr><th scope="row">Ориентир по шкале</th><td>опасные наводнения 161–211 см, особо опасные 211–299 см, катастрофические от 300 см (Дирекция КЗС)</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>условия остановки смены и вывода техники, записанные в ППР до выезда</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(heavy.rate)}/час ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="uroven">С какого уровня воды начинается наводнение</h2>
        <p>
          Дирекция комплекса защитных сооружений Санкт-Петербурга делит нагонные наводнения на три
          градации по подъёму воды: опасные — 161–211 см, особо опасные — 211–299 см,
          катастрофические — от 300 см. Отсчёт ведётся по Балтийской системе высот. KRANNEVA берёт эту
          шкалу как язык ППР: границы 160 см достаточно, чтобы решить, работает смена на низком
          берегу или переносится.
        </p>
        <p>
          Для заказчика вывод прикладной: уровень в сантиметрах — единственный признак, который можно
          записать в документ заранее. «Штормовая погода» как условие остановки смены не работает,
          потому что не даёт числа, по которому машинист и руководитель работ принимают одинаковое
          решение.
        </p>

        <h2 id="damba">Что делает комплекс защитных сооружений</h2>
        <p>
          При угрозе нагонного наводнения Дирекция КЗС перекрывает водопропускные отверстия: все 64
          затвора водопропускных сооружений и два затвора судопропускных сооружений закрываются в
          автоматизированном режиме. За 2011–2018 годы, по данным Дирекции, предотвращено 14
          нагонных наводнений, семь из них особо опасных. Для площадки на невском берегу это снижает
          риск, но не отменяет его: дамба защищает акваторию, а не отдельную стройку.
        </p>
        <p>
          Поэтому KRANNEVA не строит график смены на обещании, что дамба закрыта. Закрытие затворов —
          сигнал, что прогноз серьёзный, и повод сверить план вывода техники, а не отмена
          осторожности. Ветер и нагон с залива как отдельный фактор разобраны на странице{" "}
          <Link href="/obekty/poberezhe-finskogo-zaliva-zimoy/">про побережье Финского залива зимой</Link>.
        </p>

        <h2 id="tablitsa">Три градации опасности и что они значат для смены</h2>
        <p>
          Градации Дирекции КЗС не являются нормой для крановых работ, но дают удобную шкалу для
          записи в ППР. Таблица KRANNEVA сопоставляет их с действием на площадке; решение по каждой
          строке принимает руководитель работ.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Градации нагонного наводнения и действие на низком берегу</caption>
            <thead>
              <tr>
                <th scope="col">Градация</th>
                <th scope="col">Подъём воды</th>
                <th scope="col">Что записывают в ППР</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Опасные</th><td>161–211 см</td><td>смена на низком берегу не начинается или прекращается, техника выводится по заранее записанному маршруту</td></tr>
              <tr><th scope="row">Особо опасные</th><td>211–299 см</td><td>площадка законсервирована, техника на возвышенности, груз на подъёме не оставляется</td></tr>
              <tr><th scope="row">Катастрофические</th><td>от 300 см</td><td>работы не планируются; порядок возврата на площадку оговаривается заказчиком после спада воды</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="ppr">Что закладывают в ППР для низкого берега</h2>
        <p>
          В ППР для низкого берега KRANNEVA просит записать три вещи: пороговый уровень воды, при
          котором смена останавливается, маршрут и время вывода машины и место её стоянки на
          возвышенности. Для неукреплённых участков вроде намывных территорий вывод особенно
          критичен: гусеничный Zoomlion QUY50 подбирают, когда точечная нагрузка колёсного автокрана
          рискованна — <Link href="/obekty/namyvnaya-territoriya/">намывная территория</Link> разобрана
          отдельно.
        </p>
        <p>
          Пункта ФНП № 461 с прямой формулировкой «остановить кран при угрозе наводнения» KRANNEVA не
          нашла и потому не ссылается на норму: остановку определяет ППР и решение руководителя
          работ. Это честнее, чем приписывать регламенту то, чего в нём не проверено. Подача по
          городу описана на странице <Link href="/obekty/">типов объектов</Link>.
        </p>

        <h2 id="raschet">Сколько стоит простой и перенос смены</h2>
        <p>
          Смена на низком берегу KRANNEVA считается по единому прайсу: SANY STC400T — {rub(light.rate)}{" "}
          × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, кран класса {heavy.cls} —{" "}
          {rub(heavy.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС. Ставка простоя
          в общем прайсе не задана, поэтому её не печатаем: условия остановки и переноса записываются
          в заявке до выезда. Порядок приёмки и оплаты — на странице{" "}
          <Link href="/dlya-zakupok/priemka-i-oplata/">приёмки и оплаты</Link>.
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
        date={FACT_CHECK_W164}
        items={[
          { href: "https://dambaspb.ru/articles/o-navodneniyah-v-sankt-peterburge", label: "Дирекция комплекса защитных сооружений Санкт-Петербурга — «О наводнениях в Санкт-Петербурге»: градации 161–211 / 211–299 / от 300 см, работа затворов" },
        ]}
        note="Градации подъёма воды — классификация Дирекции КЗС, а не норма для крановых работ. Пункта ФНП № 461 об остановке крана при угрозе наводнения мы не проверяли и не заявляем; остановку и вывод техники определяет ППР площадки. Ставку простоя не печатаем — она оговаривается по конкретному объекту."
      />
    </main>
  );
}
