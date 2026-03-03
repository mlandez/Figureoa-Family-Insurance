/* ========================================
   FIGUEROA FAMILY INSURANCE — Shared JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navCenter = document.querySelector('.nav-center');
  if (toggle && navCenter) {
    toggle.addEventListener('click', () => {
      navCenter.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    // Close on link click
    navCenter.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navCenter.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Sticky Nav Shadow ---
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question-row').forEach(row => {
    row.addEventListener('click', () => {
      const item = row.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item.active').forEach(open => {
        if (open !== item) open.classList.remove('active');
      });

      // Toggle clicked item
      item.classList.toggle('active', !isOpen);
    });
  });

  // --- Careers Tab Switcher ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      // Update buttons
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update content
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const el = document.getElementById(target);
      if (el) el.classList.add('active');
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animEls = document.querySelectorAll('.fade-up');
  if (animEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => observer.observe(el));
  }

  // --- Contact Form Handling ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send (replace with actual backend endpoint)
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#5E7A29';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // --- Careers Application Form ---
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
    // Show/hide military fields
    const veteranSelect = document.getElementById('veteranStatus');
    const militaryFields = document.getElementById('militaryFields');
    if (veteranSelect && militaryFields) {
      veteranSelect.addEventListener('change', () => {
        militaryFields.style.display = veteranSelect.value === 'yes' ? 'block' : 'none';
      });
    }

    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = careerForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Application Submitted!';
        btn.style.background = '#5E7A29';
        careerForm.reset();
        if (militaryFields) militaryFields.style.display = 'none';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // --- Blog Category Filter ---
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  if (filterBtns.length) {
    const blogCards = document.querySelectorAll('.blog-card[data-category]');
    const blogFeatured = document.querySelector('.blog-featured[data-category]');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter featured post
        if (blogFeatured) {
          if (filter === 'all' || blogFeatured.dataset.category === filter) {
            blogFeatured.style.opacity = '1';
            blogFeatured.style.transform = 'translateY(0)';
            blogFeatured.style.maxHeight = '600px';
            blogFeatured.style.marginBottom = '48px';
            blogFeatured.style.overflow = 'visible';
          } else {
            blogFeatured.style.opacity = '0';
            blogFeatured.style.transform = 'translateY(-10px)';
            blogFeatured.style.maxHeight = '0';
            blogFeatured.style.marginBottom = '0';
            blogFeatured.style.overflow = 'hidden';
          }
        }

        // Filter cards with staggered animation
        let delay = 0;
        blogCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            setTimeout(() => {
              card.style.display = '';
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
              });
            }, delay);
            delay += 60;
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px) scale(0.97)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });

    // Add transition styles to filterable elements
    blogCards.forEach(card => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    if (blogFeatured) {
      blogFeatured.style.transition = 'opacity 0.35s ease, transform 0.35s ease, max-height 0.4s ease, margin-bottom 0.4s ease';
    }
  }

  // --- Blog Newsletter Form ---
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('.blog-newsletter__btn');
      const input = newsletterForm.querySelector('.blog-newsletter__input');
      const original = btn.textContent;
      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#5E7A29';
        input.value = '';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
