import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import Sources from "../../components/Sources";
import ArticleHead, { articleLd } from "../../components/ArticleHead";
import { OG_IMAGE, SITE, FACT_CHECK_W158, MIN_SHIFT_HOURS, PRICE, rub, shiftTotal } from "../../site-data";

/*
  Волна 158. Тридцать седьмой тип объекта — открытая площадка у Финского
  залива зимой. Угол практический, СПб-специфика: климат побережья по
  строке «Санкт-Петербург» СП 131.13330.2020 и условия остановки крана по
  п. 132 ФНП № 461. Скелет статьи seo-2026-playbook.

  Фактура и источники — в комментарии к FACT_CHECK_W158 в app/site-data.ts.
  Паспортные пределы ветра и температуры конкретных машин не печатаем: они
  разные у каждой модели и берутся из паспорта машины, которая едет на объект.
  Общий ориентир по ветру уже есть на /faq/ — здесь его не повторяем.
  Ветровой район по СП 20.13330 не приводим: источники расходятся.
*/

const title = "Автокран зимой у Финского залива: спецификация";
const description =
  "Кран зимой на побережье Петербурга: ветер с залива (ЮЗ, З по СП 131.13330.2020), остановка по паспорту крана (п. 132 ФНП № 461), примёрзший груз.";
const h1 = "Можно ли работать автокраном зимой на берегу Финского залива?";
const canonical = "/obekty/poberezhe-finskogo-zaliva-zimoy/";
const published = "2026-09-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: [OG_IMAGE] },
};

const light = PRICE[0];
const mid = PRICE[1];

const toc = [
  { id: "klimat", label: "Какая зима на побережье по СП 131.13330.2020" },
  { id: "ostanovka", label: "Когда кран обязан остановиться" },
  { id: "primerzshiy", label: "Примёрзший груз и пробный подъём" },
  { id: "konets-smeny", label: "Кран в конце смены и перед штормом" },
  { id: "faq", label: "Частые вопросы" },
  { id: "sources-heading", label: "Источники" },
];

const faqs = [
  {
    q: "При каком ветре автокран прекращает работу?",
    a: "При скорости ветра выше предельной, указанной в паспорте конкретного крана, — так формулирует п. 132 ФНП № 461. Единого числа для всех машин нет. KRANNEVA сверяет прогноз на смену с паспортом машины, которая едет на объект.",
  },
  {
    q: "Работает ли автокран в мороз?",
    a: "Работает до температуры, указанной в паспорте машины: ниже неё п. 132 ФНП № 461 требует остановить работу. Для Петербурга СП 131.13330.2020 даёт абсолютный минимум −36 °C и холодную пятидневку −24 °C. KRANNEVA проверяет паспортный предел до выезда.",
  },
  {
    q: "Откуда дует ветер на побережье зимой?",
    a: "По таблице 3.1 СП 131.13330.2020 преобладающее направление ветра в Петербурге с декабря по февраль — юго-западное и западное, то есть со стороны Финского залива. KRANNEVA учитывает это, выбирая сторону установки крана и направление подачи груза.",
  },
  {
    q: "Можно ли поднять краном примёрзший груз?",
    a: "Нет. П. 115 ФНП № 461 запрещает подъём груза, примёрзшего к земле или засыпанного землёй. Груз сначала освобождают, затем экипаж KRANNEVA делает пробный подъём на 0,2–0,3 м по п. 114 и проверяет строповку и тормоз.",
  },
  {
    q: "Что делать, если в снегопад крановщик не видит стропальщика?",
    a: "Остановить работу: п. 132 ФНП № 461 требует этого при снегопаде, дожде и тумане, когда крановщик плохо различает сигналы или груз. Экипаж KRANNEVA возобновляет подъём после того, как видимость восстановилась.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Объекты", item: `${SITE}/obekty/` },
    { "@type": "ListItem", position: 3, name: "У Финского залива зимой", item: `${SITE}${canonical}` },
  ],
};
const serviceLd = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Аренда автокрана для зимних работ на открытых площадках побережья Финского залива",
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
        <Link href="/">Главная</Link><span>/</span><Link href="/obekty/">Объекты</Link><span>/</span><span>У Финского залива зимой</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">Спецификация объекта · зима на побережье</span>
          <h1>{h1}</h1>
          <p>
            Автокран работает на побережье Финского залива и зимой, но останавливается, как только
            ветер или мороз выходят за пределы паспорта машины, а снегопад или туман скрывают сигналы
            стропальщика, — это три условия п. 132 ФНП № 461. По СП 131.13330.2020 зимний ветер в
            Петербурге дует преимущественно с юго-запада и запада, то есть с залива. KRANNEVA
            сверяет прогноз на смену с паспортом SANY STC400T или XCMG QY60K до выезда.
          </p>
          <ArticleHead published={published} checked={FACT_CHECK_W158} toc={toc} />
        </div>
        <PrintButton label="Распечатать спецификацию" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Спецификация подачи техники на открытую площадку побережья зимой</caption>
            <tbody>
              <tr><th scope="row">Типовые задачи</th><td>монтаж и разгрузка на площадках Приморского, Курортного и Петродворцового районов, Кронштадта и намывных территорий; работы на причалах и у берега в межсезонье</td></tr>
              <tr><th scope="row">Класс техники</th><td>{light.cls} и {mid.cls}</td></tr>
              <tr><th scope="row">Машины парка</th><td><Link href="/park/sany-stc400t/">SANY STC400T</Link>, <Link href="/park/xcmg-qy60k/">XCMG QY60K</Link></td></tr>
              <tr><th scope="row">Что ограничивает раньше всего</th><td>ветер и температура относительно паспортных пределов машины, видимость в снегопад и туман (п. 132 ФНП № 461)</td></tr>
              <tr><th scope="row">Документ на работу</th><td>ППР с разделом о работе в зимних условиях и паспорт машины с пределами ветра и температуры</td></tr>
              <tr><th scope="row">Что задаёт срок</th><td>прогноз на день работы и короткий световой день; при штормовом прогнозе смену переносят</td></tr>
              <tr><th scope="row">Минимальная смена</th><td className="dtable__num">{MIN_SHIFT_HOURS} часов</td></tr>
              <tr><th scope="row">Ставка</th><td className="dtable__num">от {rub(light.rate)}/час без НДС ({light.cls}), от {rub(mid.rate)}/час ({mid.cls})</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2 id="klimat">Какая зима на побережье по СП 131.13330.2020</h2>
        <p>
          СП 131.13330.2020 «Строительная климатология» даёт для Петербурга 130 суток в году со
          среднесуточной температурой не выше 0 °C — больше четырёх месяцев, когда кран работает в
          зимних условиях. KRANNEVA сводит в таблицу те параметры строки «Санкт-Петербург», которые
          влияют на работу крана.
        </p>
        <div className="dtable-scroll">
          <table className="dtable">
            <caption>Климат Петербурга по СП 131.13330.2020 и что это значит для крана</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Значение</th>
                <th scope="col">Что проверяет KRANNEVA</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Преобладающий ветер, декабрь–февраль</th><td>ЮЗ, З</td><td>сторону установки крана относительно залива</td></tr>
              <tr><th scope="row">Преобладающий ветер, июнь–август</th><td>З</td><td>то же в тёплый сезон</td></tr>
              <tr><th scope="row">Холодная пятидневка, обеспеченность 0,92</th><td className="dtable__num">−24 °C</td><td>паспортный температурный предел машины</td></tr>
              <tr><th scope="row">Абсолютный минимум</th><td className="dtable__num">−36 °C</td><td>то же, для крайних случаев</td></tr>
              <tr><th scope="row">Осадки, ноябрь–март</th><td className="dtable__num">217 мм</td><td>видимость в снегопад и очистку площадки под опоры</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Средние скорости ветра в СП 131.13330.2020 невелики: максимальная из средних по румбам за
          январь — 3,2 м/с. Для крана KRANNEVA это не повод расслабиться: п. 132 ФНП № 461 сравнивает
          с паспортом фактический ветер на площадке, а климатическая таблица показывает среднее по
          метеостанции, а не порывы на открытом берегу.
        </p>

        <h2 id="ostanovka">Когда кран обязан остановиться</h2>
        <p>
          П. 132 ФНП № 461 перечисляет три причины прекратить работу крана на открытом воздухе, и все
          три на зимнем побережье Петербурга встречаются чаще, чем в застройке центра. KRANNEVA
          проверяет каждую до начала смены и во время работы.
        </p>
        <ol>
          <li>Ветер сильнее предельного, указанного в паспорте крана. У SANY STC400T и XCMG QY60K пределы свои — KRANNEVA берёт их из паспорта машины, которая едет на объект.</li>
          <li>Температура ниже предельной по паспорту. Холодная пятидневка −24 °C по СП 131.13330.2020 — ориентир, с которым KRANNEVA сверяет паспорт зимой.</li>
          <li>Снегопад, дождь или туман, при которых крановщик плохо различает сигналы стропальщика или сам груз.</li>
        </ol>
        <p>
          На открытом берегу груз с большой площадью — стеновая панель, пакет профлиста, лодка на
          стропах — разворачивается ветром раньше, чем кран упирается в свой предел. Экипаж
          KRANNEVA в таких случаях работает с оттяжками, которые п. 115 ФНП № 461 разрешает для
          разворота длинномерных и крупногабаритных грузов.
        </p>

        <h2 id="primerzshiy">Примёрзший груз и пробный подъём</h2>
        <p>
          П. 115 ФНП № 461 запрещает поднимать груз, примёрзший к земле или засыпанный землёй: кран
          не рассчитан на отрыв, и масса груза в этот момент неизвестна. На зимней площадке у залива
          это касается штабелей плит, труб и лодок на стапелях. KRANNEVA просит заказчика освободить
          груз до приезда крана — ломом, прогревом или сколом льда.
        </p>
        <p>
          После освобождения экипаж KRANNEVA делает пробный подъём на высоту 0,2–0,3 м с остановкой —
          так требует п. 114 ФНП № 461 — и проверяет строповку и тормоз. Зимой эта проверка важнее
          обычного: наледь на грузе и стропах меняет трение и поведение груза. Подробности про
          грунты побережья — на странице{" "}
          <Link href="/obekty/namyvnaya-territoriya/">намывная территория</Link>.
        </p>

        <h2 id="konets-smeny">Кран в конце смены и перед штормом</h2>
        <p>
          П. 114 ФНП № 461 требует, чтобы в перерыве и по окончании работ на крюке не оставалось
          груза, а кран был приведён в безопасное нерабочее положение по руководству по
          эксплуатации. Перед штормовым прогнозом KRANNEVA складывает стрелу заранее и не оставляет
          подвешенный груз даже на короткий перерыв.
        </p>
        <p>
          Зимний световой день в Петербурге короткий, и смену на побережье KRANNEVA планирует по
          светлому времени: п. 132 ФНП № 461 останавливает кран, когда крановщик плохо видит груз.
          Смена SANY STC400T — {rub(light.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(light.rate))},
          XCMG QY60K — {rub(mid.rate)} × {MIN_SHIFT_HOURS} = {rub(shiftTotal(mid.rate))} без НДС.
          Районы побережья: <Link href="/geo/primorskiy/">Приморский</Link>,{" "}
          <Link href="/geo/kurortnyy/">Курортный</Link>,{" "}
          <Link href="/geo/petrodvortsovyy/">Петродворцовый</Link>,{" "}
          <Link href="/geo/kronshtadt/">Кронштадт</Link>.
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
        date={FACT_CHECK_W158}
        items={[
          { href: "https://meganorm.ru/mega_doc/norm/pravila/0/sp_131_13330_2020_svod_pravil_stroitelnaya_klimatologiya.html", label: "СП 131.13330.2020 «Строительная климатология» (ред. Изм. № 2 от 30.06.2023), таблицы 3.1 и 4.1, строка «Санкт-Петербург»" },
          { href: "https://www.consultant.ru/document/cons_doc_LAW_373321/f7815d9c6eac8483e35e0b74950da570d45ad998/", label: "КонсультантПлюс — приказ Ростехнадзора от 26.11.2020 № 461 (ред. 16.04.2026), пп. 114, 115, 132" },
          { href: "https://rulaws.ru/acts/Prikaz-Rostehnadzora-ot-26.11.2020-N-461/", label: "Приказ Ростехнадзора № 461 — полный текст ФНП (второй экземпляр для сверки)" },
        ]}
        note="Пункты ФНП прочитаны в двух публикациях, текст совпал. Климатические параметры — из строки «Санкт-Петербург» СП 131.13330.2020 по данным метеостанции города; на открытом берегу фактический ветер может отличаться. Паспортные пределы ветра и температуры конкретных машин не приводим: они берутся из паспорта машины, которая едет на объект. Ветровой район по СП 20.13330 не указываем: доступные источники расходятся."
      />
    </main>
  );
}
