import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W157, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 157. Тридцать шестой тип объекта — демонтаж и снос здания. Угол
  коммерческий/сравнительный: где по СП 325.1325800.2017 нужен кран
  (поэлементная разборка), а где — экскаватор (обрушение), и как считается
  аренда крана. Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W157 в app/site-data.ts.
  Экскаваторы KRANNEVA не сдаёт — в тексте они только как альтернатива из СП.
  Массы демонтируемых элементов и число смен «типовыми» числами не печатаем:
  это расчёт ППР по конкретному зданию.
*/

const title = "Демонтаж здания краном в Петербурге: спецификация";
const description =
  "Кран или экскаватор для сноса: способы по СП 325.1325800.2017, запрет подъёма элементов, не освобождённых от связей, и расчёт аренды автокрана по сменам.";
const h1 = "Кран или экскаватор для демонтажа здания: что выбрать?";
const canonical = "/obekty/demontazh-i-snos-zdaniya/";
const published = "2026-09-28";

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
  { id: "sposob", label: "Какой способ сноса задаёт СП 325.1325800.2017" },
  { id: "kogda-kran", label: "Когда демонтаж ведут краном" },
  { id: "osvobozhdenie", label: "Подъём элемента: что запрещено" },
  { id: "raschet", label: "Сколько стоит кран на демонтаже" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли снести здание автокраном?",
    a: "Да, для одно- и двухэтажных зданий п. 7.1а СП 325.1325800.2017 прямо называет автокраны наряду с гидравлическими экскаваторами. Для панельных и монолитных домов выше основным становится экскаватор. KRANNEVA выделяет кран под поэлементную разборку по ППР.",
  },
  {
    q: "Кто решает, чем разбирать здание — краном или экскаватором?",
    a: "Проект организации работ по сносу (ПОД) устанавливает методы, а ППР на его основе выбирает механизацию по эксплуатационным и технико-экономическим показателям — пп. 5.7, 5.8 и 9.1 СП 325.1325800.2017. KRANNEVA подбирает класс крана под этот ППР.",
  },
  {
    q: "Почему кран не может вырвать плиту из перекрытия?",
    a: "П. 10.10 СП 325.1325800.2017 запрещает поднимать железобетонный элемент, не полностью освобождённый от связей, а п. 115 ФНП № 461 — груз, укреплённый болтами или залитый бетоном. Экипаж KRANNEVA поднимает элемент только после резки связей и отрыва домкратом.",
  },
  {
    q: "Можно ли стропить старую плиту за монтажные петли?",
    a: "Нет. П. 10.11 СП 325.1325800.2017 запрещает строповку железобетонных элементов за сохранившиеся монтажные петли — только сертифицированными приспособлениями или инвентарными стропами. KRANNEVA проверяет схему строповки в ППР до начала смены.",
  },
  {
    q: "Сколько стоит аренда крана на демонтаж?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов: SANY STC400T — от ${rub(shiftTotal(light.rate))}, XCMG QY60K — от ${rub(shiftTotal(mid.rate))}, кран класса ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. Число смен KRANNEVA считает по графику разборки из ППР.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Демонтаж и снос здания", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для демонтажа и поэлементной разборки зданий",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Демонтаж и снос здания</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · демонтаж</span>
          <h1>{h1}</h1>
          <p>
            Кран на демонтаже нужен там, где здание разбирают поэлементно: п. 7.1а СП 325.1325800.2017
            допускает автокраны для сноса одно- и двухэтажных зданий, а плиты покрытия, фермы,
            колонны и балки более высоких домов снимают краном после резки связей. Обрушение
            панельных и монолитных зданий до 25 м тот же пункт отдаёт экскаватору с ножницами.
            KRANNEVA подаёт кран класса {light.cls}–{heavy.cls} под график разборки из ППР.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W157} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи крана на демонтаж здания</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>снятие плит покрытия и перекрытий, демонтаж ферм, колонн и подкрановых балок, разборка малоэтажных зданий, спуск оборудования и крупных блоков кладки, погрузка элементов в транспорт</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls}, {mid.cls} и {heavy.cls} — по массе самого тяжёлого элемента на нужном вылете</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>неизвестная масса элемента и связи, которые держат его в конструкции (п. 114, 115 ФНП № 461; п. 10.10 СП 325.1325800.2017)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ПОД (п. 5.7 СП 325.1325800.2017) и ППР на его основе (п. 5.8) со схемами строповки и массами элементов</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>темп подготовки элементов к подъёму: резка связей, отрыв домкратом или гидроклином</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(heavy.rate)}/час ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="sposob">Какой способ сноса задаёт СП 325.1325800.2017</h2>
        <p>
          П. 7.1 СП 325.1325800.2017 называет механизированный способ обрушения основным, а п. 7.1а
          распределяет технику по высоте и конструкции здания. KRANNEVA сводит это распределение в
          таблицу, чтобы заказчик сразу видел, где в проекте сноса место для крана.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Техника для сноса по п. 7.1а СП 325.1325800.2017</caption>
            <thead>
              <tr>
                <th scope="col">Здание</th>
                <th scope="col">Основная техника по СП</th>
                <th scope="col">Роль крана KRANNEVA</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Одно- и двухэтажное</th><td>гидравлический экскаватор или автокран, пневмоколёсный, гусеничный кран</td><td>основная машина при поэлементной разборке</td></tr>
              <tr><th scope="row">Высотой до 10 м</th><td>экскаватор со стандартной стрелой</td><td>снятие кровли, оборудования, крупных элементов до обрушения</td></tr>
              <tr><th scope="row">Панельное до пяти этажей</th><td>экскаватор с универсальными гидравлическими захватами</td><td>демонтаж плит и панелей, если здание разбирают, а не обрушают</td></tr>
              <tr><th scope="row">Панельное или монолитное до 25 м</th><td>экскаватор с гидравлическими или механическими ножницами</td><td>подготовительные работы и погрузка</td></tr>
              <tr><th scope="row">Около 50 м</th><td>экскаватор со стрелой до 60 м</td><td>подготовительные работы и погрузка</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Выбор конкретной машины п. 9.1 СП 325.1325800.2017 отдаёт ППР: механизацию подбирают по
          эксплуатационным характеристикам и технико-экономическим показателям. KRANNEVA получает от
          проектировщика ППР перечень элементов с массами и вылетами и под него называет класс крана.
        </p>

        <h2 id="kogda-kran">Когда демонтаж ведут краном</h2>
        <p>
          Поэлементная разборка краном по разделу 6 СП 325.1325800.2017 нужна, когда здание нельзя
          обрушить: вплотную стоят соседние дома, элементы идут в повторное использование или
          сносится только часть корпуса. Кран снимает плиты покрытия, фермы, колонны, подкрановые
          балки и стропила целиком, а блоки кирпичной кладки — размером, который п. 6.11.1 привязывает
          к грузоподъёмности механизма. KRANNEVA подбирает машину под самый тяжёлый элемент.
        </p>
        <p>
          В плотной застройке Петербурга площадку демонтажа KRANNEVA проверяет теми же правилами, что
          и любую стеснённую площадку: зазор 1 м от поворотной части до строений и координатная защита
          крана. Порядок разобран на странице{" "}
          <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">кран вплотную к соседнему зданию</Link>,
          а работы на территории памятника —{" "}
          <Link href="/obekty/obekt-pod-ohranoy-kgiop/">объект под охраной КГИОП</Link>.
        </p>

        <h2 id="osvobozhdenie">Подъём элемента: что запрещено</h2>
        <p>
          П. 10.10 СП 325.1325800.2017 запрещает поднимать железобетонный элемент, не полностью
          освобождённый от связей, вытягивать краном защемлённые стропы и оттягивать груз при
          подъёме. П. 115 ФНП № 461 добавляет запрет на подъём груза, укреплённого болтами или
          залитого бетоном. Экипаж KRANNEVA работает по последовательности из СП.
        </p>
        <ol>
          <li>Стропальщик крепит элемент инвентарными стропами или сертифицированными захватами — за старые монтажные петли нельзя (п. 10.11 СП 325.1325800.2017).</li>
          <li>Крановщик KRANNEVA даёт слабый натяг строп, после чего режут металлические связи (п. 6.8.3).</li>
          <li>Элемент отрывают от опоры гидроклином или домкратом, а не краном (пп. 6.8.4, 6.13.3).</li>
          <li>Кран приподнимает элемент над местом установки — балку на 0,5 м по п. 6.13.3 — и переносит к транспорту.</li>
          <li>Связь крановщика со стропальщиками — по радио, канаты при подъёме вертикальны (п. 10.10).</li>
        </ol>
        <p>
          Массу каждого элемента KRANNEVA берёт из ППР: п. 114 ФНП № 461 запрещает подъём груза с
          неизвестной массой, а у старого здания она часто отличается от проектной из-за стяжек,
          засыпки и ремонтов. Если массы в ППР нет, выезд не подтверждается.
        </p>

        <h2 id="raschet">Сколько стоит кран на демонтаже</h2>
        <p>
          Стоимость крана на демонтаже KRANNEVA считает сменами по {MIN_SHIFT_HOURS} часов, а число
          смен задаёт темп подготовки элементов, а не скорость самого подъёма: пока режут связи,
          кран ждёт. Смена SANY STC400T — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))}, XCMG QY60K — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))}, кран класса {heavy.cls} — {rub(heavy.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(heavy.rate))} без НДС.
        </p>
        <p>
          Выгоднее всего кран KRANNEVA работает на демонтаже, когда ППР собирает подготовленные
          элементы в пакеты на одну смену: связи срезаны заранее, кран приезжает на снятие и
          погрузку. Условия договора и оформление для закупок — в разделе{" "}
          <Link href="/dlya-zakupok/">для закупок</Link>.
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
        date={FACT_CHECK_W157}
        items={[
          { href: "https://meganorm.ru/mega_doc/norm_update_26042025/pravila/0/sp_325_1325800_2017_svod_pravil_zdaniya_i_sooruzheniya.html", label: "СП 325.1325800.2017 «Здания и сооружения. Правила производства работ при демонтаже и утилизации» (ред. Изм. № 2 от 27.12.2024) — пп. 5.7, 5.8, 6.8.3, 6.8.4, 6.11.1, 6.13.3, 7.1а, 9.1, 10.10, 10.11" },
          { href: "https://minstroyrf.gov.ru/docs/16443/", label: "Минстрой России — карточка СП 325.1325800.2017" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), пп. 114, 115" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "Приказ Ростехнадзора № 461 — полный текст ФНП (второй экземпляр для сверки)" },
        ]}
        note="Пункты 7.1а, 9.1, 10.10 и 10.11 СП 325.1325800.2017 прочитаны в двух публикациях (meganorm.ru, редакция 2025 года, и PDF редакции 2021 года), текст совпал. Массы демонтируемых элементов и число смен на здание не приводим: это расчёт ППР по конкретному объекту. Экскаваторы KRANNEVA не сдаёт — в таблице они указаны как техника по своду правил."
      />
    </main>
  );
}
