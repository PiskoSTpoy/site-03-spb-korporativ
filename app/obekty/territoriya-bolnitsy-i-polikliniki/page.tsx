import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W176, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 176. Пятьдесят пятый тип объекта — территория действующей больницы
  или поликлиники. Угол практический (шум у палат, подъезд скорой).

  Разграничена с territoriya-shkoly-i-detskogo-sada (там образовательное
  учреждение) и rabota-kranom-nochyu-i-v-vyhodnye (там жилой дом). Здесь —
  нормы шума для палат и прилегающей территории больницы.

  Фактура — в комментарии к FACT_CHECK_W176 в app/site-data.ts. Применимость
  табл. 5.35 к временному шуму стройки в каждом случае определяет замер и
  Роспотребнадзор, поэтому страница не обещает «допустимо/недопустимо».
*/

const title = "Кран у действующей больницы: нормы шума днём и ночью";
const description =
  "Рядом с больницей СанПиН 1.2.3685-21 ограничивает шум 45 дБА днём и 35 дБА ночью на территории. Как KRANNEVA планирует смену крана у палат.";
const h1 = "Можно ли работать краном рядом с действующей больницей и какой шум допустим?";
const canonical = "/obekty/territoriya-bolnitsy-i-polikliniki/";
const published = "2026-10-04";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "normy", label: "Какие нормы шума действуют у больницы" },
  { id: "primenimost", label: "Как нормы применяются к работе крана" },
  { id: "podezd", label: "Подъезд скорой и доступ на территорию" },
  { id: "plan", label: "Как KRANNEVA планирует смену" },
  { id: "raschet", label: "Сколько стоит смена у больницы" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Какой уровень шума допустим на территории рядом с больницей?",
    a: "По таблице 5.35 СанПиН 1.2.3685-21 для территорий, прилегающих к зданиям больниц и санаториев, эквивалентный уровень звука — 45 дБА с 7 до 23 часов и 35 дБА с 23 до 7 часов; максимальный уровень — 60 и 50 дБА соответственно.",
  },
  {
    q: "А какой уровень нормируется внутри палат?",
    a: "Для палат больниц и санаториев таблица 5.35 задаёт 35 дБА эквивалентного уровня днём и 25 дБА ночью, максимальный уровень — 50 и 40 дБА. Это нормы для помещений, они строже норм для территории.",
  },
  {
    q: "Значит, кран у больницы работать не может?",
    a: "Это не следует из таблицы. Она задаёт гигиенические нормы по шуму, а вывод о конкретной стройке делает замер на месте. KRANNEVA не обещает, что смена уложится в норму, и не называет конкретный шум своих машин числом — его нет в проверенных источниках.",
  },
  {
    q: "Можно ли ставить кран на ночную смену у больницы?",
    a: "Ночью нормы строже — 35 дБА на территории и 25 дБА в палатах. KRANNEVA планирует подъёмы на дневное время, а ночной выезд обсуждает только если заказчик подтверждает отдельные условия работы у конкретных корпусов.",
  },
  {
    q: "Блокирует ли кран подъезд скорой помощи?",
    a: "Может, если опоры или стрела перекрывают проезд. Поэтому KRANNEVA начинает заявку с схемы подъездов на территории и держит сквозной проезд свободным; расположение путей скорой помощи сообщает заказчик или больница.",
  },
  {
    q: "Сколько стоит смена крана у больницы?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Наценки «за больницу» в прайсе нет.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Территория больницы и поликлиники", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана на территории действующей больницы или поликлиники",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Территория больницы и поликлиники</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · территория больницы</span>
          <h1>{h1}</h1>
          <p>
            У действующей больницы санитарная таблица 5.35 СанПиН 1.2.3685-21 ограничивает шум
            на прилегающей территории 45 дБА днём и 35 дБА ночью, а в палатах — 35 и 25 дБА, и
            поэтому KRANNEVA планирует смену крана на дневные часы и держит стрелу в стороне от
            окон палат. Нормы не запрещают работу крана сами по себе: вывод о конкретной стройке
            даёт замер на месте, а не прайс арендодателя.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W176} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Нормы шума у больницы по таблице 5.35 СанПиН 1.2.3685-21, дБА</caption>
            <thead>
              <tr>
                <th scope="col">Где нормируется</th>
                <th scope="col">Эквивалентный, 7–23 ч</th>
                <th scope="col">Максимальный, 7–23 ч</th>
                <th scope="col">Эквивалентный, 23–7 ч</th>
                <th scope="col">Максимальный, 23–7 ч</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Палаты больниц и санаториев</th><td className="dtable__num">35</td><td className="dtable__num">50</td><td className="dtable__num">25</td><td className="dtable__num">40</td></tr>
              <tr><th scope="row">Территории, прилегающие к зданиям больниц и санаториев</th><td className="dtable__num">45</td><td className="dtable__num">60</td><td className="dtable__num">35</td><td className="dtable__num">50</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на территорию больницы</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>шум у окон палат и свободный проезд скорой помощи, а не высота подъёма</td></tr>
              <tr><th scope="row">Рекомендуемое время смены</th><td>дневное, 7–23 ч, когда нормы мягче</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="normy">Какие нормы шума действуют у больницы</h2>
        <p>
          Таблица 5.35 СанПиН 1.2.3685-21 задаёт для территорий рядом с больницами 45 дБА
          эквивалентного уровня днём и 35 дБА ночью, максимальный уровень — 60 и 50 дБА. Для
          палат нормы строже: 35 и 25 дБА эквивалентного, 50 и 40 дБА максимального уровня.
          День в таблице — с 7 до 23 часов, ночь — с 23 до 7. KRANNEVA берёт эти цифры как
          ориентир для планирования смены, а не как гарантию соответствия.
        </p>
        <p>
          Разница между палатой и территорией — десять децибел и в день, и в ночь, и она
          объясняет, почему расстояние стрелы до фасада с палатами важнее, чем расстояние до
          ограды участка. Тот же приём «норма ставит предел до начала смены» уже описан на
          странице <Link href="/obekty/territoriya-shkoly-i-detskogo-sada/">школы и детского сада</Link>.
        </p>

        <h2 id="primenimost">Как нормы применяются к работе крана</h2>
        <p>
          Таблица 5.35 не называет кран, стройку или конкретную машину, а задаёт
          гигиенические нормы для помещений и территории. Соответствует ли им конкретная смена,
          определяет замер на месте. KRANNEVA не публикует уровень шума SANY STC400T или XCMG
          QY60K: этой величины в проверенных источниках нет, а типовое число расходилось бы
          с замером у вашего корпуса.
        </p>
        <p>
          Практически это значит, что заказчик, у которого рядом больница, заранее
          договаривается с её администрацией о часах и стороне подачи. Общие правила
          шума при строительных работах для жилой застройки разобраны на странице{" "}
          <Link href="/obekty/rabota-kranom-nochyu-i-v-vyhodnye/">работы краном ночью и в выходные</Link>:
          они относятся к жилью, а для больницы действуют свои строки таблицы.
        </p>

        <h2 id="podezd">Подъезд скорой и доступ на территорию</h2>
        <p>
          Автокран SANY STC400T или XCMG QY60K, перекрывший проезд к приёмному отделению, опаснее шума. KRANNEVA
          начинает заявку с запроса схемы подъездов: где проезжает скорая помощь, где
          вход, где разгрузка. Опоры SANY STC400T и XCMG QY60K ставятся так, чтобы сквозной
          проезд оставался свободным, а если площадь не позволяет, подъём переносится на
          согласованный интервал.
        </p>
        <p>
          Режим входа на территорию — вопрос самой больницы: пропуска, время доступа и
          ответственное лицо назначает её администрация, и KRANNEVA не берёт на себя эту
          процедуру. Для работ у проезжей части рядом с участком может понадобиться ордер ГАТИ,
          порядок описан на странице <Link href="/obekty/rabota-s-zanyatiem-proezzhey-chasti/">занятия проезжей части</Link>.
        </p>

        <h2 id="plan">Как KRANNEVA планирует смену</h2>
        <p>
          Смена у больницы планируется на дневные часы с 7 до 23, потому что ночью нормы строже на 10
          дБА. Стрела не заводится над корпусами с палатами. Если работа
          невозможна без ночного выезда, KRANNEVA обсуждает его отдельно с заказчиком и больницей.
        </p>
        <p>
          Выбор между классами идёт по вылету и высоте, а не по тоннажу: принцип разобран на
          странице <Link href="/obekty/dvor-kolodets-istoricheskogo-tsentra/">двора-колодца</Link>,
          и на больничной территории с узкими проездами он тот же.
        </p>

        <h2 id="raschet">Сколько стоит смена у больницы</h2>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))}, класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))} без НДС. Отдельной наценки «за больницу» или «за режим
          территории» в прайсе нет — действует тот же класс и та же ставка, что и на любом
          объекте с сопоставимым вылетом.
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
        date={FACT_CHECK_W176}
        items={[
          { href: "https://sudact.ru/law/postanovlenie-glavnogo-gosudarstvennogo-sanitarnogo-vracha-rf-ot_1430/sanpin-1.2.3685-21/v/gigienicheskie-normativy-fizicheskikh-faktorov-v/tablitsa-5.35/", label: "СанПиН 1.2.3685-21, таблица 5.35 — нормируемые параметры шума: палаты больниц и санаториев, территории, прилегающие к зданиям больниц и санаториев" },
          { href: "https://sudact.ru/law/postanovlenie-glavnogo-gosudarstvennogo-sanitarnogo-vracha-rf-ot_1430/sanpin-1.2.3685-21/", label: "Судакт — постановление Главного государственного санитарного врача РФ от 28.01.2021 № 2, СанПиН 1.2.3685-21" },
          { href: "https://www.consultant.ru/cons/cgi/online.cgi?req=doc;base=SPB;n=226101", label: "постановление Правительства Санкт-Петербурга от 06.10.2016 № 875 — правила производства работ и ордера ГАТИ" },
        ]}
        note="Таблица 5.35 задаёт нормы для помещений и территорий, а не для конкретной машины: уровень шума SANY STC400T и XCMG QY60K страница не называет — в проверенных источниках его нет. Применимость таблицы к временному шуму конкретной стройки определяет замер и орган санитарного надзора, страница не утверждает ни «допустимо», ни «недопустимо». Режим допуска на территорию больницы и схему подъездов скорой помощи задаёт сама больница."
      />
    </main>
  );
}
