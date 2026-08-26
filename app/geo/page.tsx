import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../components/PrintButton";
import Sources from "../components/Sources";
import { OG_IMAGE, SITE, FACT_CHECK, MIN_SHIFT_HOURS, PRICE, DISTRICTS, rub } from "../site-data";

const title = "Пятнадцать районов Петербурга: ограничения подачи крана";
const description =
  "Пятнадцать районов Петербурга: мосты, намыв, режимные территории и новые площадки — чем отличается логистика подачи крана.";

/**
 * Канонический адрес страницы. Одна константа на три места:
 * alternates.canonical, openGraph.url и (косвенно) карта сайта — чтобы
 * они не могли разойтись при переименовании раздела.
 */
const canonical = "/geo/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website", images: [OG_IMAGE] },
};

const breadcrumbLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "География", item: `${SITE}/geo/` },
  ],
};

export default function Page() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs wrap" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link><span>/</span><span>География</span>
      </nav>

      <section className="section wrap section--open">
        <div className="section-head">
          <span className="eyebrow">География</span>
          <h1>Пятнадцать районов, где логистика подачи отличается от общегородской</h1>
          {/* Волна 127 (мобильная): лид был на 9 строк и занимал весь первый экран
              телефона. Оставлена первая фраза, хвост про три причины перенесён под
              таблицу районов — туда, где эти причины и перечислены по строкам. */}
          <p>
            Ставка по городу единая для всех 15 районов в этом разборе, а вот график — нет.
          </p>
        </div>
        <div className="rate-line">
          <span className="rate-line__label">Ставки без НДС · смена {MIN_SHIFT_HOURS} ч</span>
          {PRICE.map((p) => (
            <span className="rate-line__item" key={p.cls}>
              <span className="rate-line__cls">{p.cls}</span>
              <span className="rate-line__val">от {rub(p.rate)}/час</span>
            </span>
          ))}
          <Link className="rate-line__more" href="/#price">Прайс-лист целиком →</Link>
        </div>
        <PrintButton label="Распечатать сводку по районам" />
      </section>

      <section className="section wrap section--flush">
        <div className="dtable-scroll">
          <table className="dtable dtable--stack">
            <caption>Районы: профиль объектов и локальное ограничение</caption>
            <thead>
              <tr>
                <th scope="col">Район</th>
                <th scope="col">Преобладающий профиль объектов</th>
                <th scope="col">Что здесь ограничивает подачу</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICTS.map((d) => (
                <tr key={d.href}>
                  <th scope="row"><Link href={d.href}>{d.name}</Link></th>
                  <td data-label="Преобладающий профиль объектов">{d.profile}</td>
                  <td data-label="Что здесь ограничивает подачу">{d.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Волна 127: перенесённый хвост лида. */}
        <p className="price-note">
          Разбор по районам нужен ровно для одного: понять, что в этой точке города сдвинет дату
          или час выезда. Три причины повторяются чаще остальных — вода на маршруте, искусственный
          грунт и режимная территория.
        </p>
      </section>

      <section className="section wrap prose section--flush measure">
        <h2>Три причины, по которым район вообще имеет значение</h2>
        <p>
          <b>Вода на маршруте.</b> Петербург — единственный город сети, где река режет маршрут
          по расписанию. В навигацию (по Неве в 2026 году — с 10 апреля по 30 ноября) большинство мостов
          разводится примерно с 1:00 до 5:00, у каждого своё время, а часть мостов разводится
          по предварительной заявке за двое суток. Для Василеостровского района и Невского, разрезанного
          рекой на две части, это не абстракция из статьи, а вопрос, с какого берега выезжает машина.
        </p>
        <p>
          <b>Искусственный грунт.</b> Намывные территории западной части Васильевского острова
          и прибрежные участки Приморского района — это не «слабые грунты вообще», а именно искусственное
          основание, неоднородное по плотности от точки к точке. Отсюда другое правило работы:
          оценивается точка установки, а не площадка, и усиленные подкладки везутся заранее.
          Подробнее — в <Link href="/obekty/namyvnaya-territoriya/">спецификации по намыву</Link>.
        </p>
        <p>
          <b>Режимная территория.</b> Портовые терминалы, действующие производства, объекты
          в границах зон охраны — везде свой порядок допуска и свой срок. Именно он, а не расстояние
          по карте, определяет дату выезда. Сроки и основания собраны на странице{" "}
          <Link href="/documents/">«Допуски и документы»</Link>.
        </p>

        <h2>Что мы уточняем по адресу до подтверждения даты</h2>
        <ul>
          <li>С какого берега едет машина и пересекает ли маршрут разводной мост — если выезд ночной или ранний.</li>
          <li>Тип территории: намыв, историческая застройка, действующее производство, терминал.</li>
          <li>Габариты подъезда — арка, внутриквартальный проезд, временная дорога по отсыпке.</li>
          <li>Нужен ли объектовый допуск и кто его оформляет: пропуск на терминал подаёт заказчик, городской грузовой — мы.</li>
        </ul>
        <p>
          Ставка от района не зависит: отдельной наценки «за центр», «за остров» или «за Кронштадт»
          в <Link href="/#price">прайсе</Link> нет. Отличается плечо подачи — оно считается по адресу
          и попадает в КП отдельной строкой.
        </p>
      </section>

      <Sources
        date={FACT_CHECK}
        items={[
          { href: "https://mostotrest-spb.ru/news/utverzhden-grafik-razvodki-mostov-na-2026-god-1670", label: "СПб ГБУ «Мостотрест» — график разводки мостов на 2026 год и период навигации" },
          { href: "https://www.gov.spb.ru/gov/otrasl/blago/gosuslugi/vydacha-propuskov-na-dvizhenie-gruzovyh-transportnyh-sredstvrazreshenn/", label: "gov.spb.ru — пропуск на движение грузовых ТС свыше 8 тонн: орган, виды, сроки" },
          { href: "https://ecopeterburg.ru/", label: "«Окружающая среда Санкт-Петербурга» — почвообразующие породы Приневской низменности, намывные почвы как отдельная категория" },
        ]}
        note="Границы районов и административная принадлежность приводятся по действующему делению города; Кронштадт входит в состав Санкт-Петербурга, поэтому городской пропускной режим распространяется на него так же, как на остальные районы."
      />
    </main>
  );
}
