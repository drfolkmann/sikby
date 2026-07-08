/* ============================================================
   SIKBY — main.js
   - Mobilmenu (hamburger)
   - Indlæser citater fra data/quotes.json
   - Reveal-animation ved scroll
   - Årstal i footer
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobilmenu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Luk menuen når man klikker et link (på mobil)
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Årstal i footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Citater fra JSON ---------- */
  var list = document.getElementById("quotes-list");
  if (list) {
    fetch("data/quotes.json", { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error("Kunne ikke hente citater");
        return res.json();
      })
      .then(function (quotes) {
        renderQuotes(list, quotes);
      })
      .catch(function () {
        list.innerHTML =
          '<p class="quotes-empty">Citater kunne ikke indlæses. ' +
          "(Bemærk: citater vises kun via en webserver / GitHub Pages, " +
          "ikke når filen åbnes direkte fra disken.)</p>";
      });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderQuotes(container, quotes) {
    if (!Array.isArray(quotes) || quotes.length === 0) {
      container.innerHTML =
        '<p class="quotes-empty">Der er endnu ingen citater — de kommer snart.</p>';
      return;
    }
    var html = quotes
      .map(function (q) {
        var tag = q.role
          ? '<span class="role-tag">' + escapeHtml(q.role) + "</span>"
          : "";
        var org = q.org
          ? '<span>' + escapeHtml(q.org) + "</span>"
          : "";
        return (
          '<figure class="quote">' +
          tag +
          "<blockquote>„" + escapeHtml(q.text) + "“</blockquote>" +
          '<figcaption class="who">' +
          "<strong>" + escapeHtml(q.name || "") + "</strong>" +
          org +
          "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
    container.innerHTML = html;
  }

  /* ---------- Reveal-animation ved scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: vis alt hvis IntersectionObserver ikke findes
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }
})();
