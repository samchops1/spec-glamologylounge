(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    function desktop() { return window.matchMedia("(min-width: 52rem)").matches; }
    function close() { toggle.setAttribute("aria-expanded", "false"); nav.hidden = true; }
    function open() { toggle.setAttribute("aria-expanded", "true"); nav.hidden = false; }
    function sync() {
      if (desktop()) { nav.hidden = false; toggle.setAttribute("aria-expanded", "true"); }
      else if (toggle.getAttribute("aria-expanded") !== "true") nav.hidden = true;
    }
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") close(); else open();
    });
    nav.addEventListener("click", function (e) {
      if (!desktop() && e.target.closest("a")) close();
    });
    window.addEventListener("resize", sync);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !desktop()) close();
    });
    sync();
  }

  document.querySelectorAll("[data-note-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (name) {
        var el = form.elements.namedItem(name);
        return el && el.value ? el.value.trim() : "";
      };
      var lines = [
        "Name: " + get("name"),
        "Email: " + get("email"),
        "Phone: " + get("phone"),
        "What I am hoping for: " + get("service"),
        "",
        get("message")
      ];
      var subject = encodeURIComponent("Consultation — Glamology Lounge");
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:glamologylounge@gmail.com?subject=" + subject + "&body=" + body;
    });
  });
})();
