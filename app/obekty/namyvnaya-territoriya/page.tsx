import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

const title = "Кран на намывной территории СПб: спецификация подачи техники";
const description =
  "Намыв Васильевского острова и прибрежные участки: спецификация подачи автокрана 25–60 т, требования к опорной площадке, сезонный фактор.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/obekty/namyvnaya-territoriya/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Намывная территория", item: `${SITE}/obekty/namyvnaya-territoriya/` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана 25–60 тонн для площадок на намывном грунте",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  offers: {
    "@type": "Offer",
    // Волна приёмки: явный businessFunction вместо умолчания Sell —
    // предмет тот же, что на главной, договор аренды ТС с экипажем
    // (§3 гл. 34 ГК РФ). Обоснование выбора — в app/page.tsx.
    businessFunction: "https://schema.org/LeaseOut",
    priceCurrency: "RUB",
    priceSpecification: { "@type": "UnitPriceSpecification", price: String(light.rate), priceCurrency: "RUB", unitText: "HOUR", valueAddedTaxIncluded: false },
  },
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Намывная территория</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · намыв</span>
          <h1>Автокран на намывной территории: спецификация подачи</h1>
          <p>
            Намыв — это искусственный грунт, и он не попадает в общий перечень пород, которыми сложены
            террасы Приневской низменности: там моренные суглинки, озёрно-ледниковые и ленточные глины,
            водно-ледниковые пески и супеси, а намывные почвы выделяются отдельно. Отсюда практическое
            следствие: несущая способность здесь — свойство точки, а не площадки, поэтому рабочие
            классы 25–40 т и 41–80 т подтверждаются по точке установки, а не по адресу объекта.
          </p>
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на намывную территорию</caption>
            <tbody>
              <tr><th scope="row">Типовые адреса</th><td>западная часть Васильевского острова, прибрежные участки Приморского района, площадки новой застройки на отсыпанных территориях</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls} — монтаж инженерного оборудования, разгрузка, подача материалов на этажи</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Требование к опорной площадке</th><td>ровная площадка под все выносные опоры; при признаках свежей отсыпки — увеличение площади опирания подкладками. Решение принимается по точке установки, а не по площадке целиком</td></tr>
              <tr><th scope="row">Что оцениваем на месте</th><td>тип покрытия, следы недавних грунтовых работ, близость к береговой линии, состояние после осадков</td></tr>
              <tr><th scope="row">Сезонный фактор</th><td>после дождей и в межсезонье оценка ведётся с более консервативным запасом, чем в сухую погоду</td></tr>
              <tr><th scope="row">Если отсыпка ещё не спланирована</th><td>на свежем, ещё не выровненном и не утрамбованном участке автокран на выносных опорах не ставим ни на каких подкладках — берём <Link href="/park/zoomlion-quy50/">гусеничный Zoomlion QUY50</Link>, у него нагрузка распределена по лентам, а не по четырём точкам</td></tr>
              <tr><th scope="row">Ограничение доступа</th><td>обычное строительное: пропускной режим стройплощадки, согласование въезда с генподрядчиком</td></tr>
              <tr><th scope="row">Срок выезда</th><td>по готовности площадки; отдельного разрешительного срока, как в порту, здесь нет. Городской пропуск свыше 8 т нужен на общих основаниях</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС, смена — от <span className="price-total">{rub(shiftTotal(light.rate))}</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="incl">
          <div className="incl__col incl__col--yes">
            <div className="incl__title">Что входит в подачу</div>
            <ul className="incl__list">
              <li>Инвентарные подкладки, включая усиленные, — везём заранее, а не по факту накренившейся опоры</li>
              <li>Оценка точки установки перед постановкой на опоры</li>
              <li>Городской грузовой пропуск на технику</li>
              <li>Подбор машины по вылету, если подъезд к точке подъёма ограничен</li>
            </ul>
          </div>
          <div className="incl__col incl__col--no">
            <div className="incl__title">Что остаётся за заказчиком</div>
            <ul className="incl__list">
              <li>Геологические изыскания и расчёт основания площадки</li>
              <li>Планировка и уплотнение зоны под опоры, если требуется по проекту</li>
              <li>Проект производства работ краном</li>
              <li>Стропальщик и оснастка под груз</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Почему «ровно и утрамбовано» — не ответ</h2>
        <p>
          Намывной грунт неоднороден по плотности сильнее давно освоенных территорий: соседние точки одной
          и той же с виду ровной площадки могут отличаться по несущей способности в зависимости от того,
          когда и как отсыпался конкретный участок. Визуальная оценка поверхности здесь говорит о поверхности,
          и только. Поэтому мы оцениваем точку установки отдельно, а усиленные подкладки для намыва —
          штатная практика, а не запасной план.
        </p>
        <p>
          Что мы сознательно не делаем: не заменяем собой изыскания. Допускаемое давление под выносной
          опорой, площадь подкладки и безопасное расстояние от бровки котлована — это расчёт проектировщика
          по данным геологии участка, а не оценка крановщика по фотографии. Мы приходим уже к готовому
          ответу и проверяем его геометрией машины: наша зона ответственности заканчивается на решении
          «на эту точку вставать можно так, а на эту — нет».
        </p>
        <p>
          Второй местный парадокс намыва: запас по тоннажу и проходимость тянут в разные стороны. Кран
          следующего класса даёт запас по грузоподъёмности, но приезжает на более длинном многоосном шасси
          — и там, где к точке подъёма ведёт один узкий временный проезд по отсыпке, выигрыш в тоннаже
          съедается невозможностью встать. Поэтому подбор идёт от пары «вес и вылет», а не от желания
          взять машину помощнее.
        </p>
        <p>
          Отдельная ситуация — не «намыв вообще», а конкретно свежий, ещё не спланированный участок отсыпки:
          подкладки под выносные опоры здесь не решение, а отсрочка проблемы, потому что неоднородность
          грунта на свежей отсыпке больше, чем способна компенсировать даже увеличенная площадь подкладки.
          Для таких участков в парке — <Link href="/park/zoomlion-quy50/">гусеничный кран</Link>: он
          физически не нагружает точку так, как автокран, и работает там, где ещё нет ни проезда, ни
          утрамбованной площадки под опоры.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK}
        items={[
          { href: "https://ecopeterburg.ru/", label: "«Окружающая среда Санкт-Петербурга» — почвообразующие породы террас Приневской низменности; намывные почвы выделены отдельно как искусственные" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на грузовое ТС свыше 8 тонн: сроки и виды" },
        ]}
        note="Конкретных значений несущей способности намывных грунтов Петербурга мы не публикуем: проверяемых источников на цифры по конкретным участкам нет, а придумывать их нельзя. В спецификации только качественное утверждение о неоднородности и порядок действий на площадке."
      />
    </main>
  );
}
