// BuildWise Construction - Simplified Element Animations
document.addEventListener("DOMContentLoaded", () => {
  // Utility function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Apply animation when element enters viewport
  function animateOnScroll(elements, animationClass) {
    elements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animated")) {
        element.classList.add(animationClass, "animated");
      }
    });
  }

  // Handle scroll events for animations
  function handleScrollAnimations() {
    // Simple fade-in for hero elements
    const heroElements = document.querySelectorAll(".hero-section h1, .hero-section p, .hero-section a, .hero-section form");
    animateOnScroll(heroElements, "animate-fade-in");
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll(".bg-\\[\\#1E1E1E\\] h2");
    animateOnScroll(statNumbers, "animate-count");

    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll("#testimonialSlider > div");
    animateOnScroll(testimonialCards, "animate-fade-in");

    // Project cards animation
    const projectCards = document.querySelectorAll(".project-card");
    animateOnScroll(projectCards, "animate-slide-up");

    // Client logos animation
    const clientLogos = document.querySelectorAll(".py-16 .grid > div");
    animateOnScroll(clientLogos, "animate-fade-in");

    // Section headings animation
    const sectionHeadings = document.querySelectorAll("section h2");
    animateOnScroll(sectionHeadings, "animate-fade-in");
    
    // Footer columns animation
    const footerColumns = document.querySelectorAll("footer .grid > div");
    animateOnScroll(footerColumns, "animate-slide-up");
  }

  // Testimonial slider animation enhancement
  function enhanceTestimonialSlider() {
    const slider = document.getElementById("testimonialSlider");
    if (!slider) return;
    
    const slides = slider.children;
    let currentSlide = 0;

    // Override the existing slideTestimonial function
    window.slideTestimonial = (direction, manual = false) => {
      // Update current slide index
      currentSlide = (currentSlide + direction + slides.length) % slides.length;

      // Move slider to new position
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // If manually triggered, reset the auto-slide timer
      if (manual && window.autoSlideInterval) {
        clearInterval(window.autoSlideInterval);
        window.autoSlideInterval = setInterval(() => {
          slideTestimonial(1);
        }, 5000);
      }
    };
    
    // Set up auto-slide
    window.autoSlideInterval = setInterval(() => {
      slideTestimonial(1);
    }, 5000);
  }

  // Add CSS animations
  function addAnimationStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      /* Fade in animation */
      .animate-fade-in {
        animation: fadeIn 0.8s ease forwards;
      }
      
      /* Slide up animation */
      .animate-slide-up {
        animation: slideUp 0.8s ease forwards;
      }
      
      /* Count up animation */
      .animate-count {
        animation: fadeIn 0.8s ease forwards;
      }
      
      /* Keyframes */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Set initial state for animated elements */
      .hero-section h1, 
      .hero-section p, 
      .hero-section a,
      .hero-section form,
      .project-card,
      section h2,
      .bg-\\[\\#1E1E1E\\] h2,
      footer .grid > div {
        opacity: 0;
      }
      
      /* Add animation for Font Awesome icons */
      .fa-arrow-right {
        transition: transform 0.3s ease;
      }
      
      a:hover .fa-arrow-right, 
      button:hover .fa-arrow-right {
        transform: translateX(5px);
      }
      
      /* Add pulse animation for play button */
      .fa-play {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // Initialize number counter animation for stats
  function initCounterAnimation() {
    const statElements = document.querySelectorAll(".bg-\\[\\#1E1E1E\\] h2");

    statElements.forEach((element) => {
      // Extract the number from the text content
      const text = element.textContent || "";
      const hasPlus = text.includes("+");
      const numericValue = parseInt(text.replace(/\D/g, ""), 10);
      
      if (isNaN(numericValue)) return;
      
      element.setAttribute("data-final", numericValue);
      element.setAttribute("data-format", hasPlus ? "plus" : "normal");
      element.textContent = "0" + (hasPlus ? "+" : "");

      element.addEventListener("animationstart", function () {
        if (this.classList.contains("animate-count")) {
          const final = parseInt(this.getAttribute("data-final"), 10);
          const format = this.getAttribute("data-format");
          const duration = 2000; // 2 seconds
          const start = 0;
          const startTime = performance.now();

          function updateCount(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(start + (final - start) * progress);
            element.textContent = currentValue.toLocaleString() + (format === "plus" ? "+" : "");

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              element.textContent = final.toLocaleString() + (format === "plus" ? "+" : "");
            }
          }

          requestAnimationFrame(updateCount);
        }
      });
    });
  }

  // Add simple hover effects
  function addSimpleInteractions() {
    // Enhance project card hover effects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
      const hoverContent = card.querySelector(".hover-content");
      if (hoverContent) {
        card.addEventListener("mouseenter", () => {
          hoverContent.style.opacity = "1";
        });
      }
    });
    
    // Mobile menu animation
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    
    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
      mobileMenuBtn.addEventListener("click", function() {
        mobileMenu.classList.remove("mobile-menu-hidden");
      });
      
      closeMenuBtn.addEventListener("click", function() {
        mobileMenu.classList.add("mobile-menu-hidden");
      });
    }
  }

  // Initialize all animations
  function init() {
    addAnimationStyles();
    enhanceTestimonialSlider();
    initCounterAnimation();
    addSimpleInteractions();

    // Run scroll animations on load and scroll
    handleScrollAnimations();
    window.addEventListener("scroll", handleScrollAnimations);
    
    console.log("BuildWise animations initialized successfully!");
  }

  // Start animations
  init();
});