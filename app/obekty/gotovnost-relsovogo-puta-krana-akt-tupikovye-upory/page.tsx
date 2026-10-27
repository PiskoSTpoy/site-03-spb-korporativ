import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W224, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 224. Сто третий тип объекта — готовность рельсового пути крана: акт сдачи-приёмки, расчёт пути, тупиковые упоры, стоянка (ФНП № 461, п. 198, 200, 203–205).
  Фактура — в комментарии к FACT_CHECK_W223–225 в app/site-data.ts.
*/

const title = "Готовность рельсового пути крана: акт, упоры, расчёт";
const description =
  "Готовность рельсового пути подтверждают актом сдачи-приёмки с планово-высотной съёмкой (п. 203 ФНП). Два тупиковых упора на нить, расчёт пути при замене крана.";
const h1 = "Что должно быть у рельсового пути крана до начала работ: акт, расчёт и упоры?";
const canonical = "/obekty/gotovnost-relsovogo-puta-krana-akt-tupikovye-upory/";
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
  { id: "akt", label: "Что подтверждает акт сдачи-приёмки" },
  { id: "raschet", label: "Когда нужен расчёт пути" },
  { id: "upory", label: "Тупиковые упоры и кабель" },
  { id: "stoyanka", label: "Стоянка нерабочего крана" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Чем подтверждают готовность рельсового пути к эксплуатации?",
    a: "Актом сдачи-приёмки с прилагаемыми результатами планово-высотной съёмки (п. 203 ФНП № 461). Акт нужен и после ремонта или реконструкции пути. Допустимые отклонения от проектного положения даны в приложении № 5, нормы браковки рельсов и шпал — в приложении № 3.",
  },
  {
    q: "Нужен ли расчёт пути, если поставили второй кран?",
    a: "Да. Если на действующий путь ставят дополнительное подъёмное сооружение или заменяют прежнее на более грузоподъёмное, более тяжёлое либо с более высокой группой классификации, выполняют расчёт пути, а для надземного — и подкрановых конструкций. Расчёт прикладывают к паспорту ПС (п. 198).",
  },
  {
    q: "Сколько тупиковых упоров ставят на путь?",
    a: "По два на каждую рельсовую нить (п. 200). Крепить упор к рельсу сваркой нельзя, а амортизатор упора должен быть соосен с буфером крана.",
  },
  {
    q: "Нужна ли стоянка для крана в нерабочем состоянии?",
    a: "Да, на каждом рельсовом пути выделяют участок для стоянки подъёмного сооружения в нерабочем состоянии (п. 204). Для штормового ветра этот пункт читают вместе с требованиями к крану в нерабочем состоянии.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Устройство и ремонт рельсового пути в ставку не входят.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Готовность рельсового пути крана", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором на площадке с краном на рельсовом пути: сверка документов на путь до начала совместных работ",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Готовность рельсового пути крана</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Площадка с рельсовым краном · документы на путь</span>
          <h1>{h1}</h1>
          <p>
            Готовность рельсового пути к эксплуатации подтверждается актом сдачи-приёмки с результатами планово-высотной съёмки (п. 203 ФНП № 461), а при установке дополнительного или более мощного крана к паспорту прикладывают расчёт пути (п. 198). KRANNEVA подаёт автокраны на площадки с башенными и козловыми кранами и перед совместной сменой просит у заказчика копию акта и сведения о стоянке нерабочего крана.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W224} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Требования к рельсовому пути до начала эксплуатации (ФНП № 461, п. 198, 200, 203–204)</caption>
            <thead>
              <tr>
                <th scope="col">Что проверяют</th>
                <th scope="col">Что требует норма</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Готовность пути</th><td>акт сдачи-приёмки с планово-высотной съёмкой; допуски по приложению № 5</td><td>203</td></tr>
              <tr><th scope="row">Дефекты рельсов и шпал</th><td>не выше норм браковки, приложение № 3</td><td>203</td></tr>
              <tr><th scope="row">Новый или более мощный кран</th><td>расчёт пути (и подкрановых конструкций) в паспорте ПС</td><td>198</td></tr>
              <tr><th scope="row">Тупиковые упоры</th><td>по два на нить, без крепления сваркой, амортизатор соосен с буфером</td><td>200</td></tr>
              <tr><th scope="row">Кабель питания</th><td>основание на уровне верха полушпал или лоток вдоль пути</td><td>200</td></tr>
              <tr><th scope="row">Стоянка нерабочего крана</th><td>выделенный участок на каждом пути</td><td>204</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA на площадку с краном на рельсовом пути</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/zoomlion-quy50/">Zoomlion QUY50</Link></td></tr>
              <tr><th scope="row">Что уточняют до выезда</th><td>акт сдачи-приёмки пути, дата последней проверки, место стоянки нерабочего крана</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="akt">Что подтверждает акт сдачи-приёмки</h2>
        <p>
          Пункт 203 ФНП № 461 требует подтверждать готовность рельсового пути к эксплуатации актом сдачи-приёмки, причём и после ремонта или реконструкции. К акту прилагаются результаты планово-высотной съёмки. Предельные отклонения пути от проектного положения даны в приложении № 5, а нормы браковки рельсов и шпал — в приложении № 3. KRANNEVA сверяет с этим пунктом дату акта и наличие съёмки, но не оценивает геометрию пути: это делает эксплуатирующая организация крана.
        </p>

        <h2 id="raschet">Когда нужен расчёт пути</h2>
        <p>
          Расчёт пути по п. 198 требуется в трёх случаях: на действующий путь ставят дополнительное подъёмное сооружение, кран заменяют на более грузоподъёмный, либо на более тяжёлый, либо на кран с более высокой группой классификации. Для надземного пути считают и подкрановые строительные конструкции, а расчёт прикладывают к паспорту ПС. Норма не называет допустимую нагрузку числом, и KRANNEVA таких чисел не придумывает. Пересекающаяся тема — <Link href="/obekty/vneocherednaya-proverka-relsovogo-puta-krana-posle-livnya/">внеочередная проверка пути после ливня</Link>.
        </p>

        <h2 id="upory">Тупиковые упоры и кабель</h2>
        <p>
          На каждой рельсовой нити должно стоять по два тупиковых упора, ограничивающих рабочую зону крана (п. 200). Упор нельзя крепить к рельсу сваркой, а его амортизатор должен быть соосен с буфером крана. Рельсы закрепляют так, чтобы исключить поперечное и продольное смещение, кроме упругих деформаций под нагрузкой. Для крана с кабельным барабаном основание пути планируют на уровне верха полушпал или ставят лоток, а без барабана лоток вдоль пути обязателен. Для нашей смены вывод простой: KRANNEVA не подводит автокран в зону упоров и кабельного лотка без отметок заказчика.
        </p>

        <h2 id="stoyanka">Стоянка нерабочего крана</h2>
        <p>
          Пункт 204 ФНП № 461 требует выделить на каждом рельсовом пути участок для стоянки подъёмного сооружения в нерабочем состоянии. Где именно стоит этот участок, KRANNEVA узнаёт у заказчика до выезда, потому что от этого зависит, где можно ставить <Link href="/park/sany-stc400t/">SANY STC400T</Link> или другой автокран на одной площадке с рельсовым краном. Требования к нерабочему состоянию при шторме описаны на странице про <Link href="/obekty/shtormovoy-veter-i-kran-v-nerabochem-sostoyanii/">штормовой ветер и кран в нерабочем состоянии</Link>.
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
        date={FACT_CHECK_W224}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункты 198, 200, 203–205 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункты 198, 200 и 203–205 ФНП № 461. Допуски приложения № 5 и нормы браковки приложения № 3 мы не приводим. Запрос акта и места стоянки нерабочего крана у заказчика — практика компании, а не норма."
      />
    </main>
  );
}
