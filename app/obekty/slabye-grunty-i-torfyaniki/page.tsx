import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W155, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 155. Тридцать четвёртый тип объекта — площадка на слабых грунтах и
  торфе. Угол практический, СПб-специфика: грунты дельты Невы по
  территориальным нормам ТСН 50-302-2004. Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W155 в app/site-data.ts.
  Допустимое давление на конкретный грунт и размеры подкладок не печатаем:
  это расчёт по данным изысканий площадки. Намыв — отдельная страница
  /obekty/namyvnaya-territoriya/, здесь — природные грунты дельты и болота.
*/

const title = "Кран на слабых грунтах и торфе в Петербурге: спецификация";
const description =
  "Автокран на слабых грунтах дельты Невы: ленточные глины, плывунные пески и торф до 11 м по ТСН 50-302-2004. Подготовка основания и гусеничный кран.";
const h1 = "Как поставить автокран на слабый грунт и торф в Петербурге?";
const canonical = "/obekty/slabye-grunty-i-torfyaniki/";
const published = "2026-09-27";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "grunty", label: "Какие грунты лежат под Петербургом" },
  { id: "gde", label: "Где в городе торф и текучие глины" },
  { id: "osnovanie", label: "Основание под опоры автокрана" },
  { id: "gusenichnyy", label: "Автокран или гусеничный кран на слабом грунте" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли ставить автокран на торф?",
    a: "Не напрямую. П. 108 ФНП № 461 требует ставить кран на подготовленную площадку с учётом категории и характера грунта, а торф по ТСН 50-302-2004 даёт большую и неравномерную осадку. KRANNEVA ставит опоры только на основание, подготовленное по данным изысканий.",
  },
  {
    q: "Почему грунты Петербурга считаются слабыми?",
    a: "ТСН 50-302-2004 называет главные причины: толщу слабых медленно уплотняющихся грунтов местами до 30 м, высокий уровень подземных вод, погребённый торф и плывуны. KRANNEVA учитывает эти особенности при выборе точки установки крана.",
  },
  {
    q: "Где в Петербурге встречаются торфяники?",
    a: "По приложению Д ТСН 50-302-2004 крупные торфяники сохранились на севере города: Лахтинское, Левашовское, Парголовское и Шуваловское болота. Мощность торфа по городу — от 0,2 до 11 м. KRANNEVA запрашивает изыскания по конкретной площадке.",
  },
  {
    q: "Опасна ли вибрация крана для глин в центре города?",
    a: "Приложение Д ТСН 50-302-2004 указывает, что ленточные глины островной части города способны к разжижению даже при слабых динамических воздействиях. KRANNEVA избегает рывков груза и работы на пределе грузовой характеристики на таких площадках.",
  },
  {
    q: "Когда выгоднее гусеничный кран, чем автокран?",
    a: "Когда подготовка основания под четыре опоры автокрана дороже мобилизации гусеничного крана трейлером. Zoomlion QUY50 KRANNEVA давит на грунт около 0,067 МПа — распределённо по гусеницам, а не точечно под опорами.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Слабые грунты и торф", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана и гусеничного крана для площадок на слабых грунтах",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Слабые грунты и торф</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · слабые грунты</span>
          <h1>{h1}</h1>
          <p>
            Автокран на слабом грунте Петербурга ставят только на подготовленное основание:
            территориальные нормы ТСН 50-302-2004 описывают под городом толщу слабых грунтов местами
            до 30 м, плывунные пески и торф мощностью до 11 м, а п. 108 ФНП № 461 запрещает ставить
            кран без учёта характера грунта. KRANNEVA выбирает точку установки по данным изысканий
            площадки, а где подготовка основания дороже самой работы — предлагает гусеничный
            Zoomlion QUY50.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W155} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на площадку со слабыми грунтами</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж на площадках нового строительства на севере города, подъём оборудования на территориях без твёрдого покрытия, работы у рек и каналов на насыпных берегах, коттеджные и складские площадки на бывших болотах</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls}; гусеничный кран класса {mid.cls} там, где опоры автокрана требуют дорогой подготовки</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link> (гусеничный), <Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>несущая способность грунта под опорами: торф, текучие ленточные глины и плывунные пески (ТСН 50-302-2004, приложение Д)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР с указанием подготовки основания под опоры (п. 108 ФНП № 461) по данным инженерных изысканий площадки</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>наличие изысканий и подготовка основания: отсыпка с уплотнением, дорожные плиты или щиты</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="grunty">Какие грунты лежат под Петербургом</h2>
        <p>
          ТСН 50-302-2004 «Проектирование фундаментов зданий и сооружений в Санкт-Петербурге»
          начинается со списка негативных особенностей городских грунтов, и для крана важны четыре
          из шести. KRANNEVA сводит их в таблицу с тем, что каждая значит для опор.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Особенности грунтов Петербурга по ТСН 50-302-2004 и опоры крана</caption>
            <thead>
              <tr>
                <th scope="col">Особенность по ТСН</th>
                <th scope="col">Что это значит для опор автокрана</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Толща слабых медленно уплотняющихся грунтов, местами до 30 м</th><td>плотного слоя у поверхности может не быть — опора давит на слабый грунт</td></tr>
              <tr><th scope="row">Высокий уровень подземных вод</th><td>грунт под опорой водонасыщен и теряет несущую способность</td></tr>
              <tr><th scope="row">Намывные и насыпные территории с погребённым торфом</th><td>ровная поверхность может скрывать торф под слоем подсыпки</td></tr>
              <tr><th scope="row">Морозное пучение и просадка при оттаивании</th><td>весной промёрзший грунт под опорой оттаивает и проседает</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Цифры несущей способности грунта для опор KRANNEVA не берёт из общих таблиц: ТСН
          50-302-2004 ставит объём изысканий в зависимость от конкретного объекта, и расчёт основания делается по их данным.
        </p>

        <h2 id="gde">Где в городе торф и текучие глины</h2>
        <p>
          Приложение Д ТСН 50-302-2004 называет торф мощностью от 0,2 до 11,0 м и перечисляет
          сохранившиеся крупные торфяники на севере Петербурга: Лахтинское, Левашовское,
          Парголовское и Шуваловское болота. KRANNEVA на площадках рядом с ними запрашивает
          изыскания до подтверждения даты выезда.
        </p>
        <p>
          В островной части города то же приложение Д ТСН 50-302-2004 описывает ленточные глины
          текучей консистенции, способные разжижаться даже при слабых динамических воздействиях, а
          пылеватые пески исторического центра — как склонные к плывуну при знакопеременных нагрузках.
          Экипаж KRANNEVA на таких грунтах поднимает груз плавно, без рывков и раскачки. Намывные
          участки описаны отдельно на странице{" "}
          <Link href="/obekty/namyvnaya-territoriya/">намывная территория</Link>.
        </p>

        <h2 id="osnovanie">Основание под опоры автокрана</h2>
        <p>
          П. 108 ФНП № 461 требует устанавливать кран на подготовленной площадке с учётом категории и
          характера грунта и запрещает ставить его на свеженасыпанный неутрамбованный грунт. Для
          слабого грунта Петербурга это значит одно: основание под опоры готовят заранее по ППР.
        </p>
        <ol>
          <li>Заказчик передаёт KRANNEVA данные инженерных изысканий площадки или заключение геотехника.</li>
          <li>KRANNEVA сообщает массу крана, опорный контур и нагрузки на опоры для выбранной схемы подъёма.</li>
          <li>Проектировщик ППР задаёт подготовку основания: отсыпку с послойным уплотнением, дорожные плиты или щиты под опоры.</li>
          <li>Основание готовят до приезда крана — свежую неуплотнённую отсыпку п. 108 ФНП № 461 не допускает.</li>
          <li>Экипаж KRANNEVA осматривает основание на месте и выставляет опоры только после этого.</li>
        </ol>

        <h2 id="gusenichnyy">Автокран или гусеничный кран на слабом грунте</h2>
        <p>
          Гусеничный Zoomlion QUY50 из парка KRANNEVA давит на грунт около 0,067 МПа, распределяя вес
          по длине гусениц, тогда как автокран передаёт нагрузку через четыре точечные опоры. На
          протяжённой площадке без твёрдого покрытия гусеничный кран часто обходится дешевле
          подготовки основания под каждую стоянку автокрана.
        </p>
        <p>
          Расчёт KRANNEVA для одной смены: SANY STC400T — {rub(light.rate)} × {MIN_SHIFT_HOURS} часов ={" "}
          {rub(shiftTotal(light.rate))} без НДС; Zoomlion QUY50 класса {mid.cls} — {rub(mid.rate)} ×{" "}
          {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))}. Своим ходом по дорогам QUY50 не ездит,
          поэтому его перевозка трейлером и монтаж считаются отдельно — условия на странице{" "}
          <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link>.
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
        date={FACT_CHECK_W155}
        items={[
          { href: "https://files.stroyinf.ru/Data1/44/44421/index.htm", label: "ТСН 50-302-2004 Санкт-Петербург «Проектирование фундаментов зданий и сооружений в Санкт-Петербурге» — введение и приложение Д «Особенности инженерно-геологических условий территории Санкт-Петербурга»" },
          { href: "https://meganorm.ru/Data2/1/4293854/4293854755.htm", label: "ТСН 50-302-2004 — второй экземпляр текста (meganorm.ru)" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), раздел «Установка ПС и производство работ» (п. 108)" },
        ]}
        note="Введение и приложение Д ТСН 50-302-2004 прочитаны в двух публикациях, текст совпал. Допустимое давление на грунт конкретной площадки и размеры подкладок под опоры не приводим: это расчёт по данным изысканий. Удельное давление Zoomlion QUY50 — из карточки модели в разделе «Парк»."
      />
    </main>
  );
}
