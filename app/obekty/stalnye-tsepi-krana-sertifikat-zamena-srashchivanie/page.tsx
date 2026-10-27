import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W223, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 223. Сто второй тип объекта — стальные цепи подъёмного сооружения: сертификат, замена, сращивание (ФНП № 461, п. 195–197).
  Фактура — в комментарии к FACT_CHECK_W223–225 в app/site-data.ts.
*/

const title = "Стальные цепи крана: сертификат, замена, сращивание";
const description =
  "Цепь на подъёмном сооружении должна быть сертифицирована и совпадать с паспортом по марке и разрывному усилию (п. 195 ФНП). Запас прочности 3, 5, 6 и 8.";
const h1 = "Какие требования ФНП предъявляют к стальным цепям крана при замене и сращивании?";
const canonical = "/obekty/stalnye-tsepi-krana-sertifikat-zamena-srashchivanie/";
const published = "2026-10-27";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "sertifikat", label: "Что требуется от самой цепи" },
  { id: "zapas", label: "Какой запас прочности нужен при замене" },
  { id: "srashchivanie", label: "Как цепь сращивают и испытывают" },
  { id: "brakovka", label: "Когда цепь бракуют" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Можно ли поставить на кран цепь без сертификата?",
    a: "Нет. Пункт 195 ФНП № 461 прямо запрещает использовать несертифицированные стальные цепи, а марка и разрывное усилие должны совпадать со значениями из паспорта подъёмного сооружения.",
  },
  {
    q: "Допускаются ли цепи иностранного производства?",
    a: "Допускаются, если цепь подходит по назначению к технологии использования крана, диаметр и шаг равны диаметру и шагу заменяемой цепи, а разрывное усилие не ниже указанного в паспорте для заменяемой цепи (п. 195).",
  },
  {
    q: "Чем сращивают цепь и как проверяют результат?",
    a: "Электросваркой новых вставленных звеньев либо специальными соединительными звеньями (п. 196). После сращивания цепь испытывают нагрузкой в 1,25 раза выше расчётного натяжения в течение 10 минут.",
  },
  {
    q: "По каким нормам бракуют цепь в эксплуатации?",
    a: "Пункт 197 ФНП № 461 отсылает к п. 272, где собраны нормы браковки стропов, включая цепные. Критерии износа звена в этой статье не пересказываются: они приведены на странице про браковку стропов.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Замена и испытание цепей в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Стальные цепи крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором для работ, где заказчик проверяет сертификаты цепей и документы на грузозахватные приспособления",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Стальные цепи крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Документы на технику · стальные цепи</span>
          <h1>{h1}</h1>
          <p>
            Стальная цепь, установленная на подъёмное сооружение, обязана быть сертифицирована и совпадать с паспортом по марке и разрывному усилию, а запас прочности при замене составляет от 3 до 8 в зависимости от типа цепи и группы механизма (п. 195 ФНП № 461). KRANNEVA не заменяет цепи на машинах заказчика, но при совместной работе просит показать паспорт и сертификат цепи, если она входит в грузозахватную оснастку.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W223} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Запас прочности цепи по отношению к разрушающей нагрузке при замене (ФНП № 461, п. 195)</caption>
            <thead>
              <tr>
                <th scope="col">Тип цепи</th>
                <th scope="col">Группа механизма</th>
                <th scope="col">Запас не менее</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Пластинчатая, в механизмах ПС</th><td>M1–M2</td><td className="dtable__num">3</td></tr>
              <tr><th scope="row">Пластинчатая, в механизмах ПС</th><td>остальные группы</td><td className="dtable__num">5</td></tr>
              <tr><th scope="row">Сварная грузовая, механизм подъёма</th><td>M1–M2</td><td className="dtable__num">3</td></tr>
              <tr><th scope="row">Сварная грузовая на гладком барабане</th><td>остальные группы</td><td className="dtable__num">6</td></tr>
              <tr><th scope="row">Грузовая калиброванная на звёздочке</th><td>остальные группы</td><td className="dtable__num">8</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA, когда в оснастке есть цепи</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>есть ли цепные стропы или цепные органы в оснастке заказчика, сертификат и паспорт цепи</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="sertifikat">Что требуется от самой цепи</h2>
        <p>
          Пункт 195 ФНП № 461 ставит два условия: стальная цепь сертифицирована, а её марка и разрывное усилие соответствуют значениям из паспорта подъёмного сооружения. Несертифицированные цепи к использованию не допускаются. Для импортной цепи норма добавляет три проверки: назначение подходит к технологии крана, диаметр и шаг равны диаметру и шагу заменяемой цепи, разрывное усилие не ниже паспортного. KRANNEVA читает эти условия как перечень вопросов к документам, а не как оценку состояния цепи на глаз.
        </p>

        <h2 id="zapas">Какой запас прочности нужен при замене</h2>
        <p>
          ФНП № 461 задаёт запас прочности как отношение к разрушающей нагрузке и делит цепи по типу и группе классификации механизма. Для пластинчатых цепей он не менее 3 при M1–M2 и не менее 5 в остальных группах. Для сварных грузовых цепей подъёма он не менее 3 при M1–M2, не менее 6 на гладком барабане и не менее 8 для калиброванных цепей на звёздочке. Если группа механизма в паспорте не указана, её определяют по приложению № 4 к ФНП.
        </p>
        <p>
          Условный пример для прикидки, а не для расчёта: при рабочем натяжении ветви 20 кН калиброванная цепь на звёздочке должна иметь разрушающую нагрузку не менее 20 × 8 = 160 кН, а сварная цепь на гладком барабане — не менее 20 × 6 = 120 кН. Реальный расчёт делает эксплуатирующая организация по паспорту конкретной машины.
        </p>

        <h2 id="srashchivanie">Как цепь сращивают и испытывают</h2>
        <p>
          Пункт 196 допускает два способа сращивания цепи: электросваркой новых вставленных звеньев и с помощью специальных соединительных звеньев. После сращивания цепь испытывают нагрузкой в 1,25 раза выше её расчётного натяжения в течение 10 минут. Для KRANNEVA важна не сама сварка, а то, что результат испытания должен быть зафиксирован документально, если сращённая цепь входит в оснастку на площадке. Родственная тема — <Link href="/obekty/ispytaniya-gruzozahvatnyh-prisposobleniy-traversa-strop-greyfer/">испытания строп, траверс и грейферов</Link>.
        </p>

        <h2 id="brakovka">Когда цепь бракуют</h2>
        <p>
          Браковку стальных цепей в эксплуатации ФНП № 461 отдаёт на п. 272 (п. 197). Критерии износа звена KRANNEVA здесь не воспроизводит, чтобы не дублировать страницу про <Link href="/obekty/brakovka-stropov-kanatnyy-tsepnoy-ili-tekstilnyy/">браковку стропов — канатных, цепных и текстильных</Link>. Для тросовой части крана действует отдельная страница про <Link href="/obekty/brakovka-gruzovogo-kanata-krana-po-obryvam-i-iznosu/">браковку грузового каната</Link>.
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
        date={FACT_CHECK_W223}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 195–197 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 195–197 ФНП № 461. Критерии браковки звена по п. 272 мы не приводим. Числовой пример запаса прочности — иллюстрация арифметики по формуле «натяжение × запас», а не расчёт для конкретной машины. Запрос паспорта и сертификата цепи у заказчика — практика компании, а не норма."
      />
    </main>
  );
}
