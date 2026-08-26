"use client";

import { useEffect, useRef } from "react";

/*
  Волна 27. Технический чертёж модели парка — по одному на каждую из 5 страниц
  /park/*. Переиспользует визуальный язык SpecIllustration.tsx (главная,
  Волна 19): дальний план — пунктирная рамка с угловыми метками (bg, медленный
  параллакс), ближний план — контур автокрана: шасси, кабина, колёса, поворотная
  платформа, телескопическая стрела, крюк на акцентном канате (fg, быстрый
  параллакс). Тот же приём с курсором/скроллом, тот же набор токенов
  (--ink/--line/--line-strong/--surface/--bg/--muted/--accent), те же
  Λ-образные засечки на размерных линиях, что и в дальнем плане оригинала —
  только там они декоративные (без цифр), а здесь несут подписи размеров.

  В отличие от главной, здесь цифры на чертеже ЕСТЬ — но только те, что уже
  напечатаны в таблицах ТТХ на той же странице (см. пропы: caller передаёт их
  из своего JSX, компонент не хранит собственных характеристик и не досочиняет
  то, чего нет в тексте страницы). Пять силуэтов различаются геометрией —
  число осей, угол и длина стрелы, наличие гуська, дополнительная опора над
  кабиной (XCMG), профиль сечения стрелы (SANY/Zoomlion) — так же, как реальные
  автокраны этого класса отличаются друг от друга, а не перекраской одного
  шаблона. Длины на чертеже пропорциональны реальным (длиннее стрела в тексте —
  длиннее линия на чертеже), но это схема, а не масштабная сетка.

  Декоративно (role="img" aria-hidden="true"): все цифры уже озвучены текстом
  в таблице ТТХ рядом, дублировать их для скринридера не нужно.
*/

const rad = (deg: number) => (deg * Math.PI) / 180;
function polar(x: number, y: number, angleDeg: number, len: number) {
  const r = rad(angleDeg);
  return { x: x + Math.cos(r) * len, y: y - Math.sin(r) * len };
}
function perp(angleDeg: number) {
  const r = rad(angleDeg);
  return { x: Math.sin(r), y: Math.cos(r) };
}
const f = (n: number) => n.toFixed(1);

export interface ParkModelArtJib {
  label: string;
  angleAdd?: number;
  len?: number;
}
export interface ParkModelArtCrossSection {
  shape: "u" | "oval";
  label: string;
}
export interface ParkModelArtProps {
  modelName: string;
  /** Бейдж грузоподъёмности, напр. «100 т» */
  capacity: string;
  /** Короткая подпись массы/оси у нижнего левого угла, напр. «60 т · 12 т/ось × 5» */
  massLabel: string;
  /** Подпись горизонтальной размерной линии стрелы/вылета */
  boomLabel: string;
  /** Длина стрелы на чертеже в единицах viewBox — пропорционально реальной длине, не масштаб */
  boomLen: number;
  boomAngle?: number;
  /** Подпись вертикальной размерной линии высоты подъёма */
  heightLabel: string;
  /** Число телескопических секций, если оно названо в тексте страницы — иначе общий двухстыковой намёк */
  sections?: number;
  /** Число колёсных пар на чертеже (визуальная пропорция; подписывается числом только когда massLabel/note уже называют это число в тексте) */
  wheels?: number;
  /** Гусёк — пунктирное навесное звено, есть только если он назван в тексте страницы */
  jib?: ParkModelArtJib;
  /** Подпись нижней размерной линии габаритной длины шасси — есть только если она опубликована */
  lengthLabel?: string;
  crossSection?: ParkModelArtCrossSection;
  extraOutrigger?: { label: string };
  /**
   * Волна 87. Гусеничный ход вместо колёсного шасси на выносных опорах: у машины
   * нет ни колёс, ни аутригеров — вся нагрузка идёт через две гусеничные ленты
   * прямо в грунт. Меняет только ходовую часть чертежа (колёса → лента с траками,
   * опоры не рисуются); шасси, кабина, стрела, гусёк и размерные линии — те же,
   * что у колёсных моделей.
   */
  tracked?: boolean;
  /** Короткая заметка (1–2 строки) под бейджем — момент, разлёт опор, крюки и т.п. */
  note?: string | string[];
}

const VBW = 640;
const VBH = 340;
const PAD = 10;
const GROUND_Y = 230;

export default function ParkModelArt({
  modelName,
  capacity,
  massLabel,
  boomLabel,
  boomLen,
  boomAngle = 28,
  heightLabel,
  sections,
  wheels = 4,
  jib,
  lengthLabel,
  crossSection,
  extraOutrigger,
  tracked = false,
  note,
}: ParkModelArtProps) {
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
      bg.style.transform = `translate(${(mouseX * 2 + scrollP * 4).toFixed(2)}px, ${(mouseY * 2 + scrollP * 2).toFixed(2)}px)`;
      fg.style.transform = `translate(${(mouseX * 6 - scrollP * 9).toFixed(2)}px, ${(mouseY * 6 - scrollP * 5).toFixed(2)}px)`;
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

  // ── Ходовая часть ────────────────────────────────────────────────────────
  const wheelR = 14;
  const wheelCy = GROUND_Y - wheelR;
  const chassisBottomY = wheelCy - wheelR - 3;
  const chassisH = 30;
  const chassisY = chassisBottomY - chassisH;
  const chassisX0 = 66;
  const chassisW = 190 + (wheels - 3) * 34;
  const chassisX1 = chassisX0 + chassisW;

  const wheelMargin = 26;
  const wheelSpan = chassisW - wheelMargin * 2;
  const wheelXs = Array.from({ length: wheels }, (_, i) =>
    chassisX0 + wheelMargin + (wheels > 1 ? (i * wheelSpan) / (wheels - 1) : wheelSpan / 2)
  );

  const cabW = 44;
  const cabH = 36;
  const cabX = chassisX0 + 6;
  const cabY = chassisY - cabH + 4;

  const pivotX = chassisX0 + chassisW * 0.66;
  const pivotY = chassisY - 8;
  const turretR = 7;

  // ── Стрела ───────────────────────────────────────────────────────────────
  const dirP = perp(boomAngle);
  const tip = polar(pivotX, pivotY, boomAngle, boomLen);
  const halfBase = 7;
  const halfTip = 2.6;
  const boomQuad = [
    { x: pivotX + dirP.x * halfBase, y: pivotY + dirP.y * halfBase },
    { x: tip.x + dirP.x * halfTip, y: tip.y + dirP.y * halfTip },
    { x: tip.x - dirP.x * halfTip, y: tip.y - dirP.y * halfTip },
    { x: pivotX - dirP.x * halfBase, y: pivotY - dirP.y * halfBase },
  ]
    .map((p) => `${f(p.x)},${f(p.y)}`)
    .join(" ");

  const jointTs = sections && sections > 1
    ? Array.from({ length: sections - 1 }, (_, i) => (i + 1) / sections)
    : [0.38, 0.72];
  const jointLines = jointTs.map((t) => {
    const cx = pivotX + (tip.x - pivotX) * t;
    const cy = pivotY + (tip.y - pivotY) * t;
    const hw = halfBase + (halfTip - halfBase) * t;
    return `M${f(cx + dirP.x * hw)},${f(cy + dirP.y * hw)} L${f(cx - dirP.x * hw)},${f(cy - dirP.y * hw)}`;
  });

  let effTip = tip;
  let jibTip = tip;
  if (jib) {
    const gAngle = boomAngle + (jib.angleAdd ?? 13);
    const gLen = jib.len ?? 60;
    jibTip = polar(tip.x, tip.y, gAngle, gLen);
    effTip = jibTip;
  }

  // ── Крюк и канат — акцентный цвет ───────────────────────────────────────
  const hookY = Math.min(effTip.y + 90, GROUND_Y - 24);

  // ── Размерные линии ─────────────────────────────────────────────────────
  const boomDimY = lengthLabel ? GROUND_Y + 38 : GROUND_Y + 14;
  const lengthDimY = GROUND_Y + 14;
  const boomX1 = Math.min(pivotX, tip.x);
  const boomX2 = Math.max(pivotX, tip.x);
  const heightDimX = VBW - PAD - 54;
  const heightTopY = Math.min(tip.y, effTip.y);

  const hArrow = (x1: number, x2: number, y: number) =>
    `M${f(x2 - 8)},${f(y - 4)} L${f(x2)},${f(y)} L${f(x2 - 8)},${f(y + 4)} M${f(x1 + 8)},${f(y - 4)} L${f(x1)},${f(y)} L${f(x1 + 8)},${f(y + 4)}`;
  const vArrow = (y1: number, y2: number, x: number) =>
    `M${f(x - 4)},${f(y1 - 8)} L${f(x)},${f(y1)} L${f(x + 4)},${f(y1 - 8)} M${f(x - 4)},${f(y2 + 8)} L${f(x)},${f(y2)} L${f(x + 4)},${f(y2 + 8)}`;

  const notes = note ? (Array.isArray(note) ? note : [note]) : [];

  // ── Профиль сечения стрелы — маленькая иконка у основания ──────────────
  const csX = pivotX - 34;
  const csY = pivotY - 20;

  // ── Опора над кабиной ────────────────────────────────────────────────────
  const strutBaseX = cabX + cabW * 0.55;
  const strutTopX = strutBaseX - 8;
  const strutTopY = cabY - 30;

  const leg = 24;
  const corners = [
    `M${PAD},${PAD + leg} V${PAD} H${PAD + leg}`,
    `M${VBW - PAD - leg},${PAD} H${VBW - PAD} V${PAD + leg}`,
    `M${VBW - PAD},${VBH - PAD - leg} V${VBH - PAD} H${VBW - PAD - leg}`,
    `M${PAD + leg},${VBH - PAD} H${PAD} V${VBH - PAD - leg}`,
  ].join(" ");

  return (
    <div className="model-art" ref={wrapRef}>
      <svg
        className="model-art__svg"
        viewBox={`0 0 ${VBW} ${VBH}`}
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        {/* Дальний план: рамка чертежа и угловые метки */}
        <g ref={bgRef} className="model-art__bg">
          <rect x={PAD} y={PAD} width={VBW - 2 * PAD} height={VBH - 2 * PAD} fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
          <path d={corners} fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
        </g>

        {/* Ближний план: силуэт машины + размеры */}
        <g ref={fgRef} className="model-art__fg">
          <line x1={PAD + 16} y1={GROUND_Y} x2={VBW - PAD - 16} y2={GROUND_Y} stroke="var(--line-strong)" strokeWidth="1.4" />

          {/* Бейдж грузоподъёмности */}
          <rect x="44" y="20" width="120" height="46" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.4" />
          <text x="54" y="35" fontSize="9.5" fontWeight="800" letterSpacing=".07em" fill="var(--muted)" style={{ textTransform: "uppercase" }}>Грузоподъёмность</text>
          <text x="54" y="60" fontSize="18" fontWeight="800" fill="var(--accent)">{capacity}</text>

          {/* Заметки под бейджем */}
          {notes.map((n, i) => (
            <text key={i} x="44" y={80 + i * 16} fontSize="11" fill="var(--muted)">{n}</text>
          ))}

          {/* Выносные опоры — только у колёсного шасси, гусеничный ход стоит прямо на ленте */}
          {!tracked && (
            <>
              <path d={`M${chassisX0 + 20},${chassisBottomY} L${chassisX0 - 12},${GROUND_Y}`} fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
              <rect x={chassisX0 - 22} y={GROUND_Y - 4} width="14" height="6" fill="var(--ink)" />
              <path d={`M${chassisX1 - 20},${chassisBottomY} L${chassisX1 + 12},${GROUND_Y}`} fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
              <rect x={chassisX1 + 8} y={GROUND_Y - 4} width="14" height="6" fill="var(--ink)" />
            </>
          )}

          {/* Дополнительная опора над кабиной (XCMG) */}
          {extraOutrigger && (
            <g>
              <path d={`M${strutBaseX},${cabY} L${strutTopX},${strutTopY}`} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
              <rect x={strutTopX - 6} y={strutTopY - 5} width="12" height="6" fill="var(--ink)" />
            </g>
          )}

          {/* Шасси */}
          <rect x={chassisX0} y={chassisY} width={chassisW} height={chassisH} rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />

          {/* Кабина */}
          <rect x={cabX} y={cabY} width={cabW} height={cabH} rx="2" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.4" />
          <rect x={cabX + 6} y={cabY + 6} width="16" height="14" rx="1" fill="none" stroke="var(--muted)" strokeWidth="1.6" />

          {/* Колёса — у колёсного шасси; гусеничный ход рисуется отдельно ниже */}
          {!tracked && wheelXs.map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy={wheelCy} r={wheelR} fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2" />
              <circle cx={cx} cy={wheelCy} r={wheelR * 0.34} fill="var(--ink)" />
            </g>
          ))}

          {/* Гусеничная лента: вытянутая капсула во всю ширину шасси + траки */}
          {tracked && (
            <g>
              <rect
                x={chassisX0 - 16} y={wheelCy - wheelR} width={chassisW + 32} height={wheelR * 2} rx={wheelR}
                fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.2"
              />
              {Array.from({ length: 9 }, (_, i) => {
                const trackX = chassisX0 - 10 + (i * (chassisW + 20)) / 8;
                return (
                  <line key={i} x1={trackX} y1={wheelCy - wheelR + 4} x2={trackX} y2={wheelCy + wheelR - 4} stroke="var(--ink)" strokeWidth="1.6" />
                );
              })}
            </g>
          )}

          {/* Профиль сечения стрелы */}
          {crossSection && (
            <g>
              {crossSection.shape === "u" ? (
                <path d={`M${csX - 8},${csY - 8} q0,10 8,10 q8,0 8,-10`} fill="none" stroke="var(--muted)" strokeWidth="1.6" />
              ) : (
                <ellipse cx={csX} cy={csY - 3} rx="7" ry="9" fill="none" stroke="var(--muted)" strokeWidth="1.6" />
              )}
              <text x={csX} y={csY + 16} fontSize="9.5" fill="var(--muted)" textAnchor="middle">{crossSection.label}</text>
            </g>
          )}

          {/* Поворотная платформа + стрела */}
          <circle cx={pivotX} cy={pivotY} r={turretR} fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />
          <polygon points={boomQuad} fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
          {jointLines.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--muted)" strokeWidth="1.4" />
          ))}

          {/* Гусёк — пунктирное навесное звено */}
          {jib && (
            <g>
              <path d={`M${f(tip.x)},${f(tip.y)} L${f(jibTip.x)},${f(jibTip.y)}`} fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 4" />
              <text x={f((tip.x + jibTip.x) / 2 + 8)} y={f((tip.y + jibTip.y) / 2 - 6)} fontSize="10.5" fill="var(--ink)">{jib.label}</text>
            </g>
          )}

          {/* Оголовок стрелы, канат, крюк — акцент */}
          <circle cx={effTip.x} cy={effTip.y} r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <line x1={effTip.x} y1={effTip.y + 4} x2={effTip.x} y2={hookY} stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
          <path d={`M${f(effTip.x)},${f(hookY)} q0,14 -10,14 q-9,0 -9,-8`} fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />

          {/* Размер: длина шасси в транспортном положении */}
          {lengthLabel && (
            <g>
              <path d={hArrow(chassisX0, chassisX1, lengthDimY)} fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={chassisX0} y1={lengthDimY} x2={chassisX1} y2={lengthDimY} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="2 4" />
              <text x={(chassisX0 + chassisX1) / 2} y={lengthDimY + 16} fontSize="11" fill="var(--muted)" textAnchor="middle">{lengthLabel}</text>
            </g>
          )}

          {/* Размер: вылет / длина стрелы */}
          <g>
            <path d={hArrow(boomX1, boomX2, boomDimY)} fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1={boomX1} y1={boomDimY} x2={boomX2} y2={boomDimY} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="2 4" />
            <text x={(boomX1 + boomX2) / 2} y={boomDimY + 16} fontSize="11" fill="var(--muted)" textAnchor="middle">{boomLabel}</text>
          </g>

          {/* Размер: высота подъёма */}
          <g>
            <path d={vArrow(GROUND_Y, heightTopY, heightDimX)} fill="none" stroke="var(--line-strong)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1={heightDimX} y1={GROUND_Y} x2={heightDimX} y2={heightTopY} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="2 4" />
            <text x={heightDimX - 10} y={(GROUND_Y + heightTopY) / 2} fontSize="11" fill="var(--muted)" textAnchor="end">{heightLabel}</text>
          </g>

          {/* Масса / оси — заметка у нижнего левого угла */}
          <text x="44" y={VBH - 16} fontSize="11" fontWeight="700" fill="var(--ink)">{massLabel}</text>
        </g>
      </svg>
      <p className="sr-only">Схема силуэта {modelName} по характеристикам этой модели — не фотография техники.</p>
    </div>
  );
}
