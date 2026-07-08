/* ============================================================
   SORØ IDRÆTS- OG KULTURBY (SIKB) — main.js
   - Slide-deck: prik-navigation, piletaster, aktiv-slide
   - Progress-bar + lys/mørk top-bar afhængig af aktiv slide
   - Animerede tal + finansieringsbjælker
   - Citater fra data/quotes.json
   - Footer-år (undersider)
   ============================================================ */

(function () {
  "use strict";

  var deck = document.getElementById("deck");
  var slides = deck ? Array.prototype.slice.call(deck.querySelectorAll(".slide")) : [];

  /* ---------- Footer-år (undersider) ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     SLIDE-DECK
     ============================================================ */
  if (deck && slides.length) {
    var dotsWrap = document.getElementById("dots");
    var progress = document.getElementById("progress");
    var body = document.body;
    var current = 0;

    /* Byg prik-navigation */
    if (dotsWrap) {
      slides.forEach(function (s, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", s.getAttribute("data-label") || "Slide " + (i + 1));
        b.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(b);
      });
    }
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function goTo(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function setActive(i) {
      if (i === current) return;
      current = i;
      slides.forEach(function (s, n) { s.classList.toggle("active", n === i); });
      dots.forEach(function (d, n) { d.classList.toggle("active", n === i); });

      // Lys top-bar/prikker på lyse slides
      var isLight = slides[i].classList.contains("slide-light") ||
                    slides[i].classList.contains("slide-alt");
      body.classList.toggle("topbar-dark", isLight);

      // Trigger bjælke-/tal-animation på aktiv slide
      animateSlide(slides[i]);
    }

    /* Observer: hvilken slide er mest synlig */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            setActive(slides.indexOf(e.target));
          }
        });
      }, { threshold: [0.55, 0.75] });
      slides.forEach(function (s) { io.observe(s); });
    }
    // Sæt første slide aktiv med det samme
    slides[0].classList.add("active");
    dots.length && dots[0].classList.add("active");
    animateSlide(slides[0]);

    /* Progress-bar */
    function updateProgress() {
      var max = deck.scrollHeight - deck.clientHeight;
      var pct = max > 0 ? (deck.scrollTop / max) * 100 : 0;
      if (progress) progress.style.width = pct + "%";
    }
    deck.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    /* Tastatur-navigation (som i PowerPoint) */
    window.addEventListener("keydown", function (e) {
      if (["ArrowDown", "PageDown"].indexOf(e.key) > -1) { e.preventDefault(); goTo(current + 1); }
      else if (["ArrowUp", "PageUp"].indexOf(e.key) > -1) { e.preventDefault(); goTo(current - 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(slides.length - 1); }
    });

    /* Hash-links i top-bar/hero (#slide-...) */
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#slide-"]') : null;
      if (!a) return;
      var target = document.getElementById(a.getAttribute("href").slice(1));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  }

  /* ---------- Animation af tal + bjælker pr. slide ---------- */
  function animateSlide(slide) {
    // Finansieringsbjælker
    slide.querySelectorAll(".fin-bar > span[data-pct]").forEach(function (bar) {
      bar.style.width = bar.getAttribute("data-pct") + "%";
    });
    // Tal-tællere
    slide.querySelectorAll("[data-count]").forEach(function (el) {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      countUp(el);
    });
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1100, start = null;
    function fmt(v) {
      return v.toFixed(dec).replace(".", ",");
    }
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target) + suffix;
    }
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = fmt(target) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  }

  /* ============================================================
     CITATER
     ============================================================ */
  var list = document.getElementById("quotes-list");
  if (list) {
    fetch("data/quotes.json", { cache: "no-cache" })
      .then(function (res) { if (!res.ok) throw new Error(); return res.json(); })
      .then(function (q) { renderQuotes(list, q); })
      .catch(function () {
        list.innerHTML = '<p class="quotes-empty">Citater kunne ikke indlæses. ' +
          "(Vises kun via en webserver / GitHub Pages, ikke fra disken.)</p>";
      });
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderQuotes(container, quotes) {
    if (!Array.isArray(quotes) || !quotes.length) {
      container.innerHTML = '<p class="quotes-empty">Der er endnu ingen citater — de kommer snart.</p>';
      return;
    }
    container.innerHTML = quotes.map(function (q) {
      return '<figure class="quote">' +
        (q.role ? '<span class="role-tag">' + esc(q.role) + "</span>" : "") +
        "<blockquote>„" + esc(q.text) + "“</blockquote>" +
        '<figcaption class="who"><strong>' + esc(q.name || "") + "</strong>" +
        (q.org ? "<span>" + esc(q.org) + "</span>" : "") +
        "</figcaption></figure>";
    }).join("");
  }
})();
