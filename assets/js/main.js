/* ========================================================
   LAKSHANA BRIDAL STUDIO — Main JavaScript
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================
  // 1. NAVBAR — Scroll Effect (transparent → solid)
  // ========================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a:not(.btn)');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active section highlighting
  function highlightActiveSection() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightActiveSection();
  }, { passive: true });

  // Initial check
  handleNavbarScroll();

  // ========================================================
  // 2. MOBILE MENU — Hamburger Toggle
  // ========================================================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    const navbar = document.getElementById('navbar');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navbar.classList.add('menu-open');
    mobileOverlay.classList.add('active');
    // Small delay so navbar dissolves first, then drawer slides in
    requestAnimationFrame(() => {
      mobileNav.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  }

  function closeMobileMenu() {
    const navbar = document.getElementById('navbar');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    // Remove menu-open after the drawer finishes closing
    setTimeout(() => {
      navbar.classList.remove('menu-open');
      document.body.classList.remove('no-scroll');
    }, 400);
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);



  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ========================================================
  // 3. SMOOTH SCROLL — for anchor links
  // ========================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.offsetTop - 80; // navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // ========================================================
  // 4. AOS — Initialize Animate on Scroll
  // ========================================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      },
    });
  }

  // ========================================================
  // 5. SWIPER — Testimonials Carousel
  // ========================================================
  if (typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      },
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
        paginationBulletMessage: 'Go to testimonial {{index}}',
      },
    });

    // Pause autoplay when not visible (performance)
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              testimonialSwiper.autoplay.start();
            } else {
              testimonialSwiper.autoplay.stop();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(testimonialSection);
    }
  }

  // ========================================================
  // 6. SCROLL TO TOP — Button
  // ========================================================
  const scrollTopBtn = document.getElementById('scrollTop');

  function handleScrollTop() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollTop, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // ========================================================
  // 7. BUTTON RIPPLE EFFECT
  // ========================================================
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      // Remove existing ripple
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) existingRipple.remove();

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);

      // Clean up after animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // ========================================================
  // 8. CONTACT FORM — Validation & Feedback
  // ========================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // We will allow the native form submission to formsubmit.co
      // Just do some basic UI feedback before the page redirects
      const name = document.getElementById('contact-name');
      const phone = document.getElementById('contact-phone');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');
      let isValid = true;

      // Simple validation
      [name, phone, email, message].forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        } else {
          field.style.borderColor = '#E9DDF5';
        }
      });

      if (!isValid) {
        e.preventDefault(); // Stop submission if invalid
      } else {
        e.preventDefault(); // Stop native HTML form submit
        
        const submitBtn = document.getElementById('contact-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        // Send Email using Python Serverless API
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.value,
            phone: phone.value,
            email: email.value,
            message: message.value
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            Message Sent!
          `;
          submitBtn.style.background = '#27ae60';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 3000);
        })
        .catch(error => {
          console.error("API Error:", error);
          submitBtn.innerHTML = 'Error! Try Again';
          submitBtn.style.background = '#e74c3c';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        });
      }
    });

    // Real-time validation reset
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach((field) => {
      field.addEventListener('input', function () {
        if (this.value.trim()) {
          this.style.borderColor = '#E9DDF5';
        }
      });
    });
  }

  // ========================================================
  // 9. LAZY LOADING — Images with Intersection Observer
  // ========================================================
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Force load by removing lazy loading attribute
            img.removeAttribute('loading');
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            if (img.complete) {
              img.style.opacity = '1';
            } else {
              img.addEventListener('load', () => {
                img.style.opacity = '1';
              });
            }

            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ========================================================
  // 10. GALLERY — Keyboard Accessibility
  // ========================================================
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View larger image');

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Future: open lightbox
      }
    });
  });

  // ========================================================
  // 11. PERFORMANCE — Debounce scroll handlers
  // ========================================================
  // Already using passive listeners above for optimal performance

  // ========================================================
  // 12. HERO SCROLL ANIMATION
  // ========================================================
  const canvas = document.getElementById('heroCanvas');
  const context = canvas?.getContext('2d');
  const heroSection = document.querySelector('.hero');
  const frameCount = 192;
  
  if (canvas && heroSection) {
    const frames = [];
    let imagesLoaded = 0;
    
    const currentFrame = index => (
      `assets/frame/frame_${index.toString().padStart(6, '0')}.jpeg`
    );

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesLoaded++;
        if (i === 0) {
          // Set canvas internal resolution to match the frame exactly
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          // Draw the very first frame immediately once loaded
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
      frames.push(img);
    }

    const updateImage = index => {
      const img = frames[index];
      if (img && img.complete && img.naturalWidth !== 0) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Scroll listener for canvas scrub
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroRect = heroSection.getBoundingClientRect();
          const stickyContainerHeight = window.innerHeight; 
          
          const scrolled = -heroRect.top;
          const maxScroll = heroRect.height - stickyContainerHeight;
          
          if (maxScroll > 0) {
            let scrollFraction = scrolled / maxScroll;
            scrollFraction = Math.max(0, Math.min(1, scrollFraction));
            
            const frameIndex = Math.floor(scrollFraction * (frameCount - 1));
            updateImage(frameIndex);

            // Fade out hero content as user scrolls down
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
              let opacity = 1 - (scrollFraction / 0.3); // Fades out in first 30% of scroll
              opacity = Math.max(0, Math.min(1, opacity));
              heroContent.style.opacity = opacity;
              heroContent.style.transform = `translateY(${(scrollFraction) * 50}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ========================================================
  // 13. DYNAMIC FOOTER YEAR
  // ========================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    // If we want it to say 2026 for now, but auto-update to 2027 later:
    // It's best to always just set it to the actual current year.
    // However, since it is 2026 right now, this will output 2026.
    currentYearSpan.textContent = Math.max(2026, new Date().getFullYear());
  }

  // ========================================================
  // 14. GALLERY VIEW MORE
  // ========================================================
  const galleryViewMoreBtn = document.getElementById('gallery-view-more');
  const galleryGrid = document.querySelector('.gallery-grid');
  
  if (galleryViewMoreBtn && galleryGrid) {
    galleryViewMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      galleryGrid.classList.add('expanded');
      galleryViewMoreBtn.style.display = 'none';
    });
  }
  // 15. GALLERY LIGHTBOX
  // ========================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      });
    });

    // Close lightbox on clicking close button
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300); // Clear image after animation
    });

    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
      }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
      }
    });
  }
});
