import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import ParkModelArt from "../../components/ParkModelArt";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, PRICE, rub, shiftTotal, MIN_SHIFT_HOURS } from "../../site-data";

const title = "Zoomlion ZTC1000V — технический лист автокрана 100 т";
const description =
  "Технический лист Zoomlion ZTC1000V: 100 т, стрела 64,5 м, габариты 14 990 × 2 900 × 3 990 мм, база выносных опор 6,53 м и разлёт 7,8 / 5,6 м.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/park/zoomlion-ztc1000v/";

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
    { "@type": "ListItem", position: 3, name: "Zoomlion ZTC1000V", item: `${SITE}/park/zoomlion-ztc1000v/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/park/">Парк техники</Link><span>/</span><span>Zoomlion ZTC1000V</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Технический лист · автокран 100 т</span>
          <h1>Zoomlion ZTC1000V</h1>
          <p>
            Машину в парке берут не за тоннаж, а за стрелу: 64,5 метра телескопа без единой навесной
            секции — самая длинная чистая телескопическая стрела в парке, собирается и работает без
            монтажа удлинителя. Машина под высотные задачи при умеренном весе груза, а не под предельный
            груз на коротком плече.
          </p>
        </div>
        <PrintButton label="Распечатать технический лист" />
      </section>

      <div className="wrap">
        <ParkModelArt
          modelName="Zoomlion ZTC1000V"
          capacity="100 т"
          massLabel="50 000 кг"
          lengthLabel="14 990 мм"
          boomLabel="Стрела 64,5 м, 6 секций"
          boomLen={270}
          boomAngle={20}
          sections={6}
          wheels={5}
          jib={{ label: "Гусёк", len: 55 }}
          heightLabel="82,5 м с гуськом"
          crossSection={{ shape: "oval", label: "Овальный профиль" }}
          note={["Опоры: база 6,53 м, разлёт 7,8/5,6 м", "Крюки: 70/25 т главный, 7 т вспомогательный"]}
        />
      </div>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грузовысотная характеристика и рабочее оборудование</caption>
            <tbody>
              <tr><th scope="row">Номинальная грузоподъёмность</th><td className="dtable__num">100 т на минимальном вылете</td></tr>
              <tr><th scope="row">Основная стрела</th><td className="dtable__num">64,5 м, шестисекционная, овальный профиль из низколегированной высокопрочной стали</td></tr>
              <tr><th scope="row">Высота подъёма с гуськом</th><td className="dtable__num">82,5 м</td></tr>
              <tr><th scope="row">Крюковые подвески в базовой комплектации</th><td>70 т и 25 т на главном подъёме, 7 т на вспомогательном — переключение между тяжёлыми и лёгкими операциями без замены оснастки</td></tr>
              <tr><th scope="row">Двигатель</th><td>Weichai WP12.375E50</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Габариты, массы и опорная часть</caption>
            <tbody>
              <tr><th scope="row">Габариты в транспортном положении</th><td className="dtable__num">14 990 × 2 900 × 3 990 мм</td></tr>
              <tr><th scope="row">Полная масса в транспортном положении</th><td className="dtable__num">50 000 кг</td></tr>
              <tr><th scope="row">База выносных опор (продольная)</th><td className="dtable__num">6,53 м</td></tr>
              <tr><th scope="row">Разлёт опор поперёк</th><td className="dtable__num">7,8 м при полном выдвижении, 5,6 м при половинном</td></tr>
              <tr><th scope="row">Требования к опорной площадке</th><td>под полный контур нужна свободная зона не менее ориентировочно 7 × 8 м с учётом подкладок; при половинном выдвижении опор действует отдельная, пониженная таблица грузоподъёмности</td></tr>
              <tr><th scope="row">Что это значит для города</th><td>длина почти 15 м и высота 3,99 м — маршрут проверяется на радиусы поворота и ограничения по высоте; пропуск на грузовое ТС свыше 8 т обязателен</td></tr>
              <tr><th scope="row">Типовые объекты</th><td><Link href="/obekty/port-i-terminal/">портовые терминалы</Link>, <Link href="/obekty/promzona/">промышленные площадки</Link> с высотным монтажом</td></tr>
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
              <tr><th scope="row">По объекту</th><td>городской грузовой пропуск, допуск в зону транспортной безопасности терминала или пропуск предприятия, спецификация к договору и бланк сменного рапорта</td></tr>
              <tr><th scope="row">Когда предъявляются</th><td>копии уходят при согласовании заявки, оригиналы едут с машиной; вместе с ними готовим схему установки на выносных опорах — на объектах, куда заказывают стотонник, её спрашивают чаще, чем сам паспорт</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Класс прайса — {cls.cls}: от {rub(cls.rate)} за час без НДС, минимальная смена {MIN_SHIFT_HOURS} часов
          (от <span className="price-total">{rub(shiftTotal(cls.rate))}</span>).
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Почему размер опорного контура важен именно здесь</h2>
        <p>
          Для этой машины опубликованы обе цифры разлёта опор — 7,8 метра при полном выдвижении и 5,6
          при половинном, — и это тот редкий случай, когда решение о площадке можно принять по документу,
          а не по приезду. На портовом терминале, где зона установки зажата линиями складирования
          и проездами, полтора метра разницы решают, встанет машина полностью или пойдёт по пониженной
          таблице нагрузок. Мы просим схему площадки заранее именно для этого расчёта.
        </p>
        <p>
          Второе следствие длинной стрелы: чем больше вылет, тем меньше доступная грузоподъёмность.
          Шестьдесят четыре метра стрелы не означают, что на этом вылете машина поднимет заметный груз, —
          они означают, что она достанет туда. Если груз тяжелее 100 тонн — то есть выходит за
          грузоподъёмность этой машины даже у самого основания стрелы, — нужен более тяжёлый класс:{" "}
          <Link href="/park/liebherr-ltm-1130/">Liebherr LTM 1130-5.1</Link>, старший автокран парка.
          Сравнение по парку — в <Link href="/park/">сводной таблице</Link>.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK}
        items={[
          { href: "https://rus-zoomlion.ru/katalog-texniki/avtokrany/avtokran-zoomlion-ztc1000v/", label: "Каталожные характеристики Zoomlion ZTC1000V: стрела, крюковые подвески, двигатель" },
          { href: "https://truck-china.ru/katalog/avtokrany/avtokran-zoomlion-ztc1000v/", label: "Габариты в транспортном положении 14 990 × 2 900 × 3 990 мм, полная масса 50 000 кг, база и разлёт выносных опор" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на грузовое ТС свыше 8 тонн" },
        ]}
        note="Требуемая свободная зона 7 × 8 м — расчёт от опубликованного разлёта опор с запасом на подкладки, а не паспортное значение производителя; в КП он уточняется по фактической схеме площадки. Полную грузовую таблицу не публикуем: она зависит от конфигурации и положения опор."
      />
    </main>
  );
}
