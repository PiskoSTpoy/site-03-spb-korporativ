"use client";

/*
  Волна 123 (перенос пилота с site-01, Волна 122): 3D-наклон карточек по позиции
  курсора. Проверено ПЕРЕД написанием: комментарий в globals.css (волна 16, строки
  82-86) прямо фиксирует, что tilt-карточки на этом сайте УЖЕ БЫЛИ — и были удалены
  вместе со сменой архетипа (hero-иллюстрация/бегущая строка/стат-бар/3D-сцена),
  компонент вычищен из app/components. Значит переиспользовать нечего — старый
  код физически не существует, это первый тилт-контроллер после чистки, а не
  третий поверх существующего.

  Компонент ничего не рендерит — только пишет CSS-переменные --rx/--ry/--gx/--gy
  на элементах SELECTOR; сам transform/box-shadow — в globals.css (.spec-photo-card),
  ровно так же, как initCardTilt в site-01/BaseLayout.astro пишет переменные для
  CSS-правила a.park-card:hover. Не подключился скрипт — карточка ведёт себя как
  обычный .box (подъём + тень + верхний акцентный бар, без наклона).
*/

import { useEffect } from "react";

const SELECTOR = ".spec-photo-card";
const MAX_DEG = 5; // корпоративный минимализм сдержаннее бруталистских ±6° site-01

export default function CardTilt() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!cards.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let attached = false;

    function onMove(e: PointerEvent) {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--ry", ((px - 0.5) * 2 * MAX_DEG).toFixed(2) + "deg");
      card.style.setProperty("--rx", ((0.5 - py) * 2 * MAX_DEG).toFixed(2) + "deg");
      card.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
    }

    function reset(card: HTMLElement) {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
      card.style.removeProperty("--gx");
      card.style.removeProperty("--gy");
    }

    function onLeave(e: PointerEvent) {
      reset(e.currentTarget as HTMLElement);
    }

    function attach() {
      if (attached) return;
      attached = true;
      cards.forEach((c) => {
        c.addEventListener("pointermove", onMove);
        c.addEventListener("pointerleave", onLeave);
      });
    }

    function detach() {
      if (!attached) return;
      attached = false;
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
        reset(c);
      });
    }

    function evaluate() {
      if (reduceMotion.matches || !finePointer.matches) detach();
      else attach();
    }

    evaluate();
    reduceMotion.addEventListener("change", evaluate);
    finePointer.addEventListener("change", evaluate);

    return () => {
      detach();
      reduceMotion.removeEventListener("change", evaluate);
      finePointer.removeEventListener("change", evaluate);
    };
  }, []);

  return null;
}
