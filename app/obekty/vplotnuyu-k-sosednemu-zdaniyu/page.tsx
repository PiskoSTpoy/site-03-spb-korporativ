import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W156, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 156. Тридцать пятый тип объекта — площадка вплотную к соседнему
  зданию. Угол how-to: как поставить кран и посчитать опасную зону, когда
  стена соседа в нескольких метрах. Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W156 в app/site-data.ts.
  Двор-колодец и арка — отдельная страница /obekty/zhiloy-dvor-mnogokvartirnogo-doma/,
  здесь — любая стеснённая площадка, где мешает соседнее строение.
  Ширину проезда и расстояние «от опоры до фундамента соседа» числом не
  печатаем: это решение ППР по конкретной площадке.
*/

const title = "Кран вплотную к соседнему зданию в Петербурге: спецификация";
const description =
  "Автокран в стеснённой застройке: 1 м от поворотной части до стены (п. 109 ФНП № 461), координатная защита (п. 133), опасная зона по СНиП 12-03-2001.";
const h1 = "Как поставить автокран вплотную к соседнему зданию?";
const canonical = "/obekty/vplotnuyu-k-sosednemu-zdaniyu/";
const published = "2026-09-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "gabarit", label: "Сколько места оставить между краном и стеной" },
  { id: "opasnaya-zona", label: "Как посчитать опасную зону у соседнего дома" },
  { id: "koordinatnaya-zashchita", label: "Координатная защита в стеснённых условиях" },
  { id: "okna", label: "Подача груза в окно или на балкон" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "На каком расстоянии от здания можно ставить автокран?",
    a: "П. 109 ФНП № 461 требует не менее 1 м между поворотной частью крана и строением при любом положении крана, в том числе с грузом. KRANNEVA проверяет этот зазор по всему углу поворота, а не только в транспортном положении машины.",
  },
  {
    q: "Что такое стеснённые условия для крана?",
    a: "Это площадка, где стрела, противовес или груз при повороте могут задеть здание, дерево или другую конструкцию. П. 133 ФНП № 461 запрещает работать там автокраном без координатной защиты, настроенной по ППР. KRANNEVA подбирает машину под это требование заранее.",
  },
  {
    q: "Как рассчитать опасную зону при работе крана?",
    a: "По таблице Г.1 СНиП 12-03-2001: к проекции груза прибавляют его наибольший размер и расстояние отлёта. При высоте подъёма до 10 м отлёт — 4 м, до 20 м — 7 м. KRANNEVA сверяет с ППР, попадает ли в эту зону соседний тротуар или вход.",
  },
  {
    q: "Можно ли подать груз краном прямо в окно?",
    a: "Только через приёмную площадку или специальное приспособление: п. 115 ФНП № 461 запрещает подачу груза в оконные проёмы, на балконы и лоджии без них. KRANNEVA закладывает площадку в схему подъёма до выезда.",
  },
  {
    q: "Какой кран лучше для узкой площадки между домами?",
    a: "Решают опорный контур и вылет. У Kato NK-250E-V по спецификации есть сокращённый контур около 4000 мм против стандартных 6000 мм, у XCMG QY60K — пятая опора над кабиной. KRANNEVA выбирает машину по схеме площадки из ППР.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Вплотную к соседнему зданию", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для работы в стеснённой застройке рядом с соседними зданиями",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Вплотную к соседнему зданию</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · стеснённая застройка</span>
          <h1>{h1}</h1>
          <p>
            Автокран у соседнего здания ставят так, чтобы между его поворотной частью и стеной
            оставался минимум 1 м при любом положении стрелы — это п. 109 ФНП № 461. В стеснённых
            условиях п. 133 тех же правил допускает только кран с координатной защитой, настроенной
            по ППР, а границу опасной зоны считают по таблице Г.1 СНиП 12-03-2001. KRANNEVA
            подбирает машину по схеме площадки: Kato NK-250E-V для узкого проезда, XCMG QY60K для
            дальнего вылета.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W156} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на площадку вплотную к соседнему зданию</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж и разгрузка на уплотнительной застройке, подъём оборудования на кровлю в плотном квартале, ремонт фасада или кровли со стороны узкого проезда, работы у брандмауэра соседнего дома</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link> (сокращённый опорный контур), <Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link> (пятая опора над кабиной)</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>зазор 1 м между поворотной частью и стеной (п. 109 ФНП № 461) по всему рабочему углу поворота</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР со схемой установки крана, границей опасной зоны и настройкой координатной защиты (п. 133 ФНП № 461)</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>согласование опасной зоны с владельцем соседнего здания, если она заходит на его вход, тротуар или двор</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="gabarit">Сколько места оставить между краном и стеной</h2>
        <p>
          П. 109 ФНП № 461 требует не менее 1 м между поворотной частью стрелового крана и
          строениями, штабелями и другими предметами — при любом положении, в том числе с грузом.
          Для площадки у соседнего дома это значит, что зазор проверяют по всей дуге, которую
          описывает противовес при повороте, а не по габариту машины в транспортном положении.
          KRANNEVA рисует эту дугу на схеме установки до подтверждения выезда.
        </p>
        <p>
          Узкий проезд у соседнего здания KRANNEVA закрывает машиной с компактной опорной схемой.
          У Kato NK-250E-V по паспортной спецификации FLEETfile, помимо стандартного опорного контура
          6000 мм, есть сокращённый — около 4000 мм, а XCMG QY60K несёт дополнительную опору над
          кабиной. Какой контур допустим для конкретного подъёма, определяет таблица грузоподъёмности
          машины, поэтому схему опор утверждает ППР.
        </p>

        <h2 id="opasnaya-zona">Как посчитать опасную зону у соседнего дома</h2>
        <p>
          Граница опасной зоны по приложению Г СНиП 12-03-2001 откладывается от проекции наименьшего
          габарита груза: к ней прибавляют наибольший размер груза и минимальное расстояние его
          отлёта при падении. Расстояние отлёта растёт с высотой подъёма, и KRANNEVA сводит его в
          таблицу для высот, типичных для петербургской застройки.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Минимальное расстояние отлёта по таблице Г.1 СНиП 12-03-2001</caption>
            <thead>
              <tr>
                <th scope="col">Высота возможного падения</th>
                <th scope="col">Груз, перемещаемый краном</th>
                <th scope="col">Предмет, падающий со здания</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">до 10 м</th><td className="dtable__num">4 м</td><td className="dtable__num">3,5 м</td></tr>
              <tr><th scope="row">до 20 м</th><td className="dtable__num">7 м</td><td className="dtable__num">5 м</td></tr>
              <tr><th scope="row">до 70 м</th><td className="dtable__num">10 м</td><td className="dtable__num">7 м</td></tr>
              <tr><th scope="row">до 120 м</th><td className="dtable__num">15 м</td><td className="dtable__num">10 м</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Пример расчёта KRANNEVA: стеновую панель длиной 6 м поднимают на высоту до 20 м. Граница
          опасной зоны проходит в 6 + 7 = 13 м от проекции панели. Примечание к таблице Г.1
          разрешает интерполяцию, поэтому для подъёма на 15 м отлёт можно принять 5,5 м, и граница
          сдвигается до 11,5 м. Если в эту полосу попадает вход или тротуар соседнего дома, ППР
          предусматривает его закрытие или перенос точки подъёма.
        </p>

        <h2 id="koordinatnaya-zashchita">Координатная защита в стеснённых условиях</h2>
        <p>
          П. 133 ФНП № 461 запрещает применять в стеснённых условиях автомобильные, пневмоколёсные
          и гусеничные краны без координатной защиты и требует настраивать её по ППР или
          технологической карте. Защита ограничивает поворот, вылет и высоту стрелы, чтобы кран
          физически не зашёл в запретную зону у стены соседа. KRANNEVA получает из ППР координаты
          ограничений и сверяет их с возможностями машины до выезда.
        </p>
        <ol>
          <li>Заказчик передаёт KRANNEVA ППР или исходные данные: схему площадки, расстояния до соседних строений, массы и габариты грузов.</li>
          <li>KRANNEVA подбирает машину, у которой при нужном вылете остаётся зазор 1 м по п. 109 ФНП № 461.</li>
          <li>Проектировщик ППР задаёт зоны запрета поворота и вылета для координатной защиты.</li>
          <li>Экипаж KRANNEVA настраивает защиту на площадке и проверяет её пробным поворотом без груза.</li>
          <li>Горизонтальное перемещение ведут на 0,5 м выше предметов на пути груза — п. 114 ФНП № 461.</li>
        </ol>

        <h2 id="okna">Подача груза в окно или на балкон</h2>
        <p>
          П. 115 ФНП № 461 запрещает подавать груз краном в оконные проёмы, на балконы и лоджии без
          специальных приёмных площадок или приспособлений. На уплотнительной застройке Петербурга
          это частая задача: оборудование или материалы нужно завести в помещение со стороны
          соседнего здания, где нет проезда. KRANNEVA закладывает приёмную площадку в схему подъёма
          заранее, иначе смена срывается на месте.
        </p>
        <p>
          Тот же п. 115 ФНП № 461 запрещает нахождение людей там, где их может зажать между частями
          крана и сооружениями. На площадке у стены соседнего дома стропальщик KRANNEVA не стоит
          между грузом и стеной, а зона за поворотной платформой закрывается. Расчёт смены: SANY
          STC400T — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))} без НДС,
          XCMG QY60K — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))}. Узкий двор с
          аркой разобран на странице{" "}
          <Link href="/obekty/zhiloy-dvor-mnogokvartirnogo-doma/">кран во дворе жилого дома</Link>.
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
        date={FACT_CHECK_W156}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), раздел «Установка ПС и производство работ» (пп. 109, 114, 115, 133)" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "Приказ Ростехнадзора № 461 — полный текст ФНП (второй экземпляр для сверки)" },
          { href: "https://zakonbase.ru/content/part/266653?print=1", label: "СНиП 12-03-2001 «Безопасность труда в строительстве. Часть 1», приложение Г «Границы опасных зон по действию опасных факторов», таблица Г.1" },
          { href: "https://www.fleetfile.com/crane/specifications/type_id=421", label: "FLEETfile — спецификация Kato NK-250E-v: опорный контур 6000/4000 мм" },
        ]}
        note="Пункты ФНП прочитаны в двух публикациях, текст совпал. Таблица Г.1 СНиП 12-03-2001 — по zakonbase.ru; значение для высоты до 10 м совпало с поисковой выдачей, полный текст на consultant.ru в дневное время закрыт. Ширину проезда и расстояние от опор до фундамента соседнего здания числом не приводим: это решение ППР по конкретной площадке."
      />
    </main>
  );
}
