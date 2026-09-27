import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W154, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 154. Тридцать третий тип объекта — действующий торговый центр.
  Угол коммерческий/сравнительный: ночная смена после закрытия ТЦ против
  дневной смены с закрытием входа и части парковки. Скелет статьи
  seo-2026-playbook.

  Фактура — Закон СПб № 273-70, ст. 1 и ст. 8 (ч. 4, 5, 7) и п. 114
  ФНП № 461; подробности — в комментарии к FACT_CHECK_W154 в
  app/site-data.ts. Надбавку за ночное время не печатаем: в прайсе сайта
  её нет, ставка в расчёте — та же, что в PRICE.
*/

const title = "Кран у торгового центра: ночная смена или дневная";
const description =
  "Монтаж краном у действующего ТЦ в Петербурге: ночью посетителей нет, но у жилых домов действует закон о тишине с 22 до 8; днём — закрытие входа и парковки.";
const h1 = "Кран у действующего торгового центра: ночная смена или дневная с закрытием зоны?";
const canonical = "/obekty/deystvuyushchiy-torgovyy-tsentr/";
const published = "2026-09-27";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const heavy = PRICE[2];

const toc = [
  { id: "dva-okna", label: "Два окна для работы крана у ТЦ" },
  { id: "noch", label: "Ночная смена и закон о тишине" },
  { id: "den", label: "Дневная смена: посетители под грузом" },
  { id: "raschet", label: "Расчёт смены и что добавляет каждое окно" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли работать краном у торгового центра ночью в Петербурге?",
    a: "Можно, если рядом нет защищаемых объектов: квартир, гостиниц, больниц и их территорий. Ст. 8 Закона Санкт-Петербурга № 273-70 наказывает строительные и погрузочно-разгрузочные работы с 22.00 до 8.00 только тогда, когда они нарушают тишину на таких объектах. KRANNEVA проверяет окружение ТЦ до выбора ночного окна.",
  },
  {
    q: "Какой штраф грозит ТЦ за ночной монтаж у жилого дома?",
    a: "Для юридического лица за строительные работы ночью — от 500 тыс. до 1 млн ₽ (ч. 5 ст. 8 Закона СПб № 273-70), за ремонтные и погрузочно-разгрузочные — от 250 до 500 тыс. ₽ (ч. 4). KRANNEVA учитывает этот риск при сравнении окон.",
  },
  {
    q: "Что нужно закрыть в ТЦ, если кран работает днём?",
    a: "Зону под траекторией груза: п. 114 ФНП № 461 запрещает перемещать груз, если под ним находятся люди. Обычно это вход или часть парковки со стороны подъёма. KRANNEVA согласует с администрацией ТЦ границы ограждения до выезда крана.",
  },
  {
    q: "Какой кран нужен для подъёма вентиляции на кровлю ТЦ?",
    a: "Зависит от массы агрегата и вылета от точки установки до места монтажа. Для лёгких блоков у фасада хватает SANY STC400T класса 25–40 т, для крупных агрегатов в глубине кровли KRANNEVA подбирает кран 81–130 т, например Liebherr LTM 1090-4.1.",
  },
  {
    q: "Действует ли запрет на шум по выходным до 12 часов для торгового центра?",
    a: "Ч. 7 ст. 8 Закона СПб № 273-70 касается действий, нарушающих тишину в многоквартирных домах в выходные с 8.00 до 12.00. Если ТЦ встроен в жилой дом или примыкает к нему, KRANNEVA не планирует шумные подъёмы на утро выходного дня.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Действующий торговый центр", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для монтажа у действующего торгового центра",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Действующий торговый центр</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · торговый центр</span>
          <h1>{h1}</h1>
          <p>
            Ночная смена у торгового центра убирает посетителей из-под груза, но в Петербурге с 22.00
            до 8.00 действует ст. 8 Закона Санкт-Петербурга № 273-70: строительные работы, мешающие
            жильцам соседних домов, стоят юрлицу от 500 тыс. до 1 млн ₽ штрафа. Дневная смена законна
            при любом окружении, но требует закрыть вход или часть парковки: п. 114 ФНП № 461 запрещает
            перемещать груз над людьми. KRANNEVA выбирает окно по тому, что стоит рядом с ТЦ.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W154} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники к действующему торговому центру</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>подъём вентиляционных агрегатов и чиллеров на кровлю, монтаж и демонтаж рекламных конструкций на фасаде, замена витражного остекления, разгрузка оборудования арендаторов</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} для фасада и края кровли; {heavy.cls} — для агрегатов в глубине кровли</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>днём — посетители под траекторией груза (п. 114 ФНП № 461); ночью — жилые дома, гостиницы и больницы рядом (ст. 8 Закона СПб № 273-70)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР со схемой ограждения опасной зоны; допуск на территорию от администрации ТЦ</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>согласование окна с администрацией и арендаторами; проверка окружения на защищаемые объекты</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(heavy.rate)}/час ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="dva-okna">Два окна для работы крана у ТЦ</h2>
        <p>
          Администрация действующего торгового центра выбирает между двумя окнами, и KRANNEVA
          сравнивает их по четырём параметрам. Ставка крана в обоих случаях одна и та же — разница
          в том, что теряет или чем рискует сам ТЦ.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Ночная и дневная смена крана у ТЦ: сравнение для заказчика</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Ночь после закрытия</th>
                <th scope="col">День в часы работы</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Люди под грузом</th><td>посетителей нет, охрана и персонал — вне ограждения</td><td>вход или часть парковки закрывают на время подъёма</td></tr>
              <tr><th scope="row">Правовой риск</th><td>ст. 8 Закона СПб № 273-70, если рядом жильё, гостиница или больница</td><td>нет — закон о тишине днём не действует</td></tr>
              <tr><th scope="row">Потери ТЦ</th><td>нет, если окружение позволяет</td><td>неудобство посетителей и арендаторов у закрытой зоны</td></tr>
              <tr><th scope="row">Когда выбирает KRANNEVA</th><td>отдельно стоящий ТЦ у магистрали или в промзоне</td><td>ТЦ встроен в жилой квартал или стоит рядом с домами</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="noch">Ночная смена и закон о тишине</h2>
        <p>
          Закон Санкт-Петербурга № 273-70 считает ночным временем период с 22.00 до 8.00 и защищает
          в это время квартиры многоквартирных домов, номера гостиниц, больницы, санатории и их
          территории. Ч. 5 ст. 8 наказывает юрлицо на 500 тыс. – 1 млн ₽ за строительные работы,
          нарушившие тишину на таких объектах, ч. 4 — на 250–500 тыс. ₽ за ремонтные и
          погрузочно-разгрузочные. KRANNEVA проверяет по карте, что стоит вокруг ТЦ, до того как
          предложить ночное окно.
        </p>
        <p>
          Торговый центр сам по себе в список защищаемых объектов Закона СПб № 273-70 не входит.
          Отдельно стоящий ТЦ у КАД или в промзоне KRANNEVA обслуживает ночью без ограничений по
          тишине, а для ТЦ в жилом квартале советует дневное окно.
        </p>

        <h2 id="den">Дневная смена: посетители под грузом</h2>
        <p>
          П. 114 ФНП № 461 запрещает перемещать груз, если под ним находятся люди, поэтому днём
          администрация ТЦ закрывает зону под траекторией подъёма. KRANNEVA заранее рисует в ППР
          границы ограждения и выбирает точку установки крана так, чтобы груз не шёл над главным
          входом.
        </p>
        <p>
          Пожарные проезды вокруг ТЦ кран KRANNEVA не занимает ни днём, ни ночью. Похожая логика
          выбора окна описана на страницах{" "}
          <Link href="/obekty/deystvuyushchaya-azs/">действующая АЗС</Link> и{" "}
          <Link href="/obekty/krovlya-deystvuyushchego-zdaniya/">кровля действующего здания</Link>.
        </p>

        <h2 id="raschet">Расчёт смены и что добавляет каждое окно</h2>
        <p>
          Расчёт KRANNEVA для одной смены по прайсу: SANY STC400T класса {light.cls} — {rub(light.rate)}{" "}
          × {MIN_SHIFT_HOURS} часов = {rub(shiftTotal(light.rate))} без НДС; кран класса {heavy.cls} —{" "}
          {rub(heavy.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))}.
        </p>
        <p>
          К ночной смене у ТЦ рядом с жильём добавляется правовой риск — штраф по ч. 5 ст. 8 Закона
          СПб № 273-70 превышает стоимость смены крана класса {heavy.cls} в семь с лишним раз. К
          дневной добавляются расходы ТЦ на ограждение и неудобство арендаторов. KRANNEVA сводит оба
          варианта в одно коммерческое предложение; для рамочного договора — раздел{" "}
          <Link href="/dlya-zakupok/">«Для закупок»</Link>.
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
        date={FACT_CHECK_W154}
        items={[
          { href: "https://peterburg-pravo.ru/zakon/2010/05/31/n-273-70/", label: "Закон Санкт-Петербурга от 31.05.2010 № 273-70 «Об административных правонарушениях в Санкт-Петербурге» — ст. 1 (ночное время, защищаемые объекты), ст. 8 ч. 4, 5, 7" },
          { href: "https://base.garant.ru/35307614/31de5683116b8d79b08fa2d768e33df6/", label: "ГАРАНТ — ст. 8 Закона СПб № 273-70 «Нарушение тишины и покоя граждан в ночное время, в выходные и праздничные дни»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), раздел «Установка ПС и производство работ» (п. 114)" },
        ]}
        note="Время тишины и штраф по ч. 5 ст. 8 сверены в двух источниках. Надбавку за ночную смену и стоимость ограждения не приводим: в прайсе KRANNEVA ставка одна, а ограждение ставит ТЦ или его подрядчик."
      />
    </main>
  );
}
