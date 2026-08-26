"use client";

import { useEffect, useRef } from "react";

/*
  Волна 19. Восстановление визуального слоя после Волны 16 (документ-спецификация
  снял hero-иллюстрацию и парк-стат-бар). Рядом со спецификацией техники — line-art
  «чертёж» автокрана: рамка с угловыми метками и размерными штрихами (дальний план,
  bg) + контур крана с телескопической стрелой и выносными опорами (ближний план, fg),
  сдвигаются на разную амплитуду от курсора и скролла — тот же приём, что описан
  для hero-иллюстрации Волны 10 (файл той волны в этой сессии не найден в истории,
  собран заново под новое место на странице). Никаких цифр на чертеже нет: размерные
  штрихи — чисто геометрические маркеры без подписанных величин, чтобы не выдумывать
  характеристики, которых уже нет в этой иллюстрации (они есть в самой таблице ТТХ).

  Сдвиг только через style.transform на <g> (compositor-слой, без layout/CLS),
  rAF-throttling, mousemove — только при matchMedia('(pointer: fine)'), scroll —
  всегда. Полностью отключается при matchMedia('(prefers-reduced-motion: reduce)')
  с живой подпиской на change; при включении reduce во время работы — transform
  сбрасывается в "" тем же кодом, что и при размонтировании.
*/

export default function SpecIllustration() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<SVGGElement>(null);
  const fgRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!wrap || !bg || !fg) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollP = 0;
    let attached = false;

    const apply = () => {
      rafId = 0;
      bg.style.transform = `translate(${(mouseX * 3 + scrollP * 6).toFixed(2)}px, ${(mouseY * 3 + scrollP * 3).toFixed(2)}px)`;
      fg.style.transform = `translate(${(mouseX * 9 - scrollP * 14).toFixed(2)}px, ${(mouseY * 9 - scrollP * 7).toFixed(2)}px)`;
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerDelta = (rect.top + rect.height / 2 - vh / 2) / vh;
      scrollP = Math.max(-1, Math.min(1, centerDelta));
      schedule();
    };

    const attachListeners = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      if (pointerQuery.matches) wrap.addEventListener("mousemove", onMouseMove);
      onScroll();
    };

    const detachListeners = () => {
      attached = false;
      window.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      mouseX = 0;
      mouseY = 0;
      scrollP = 0;
      bg.style.transform = "";
      fg.style.transform = "";
    };

    const onReducedChange = () => {
      if (reduceQuery.matches) detachListeners();
      else attachListeners();
    };

    const onPointerChange = () => {
      if (reduceQuery.matches) return;
      wrap.removeEventListener("mousemove", onMouseMove);
      if (pointerQuery.matches) wrap.addEventListener("mousemove", onMouseMove);
    };

    if (!reduceQuery.matches) attachListeners();
    reduceQuery.addEventListener("change", onReducedChange);
    pointerQuery.addEventListener("change", onPointerChange);

    return () => {
      detachListeners();
      reduceQuery.removeEventListener("change", onReducedChange);
      pointerQuery.removeEventListener("change", onPointerChange);
    };
  }, []);

  return (
    <div className="spec-illustration" ref={wrapRef}>
      <svg viewBox="0 0 440 320" role="img" aria-hidden="true" focusable="false">
        {/* Дальний план: рамка чертежа, угловые метки, размерные штрихи — без цифр */}
        <g ref={bgRef} className="spec-illustration__bg">
          <rect x="10" y="10" width="420" height="300" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M10,34 H30 M10,10 V30" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
          <path d="M420,10 V30 M400,10 H420" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
          <path d="M10,286 V310 M10,310 H30" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
          <path d="M420,310 H400 M420,286 V310" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
          <line x1="26" y1="60" x2="26" y2="284" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
          <path d="M22,64 26,56 30,64" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22,280 26,288 30,280" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="178" y1="292" x2="404" y2="292" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
          <path d="M182,288 174,292 182,296" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M400,288 408,292 400,296" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Ближний план: контур автокрана — шасси, кабина, телескопическая стрела, опоры */}
        <g ref={fgRef} className="spec-illustration__fg">
          <line x1="30" y1="284" x2="416" y2="284" stroke="var(--line-strong)" strokeWidth="1.4" />

          {/* Выносные опоры */}
          <path d="M70,262 L44,290 M44,290 h16" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M232,262 L262,290 M262,290 h-16" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Шасси */}
          <rect x="60" y="228" width="192" height="36" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
          <rect x="196" y="212" width="36" height="20" rx="1.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />

          {/* Кабина оператора */}
          <rect x="64" y="192" width="42" height="40" rx="2" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.4" />
          <rect x="70" y="198" width="16" height="14" rx="1" fill="none" stroke="var(--muted)" strokeWidth="1.6" />

          {/* Колёсные пары */}
          <circle cx="92" cy="278" r="15" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
          <circle cx="92" cy="278" r="4.5" fill="var(--ink)" />
          <circle cx="126" cy="278" r="15" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
          <circle cx="126" cy="278" r="4.5" fill="var(--ink)" />
          <circle cx="196" cy="278" r="15" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
          <circle cx="196" cy="278" r="4.5" fill="var(--ink)" />
          <circle cx="230" cy="278" r="15" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
          <circle cx="230" cy="278" r="4.5" fill="var(--ink)" />

          {/* Поворотная платформа и телескопическая стрела */}
          <circle cx="196" cy="222" r="7" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />
          <path d="M196,220 L202,208 L400,58 L402,66 L206,214 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="256" y1="176" x2="266" y2="188" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="316" y1="132" x2="326" y2="144" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />

          {/* Оголовок стрелы, грузовой канат и крюк */}
          <circle cx="401" cy="62" r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <line x1="401" y1="66" x2="401" y2="152" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
          <path d="M401,152 q0,14 -10,14 q-9,0 -9,-8" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
