import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

const title = "Автокран на действующем производстве: спецификация подачи";
const description =
  "Монтаж и замена оборудования на действующем предприятии: спецификация подачи автокрана 60–100 т, вылет от границы доступной площадки.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/obekty/promzona/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const mid = PRICE[1];
const heavy = PRICE[2];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Промзона", item: `${SITE}/obekty/promzona/` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана 60–100 тонн для промышленной площадки",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  offers: {
    "@type": "Offer",
    // Волна приёмки: явный businessFunction вместо умолчания Sell —
    // предмет тот же, что на главной, договор аренды ТС с экипажем
    // (§3 гл. 34 ГК РФ). Обоснование выбора — в app/page.tsx.
    businessFunction: "https://schema.org/LeaseOut",
    priceCurrency: "RUB",
    priceSpecification: { "@type": "UnitPriceSpecification", price: String(mid.rate), priceCurrency: "RUB", unitText: "HOUR", valueAddedTaxIncluded: false },
  },
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Промзона</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · промзона</span>
          <h1>Автокран на действующем производстве: спецификация подачи</h1>
          {/*
            Волна GEO. Лид переписан по правилу «ответ первым»: вырезанные первые две фразы
            должны отвечать сами по себе и содержать число. Числа не новые — классы, ставка,
            смена и ориентир «65 т на вылете 12 м» уже стоят в таблице спецификации ниже
            (ориентир оговорён в Sources.note как расчётный, а не описание объекта).
          */}
          <p>
            Рабочий класс на действующем производстве — {mid.cls} и {heavy.cls} при минимальной
            оплачиваемой смене {MIN_SHIFT_HOURS} часов и ставке от {rub(mid.rate)}/час без НДС,
            то есть от {rub(shiftTotal(mid.rate))} за смену. Считают здесь от вылета, а не от веса:
            груз около 65 т на вылете порядка 12 м уже выходит за возможности 60-тонной машины —
            берётся техника 90–100 т. Причина в том, что кран нельзя поставить туда, где удобно:
            оборудование стоит в глубине цеха или площадки, а встать можно только там, где есть
            проезд и разрешено вставать.
          </p>
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на промышленную площадку</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж и замена производственного оборудования, работа с крупногабаритными металлоконструкциями, установка узлов на подготовленный фундамент</td></tr>
              <tr><th scope="row">Класс техники</th><td>{mid.cls} и {heavy.cls}. Ориентир: груз около 65 т на вылете порядка 12 м уже выходит за возможности 60-тонного класса — берётся машина 90–100 т</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link>, <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link>, <Link href="/park/liebherr-ltm-1130/">Liebherr LTM 1130-5.1</Link></td></tr>
              <tr><th scope="row">Главный параметр расчёта</th><td>вылет от границы площадки, доступной под выносные опоры, до центра груза. На предельном вылете доступная грузоподъёмность всегда меньше номинальной — подбор идёт по грузовой характеристике конкретной машины</td></tr>
              <tr><th scope="row">Требования к площадке</th><td>твёрдое покрытие или подготовленная площадка под все опоры; свободная зона работы стрелы; подтверждение, что под точками опирания нет технологических каналов и коммуникаций</td></tr>
              <tr><th scope="row">Ограничение доступа</th><td>внутренний пропускной режим предприятия. Единого стандарта нет: у одних заводов это список на проходную за день, у других — заявка с данными на людей и технику и инструктаж по правилам площадки</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>регламент предприятия по допуску подрядчиков плюс городской грузовой пропуск свыше 8 т (10 рабочих дней с марта по октябрь, 15 — с ноября по февраль для постоянного)</td></tr>
              <tr><th scope="row">Работа в остановочный период</th><td>если монтаж привязан к остановке линии, дату фиксируем от неё и держим машину в резерве — это условие уходит в спецификацию к договору отдельной строкой</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(mid.rate)}/час без НДС ({mid.cls}), от {rub(heavy.rate)}/час ({heavy.cls}); смена — от <span className="price-total">{rub(shiftTotal(mid.rate))}</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="incl">
          <div className="incl__col incl__col--yes">
            <div className="incl__title">Что входит в подачу</div>
            <ul className="incl__list">
              <li>Подбор машины по паре «вес и вылет» с проверкой по грузовой характеристике</li>
              <li>Городской грузовой пропуск и передача данных на технику и экипаж по правилам предприятия</li>
              <li>Комплект документов на машину и оператора на объекте</li>
              <li>Инвентарные подкладки под выносные опоры</li>
            </ul>
          </div>
          <div className="incl__col incl__col--no">
            <div className="incl__title">Что остаётся за заказчиком</div>
            <ul className="incl__list">
              <li>Заявка на допуск подрядчика по внутреннему регламенту предприятия</li>
              <li>Проект производства работ и организационно-технологическая документация по объекту</li>
              <li>Схема площадки с обозначением технологических каналов и коммуникаций</li>
              <li>Стропальщик, оснастка и подготовка фундамента под установку</li>
              <li>Освобождение зоны работы стрелы и путей подъезда к моменту подачи</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Почему вылет решает раньше веса</h2>
        <p>
          Грузоподъёмность автокрана максимальна у основания стрелы и падает по мере увеличения вылета —
          это верно для любой машины и любого производителя. На промышленной площадке вылет обычно задан
          не нами: оборудование стоит там, где стоит, а кран встаёт там, где есть место под все четыре
          опоры и подъезд. Из этого следует практическая вещь, которая для заказчика выглядит контринтуитивно:
          более тяжёлая машина берётся не потому, что груз тяжелее, а потому, что до него дальше.
        </p>
        <p>
          Ошибка в этой паре стоит дороже, чем в любом другом типе объекта. Замена машины на месте
          в тяжёлом классе — это не «подождите час», а новый маршрут, новый пропуск и потерянный
          остановочный период. Поэтому мы просим вес, вылет и схему до выезда, а не «примерно тонн
          шестьдесят, разберёмся на месте».
        </p>

        <h2>Соседство промзон и жилой застройки в Петербурге</h2>
        <p>
          Особенность города: промышленные площадки и новая жилая застройка здесь перемешаны. В том же
          Московском районе территории, освобождённые от производств, застраиваются жилыми комплексами,
          и на соседних адресах оказываются действующее предприятие с пропускным режимом и обычная
          стройка без него. Поэтому тип объекта мы уточняем по конкретному адресу, а не по профилю
          района, — от этого зависит и срок допуска, и то, чьи правила действуют на площадке.
          Разбор по районам — в разделе <Link href="/geo/">«География»</Link>.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK}
        items={[
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — выдача пропусков на грузовые ТС свыше 8 тонн: орган, виды, сроки оформления" },
        ]}
        note="Требования к допуску подрядчика на конкретное предприятие мы не приводим числом: они устанавливаются внутренними регламентами и в открытых источниках не публикуются. В спецификации стоит порядок действий, а не выдуманный срок. Пример «65 т на вылете 12 м» — расчётный ориентир для выбора класса, а не описание выполненного объекта."
      />
    </main>
  );
}
