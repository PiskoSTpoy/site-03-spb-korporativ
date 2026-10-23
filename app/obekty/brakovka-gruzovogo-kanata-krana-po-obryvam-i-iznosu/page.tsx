import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W214, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 214. Девяносто третий тип объекта — браковка грузового каната по обрывам проволок, износу и деформациям (ФНП № 461, п. 270, таблицы 1–2).
  Фактура — в комментарии к FACT_CHECK_W214–216 в app/site-data.ts.
*/

const title = "Браковка грузового каната крана: обрывы и износ";
const description =
  "ФНП № 461 (п. 270): канат бракуют по обрывам на 6d и 30d, диаметру ниже номинала на 7 %, оборванной пряди, волнистости и потере сечения 17,5 %.";
const h1 = "Когда бракуют грузовой канат крана по обрывам проволок и износу (п. 270)?";
const canonical = "/obekty/brakovka-gruzovogo-kanata-krana-po-obryvam-i-iznosu/";
const published = "2026-10-23";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "obryvy", label: "Обрывы проволок: таблица 1" },
  { id: "diametr", label: "Диаметр, сердечник и пряди" },
  { id: "iznos", label: "Износ и коррозия: таблица 2" },
  { id: "deformatsii", label: "Волнистость и деформации" },
  { id: "pered-podachey", label: "Что просит KRANNEVA до подачи" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Сколько оборванных проволок допускается на грузовом канате?",
    a: "Число зависит от количества несущих проволок N в наружных прядях, типа свивки и группы режима механизма. Для N не более 50, крестовой свивки и группы М1–М4 браковка начинается при 2 обрывах на длине 6d или 4 на длине 30d (таблица 1 к п. 270 ФНП № 461).",
  },
  {
    q: "Бракуют ли канат без единого обрыва?",
    a: "Да. Если диаметр каната из-за износа или коррозии стал меньше номинального на 7 % и более, канат бракуют даже при отсутствии видимых обрывов. То же при оборванной пряди и при потере сечения 17,5 % и более по дефектоскопу.",
  },
  {
    q: "Что меняется, если проволоки изношены?",
    a: "Допустимое число обрывов уменьшается по таблице 2: при износе проволок на 10 % действует 85 % от нормы, на 20 % — 70 %, на 30 % и более — 50 %. При износе наружных проволок на 40 % канат бракуют независимо от числа обрывов.",
  },
  {
    q: "Одинаковы ли нормы для крана с грузом и для крана с люлькой?",
    a: "Нет. Канаты кранов, предназначенных или используемых для подъёма людей, а также расплавленного металла, огнеопасных и ядовитых грузов, бракуют при вдвое меньшем числе обрывов проволок.",
  },
  {
    q: "Когда обязательна дефектоскопия каната?",
    a: "Для канатов подъёмных сооружений, транспортирующих опасные грузы, предназначенных или используемых для подъёма людей, а также работающих с блоками из синтетического материала или металла с синтетической футеровкой. При потере металлического сечения 17,5 % и более канат бракуют.",
  },
  {
    q: "Сколько стоит смена автокрана KRANNEVA?",
    a: `Ставка почасовая: ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Осмотр каната крана входит в подготовку техники до выезда.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Браковка грузового каната", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана с оператором с осмотром грузового каната по нормам браковки",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Браковка грузового каната</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Как проверить · грузовой канат</span>
          <h1>{h1}</h1>
          <p>
            Грузовой канат крана по пункту 270 ФНП № 461 бракуют по числу оборванных проволок на длине 6d и 30d, где d — диаметр каната: для канатов с 51–75 несущими проволоками в наружных прядях и группой режима М1–М4 это 3 и 6 обрывов при крестовой свивке. Но и без обрывов канат уходит в брак, если его диаметр от износа или коррозии стал меньше номинального на 7 %. KRANNEVA просит журнал осмотра каната до подачи SANY STC400T.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W214} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Признаки браковки грузового каната по п. 270 ФНП № 461</caption>
            <thead>
              <tr>
                <th scope="col">Признак</th>
                <th scope="col">Порог браковки</th>
                <th scope="col">Нужен ли подсчёт обрывов</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Обрывы наружных проволок</th><td>по таблице 1 на длине 6d и 30d</td><td>да</td></tr>
              <tr><th scope="row">Уменьшение диаметра (износ, коррозия)</th><td>7 % и более от номинала</td><td>нет</td></tr>
              <tr><th scope="row">Повреждение сердечника</th><td>3 % (некрутящиеся) или 10 % (прочие) от номинала</td><td>нет</td></tr>
              <tr><th scope="row">Износ или коррозия наружных проволок</th><td>40 % и более от первоначального диаметра</td><td>нет</td></tr>
              <tr><th scope="row">Потеря сечения по дефектоскопу</th><td>17,5 % и более</td><td>нет</td></tr>
              <tr><th scope="row">Оборванная прядь</th><td>одна и более</td><td>нет</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация: подача автокрана KRANNEVA с проверенным канатом</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/kato-nk-250e-v/">Kato NK-250E-V</Link></td></tr>
              <tr><th scope="row">Что запрашивают до выезда</th><td>запись последнего осмотра каната в журнале, данные о замене</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов на объекте</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="obryvy">Обрывы проволок: таблица 1</h2>
        <p>
          Число допустимых обрывов проволок в таблице 1 к пункту 270 ФНП № 461 растёт вместе с числом несущих проволок N в наружных прядях каната. Для канатов с N до 50, группой режима М1–М4 и крестовой свивкой порог равен 2 обрывам на 6d и 4 на 30d; при N от 51 до 75 — 3 и 6; от 76 до 100 — 4 и 8; от 101 до 120 — 5 и 10. Для групп М5–М8 пороги примерно вдвое выше (для N от 101 до 120 — 10 и 19), а для односторонней свивки — свои значения. Сколько проволок в канате SANY STC400T, сообщает паспорт каната, а не оператор на глаз, поэтому KRANNEVA берёт это число из документа.
        </p>
        <p>
          Считают обрывы по правилу рисунка 4: проволока с одним найденным концом, с двумя концами или с двукратным нарушением целостности даёт один обрыв. Для каната диаметром 20 мм участок 6d — это 120 мм, участок 30d — 600 мм. Для канатов кранов, поднимающих людей, пороги вдвое меньше, поэтому KRANNEVA проверяет канат под люльку строже, чем канат под груз.
        </p>

        <h2 id="diametr">Диаметр, сердечник и пряди</h2>
        <p>
          Уменьшение диаметра каната от поверхностного износа или коррозии на 7 % и более от номинала пункт 270 ФНП № 461 считает браком даже без единого видимого обрыва. Для 20-миллиметрового каната это 1,4 мм по штангенциркулю. Повреждение сердечника — обмятие, внутренний износ, разрыв — допускает меньше: 3 % для некрутящихся канатов и 10 % для остальных. Оборванная прядь бракует канат сразу, без подсчёта, и KRANNEVA не выводит такую машину на объект. Эти три признака проверяются измерением, а не на глаз, поэтому запись об осмотре каната Kato NK-250E-V должна содержать измеренный диаметр.
        </p>

        <h2 id="iznos">Износ и коррозия: таблица 2</h2>
        <p>
          Износ или коррозия проволок снижают допустимое число обрывов по таблице 2 пункта 270 ФНП № 461. При уменьшении диаметра проволок на 10 % действует 85 % от нормы таблицы 1, на 15 % — 75 %, на 20 % — 70 %, на 25 % — 60 %, на 30 % и более — 50 %. Если наружные проволоки износились на 40 % и более, канат бракуют, сколько бы обрывов ни нашли. Пример для KRANNEVA: порог 6 обрывов при износе проволок на 20 % превращается в 6 × 0,7 = 4,2, то есть браковка наступает уже на пятом обрыве. О связи влажного климата Петербурга с осмотром узлов крана — на странице о <Link href="/obekty/korroziya-i-vlazhnyy-klimat-pri-osmotre-krana/">коррозии при осмотре крана</Link>.
        </p>

        <h2 id="deformatsii">Волнистость и деформации</h2>
        <p>
          Волнистость каната пункт 270 ФНП № 461 оценивает диаметром спирали волнистости dв и номинальным диаметром dк на отрезке не длиннее 25dк. Если направления и шаги спирали волнистости и свивки совпадают, канат бракуют при dв больше 1,08dк; если не совпадают — при dв, равном 4/3dк и больше. Кроме того, критериями служат корзинообразность, выдавливание проволок и прядей, залом, перегиб и повреждение от нагрева или электрической дуги. Внутренний износ видит только дефектоскопия: при потере металлического сечения 17,5 % и более канат Liebherr LTM 1090-4.1, как и любой другой, подлежит браковке.
        </p>

        <h2 id="pered-podachey">Что просит KRANNEVA до подачи</h2>
        <p>
          Просьба KRANNEVA заказчику короткая: прислать до выезда запись последнего осмотра каната и дату его замены, если канат менялся. Это толкование компании, а не требование пункта 270: норма определяет критерии браковки, а не состав переписки при аренде. О том, как меняют канат перед подачей, написано на странице <Link href="/obekty/zamena-kanata-na-krane-pered-podachey/">о замене каната</Link>, а об оценке остальных узлов — на странице <Link href="/obekty/ocenka-uzlov-krana-po-ru-ili-po-fnp/">об оценке узлов по РЭ или ФНП</Link>.
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
        date={FACT_CHECK_W214}
        items={[
          { href: "https://legalacts.ru/doc/prikaz-rostekhnadzora-ot-26112020-n-461-ob-utverzhdenii-federalnykh/", label: "Приказ Ростехнадзора от 26.11.2020 № 461 «Правила безопасности опасных производственных объектов, на которых используются подъёмные сооружения» — пункт 270, таблицы 1 и 2, рисунки 4–8 (редакция от 16.04.2026)" },
        ]}
        note="Страница пересказывает пункт 270 ФНП № 461; значения таблицы 1 приведены только для четырёх диапазонов N при крестовой свивке и группе М1–М4, остальные берут из таблицы пункта. Расчёт на 20-миллиметровом канате — арифметика по формуле пункта, а не паспорт каната конкретной машины; просьба прислать журнал осмотра — практика KRANNEVA, а не норма."
      />
    </main>
  );
}
