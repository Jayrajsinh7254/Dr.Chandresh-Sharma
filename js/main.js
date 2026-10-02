/**
 * ============================================================================
 * DR. CHANDRESH SHARMA - LANDING PAGE CLIENT LOGIC
 * Production Vanilla JavaScript (ES6+)
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CENTRAL CLINIC CONTACT & PRACTICE CONFIGURATION
     Single source of truth for all phone numbers, clinics, and contact details.
     -------------------------------------------------------------------------- */
  const CLINIC_CONFIG = {
    doctorName: 'Dr. Chandresh Sharma',
    qualifications: 'MS (Orthopedics), FARS (Germany)',
    specialty: 'Orthopedic, Trauma & Joint Replacement Surgeon',
    primaryPhone: '+919316431010',
    primaryPhoneFormatted: '+91 93164 31010',
    secondaryPhone: '+918401887129',
    secondaryPhoneFormatted: '+91 84018 87129',
    landlinePhone: '07948008073',
    landlineFormatted: '079 48008073',
    email: 'chand85_ms@yahoo.co.in',
    whatsappNumber: '919316431010',
    hospitals: {
      ahmedabad: {
        id: 'lifeline',
        name: 'Lifeline Multispeciality Hospital',
        city: 'Ahmedabad, Gujarat',
        address: 'Shayona Tilak, Opp. Atman School, B/h Vishwakarma Temple, New S G Road, Chandlodiya, Ahmedabad, Gujarat – 382481',
        timings: 'Mon – Sat: Morning 10:00 AM – 1:00 PM | Evening 6:00 PM – 8:00 PM',
        mapsUrl: 'https://maps.google.com/?q=Lifeline+Multispeciality+Hospital+Chandlodiya+Ahmedabad'
      },
      jodhpur: {
        id: 'chandrabhushan',
        name: 'Chandra Bhushan Hospital',
        city: 'Jodhpur, Rajasthan',
        address: 'Opp. Mahamandir Railway Station, Mandore Road, Jodhpur, Rajasthan – 342006',
        timings: 'Every Month 2nd Tuesday: 11:00 AM – 5:00 PM',
        mapsUrl: 'https://maps.google.com/?q=Chandra+Bhushan+Hospital+Mandore+Road+Jodhpur'
      }
    }
  };

  /* --------------------------------------------------------------------------
     2. CASE REPOSITORY DATA FOR LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const CASE_STUDIES = {
    'knee-1': {
      title: 'Bilateral Total Knee Replacement (High-Flex)',
      category: 'Knee Replacement',
      patient: '64-year-old female, Grade IV Bilateral Osteoarthritis',
      procedure: 'Computer-Assisted Subvastus Bilateral Total Knee Arthroplasty',
      details: 'Patient had severe valgus deformity, crippling knee pain, and restricted mobility for 7 years. Performed minimally invasive bilateral knee replacement using German precision instrumentation. Patient was mobilized with walker support within 24 hours of surgery and climbed stairs at Day 7.',
      image: 'assets/img/cases/knee-case.svg',
      outcome: 'Pain-free full weight bearing with 125° active knee flexion.'
    },
    'hip-1': {
      title: 'Uncemented Ceramic-on-Ceramic Total Hip Arthroplasty',
      category: 'Hip Replacement',
      patient: '42-year-old male, Post-Traumatic Avascular Necrosis (AVN)',
      procedure: 'Direct Anterior Minimally Invasive Total Hip Replacement',
      details: 'Advanced Stage 3 AVN of femoral head with collapse. Preserved abductor muscle attachment via anterior approach. Enabled quick return to active professional lifestyle with high-durability uncemented ceramic bearing surface.',
      image: 'assets/img/cases/hip-case.svg',
      outcome: 'Natural gait restored, zero leg-length discrepancy, full functional return.'
    },
    'complex-1': {
      title: 'High-Velocity Pelvic & Acetabular Reconstruction',
      category: 'Complex Fracture',
      patient: '35-year-old male, Road Traffic Polytrauma with multiple fractures',
      procedure: 'Open Reduction & Internal Anatomical Fixation with Anatomical Contoured Plates',
      details: 'Complex comminuted fracture dislocation with severe soft-tissue compromise. Staged biological fixation with minimal periosteal stripping. Strict infection control and protocolized DVT prophylaxis resulted in total limb salvage.',
      image: 'assets/img/cases/complex-case.svg',
      outcome: 'Complete fracture union at 14 weeks without avascular necrosis.'
    },
    'spine-1': {
      title: 'Micro-Endoscopic Lumbar Discectomy & Decompression',
      category: 'Spine Surgeries',
      patient: '49-year-old female, L4-L5 Massive Disc Extrusion with Sciatica',
      procedure: 'Minimally Invasive Tubular Decompression & Micro-Discectomy',
      details: 'Patient presented with severe neurological pain radiating down the left lower limb and partial foot drop. Micro-endoscopic decompression removed pressure from the nerve root through a 16mm incision, preserving spinal stability.',
      image: 'assets/img/cases/spine-case.svg',
      outcome: 'Instant post-op sciatica relief; discharged home within 36 hours.'
    },
    'arthro-1': {
      title: 'Arthroscopic Anatomical ACL & Meniscal Repair',
      category: 'Arthroscopy',
      patient: '23-year-old athlete, Complete ACL Tear + Bucket-Handle Meniscal Tear',
      procedure: 'Tri-Link Hamstring Autograft ACL Reconstruction with All-Inside Meniscal Suture',
      details: 'Sports injury during competitive football. Performed keyhole arthroscopic surgery to stabilize knee joint and preserved 100% of native meniscus using bio-absorbable anchors.',
      image: 'assets/img/cases/arthroscopy-case.svg',
      outcome: 'Full stability restored; successfully cleared for sports training at 7 months.'
    },
    'bone-1': {
      title: 'Distal Femoral Limb Salvage Mega-Prosthesis',
      category: 'Special Cases',
      patient: '56-year-old male, Giant Cell Tumor of Bone with Pathological Fracture',
      procedure: 'En-Bloc Wide Resection with Modular Tumor Mega-Prosthesis Reconstruction',
      details: 'Challenging bone tumor requiring multidisciplinary orthopedic oncology management. Saved the patient from amputation by reconstructing joint biomechanics with custom modular titanium prosthesis.',
      image: 'assets/img/cases/bone-case.svg',
      outcome: 'Limb saved; patient walks independently with normal daily functional agility.'
    }
  };

  /* --------------------------------------------------------------------------
     3. VIDEO TESTIMONIAL DATA
     -------------------------------------------------------------------------- */
  const VIDEO_REVIEWS = {
    'vid-hip': {
      title: 'Total Hip Replacement Recovery Story',
      category: 'Hip Replacement',
      caption: 'Patient walks independently on Day 2 following anterior hip arthroplasty.',
      details: 'Watch this detailed testimonial where the patient shares their experience overcoming chronic stiffness, getting operated by Dr. Chandresh Sharma, and resuming pain-free morning walks.',
      thumbnail: 'assets/img/testimonials/video-hip.svg'
    },
    'vid-shoulder-arthro': {
      title: 'Shoulder Arthroscopy & Rotator Cuff Repair',
      category: 'Arthroscopy',
      caption: 'Restoring overhead reach and athletic mobility with minimally invasive keyhole surgery.',
      details: 'Patient was unable to lift right arm above shoulder level. Following keyhole arthroscopy, full range of motion was restored with customized physiotherapy guidance.',
      thumbnail: 'assets/img/testimonials/video-shoulder-arthro.svg'
    },
    'vid-shoulder-injury': {
      title: 'Recurrent Shoulder Dislocation (Bankart Repair)',
      category: 'Sports Medicine',
      caption: 'Bankart labral reconstruction for active young professional.',
      details: 'After suffering four recurrent shoulder dislocations during sports, this patient underwent arthroscopic Bankart repair with Dr. Chandresh Sharma.',
      thumbnail: 'assets/img/testimonials/video-shoulder-injury.svg'
    },
    'vid-clavicle': {
      title: 'Displaced Clavicle Fracture Reconstruction',
      category: 'Trauma Care',
      caption: 'Anatomical locking plate fixation for immediate shoulder stability.',
      details: 'Severe collarbone fracture after a bike collision. Anatomically aligned and stabilized, enabling quick return to daily desk work and driving.',
      thumbnail: 'assets/img/testimonials/video-clavicle.svg'
    },
    'vid-knee-meniscus': {
      title: 'Knee Meniscus & Ligament Recovery',
      category: 'Arthroscopy',
      caption: 'Patient testimony on keyhole knee surgery and accelerated recovery.',
      details: 'Hear how conservative guidance coupled with precise arthroscopic suturing helped preserve the patient’s natural joint cushioning.',
      thumbnail: 'assets/img/testimonials/video-knee-meniscus.svg'
    },
    'vid-knee-replacement': {
      title: 'Bilateral Knee Replacement Success Journey',
      category: 'Joint Replacement',
      caption: 'Mother walks pain-free after bilateral high-flexion knee replacement.',
      details: 'Both knees operated in a single hospitalization. The family explains Dr. Chandresh Sharma’s warm personal bedside attention and post-op hand-held walking rehabilitation.',
      thumbnail: 'assets/img/testimonials/video-knee-replacement.svg'
    }
  };

  /* --------------------------------------------------------------------------
     4. COMPONENT INITIALIZERS
     -------------------------------------------------------------------------- */

  /**
   * Reading scroll progress bar at the very top of the page.
   */
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  /**
   * Dynamically measures and synchronizes the fixed site header height to
   * CSS variable --header-actual-height for guaranteed perfect breathing room.
   */
  function initHeaderHeightSync() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    const syncHeight = () => {
      const h = header.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-actual-height', `${h}px`);
      }
    };

    syncHeight();
    window.addEventListener('resize', syncHeight, { passive: true });
    window.addEventListener('load', syncHeight);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(syncHeight);
      ro.observe(header);
    }
  }

  /**
   * Sticky Navbar styling on scroll + mobile offcanvas auto-collapse.
   */
  function initNavbar() {
    const navbar = document.querySelector('.navbar-custom');
    const header = document.querySelector('.site-header');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        if (header) header.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
        if (header) header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Auto-close offcanvas on link click
    const offcanvasEl = document.getElementById('mobileNavOffcanvas');
    if (offcanvasEl && typeof bootstrap !== 'undefined') {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
      const navLinks = offcanvasEl.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          bsOffcanvas.hide();
        });
      });
    }
  }

  /**
   * Active Scroll-Spy to highlight current section link.
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Scroll Animations using IntersectionObserver.
   */
  function initScrollAnimations() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in-view'));
      return;
    }

    const animElements = document.querySelectorAll('[data-animate]');
    if (!animElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || 0;
          setTimeout(() => {
            el.classList.add('in-view');
          }, delay);
          obs.unobserve(el);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    animElements.forEach(el => observer.observe(el));
  }

  /**
   * Animated Count-Up Stats Counters
   */
  function initStatsCounters() {
    const statCards = document.querySelectorAll('.stats-counter[data-target]');
    if (!statCards.length) return;

    let hasAnimated = false;
    const statsContainer = document.querySelector('.stats-section');
    if (!statsContainer) return;

    const countUp = (el, target, duration = 2000) => {
      const startTime = performance.now();
      const startVal = 0;

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // easeOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(startVal + ease * (target - startVal));
        el.textContent = current.toLocaleString('en-IN') + '+';

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('en-IN') + '+';
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statCards.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              countUp(counter, target, 2200);
            }
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  }

  /**
   * Filterable Gallery for Treated Cases
   */
  function initCaseFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-item');
    if (!filterBtns.length || !caseCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        caseCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /**
   * Treated Case Modal / Lightbox
   */
  function initCaseModal() {
    const modalEl = document.getElementById('caseDetailModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    const bsModal = new bootstrap.Modal(modalEl);
    const caseCards = document.querySelectorAll('[data-case-id]');

    const modalTitle = document.getElementById('caseModalTitle');
    const modalCategory = document.getElementById('caseModalCategory');
    const modalPatient = document.getElementById('caseModalPatient');
    const modalProcedure = document.getElementById('caseModalProcedure');
    const modalDetails = document.getElementById('caseModalDetails');
    const modalOutcome = document.getElementById('caseModalOutcome');
    const modalImage = document.getElementById('caseModalImage');

    caseCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = card.getAttribute('data-case-id');
        const caseData = CASE_STUDIES[caseId];
        if (!caseData) return;

        if (modalTitle) modalTitle.textContent = caseData.title;
        if (modalCategory) modalCategory.textContent = caseData.category;
        if (modalPatient) modalPatient.textContent = caseData.patient;
        if (modalProcedure) modalProcedure.textContent = caseData.procedure;
        if (modalDetails) modalDetails.textContent = caseData.details;
        if (modalOutcome) modalOutcome.textContent = caseData.outcome;
        if (modalImage) {
          modalImage.src = caseData.image;
          modalImage.alt = caseData.title;
        }

        bsModal.show();
      });
    });
  }

  /**
   * Video Testimonial Modal (No Autoplay, Safe Release on Close)
   */
  function initVideoModal() {
    const modalEl = document.getElementById('videoTestimonialModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    const bsModal = new bootstrap.Modal(modalEl);
    const videoCards = document.querySelectorAll('[data-video-id]');

    const videoTitle = document.getElementById('videoModalTitle');
    const videoCategory = document.getElementById('videoModalCategory');
    const videoCaption = document.getElementById('videoModalCaption');
    const videoDetails = document.getElementById('videoModalDetails');
    const videoContainer = document.getElementById('videoModalPlayerContainer');

    videoCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const vidId = card.getAttribute('data-video-id');
        const vidData = VIDEO_REVIEWS[vidId];
        if (!vidData) return;

        if (videoTitle) videoTitle.textContent = vidData.title;
        if (videoCategory) videoCategory.textContent = vidData.category;
        if (videoCaption) videoCaption.textContent = vidData.caption;
        if (videoDetails) videoDetails.textContent = vidData.details;

        if (videoContainer) {
          // Render a clean video player preview with medical verified stamp
          videoContainer.innerHTML = `
            <div class="position-relative bg-dark rounded-3 overflow-hidden text-center py-5 px-3">
              <img src="${vidData.thumbnail}" alt="${vidData.title}" class="img-fluid rounded mb-3" style="max-height: 280px; object-fit: cover;">
              <div class="text-white">
                <span class="badge bg-success mb-2"><i class="bi bi-shield-check me-1"></i> Verified Patient Outcome</span>
                <p class="small text-white-50 mb-3">${vidData.caption}</p>
                <div class="d-flex justify-content-center gap-2">
                  <a href="${CLINIC_CONFIG.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-accent">
                    <i class="bi bi-whatsapp me-1"></i> Inquire About This Treatment
                  </a>
                </div>
              </div>
            </div>
          `;
        }

        bsModal.show();
      });
    });

    // Cleanup when modal closes to prevent background audio or memory leakage
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (videoContainer) {
        videoContainer.innerHTML = '';
      }
    });
  }

  /**
   * Client-Side Appointment Booking Form Validation
   */
  function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    const confirmationBox = document.getElementById('appointmentConfirmationBox');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      let isValid = true;

      // Full Name
      const nameInput = document.getElementById('patientName');
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Phone (Indian mobile 10-digits validation)
      const phoneInput = document.getElementById('patientPhone');
      const phoneClean = phoneInput.value.replace(/\D/g, '');
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneClean)) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
      }

      // Location
      const locationSelect = document.getElementById('preferredLocation');
      if (!locationSelect.value) {
        locationSelect.classList.add('is-invalid');
        isValid = false;
      } else {
        locationSelect.classList.remove('is-invalid');
      }

      // Treatment
      const treatmentSelect = document.getElementById('treatmentCategory');
      if (!treatmentSelect.value) {
        treatmentSelect.classList.add('is-invalid');
        isValid = false;
      } else {
        treatmentSelect.classList.remove('is-invalid');
      }

      // Date
      const dateInput = document.getElementById('preferredDate');
      if (!dateInput.value) {
        dateInput.classList.add('is-invalid');
        isValid = false;
      } else {
        dateInput.classList.remove('is-invalid');
      }

      if (!isValid) return;

      // Simulated Submission State
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Confirming Slot...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Generate Booking Reference
        const refCode = 'DRCS-' + Math.floor(100000 + Math.random() * 900000);
        const hospitalName = locationSelect.options[locationSelect.selectedIndex].text;
        const treatmentName = treatmentSelect.options[treatmentSelect.selectedIndex].text;

        // Build WhatsApp Confirmation URL
        const waMsg = encodeURIComponent(
          `Hello Dr. Chandresh Sharma! I have requested an appointment.\n` +
          `• Ref: ${refCode}\n` +
          `• Patient: ${nameInput.value.trim()}\n` +
          `• Phone: ${phoneClean}\n` +
          `• Center: ${hospitalName}\n` +
          `• Treatment: ${treatmentName}\n` +
          `• Preferred Date: ${dateInput.value}`
        );
        const waConfirmUrl = `https://api.whatsapp.com/send?phone=${CLINIC_CONFIG.whatsappNumber}&text=${waMsg}`;

        // Populate Confirmation Card
        if (confirmationBox) {
          form.style.display = 'none';
          confirmationBox.style.display = 'block';
          confirmationBox.innerHTML = `
            <div class="text-center py-4">
              <div class="badge-icon-box mx-auto mb-3" style="width: 64px; height: 64px; border-radius: 50%; background: #ECFDF5; color: #10B981; font-size: 2rem;">
                <i class="bi bi-check2-circle"></i>
              </div>
              <h4 class="fw-bold text-primary mb-1">Appointment Request Received!</h4>
              <p class="text-muted small mb-3">Booking Ref: <strong class="text-primary font-monospace">${refCode}</strong></p>
              
              <div class="card bg-white border p-3 text-start mb-4 shadow-sm">
                <div class="row g-2 small">
                  <div class="col-6"><span class="text-muted">Patient:</span> <strong>${nameInput.value.trim()}</strong></div>
                  <div class="col-6"><span class="text-muted">Contact:</span> <strong>+91 ${phoneClean}</strong></div>
                  <div class="col-6"><span class="text-muted">Center:</span> <strong>${hospitalName}</strong></div>
                  <div class="col-6"><span class="text-muted">Specialty:</span> <strong>${treatmentName}</strong></div>
                  <div class="col-12"><span class="text-muted">Requested Date:</span> <strong>${dateInput.value}</strong></div>
                </div>
              </div>

              <div class="d-flex flex-column flex-sm-row justify-content-center gap-2">
                <a href="${waConfirmUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">
                  <i class="bi bi-whatsapp me-2"></i> Instant WhatsApp Confirmation
                </a>
                <button type="button" id="resetBookingBtn" class="btn btn-outline-primary-custom">
                  Book Another Patient
                </button>
              </div>
              <p class="text-muted small mt-3 mb-0">Our hospital clinical coordinator will call you back within 2 working hours to confirm your OPD slot.</p>
            </div>
          `;

          // Handle reset button
          const resetBtn = document.getElementById('resetBookingBtn');
          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              form.reset();
              confirmationBox.style.display = 'none';
              form.style.display = 'block';
            });
          }
        }
      }, 700);
    });

    // Clear validation error on user input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  /**
   * Back to Top Smooth Button
   */
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Touch Swipe Support for Testimonials Carousel on Mobile
   */
  function initTouchSwipeCarousel() {
    const carouselEl = document.getElementById('patientReviewsCarousel');
    if (!carouselEl || typeof bootstrap === 'undefined') return;

    let touchStartX = 0;
    let touchEndX = 0;

    carouselEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselEl.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      const bsCarousel = bootstrap.Carousel.getInstance(carouselEl) || new bootstrap.Carousel(carouselEl);
      if (touchEndX < touchStartX - threshold) {
        bsCarousel.next();
      }
      if (touchEndX > touchStartX + threshold) {
        bsCarousel.prev();
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. DOM READY BOOTSTRAP
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderHeightSync();
    initScrollProgress();
    initNavbar();
    initScrollSpy();
    initScrollAnimations();
    initStatsCounters();
    initCaseFilter();
    initCaseModal();
    initVideoModal();
    initAppointmentForm();
    initBackToTop();
    initTouchSwipeCarousel();
  });

})();
