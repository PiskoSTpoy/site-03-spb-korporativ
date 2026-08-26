import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import ParkModelArt from "../../components/ParkModelArt";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK_W74, PRICE, rub, shiftTotal, MIN_SHIFT_HOURS } from "../../site-data";

const title = "Liebherr LTM 1130-5.1 — технический лист автокрана 130 т";
const description =
  "Технический лист Liebherr LTM 1130-5.1: стрела 12,7–60 м, удлинитель 10,8–33 м, высота до 91 м, вылет до 72 м, масса 60 т, 12 т/ось (5 осей).";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/park/liebherr-ltm-1130/";

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
    { "@type": "ListItem", position: 3, name: "Liebherr LTM 1130-5.1", item: `${SITE}/park/liebherr-ltm-1130/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/park/">Парк техники</Link><span>/</span><span>Liebherr LTM 1130-5.1</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Технический лист · автокран 130 т</span>
          <h1>Liebherr LTM 1130-5.1</h1>
          <p>
            Старший автокран парка и верхняя граница класса 81–130 т: пятая ось добавлена не ради
            грузоподъёмности как таковой, а ради устойчивости под предельным моментом — там, где
            90-тонная машина уже работает на пределе грузовой таблицы, у 1130-5.1 остаётся запас.
          </p>
        </div>
        <PrintButton label="Распечатать технический лист" />
      </section>

      <div className="wrap">
        <figure className="model-photo">
          {/* Волна приёмки: WebP через <picture>, JPEG остался запасным в <img>. */}
          <picture>
          <source srcSet="/images/park/liebherr-ltm-1130.webp" type="image/webp" />
          <img
            src="/images/park/liebherr-ltm-1130.jpg"
            width="1280"
            height="718"
            loading="lazy"
            decoding="async"
            alt="Автокран Liebherr LTM 1130-5.1 с выдвинутой телескопической стрелой и крюковой подвеской на стройплощадке в Дорнбирне, Австрия — фото модели, не конкретная машина из нашего парка"
          />
          </picture>
          <figcaption>
            Фото этой модели крана (не единица нашего парка — иллюстрация внешнего вида и конструкции).
            Дорнбирн, Форарльберг, Австрия, апрель 2018. Автор: Asurnipal, лицензия{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Liebherr_Mobilkran_LTM_1130-5.1_-_01.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>.
          </figcaption>
        </figure>
        <ParkModelArt
          modelName="Liebherr LTM 1130-5.1"
          capacity="130 т"
          massLabel="60 т · ~12 т/ось × 5"
          lengthLabel="14 825 мм"
          boomLabel="Стрела 12,7–60,0 м"
          boomLen={258}
          boomAngle={22}
          wheels={5}
          jib={{ label: "Удлинитель 10,8–33 м, две секции", len: 65 }}
          heightLabel="До 91 м с удлинителем, вылет до 72 м"
          note="Противовес: базовый 9 т, максимальный до 42 т — переменная система"
        />
      </div>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грузовысотная характеристика и рабочее оборудование</caption>
            <tbody>
              <tr><th scope="row">Номинальная грузоподъёмность</th><td className="dtable__num">130 т при вылете 3 м</td></tr>
              <tr><th scope="row">Телескопическая стрела</th><td className="dtable__num">12,7–60,0 м</td></tr>
              <tr><th scope="row">Решётчатый удлинитель</th><td className="dtable__num">10,8–33 м, двухсекционный</td></tr>
              <tr><th scope="row">Максимальная высота подъёма</th><td className="dtable__num">до 91 м с удлинителем</td></tr>
              <tr><th scope="row">Максимальный вылет</th><td className="dtable__num">до 72 м</td></tr>
              <tr><th scope="row">Двигатель шасси</th><td>Liebherr, 6 цилиндров, турбонаддув, 370 кВт (503 л.с.)</td></tr>
              <tr><th scope="row">Двигатель поворотной платформы</th><td>Liebherr, 4 цилиндра, турбонаддув, 145 кВт — отдельная силовая установка для работы крана без запуска ходового двигателя</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Габариты, массы и опорная часть</caption>
            <tbody>
              <tr><th scope="row">Габариты в транспортном положении</th><td className="dtable__num">14 825 × 2 750 × 3 950 мм</td></tr>
              <tr><th scope="row">Полная масса в транспортном положении</th><td className="dtable__num">60 т, с базовым противовесом 9 т</td></tr>
              <tr><th scope="row">Нагрузка на ось</th><td className="dtable__num">около 12 т на каждую из 5 осей</td></tr>
              <tr><th scope="row">Ходовая часть</th><td>5 осей, колёсная формула 10×8×10 — 8 ведущих и все 10 колёс на управляемых мостах; наименьший радиус поворота 10,4 м</td></tr>
              <tr><th scope="row">Опорный контур</th><td>база выносных опор около 8,1 × 7,5 м при полном выдвижении — больше, чем у 90-тонной машины парка, площадку под установку проверяем отдельно</td></tr>
              <tr><th scope="row">Максимальная скорость</th><td className="dtable__num">80 км/ч</td></tr>
              <tr><th scope="row">Требования к опорной площадке</th><td>вся нагрузка передаётся на четыре точки опорного контура; площадь опирания увеличивается инвентарными подкладками по фактическому давлению. Для намывных и свежеотсыпанных площадок подкладки везём заранее — <Link href="/obekty/namyvnaya-territoriya/">спецификация по намыву</Link></td></tr>
              <tr><th scope="row">Что это значит для города</th><td>нагрузка на ось около 12 т и длина почти 15 м — городской пропуск на грузовое ТС свыше 8 т обязателен, маршрут проверяется на габаритные ограничения и радиусы поворота</td></tr>
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
              <tr><th scope="row">Когда предъявляются</th><td>копии — заказчику при согласовании заявки, оригиналы — на проходной вместе с машиной; для машины такого класса отдельно запрашивают схему установки на опорах — готовим её вместе с грузовой таблицей под конкретный вылет</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Класс прайса — {cls.cls}: от {rub(cls.rate)} за час без НДС, минимальная смена {MIN_SHIFT_HOURS} часов
          (от <span className="price-total">{rub(shiftTotal(cls.rate))}</span>).
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Когда берут 130 т, а не 90 или 100</h2>
        <p>
          Правило простое и не про запас «на всякий случай»: если груз тяжелее 100 тонн даже у самого
          основания стрелы — это уже выход за грузоподъёмность любой другой машины парка, и решает
          не выбор подешевле, а физика грузовой таблицы. То же самое на среднем вылете: у 90-тонной{" "}
          <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link> запас по грузоподъёмности
          на 15–20 метрах вылета уже невелик, а у 1130-5.1 остаётся ощутимый резерв на тех же метрах —
          именно поэтому машину берут не под предельные 130 тонн, а под задачу, где 90-тонник работает
          на грани таблицы.
        </p>
        <p>
          Второе практическое отличие — отдельная силовая установка поворотной платформы: 145 кВт крутят
          лебёдки и стрелу независимо от ходового двигателя, что на предприятии с ограничением по шуму
          или выхлопу в цехе даёт больше свободы, чем у машин с одним общим двигателем. Решётчатый
          удлинитель 10,8–33 м собирается отдельно и добавляет время на монтаж — если высота важнее
          тоннажа, а собирать удлинитель ради лишних метров не хочется, вариант короче по времени
          подготовки — <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link> с чистой
          телескопической стрелой 64,5 м без навесных секций.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK_W74}
        items={[
          { href: "https://www.ecrane.ru/liebherrcranes/liebherr-ltm-1130-51.html", label: "Каталожные характеристики Liebherr LTM 1130-5.1: стрела 12,7–60 м, удлинитель 10,8–33 м, вылет до 72 м, высота до 91 м, 5 осей (10×8×10), двигатели шасси и крана, радиус поворота" },
          { href: "https://kran4rent.ru/catalog/arenda-avtokrana/avtokran-130t/", label: "Габариты в транспортном положении 14 825 × 2 750 × 3 950 мм, масса 60 т, опорный контур 8,1 × 7,5 м, максимальная скорость 80 км/ч" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на грузовое ТС свыше 8 тонн" },
        ]}
        note="Источники по опорному контуру и транспортным габаритам разошлись с каталожным листом Liebherr по общей высоте с удлинителем (79–91 м у разных дилерских каталогов); взято значение 91 м как совпадающее в двух независимых источниках. Полную грузовую таблицу не публикуем: она зависит от противовеса, положения опор и конфигурации стрелы — выдержка под конкретную задачу идёт приложением к КП."
      />
    </main>
  );
}
