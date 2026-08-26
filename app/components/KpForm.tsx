"use client";

/*
  Волна 16. Замена OrderForm («имя / телефон / район») на запрос коммерческого
  предложения: закупщику нужен документ на юрлицо, а не обратный звонок.
  Что добавлено по сравнению с прежней формой:
   • поле ИНН с проверкой контрольной суммы (10 и 12 знаков) — опечатка в ИНН
     ломает карточку контрагента и КП приходится переделывать; ловим её сразу;
   • класс техники и дата — то, без чего КП всё равно не посчитать;
   • подсказка по срокам сразу под формой, а не «мы перезвоним».
  Доступность сохранена в том же объёме, что была у OrderForm: у каждого поля
  свой <label>, ошибка приходит в role="status" и связывается через
  aria-describedby, нативная валидация не выключена (форма не уходит GET-ом
  до гидратации), всплывашка браузера гасится в пользу единого текста ошибки.

  Волна 35. Реальная отправка в обработчик заявок lead-relay (см. LEAD_ENDPOINT в
  ../site-data и lead-relay/worker.js в корне репозитория) вместо заглушки
  «бэкенда нет». Контракт воркера — плоские {name, phone, comment}, а у формы
  6 содержательных полей (организация, ИНН, контактное лицо, класс техники,
  дата, объект); честнее не терять их молча, а свернуть в понятные строки:
  «организация, контакт» → name, остальное — построчно в comment. Волна 37
  (17.08.2026) реально задеплоила воркер — LEAD_ENDPOINT больше не плейсхолдер,
  форма шлёт настоящий POST. Сетевой сбой (например, если воркер временно
  недоступен) по-прежнему ловится тем же честным фоллбэком, что раньше
  показывался всегда: «заявка не отправлена, звоните». Состояние
  запроса идёт в тот же live-регион, что и ошибки валидации (единая точка
  объявления для скринридера), а не в alert() и не в отдельный тост.
  Honeypot-поле "website": в разметке есть, визуально скрыто (position:
  absolute + off-screen + opacity:0), из таб-порядка исключено (tabIndex=-1),
  из дерева доступности исключено (aria-hidden) — люди его не видят и не
  трогают, простые боты, заполняющие все поля формы, себя выдают.

  Волна приёмки (26.08.2026), две правки.

  1. Чекбокс согласия на обработку персональных данных. Форма отправляет
     телефон, ИНН, имя контактного лица и описание объекта на реальный сервер
     приёма заявок — то есть обрабатывает персональные данные, — а согласия
     не спрашивала вообще. Чекбокс обязательный (required) и НЕ предзаполнен:
     предзаполненная галка согласием не является, потому что не выражает
     действия субъекта. Рядом ДВЕ раздельные ссылки — на политику и на
     согласие: с 01.09.2025 согласие оформляется отдельным документом, и одна
     ссылка «на политику и согласие» этому требованию не отвечает.
     Проверку не дублируем в JS: у поля стоит required, браузер не даст
     отправить форму без отметки, а onInvalid переводит браузерную всплывашку
     в тот же единый текст ошибки, что и у телефона.

  2. Honeypot теперь глушит отправку НА КЛИЕНТЕ. Раньше поле "website"
     существовало, но заполненное значение уходило на сервер, и решение
     принимал только воркер. Теперь заполненный honeypot обрывает отправку
     молча: показываем тот же экран успеха, что и человеку, но запрос не
     уходит. Молча — намеренно: сообщение «вы бот» подсказало бы, какое
     поле надо оставить пустым в следующий раз.
*/

import { useRef, useState } from "react";
import { LEAD_ENDPOINT, PHONE_HREF, PHONE_TEXT, PRICE } from "../site-data";

/*
  Волна 53: текст поправлен под факт, что LEAD_ENDPOINT больше не плейсхолдер
  (Волна 37 задеплоила воркер) — старая формулировка «приём заявок ещё не
  подключён» вводила бы в заблуждение живого посетителя при обычном сетевом
  сбое (воркер временно недоступен, CORS и т.п.), выдавая рабочий сервис за
  никогда не подключённый демо-режим.
*/
const FALLBACK_TEXT =
  "Заявка не отправлена — не удалось связаться с сервером. Пожалуйста, позвоните и продиктуйте заявку:";

type Status = { kind: "error" | "sending" | "success" | "info"; text: string } | null;

/** Контрольная сумма ИНН: 10 знаков — юрлицо, 12 — ИП. Алгоритм ФНС. */
function innIsValid(digits: string): boolean {
  const d = digits.split("").map(Number);
  const check = (weights: number[], upTo: number) =>
    (weights.reduce((sum, w, i) => sum + w * d[i], 0) % 11) % 10 === d[upTo];
  if (d.length === 10) return check([2, 4, 10, 3, 5, 9, 4, 6, 8], 9);
  if (d.length === 12) {
    return (
      check([7, 2, 4, 10, 3, 5, 9, 4, 6, 8], 10) &&
      check([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], 11)
    );
  }
  return false;
}

export default function KpForm() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const innRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const statusId = "kp-form-status";
  const [badField, setBadField] = useState<"phone" | "inn" | "consent" | null>(null);

  const fieldRef = (field: "phone" | "inn" | "consent") =>
    field === "phone" ? phoneRef : field === "inn" ? innRef : consentRef;

  /*
    Живая проверка (волна приёмки) нашла порядок сообщений наизнанку: при
    пустой форме браузер шлёт invalid ВСЕМ незаполненным обязательным полям
    подряд, каждое вызывало fail(), и в статусе оставалось сообщение
    ПОСЛЕДНЕГО — то есть человек с пустой формой читал про согласие, ставил
    галку, отправлял снова и только тогда узнавал про телефон.
    Ниже — засечка на текущую пачку invalid-событий: первое сообщение
    выигрывает, остальные в этой же пачке молчат. Пачка закрывается на
    следующем тике, поэтому следующая попытка отправки снова показывает
    свою первую ошибку.
  */
  const burstRef = useRef(false);

  const fail = (field: "phone" | "inn" | "consent", text: string) => {
    if (burstRef.current) return;
    burstRef.current = true;
    setTimeout(() => { burstRef.current = false; }, 0);
    setStatus({ kind: "error", text });
    setBadField(field);
    fieldRef(field).current?.focus();
  };

  const onInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    fail("phone", "Укажите телефон — без него мы не сможем уточнить объект и отдать КП.");
  };

  /* Браузерная всплывашка у чекбокса гасится в пользу того же единого текста
     ошибки в role="status", что и у остальных полей. */
  const onConsentInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    fail("consent", "Без согласия на обработку персональных данных мы не имеем права принять заявку.");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const phone = phoneRef.current?.value ?? "";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length === 0) {
      fail(
        "phone",
        phone.trim()
          ? "В поле телефона нет ни одной цифры. Введите номер, например +7 (812) 000-00-00."
          : "Укажите телефон — без него мы не сможем уточнить объект и отдать КП.",
      );
      return;
    }
    if (phoneDigits.length < 10) {
      fail(
        "phone",
        `В номере ${phoneDigits.length} ${phoneDigits.length === 1 ? "цифра" : phoneDigits.length < 5 ? "цифры" : "цифр"}, нужно минимум 10 — например, +7 (812) 000-00-00.`,
      );
      return;
    }

    const inn = (innRef.current?.value ?? "").trim();
    if (inn) {
      const innDigits = inn.replace(/\D/g, "");
      if (innDigits.length !== 10 && innDigits.length !== 12) {
        fail("inn", `В ИНН ${innDigits.length} цифр. У организации их 10, у ИП — 12. Проверьте номер или оставьте поле пустым.`);
        return;
      }
      if (!innIsValid(innDigits)) {
        fail("inn", "ИНН не проходит проверку контрольной цифры — скорее всего, опечатка. Сверьте номер с карточкой организации.");
        return;
      }
    }

    setBadField(null);

    // Контракт воркера — плоские {name, phone, comment}; форма содержательнее,
    // поэтому организация+контакт сворачиваются в name, а класс/дата/объект/ИНН —
    // построчно в comment, чтобы ни одно заполненное поле не потерялось молча.
    const fd = new FormData(form);
    const org = (fd.get("org") ?? "").toString().trim();
    const person = (fd.get("person") ?? "").toString().trim();
    const cls = (fd.get("cls") ?? "").toString().trim();
    const date = (fd.get("date") ?? "").toString().trim();
    const object = (fd.get("object") ?? "").toString().trim();
    const website = (fd.get("website") ?? "").toString();

    /*
      Honeypot сработал: поле, которого не видно и до которого не добраться
      с клавиатуры, заполнено — значит форму отправляет не человек. Обрываем
      молча: показываем ровно тот же экран успеха и НЕ шлём запрос. Никакого
      сообщения про «подозрительную отправку» — оно подсказало бы боту,
      какое поле в следующий раз оставить пустым.
    */
    if (website.trim()) {
      setStatus({ kind: "success", text: "Заявка отправлена, мы перезвоним." });
      form.reset();
      return;
    }

    const name = [org, person].filter(Boolean).join(", ");
    const commentLines: string[] = [];
    if (inn) commentLines.push(`ИНН: ${inn}`);
    if (cls) commentLines.push(`Класс техники: ${cls}`);
    if (date) commentLines.push(`Дата выезда: ${date}`);
    if (object) commentLines.push(`Объект: ${object}`);
    const comment = commentLines.join("\n");

    setSending(true);
    setStatus({ kind: "sending", text: "Отправляем…" });

    try {
      // ЗАЩИТА ОТ ОТПРАВКИ ТЕСТОВЫХ ЗАЯВОК В БОЕВОЙ ПРИЁМНИК.
      // Обработчик заявок пересылает содержимое формы живому человеку в чат.
      // Любая проверка формы с локального dev-сервера доходила до него как
      // настоящий лид: так уже случилось трижды.
      // Ниже запрос физически не уходит, если страница открыта не на боевом домене.
      // Вся остальная логика (статусы, разблокировка кнопки, разбор ответа)
      // работает как обычно — форму можно проверять, не мусоря в чате.
      // Лога в консоль здесь намеренно нет: подпись в devtools была одинаковой
      // на нескольких проектах и опознавала сборку по одной строке.
      const leadRelayFetch = (url: string, init?: RequestInit): Promise<Response> => {
        const h = typeof location !== 'undefined' ? location.hostname : '';
        const isLocal =
          /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(h) ||
          h.endsWith('.local') ||
          (typeof location !== 'undefined' && location.protocol === 'file:');
        if (isLocal) {
          return Promise.resolve(
            new Response(JSON.stringify({ ok: true, dryRun: true }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }),
          );
        }
        return fetch(url, init);
      };
      const res = await leadRelayFetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "kranspb",
          name,
          phone: phone.trim(),
          comment,
          page: window.location.pathname,
          website,
        }),
      });

      let payload: { ok?: boolean } | null = null;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (res.ok && payload?.ok === true) {
        setStatus({ kind: "success", text: "Заявка отправлена, мы перезвоним." });
        form.reset();
      } else {
        setStatus({ kind: "info", text: FALLBACK_TEXT });
      }
    } catch {
      setStatus({ kind: "info", text: FALLBACK_TEXT });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="kp-form print-hide" onSubmit={onSubmit} aria-describedby="kp-form-hint">
      <div className="kp-form__grid">
        <div className="kp-form__field">
          <label htmlFor="kp-org">Организация</label>
          <input id="kp-org" name="org" type="text" autoComplete="organization" placeholder="ООО «…»" />
        </div>

        <div className="kp-form__field">
          <label htmlFor="kp-inn">
            ИНН <span className="kp-form__hint-inline">— проверим контрольную цифру</span>
          </label>
          <input
            id="kp-inn"
            ref={innRef}
            name="inn"
            type="text"
            inputMode="numeric"
            maxLength={12}
            aria-invalid={badField === "inn" ? true : undefined}
            aria-describedby={badField === "inn" ? statusId : undefined}
          />
        </div>

        <div className="kp-form__field">
          <label htmlFor="kp-person">Контактное лицо</label>
          <input id="kp-person" name="person" type="text" autoComplete="name" />
        </div>

        <div className="kp-form__field">
          <label htmlFor="kp-phone">
            Телефон <span className="kp-form__req">— обязательно</span>
          </label>
          <input
            id="kp-phone"
            ref={phoneRef}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            onInvalid={onInvalid}
            aria-invalid={badField === "phone" ? true : undefined}
            aria-describedby={badField === "phone" ? statusId : undefined}
          />
        </div>

        <div className="kp-form__field">
          <label htmlFor="kp-class">Класс техники</label>
          <select id="kp-class" name="cls" defaultValue="">
            <option value="">Подберите за нас</option>
            {PRICE.map((p) => (
              <option key={p.cls} value={p.cls}>{p.cls}</option>
            ))}
          </select>
        </div>

        <div className="kp-form__field">
          <label htmlFor="kp-date">Желаемая дата выезда</label>
          <input id="kp-date" name="date" type="date" />
        </div>

        <div className="kp-form__field kp-form__field--wide">
          <label htmlFor="kp-object">Объект: адрес, тип площадки, вес и вылет</label>
          <textarea id="kp-object" name="object" rows={3} />
        </div>
      </div>

      {/* Honeypot: людям это поле не видно и не доступно с клавиатуры/скринридера,
          простые боты, заполняющие все поля формы подряд, себя этим выдают. */}
      <input
        type="text"
        name="website"
        id="kp-website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      {/*
        Чекбокс согласия. Не предзаполнен и обязателен; политика и согласие —
        две раздельные ссылки на два разных документа, а не одна общая.
        Ссылки открываются в той же вкладке: документ нужно прочитать до
        отправки, а введённые поля никуда не денутся — форма отправляется
        только по кнопке.
      */}
      <div className="kp-form__consent">
        <input
          id="kp-consent"
          ref={consentRef}
          name="consent"
          type="checkbox"
          required
          onInvalid={onConsentInvalid}
          aria-invalid={badField === "consent" ? true : undefined}
          aria-describedby={badField === "consent" ? statusId : undefined}
        />
        <label htmlFor="kp-consent">
          Я даю <a href="/soglasie-na-obrabotku-personalnyh-dannyh/">согласие на обработку
          персональных данных</a> и ознакомлен с <a href="/politika-obrabotki-personalnyh-dannyh/">политикой
          обработки персональных данных</a>.
        </label>
      </div>

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Отправляем…" : "Запросить КП →"}
      </button>

      <p className="kp-form__hint" id="kp-form-hint">
        В ответ приходит спецификация, прайс по вашему классу техники, проект договора с приложениями
        и карточка контрагента одним письмом. Если объект в порту или в охранной зоне, в КП отдельной
        строкой стоит срок оформления допуска — он и определяет дату выезда.
      </p>

      <div
        id={statusId}
        role="status"
        aria-live="polite"
        className={"kp-form__status" + (status ? ` kp-form__status--${status.kind}` : "")}
      >
        {status ? (
          <>
            {status.kind === "error" ? <b>Ошибка. </b> : null}
            {status.text}
            {status.kind === "info" ? (
              <>
                {" "}
                <a href={PHONE_HREF}>{PHONE_TEXT}</a>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </form>
  );
}
