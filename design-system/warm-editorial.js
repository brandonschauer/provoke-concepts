/* ============================================================
   WARM EDITORIAL — optional progressive enhancements
   - reveal-on-scroll for any [data-reveal] element
   - click-to-zoom lightbox for any [data-zoom] image (mouse or keyboard)
   Load with: <script src="warm-editorial.js" defer></script>
   Everything degrades gracefully if this file is absent.
   ============================================================ */
(function () {
  var root = document.documentElement;
  root.classList.add('js'); // enables the hidden reveal state only when JS is present

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---- Click-to-zoom lightbox ---- */
  var zoomables = document.querySelectorAll('[data-zoom]');
  if (zoomables.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Zoomed image');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
      '<img class="lightbox__img" alt="">';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var closeBtn = lb.querySelector('.lightbox__close');
    var opener = null; // the image to hand focus back to on close

    function open(src, alt) {
      lbImg.src = src; lbImg.alt = alt || '';
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      lb.scrollTop = 0;
      document.body.classList.add('has-lightbox');
      closeBtn.focus();
    }
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-lightbox');
      lbImg.removeAttribute('src');
      if (opener) { opener.focus(); opener = null; }
    }

    zoomables.forEach(function (img) {
      img.classList.add('media--zoom');
      // make the image itself a keyboard control (keeps layout untouched, unlike wrapping it)
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      function zoom() { opener = img; open(img.currentSrc || img.src, img.alt); }
      img.addEventListener('click', zoom);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zoom(); }
      });
    });
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); }); // click the dim area
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      // the close button is the dialog's only control, so keep Tab on it
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  }
})();
