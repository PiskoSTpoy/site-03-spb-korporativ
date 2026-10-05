import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W177, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 177. Пятьдесят шестой тип — порядок подъёма груза на площадке.
  Угол информационный / how-to: что происходит между строповкой и посадкой груза.

  Разграничена с veter-i-gololed (там п. 132 про погоду), vplotnuyu-k-sosednemu-zdaniyu
  (там п. 129 в контексте соседней стены) и dva-krana-na-odnoy-ploshchadke (там
  п. 127 про два крана). Здесь — сквозной порядок по п. 114 ФНП № 461 и то,
  что заказчик должен приготовить до начала смены.

  Фактура — в комментарии к FACT_CHECK_W177 в app/site-data.ts.
*/

const title = "Как проходит подъём груза краном: пауза на 0,3 м и строповка";
const description =
  "Пункт 114 ФНП № 461: подъём начинают с 0,2–0,3 м и паузы на проверку строповки. Что заказчик готовит до выезда крана KRANNEVA.";
const h1 = "Как проходит подъём груза краном и в каком случае его нельзя начинать?";
const canonical = "/obekty/poryadok-podema-gruza/";
const published = "2026-10-05";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "pervyy-metr", label: "Что происходит с грузом в первые 0,3 метра" },
  { id: "lyudi", label: "Где в это время стоят люди" },
  { id: "neizvestnyy-ves", label: "Когда подъём начинать нельзя" },
  { id: "marshrut", label: "Как груз идёт по площадке и садится" },
  { id: "zayavka", label: "Что заказчик готовит до выезда" },
  { id: "raschet", label: "Сколько стоит смена" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "Почему груз сначала поднимают всего на 20–30 сантиметров?",
    a: "Пункт 114 ФНП № 461 требует начинать подъём с высоты не более 0,2–0,3 м и остановиться, чтобы проверить правильность строповки и действие тормоза. Если строп пошёл не так, груз упадёт на землю, а не с высоты.",
  },
  {
    q: "Можно ли подъезжать краном к грузу, масса которого неизвестна?",
    a: "Нет. Пункт 114 прямо запрещает подъём груза, масса которого неизвестна. KRANNEVA поэтому просит в заявке массу и вид груза и не начинает подъём, пока числа нет.",
  },
  {
    q: "Может ли стропальщик стоять рядом с поднятым грузом?",
    a: "Только пока груз поднят не выше 1 м от уровня площадки. Любое перемещение груза над людьми запрещено, поэтому при подъёме выше метра стропальщик отходит.",
  },
  {
    q: "Что делать, если на грузе нет маркировки веса и схемы строповки?",
    a: "По пункту 127 ФНП № 461 такая работа идёт только под непосредственным руководством инженерно-технического работника, ответственного за безопасное производство работ с применением ПС. Без него подъём не начинается.",
  },
  {
    q: "Кто останавливает работу, если оператору не видно сигналов?",
    a: "Критерий — то, что видит оператор. Пункт 132 требует прекращать работу, когда крановщик плохо различает сигналы стропальщика или перемещаемый груз — туман, снегопад и дождь названы в нём прямо.",
  },
  {
    q: "Сколько стоит смена крана для подъёма груза?",
    a: `Класс ${light.cls} — ${rub(shiftTotal(light.rate))} за смену от ${MIN_SHIFT_HOURS} часов, класс ${mid.cls} — ${rub(shiftTotal(mid.rate))} без НДС. Ставка относится к машине с оператором; кто выполняет строповку, определяет договор.`,
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "Порядок подъёма груза", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для подъёма и перемещения грузов на площадке",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>Порядок подъёма груза</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · порядок подъёма</span>
          <h1>{h1}</h1>
          <p>
            Пункт 114 ФНП № 461 требует начинать любой подъём с высоты 0,2–0,3 м и остановиться
            для проверки строповки и тормоза, а груз неизвестной массы поднимать запрещено, и
            поэтому KRANNEVA просит массу и вид груза в заявке, до выезда машины. Остальные
            правила порядка — где стоит стропальщик, на какой высоте груз идёт над предметами
            и на что он садится — разобраны ниже по пунктам норматива.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W177} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Порядок подъёма груза по ФНП № 461: шаги и требования</caption>
            <thead>
              <tr>
                <th scope="col">Шаг</th>
                <th scope="col">Требование</th>
                <th scope="col">Пункт</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Начало подъёма</th><td>высота не более 0,2–0,3 м, остановка, проверка строповки и тормоза</td><td>114</td></tr>
              <tr><th scope="row">Стропальщик у груза</th><td>допускается, пока груз поднят не выше 1 м от площадки</td><td>114</td></tr>
              <tr><th scope="row">Масса неизвестна</th><td>подъём запрещён</td><td>114</td></tr>
              <tr><th scope="row">Движение над предметами</th><td>горизонтальный перенос на 0,5 м выше встречающихся предметов</td><td>114</td></tr>
              <tr><th scope="row">Нет маркировки веса и схемы строповки</th><td>работа под непосредственным руководством ответственного инженерно-технического работника</td><td>127</td></tr>
              <tr><th scope="row">Люди рядом со стеной</th><td>между грузом и стеной, колонной, штабелем людей не должно быть, включая стропальщика</td><td>129</td></tr>
              <tr><th scope="row">Сигналы не видны</th><td>работу прекращают</td><td>132</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники для подъёма груза</caption>
            <tbody>
              <tr><th scope="row">Класс техники</th><td>{light.cls}–{mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что нужно знать до выезда</th><td>массу и вид груза, место посадки, схему строповки, число стропальщиков</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), {rub(mid.rate)} ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="pervyy-metr">Что происходит с грузом в первые 0,3 метра</h2>
        <p>
          Пункт 114 ФНП № 461 начинает порядок подъёма с остановки: груз отрывают от земли на
          0,2–0,3 м и держат, пока проверяют строповку и тормоз. Автокран SANY STC400T или XCMG
          QY60K в эту паузу не движется, а стропальщик смотрит на узлы и крюк. Смысл паузы в
          цене ошибки: груз, сорвавшийся с 30 сантиметров, падает на землю, а не на людей и
          технику.
        </p>
        <p>
          KRANNEVA закладывает эту паузу в расчёт смены как обычную операцию, а не как
          исключение. Для заказчика она значит одно: торопить оператора с «давайте сразу вверх»
          нельзя, и ни один пункт ФНП этого не допускает.
        </p>

        <h2 id="lyudi">Где в это время стоят люди</h2>
        <p>
          Перемещать груз над людьми запрещает тот же пункт 114, а стропальщику разрешает
          находиться рядом с грузом только пока тот поднят не выше 1 м от уровня площадки.
          Выше метра стропальщик отходит и подаёт сигналы с безопасного места. KRANNEVA
          ставит эту границу в схему подачи до начала смены, а не объясняет на месте.
        </p>
        <p>
          Если кран стоит у стены, колонны или штабеля, действует пункт 129: между грузом и
          такой конструкцией не должно быть людей, в том числе стропальщика. На площадке
          вплотную к соседнему зданию это правило определяет, где вообще можно встать; подробно
          случай описан на странице <Link href="/obekty/vplotnuyu-k-sosednemu-zdaniyu/">работы вплотную к
          соседнему зданию</Link>.
        </p>

        <h2 id="neizvestnyy-ves">Когда подъём начинать нельзя</h2>
        <p>
          Груз, масса которого неизвестна, поднимать запрещено — это прямой запрет пункта 114.
          KRANNEVA не берёт эту величину «на глаз» и не рассчитывает её по объёму: без паспортной
          массы или маркировки подъём не начинается. Заявка с вопросом «поднимете то, что
          привезут?» получает встречный вопрос о массе.
        </p>
        <p>
          Если массу маркируют, но схемы строповки нет, действует пункт 127: такая работа идёт
          только под непосредственным руководством инженерно-технического работника,
          ответственного за безопасное производство работ с применением ПС. Работа без этого
          работника не начинается. Когда сигналов стропальщика не видно из-за тумана, дождя или
          снегопада, пункт 132 обязывает остановить работу; этот случай разобран на странице{" "}
          <Link href="/obekty/veter-i-gololed/">ветра и гололёда</Link>.
        </p>

        <h2 id="marshrut">Как груз идёт по площадке и садится</h2>
        <p>
          Горизонтальное перемещение, по пункту 114, идёт на 0,5 м выше встречающихся на
          пути предметов, а опускают груз только на место, где он не упадёт, не опрокинется и
          не сползёт. Для извлечения стропов из-под груза его ставят на подкладки нужной
          прочности и толщины. SANY STC400T в KRANNEVA ходит с этим порядком на любой площадке
          одинаково.
        </p>
        <p>
          Мелкоштучные грузы — например, кирпич или плитку — переносят только в специальной
          таре: пункт 114 требует исключить выпадение частей груза. Правило про кирпич на поддонах
          без ограждения сделано исключением только для погрузки и разгрузки транспорта на землю.
        </p>

        <h2 id="zayavka">Что заказчик готовит до выезда</h2>
        <p>
          Заказчик называет KRANNEVA массу и вид груза, место посадки и подъезд к нему, а также
          сообщает, есть ли маркировка и схема строповки. Если груз привозят в день работ,
          масса указывается по накладной или паспорту, а не по оценке водителя. XCMG QY60K выезжает
          под подтверждённую величину.
        </p>
        <p>
          Отдельные случаи подъёма двумя машинами разобраны на странице{" "}
          <Link href="/obekty/dva-krana-na-odnoy-ploshchadke/">двух кранов на одной площадке</Link>:
          для них пункт 127 требует проект производства работ или технологическую карту.
        </p>

        <h2 id="raschet">Сколько стоит смена</h2>
        <p>
          Ставка KRANNEVA: класс {light.cls} — {rub(light.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(light.rate))}, класс {mid.cls} — {rub(mid.rate)} × {MIN_SHIFT_HOURS} ={" "}
          {rub(shiftTotal(mid.rate))} без НДС. Отдельной строки «за паузу на проверку строповки»
          в прайсе нет: эта операция входит в обычное рабочее время машины.
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
        date={FACT_CHECK_W177}
        items={[
          { href: "https://sudact.ru/law/prikaz-rostekhnadzora-ot-26112020-n-461-ob/federalnye-normy-i-pravila-v/vi/ustanovka-ps-i-proizvodstvo-rabot/", label: "приказ Ростехнадзора от 26.11.2020 № 461, ФНП, раздел VI «Установка ПС и производство работ» — пункты 114, 127, 129, 132" },
        ]}
        note="Страница пересказывает пункты 114, 127, 129 и 132 ФНП № 461 и не заменяет проект производства работ, технологическую карту и инструкции эксплуатирующей организации. Массы конкретных грузов и схемы строповки страница не называет — они задаются проектом и паспортом груза. Кто именно из работников заказчика или подрядчика выполняет строповку, определяет договор и приказ эксплуатирующей организации."
      />
    </main>
  );
}
