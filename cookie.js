// Уведомление о файлах cookie и Яндекс.Метрике. Показывается один раз, пока человек не нажмёт «Понятно».
(function () {
  var KEY = "cookie_notice_ok";
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  var bar = document.createElement("div");
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Уведомление о cookie");
  bar.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:640px;margin:0 auto;" +
    "display:flex;gap:14px;align-items:center;flex-wrap:wrap;padding:14px 16px;border-radius:12px;" +
    "background:#2b2622;color:#f6f0e8;font:14px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25)";

  var text = document.createElement("p");
  text.style.cssText = "margin:0;flex:1 1 280px";
  text.innerHTML = "Сайт использует файлы cookie и Яндекс.Метрику, чтобы понимать, как люди пользуются страницей. " +
    "Подробнее — в&nbsp;<a href=\"privacy\" style=\"color:inherit;text-decoration:underline\">политике обработки персональных данных</a>.";

  var btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Понятно";
  btn.style.cssText = "flex:0 0 auto;padding:9px 18px;border:0;border-radius:8px;background:#d97757;color:#fff;font:600 14px/1 system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer";
  btn.addEventListener("click", function () {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    bar.remove();
  });

  bar.appendChild(text);
  bar.appendChild(btn);
  document.body.appendChild(bar);
})();
