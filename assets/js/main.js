/* ==========================================================================
   Ejt Legacy Homes — main.js
   Vanilla JS: sticky-header state, mobile nav, scroll reveal, FAQ accordion,
   gallery filtering + accessible lightbox, and Web3Forms submit handling.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---------- Footer year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav drawer ---------- */
  var toggle = doc.getElementById("navToggle");
  var drawer = doc.getElementById("navDrawer");
  function closeNav() {
    body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(doc.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- FAQ accordion ---------- */
  doc.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var panel = item.querySelector(".faq-item__a");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- Gallery filtering ---------- */
  var filterBtns = Array.prototype.slice.call(doc.querySelectorAll(".filter-btn"));
  var galleryItems = Array.prototype.slice.call(doc.querySelectorAll(".gallery__item"));
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var show = filter === "all" || item.getAttribute("data-cat") === filter;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = doc.getElementById("lightbox");
  var lbImg = doc.getElementById("lbImg");
  var lbCap = doc.getElementById("lbCap");
  var lbClose = doc.getElementById("lbClose");
  var lbPrev = doc.getElementById("lbPrev");
  var lbNext = doc.getElementById("lbNext");
  var lastFocused = null;
  var current = 0;

  function visibleItems() {
    return galleryItems.filter(function (i) { return !i.classList.contains("is-hidden"); });
  }
  function renderLightbox() {
    var items = visibleItems();
    if (!items.length) return;
    var item = items[current];
    lbImg.setAttribute("src", item.getAttribute("data-full"));
    lbImg.setAttribute("alt", item.getAttribute("data-title") || "Project photo");
    lbCap.innerHTML =
      "<span>" + (item.getAttribute("data-type") || "") + "</span>" +
      (item.getAttribute("data-title") || "");
  }
  function openLightbox(item) {
    var items = visibleItems();
    current = items.indexOf(item);
    if (current < 0) current = 0;
    renderLightbox();
    lightbox.classList.add("is-open");
    body.style.overflow = "hidden";
    lastFocused = doc.activeElement;
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  function step(dir) {
    var items = visibleItems();
    current = (current + dir + items.length) % items.length;
    renderLightbox();
  }
  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () { openLightbox(item); });
  });
  if (lightbox) {
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { step(-1); });
    lbNext.addEventListener("click", function () { step(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    doc.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- Contact form (Web3Forms) ---------- */
  var form = doc.getElementById("leadForm");
  var status = doc.getElementById("formStatus");

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form__status is-visible is-" + kind;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if filled, silently "succeed" and bail.
      if (form.botcheck && form.botcheck.value) {
        setStatus("Thank you — we'll be in touch shortly.", "success");
        form.reset();
        return;
      }

      // Basic validation
      var required = form.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        if (!required[i].value.trim()) {
          setStatus("Please fill in your name, phone, and email so we can reach you.", "error");
          required[i].focus();
          return;
        }
      }
      var email = form.querySelector("#email");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        setStatus("Please enter a valid email address.", "error");
        email.focus();
        return;
      }

      var key = form.access_key ? form.access_key.value : "";
      if (!key || key.indexOf("[[") === 0) {
        setStatus("This form isn't connected yet. Please email or call us directly using the links below.", "error");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("Sending your request…", "success");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            setStatus("Thank you — your request is in. We'll be in touch shortly.", "success");
            form.reset();
          } else {
            setStatus("Something went wrong. Please email or call us directly using the links below.", "error");
          }
        })
        .catch(function () {
          setStatus("Network error. Please email or call us directly using the links below.", "error");
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }
})();
