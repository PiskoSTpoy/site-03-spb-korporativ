import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W151, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 151. Тридцатый тип объекта — стилобат и подземный паркинг. Угол
  коммерческий/сравнительный: управляющая компания или генподрядчик выбирает
  между лёгким краном на перекрытии паркинга и крупным краном с улицы.
  Скелет статьи seo-2026-playbook.

  Фактура — ФНП № 461 (ред. 16.04.2026), раздел «Установка ПС и
  производство работ»: consultant.ru и rulaws.ru, формулировки совпали.
    · п. 108 — установка кранов стрелового типа на подготовленной площадке
      с учётом категории и характера грунта; свеженасыпанный неутрамбованный
      грунт и уклон больше паспортного — нельзя;
    · п. 128 — перемещение грузов над перекрытиями, под которыми могут
      находиться люди, не допускается;
    · п. 98 — ППР при стеснённых условиях.
  п. 71 Правил противопожарного режима — сверен Волной 146.
  Допустимую нагрузку на перекрытие и давление под опорой не печатаем:
  это расчёт проектировщика по конкретному зданию.
*/

const title = "Кран на стилобате или с улицы: что дешевле для паркинга";
const description =
  "Подъём на стилобат над паркингом в Петербурге: лёгкий кран на перекрытии по заключению проектировщика или крупный кран с улицы. Сравнение схем и ставок.";
const h1 = "Кран на стилобат над паркингом или крупный кран с улицы: что выгоднее?";
const canonical = "/obekty/stilobat-i-podzemnyy-parking/";
const published = "2026-09-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const heavy = PRICE[2];

const toc = [
  { id: "perekrytie", label: "Почему перекрытие паркинга — не площадка" },
  { id: "dve-skhemy", label: "Две схемы: на стилобате и с улицы" },
  { id: "raschet", label: "Расчёт смены для двух схем" },
  { id: "lyudi-v-parkinge", label: "Люди в паркинге под грузом" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли поставить автокран на стилобат над подземным паркингом?",
    a: "Только если проектировщик здания подтвердил, что перекрытие выдержит кран на опорах в конкретной точке. П. 108 ФНП № 461 требует ставить кран на подготовленной площадке с учётом характера основания. KRANNEVA без такого заключения кран на стилобат не ставит.",
  },
  {
    q: "Что дешевле: маленький кран на стилобате или большой с улицы?",
    a: `По ставке дешевле лёгкий кран: у KRANNEVA SANY STC400T — от ${rub(shiftTotal(light.rate))} за смену без НДС против ${rub(shiftTotal(heavy.rate))} за кран класса ${heavy.cls}. Но к лёгкому крану добавляется заключение проектировщика, а к крупному — ордер ГАТИ, если он встаёт на проезжую часть.`,
  },
  {
    q: "Нужно ли закрывать паркинг на время работы крана?",
    a: "Зону под траекторией груза — да. П. 128 ФНП № 461 запрещает перемещать грузы над перекрытиями, под которыми могут находиться люди, поэтому KRANNEVA просит управляющую компанию закрыть въезд в эту часть паркинга на время подъёма.",
  },
  {
    q: "Можно ли занять пожарный проезд на стилобате краном?",
    a: "Нет: п. 71 Правил противопожарного режима запрещает перекрывать проезды для пожарной техники и занимать площадки для её установки. Если пожарный проезд идёт по стилобату, KRANNEVA выбирает точку установки в стороне или работает с улицы.",
  },
  {
    q: "Кто выдаёт заключение о нагрузке на перекрытие?",
    a: "Проектная организация здания или специализированная организация по обследованию конструкций по заказу собственника. KRANNEVA передаёт ей паспортные данные крана — массу, опорный контур и схему опор — чтобы расчёт делался под конкретную машину.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Стилобат и подземный паркинг", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для подъёма на стилобат и работ над подземным паркингом",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Стилобат и подземный паркинг</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · стилобат и паркинг</span>
          <h1>{h1}</h1>
          <p>
            Лёгкий кран на стилобате дешевле по ставке, но встаёт на перекрытие паркинга только
            по заключению проектировщика: п. 108 ФНП № 461 требует ставить кран на подготовленной
            площадке с учётом характера основания. Крупный кран с улицы дороже за смену, зато не
            нагружает перекрытие. KRANNEVA считает обе схемы — SANY STC400T на стилобате и кран
            класса 81–130 т с улицы — и сравнивает полную стоимость, а не только ставку.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W151} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на стилобат и к подземному паркингу</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>подъём оборудования и материалов на стилобат жилого комплекса или бизнес-центра, монтаж навесов, малых архитектурных форм и озеленения на кровле паркинга, замена вентиляционных шахт паркинга</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} на стилобате по заключению проектировщика; {heavy.cls} — с улицы, когда перекрытие кран не принимает</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link> с уменьшенным опорным контуром; с улицы — <Link href="/park/liebherr-ltm-1090/">Liebherr LTM 1090-4.1</Link>, <Link href="/park/zoomlion-ztc1000v/">Zoomlion ZTC1000V</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>несущая способность перекрытия над паркингом в точке опор — её определяет только проектировщик здания</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР (п. 98 ФНП № 461) и, для схемы на стилобате, заключение о допустимости установки крана на перекрытие</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>получение заключения проектировщика или ордера ГАТИ; закрытие части паркинга под траекторией груза</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(heavy.rate)}/час ({heavy.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="perekrytie">Почему перекрытие паркинга — не площадка</h2>
        <p>
          П. 108 ФНП № 461 требует устанавливать кран на подготовленной площадке с учётом категории
          и характера основания, а под плиткой стилобата лежит перекрытие паркинга, а не грунт. Для
          перекрытия эту подготовку подтверждает только расчёт проектировщика.
          KRANNEVA не оценивает перекрытие «на глаз» и не ставит кран на стилобат без письменного
          заключения проектировщика.
        </p>
        <p>
          Засыпка и озеленение на кровле паркинга тоже не делают её грунтом. Свежая отсыпка под
          опорами крана прямо запрещена тем же п. 108 ФНП № 461, поэтому KRANNEVA просит отметить в
          заключении, где проходят несущие балки и какие участки засыпаны недавно.
        </p>

        <h2 id="dve-skhemy">Две схемы: на стилобате и с улицы</h2>
        <p>
          Управляющая компания или генподрядчик выбирает между двумя схемами, и KRANNEVA сравнивает
          их по четырём параметрам. Цифры ставок взяты из прайса, остальное — из того, что заказчик
          готовит сам.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Схемы подъёма на стилобат: сравнение для заказчика</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Лёгкий кран на стилобате</th>
                <th scope="col">Крупный кран с улицы</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Машина KRANNEVA</th><td>SANY STC400T или Kato NK-250E-V</td><td>Liebherr LTM 1090-4.1 или Zoomlion ZTC1000V</td></tr>
              <tr><th scope="row">Смена без НДС</th><td className="dtable__num">от {rub(shiftTotal(light.rate))}</td><td className="dtable__num">от {rub(shiftTotal(heavy.rate))}</td></tr>
              <tr><th scope="row">Что готовит заказчик</th><td>заключение проектировщика о нагрузке на перекрытие в точке опор</td><td>ордер ГАТИ, если кран встаёт на проезжую часть; маршрут для крана с нагрузкой на ось до 12 т</td></tr>
              <tr><th scope="row">Риск для графика</th><td>срок работы проектировщика; въезд на стилобат через арку или пандус</td><td>срок ордера; ограничения движения по улице</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Для разового подъёма без готового заключения KRANNEVA чаще советует крупный кран с улицы:
          он не ждёт проектировщика и не нагружает перекрытие. Для серии работ на стилобате разумнее
          один раз получить заключение и дальше работать лёгким SANY STC400T по меньшей ставке.
        </p>

        <h2 id="raschet">Расчёт смены для двух схем</h2>
        <p>
          Расчёт KRANNEVA для одной смены выглядит так. Кран SANY STC400T класса {light.cls} на
          стилобате: {rub(light.rate)} в час × {MIN_SHIFT_HOURS} часов = {rub(shiftTotal(light.rate))} без НДС.
          Кран класса {heavy.cls} с улицы: {rub(heavy.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(heavy.rate))}.
          Разница — {rub(shiftTotal(heavy.rate) - shiftTotal(light.rate))} за смену.
        </p>
        <p>
          Эту разницу KRANNEVA предлагает сравнить с ценой заключения проектировщика и сроком его
          получения. Цену заключения мы не называем: её устанавливает проектная организация, и она
          зависит от наличия исходной документации здания.
        </p>

        <h2 id="lyudi-v-parkinge">Люди в паркинге под грузом</h2>
        <p>
          П. 128 ФНП № 461 запрещает перемещать грузы над перекрытиями, под которыми размещены
          помещения, где могут находиться люди. Подземный паркинг — именно такое помещение, поэтому
          KRANNEVA просит управляющую компанию закрыть въезд в часть паркинга под траекторией груза
          на время подъёма и поставить там дежурного.
        </p>
        <p>
          Пожарный проезд по стилобату кран KRANNEVA тоже не занимает: п. 71 Правил противопожарного
          режима запрещает перекрывать проезды для пожарной техники. Похожие ограничения описаны на
          страницах <Link href="/obekty/zhiloy-dvor-mnogokvartirnogo-doma/">жилой двор многоквартирного дома</Link>{" "}
          и <Link href="/obekty/krovlya-deystvuyushchego-zdaniya/">кровля действующего здания</Link>; для
          рамочного договора — раздел <Link href="/dlya-zakupok/">«Для закупок»</Link>.
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
        date={FACT_CHECK_W151}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), раздел «Установка ПС и производство работ» (пп. 98, 108, 128)" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "Приказ Ростехнадзора № 461 — полный текст ФНП «Правила безопасности ОПО, на которых используются подъёмные сооружения» (rulaws.ru)" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_363263/", label: "КонсультантПлюс — постановление Правительства РФ от 16.09.2020 № 1479 «Об утверждении Правил противопожарного режима в РФ» (ред. 03.02.2025), п. 71" },
        ]}
        note="Пункты 98, 108 и 128 ФНП № 461 прочитаны в двух независимых источниках, формулировки совпали. Допустимую нагрузку на перекрытие паркинга, давление под опорой крана и цену заключения проектировщика не приводим: это расчёт и прайс третьих лиц по конкретному зданию."
      />
    </main>
  );
}
