// Pequeñas interacciones: enviar formulario y notificar
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Mensaje enviado (demo). Gracias!');
    form.reset();
  });

  // Simple scroll-reveal
  const reveals = document.querySelectorAll('.reveal');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.15});

  reveals.forEach(r => obs.observe(r));

  // CV eye pulse animation
  const eye = document.querySelector('.cv-eye');
  if (eye) {
    setInterval(() => {
      // include translateX(-50%) so the centering transform isn't lost during the animation
      eye.animate([
        { transform: 'translateX(-50%) scale(1)' },
        { transform: 'translateX(-50%) scale(1.06)' },
        { transform: 'translateX(-50%) scale(1)' }
      ], { duration: 1800, easing: 'ease-in-out' });
    }, 2200);
  }

  /* PDF preview modal behavior */
  const pdfModal = document.getElementById('pdfModal');
  const pdfIframe = document.getElementById('pdfPreview');
  const closeBtn = pdfModal ? pdfModal.querySelector('.pdf-modal__close') : null;

  function openPdfModal(url){
    if (!pdfModal) return;
    pdfIframe.src = url;
    pdfModal.setAttribute('aria-hidden','false');
    // save focus
    const active = document.activeElement;
    pdfModal._returnFocus = active;
    // focus first focusable (close button)
    closeBtn && closeBtn.focus();
    // prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closePdfModal(){
    if (!pdfModal) return;
    pdfModal.setAttribute('aria-hidden','true');
    pdfIframe.src = '';
    document.body.style.overflow = '';
    if (pdfModal._returnFocus) pdfModal._returnFocus.focus();
  }

  // bind eye clicks
  const eyeBtn = document.querySelector('.cv-eye');
  if (eyeBtn){
    eyeBtn.addEventListener('click', () => {
      const pdf = eyeBtn.getAttribute('data-pdf') || 'Curriculum Anna Arenas 2025.pdf';
      openPdfModal(pdf);
    });
    eyeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        const pdf = eyeBtn.getAttribute('data-pdf') || 'Curriculum Anna Arenas 2025.pdf';
        openPdfModal(pdf);
      }
    });
  }

  // bind any 'preview-cv' buttons (e.g. 'Visualizar completo') to open the same modal
  const previewBtns = document.querySelectorAll('.preview-cv');
  if (previewBtns.length){
    previewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pdf = btn.getAttribute('data-pdf') || 'Curriculum Anna Arenas 2025.pdf';
        openPdfModal(pdf);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const pdf = btn.getAttribute('data-pdf') || 'Curriculum Anna Arenas 2025.pdf';
          openPdfModal(pdf);
        }
      });
    });
  }

  // close handlers
  if (closeBtn) closeBtn.addEventListener('click', closePdfModal);
  pdfModal && pdfModal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closePdfModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.getAttribute('aria-hidden') === 'false') closePdfModal();
  });

  // Tech graphic: animate horizontal bars when visible
  const techItems = document.querySelectorAll('.tech-graphic__item');
  if (techItems.length){
    const animateBar = (item) => {
      const value = Number(item.getAttribute('data-value')) || 0;
      const fill = item.querySelector('.bar-fill');
      if (fill){
        fill.style.width = value + '%';
        // optional: set aria attributes for accessibility
        fill.setAttribute('role','progressbar');
        fill.setAttribute('aria-valuenow', String(value));
        fill.setAttribute('aria-valuemin','0');
        fill.setAttribute('aria-valuemax','100');
      }
    };

    const techObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateBar(entry.target);
          techObs.unobserve(entry.target);
        }
      });
    }, {threshold:0.2});

    techItems.forEach(t => techObs.observe(t));
  }

  // Vertical bar chart animation
  const barItems = document.querySelectorAll('.bar-item');
  if (barItems.length){
    const animateBarVert = (item) => {
      const value = Number(item.getAttribute('data-value')) || 0;
      const fill = item.querySelector('.vbar-fill');
      const valueLabel = item.querySelector('.bar-value');
      if (fill){
        fill.style.height = value + '%';
      }
      if (valueLabel) valueLabel.textContent = value + '%';
    };

    const barObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateBarVert(entry.target);
          barObs.unobserve(entry.target);
        }
      });
    }, {threshold:0.2});

    barItems.forEach(b => barObs.observe(b));
  }

});
