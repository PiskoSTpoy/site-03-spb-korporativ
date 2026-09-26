import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W152, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 152. Тридцать первый тип объекта — яхт-клуб и марина в дельте Невы.
  Угол — СПб-практика: осенний подъём судов на берег в конце навигации и
  весенний спуск. Скелет статьи seo-2026-playbook.

  Фактура:
    · ФНП № 461 (ред. 16.04.2026) п. 114 — запрещается подъём груза, масса
      которого неизвестна; нельзя перемещать груз, когда под ним люди;
      п. 108 — свеженасыпанный неутрамбованный грунт; consultant.ru и
      rulaws.ru, формулировки совпали;
    · Водный кодекс РФ, ст. 65 ч. 15 п. 4 — в водоохранной зоне запрещены
      движение и стоянка транспорта вне дорог и оборудованных мест с твёрдым
      покрытием (vodnkod.ru, прочитано 26.09.2026; ранее сверено Волной про
      набережные).
  Массы судов, даты закрытия навигации и названия клубов не печатаем:
  масса — из документов конкретного судна, дату подъёма назначает клуб.
*/

const title = "Подъём яхт и катеров автокраном в Петербурге: осень и весна";
const description =
  "Подъём и спуск яхт автокраном в клубах дельты Невы: масса судна по п. 114 ФНП № 461, отсыпка берега, водоохранная зона, класс крана и ставка смены.";
const h1 = "Как поднять яхту автокраном в клубе на Неве и что подготовить заранее?";
const canonical = "/obekty/yakht-klub-i-marina/";
const published = "2026-09-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "massa", label: "Почему масса судна нужна до подъёма" },
  { id: "bereg", label: "Берег дельты Невы: отсыпка и водоохранная зона" },
  { id: "klass-krana", label: "Какой кран нужен для подъёма судов" },
  { id: "den-podyoma", label: "Как устроен день массового подъёма" },
  { id: "stoimost", label: "Сколько стоит смена в яхт-клубе" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли поднять яхту, если её точная масса неизвестна?",
    a: "Нет. П. 114 ФНП № 461 прямо запрещает подъём груза, масса которого неизвестна. KRANNEVA просит у владельца документы судна с массой и учитывает то, что на борту: топливо, воду, снаряжение. Без этих данных экипаж подъём не начнёт.",
  },
  {
    q: "Какой автокран нужен для подъёма катера или яхты?",
    a: "Класс задаёт вылет от точки установки до воды, а не только масса судна. Для небольших судов у причальной стенки KRANNEVA чаще подаёт SANY STC400T класса 25–40 т, для тяжёлых яхт и длинного вылета — XCMG QY60K класса 41–80 т.",
  },
  {
    q: "Можно ли поставить кран на газон у воды в яхт-клубе?",
    a: "Обычно нет. В водоохранной зоне ст. 65 Водного кодекса запрещает стоянку транспорта вне дорог и мест с твёрдым покрытием, а п. 108 ФНП № 461 — установку крана на свеженасыпанном грунте. KRANNEVA ставит кран на площадке с покрытием у слипа или причала.",
  },
  {
    q: "Сколько судов можно поднять за смену?",
    a: "Зависит от того, как клуб подготовил очередь: стропы, ложементы, владельцев на месте. KRANNEVA не обещает норму подъёмов в час — в минимальную смену 8 часов укладывается столько судов, сколько клуб успевает подвести и принять на ложементы.",
  },
  {
    q: "Кто стропит яхту — экипаж крана или клуб?",
    a: "Стропальщики KRANNEVA стропят судно по схеме строповки, согласованной с владельцем или клубом. Места строповки на корпусе и положение лагов указывает владелец: они зависят от конструкции конкретного судна.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Яхт-клуб и марина", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для подъёма и спуска яхт и катеров в яхт-клубе",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Яхт-клуб и марина</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · яхт-клуб</span>
          <h1>{h1}</h1>
          <p>
            Яхту поднимают автокраном только при известной массе: п. 114 ФНП № 461 запрещает подъём
            груза, масса которого неизвестна. Второе условие — точка установки: берег у слипа бывает
            подсыпан, а на свеженасыпанном грунте кран ставить нельзя (п. 108). KRANNEVA
            заранее получает от клуба список судов с массами и схему площадки у слипа, а потом
            подаёт SANY STC400T или XCMG QY60K — по вылету до воды.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W152} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники в яхт-клуб и марину</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>осенний подъём яхт и катеров на берег, весенний спуск на воду, перестановка судов на ложементы и трейлеры, установка и снятие мачт, подъём понтонов и секций плавучих причалов</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls} — класс задаёт вылет от площадки с твёрдым покрытием до воды</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link> для тесной территории клуба, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link> для длинного вылета</td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>масса каждого судна должна быть известна до подъёма (п. 114 ФНП № 461); кран не встаёт на свежую отсыпку берега (п. 108)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР или технологическая карта (п. 98 ФНП № 461), список судов с массами и схемами строповки</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>график подъёма, который клуб назначает на конец навигации; пропуск на территорию; маршрут крана на острова</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="massa">Почему масса судна нужна до подъёма</h2>
        <p>
          П. 114 ФНП № 461 запрещает подъём груза, масса которого неизвестна, и для яхты это самое
          частое препятствие в день подъёма. Паспортная масса судна отличается от фактической: на борту
          остаются топливо, пресная вода, аккумуляторы, снаряжение, а в трюме — вода. KRANNEVA просит
          владельца указать массу по документам и то, что на борту сверх неё.
        </p>
        <p>
          Список судов с массами клуб передаёт KRANNEVA за несколько дней до подъёма. По нему мы
          выбираем класс крана и порядок: сначала суда, для которых хватает вылета с первой точки,
          потом те, ради которых кран переставляют.
        </p>

        <h2 id="bereg">Берег дельты Невы: отсыпка и водоохранная зона</h2>
        <p>
          Берег у слипа в клубах дельты Невы нередко подсыпают и выравнивают, а п. 108
          ФНП № 461 запрещает ставить кран на свеженасыпанном неутрамбованном грунте. KRANNEVA ставит
          кран на площадке с покрытием у слипа или причальной стенки и просит клуб отметить на схеме
          участки, где грунт подсыпали недавно.
        </p>
        <p>
          Площадка клуба у воды лежит в водоохранной зоне, и ст. 65 Водного кодекса (ч. 15 п. 4) запрещает
          там движение и стоянку транспорта вне дорог и оборудованных мест с твёрдым покрытием. Поэтому
          KRANNEVA не ставит кран на газон у воды, даже если так ближе. Подробно о режиме зоны — на
          странице <Link href="/obekty/naberezhnaya-i-vodoohrannaya-zona/">набережная и водоохранная зона</Link>;
          о грунтах — <Link href="/obekty/namyvnaya-territoriya/">намывная территория</Link>.
        </p>

        <h2 id="klass-krana">Какой кран нужен для подъёма судов</h2>
        <p>
          Класс крана для яхт-клуба KRANNEVA выбирает по двум числам: масса самого тяжёлого судна из
          списка и вылет от площадки с покрытием до точки над водой. SANY STC400T класса 25–40 т
          закрывает катера и небольшие яхты у причальной стенки. XCMG QY60K класса 41–80 т нужен, когда
          площадка дальше от воды или в списке есть тяжёлая килевая яхта.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Выбор машины KRANNEVA для яхт-клуба</caption>
            <thead>
              <tr>
                <th scope="col">Условие в клубе</th>
                <th scope="col">Машина</th>
                <th scope="col">Почему</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Узкий проезд, площадка у слипа</th><td>Kato NK-250E-V</td><td>минимальный радиус разворота 9,5 м и уменьшенный опорный контур</td></tr>
              <tr><th scope="row">Катера и лёгкие яхты у стенки</th><td>SANY STC400T</td><td>класс {light.cls} с коротким вылетом</td></tr>
              <tr><th scope="row">Тяжёлые яхты или площадка далеко от воды</th><td>XCMG QY60K</td><td>класс {mid.cls} держит массу на длинном вылете</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="den-podyoma">Как устроен день массового подъёма</h2>
        <p>
          Массовый подъём в яхт-клубе KRANNEVA проводит по очереди, которую составляет клуб, и
          экипаж работает в одной точке установки как можно дольше. Под поднятым судном людей нет —
          п. 114 ФНП № 461 запрещает перемещать груз, когда под ним люди, поэтому владельцы ждут за
          ограждением зоны работы крана.
        </p>
        <ol>
          <li>Клуб передаёт список судов с массами и схему площадки; KRANNEVA готовит технологическую карту.</li>
          <li>Суда подходят к стенке по очереди; владелец показывает места строповки на корпусе.</li>
          <li>Стропальщики KRANNEVA стропят судно, кран поднимает его на 0,2–0,3 м и останавливается для проверки строповки (п. 114).</li>
          <li>Судно переносят на ложемент или трейлер; следующее подходит к стенке.</li>
        </ol>
        <p>
          Маршрут крупного крана на острова в период навигации KRANNEVA сверяет с графиком разводки
          мостов — общие условия подачи в разделе <Link href="/obekty/">«Объекты»</Link>.
        </p>

        <h2 id="stoimost">Сколько стоит смена в яхт-клубе</h2>
        <p>
          Ставка KRANNEVA в яхт-клубе зависит только от класса крана, а не от числа судов. Смена SANY
          STC400T — от {rub(light.rate)} в час без НДС, минимум {MIN_SHIFT_HOURS} часов, итого от{" "}
          {rub(shiftTotal(light.rate))}. Смена XCMG QY60K — от {rub(shiftTotal(mid.rate))} без НДС.
          Клубу выгодно собрать подъём в одну длинную смену, а не вызывать кран под каждое судно.
        </p>
        <p>
          С яхт-клубом KRANNEVA заключает договор на сезон: весенний спуск и осенний подъём по
          заявкам — условия в разделе <Link href="/dlya-zakupok/">«Для закупок»</Link>. Соседние
          типы объектов — <Link href="/obekty/port-i-terminal/">порт и терминал</Link>{" "}
          и <Link href="/obekty/gidrotehnicheskoe-sooruzhenie/">гидротехническое сооружение</Link>.
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
        date={FACT_CHECK_W152}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), раздел «Установка ПС и производство работ» (пп. 98, 108, 114)" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "Приказ Ростехнадзора № 461 — полный текст ФНП «Правила безопасности ОПО, на которых используются подъёмные сооружения» (rulaws.ru)" },
          { href: "https://vodnkod.ru/glava-6/st-65-vk-rf", label: "vodnkod.ru — текст ст. 65 Водного кодекса РФ, ч. 15 п. 4: движение и стоянка транспорта в водоохранной зоне" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_60683/", label: "КонсультантПлюс — Водный кодекс РФ от 03.06.2006 № 74-ФЗ" },
        ]}
        note="Пункты 108 и 114 ФНП № 461 прочитаны в двух независимых источниках, формулировки совпали. Массы судов, норму подъёмов за смену и даты закрытия навигации не приводим: масса берётся из документов конкретного судна, дату подъёма назначает клуб. Радиус разворота Kato NK-250E-V — из карточки машины в разделе «Парк»."
      />
    </main>
  );
}
