
document.addEventListener('DOMContentLoaded', () => {
  
  // ── HEADER SCROLL EFFECT ──
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ── MOBILE MENU TOGGLE ──
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks.querySelectorAll('a');
  
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  menuToggle.addEventListener('click', toggleMenu);
  
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // ── FEELING CARDS INTERACTION ──
  const feelingCards = document.querySelectorAll('.feeling-card');
  feelingCards.forEach(card => {
    card.addEventListener('click', () => {
      const feeling = card.dataset.feeling;
      const feelingMap = {
        'burned-out': 'The Reset',
        'romance': 'The Love Story',
        'fun': 'The Celebration',
        'adventure': 'The Challenge',
        'peace': 'The Soul Journey',
        'family': 'Family Experience Collection',
        'team': 'Corporate Retreat',
        'healing': 'The Reset + Grief Healing'
      };
      
      // Smooth scroll to experiences section
      const experiencesSection = document.getElementById('experiences');
      if (experiencesSection) {
        experiencesSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Optional: Show a toast notification
      showToast(`Exploring: ${feelingMap[feeling] || 'Custom Experience'}`);
    });
  });

  // Toast notification function
  function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">✨</span>
      <span>${message}</span>
    `;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--navy);
      color: var(--white);
      padding: 14px 28px;
      border-radius: 50px;
      font-size: 0.95rem;
      font-weight: 600;
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      opacity: 0;
      transition: all 0.4s ease;
      border: 1px solid rgba(201, 168, 76, 0.2);
    `;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // ── EXPERIENCE QUIZ ──
  const quizForm = document.getElementById('experience-quiz');
  const quizOptions = document.querySelectorAll('.quiz-opt');
  let quizAnswers = {};
  
  quizOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const qNum = opt.dataset.q;
      const val = opt.dataset.val;
      
      // Remove selected from siblings
      document.querySelectorAll(`.quiz-opt[data-q="${qNum}"]`).forEach(sibling => {
        sibling.classList.remove('selected');
      });
      
      // Add selected to clicked
      opt.classList.add('selected');
      quizAnswers[qNum] = val;
    });
  });
  
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('quiz-submit');
      const name = quizForm.querySelector('input[name="name"]').value;
      
      // Visual feedback
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Analyzing Your Vibes... ✨';
      
      // Determine result based on answers
      let resultName = 'The Custom Experience';
      let resultDesc = 'Based on your unique combination of answers, our Experience Architects will craft something truly special just for you.';
      
      const q1 = quizAnswers['1'];
      const q2 = quizAnswers['2'];
      
      if (q1 === 'burned-out') {
        resultName = 'The Reset';
        resultDesc = 'You need a complete digital detox in the Swiss Alps with meditation, forest bathing, and spa therapy. Silence is your medicine.';
      } else if (q1 === 'romantic') {
        resultName = 'The Love Story';
        resultDesc = 'A romantic escape to the Maldives with overwater bungalows, private dinners, and sunsets painted just for you two.';
      } else if (q1 === 'adventurous') {
        resultName = 'The Challenge';
        resultDesc = 'High-altitude treks through the Himalayas, white-water rafting, and expedition camping. Push your boundaries.';
      } else if (q1 === 'celebratory') {
        resultName = 'The Celebration';
        resultDesc = 'Beach parties under starlit skies, exclusive yacht experiences, and festival immersions. Celebrate life loudly.';
      }
      
      if (q2 === 'solo') {
        resultDesc += ' Designed as a solo journey for deep personal transformation.';
      } else if (q2 === 'partner') {
        resultDesc += ' Perfectly crafted for you and your partner to create memories worth retelling.';
      } else if (q2 === 'family') {
        resultDesc += ' Family-friendly with activities for all ages to create legendary memories.';
      } else if (q2 === 'team') {
        resultName = 'Corporate Retreat';
        resultDesc = 'A team bonding experience designed to transform colleagues into allies and strangers into friends.';
      }
      
      setTimeout(() => {
        const quizResult = document.getElementById('quiz-result');
        const resultNameEl = document.getElementById('result-name');
        const resultDescEl = document.getElementById('result-desc');
        
        if (quizResult && resultNameEl && resultDescEl) {
          quizForm.style.display = 'none';
          quizResult.style.display = 'block';
          resultNameEl.textContent = resultName;
          resultDescEl.textContent = resultDesc;
          
          quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1500);
    });
  }

  // ── FORM SUBMISSION HANDLING ──
  const travelForm = document.getElementById('travel-booking-form');
  
  if (travelForm) {
    travelForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-btn');
      const formData = new FormData(travelForm);
      const name = formData.get('name');
      const experience = formData.get('experience');
      const phone = formData.get('phone');
      
      // Visual feedback on button
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Designing Your Experience... ⏳';
      
      setTimeout(() => {
        const formCard = travelForm.closest('.contact-form-card');
        const cardHeight = formCard.offsetHeight;
        formCard.style.minHeight = `${cardHeight}px`;
        
        formCard.innerHTML = `
          <div style="text-align: center; padding: 50px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <div style="font-size: 4.5rem; margin-bottom: 24px; animation: bounceSuccess 1s ease;">🎉</div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--navy); margin-bottom: 18px;">Experience Request Sent!</h3>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; max-width: 500px; margin-bottom: 32px;">
              Thank you, <strong>${name}</strong>! We've received your request for <strong>${experience || 'a custom experience'}</strong>. 
              Our Experience Architects will contact you at <strong>${phone}</strong> within 2-4 business hours with a personalized design.
            </p>
            <button onclick="window.location.reload();" class="btn btn-primary">Design Another Experience</button>
          </div>
        `;
        
        // Add bounce animation
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`
          @keyframes bounceSuccess {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }
        `, styleSheet.cssRules.length);
        
      }, 1500);
    });
  }

  // ── SCROLL REVEAL ANIMATION ──
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });
    
    fadeSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    fadeSections.forEach(section => {
      section.classList.add('is-visible');
    });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ── PARALLAX EFFECT FOR HERO ──
  const hero = document.getElementById('hero');
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      hero.style.backgroundPositionY = `${rate}px`;
    });
  }

  // ── NAVBAR ACTIVE STATE ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});