import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import ParkModelArt from "../../components/ParkModelArt";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, PRICE, rub, shiftTotal, MIN_SHIFT_HOURS } from "../../site-data";

const title = "Liebherr LTM 1090-4.1 — технический лист автокрана 90 т";
const description =
  "Технический лист Liebherr LTM 1090-4.1: стрела 11,0–50 м, привод 8×8, полная масса 47,9 т при нагрузке на ось около 12 т, 4-точечные опоры.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/park/liebherr-ltm-1090/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const cls = PRICE[2];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Парк техники", item: `${SITE}/park/` },
    { "@type": "ListItem", position: 3, name: "Liebherr LTM 1090-4.1", item: `${SITE}/park/liebherr-ltm-1090/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/park/">Парк техники</Link><span>/</span><span>Liebherr LTM 1090-4.1</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Технический лист · автокран 90 т</span>
          <h1>Liebherr LTM 1090-4.1</h1>
          <p>
            Нижняя граница тяжёлого класса: берётся там, где 60-тонная машина уже не даёт запаса
            по грузоподъёмности или по вылету, а полноприводное шасси нужно из-за неподготовленного подъезда.
          </p>
        </div>
        <PrintButton label="Распечатать технический лист" />
      </section>

      <div className="wrap">
        <figure className="model-photo">
          {/* Волна приёмки: WebP через <picture>, JPEG остался запасным в <img>. */}
          <picture>
          <source srcSet="/images/park/liebherr-ltm-1090.webp" type="image/webp" />
          <img
            src="/images/park/liebherr-ltm-1090.jpg"
            width="1280"
            height="960"
            loading="lazy"
            decoding="async"
            alt="Автокран Liebherr LTM 1090-4.1 с поднятой телескопической стрелой на монтаже сборного гаража на стройплощадке в Нанси, Франция — фото модели, не конкретная машина из нашего парка"
          />
          </picture>
          <figcaption>
            Фото этой модели крана (не единица нашего парка — иллюстрация внешнего вида и конструкции).
            Нанси, Франция, 2008. Автор: Alexandre Prevot, лицензия{" "}
            <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener">CC BY-SA 2.0</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Liebherr_LTM_1090-4.1_Adam_levage.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.
          </figcaption>
        </figure>
        <ParkModelArt
          modelName="Liebherr LTM 1090-4.1"
          capacity="90 т"
          massLabel="47,9 т · ~12 т/ось × 4"
          lengthLabel="13 290 мм"
          boomLabel="Стрела 11,0–50,0 м"
          boomLen={225}
          boomAngle={24}
          wheels={4}
          jib={{ label: "Гусёк 10,5–19 м" }}
          heightLabel="До 69 м с гуськом, вылет до 56 м"
          note="Все 4 оси управляемые, привод 8×8"
        />
      </div>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грузовысотная характеристика и рабочее оборудование</caption>
            <tbody>
              <tr><th scope="row">Номинальная грузоподъёмность</th><td className="dtable__num">90 т на минимальном вылете</td></tr>
              <tr><th scope="row">Телескопическая стрела</th><td className="dtable__num">11,0–50,0 м (36–164 ft по Technical Data производителя)</td></tr>
              <tr><th scope="row">Откидной гусёк</th><td className="dtable__num">10,5–19 м, двухшарнирный</td></tr>
              <tr><th scope="row">Высота подъёма с гуськом</th><td className="dtable__num">до 69 м</td></tr>
              <tr><th scope="row">Максимальный вылет</th><td className="dtable__num">до 56 м</td></tr>
              <tr><th scope="row">Скорость выдвижения стрелы</th><td>около 330 секунд на полный вылет телескопа с 36 до 164 ft</td></tr>
              <tr><th scope="row">Двигатель</th><td>Liebherr D846 A7, 6 цилиндров, 350 кВт (476 л.с.) при 1900 об/мин</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Габариты, массы и опорная часть</caption>
            <tbody>
              <tr><th scope="row">Длина и ширина в транспортном положении</th><td className="dtable__num">13,29 × 3,00 м (по каталожным данным LECTURA Specs)</td></tr>
              <tr><th scope="row">Полная масса в транспортном положении</th><td className="dtable__num">47,9 т (105 600 lbs) с противовесом 6,7 т</td></tr>
              <tr><th scope="row">Нагрузка на ось</th><td className="dtable__num">по 26 400 lbs — около 12 т на каждую из 4 осей</td></tr>
              <tr><th scope="row">Ходовая часть</th><td>4 оси, все управляемые; привод 8×8; гидропневматическая подвеска с гидравлической блокировкой; шины 16.00 R 25</td></tr>
              <tr><th scope="row">Выносные опоры</th><td>4-точечная система, гидравлическое выдвижение в горизонтальном и вертикальном направлении, автоматическое горизонтирование крана, электронный указатель наклона</td></tr>
              <tr><th scope="row">Требования к опорной площадке</th><td>вся нагрузка передаётся на четыре точки; площадь опирания увеличивается инвентарными подкладками по фактическому давлению. Для намывных и свежеотсыпанных площадок подкладки везём заранее — <Link href="/obekty/namyvnaya-territoriya/">спецификация по намыву</Link></td></tr>
              <tr><th scope="row">Что это значит для города</th><td>нагрузка на ось около 12 т и длина свыше 13 м: городской пропуск на грузовое ТС свыше 8 т обязателен, маршрут проверяется на габаритные ограничения</td></tr>
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
              <tr><th scope="row">На оператора</th><td>удостоверение машиниста крана и документ о проверке знаний; экипаж наш штатный</td></tr>
              <tr><th scope="row">По объекту</th><td>городской грузовой пропуск, объектовый допуск (терминал или предприятие), спецификация к договору и бланк сменного рапорта</td></tr>
              <tr><th scope="row">Когда предъявляются</th><td>копии — заказчику при согласовании заявки, оригиналы — на проходной вместе с машиной; служба безопасности терминала обычно сверяет данные крановщика с заранее поданным списком, поэтому фамилию мы называем при бронировании даты</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Класс прайса — {cls.cls}: от {rub(cls.rate)} за час без НДС, минимальная смена {MIN_SHIFT_HOURS} часов
          (от <span className="price-total">{rub(shiftTotal(cls.rate))}</span>). Выдержка из грузовой таблицы
          под вашу конфигурацию идёт приложением к КП.
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Где эта машина работает лучше остальных в парке</h2>
        <p>
          Привод на все восемь колёс и все управляемые оси дают проходимость и маневренность заметно выше,
          чем у типового дорожного автокрана сопоставимого тоннажа. Практически это две ситуации:
          площадка с неподготовленным подъездом — временная отсыпка, грунтовка вдоль строящегося корпуса —
          и площадка, куда надо не столько заехать, сколько вписаться, потому что подъезд один и он узкий.
          При этом машина остаётся тяжёлой: 12 тонн на ось — это городской пропускной режим и проверка
          маршрута, а не «поехали, когда скажете».
        </p>
        <p>
          Для промышленного и портового монтажа диапазон высот с гуськом закрывает большинство задач,
          где массовый городской класс не достаёт по высоте. Если задача, наоборот, высотная при умеренном
          весе, в парке есть машина с более длинной стрелой того же тоннажного уровня —{" "}
          <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link>. Если груз тяжелее, чем допускает
          90-тонный класс на нужном вылете, — <Link href="/park/liebherr-ltm-1130/">Liebherr LTM 1130-5.1</Link>,
          старший автокран парка с запасом по грузовой таблице.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK}
        items={[
          { href: "https://freecranespecs.com/Liebherr-LTM-1090-4-1(1).pdf", label: "Liebherr-Werk Ehingen GmbH, Technical Data LTM 1090-4.1 — длина стрелы 36–164 ft, двигатель D846 A7 350 кВт (476 л.с.), 4-точечные опоры, массы и нагрузки на ось" },
          { href: "https://www.lectura-specs.com/en/model/cranes/all-terrain-cranes-liebherr/ltm-1090-4-1-8x6x8-1019568", label: "LECTURA Specs — габариты в транспортном положении и каталожные данные LTM 1090-4.1" },
          { href: "https://www.ecrane.ru/liebherrcranes/liebherr-ltm-1090-41.html", label: "Каталожные данные по гуську 10,5–19 м, высоте подъёма до 69 м и вылету до 56 м" },
        ]}
        note="Что исправлено в этой волне: раньше на странице стояли длина стрелы 11,7–52 м и высота подъёма с гуськом 74,8 м. В Technical Data производителя телескопическая стрела указана как 36–164 ft, то есть 11,0–50,0 м, — цифры приведены в соответствие с первоисточником. Полную грузовую таблицу не публикуем: она зависит от противовеса, положения опор и конфигурации стрелы."
      />
    </main>
  );
}
