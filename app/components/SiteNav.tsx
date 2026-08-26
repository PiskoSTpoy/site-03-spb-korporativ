"use client";

/*
  Волна 126. Указатель текущей страницы в навигации.

  ЧТО БЫЛО. Ни в шапке, ни в мобильной панели не было ни одного признака того,
  на какой странице находится посетитель: на /geo/ строка ссылок выглядела
  ровно так же, как на главной. Плюс сам список разделов был написан дважды —
  в app/layout.tsx и в components/MobileMenu.tsx — и уже разошёлся
  («Прайс» / «Прайс-лист», «Допуски» / «Допуски и документы»).

  ЧТО СТАЛО. Один список (NAV_ITEMS в site-data.ts) и один компонент,
  рисующий обе навигации. Текущее место помечается атрибутом aria-current —
  то есть в первую очередь для скринридера, а оформление (цвет + вес +
  подчёркивание на десктопе, подложка на мобильной панели) навешивается на
  этот же атрибут в globals.css. Цвет не единственный признак (WCAG 1.4.1).

  ПОЧЕМУ КЛИЕНТСКИЙ КОМПОНЕНТ. Макет — Server Component и пути текущей
  страницы не знает; usePathname() из next/navigation — единственный способ
  узнать его, не дублируя путь в каждой из 45 страниц. Отдельной клиентской
  границы это не добавляет: MobileMenu и так был клиентским, и он теперь
  живёт внутри этого же компонента. Никаких новых зависимостей.

  <details> остаётся неуправляемым (open не в state) — расхождения гидратации
  между сервером и клиентом невозможны, ровно как было в MobileMenu.
*/

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../site-data";

interface Props {
  phoneHref: string;
  phoneText: string;
}

export default function SiteNav({ phoneHref, phoneText }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  /*
    Якорь «/#price» — часть главной, а не отдельная страница: помечать его
    текущим на «/» было бы враньём (посетитель может стоять в любом разделе
    главной). Поэтому пункты с решёткой из проверки исключены.

    Два разных значения, а не одно. На /geo/ пункт «География» — та самая
    страница: aria-current="page". На /geo/nevskiy/ он уже не страница,
    а раздел, в котором посетитель находится: aria-current="true" —
    «текущий элемент набора» по спецификации ARIA. Сказать «page» про обе
    ситуации значило бы соврать скринридеру о том, где человек стоит.
  */
  const current = (href: string): "page" | "true" | undefined => {
    if (href.includes("#")) return undefined;
    if (pathname === href) return "page";
    return pathname.startsWith(href) ? "true" : undefined;
  };

  return (
    <>
      {/* Якоря пишем как /#… — на внутренних страницах «#price» никуда не вёл бы */}
      <nav className="nav__links" aria-label="Основное меню">
        {NAV_ITEMS.map((item) =>
          item.href.includes("#") ? (
            <a key={item.href} href={item.href}>{item.short ?? item.label}</a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current(item.href)}
            >
              {item.short ?? item.label}
            </Link>
          ),
        )}
        <a href={phoneHref}>{phoneText}</a>
      </nav>

      <details className="navmenu" ref={ref}>
        <summary className="navmenu__toggle">
          <span className="navmenu__bars" aria-hidden="true" />
          <span>Меню</span>
        </summary>
        <nav className="navmenu__panel" aria-label="Мобильное меню">
          {NAV_ITEMS.map((item) =>
            item.href.includes("#") ? (
              <a key={item.href} href={item.href} onClick={close}>{item.label}</a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            ),
          )}
          <a href={phoneHref} onClick={close}>{phoneText}</a>
        </nav>
      </details>
    </>
  );
}
