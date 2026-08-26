import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import { SITE, BRAND, PHONE_HREF, PHONE_TEXT } from "./site-data";
import "./globals.css";

/*
  Волна 16. Навигация перестроена под тендерно-закупочную структуру:
  «Калькулятор» → «Прайс» (визард заменён открытой таблицей), «Услуги» →
  «Объекты», «Примеры задач» и «Блог» свёрнуты в «Объекты» (301 в next.config.ts),
  добавлен раздел «Для закупок» — второй по важности после главной.
  Декоративный CardTilt удалён вместе с карточками-плитками: у документа
  наклоняться нечему.
*/

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

/*
  Волна приёмки (26.08.2026), canonical. Ни на одной из 43 страниц не было
  rel=canonical. Для сайта с trailingSlash: true это значит, что адрес без
  слеша на конце — второе законное написание того же документа, и ничто не
  говорит поисковику, какое из них считать основным.
  В каждой странице теперь стоит `alternates: { canonical: "<её путь>/" }` —
  путь относительный, абсолютный адрес собирается из metadataBase ниже.
  Ставить canonical в макете нельзя: Server Component макета не знает пути
  текущей страницы, и один адрес на все страницы был бы хуже отсутствия тега.
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: BRAND, template: `%s` },
};

/*
  Волна приёмки (26.08.2026). Раньше в каждой странице лежали ТРИ узла
  микроразметки: LocalBusiness с идентификатором «#business», отдельный
  Organization с идентификатором «#organization» и WebSite. Два несвязанных
  узла организации на одной странице читаются как две разные организации —
  это ровно то, что ловит критерий sd-organization-single.
  Узлы организации слиты в один: тип теперь массив ["Organization",
  "LocalBusiness"] (schema.org это разрешает — LocalBusiness и есть подтип
  Organization), идентификатор остался один, «#organization».
  Прежний «#business» не сохранён даже как псевдоним: вместо этого все ссылки
  provider: { "@id": … } на девяти страницах услуг переписаны на
  «#organization» — иначе они указывали бы на узел, которого больше нет.
*/
const businessLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE}/#organization`,
  name: BRAND,
  // Волна 53: было "+70000000030" — незадействованный плейсхолдер, расходившийся
  // с реальным номером сайта (PHONE_HREF/PHONE_TEXT, Волна 34), который уже стоит
  // в шапке, подвале и мобильной CTA-панели. JSON-LD должен описывать тот же номер.
  telephone: PHONE_HREF.replace("tel:", ""),
  email: "info@kranneva.ru",
  url: SITE,
  priceRange: "₽₽",
  address: { "@type": "PostalAddress", addressLocality: "Санкт-Петербург", addressCountry: "RU" },
  geo: { "@type": "GeoCoordinates", latitude: 59.9311, longitude: 30.3609 },
  areaServed: "Санкт-Петербург",
  openingHours: "Mo-Su 00:00-24:00",
};
/*
  Волна приёмки. Узел WebSite переехал из общего макета в app/page.tsx:
  WebSite описывает сайт целиком, а не каждый его документ, и повторение
  этого узла на всех 45 страницах — не разметка сайта, а 45 заявлений
  «этот документ и есть весь сайт» (критерий sd-website-homepage).
*/

/*
  Волна приёмки (27.08.2026). Яндекс.Метрика, счётчик 111986110. Заведён
  сегодня — до этого сайт публиковался вслепую, как site-01/site-02 до
  своих волн приёмки. Свой счётчик, не общий с другими сайтами сети (см.
  комментарий в nuxt.config.ts site-02 — общий счётчик был бы связью внутри
  системы самого Яндекса, а не только совпадением по коду/CSS).
  App Router не даёт удобного места для сырого <script> в <head> через
  metadata API — он только для метатегов/ссылок. Ручной <head> в корневом
  layout — задокументированная возможность именно для такого случая.
*/
const YM_ID = 111986110;
const ymInit = `(function(m,e,t,r,i,k,a){
m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');
ym(${YM_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: ymInit }} />
      </head>
      <body>
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} width={1} height={1} alt="" />
          </div>
        </noscript>
        <a href="#main-content" className="skip-link">Перейти к основному содержимому</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }} />
        <header className="nav">
          <div className="nav__row wrap">
            <Link className="brand" href="/">{BRAND}</Link>
            {/*
              Волна 126. Список разделов был написан здесь и второй раз внутри
              MobileMenu — и уже разошёлся в надписях. Теперь обе навигации
              рисует один компонент по одному списку (NAV_ITEMS в site-data.ts),
              и он же помечает текущий раздел через aria-current="page":
              указателя текущей страницы у сайта не было вообще.
            */}
            <SiteNav phoneHref={PHONE_HREF} phoneText={PHONE_TEXT} />
          </div>
        </header>
        {/* tabIndex=-1 — чтобы skip-link реально переносил фокус, а не только прокрутку */}
        <div id="main-content" tabIndex={-1}>{children}</div>
        {/*
          Волна приёмки. В подвале появились три обязательные ссылки, которых
          не было ни на одной странице: контакты, политика обработки ПД и —
          отдельным документом — согласие на обработку ПД. С 01.09.2025
          согласие не может быть разделом политики, поэтому и в подвале, и в
          форме они стоят двумя раздельными ссылками, а не одной.
          Волна приёмки (27.08.2026): домен подключён, [SITE_03_DOMAIN]
          заменён на боевой kranneva.ru — тем же способом, что и на site-02
          (см. tools/set_domain.py), который здесь этот плейсхолдер не ловил,
          потому что искал только зону .example, а не квадратные скобки.
        */}
        <footer className="footer wrap">
          <span>© 2026 {BRAND} · {SITE.replace("https://", "")}</span>
          <nav className="footer__legal" aria-label="Правовая информация и контакты">
            <Link href="/kontakty/">Контакты</Link>
            <Link href="/politika-obrabotki-personalnyh-dannyh/">Политика обработки персональных данных</Link>
            <Link href="/soglasie-na-obrabotku-personalnyh-dannyh/">Согласие на обработку персональных данных</Link>
          </nav>
          <a href={PHONE_HREF}>{PHONE_TEXT}</a>
        </footer>

        {/*
          Волна 12: закреплённая снизу CTA-панель для мобильных (≤760px).
          Статичный Server Component — две обычные ссылки, работает без JS.
          В DOM стоит после <footer>, чтобы порядок табуляции совпадал с
          визуальным порядком (панель прижата к низу экрана).
          Волна 16: первая кнопка ведёт на форму запроса КП, а не на «заказать».
        */}
        <nav className="mcta" aria-label="Быстрые действия">
          <a className="mcta__btn mcta__btn--primary" href="/#kp">Запросить КП</a>
          <a
            className="mcta__btn mcta__btn--call"
            href={PHONE_HREF}
            aria-label={`Позвонить по телефону ${PHONE_TEXT}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M6.5 3.5h3l1.4 3.6-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 3.6 1.4v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 5 5.1 1.5 1.5 0 0 1 6.5 3.5z" />
            </svg>
            <span>Позвонить</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
