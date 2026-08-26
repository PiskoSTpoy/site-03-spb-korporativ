import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import ParkModelArt from "../../components/ParkModelArt";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, PRICE, rub, shiftTotal, MIN_SHIFT_HOURS } from "../../site-data";

const title = "SANY STC400T — технический лист автокрана 40 т";
const description =
  "Технический лист SANY STC400T: грузоподъёмность 40 т, грузовой момент 1266,7 кН·м, стрела 44,1 м, U-образное сечение, требования к опорной площадке.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/park/sany-stc400t/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const cls = PRICE[0];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Парк техники", item: `${SITE}/park/` },
    { "@type": "ListItem", position: 3, name: "SANY STC400T", item: `${SITE}/park/sany-stc400t/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/park/">Парк техники</Link><span>/</span><span>SANY STC400T</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Технический лист · автокран 40 т</span>
          <h1>SANY STC400T</h1>
          <p>
            Рабочая лошадь городского класса: разгрузка, монтаж конструкций средней тяжести, подача
            материалов на высоту. Берётся там, где 25-тонной машине не хватает запаса по вылету,
            а тяжёлый класс избыточен и по цене, и по габаритам подъезда.
          </p>
        </div>
        <PrintButton label="Распечатать технический лист" />
      </section>

      <div className="wrap">
        <ParkModelArt
          modelName="SANY STC400T"
          capacity="40 т"
          massLabel="32 300 кг"
          boomLabel="Стрела 44,1 м"
          boomLen={190}
          boomAngle={30}
          wheels={3}
          heightLabel="Высота подъёма 59,5 м"
          crossSection={{ shape: "u", label: "U-профиль стрелы" }}
          note="Максимальный грузовой момент 1266,7 кН·м"
        />
      </div>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грузовысотная характеристика и рабочее оборудование</caption>
            <tbody>
              <tr><th scope="row">Номинальная грузоподъёмность</th><td className="dtable__num">40 т на минимальном вылете</td></tr>
              <tr><th scope="row">Максимальный грузовой момент</th><td className="dtable__num">1266,7 кН·м (основная стрела, по данным производителя)</td></tr>
              <tr><th scope="row">Длина полностью выдвинутой стрелы</th><td className="dtable__num">44,1 м по данным производителя; в дилерских каталогах для этой модели встречается 44,5 м</td></tr>
              <tr><th scope="row">Максимальная высота подъёма</th><td className="dtable__num">59,5 м (дилерские каталоги)</td></tr>
              <tr><th scope="row">Сечение стрелы</th><td>U-образное — жёсткость выше при меньшей массе секции; допускается перевозка груза непосредственно на стреле</td></tr>
              <tr><th scope="row">Полная масса</th><td className="dtable__num">32 300 кг (дилерские каталоги)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="disclaimer">
          Где источники расходятся, мы пишем оба значения, а не выбираем удобное. Производитель на странице
          модели указывает длину полностью выдвинутой стрелы 44,1 м, российские дилерские каталоги — 44,5 м.
          Перед выездом мы сверяем паспорт конкретной машины, и в спецификацию к договору идут её данные,
          а не каталожные.
        </p>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Габариты, опорная часть и требования к площадке</caption>
            <tbody>
              <tr><th scope="row">Габариты в транспортном положении</th><td>производитель не публикует их на странице модели, а сводить разные дилерские таблицы в одну цифру мы не будем: габариты конкретной машины идут в КП по её паспорту</td></tr>
              <tr><th scope="row">Опирание</th><td>4 выносные опоры; при неполном выдвижении опор доступная грузоподъёмность снижается — это отдельная таблица в грузовой характеристике</td></tr>
              <tr><th scope="row">Требования к опорной площадке</th><td>ровная площадка под все четыре опоры, твёрдое покрытие либо увеличенная подкладками площадь опирания; для намыва и свежей отсыпки усиленные подкладки везём заранее</td></tr>
              <tr><th scope="row">Городской режим</th><td>полная масса заведомо выше 8 т — пропуск на грузовое ТС оформляется на общих основаниях, срок закладывается в график</td></tr>
              <tr><th scope="row">Типовые объекты</th><td><Link href="/obekty/namyvnaya-territoriya/">намывные территории</Link>, <Link href="/obekty/obekt-pod-ohranoy-kgiop/">площадки в границах зон охраны</Link>, обычная городская стройка</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Комплект документов, который едет с машиной</caption>
            <tbody>
              <tr><th scope="row">На технику</th><td>паспорт подъёмного сооружения, свидетельство о регистрации транспортного средства, полис ОСАГО, путевой лист на дату работы</td></tr>
              <tr><th scope="row">На оператора</th><td>удостоверение машиниста крана и документ о проверке знаний</td></tr>
              <tr><th scope="row">По объекту</th><td>городской грузовой пропуск, объектовый допуск, спецификация к договору и бланк сменного рапорта</td></tr>
              <tr><th scope="row">Когда предъявляются</th><td>копии высылаем при согласовании заявки, оригиналы едут с машиной; сорокатонник чаще других идёт на разовые городские заявки, где документы смотрят прямо на въезде — комплект собран заранее, а не в день выезда</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Класс прайса — {cls.cls}: от {rub(cls.rate)} за час без НДС, минимальная смена {MIN_SHIFT_HOURS} часов
          (от <span className="price-total">{rub(shiftTotal(cls.rate))}</span>).
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Практическая особенность: груз на стреле</h2>
        <p>
          Возможность закрепить груз непосредственно на стреле при переезде экономит время на площадках
          с несколькими точками подъёма: часть материалов не нужно разгружать и загружать заново при смене
          позиции. Для крупных строительных площадок Петербурга, где параллельно ведутся несколько очередей
          и кран за смену меняет точку установки два-три раза, это не деталь из брошюры, а реальные
          сэкономленные часы внутри оплачиваемой смены.
        </p>
        <p>
          Ограничение то же, что у любого автокрана: грузоподъёмность максимальна у основания стрелы
          и падает с вылетом. Если груз лёгкий, но точка подъёма далеко, машина этого класса может
          не подойти при формально достаточных 40 тоннах — считаем по паре «вес и вылет» до выезда,
          а не на месте. Сводная таблица парка — в разделе <Link href="/park/">«Парк техники»</Link>.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK}
        items={[
          { href: "https://www.sanyglobal.com/ru/product/crane/truck_crane/76/571/", label: "SANY Group, страница модели STC400T — грузоподъёмность 40 т, максимальный грузовой момент 1266,7 кН·м, длина полностью выдвинутой стрелы 44,1 м" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на грузовое ТС с разрешённой максимальной массой свыше 8 тонн" },
        ]}
        note="Габариты в транспортном положении и размер опорного контура для этой модели производитель в открытом доступе не публикует, а дилерские таблицы расходятся между собой — поэтому в техническом листе стоит порядок действий (сверка по паспорту машины), а не выбранное наугад число."
      />
    </main>
  );
}
