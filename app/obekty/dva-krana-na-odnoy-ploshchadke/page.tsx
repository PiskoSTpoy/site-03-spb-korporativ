import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W162, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 162. Сорок первый тип объекта — два крана на одной площадке.
  Угол информационный/how-to. Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W162 в app/site-data.ts.
  Важно: числового расстояния между двумя кранами в ФНП № 461 нет (проверено
  на consultant.ru), поэтому здесь его не печатаем — схему даёт ППР.
  П. 127 — про совместный ПОДЪЁМ одного груза; работу двух кранов рядом без
  общего груза регулируют пп. 98, 109, 133 и ППР. Эти два случая не смешиваем.
*/

const title = "Два крана на одной площадке: что требует ФНП";
const description =
  "Два автокрана на одной площадке: совместный подъём разрешён только по ППР или ТК (п. 127 ФНП № 461), нагрузка на каждый кран — не выше его грузоподъёмности.";
const h1 = "Можно ли ставить два крана на одну площадку и поднимать груз вдвоём?";
const canonical = "/obekty/dva-krana-na-odnoy-ploshchadke/";
const published = "2026-09-30";

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
  { id: "dva-sluchaya", label: "Два разных случая: работа рядом и совместный подъём" },
  { id: "p127", label: "Что говорит п. 127 о совместном подъёме" },
  { id: "ryadom", label: "Два крана рядом без общего груза" },
  { id: "tablitsa", label: "Сравнение трёх схем работы" },
  { id: "raschet", label: "Сколько стоит вторая машина в смене" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли поднять один груз двумя кранами?",
    a: "Да, но только по проекту производства работ или технологической карте. Пункт 127 ФНП № 461 разрешает подъём и перемещение груза несколькими подъёмными сооружениями только по ППР или ТК, а нагрузка на каждое из них не должна превышать его грузоподъёмность. KRANNEVA берёт такой подъём в работу после получения ППР с разбивкой нагрузки по машинам.",
  },
  {
    q: "Какое минимальное расстояние между двумя автокранами на площадке?",
    a: "Числового расстояния между двумя кранами в ФНП № 461 нет: проверка текста раздела «Установка ПС и производство работ» на consultant.ru такого пункта не выявила. Безопасные зазоры между машинами, стрелами и грузом задаёт ППР по конкретной площадке. Общее требование пункта 109 — зазор не менее 1 м от поворотной части крана до строений и предметов.",
  },
  {
    q: "Нужен ли кран с координатной защитой, если краны работают рядом?",
    a: "Нужен, если площадка относится к стеснённым условиям. Пункт 133 ФНП № 461 не допускает работу в стеснённых условиях краном без координатной защиты, настроенной по ППР или ТК. KRANNEVA заранее выясняет, относит ли ППР площадку к стеснённым, и подбирает машину под это условие.",
  },
  {
    q: "Кто руководит подъёмом двумя кранами?",
    a: "Ответственного за безопасное производство работ с применением ПС определяет ППР на совместный подъём. KRANNEVA просит заказчика назначить инженерно-технического работника на эту роль до выезда машин: стропальщиков и машинистов для управления подъёмом двумя кранами недостаточно.",
  },
  {
    q: "Сколько стоит смена двух кранов?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов считается по каждой машине отдельно: SANY STC400T — от ${rub(shiftTotal(light.rate))}, кран класса ${mid.cls} — от ${rub(shiftTotal(mid.rate))}, класса ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. Подготовка ППР на совместный подъём — отдельная позиция.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Два крана на одной площадке", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда двух автокранов на одной площадке по ППР или технологической карте",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Два крана на одной площадке</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · несколько кранов</span>
          <h1>{h1}</h1>
          <p>
            Поднять один груз двумя кранами разрешено только по проекту производства работ или
            технологической карте: пункт 127 ФНП № 461 требует, чтобы нагрузка на каждый кран не
            превышала его грузоподъёмность. KRANNEVA различает два случая — два крана, работающих
            рядом, и два крана на общем грузе, — потому что документы и ответственность в них
            разные. Расстояния между машинами числом норматив не задаёт: его определяет ППР.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W162} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи двух кранов на одну площадку</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>подъём длинномерной или тяжёлой конструкции, которую не берёт одна машина; параллельная работа двух кранов на разных фронтах одной площадки</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{heavy.cls} — по массе груза и делению нагрузки между машинами</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link> — по массе и вылету</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>наличие ППР или ТК на совместный подъём (п. 127) и признак стеснённых условий (пп. 98, 133)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР или ТК с разбивкой нагрузки по машинам и назначенный руководитель работ из ИТР</td></tr>
              <tr><th scope="row">Что не задано числом</th><td>расстояние между двумя кранами — в ФНП № 461 его нет, схему даёт ППР</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на каждую машину</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls}), {rub(heavy.rate)} ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="dva-sluchaya">Два разных случая: работа рядом и совместный подъём</h2>
        <p>
          Два крана KRANNEVA на площадке означают одно из двух: машины работают каждая со своим грузом или
          вдвоём держат один. KRANNEVA спрашивает об этом первым при заявке, потому что от ответа
          зависит весь пакет документов. В первом случае достаточно ППР на площадку с зонами каждой
          машины, во втором нужен расчёт деления нагрузки.
        </p>
        <p>
          Путаница между случаями стоит дорого: ППР KRANNEVA, написанный на параллельную работу, не даёт права
          подвешивать один груз к двум крюкам. Пункт 127 ФНП № 461 относится именно ко второму
          случаю, и заказчику полезно назвать его в заявке прямо.
        </p>

        <h2 id="p127">Что говорит п. 127 о совместном подъёме</h2>
        <p>
          Пункт 127 ФНП № 461 (ред. от 16.04.2026) разрешает подъём и перемещение груза несколькими
          подъёмными сооружениями только по ППР или ТК. Второе предложение пункта задаёт предел:
          нагрузка, приходящаяся на каждое сооружение, не должна превышать его грузоподъёмность.
          Практический смысл для KRANNEVA — доля груза на каждом кране считается заранее, а не подбирается на
          месте по поведению стропов.
        </p>
        <p>
          Из предела следует подбор машин: KRANNEVA берёт SANY STC400T и XCMG QY60K из парка не по
          сумме паспортных тонн, а по той доле, которая придётся на каждую при фактических вылетах.
          Паспортную грузоподъёмность на выбранном вылете берут из грузовой характеристики машины;
          «средних» цифр для совместного подъёма KRANNEVA не печатает.
        </p>

        <h2 id="ryadom">Два крана рядом без общего груза</h2>
        <p>
          Когда два крана работают рядом каждый со своим грузом, пункт 127 не применяется, а работает
          общее правило пункта 109: от поворотной части нагруженного крана до строений, штабелей и
          других предметов остаётся не менее одного метра. Пересечение рабочих зон двух стрел этот
          пункт напрямую не описывает, поэтому его закрывает схема в ППР на площадку.
        </p>
        <p>
          Если площадка тесная, вступают пп. 98 и 133: работы в стеснённых условиях ведутся по ППР, а
          кран без координатной защиты в таких условиях не допускается, защита настраивается по ППР
          или ТК. Liebherr LTM 1090-4.1 и другие машины парка KRANNEVA подбираются с этим условием
          заранее — после отказа инспектора на площадке заменить машину уже поздно.
        </p>

        <h2 id="tablitsa">Сравнение трёх схем работы</h2>
        <p>
          Разница между одним краном, двумя независимыми и двумя на одном грузе — в документе и в
          том, кто отвечает за руководство. Таблица KRANNEVA сводит три схемы по параметрам, которые
          видны в ФНП № 461.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Один кран, два независимых крана, два крана на общем грузе</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Один кран</th>
                <th scope="col">Два независимых крана</th>
                <th scope="col">Два крана на одном грузе</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Основной документ</th><td>ППР или ТК на работу крана</td><td>ППР на площадку со схемой обеих машин</td><td>ППР или ТК на совместный подъём (п. 127)</td></tr>
              <tr><th scope="row">Что делится</th><td>груз целиком на одном крюке</td><td>рабочие зоны и очерёдность</td><td>нагрузка между крюками, не выше грузоподъёмности каждого</td></tr>
              <tr><th scope="row">Зазор до строений</th><td>не менее 1 м (п. 109)</td><td>не менее 1 м (п. 109) плюс схема пересечения зон</td><td>не менее 1 м (п. 109) для обеих машин</td></tr>
              <tr><th scope="row">Стеснённые условия</th><td>кран с координатной защитой (п. 133)</td><td>обе машины с координатной защитой</td><td>обе машины с координатной защитой</td></tr>
              <tr><th scope="row">Число смен в прайсе</th><td>одна</td><td>две</td><td>две</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="raschet">Сколько стоит вторая машина в смене</h2>
        <p>
          Вторая машина в смене KRANNEVA — отдельная смена по единому прайсу. Расчёт: SANY
          STC400T — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, класс{" "}
          {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))}, класс{" "}
          {heavy.cls} — {rub(heavy.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС.
          Разработка ППР на совместный подъём — отдельная позиция подготовки, её KRANNEVA называет
          после получения массы груза и схемы строповки.
        </p>
        <p>
          Порядок приёмки смены на объекте ведётся как обычно: сменный рапорт подписывается в день
          работ — <Link href="/dlya-zakupok/priemka-i-oplata/">порядок приёмки и оплаты</Link>. Если
          вторая машина нужна из-за нехватки вылета, сначала стоит сверить класс по{" "}
          <Link href="/obekty/">сводной таблице типов объектов</Link>: иногда одна машина класса выше
          дешевле двух.
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
        date={FACT_CHECK_W162}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора № 461 от 26.11.2020 (ред. 16.04.2026), раздел «Установка ПС и производство работ»: пп. 98, 109, 127, 133" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "rulaws.ru — приказ Ростехнадзора № 461: п. 127 о подъёме груза несколькими ПС (сверка формулировки)" },
          { href: "https://sudact.ru/law/prikaz-rostekhnadzora-ot-26112020-n-461-ob/federalnye-normy-i-pravila-v/vi/ustanovka-ps-i-proizvodstvo-rabot/", label: "sudact.ru — приказ № 461, раздел VI «Установка ПС и производство работ»" },
        ]}
        note="Числового расстояния между двумя кранами в ФНП № 461 мы не нашли и не печатаем; безопасные зазоры между машинами, стрелами и грузом определяет ППР по конкретной площадке. Пункт 127 относится к совместному подъёму одного груза, а не к параллельной работе двух кранов. Масса груза и его деление между машинами — расчёт проектировщика."
      />
    </main>
  );
}
