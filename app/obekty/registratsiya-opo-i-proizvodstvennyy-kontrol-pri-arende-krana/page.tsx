import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W231, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 231. Сто десятый тип объекта — регистрация ОПО и производственный контроль при аренде крана (ФНП № 461, п. 142, 146, 147, 251 «б»).
  Фактура — в комментарии к FACT_CHECK_W229–231 в app/site-data.ts.
*/

const title = "Регистрация ОПО и производственный контроль при аренде крана";
const description =
  "П. 142 и 146 ФНП № 461 отсылают к двум постановлениям и не называют арендатора. Какие обязанности норма закрепляет и что закрепить в договоре аренды.";
const h1 = "Кто регистрирует опасный объект и ведёт производственный контроль, если кран арендован?";
const canonical = "/obekty/registratsiya-opo-i-proizvodstvennyy-kontrol-pri-arende-krana/";
const published = "2026-10-29";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "chto-skazano", label: "Что сказано в п. 142 и 146" },
  { id: "ekspluatiruyushchaya", label: "Кто такая эксплуатирующая организация" },
  { id: "prakticheski", label: "Что закрепить в договоре" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Кто регистрирует ОПО при аренде крана?",
    a: "ФНП № 461 (п. 142) отсылает к правилам регистрации и закону № 116-ФЗ и не называет арендатора или арендодателя. Роли закрепляют договором.",
  },
  {
    q: "Какое постановление регулирует производственный контроль?",
    a: "П. 146 ФНП № 461 ссылается на правила, утверждённые постановлением Правительства от 10 марта 1999 года № 263, в редакции, указанной в тексте ФНП.",
  },
  {
    q: "Нужно ли заказчику проверять удостоверение оператора?",
    a: "Порядок допуска персонала с удостоверениями устанавливает эксплуатирующая организация (п. 147 «б»). Запрос копии удостоверения оператора — практика KRANNEVA.",
  },
  {
    q: "Что делать, если ответственные ИТР не назначены?",
    a: "Эксплуатирующая организация не должна допускать ПС в работу (п. 251 «б» ФНП № 461).",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Регистрация ОПО и производственный контроль при аренде крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором в Санкт-Петербурге с закреплением ролей эксплуатирующей организации в договоре",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Регистрация ОПО и производственный контроль при аренде крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Практика Петербурга · опасный производственный объект</span>
          <h1>{h1}</h1>
          <p>
            ФНП № 461 не называет арендатора или арендодателя: п. 142 отсылает регистрацию ОПО к постановлению Правительства № 1371 и Федеральному закону № 116-ФЗ, п. 146 — производственный контроль к постановлению № 263, а обязанности по содержанию ПС в п. 147 возложены на «эксплуатирующую организацию». KRANNEVA закрепляет роли в договоре аренды SANY STC400T и Kato NK-250E-V до подачи.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W231} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Обязанности эксплуатирующей организации и то, чего норма не уточняет (ФНП № 461, п. 142, 146, 147, 251 «б»)</caption>
            <thead>
              <tr>
                <th scope="col">Обязанность</th><th scope="col">Пункт ФНП</th><th scope="col">На что отсылает или что требует</th><th scope="col">Чего норма не говорит</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Регистрация ОПО</th><td>п. 142</td><td>правила регистрации (постановление Правительства от 24.11.1998 № 1371) и Федеральный закон № 116-ФЗ</td><td>кто регистрирует при аренде</td></tr>
              <tr><th scope="row">Производственный контроль</th><td>п. 146</td><td>правила организации и осуществления производственного контроля (постановление Правительства от 10.03.1999 № 263)</td><td>кто его ведёт при аренде с оператором</td></tr>
              <tr><th scope="row">Порядок осмотров, ТО и ремонтов ПС, путей, грузозахватных органов и тары</th><td>п. 147 «а»</td><td>установить порядок, обеспечивающий работоспособное содержание</td><td>кому поручить при аренде</td></tr>
              <tr><th scope="row">Допуск персонала с удостоверениями</th><td>п. 147 «б»</td><td>порядок проверки знаний и допуска с выдачей удостоверений с указанием типа ПС и видов работ</td><td>чьё удостоверение у оператора арендодателя проверяет заказчик</td></tr>
              <tr><th scope="row">Назначение ответственных ИТР</th><td>п. 251 «б»</td><td>без назначения ПС не допускают в работу</td><td>кто назначает при аренде</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: закрепление ролей эксплуатирующей организации при аренде у KRANNEVA</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>кто эксплуатирующая организация, кто назначает ответственных, чьи удостоверения у оператора</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="chto-skazano">Что сказано в п. 142 и 146</h2>
        <p>
          Пункт 142 ФНП № 461 требует регистрировать ОПО с ПС по правилам, утверждённым постановлением Правительства от 24 ноября 1998 года № 1371, и по Федеральному закону № 116-ФЗ. Пункт 146 относит производственный контроль к правилам постановления от 10 марта 1999 года № 263. Сами правила в этом материале не пересказываются и не сверялись: ссылки даны так, как они указаны в тексте ФНП в редакции от 16.04.2026.
        </p>

        <h2 id="ekspluatiruyushchaya">Кто такая эксплуатирующая организация при аренде</h2>
        <p>
          П. 147 возлагает на эксплуатирующую организацию содержание ПС в работоспособном состоянии, установление порядка осмотров и ремонтов и допуск персонала с удостоверениями. Определения арендатора и арендодателя в этих пунктах нет, поэтому KRANNEVA в договоре аренды автокрана с оператором называет эксплуатирующую организацию прямо и перечисляет, кто из сторон назначает ответственных. Это практика компании: норма на такой договор не отсылает.
        </p>
        <p>
          Подробности о том, чьи стропальщики и грузозахватные приспособления на объекте, разобраны на страницах <Link href="/obekty/stropalshchik-zakazchika-ili-arendodatelya/">про стропальщика заказчика или арендодателя</Link> и <Link href="/obekty/subarenda-i-dogovory-s-tretimi-litsami/">про субаренду и договоры с третьими лицами</Link>.
        </p>

        <h2 id="prakticheski">Что закрепить в договоре по п. 147 и 251</h2>
        <p>
          Заказчику стоит письменно закрепить четыре вещи. Первая — какая организация названа эксплуатирующей. Вторая — кто назначает ответственных ИТР: без них ПС не допускают (п. 251 «б», перечень оснований — на странице <Link href="/obekty/kogda-kran-ne-dopuskayut-v-rabotu-po-p-251/">про п. 251</Link>). Третья и четвёртая — чьи удостоверения у оператора и кто отвечает за схему строповки. Для объектов в порту и промзонах, где у заказчика собственный ОПО, этот вопрос возникает первым; такой вывод KRANNEVA основан на структуре норм, а не на данных реестра.
        </p>

        <p>
          Ставка KRANNEVA по смене: класс {light.cls} —{" "}
          {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))}, класс {mid.cls} —{" "}
          {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
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
        date={FACT_CHECK_W231}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 142, 146, 147, 251 «б» (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает п. 142, 146, 147 и 251 «б» ФНП № 461. Содержание постановлений Правительства № 1371 и № 263 не сверялось и не пересказывается; их актуальность нужно проверять отдельно. Распределение ролей при аренде — практика и вывод KRANNEVA, юридической консультацией не является. Региональные данные по Петербургу не приводятся: проверенный источник не найден."
      />
    </main>
  );
}
