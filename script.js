// Ссылки для кнопок. Вставьте адрес между кавычками — кнопка сразу начнёт вести туда.
// Пока адрес пустой, кнопка ведёт в Telegram к Светлане с готовым текстом.
const LINKS = {
  pay_self: "https://neuroproducer.getplatinum.ru/payment/Gq4ehQz", // тариф «Самостоятельно», 4 990 ₽ — оплата GetPlatinum (через бота: https://t.me/neiroproducer_bot?start=c1790609957988-ds)
  pay_meeting: "https://neuroproducer.getplatinum.ru/payment/7IAw66n", // тариф «С личной встречей», 9 990 ₽ — оплата GetPlatinum (через бота: https://t.me/neiroproducer_bot?start=c1790692258174-ds)
  pay_review: "https://neuroproducer.getplatinum.ru/payment/qhu8tTs",  // тариф «С проверкой», 19 990 ₽ — оплата GetPlatinum (через бота: https://t.me/neiroproducer_bot?start=c1790694430232-ds)
  corporate: "",    // корпоративные тренинги (можно оставить пустым — будет Telegram)
  question: "",     // вопрос перед оплатой (можно оставить пустым — будет Telegram)
};

// Номер счётчика Яндекс.Метрики — нужен, чтобы клики по кнопкам считались целями.
const METRIKA_ID = 113179487;

const TELEGRAM = "https://t.me/svechka_v";
const FALLBACK_TEXT = {
  pay_self: "Здравствуйте! Хочу участвовать в практикуме по Claude, тариф «Самостоятельно».",
  pay_meeting: "Здравствуйте! Хочу участвовать в практикуме по Claude, тариф «С личной встречей».",
  pay_review: "Здравствуйте! Хочу участвовать в практикуме по Claude, тариф «С проверкой».",
  corporate: "Здравствуйте! Интересует корпоративный тренинг по Claude для команды.",
  question: "Здравствуйте! У меня вопрос о практикуме по Claude.",
};

document.querySelectorAll("[data-link]").forEach((link) => {
  const key = link.dataset.link;
  link.href = LINKS[key] || `${TELEGRAM}?text=${encodeURIComponent(FALLBACK_TEXT[key] || "")}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-goal]").forEach((link) => {
  link.addEventListener("click", () => {
    if (METRIKA_ID && typeof window.ym === "function") {
      window.ym(METRIKA_ID, "reachGoal", link.dataset.goal);
    }
  });
});

// В программе и в вопросах открыт только один пункт за раз
document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    const group = item.closest(".faq-list, .program") || document;
    group.querySelectorAll("details[open]").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
