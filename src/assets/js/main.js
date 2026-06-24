/* austroPott – Menü, Einblend-Animationen, Galerie-Lightbox */

(function () {
  "use strict";

  /* ---- Mobiles Vollbild-Menü ---- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".menu-close");

  function openMenu() {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
    burger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && menu) {
    burger.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
  }

  /* ---- Einblenden beim Scrollen ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- Hero: Galerie-Bilder als Hintergrund-Slideshow durchblenden ----
     Erstes Bild ist sofort sichtbar (LCP). Weitere Bilder werden nur bei
     Bedarf geladen (data-src), immer das nächste im Voraus. */
  var heroSlides = document.querySelector(".hero-slides");
  if (heroSlides) {
    var slides = Array.prototype.slice.call(heroSlides.querySelectorAll(".hero-bg"));
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slides.length > 1 && !reduceMotion) {
      var current = 0;
      var load = function (n) {
        var s = slides[n];
        if (s && s.dataset.src && !s.getAttribute("src")) s.src = s.dataset.src;
      };
      load(1); // nächstes Bild vorab laden
      window.setInterval(function () {
        if (document.hidden) return;
        var next = (current + 1) % slides.length;
        slides[current].classList.remove("is-active");
        slides[next].classList.add("is-active");
        current = next;
        load((current + 1) % slides.length); // übernächstes vorab laden
      }, 6000);
    }
  }

  /* ---- Newsletter: Inline-Bestätigung statt leerer Brevo-Seite ----
     Das Formular sendet weiter an Brevo (Ziel ist ein verstecktes iframe),
     wir blenden danach eine Danke-Meldung auf der Seite ein. */
  var nlForm = document.getElementById("newsletter-form");
  if (nlForm) {
    nlForm.addEventListener("submit", function () {
      // submit feuert nur bei gültigem Formular -> Absenden läuft bereits
      var success = document.querySelector(".newsletter-success");
      window.setTimeout(function () {
        nlForm.hidden = true;
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    });
  }

  /* ---- Galerie-Lightbox ---- */
  var galerie = document.querySelector(".galerie-grid");
  if (galerie) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button type="button" aria-label="Schließen">✕</button><img alt="">';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");

    galerie.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      e.preventDefault();
      lbImg.src = link.href;
      lbImg.alt = link.querySelector("img") ? link.querySelector("img").alt : "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target !== lbImg) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
})();
