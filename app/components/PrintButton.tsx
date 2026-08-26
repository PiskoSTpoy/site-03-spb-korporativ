"use client";

/*
  Волна 16. Закупщику нужен документ, который можно приложить к заявке.
  Печать в PDF — единственный способ сделать это без бэкенда, и он честный:
  печатается ровно то, что человек видит. Стили печати живут в globals.css
  (@media print) — шапка, мобильная CTA-панель и форма из печати убраны,
  таблицы не рвутся по строкам, у ссылок раскрывается адрес.

  Кнопка появляется только после гидратации: без JS window.print() недоступен,
  и мёртвый контрол в интерфейсе — дефект, а не «мелочь».
*/

import { useEffect, useState } from "react";

export default function PrintButton({ label = "Распечатать или сохранить в PDF" }: { label?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <button type="button" className="print-btn print-hide" onClick={() => window.print()}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M6 9V3h12v6M6 18H4v-6h16v6h-2M8 14h8v7H8z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
