import type { Metadata } from "next";
import Link from "next/link";
import KpForm from "./components/KpForm";
import PrintButton from "./components/PrintButton";
import Sources, { isoDate } from "./components/Sources";
import SpecIllustration from "./components/SpecIllustration";
import CardTilt from "./components/CardTilt";
import { OG_IMAGE, SITE, BRAND, PHONE_HREF, PHONE_TEXT, FACT_CHECK, MIN_SHIFT_HOURS, CONDITION_LABELS, PRICE, PARK, OBJECT_TYPES, DISTRICTS, shiftTotal, rub } from "./site-data";

/*
  Волна 16. Главная перестроена под порядок чтения закупщика:
  условия и документы → спецификация техники → прайс → типы объектов →
  ограничения по срокам → география → контакт. Убраны hero-иллюстрация,
  бегущая строка, счётчики stat-bar и подзаголовок «кроме тоннажа и цены…»,
  а пошаговый визард-калькулятор заменён открытым прайс-листом: закупщику
  нужен документ, который можно приложить к заявке, а не игра в вопросы.

  Волна 19. Структура документа не тронута — вернули визуальную насыщенность
  в языке делового документа: doc-toc получил нумерацию-«клаузулу» и тонкие
  разделители (было — строка чипов), hero — честную metadata-плашку (дата
  актуальности, число пунктов «Условий», число типов объектов — всё считано
  из site-data.ts, ничего не выдумано), specifikaciya — line-art чертёж крана
  с лёгким параллаксом (SpecIllustration, клиентский компонент), price — hover
  мягкой тенью и подъёмом на строках (см. globals.css, блок «Прайс»).
*/

const title = "Автокран в Петербурге для корпоративного заказчика";
const description =
  "Автокран 25–130 т в СПб для корпоративного заказчика: условия договора и расчётов, спецификация техники таблицей, открытый прайс-лист.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

/*
  Волна приёмки. Узел WebSite переехал сюда из app/layout.tsx: он описывает
  сайт целиком, поэтому его место — на главной, а не на каждой из 45 страниц.
  SearchAction не добавляем: поиска по сайту нет, а фича sitelinks searchbox
  отключена Google 21.11.2024 — разметка описывала бы несуществующее.
*/
const websiteLd = {
  "@context": "https://schema.org", "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: BRAND, url: SITE, inLanguage: "ru-RU",
  publisher: { "@id": `${SITE}/#organization` },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Аренда автокрана с экипажем 25–130 тонн",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: "Санкт-Петербург",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Прайс-лист на аренду автокрана в Санкт-Петербурге",
    itemListElement: PRICE.map((p) => ({
      "@type": "Offer",
      name: `Автокран ${p.cls}`,
      /*
        Волна приёмки. businessFunction проставлен явно. Без него schema.org
        считает функцию Sell по умолчанию — то есть разметка объявляла бы
        ПРОДАЖУ крана за 4 900 ₽. LeaseOut, а не ProvideService, выбран не
        механически: сайт сам называет предмет договором аренды транспортного
        средства с экипажем по параграфу 3 главы 34 ГК РФ (см. /dlya-zakupok/),
        техника передаётся заказчику на срок, ставка — почасовая за машину,
        а не за выполненный объём работ.
      */
      businessFunction: "https://schema.org/LeaseOut",
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.rate),
        priceCurrency: "RUB",
        unitText: "HOUR",
        valueAddedTaxIncluded: false,
      },
      eligibleQuantity: { "@type": "QuantitativeValue", minValue: MIN_SHIFT_HOURS, unitText: "HOUR" },
    })),
  },
};

/* Машиночитаемая дата актуальности ставок для <time dateTime> под прайсом. */
const FACT_CHECK_ISO = isoDate(FACT_CHECK);

const toc = [
  { href: "#usloviya", label: "Условия договора и расчётов" },
  { href: "#dokumenty", label: "Документы в закупку" },
  { href: "#specifikaciya", label: "Спецификация техники" },
  { href: "#price", label: "Прайс-лист" },
  { href: "#obekty", label: "Типы объектов" },
  { href: "#sroki", label: "Что двигает дату выезда" },
  { href: "#geo", label: "География" },
  { href: "#kp", label: "Запросить КП" },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      {/*
        Волна 126. Первый экран лежит на чертёжном листе (.hero-sheet —
        миллиметровка градиентами, гаснущая книзу): собственный графический
        мотив сайта — чертёжная рамка и размерные штрихи — до этой волны жил
        только внутри SpecIllustration в разделе 03 и на карточках парка,
        а на первый экран не попадал вообще. Кегль h1 переехал из inline-стиля
        в токен --t-h1: до этого он был единственным местом на сайте, где
        размер заголовка задавался мимо лестницы кеглей.
      */}
      {/* Волна 128: paddingBlock переехал в globals.css — inline-стиль выигрывал
          у любого медиазапроса, и ужать шапку на телефоне было нельзя. */}
      <section className="wrap hero-sheet">
        <div className="hero__row">
          <div className="hero__main">
            {/* Волна 128: на кадре 375 px надзаголовок рвался по дефису — «САНКТ-»
                на первой строке, «ПЕТЕРБУРГ» на второй. Текст не тронут и в HTML
                остаётся сплошным: перенос запрещает .nowrap на обёртке.
                Внешний <span> обязателен: .eyebrow — flex-контейнер, и без него
                три куска текста стали бы тремя flex-элементами в одну нерушимую
                строку (проверено: страница поехала на 397 px при экране 375). */}
            <span className="eyebrow">
              <span>Автокраны 25–130 т · <span className="nowrap">Санкт-Петербург</span> · аренда с экипажем</span>
            </span>
            <h1>
              Автокран в Петербурге для корпоративного заказчика
            </h1>
            {/*
              Волна 128 (мобильная). Здесь стояла .dim-rule — размерная линия без
              подписанных величин, 51 px чистой декорации сразу под заголовком.
              На кадре 375×812 первый экран показывал заголовок, лид и ставки,
              но НЕ показывал, что именно арендуют: чертёж автокрана жил
              в разделе 03 (SpecIllustration), фотография — на втором экране.
              Размерная линия не удалена, а вошла в этот блок нижней кромкой:
              тот же приём (левый штрих акцентом, правый — line-strong), только
              теперь он обрамляет вид машины, а не пустоту. Габаритный вид —
              боковая проекция автокрана на выносных опорах с выдвинутой стрелой:
              та же чертёжная грамматика, что у SpecIllustration и ParkModelArt
              (те же токены, та же толщина штриха, ни одной подписанной величины —
              цифры живут в таблицах, а не на чертеже).
            */}
            <div className="hero-blueprint" aria-hidden="true">
              <svg viewBox="0 0 640 200" focusable="false">
                {/* Земля и габаритная линия */}
                <line x1="20" y1="168" x2="620" y2="168" stroke="var(--line-strong)" strokeWidth="1.4" />
                <line x1="20" y1="186" x2="620" y2="186" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
                <path d="M20,179 V193" stroke="var(--accent)" strokeWidth="2" />
                <path d="M620,179 V193" stroke="var(--line-strong)" strokeWidth="2" />
                {/* Вертикальная размерная линия — как в чертеже спецификации */}
                <line x1="28" y1="40" x2="28" y2="162" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
                <path d="M24,44 28,36 32,44" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24,158 28,166 32,158" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Выносные опоры */}
                <path d="M72,144 L48,166 M38,166 h20" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M290,144 L314,166 M304,166 h20" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Шасси, поворотная платформа, кабина */}
                <rect x="60" y="112" width="240" height="34" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
                <rect x="244" y="96" width="46" height="16" rx="1.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
                <rect x="64" y="74" width="46" height="38" rx="2" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.4" />
                <rect x="71" y="81" width="18" height="14" rx="1" fill="none" stroke="var(--muted)" strokeWidth="1.6" />
                {/* Колёсные пары */}
                <circle cx="96" cy="154" r="14" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
                <circle cx="96" cy="154" r="4" fill="var(--ink)" />
                <circle cx="132" cy="154" r="14" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
                <circle cx="132" cy="154" r="4" fill="var(--ink)" />
                <circle cx="228" cy="154" r="14" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
                <circle cx="228" cy="154" r="4" fill="var(--ink)" />
                <circle cx="264" cy="154" r="14" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
                <circle cx="264" cy="154" r="4" fill="var(--ink)" />
                {/* Телескопическая стрела */}
                <circle cx="267" cy="104" r="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />
                <path d="M265.6,93.1 L598.6,27.1 L601.4,40.9 L268.4,106.9 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
                <line x1="382.2" y1="70" x2="385" y2="83.8" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="482" y1="50.2" x2="484.8" y2="64" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
                {/* Оголовок, грузовой канат, крюк */}
                <circle cx="600" cy="34" r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
                <line x1="600" y1="39" x2="600" y2="110" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
                <path d="M600,110 q0,13 -9,13 q-8,0 -8,-7" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </div>
            {/*
              Волна GEO. Лид перестроен по правилу «ответ первым»: первые две фразы должны
              читаться вырезанными из страницы и содержать число. Прежний вариант начинался
              с описания порядка разделов («страница собрана в том порядке…») — вырезанный
              фрагмент не отвечал ни на один вопрос заказчика. Числа не новые: ставки, смена
              и размер парка берутся из site-data.ts, срок оплаты и основание договора уже
              стоят в таблице «Условия договора и расчётов» ниже на этой же странице.

              Волна 127 (мобильная). На кадре 375×812 этот лид занимал двадцать одну строку
              и уходил за сгиб вместе с ценой: цифры формально были на первом экране,
              но лежали внутри стены текста и не читались. Оставлены первые две фразы —
              то самое «ответ первым»; ставки по трём классам вынесены ниже в графу
              .hero-rates, где их видно; хвост про основание договора, срок оплаты и порядок
              разделов не выброшен, а перенесён в примечание к оглавлению (см. .doc-toc__note).
            */}
            <p className="hero__lead">
              {/* Волна 128: на 375 px лид рвался как «Санкт- / Петербурге». Тот же
                  приём, что в надзаголовке: обёртка .nowrap, текст не тронут. */}
              Аренда автокрана с экипажем в <span className="nowrap">Санкт-Петербурге</span> —
              от {rub(PRICE[0].rate)} в час без НДС. В парке {PARK.length} машин
              грузоподъёмностью 25–130 т.
            </p>

            {/*
              Графа ставок. Ни одного нового числа: класс, машины и ставка — те же
              строки PRICE[], что печатает таблица раздела 04, итог смены считает
              тот же shiftTotal(). Оговорки («ориентир для бюджетирования», «не
              является публичной офертой») стоят там же, где и таблица, — ссылка
              на раздел ведёт прямо к ним.
            */}
            <div className="hero-rates">
              <span className="hero-rates__eyebrow">
                Ставки без НДС · смена {MIN_SHIFT_HOURS} ч
              </span>
              <ul className="hero-rates__list">
                {PRICE.map((p) => (
                  <li className="hero-rates__row" key={p.cls}>
                    <span className="hero-rates__cls">{p.cls}</span>
                    <span className="hero-rates__rate">
                      от {rub(p.rate)}<i>/час</i>
                    </span>
                    <span className="hero-rates__models">{p.models}</span>
                    <span className="hero-rates__shift">
                      смена — от {rub(shiftTotal(p.rate))}
                    </span>
                  </li>
                ))}
              </ul>
              <a className="hero-rates__more" href="#price">
                Прайс целиком: что входит в смену и что считается отдельно →
              </a>
            </div>

            <div style={{ marginTop: 22 }}>
              <PrintButton label="Распечатать страницу или сохранить в PDF" />
            </div>
          </div>

          {/* Волна 19: метаданные документа — только реальные, считанные из site-data.ts */}
          <aside className="doc-meta" aria-label="Метаданные документа">
            <span className="doc-meta__eyebrow">Паспорт документа</span>
            <div className="doc-meta__date">
              <span>Действителен на дату</span>
              <strong>{FACT_CHECK}</strong>
            </div>
            <dl className="doc-meta__stats">
              <div className="doc-meta__stat">
                <dt>Разделов документа</dt>
                <dd>{toc.length}</dd>
              </div>
              <div className="doc-meta__stat">
                <dt>Пунктов зафиксировано в «Условиях»</dt>
                <dd>{CONDITION_LABELS.length}</dd>
              </div>
              <div className="doc-meta__stat">
                <dt>Типов объектов в покрытии</dt>
                <dd>{OBJECT_TYPES.length}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Волна 125: медиа как «приложение к документу» — не декоративный full-bleed
            фон (Волна 16 сознательно убрала hero-иллюстрацию), а рамка в языке
            .doc-meta/.model-art.

            Волна 128 (мобильная). Здесь стояло атмосферное видео заката со стройки,
            и на кадре 375×812 второй экран целиком занимал его постер. Беда была
            не в высоте: на постере и во всех кадрах ролика — БАШЕННЫЙ кран. Сайт
            сдаёт в аренду автокраны 25–130 т, и человек, пролиставший первый экран,
            видел не ту машину, за которой пришёл. Поставлено фото автокрана
            со свободной лицензией — то же, что стоит на /park/, с той же честной
            подписью «не единица нашего парка». Заодно с мобильной главной ушла
            загрузка видеофайла. */}
        <figure className="hero-exhibit wrap">
          <div className="hero-exhibit__media">
            <picture>
              <source srcSet="/images/hero/park-hero.webp" type="image/webp" />
              <img
                src="/images/hero/park-hero.jpg"
                width="1440"
                height="960"
                loading="lazy"
                decoding="async"
                alt="Автокран с телескопической стрелой в транспортном положении на городской улице, вид сверху — атмосферное фото техники этого класса, не единица нашего парка и не съёмка в Санкт-Петербурге"
              />
            </picture>
            <div className="hero-exhibit__scrim" aria-hidden="true" />
          </div>
          <figcaption className="hero-exhibit__caption">
            <span>Атмосферное фото техники такого класса — не единица нашего парка</span>
            <span>
              Автор: Mr Alex Photography,{" "}
              <a href="https://www.pexels.com/photo/28321426/" target="_blank" rel="noopener">Pexels License</a>
            </span>
          </figcaption>
        </figure>
      </section>

      <nav className="doc-toc wrap" aria-label="Содержание страницы">
        <span className="doc-toc__eyebrow">Оглавление документа</span>
        <ol className="doc-toc__list">
          {toc.map((t) => (
            <li key={t.href}>
              <a href={t.href}>
                <span className="doc-toc__num" aria-hidden="true" />
                <span className="doc-toc__label">{t.label}</span>
              </a>
            </li>
          ))}
        </ol>
        {/*
          Волна 127. Хвост прежнего лида: основание договора, срок оплаты и порядок
          разделов. Формулировки не тронуты — блок переехал туда, где он и работает:
          рядом с оглавлением, которое этот порядок и показывает.
        */}
        <p className="doc-toc__note">
          Разделы идут в том порядке, в котором страницу читает отдел закупок. Договор — аренда
          транспортного средства с экипажем (§ 3 главы 34 ГК РФ), срок оплаты по 223-ФЗ у субъектов
          МСП — 7 рабочих дней с даты подписания документа о приёмке. Всё, что нужно приложить
          к заявке, есть здесь и в разделе <Link href="/dlya-zakupok/">«Для закупок»</Link>.
        </p>
      </nav>

      <section className="section wrap" id="usloviya">
        <div className="section-head">
          <span className="eyebrow">Раздел 01</span>
          <h2>Условия договора и расчётов</h2>
          <p>Базовые условия, которые уходят в проект договора без изменений. Всё, что зависит от объекта,
            фиксируется в спецификации — приложении № 1.</p>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Существенные условия аренды автокрана с экипажем</caption>
            <tbody>
              <tr>
                <th scope="row">Предмет</th>
                <td>Аренда автокрана с экипажем: управление техникой и её техническое обслуживание — на нас
                  (§ 3 главы 34 ГК РФ). Экипаж наш штатный, аттестованный; формат «без экипажа» не предлагаем.</td>
              </tr>
              <tr>
                <th scope="row">Минимальная оплачиваемая смена</th>
                <td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте, время в пути к объекту и обратно не тарифицируется</td>
              </tr>
              <tr>
                <th scope="row">Учёт времени работы</th>
                <td>Сменный рапорт подписывается на объекте представителем заказчика в день работы. Простой
                  по вине заказчика фиксируется в рапорте отдельной строкой и оплачивается по ставке смены.</td>
              </tr>
              <tr>
                <th scope="row">Ответственность за вред третьим лицам</th>
                <td>Несёт арендодатель, то есть мы, — по правилам главы 59 ГК РФ (ст. 640 ГК РФ). Регресс
                  к арендатору возможен, только если доказана его вина.</td>
              </tr>
              <tr>
                <th scope="row">Цена и налог</th>
                <td>Ставки в прайсе — без НДС. С 1 января 2026 года основная ставка НДС — 22 %
                  (Федеральный закон от 28.11.2025 № 425-ФЗ), поэтому в КП сумма всегда двумя строками:
                  без налога и с налогом.</td>
              </tr>
              <tr>
                <th scope="row">Закрывающие документы</th>
                <td>УПД (или акт + счёт-фактура) с приложением подписанных сменных рапортов. Обмен —
                  по ЭДО; подписант работает по машиночитаемой доверенности.{" "}
                  <Link href="/dlya-zakupok/priemka-i-oplata/">Как устроена приёмка</Link>.</td>
              </tr>
              <tr>
                <th scope="row">Срок подписания договора в закупке</th>
                <td>Для процедур по 223-ФЗ — не ранее 10 дней и не позднее 20 дней с даты размещения
                  итогового протокола (ч. 15 ст. 3.2). Мы держим КП и наличие техники внутри этого окна.</td>
              </tr>
              <tr>
                <th scope="row">Срок оплаты</th>
                <td>По 223-ФЗ в закупках у субъектов МСП — 7 рабочих дней с даты подписания документа
                  о приёмке; по 44-ФЗ — 7 рабочих дней при приёмке через ЕИС и 10 рабочих дней без неё.
                  Для коммерческих договоров срок согласуется отдельно.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Полный порядок согласования, требования к подрядчику и состав приложений к договору — в разделе{" "}
          <Link href="/dlya-zakupok/">«Для закупок»</Link>. Сам договор
          аренды транспортного средства с экипажем — это параграф 3 главы 34 Гражданского кодекса,
          статьи 632–641; конструкция от региона не зависит, и спорят при закрытии не о ней, а о том,
          что записано в приложениях.
        </p>
      </section>

      <section className="section wrap" id="dokumenty">
        <div className="section-head">
          <span className="eyebrow">Раздел 02</span>
          <h2>Документы, которые уходят в закупку</h2>
          <p>Что мы прикладываем к заявке на участие или к запросу на аккредитацию подрядчика — одним письмом,
            без отдельных напоминаний.</p>
        </div>
        <ol className="doclist">
          <li><b>Карточка контрагента</b><span>Реквизиты, банковские данные, система налогообложения, подписант и основание его полномочий, оператор ЭДО и идентификатор.</span></li>
          <li><b>Учредительный и регистрационный комплект</b><span>Устав, лист записи ЕГРЮЛ, уведомление о постановке на учёт, решение или приказ о назначении руководителя.</span></li>
          <li><b>Полномочия подписанта</b><span>Доверенность на бумаге либо машиночитаемая доверенность для ЭДО — с 1 сентября 2024 года сотрудник подписывает документы личной подписью, а полномочия подтверждает МЧД.</span></li>
          <li><b>Проект договора со спецификацией</b><span>Договор аренды с экипажем, спецификация техники и площадки, форма сменного рапорта, форма УПД.</span></li>
          <li><b>Документы на технику и оператора</b><span>Комплект, который физически едет с машиной на объект: паспорт подъёмного сооружения с отметкой об освидетельствовании, сведения об учёте ПС в Ростехнадзоре, удостоверение крановщика и приказ о его назначении на эту машину.</span></li>
          <li><b>Петербургские допуски по объекту</b><span>Грузовой пропуск свыше 8 т, допуск в зону транспортной безопасности терминала, статус площадки по охранным зонам — <Link href="/documents/">страница допусков</Link>.</span></li>
        </ol>
      </section>

      <section className="section wrap" id="specifikaciya">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">Раздел 03</span>
            <h2>Спецификация техники</h2>
            <p>Пять машин, которые закрывают городские и портовые задачи Петербурга. Подбор идёт по паре
              «вес груза и вылет», а не по тоннажу в названии: на предельном вылете доступная грузоподъёмность
              всегда меньше номинальной.</p>
          </div>
          <SpecIllustration />
        </div>
        {/* Волна 127: шесть колонок на ширине 375 px превращались в две с половиной
            видимых и полосу пустоты; ниже 620 px таблица разворачивается в записи
            (см. .dtable--stack), метки берутся из data-label. */}
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Парк: класс, стрела, высота подъёма и типовая задача</caption>
            <thead>
              <tr>
                <th scope="col">Машина</th>
                <th scope="col">Грузо&shy;подъёмность</th>
                <th scope="col">Стрела</th>
                <th scope="col">Высота подъёма</th>
                <th scope="col">Класс прайса</th>
                <th scope="col">Типовая задача</th>
              </tr>
            </thead>
            <tbody>
              {PARK.map((m) => (
                <tr key={m.href}>
                  <th scope="row"><Link href={m.href}>{m.name}</Link></th>
                  <td className="dtable__num" data-label="Грузоподъёмность">{m.tonnage}</td>
                  <td className="dtable__num" data-label="Стрела">{m.boom}</td>
                  <td className="dtable__num" data-label="Высота подъёма">{m.height}</td>
                  <td className="dtable__num" data-label="Класс прайса">{m.priceClass}</td>
                  <td data-label="Типовая задача">{m.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="price-note">
          На каждую машину есть технический лист: грузовысотная характеристика, габариты в транспортном
          положении, требования к опорной площадке и комплект документов —{" "}
          <Link href="/park/">раздел «Парк техники»</Link>.
        </p>

        {/* Волна 125: 2 машины парка со свободно лицензированным фото (Волна 106) —
            карточки-«exhibit» с 3D-наклоном (CardTilt.tsx). Остальные 5 машин — только
            чертёж, свободного фото не нашлось (см. Волна 106), похожую модель не
            подставляем. */}
        <div className="spec-photo-grid">
          {/* Волна приёмки. <picture> с WebP-источником и JPEG в <img> как запасным.
              width/height проставлены впервые: без них браузер не знает пропорцию
              до загрузки файла и подставляет нулевую высоту — карточка «прыгает»
              на глазах у читателя (CLS). Значения — натуральные размеры файлов,
              отображаемый размер задаёт CSS. */}
          <Link href="/park/liebherr-ltm-1090/" className="spec-photo-card">
            <picture>
              <source srcSet="/images/park/liebherr-ltm-1090.webp" type="image/webp" />
              <img className="spec-photo-card__img" src="/images/park/liebherr-ltm-1090.jpg" width="1280" height="960" alt="Liebherr LTM 1090-4.1 — фото модели, не единица нашего парка" loading="lazy" decoding="async" />
            </picture>
            <div className="spec-photo-card__body">
              <div className="spec-photo-card__name">Liebherr LTM 1090-4.1</div>
              <div className="spec-photo-card__note">Технический лист, реальное фото модели →</div>
            </div>
          </Link>
          <Link href="/park/liebherr-ltm-1130/" className="spec-photo-card">
            <picture>
              <source srcSet="/images/park/liebherr-ltm-1130.webp" type="image/webp" />
              <img className="spec-photo-card__img" src="/images/park/liebherr-ltm-1130.jpg" width="1280" height="718" alt="Liebherr LTM 1130-5.1 — фото модели, не единица нашего парка" loading="lazy" decoding="async" />
            </picture>
            <div className="spec-photo-card__body">
              <div className="spec-photo-card__name">Liebherr LTM 1130-5.1</div>
              <div className="spec-photo-card__note">Технический лист, реальное фото модели →</div>
            </div>
          </Link>
        </div>
      </section>
      <CardTilt />

      <section className="section wrap" id="price">
        <div className="section-head">
          <span className="eyebrow">Раздел 04</span>
          <h2>Прайс-лист</h2>
          <p>Открытые ставки без регистрации и «звоните — обсудим». Это ориентир для бюджетирования заявки;
            обязывающие цифры фиксирует КП по вашему объекту.</p>
        </div>
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Ставки на аренду автокрана с экипажем, Санкт-Петербург, {FACT_CHECK.replace(" года", "")}</caption>
            <thead>
              <tr>
                <th scope="col">Класс техники</th>
                <th scope="col">Машины парка</th>
                <th scope="col">Минимальная смена</th>
                <th scope="col">Ставка, ₽/час без НДС</th>
                <th scope="col">Смена {MIN_SHIFT_HOURS} ч, ₽ без НДС</th>
                <th scope="col">Условия подачи</th>
              </tr>
            </thead>
            <tbody>
              {PRICE.map((p) => (
                <tr key={p.cls}>
                  <th scope="row">{p.cls}</th>
                  <td data-label="Машины парка">{p.models}</td>
                  <td className="dtable__num" data-label="Минимальная смена">{MIN_SHIFT_HOURS} ч</td>
                  <td className="dtable__num" data-label="Ставка, ₽/час без НДС">от {rub(p.rate)}</td>
                  <td className="dtable__num price-total" data-label={`Смена ${MIN_SHIFT_HOURS} ч, ₽ без НДС`}>от {rub(shiftTotal(p.rate))}</td>
                  <td data-label="Условия подачи">{p.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="incl" style={{ marginTop: 26 }}>
          <div className="incl__col incl__col--yes">
            <div className="incl__title">Входит в ставку смены</div>
            <ul className="incl__list">
              <li>Работа машиниста и работа крана на объекте в течение смены</li>
              <li>Топливо и текущее техническое обслуживание техники</li>
              <li>Инвентарные подкладки под выносные опоры, включая усиленные для слабого основания</li>
              <li>Проверка маршрута: пропускной режим, а в навигацию — график разводки мостов на дату выезда</li>
              <li>Комплект документов на машину и оператора на объекте</li>
            </ul>
          </div>
          <div className="incl__col incl__col--no">
            <div className="incl__title">Считается отдельно</div>
            <ul className="incl__list">
              <li>Подача техники: зависит от адреса и плеча от точки базирования</li>
              <li>Часы сверх минимальной смены — по той же часовой ставке</li>
              <li>Стропальщик и такелажная оснастка под конкретный груз</li>
              <li>Работа в выходные и праздники, ночная смена</li>
              <li>Геологические изыскания и проект производства работ — это зона заказчика</li>
            </ul>
          </div>
        </div>

        <p className="price-note">
          Формула сметы простая и одна на все классы: <b>ставка за час × {MIN_SHIFT_HOURS} часов минимальной смены</b>,
          далее по фактическим часам из сменного рапорта. Например, класс 41–80 т: {rub(PRICE[1].rate)}/час
          × {MIN_SHIFT_HOURS} ч = {rub(shiftTotal(PRICE[1].rate))} за смену без НДС.
        </p>
        <p className="price-note">
          Отдельной наценки «за мост» или «за исторический центр» в прайсе нет и не будет: разводка мостов
          и охранный статус площадки влияют на срок и время выезда, а не на ставку. Если по объекту нужен
          иной формат — почасовая работа сверх смены, вахтовый график, длительная аренда — это фиксируется
          в спецификации к договору.
        </p>
        {/*
          Волна приёмки. Смысл абзаца прежний, изменились две вещи. Формулировка
          приведена к той, которую ищут и проверяющий, и рубрикатор: «не являются
          публичной офертой» вместо разговорного «не публичная оферта». И дата,
          на которую ставки верны, стала машиночитаемой — <time dateTime>, а не
          просто текст. Оговорка стоит прямо под таблицей, а не только в подвале
          источников: читать цену и оговорку к ней в разных концах страницы —
          то же самое, что не иметь оговорки.
        */}
        <p className="disclaimer">
          Прайс верен на <time dateTime={FACT_CHECK_ISO}>{FACT_CHECK}</time> и не является публичной
          офертой: итоговая цена зависит от адреса, доступа на площадку и срока оформления допусков.
          Сайт демонстрационный, реквизиты юридического лица на нём не опубликованы, потому что их
          пока не существует — придумывать их мы не станем. Как мы обращаемся с данными из формы —{" "}
          <Link href="/politika-obrabotki-personalnyh-dannyh/">
            в политике обработки персональных данных
          </Link>.
        </p>
      </section>

      <section className="section wrap" id="obekty">
        <div className="section-head">
          <span className="eyebrow">Раздел 05</span>
          <h2>Типы объектов Петербурга</h2>
          <p>Спецификация подачи различается не по району, а по типу объекта: он задаёт ограничение доступа,
            требования к площадке и срок подготовки.</p>
        </div>
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Семь типов объектов и что на них решает</caption>
            <thead>
              <tr>
                <th scope="col">Тип объекта</th>
                <th scope="col">Что ограничивает раньше всего</th>
                <th scope="col">Рабочий класс</th>
                <th scope="col">Что задаёт срок</th>
              </tr>
            </thead>
            <tbody>
              {OBJECT_TYPES.map((o) => (
                <tr key={o.href}>
                  <th scope="row"><Link href={o.href}>{o.name}</Link></th>
                  <td data-label="Что ограничивает раньше всего">{o.limit}</td>
                  <td className="dtable__num" data-label="Рабочий класс">{o.cls}</td>
                  <td data-label="Что задаёт срок">{o.lead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap" id="sroki">
        <div className="section-head">
          <span className="eyebrow">Раздел 06</span>
          <h2>Что двигает дату выезда</h2>
          <p>Дата выезда считается от самого длинного допуска, а не от даты подписания договора. Четыре
            петербургских ограничения, из-за которых эта дата сдвигается чаще всего.</p>
        </div>
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Ограничения и их сроки, сверены {FACT_CHECK}</caption>
            <thead>
              <tr>
                <th scope="col">Ограничение</th>
                <th scope="col">Что делает</th>
                <th scope="col">Срок</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Пропуск на грузовое ТС свыше 8 т</th>
                <td data-label="Что делает">Автокран любого класса из парка проходит порог по массе, поэтому пропуск для нас правило,
                  а не исключение. Выдаёт Комитет по благоустройству.</td>
                <td data-label="Срок">постоянный — 10 рабочих дней с марта по октябрь и 15 с ноября по февраль; разовый — 3 часа
                  рабочего времени, действует не более 5 суток</td>
              </tr>
              <tr>
                <th scope="row">Разводка мостов в навигацию</th>
                <td data-label="Что делает">Ночной или ранний выезд через Неву может упереться в разведённый пролёт. Навигация
                  2026 года — 10 апреля – 30 ноября, большинство мостов разводится примерно с 1:00 до 5:00,
                  мост Александра Невского — в 02:20.</td>
                <td data-label="Срок">сверяем график конкретных мостов маршрута до подтверждения времени; Сампсониевский,
                  Гренадерский и Кантемировский разводят по заявке за 2 суток</td>
              </tr>
              <tr>
                <th scope="row">Допуск в зону транспортной безопасности терминала</th>
                <td data-label="Что делает">Въезд на портовый терминал сопровождается досмотром транспортного средства, а данные
                  на людей и машину передаются заранее (постановление Правительства РФ от 08.10.2020 № 1638).</td>
                <td data-label="Срок">единого федерального срока нет — его устанавливает сам терминал, поэтому в заявке нужно
                  его название, а не слово «порт»</td>
              </tr>
              <tr>
                <th scope="row">Охранный статус площадки</th>
                <td data-label="Что делает">Защитная зона памятника и объединённые зоны охраны Петербурга задают подъезд, точку
                  установки на опоры и границы согласованного пятна.</td>
                <td data-label="Срок">от справки о статусе здания или участка; при работах по ордеру ГАТИ просим его номер
                  и согласованные границы</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Подробности по каждому допуску — на странице <Link href="/documents/">«Допуски и документы»</Link>,
          логистика подачи и график навигации — в разделе <Link href="/obekty/">«Объекты»</Link>.
        </p>
      </section>

      <section className="section wrap" id="geo">
        <div className="section-head">
          <span className="eyebrow">Раздел 07</span>
          <h2>География</h2>
          <p>Пятнадцать районов, у которых логистика подачи отличается от общегородской настолько, что это меняет
            график.</p>
        </div>
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Районы и их локальные ограничения</caption>
            <thead>
              <tr>
                <th scope="col">Район</th>
                <th scope="col">Преобладающий профиль объектов</th>
                <th scope="col">Локальное ограничение</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICTS.map((d) => (
                <tr key={d.href}>
                  <th scope="row"><Link href={d.href}>{d.name}</Link></th>
                  <td data-label="Преобладающий профиль объектов">{d.profile}</td>
                  <td data-label="Локальное ограничение">{d.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="price-note">
          Сводка по районам с сопоставлением ограничений — <Link href="/geo/">раздел «География»</Link>.
        </p>
      </section>

      <section className="section wrap" id="kp">
        <div className="section-head">
          <span className="eyebrow">Раздел 08</span>
          <h2>Запросить коммерческое предложение</h2>
          <p>Поле ИНН проверяется по контрольной цифре сразу в форме: опечатка в нём ломает карточку
            контрагента и КП приходится переделывать.</p>
        </div>
        <KpForm />
        <p className="page-contact">
          Телефон для срочных заявок: <a href={PHONE_HREF}>{PHONE_TEXT}</a>
        </p>
      </section>

      <Sources
        date={FACT_CHECK}
        items={[
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — выдача пропусков на движение грузовых ТС с разрешённой максимальной массой свыше 8 тонн: орган, виды пропусков и сроки оформления" },
          { href: "https://mostotrest-spb.ru/news/utverzhden-grafik-razvodki-mostov-na-2026-god-1670", label: "СПб ГБУ «Мостотрест» — утверждённый график разводки мостов на 2026 год и период навигации" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/bb767d578129e775a71c297fef3bffb0a9e8a7c5/", label: "ст. 640 ГК РФ — ответственность за вред, причинённый транспортным средством, несёт арендодатель" },
          { href: "https://its.1c.ru/db/content/newscomm/src/497590.htm", label: "Федеральный закон от 28.11.2025 № 425-ФЗ — основная ставка НДС 22 % с 1 января 2026 года, переходный период не предусмотрен" },
          { href: "https://www.consultant.ru/law/podborki/data_zaklyucheniya_dogovora_po_223-fz/", label: "ч. 15 ст. 3.2 Федерального закона № 223-ФЗ — договор заключается не ранее 10 и не позднее 20 дней с даты размещения итогового протокола" },
          { href: "https://www.garant.ru/news/1535041/", label: "ГАРАНТ.РУ — максимальный срок оплаты по договорам с субъектами МСП в закупках по 223-ФЗ сокращён с 15 до 7 рабочих дней" },
          { href: "https://ppt.ru/art/zakupki/oplata-po-kontraktu-po-44-fz-kak-poluchit-vovremya", label: "ч. 13.1 ст. 34 Федерального закона № 44-ФЗ — оплата в течение 7 рабочих дней после подписания документа о приёмке (10 рабочих дней без ЕИС)" },
          { href: "https://base.garant.ru/74753298/", label: "постановление Правительства РФ от 08.10.2020 № 1638 — транспортная безопасность объектов морского и речного транспорта" },
        ]}
        note="Чего здесь сознательно нет: отзывов, рейтингов и цифр вроде «14 лет на рынке» или «120 единиц техники». Сайт демонстрационный, подтвердить такие утверждения нечем, поэтому их нет ни в тексте, ни в микроразметке."
      />
    </main>
  );
}
