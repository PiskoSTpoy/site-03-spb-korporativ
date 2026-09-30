import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W163, MIN_SHIFT_HOURS, PRICE, PARK, rub, shiftTotal } from "../../site-data";

/*
  Волна 163. Сорок второй тип объекта — монтаж и демонтаж башенного крана
  автокраном. Угол коммерческий/сравнительный: какой класс машины парка
  брать под монтажные единицы. Скелет статьи seo-2026-playbook.

  Фактура — в комментарии к FACT_CHECK_W163 в app/site-data.ts. Массы секций
  и противовесов башенных кранов НЕ печатаем: они берутся из паспорта конкретной
  модели. Параметры машин (стрела, высота) — только из PARK.
*/

const title = "Монтаж башенного крана автокраном: какой класс";
const description =
  "Монтаж и демонтаж башенного крана автокраном ведут по ППР или ТК под руководством ИТР (пп. 38–39 ФНП № 461); класс машины выбирают по массе секции.";
const h1 = "Каким автокраном монтировать башенный кран и что требует ФНП?";
const canonical = "/obekty/montazh-bashennogo-krana-avtokranom/";
const published = "2026-09-30";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];
const heavy = PRICE[2];
const sany = PARK[0];
const xcmg = PARK[1];
const ltm1090 = PARK[2];
const ztc = PARK[3];

const toc = [
  { id: "dokumenty", label: "Какие документы нужны на монтаж и демонтаж" },
  { id: "chto-reshaet", label: "Что решает выбор класса автокрана" },
  { id: "sravnenie", label: "Сравнение машин парка для монтажа" },
  { id: "kogda-legche", label: "Когда лёгкий класс достаточен, а когда нет" },
  { id: "raschet", label: "Сколько стоит смена монтажа" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Что нужно для монтажа башенного крана автокраном?",
    a: "Проект производства работ или технологическая карта на монтаж и демонтаж: пункт 38 ФНП № 461 требует их для монтажа, демонтажа и ремонта оборудования с применением подъёмных сооружений. Работы ведутся под руководством инженерно-технического работника, ответственного за безопасное производство работ (п. 39). KRANNEVA подаёт автокран после получения ППР или ТК.",
  },
  {
    q: "Как выбрать грузоподъёмность автокрана для монтажа башенного крана?",
    a: "По массе самой тяжёлой монтажной единицы из паспорта башенного крана и по вылету, на котором её ставят. Названия класса недостаточно: секция на большом вылете может оказаться тяжелее, чем позволяет таблица машины меньшего класса. KRANNEVA просит паспорт башенного крана с массами секций до выбора машины.",
  },
  {
    q: "Кто руководит монтажом башенного крана?",
    a: "Инженерно-технический работник, ответственный за безопасное производство работ с применением ПС. Пункт 39 ФНП № 461 требует, чтобы работы по монтажу выполнялись под его руководством, а участников до начала работ инструктировали. KRANNEVA просит заказчика назвать этого работника в заявке.",
  },
  {
    q: "Какая машина KRANNEVA подходит для самых высоких башенных кранов?",
    a: `Ориентир по высоте — параметры из парка: Zoomlion ZTC1000V имеет стрелу ${ztc.boom} и высоту ${ztc.height}, Liebherr LTM 1090-4.1 — ${ltm1090.boom} и ${ltm1090.height}. Окончательно выбирают по грузовой характеристике машины на нужном вылете, а не по этим цифрам.`,
  },
  {
    q: "Сколько стоит смена автокрана на монтаже?",
    a: `Смена от ${MIN_SHIFT_HOURS} часов: SANY STC400T — от ${rub(shiftTotal(light.rate))}, кран класса ${mid.cls} — от ${rub(shiftTotal(mid.rate))}, класса ${heavy.cls} — от ${rub(shiftTotal(heavy.rate))} без НДС. ППР на монтаж — отдельная позиция подготовки.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Монтаж и демонтаж башенного крана автокраном", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для монтажа и демонтажа башенного крана по ППР",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Монтаж и демонтаж башенного крана автокраном</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · монтаж башенного крана</span>
          <h1>{h1}</h1>
          <p>
            Монтаж и демонтаж башенного крана автокраном ведут по проекту производства работ или
            технологической карте под руководством инженерно-технического работника: этого требуют
            пункты 38 и 39 ФНП № 461. Класс автокрана KRANNEVA подбирает по массе самой тяжёлой
            монтажной единицы из паспорта башенного крана и по вылету, а не по названию класса.
            Сравнение четырёх машин парка по стреле и высоте — в таблице ниже.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W163} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи автокрана на монтаж или демонтаж башенного крана</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>установка секций и противовесов башенного крана при монтаже, разбор при демонтаже, подача узлов на площадку</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{heavy.cls} — по массе тяжёлой монтажной единицы и вылету её установки</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link>, <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link>, <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>масса монтажной единицы на вылете установки по паспорту башенного крана и по таблице автокрана</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР или ТК на монтаж (п. 38), руководитель из ИТР (п. 39), инструктаж участников до начала работ</td></tr>
              <tr><th scope="row">Что не печатаем</th><td>массы секций конкретных моделей башенных кранов — они в паспорте, не в нашей таблице</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls}), {rub(heavy.rate)} ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="dokumenty">Какие документы нужны на монтаж и демонтаж</h2>
        <p>
          Пункт 38 ФНП № 461 (ред. от 16.04.2026) требует разработать ППР и (или) технологическую
          карту на монтаж, демонтаж и ремонт оборудования с применением подъёмных сооружений.
          Пункт 39 добавляет руководителя: работы выполняются под руководством инженерно-технического
          работника, ответственного за безопасное производство работ, а участников монтажа до начала
          инструктируют. KRANNEVA выезжает на монтаж башенного крана после получения этого пакета.
        </p>
        <p>
          Почему это важно для заказчика: автокран в таком монтаже — часть проекта, а не отдельная
          услуга. Если ППР составлен под одну машину, замена на месте требует пересогласования, и
          смена простаивает. Поэтому класс автокрана называют в ППР заранее, а не в день монтажа.
        </p>

        <h2 id="chto-reshaet">Что решает выбор класса автокрана</h2>
        <p>
          Выбор класса определяет масса самой тяжёлой монтажной единицы и вылет её установки. У
          каждой модели башенного крана эти цифры свои и записаны в паспорте и руководстве по
          эксплуатации; KRANNEVA «типовых» масс секций не печатает, потому что ошибка в таком числе
          превращается в перегруз. Второй параметр — высота: последняя секция башни и оголовок
          поднимаются на предельную высоту, и здесь длина стрелы важнее номинального тоннажа.
        </p>
        <p>
          Третий фактор — площадка. Автокран для монтажа стоит на опорах на грунте, который должен
          выдержать нагрузку с грузом, а место монтажа башенного крана нередко ограничено
          котлованом и соседними зданиями; для этого случая действуют отдельные условия из{" "}
          <Link href="/obekty/kotlovan-i-brovka-otkosa/">страницы про котлован и бровку откоса</Link>{" "}
          и <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">площадку вплотную к соседнему зданию</Link>.
        </p>

        <h2 id="sravnenie">Сравнение машин парка для монтажа</h2>
        <p>
          Четыре машины парка KRANNEVA различаются длиной телескопической стрелы и высотой подъёма
          с гуськом. Для башни это два основных параметра, поэтому ниже они приведены из паспортных
          данных парка; грузовую характеристику на нужном вылете берут из таблицы конкретной машины.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Машины парка KRANNEVA для монтажа башенного крана: стрела, высота, класс</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Тоннаж</th>
                <th scope="col">Стрела</th>
                <th scope="col">Высота подъёма</th>
                <th scope="col">Класс прайса</th>
              </tr>
            </thead>
            <tbody>
              {[sany, xcmg, ltm1090, ztc].map((m) => (
                <tr key={m.name}>
                  <th scope="row"><Link href={m.href}>{m.name}</Link></th>
                  <td>{m.tonnage}</td>
                  <td>{m.boom}</td>
                  <td>{m.height}</td>
                  <td>{m.priceClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="kogda-legche">Когда лёгкий класс достаточен, а когда нет</h2>
        <p>
          SANY STC400T и XCMG QY60K подходят там, где секции и оголовок укладываются в грузовую
          характеристику на вылете установки, а башня невысокая. Для высоких башен KRANNEVA
          рассматривает Liebherr LTM 1090-4.1 и Zoomlion ZTC1000V: у последнего самая длинная чистая
          телескопическая стрела парка. Решение принимается расчётом ППР, а не по классу в прайсе.
        </p>
        <p>
          Практическое правило для заявки: приложить паспорт башенного крана с массами секций,
          противовесов и оголовка, указать высоту установки и место стоянки автокрана. По этим данным
          KRANNEVA называет класс и число смен до подтверждения даты. Демонтаж считается отдельной
          сменой: разбор идёт в обратном порядке и требует того же ППР.
        </p>

        <h2 id="raschet">Сколько стоит смена монтажа</h2>
        <p>
          KRANNEVA считает смену монтажа по единому прайсу. SANY STC400T —{" "}
          {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, кран класса {mid.cls}{" "}
          — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))}, класса {heavy.cls} —{" "}
          {rub(heavy.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))} без НДС. Разработка ППР
          на монтаж и демонтаж — отдельная позиция подготовки. Порядок приёмки смены и оплаты описан
          на странице <Link href="/dlya-zakupok/priemka-i-oplata/">приёмки и оплаты</Link>.
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
        date={FACT_CHECK_W163}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/5a431e79215908db03636335fe6309338da0f7e1/", label: "КонсультантПлюс — приказ Ростехнадзора № 461 от 26.11.2020 (ред. 16.04.2026), раздел II: пп. 38–39 о ППР/ТК и руководстве монтажом" },
          { href: "https://sudact.ru/law/prikaz-rostekhnadzora-ot-26112020-n-461-ob/federalnye-normy-i-pravila-v/ii/", label: "sudact.ru — приказ № 461, раздел II: требования к организациям и работникам, осуществляющим монтаж ПС" },
        ]}
        note="Массы секций, противовесов и оголовка конкретных башенных кранов в тексте не приведены: они берутся из паспорта и руководства по эксплуатации выбранной модели. Параметры машин (стрела, высота) — паспортные данные парка; грузоподъёмность на нужном вылете берётся из грузовой характеристики машины. Выбор класса и схема установки опор — расчёт ППР."
      />
    </main>
  );
}
