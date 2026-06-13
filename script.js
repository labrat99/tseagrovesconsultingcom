/* Nav: scroll state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* Nav: mobile toggle */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

/* Close mobile nav on link click */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* Scroll-reveal: fade sections in as they enter the viewport */
const revealTargets = document.querySelectorAll(
  '#hero, .card, .pub-item, .testimonial, .about-layout, .contact-layout'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* Contact form: client-side validation + success state */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    ['name', 'email', 'message'].forEach(id => {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });

    const emailField = document.getElementById('email');
    if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    /* Swap form for a thank-you message.
       Wire this up to Formspree, Netlify Forms, or your backend. */
    form.innerHTML = `
      <div style="
        text-align:center;
        padding:2.5rem 1.5rem;
        background:var(--color-accent-lt);
        border-radius:var(--radius);
      ">
        <p style="font-size:1.125rem;font-weight:600;color:var(--color-accent);margin-bottom:.5rem;">
          Message received — thank you!
        </p>
        <p style="font-size:.9375rem;color:var(--color-text-muted);">
          I'll be in touch within one business day.
        </p>
      </div>
    `;
  });

  /* Clear error state on input */
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}
