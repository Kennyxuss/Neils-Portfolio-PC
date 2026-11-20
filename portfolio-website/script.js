/**
 * NovaFolio - Modular Application Scripts
 * Author: Original Bespoke Architecture
 * Version: 2.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initNavigationScrollSpy();
  initThemeAndAccentEngine();
  initTimelineTabs();
  initAwardHistoryNav();
  initFilterEngines();
  initProjectsScrollReveal();
  initTestimonialsScrollReveal();
  initTestimonialCarousel();
  initProjectModal();
  initCertificateLightbox();
  initNovaBotAI();
  initContactFormAndClipboard();
  initBackToTop();
});

/* ==========================================================================
   1. TYPING ANIMATION (Typed.js)
   ========================================================================== */
function initTypingAnimation() {
  const typingTarget = document.getElementById('heroTyping');
  if (typingTarget && typeof Typed !== 'undefined') {
    new Typed('#heroTyping', {
      strings: [
        'Web Application Developer',
        'Software Developer',
        'UI/UX Designer',
        'Computer Systems Technician',
        'Application Developer'
      ],
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 2000,
      loop: true,
      cursorChar: '|'
    });
  }
}

/* ==========================================================================
   2. STICKY HEADER & SCROLLSPY
   ========================================================================== */
function initNavigationScrollSpy() {
  const header = document.getElementById('header');
  const navMenu = document.getElementById('navMenu');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileToggleBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggleBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !mobileToggleBtn.contains(e.target)) {
        mobileToggleBtn.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Scroll handler for header shadow & ScrollSpy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background elevation
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link detection
    const scrollPosition = scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   3. THEME & ACCENT PALETTE ENGINE
   ========================================================================== */
function initThemeAndAccentEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const paletteToggleBtn = document.getElementById('paletteToggleBtn');
  const accentDrawer = document.getElementById('accentDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const swatches = document.querySelectorAll('.accent-swatch');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('novafolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Load saved accent or default to violet
  const savedAccent = localStorage.getItem('novafolio-accent') || 'violet';
  document.documentElement.setAttribute('data-accent', savedAccent);
  updateActiveSwatch(savedAccent);

  // Toggle Dark/Light Mode
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('novafolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // Accent Drawer Controls
  if (paletteToggleBtn && accentDrawer) {
    paletteToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accentDrawer.classList.toggle('open');
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        accentDrawer.classList.remove('open');
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!accentDrawer.contains(e.target) && e.target !== paletteToggleBtn) {
        accentDrawer.classList.remove('open');
      }
    });
  }

  // Accent Selection
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const selectedAccent = swatch.getAttribute('data-accent-color');
      document.documentElement.setAttribute('data-accent', selectedAccent);
      localStorage.setItem('novafolio-accent', selectedAccent);
      updateActiveSwatch(selectedAccent);
    });
  });

  function updateActiveSwatch(accent) {
    swatches.forEach(s => {
      if (s.getAttribute('data-accent-color') === accent) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. DUAL-TRACK TIMELINE TABS
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.t-tab-btn');
  const tracks = {
    experience: document.getElementById('experienceTrack'),
    education: document.getElementById('educationTrack')
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-timeline-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      Object.keys(tracks).forEach(key => {
        if (tracks[key]) {
          if (key === target) {
            tracks[key].classList.add('active');
          } else {
            tracks[key].classList.remove('active');
          }
        }
      });
    });
  });
}

/* ==========================================================================
   4b. NEIL'S AWARD HISTORY TABBED CATEGORY NAVIGATION
   ========================================================================== */
function initAwardHistoryNav() {
  const navBtns = document.querySelectorAll('.award-nav-btn');
  const categoryGroups = document.querySelectorAll('.award-category-group');

  if (navBtns.length === 0 || categoryGroups.length === 0) return;

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-award-target');
      if (!targetId) return;

      // Update button active state
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Switch active category panel with smooth transition
      categoryGroups.forEach(group => {
        if (group.id === targetId || group.getAttribute('data-award-group') === targetId) {
          group.classList.add('active');
        } else {
          group.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   5. FILTER ENGINES (Skills & Projects)
   ========================================================================== */
function initFilterEngines() {
  // Skills Filtering
  const skillPills = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      skillPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-skill-filter');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Projects Filtering with Smooth Transitions
  const projectPills = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  projectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('active')) return;

      projectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-project-filter');
      let visibleIndex = 0;

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const matches = (filter === 'all' || filter === cat);

        if (matches) {
          card.style.display = 'flex';
          // Ensure element is painted before removing filter-hidden
          requestAnimationFrame(() => {
            card.style.transitionDelay = `${visibleIndex * 80}ms`;
            card.classList.remove('filter-hidden');
            card.classList.add('revealed');
            visibleIndex++;
          });
        } else {
          card.classList.add('filter-hidden');
          // Wait for transition to complete before setting display none
          setTimeout(() => {
            if (card.classList.contains('filter-hidden')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5b. PROJECTS SCROLL REVEAL ENTRANCE ANIMATION (One-time, hardware-accelerated)
   ========================================================================== */
function initProjectsScrollReveal() {
  const sectionHeading = document.querySelector('.projects-section .section-heading');
  const filterPills = document.querySelector('.projects-section .filter-pills-wrapper');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  if (!('IntersectionObserver' in window)) {
    // Fallback if IntersectionObserver is not supported
    if (sectionHeading) sectionHeading.classList.add('revealed');
    if (filterPills) filterPills.classList.add('revealed');
    projectCards.forEach(card => card.classList.add('revealed'));
    return;
  }

  // Header & Filter observer
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate once only
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  });

  if (sectionHeading) headingObserver.observe(sectionHeading);
  if (filterPills) headingObserver.observe(filterPills);

  // Staggered cards reveal observer
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('revealed');
        observer.unobserve(card); // Animate once only; never replay when scrolling away
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  projectCards.forEach((card, index) => {
    // Assign staggered delay for the initial reveal
    card.style.transitionDelay = `${(index % 3) * 120}ms`;
    cardObserver.observe(card);
  });
}

/* ==========================================================================
   5c. TESTIMONIALS SCROLL REVEAL & STAGGERED ENTRANCE (One-time only)
   ========================================================================== */
function initTestimonialsScrollReveal() {
  const sectionHeading = document.querySelector('.testimonials-section .section-heading');
  const cards = document.querySelectorAll('#testimonialsTrack .testimonial-card');

  if (!sectionHeading && cards.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    if (sectionHeading) sectionHeading.classList.add('revealed');
    cards.forEach(card => card.classList.add('revealed'));
    return;
  }

  // Section Heading Observer
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  });

  if (sectionHeading) headingObserver.observe(sectionHeading);

  // Staggered Cards Observer
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('revealed');
        observer.unobserve(card); // Animate once only
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach((card, index) => {
    // Staggered delay for each card (e.g. 0ms, 150ms, 300ms)
    card.style.transitionDelay = `${(index % 3) * 150}ms`;
    cardObserver.observe(card);
  });
}

/* ==========================================================================
   5d. TESTIMONIALS CAROUSEL ENGINE (Continuous Horizontal Track Sliding)
   ========================================================================== */
function initTestimonialCarousel() {
  const container = document.getElementById('testimonialCarousel');
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const miniPrevBtn = document.getElementById('carouselMiniPrevBtn');
  const miniNextBtn = document.getElementById('carouselMiniNextBtn');
  const pageCurrent = document.getElementById('carouselPageCurrent');
  const pageTotal = document.getElementById('carouselPageTotal');
  const cards = Array.from(document.querySelectorAll('#testimonialsTrack .testimonial-card'));

  if (!container || !track || cards.length === 0) return;

  // Track state
  let currentIndex = 0; // Index of the first visible card on the left
  let isAnimating = false;
  const animationDuration = 600; // ms

  // Calculate cards visible at once based on viewport width
  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1100) return 2;
    return 3;
  }

  function getMaxIndex() {
    const visibleCount = getVisibleCardsCount();
    return Math.max(0, cards.length - visibleCount);
  }

  function getTotalPages() {
    return getMaxIndex() + 1;
  }

  // Update track horizontal position and navigation indicators
  function updateCarouselView(triggerBump = true) {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) {
      currentIndex = maxIdx;
    }

    const totalPages = getTotalPages();
    if (pageTotal) {
      pageTotal.textContent = String(totalPages).padStart(2, '0');
    }

    // Update pagination indicator text with bump animation
    if (pageCurrent) {
      pageCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
      if (triggerBump) {
        pageCurrent.classList.remove('page-bump');
        void pageCurrent.offsetWidth; // Force reflow
        pageCurrent.classList.add('page-bump');
      }
    }

    // Compute exact offset percentage for single card + gap shift
    // For N visible cards, each card width is (100% - (N-1)*gap)/N.
    // Shifting by 1 card distance = cardWidth + gap = (100% + gap)/N.
    const visibleCount = getVisibleCardsCount();
    let cardOffsetPercent = 0;
    if (visibleCount === 3) {
      cardOffsetPercent = (100 + 4.8) / 3; // (100% + 48px gap) / 3 ≈ 34.933%
    } else if (visibleCount === 2) {
      cardOffsetPercent = (100 + 2.4) / 2; // (100% + 24px gap) / 2 = 51.2%
    } else {
      cardOffsetPercent = 100 + 2.4; // 100% + gap on mobile ≈ 102.4%
    }

    // Precise pixel measurement for flawless alignment across all browsers
    if (cards.length > 1) {
      const card0 = cards[0];
      const card1 = cards[1];
      const stepPixels = card1.offsetLeft - card0.offsetLeft;
      if (stepPixels > 0) {
        const targetTranslateX = -(currentIndex * stepPixels);
        track.style.transform = `translateX(${targetTranslateX}px)`;
      } else {
        track.style.transform = `translateX(-${currentIndex * cardOffsetPercent}%)`;
      }
    } else {
      track.style.transform = `translateX(0px)`;
    }

    // Disable / Dim navigation buttons based on current position
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= maxIdx;

    [prevBtn, miniPrevBtn].forEach(btn => {
      if (btn) {
        btn.disabled = isAtStart;
        btn.setAttribute('aria-disabled', String(isAtStart));
      }
    });

    [nextBtn, miniNextBtn].forEach(btn => {
      if (btn) {
        btn.disabled = isAtEnd;
        btn.setAttribute('aria-disabled', String(isAtEnd));
      }
    });

    // Make sure visible cards have .revealed state for full glow
    cards.forEach((card, idx) => {
      if (idx >= currentIndex && idx < currentIndex + visibleCount) {
        card.classList.add('revealed');
      }
    });

    setTimeout(() => {
      isAnimating = false;
    }, animationDuration);
  }

  function triggerButtonPulse(direction) {
    const isNext = direction === 'next';
    const targetBtns = isNext ? [nextBtn, miniNextBtn] : [prevBtn, miniPrevBtn];
    const pulseClass = isNext ? 'btn-pulse-next' : 'btn-pulse-prev';

    targetBtns.forEach(btn => {
      if (btn) {
        btn.classList.remove('btn-pulse-next', 'btn-pulse-prev');
        void btn.offsetWidth; // Force reflow to replay keyframe
        btn.classList.add(pulseClass);
        setTimeout(() => {
          btn.classList.remove(pulseClass);
        }, 450);
      }
    });
  }

  function goToNext() {
    if (isAnimating) return;
    const maxIdx = getMaxIndex();
    if (currentIndex < maxIdx) {
      isAnimating = true;
      triggerButtonPulse('next');
      currentIndex++;
      updateCarouselView(true);
    }
  }

  function goToPrev() {
    if (isAnimating) return;
    if (currentIndex > 0) {
      isAnimating = true;
      triggerButtonPulse('prev');
      currentIndex--;
      updateCarouselView(true);
    }
  }

  // Attach button click events
  if (prevBtn) prevBtn.addEventListener('click', goToPrev);
  if (nextBtn) nextBtn.addEventListener('click', goToNext);
  if (miniPrevBtn) miniPrevBtn.addEventListener('click', goToPrev);
  if (miniNextBtn) miniNextBtn.addEventListener('click', goToNext);

  // Touch Swipe Support for Mobile & Tablets (iOS & Android)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const minSwipeDistance = 45;

  track.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }
  }, { passive: true });

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Ensure horizontal gesture is intentional and greater than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) >= minSwipeDistance) {
      if (diffX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }

  // Keyboard navigation when carousel container or cards are focused
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      goToPrev();
    }
  });

  // Handle window resizing without sudden visual glitches
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      track.style.transition = 'none'; // Temporarily disable transition during resize
      updateCarouselView(false);
      // Restore transition after repositioning
      setTimeout(() => {
        track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
      }, 50);
    }, 100);
  });

  // Initial setup
  track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
  updateCarouselView(false);
}

/* ==========================================================================
   6. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const backdrop = document.getElementById('modalBackdrop');
  const viewBtns = document.querySelectorAll('.view-details-btn');

  const modalImg = document.getElementById('modalProjectImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalDesc = document.getElementById('modalDescription');
  const modalTagsList = document.getElementById('modalTagsList');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title');
      const category = btn.getAttribute('data-category');
      const desc = btn.getAttribute('data-desc');
      const metrics = btn.getAttribute('data-metrics');
      const tags = (btn.getAttribute('data-tags') || '').split(',');
      const img = btn.getAttribute('data-img');

      modalTitle.textContent = title;
      modalCategory.textContent = category;
      modalDesc.textContent = desc;
      modalMetrics.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${metrics}`;
      modalImg.setAttribute('src', img);

      // Render tags
      modalTagsList.innerHTML = '';
      tags.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t.trim();
        modalTagsList.appendChild(span);
      });

      openModal();
    });
  });

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CERTIFICATE LIGHTBOX MODAL
   ========================================================================== */
function openCertModal(imgSrc, title, desc) {
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalDesc = document.getElementById('certModalDesc');

  if (certModal && certModalImg) {
    certModalImg.src = imgSrc;
    certModalTitle.textContent = title;
    certModalDesc.textContent = desc;
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function initCertificateLightbox() {
  const certModal = document.getElementById('certModal');
  const closeCertBtn = document.getElementById('closeCertBtn');
  const certBackdrop = document.getElementById('certBackdrop');

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
  if (certBackdrop) certBackdrop.addEventListener('click', closeCertModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });

  // Enable keyboard trigger (Enter/Space) for accessible cert-cards
  document.querySelectorAll('.cert-card[tabindex="0"]').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/* ==========================================================================
   8. AI PORTFOLIO ASSISTANT (NovaBot)
   ========================================================================== */
function initNovaBotAI() {
  const widgetContainer = document.querySelector('.chatbot-widget-container');
  const launcherBtn = document.getElementById('chatbotLauncherBtn');
  const minimizeBtn = document.getElementById('chatMinimizeBtn');
  const chatMessagesBox = document.getElementById('chatMessagesBox');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!widgetContainer || !launcherBtn) return;

  // Toggle chat window
  launcherBtn.addEventListener('click', () => {
    widgetContainer.classList.toggle('open');
    if (widgetContainer.classList.contains('open')) {
      setTimeout(() => chatInput.focus(), 300);
    }
  });

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      widgetContainer.classList.remove('open');
    });
  }

  // Quick Chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      handleUserQuery(prompt);
    });
  });

  // Form submit
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      handleUserQuery(message);
      chatInput.value = '';
    });
  }

  function handleUserQuery(query) {
    // Append user outgoing message
    appendMessage(query, 'outgoing');

    // Show bot typing indicator
    const typingIndicator = appendTypingIndicator();

    // Generate response after small simulated delay
    setTimeout(() => {
      typingIndicator.remove();
      const responseHtml = getNovaBotResponse(query);
      appendMessage(responseHtml, 'incoming');
    }, 550);
  }

  function appendMessage(content, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${type}`;

    if (type === 'incoming') {
      msgDiv.innerHTML = `
        <div class="msg-bot-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-bubble"><p>${content}</p></div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="msg-bubble"><p>${escapeHtml(content)}</p></div>
      `;
    }

    chatMessagesBox.appendChild(msgDiv);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    return msgDiv;
  }

  function appendTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'chat-message incoming';
    indicatorDiv.innerHTML = `
      <div class="msg-bot-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>
    `;
    chatMessagesBox.appendChild(indicatorDiv);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    return indicatorDiv;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Intelligent Response Matrix
  function getNovaBotResponse(rawText) {
    const query = rawText.toLowerCase().replace(/[^\w\s]/gi, ' ');
    const has = (...words) => words.some(w => query.includes(w));

    // 1. Identity / Name / Who
    if (has('who', 'alex', 'name', 'author', 'creator', 'developer', 'about')) {
      return `<strong>Alex Rivera</strong> is a Senior Full-Stack Software Engineer &amp; AI Solutions Architect with 5+ years of experience building scalable web apps, resilient backend APIs, and automated AI pipelines.`;
    }

    // 2. Tech Stack & Skills
    if (has('stack', 'tech', 'skills', 'languages', 'tools', 'frontend', 'backend', 'react', 'next', 'python', 'fastapi', 'typescript', 'docker', 'database')) {
      return `Alex's core engineering toolkit covers:<br><br>
        • <strong>Frontend</strong>: TypeScript, Next.js 14/15, React, TailwindCSS, Vue<br>
        • <strong>Backend &amp; APIs</strong>: Node.js, Python (FastAPI), Go, REST &amp; GraphQL<br>
        • <strong>Databases &amp; Cloud</strong>: PostgreSQL, MySQL, Redis, AWS, Docker, Kubernetes<br>
        • <strong>AI Integration</strong>: LangChain, PgVector, OpenAI API, RAG workflows`;
    }

    // 3. Featured Projects
    if (has('project', 'portfolio', 'work', 'sample', 'apps', 'nexusflow', 'hyperscale', 'omnipulse', 'zenith', 'cryptosphere')) {
      return `Alex has engineered 35+ production applications, including:<br><br>
        • 🚀 <strong>NexusFlow AI</strong>: Autonomous LLM knowledge engine with RAG<br>
        • 🛒 <strong>HyperScale POS</strong>: Distributed retail &amp; inventory platform with offline sync<br>
        • 📡 <strong>OmniPulse</strong>: High-frequency Kubernetes infrastructure telemetry<br>
        • 🏥 <strong>Zenith Health</strong>: Encrypted WebRTC telehealth mobile application<br>
        • 📈 <strong>CryptoSphere</strong>: Algorithmic trading terminal with live orderbook feeds<br><br>
        Explore them with interactive modal previews in the <strong>Projects</strong> section!`;
    }

    // 4. Experience & Career
    if (has('experience', 'career', 'job', 'background', 'history', 'senior', 'lead', 'years')) {
      return `Alex brings <strong>5+ years</strong> of hands-on software engineering experience:<br><br>
        • <strong>2023 - Present</strong>: Lead Full-Stack &amp; AI Engineer at NovaTech Solutions<br>
        • <strong>2021 - 2023</strong>: Senior Systems &amp; Web Developer at Apex Digital Ventures<br>
        • <strong>2019 - 2021</strong>: Full-Stack Consultant for enterprise and startup clients`;
    }

    // 5. Services Offered
    if (has('service', 'offer', 'build', 'create', 'hire', 'capability', 'can you')) {
      return `Alex offers end-to-end software consulting and development:<br><br>
        1. Custom Web Applications (Next.js / React)<br>
        2. Backend &amp; Scalable REST/GraphQL APIs<br>
        3. AI Integration &amp; Intelligent Workflow Automation<br>
        4. Relational Database Modeling &amp; Index Tuning<br>
        5. Cross-Platform Mobile Solutions (iOS &amp; Android)<br>
        6. Cloud Deployment, Docker &amp; CI/CD Pipelines`;
    }

    // 6. Rates, Pricing, Availability
    if (has('rate', 'rates', 'price', 'pricing', 'cost', 'quote', 'freelance', 'available', 'hire')) {
      return `Alex is currently <strong>available for select contract engagements, consulting, and senior engineering roles</strong>.<br><br>
        Pricing depends on project scope, architecture requirements, and timeline. You can submit an inquiry through the <strong>Contact</strong> form or directly via email for a tailored proposal!`;
    }

    // 7. Contact Details
    if (has('contact', 'email', 'reach', 'message', 'phone', 'location', 'call', 'talk')) {
      return `Here is how you can connect with Alex directly:<br><br>
        📧 <strong>Email</strong>: alex.rivera.dev@example.com<br>
        📍 <strong>Location</strong>: San Francisco, CA (Remote Global)<br>
        ⚡ <strong>Response Time</strong>: Within 12 hours<br><br>
        Or use the interactive form in the <strong>Contact</strong> section!`;
    }

    // 8. Credentials & Education
    if (has('education', 'degree', 'cert', 'certificate', 'credential', 'aws', 'gcp', 'meta', 'school', 'tcc', 'torres')) {
      return `Here is an overview of the educational background and milestones:<br><br>
        • 🎓 <strong>2026 - 2027 (Ongoing)</strong>: Bachelor of Science in Information Technology (BSIT) at Torres Capitol College (TCC)<br>
        • 🏛️ <strong>2023 - 2024 (Graduate • With High Honor)</strong>: General Academic Strand (GAS) at San Isidro High School (SIHS)<br>
        • 🏫 <strong>2016 - 2017 (Graduate • With High Honor)</strong>: Elementary Edition School at Kadingilan Central Elementary School<br>
        • 🎒 <strong>2010 - 2011 (Graduate)</strong>: Day-Care Center Edition School at Children's Bible Club School (CBCS)<br><br>
        Plus verified industry credentials: AWS Solutions Architect, Google Cloud Developer, Meta Full-Stack Engineer, and DeepLearning.AI Systems Architect.`;
    }

    // 9. Greetings & Small Talk
    if (has('hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'sup', 'yo')) {
      return `Hello! 👋 How can I assist you with your software development needs today? Feel free to ask about Alex's skills, past projects, or schedule a consultation.`;
    }

    if (has('thanks', 'thank you', 'awesome', 'great', 'cool')) {
      return `You're very welcome! 😊 Let me know if you have any other questions or if you'd like to get in touch with Alex.`;
    }

    // Default Fallback
    return `Thank you for asking! I can answer anything about Alex Rivera's portfolio:<br><br>
      • 💻 <strong>Tech Stack &amp; Skills</strong><br>
      • 🚀 <strong>Featured Projects &amp; Case Studies</strong><br>
      • 💼 <strong>Career Experience</strong><br>
      • 🛠️ <strong>Services Offered</strong><br>
      • 📬 <strong>Contact Information &amp; Availability</strong><br><br>
      What would you like to know more about?`;
  }
}

/* ==========================================================================
   9. CONTACT FORM & CLIPBOARD COPY
   ========================================================================== */
function initContactFormAndClipboard() {
  const form = document.getElementById('contactForm');
  const copyBtns = document.querySelectorAll('.copy-btn');

  // Copy buttons
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHtml = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          btn.style.color = '#10b981';
          btn.style.borderColor = '#10b981';
          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const message = document.getElementById('userMessage').value.trim();
      const submitBtn = document.getElementById('submitFormBtn');

      if (!name || !email || !message) {
        alert('Please fill out all required fields before submitting.');
        return;
      }

      // Simulate sending feedback
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Inquiry...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Dispatched!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          alert(`Thank you, ${name}! Your inquiry has been received. Alex will respond to ${email} within 12 hours.`);
          form.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 800);
      }, 1200);
    });
  }
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
