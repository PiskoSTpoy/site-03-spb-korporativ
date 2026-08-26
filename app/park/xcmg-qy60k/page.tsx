import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import ParkModelArt from "../../components/ParkModelArt";
import Sources from "../../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK_W120, PRICE, rub, shiftTotal, MIN_SHIFT_HOURS } from "../../site-data";

const title = "XCMG QY60K — технический лист автокрана 60 т";
const description =
  "Технический лист XCMG QY60K: 60 т, пятисекционная стрела до 42 м, дополнительная выносная опора над кабиной, габариты серии QY60K5, требования к площадке.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/park/xcmg-qy60k/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const cls = PRICE[1];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Парк техники", item: `${SITE}/park/` },
    { "@type": "ListItem", position: 3, name: "XCMG QY60K", item: `${SITE}/park/xcmg-qy60k/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><Link href="/park/">Парк техники</Link><span>/</span><span>XCMG QY60K</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Технический лист · автокран 60 т</span>
          <h1>XCMG QY60K</h1>
          {/*
            Волна GEO. Лид переписан по правилу «ответ первым»: технический лист обязан отвечать
            числом уже в первых двух фразах. Числа не новые — 60 т, 42 м, до 60 м с гуськом
            и 41 000 кг стоят в таблице грузовысотной характеристики ниже и в site-data.ts.
          */}
          <p>
            XCMG QY60K — автокран на 60 т с пятисекционной телескопической стрелой до 42 м,
            высотой подъёма до 60 м с гуськом и массой 41 000 кг; в прайсе это верхняя граница
            городского класса. Берётся под более тяжёлые элементы и увеличенный вылет, когда кран
            физически не может подъехать вплотную к точке подъёма, но при этом объект ещё не требует
            тяжёлой портовой машины с её маршрутными согласованиями.
          </p>
        </div>
        <PrintButton label="Распечатать технический лист" />
      </section>

      <div className="wrap">
        <ParkModelArt
          modelName="XCMG QY60K"
          capacity="60 т"
          massLabel="41 000 кг"
          lengthLabel="14 380 мм (модификация QY60K5_S)"
          boomLabel="Стрела до 42 м, 5 секций"
          boomLen={175}
          boomAngle={22}
          sections={5}
          wheels={4}
          jib={{ label: "Гусёк", len: 55 }}
          heightLabel="До 60 м с гуськом"
          extraOutrigger={{ label: "Опора над кабиной" }}
          note="Опора над кабиной — часть операций без полного контура"
        />
      </div>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Грузовысотная характеристика и рабочее оборудование</caption>
            <tbody>
              <tr><th scope="row">Номинальная грузоподъёмность</th><td className="dtable__num">60 т на минимальном вылете</td></tr>
              <tr><th scope="row">Основная стрела</th><td className="dtable__num">до 42 м, пятисекционная телескопическая</td></tr>
              <tr><th scope="row">Высота подъёма с гуськом</th><td className="dtable__num">до 60 м</td></tr>
              <tr><th scope="row">Особенность опорной схемы</th><td>дополнительная выносная опора над кабиной водителя: часть операций выполняется без разворачивания полной штатной схемы опор</td></tr>
              <tr><th scope="row">Масса</th><td className="dtable__num">41 000 кг</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Габариты, опорная часть и требования к площадке</caption>
            <tbody>
              <tr><th scope="row">Габариты в транспортном положении</th><td className="dtable__num">по модификации серии QY60K5_S дилер приводит 14 380 × 2 700 × 3 590 мм при рабочей массе 41 900 кг и мощности 251 кВт (341 л.с.)</td></tr>
              <tr><th scope="row">Как читать эту строку</th><td>QY60K выпускался в нескольких модификациях, и габариты у них различаются. Габариты конкретной машины идут в КП по её паспорту, а не по каталогу серии</td></tr>
              <tr><th scope="row">Опирание</th><td>штатные выносные опоры плюс дополнительная опора над кабиной; на неполном опорном контуре доступная грузоподъёмность снижается по отдельной таблице</td></tr>
              <tr><th scope="row">Требования к опорной площадке</th><td>ровная площадка под все опоры; на историческом мощении и решётках площадь опирания увеличивается подкладками — это требование покрытия, а не грунта</td></tr>
              <tr><th scope="row">Городской режим</th><td>масса свыше 8 т: пропуск обязателен; длина свыше 14 м — маршрут проверяется на радиусы поворота во внутриквартальных проездах</td></tr>
              <tr><th scope="row">Типовые объекты</th><td><Link href="/obekty/promzona/">промышленные площадки</Link>, <Link href="/obekty/obekt-pod-ohranoy-kgiop/">стеснённые площадки в центре</Link>, крупная городская стройка</td></tr>
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
              <tr><th scope="row">Когда предъявляются</th><td>копии — заказчику при согласовании заявки, оригиналы — в кабине; на шестидесятитоннике почти всегда нужен ещё и городской грузовой пропуск, и его номер мы сообщаем до выезда, а не показываем на посту</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Класс прайса — {cls.cls}: от {rub(cls.rate)} за час без НДС, минимальная смена {MIN_SHIFT_HOURS} часов
          (от <span className="price-total">{rub(shiftTotal(cls.rate))}</span>).
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Почему пятая опора важнее, чем кажется</h2>
        <p>
          В плотной застройке центра Петербурга место под полное разворачивание опорного контура есть
          не всегда: узкий проезд, припаркованный ряд машин, историческое мощение, за границы которого
          выходить нельзя. Дополнительная опора над кабиной расширяет диапазон положений, в которых машина
          вообще может работать. Это не отменяет главного правила — на неполном контуре доступная
          грузоподъёмность меньше, — но даёт рабочий вариант там, где иначе пришлось бы отказываться
          от точки установки целиком.
        </p>
        <p>
          Если по вылету не проходит и эта машина, следующий шаг — не «взять кран потяжелее», а проверить,
          заедет ли он. Тяжёлый класс приезжает на более длинном многоосном шасси, и во двор через арку
          он может просто не попасть. Сравнение по парку — в{" "}
          <Link href="/park/">сводной таблице</Link>, требования по типам площадок — в разделе{" "}
          <Link href="/obekty/">«Объекты»</Link>.
        </p>
      </section>

      <Sources
        offer
        date={FACT_CHECK_W120}
        items={[
          { href: "https://xcmg911.by/product/avtokran-xcmg-qy60k5-s", label: "Официальный дилер XCMG — характеристики автокрана QY60K5_S: габариты 14 380 × 2 700 × 3 590 мм, рабочая масса 41 900 кг, мощность 251 кВт" },
          { href: "https://komtrans24.ru/tehnika/avtokrany/60-tonn/avtokran-xcmg-qy60k.html", label: "Каталог колёсных автокранов XCMG — модель QY60K" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на грузовое ТС свыше 8 тонн" },
        ]}
        note="Габариты приведены по модификации QY60K5_S и подписаны как данные модификации: сводить характеристики разных версий серии в одну строку было бы подгонкой. Размер опорного контура производитель в открытом доступе не публикует — в КП он идёт по паспорту конкретной машины."
      />
    </main>
  );
}
