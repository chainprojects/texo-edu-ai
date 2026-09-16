// NokriAi - Interactive Platform Script

document.addEventListener('DOMContentLoaded', () => {
  // 0. Hero Quick AI Job Search Interactivity
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const heroJobInput = document.getElementById('hero-job-input');
  
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const query = heroJobInput ? heroJobInput.value.toLowerCase() : '';
      const engineSection = document.getElementById('placement-engine');
      const roleSelect = document.getElementById('role-select');
      
      if (roleSelect && query) {
        if (query.includes('data') || query.includes('ai') || query.includes('ml') || query.includes('python')) {
          roleSelect.value = 'data';
        } else if (query.includes('cloud') || query.includes('devops') || query.includes('aws') || query.includes('docker')) {
          roleSelect.value = 'cloud';
        } else if (query.includes('fullstack') || query.includes('mern') || query.includes('react')) {
          roleSelect.value = 'fullstack';
        } else {
          roleSelect.value = 'software';
        }
        // Trigger match update
        roleSelect.dispatchEvent(new Event('change'));
      }
      
      if (engineSection) {
        engineSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 1. Navbar Scroll & Mobile Menu Toggle
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. AI Placement Matching Engine Simulator
  const roleSelect = document.getElementById('role-select');
  const expSelect = document.getElementById('exp-select');
  const skillsSelect = document.getElementById('skills-select');
  
  const scoreNum = document.getElementById('match-score-num');
  const scoreCircle = document.getElementById('score-circle');
  const jobTitle = document.getElementById('matched-job-title');
  const companyTitle = document.getElementById('matched-company');
  const salaryTitle = document.getElementById('matched-salary');

  const jobPresets = {
    'software': {
      title: 'Full Stack Software Engineer',
      company: 'TechNova Solutions ✔',
      salary: '₹ 8 - 14 LPA',
      baseScore: 94
    },
    'data': {
      title: 'AI & Data Science Specialist',
      company: 'DataGenix Corp ✔',
      salary: '₹ 10 - 18 LPA',
      baseScore: 96
    },
    'cloud': {
      title: 'DevOps & Cloud Engineer',
      company: 'Nexus Cloud Systems ✔',
      salary: '₹ 7 - 12 LPA',
      baseScore: 91
    },
    'fullstack': {
      title: 'Senior MERN Developer',
      company: 'TATA Digital Labs ✔',
      salary: '₹ 9 - 16 LPA',
      baseScore: 95
    }
  };

  function updateMatchResult() {
    if (!roleSelect) return;
    const selectedRole = roleSelect.value || 'software';
    const preset = jobPresets[selectedRole] || jobPresets['software'];
    
    // Add micro variance based on experience selection
    let score = preset.baseScore;
    if (expSelect && expSelect.value === 'fresh') score += 1;
    if (expSelect && expSelect.value === '1-3') score += 2;
    if (score > 99) score = 99;

    scoreNum.textContent = score + '%';
    scoreCircle.style.background = `conic-gradient(var(--primary-cyan) ${score}%, rgba(255,255,255,0.1) 0%)`;
    jobTitle.textContent = preset.title;
    companyTitle.textContent = preset.company;
    salaryTitle.textContent = preset.salary;
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', updateMatchResult);
    if (expSelect) expSelect.addEventListener('change', updateMatchResult);
    if (skillsSelect) skillsSelect.addEventListener('change', updateMatchResult);
  }

  // 3. Interactive Quiz Assessment Preview
  const quizOptions = document.querySelectorAll('.quiz-option');
  const feedbackStatus = document.getElementById('quiz-feedback-status');
  const feedbackExplanation = document.getElementById('quiz-explanation');

  quizOptions.forEach(opt => {
    opt.addEventListener('click', function() {
      // Remove active/correct state from all
      quizOptions.forEach(o => {
        o.classList.remove('correct');
        o.style.borderColor = 'var(--border-color)';
        o.style.background = 'rgba(255,255,255,0.03)';
      });

      this.classList.add('correct');
      const isCorrect = this.dataset.correct === 'true';

      if (isCorrect) {
        feedbackStatus.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> Correct Answer! B. O(log n)';
        feedbackExplanation.textContent = 'Great job! Binary Search repeatedly divides the sorted search space in half, yielding a logarithmic time complexity of O(log n).';
      } else {
        feedbackStatus.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color: #ff4757;"></i> Incorrect Choice';
        feedbackExplanation.textContent = 'Binary Search requires a sorted array and reduces the remaining elements by 50% each step. The correct complexity is O(log n).';
      }
    });
  });

  // 4. Target Persona Filter Tabs
  const personaTabs = document.querySelectorAll('.persona-tab');
  const personaCards = document.querySelectorAll('.persona-card');

  personaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      personaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      personaCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Stat Counter Scroll Trigger
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = stat.dataset.target;
      if (!target) return;

      const numericVal = parseInt(target.replace(/\D/g, ''));
      const suffix = target.replace(/[0-9]/g, '');

      let count = 0;
      const speed = Math.ceil(numericVal / 40);

      const updateCount = () => {
        count += speed;
        if (count >= numericVal) {
          stat.textContent = numericVal + suffix;
        } else {
          stat.textContent = count + suffix;
          setTimeout(updateCount, 30);
        }
      };
      updateCount();
    });
  }

  // Trigger stat count when visible
  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-banner');
    if (statsSection && !animated) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        animated = true;
        animateCounters();
      }
    }
  });

  // 6. QR Modal Popup Logic
  const qrButtons = document.querySelectorAll('.trigger-qr-modal');
  const modal = document.getElementById('qr-modal');
  const modalClose = document.querySelector('.modal-close');

  qrButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
