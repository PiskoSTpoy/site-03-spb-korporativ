import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W148, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 148. Двадцать седьмой тип объекта — действующая АЗС. Угол
  коммерческий/сравнительный: владелец сети выбирает между полным закрытием
  станции, закрытием части островков и ночным окном — и от этого выбора
  зависят класс крана и число смен. Скелет статьи seo-2026-playbook.

  Фактура — Правила противопожарного режима (ПП РФ № 1479, ред. 03.02.2025),
  раздел XVII «Автозаправочные станции», прочитан дважды (consultant.ru,
  sudact.ru), формулировки совпали:
    · п. 385 «б» — на АЗС запрещается проезд транспортных средств над
      подземными резервуарами, если это не предусмотрено
      технико-эксплуатационной документацией;
    · п. 381 — при наполнении резервуаров из автоцистерны (без донного
      клапана) присутствие людей, не входящих в персонал, кроме водителя
      автоцистерны, на территории не допускается.
  ФНП № 461 п. 98, п. 114 — сверены Волной 145. Огневые работы и работы
  внутри резервуаров (п. 376) — не наш предмет, их ведёт подрядчик станции.
*/

const title = "Автокран на действующей АЗС: закрыть станцию или окно";
const description =
  "Замена навеса, колонки или модуля операторной на работающей АЗС в Петербурге: п. 385 «б» Правил противопожарного режима, три сценария работы и ставка смены.";
const h1 = "Автокран на действующей АЗС: закрывать станцию или работать в окно?";
const canonical = "/obekty/deystvuyushchaya-azs/";
const published = "2026-09-25";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "rezervuary", label: "Почему опоры крана не ставят над резервуарами" },
  { id: "tri-stsenariya", label: "Три сценария: закрытие, островок, ночь" },
  { id: "klass-krana", label: "Какой класс крана выбрать" },
  { id: "stoimost", label: "Сколько стоит работа на АЗС" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли ставить автокран над подземными резервуарами АЗС?",
    a: "Нет, если это не предусмотрено технико-эксплуатационной документацией станции: п. 385 «б» Правил противопожарного режима запрещает проезд транспорта над подземными резервуарами. KRANNEVA ставит опоры вне резервуарного парка и сверяет точку установки со схемой станции.",
  },
  {
    q: "Нужно ли полностью закрывать АЗС для замены навеса?",
    a: "Не всегда. Если навес меняют частями, KRANNEVA работает при закрытых островках под траекторией груза, а остальная станция принимает машины. Полное закрытие нужно, когда груз проходит над всей зоной заправки или кран стоит на въезде.",
  },
  {
    q: "Можно ли работать краном во время слива топлива из автоцистерны?",
    a: "KRANNEVA не планирует подъём на время приёма топлива: по п. 381 Правил противопожарного режима при наполнении резервуаров из автоцистерны без донного клапана посторонним на территории находиться нельзя. График слива согласуется с оператором станции заранее.",
  },
  {
    q: "Какой кран нужен для замены топливораздаточной колонки?",
    a: "Колонку обычно поднимают с коротким вылетом, поэтому KRANNEVA чаще предлагает SANY STC400T класса 25–40 т. Точный класс определяет масса колонки по паспорту и расстояние от точки установки до островка.",
  },
  {
    q: "Кто отвечает за огневые работы при реконструкции АЗС?",
    a: "Огневые работы и работы внутри резервуаров ведёт подрядчик станции по своим допускам. KRANNEVA отвечает за подъём и перемещение груза краном с экипажем по ППР, который готовит заказчик или его подрядчик.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Действующая АЗС", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для работ на действующей автозаправочной станции",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Действующая АЗС</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · действующая АЗС</span>
          <h1>{h1}</h1>
          <p>
            Полностью закрывать АЗС для работы автокрана нужно не всегда: чаще хватает закрыть
            островки под траекторией груза или взять ночное окно. Жёсткое ограничение одно —
            п. 385 «б» Правил противопожарного режима запрещает проезд транспорта над подземными
            резервуарами, если его не допускает документация станции. Поэтому KRANNEVA сначала
            ищет точку установки вне резервуарного парка, а уже от неё выбирает сценарий и класс
            крана — от SANY STC400T до XCMG QY60K.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W148} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на действующую АЗС</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>замена или монтаж навеса над зоной заправки, установка и замена топливораздаточных колонок, модуля операторной, рекламной стелы, подъём оборудования очистных сооружений</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls} — класс задаёт вылет от точки установки вне резервуарного парка до места опускания</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link> для тесной городской станции, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>подземные резервуары: проезд транспорта над ними запрещён, если его не допускает технико-эксплуатационная документация (п. 385 «б» Правил противопожарного режима)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР и (или) технологическая карта (п. 98 ФНП № 461) со схемой станции, резервуарным парком и точкой установки крана</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>решение владельца станции о сценарии (закрытие, островок, ночь), график приёма топлива из автоцистерны, готовность ППР</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="rezervuary">Почему опоры крана не ставят над резервуарами</h2>
        <p>
          Пункт 385 «б» Правил противопожарного режима запрещает на АЗС проезд транспортных средств
          над подземными резервуарами, если это не предусмотрено технико-эксплуатационной
          документацией станции. Автокран с опорами давит на основание сильнее легковой машины,
          поэтому KRANNEVA не ставит его над резервуарным парком без прямого разрешения в этой
          документации. Схему резервуаров и трубопроводов запрашиваем у оператора станции до выезда.
        </p>
        <p>
          Точка установки вне резервуаров почти всегда дальше от места работы, чем хотелось бы.
          Из-за этого вылет растёт, и KRANNEVA иногда предлагает кран на класс выше, чем подсказывает
          масса груза: XCMG QY60K у края площадки вместо SANY STC400T прямо у островка.
        </p>

        <h2 id="tri-stsenariya">Три сценария: закрытие, островок, ночь</h2>
        <p>
          Владелец АЗС выбирает между тремя сценариями, и KRANNEVA считает под каждый своё число
          смен и класс машины. Сравнение ниже — по тому, что меняется для станции, а не по цене
          крана: ставка за час одинакова во всех трёх случаях.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Сценарии работы автокрана на действующей АЗС</caption>
            <thead>
              <tr>
                <th scope="col">Сценарий</th>
                <th scope="col">Что закрыто</th>
                <th scope="col">Когда подходит</th>
                <th scope="col">Что учесть</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Полное закрытие</th><td>вся станция</td><td>демонтаж и монтаж навеса целиком, кран на въезде</td><td>работа в одну длинную смену, без перестановок ограждения</td></tr>
              <tr><th scope="row">Закрытие части островков</th><td>островки под траекторией груза</td><td>замена колонки, секции навеса, стелы</td><td>зона работы крана огорожена, под грузом нет людей (п. 114 ФНП № 461)</td></tr>
              <tr><th scope="row">Ночное окно</th><td>станция или её часть в часы низкого трафика</td><td>короткий подъём одного агрегата</td><td>освещение зоны работы, согласование окна с графиком приёма топлива</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Приём топлива KRANNEVA в окно работы не ставит: по п. 381 Правил противопожарного режима
          при наполнении резервуаров из автоцистерны без донного клапана посторонним на территории
          находиться нельзя, а экипаж крана к персоналу станции не относится.
        </p>

        <h2 id="klass-krana">Какой класс крана выбрать</h2>
        <p>
          Класс крана на АЗС KRANNEVA выбирает по вылету от разрешённой точки установки. SANY STC400T
          класса 25–40 т закрывает колонки, стелы и модули, когда кран встаёт рядом. XCMG QY60K класса 41–80 т
          нужен, если кран стоит у края площадки за резервуарным парком
          и тянется через зону заправки к навесу. Кран класса 81–130 т на городской АЗС KRANNEVA
          предлагает редко: на площадке обычно негде разложить его опоры.
        </p>

        <h2 id="stoimost">Сколько стоит работа на АЗС</h2>
        <p>
          Наценки за работу на действующей АЗС у KRANNEVA нет, ставка зависит только от класса.
          Пример: замена колонки краном SANY STC400T — от {rub(light.rate)} в час без НДС,
          минимальная смена {MIN_SHIFT_HOURS} часов, итого от {rub(shiftTotal(light.rate))}.
          Демонтаж секции навеса с дальней точки краном XCMG QY60K — от {rub(shiftTotal(mid.rate))}{" "}
          за смену без НДС.
        </p>
        <p>
          Для сети АЗС KRANNEVA заключает рамочный договор аренды техники с экипажем и подаёт кран
          по заявке на каждую станцию — условия в разделе <Link href="/dlya-zakupok/">«Для закупок»</Link>.
          Соседние типы объектов — <Link href="/obekty/pridorozhnaya-polosa-avtodorogi/">придорожная полоса автодороги</Link>{" "}
          и <Link href="/obekty/ohrannaya-zona-gazoprovoda/">охранная зона газопровода</Link>.
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
        date={FACT_CHECK_W148}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_363263/a7d7c4b171a3a58364f92e4f7b62f869d9ca5a1d/", label: "КонсультантПлюс — Правила противопожарного режима в РФ (ПП РФ от 16.09.2020 № 1479, ред. 03.02.2025), раздел XVII «Автозаправочные станции» (пп. 381, 385)" },
          { href: "https://sudact.ru/law/postanovlenie-pravitelstva-rf-ot-16092020-n-1479/pravila-protivopozharnogo-rezhima-v-rossiiskoi/xvii/", label: "Правила противопожарного режима, раздел XVII — полный текст пунктов 381 и 385 (sudact.ru)" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461, раздел «Установка ПС и производство работ» (пп. 98, 114)" },
        ]}
        note="Пункты 381 и 385 Правил противопожарного режима прочитаны в двух независимых источниках, формулировки совпали. Массу навесов и колонок, допустимую нагрузку на покрытие площадки и расстояния от резервуаров в метрах не приводим: это данные паспорта оборудования и документации конкретной станции."
      />
    </main>
  );
}
