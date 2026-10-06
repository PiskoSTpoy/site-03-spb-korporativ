import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W180, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 180. Пятьдесят девятый тип — объект, где аренда крана затягивается
  сверх первой даты. Угол информационный / how-to: как оформить и продлить
  договор аренды с экипажем. Фактура — в комментарии к FACT_CHECK_W180
  в app/site-data.ts. Сроков согласования продления в нормативе нет —
  страница их не называет.
*/

const title = "Продление аренды крана: автопродления нет (ст. 632 ГК РФ)";
const description =
  "Договор аренды крана с экипажем — только письменный, а автопродления по ст. 621 нет (ст. 632–633 ГК РФ). Как продлить аренду у KRANNEVA.";
const h1 = "Как продлить аренду крана с оператором и нужен ли письменный договор?";
const canonical = "/obekty/pismennyy-dogovor-i-prodlenie-arendy-krana/";
const published = "2026-10-06";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "forma", label: "Почему договор с экипажем только письменный" },
  { id: "avtoprodlenie", label: "Почему аренда не продлевается сама" },
  { id: "kak-prodlit", label: "Как продлить аренду по шагам" },
  { id: "stavka", label: "Какая ставка действует при продлении" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Нужен ли письменный договор на аренду крана с оператором?",
    a: "Да. Статья 633 ГК РФ требует письменной формы для договора аренды транспортного средства с экипажем независимо от срока, поэтому даже аренда на одну смену оформляется письменно. KRANNEVA заключает такой договор до подтверждения даты выезда.",
  },
  {
    q: "Продлевается ли аренда крана автоматически, если работы не закончены?",
    a: "Нет. Часть 2 статьи 632 ГК РФ исключает для аренды с экипажем правило статьи 621 о возобновлении договора на неопределённый срок, поэтому продолжение работ без нового письменного соглашения срока не продлевает.",
  },
  {
    q: "Есть ли у арендатора преимущественное право на новый срок?",
    a: "По части 2 статьи 632 ГК РФ преимущественное право статьи 621 к аренде с экипажем не применяется. Новый срок возможен только по соглашению сторон, и подтверждение даты у KRANNEVA зависит от занятости машины.",
  },
  {
    q: "Нужно ли регистрировать договор аренды крана?",
    a: "Нет. Статья 633 ГК РФ прямо указывает, что правила о регистрации договоров аренды из пункта 2 статьи 609 к аренде с экипажем не применяются.",
  },
  {
    q: "Как оформить продление, если стройка затянулась?",
    a: "Письменным дополнительным соглашением до окончания действующего срока: новая дата или смены, ставка на дату продления и порядок оплаты. Устная договорённость с оператором на площадке договор не меняет.",
  },
  {
    q: "Сколько стоит смена на продлении?",
    a: `Ставка берётся из условий на дату соглашения. Сегодня класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Письменный договор и продление аренды", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором: письменный договор и продление",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Письменный договор и продление аренды</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · договор и продление</span>
          <h1>{h1}</h1>
          <p>
            Статья 633 ГК РФ требует письменный договор аренды крана с экипажем при любом сроке,
            а часть 2 статьи 632 исключает автоматическое продление по статье 621. Поэтому
            заказчик KRANNEVA, у которого работы выходят за первую дату, подписывает
            дополнительное соглашение до окончания срока, а не продолжает работать по устной договорённости.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W180} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Что ГК РФ говорит о форме и продлении аренды с экипажем</caption>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Для аренды крана с экипажем</th>
                <th scope="col">Статья</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Форма договора</th><td>письменная независимо от срока</td><td>633</td></tr>
              <tr><th scope="row">Регистрация договора</th><td>правила п. 2 ст. 609 не применяются</td><td>633</td></tr>
              <tr><th scope="row">Возобновление на неопределённый срок</th><td>правило ст. 621 не применяется</td><td>632, ч. 2</td></tr>
              <tr><th scope="row">Преимущественное право на новый срок</th><td>правило ст. 621 не применяется</td><td>632, ч. 2</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: что публично известно об условиях KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
              <tr><th scope="row">Срок рассмотрения продления</th><td>в нормативе не установлен, в публичных условиях не указан</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="forma">Почему договор с экипажем только письменный</h2>
        <p>
          Статья 633 ГК РФ требует письменную форму для договора аренды транспортного средства
          с экипажем при любом сроке. Договор на одну смену SANY STC400T у KRANNEVA поэтому
          оформляется так же, как договор на месяц: заявка и устное «приезжайте завтра» его не заменяют.
        </p>
        <p>
          Та же статья снимает требование регистрации: правила пункта 2 статьи 609 об аренде
          с государственной регистрацией к такому договору не применяются. Для заказчика KRANNEVA
          это означает, что договор вступает в силу подписанием, а не регистрацией.
        </p>

        <h2 id="avtoprodlenie">Почему аренда не продлевается сама</h2>
        <p>
          По общему правилу статьи 621 ГК РФ договор, после окончания которого арендатор
          продолжает пользоваться имуществом без возражений арендодателя, считается возобновлённым
          на неопределённый срок. Часть 2 статьи 632 исключает это правило для аренды с экипажем,
          поэтому работа XCMG QY60K на площадке сверх срока продлением не становится.
        </p>
        <p>
          Часть 2 статьи 632 исключает и преимущественное право арендатора на новый срок из
          статьи 621. Заказчик KRANNEVA, чьи работы затянулись, не вправе требовать продления:
          новая дата подтверждается по занятости машины и фиксируется письменно.
        </p>

        <h2 id="kak-prodlit">Как продлить аренду по шагам</h2>
        <p>
          Продление у KRANNEVA оформляется четырьмя шагами. Первый — сообщить диспетчеру о
          затяжке до окончания срока, не в последний день. Второй — согласовать новые даты или
          смены и подтвердить, что машина свободна. Третий — подписать письменное
          дополнительное соглашение. Четвёртый — сверить ставку на дату соглашения.
        </p>
        <p>
          Устный уговор с оператором SANY STC400T на площадке договор не меняет: по части 2
          статьи 635 ГК РФ оператор — работник арендодателя, а срок и цену меняет только
          соглашение сторон. Состав услуг экипажа, который не меняется при продлении,
          описывает страница{" "}
          <Link href="/obekty/toplivo-i-ekipazh-v-stavke/">топлива и экипажа в ставке</Link>.
        </p>
        <p>
          Если подъёмы идут несколькими днями подряд, порядок учёта смен KRANNEVA стоит записать сразу
          при заключении договора. Схему нескольких подъёмов в одну смену разбирает страница{" "}
          <Link href="/obekty/neskolko-podemov-v-odnu-smenu/">подъёмов в одну смену</Link>.
        </p>

        <h2 id="stavka">Какая ставка действует при продлении</h2>
        <p>
          Ставка KRANNEVA на дату продления: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))} за смену, класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))} без НДС. Гарантии, что прежняя ставка сохранится на новый срок,
          публичные условия не содержат, поэтому цена фиксируется в самом дополнительном соглашении.
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
        date={FACT_CHECK_W180}
        items={[
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/1ffe0cb622bfbe86c61d7d6df4c8c6011dfb45fe/", label: "КонсультантПлюс — ГК РФ, статья 632 «Договор аренды транспортного средства с экипажем»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/d19f557dd78bd2c6e4ca38b38e6b33dcf2c8bd0a/", label: "КонсультантПлюс — ГК РФ, статья 633 «Форма договора аренды транспортного средства с экипажем»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_9027/c22a45bebe759e5aecca241ce6e591612a842eb2/", label: "КонсультантПлюс — ГК РФ, статья 621 «Преимущественное право арендатора на заключение договора аренды на новый срок»" },
        ]}
        note="Страница пересказывает общие правила статей 621, 632 и 633 ГК РФ и не заменяет договор. Срок рассмотрения продления нормативом не установлен и в публичных условиях KRANNEVA не указан — страница его не называет."
      />
    </main>
  );
}
