// BuildWise Construction - Element Animations
document.addEventListener("DOMContentLoaded", () => {
    // Utility function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    }
  
    // Apply animation when element enters viewport
    function animateOnScroll(elements, animationClass) {
      elements.forEach((element) => {
        if (isInViewport(element) && !element.classList.contains("animated")) {
          element.classList.add(animationClass, "animated")
        }
      })
    }
  
    // Handle scroll events for animations
    function handleScrollAnimations() {
      // Stats counter animation
      const statNumbers = document.querySelectorAll(".stats-section h2")
      animateOnScroll(statNumbers, "animate-count")
  
      // Testimonial cards animation
      const testimonialCards = document.querySelectorAll("#testimonialSlider > div")
      animateOnScroll(testimonialCards, "animate-fade-in")
  
      // Project cards animation
      const projectCards = document.querySelectorAll(".project-card")
      animateOnScroll(projectCards, "animate-slide-up")
  
      // Client logos animation
      const clientLogos = document.querySelectorAll(".clients-section .grid > div")
      animateOnScroll(clientLogos, "animate-fade-in")
  
      // CTA section animation
      const ctaSection = document.querySelector(".relative.h-96.bg-black")
      if (ctaSection && isInViewport(ctaSection) && !ctaSection.classList.contains("animated")) {
        const ctaHeading = ctaSection.querySelector("h2")
        const ctaButton = ctaSection.querySelector("button")
  
        if (ctaHeading) ctaHeading.classList.add("animate-slide-in-right", "animated")
        if (ctaButton) ctaButton.classList.add("animate-slide-in-left", "animated")
        ctaSection.classList.add("animated")
      }
    }
  
    // Testimonial slider animation enhancement
    function enhanceTestimonialSlider() {
      const slider = document.getElementById("testimonialSlider")
      const slides = slider.children
      let currentSlide = 0 // Declare currentSlide here
  
      // Add initial classes
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add("transition-all", "duration-500")
        if (i > 0) {
          slides[i].classList.add("opacity-0")
        } else {
          slides[i].classList.add("opacity-100")
        }
      }
  
      // Override the existing slideTestimonial function
      window.slideTestimonial = (direction) => {
        // First, fade out current slide
        slides[currentSlide].classList.remove("opacity-100")
        slides[currentSlide].classList.add("opacity-0")
  
        // Update current slide index
        currentSlide = (currentSlide + direction + slides.length) % slides.length
  
        // Then fade in new slide
        setTimeout(() => {
          slider.style.transform = `translateX(-${currentSlide * 100}%)`
          slides[currentSlide].classList.remove("opacity-0")
          slides[currentSlide].classList.add("opacity-100")
        }, 300)
      }
    }
  
    // Hero section animations
    function animateHeroElements() {
      const heroHeadings = document.querySelectorAll(".hero-section h2")
      const heroText = document.querySelector(".hero-section p")
      const heroButtons = document.querySelectorAll(".hero-section a")
      const heroForm = document.querySelector(".hero-section form")
  
      // Animate headings one after another
      heroHeadings.forEach((heading, index) => {
        setTimeout(() => {
          heading.classList.add("animate-fade-in")
        }, 300 * index)
      })
  
      // Animate paragraph after headings
      if (heroText) {
        setTimeout(() => {
          heroText.classList.add("animate-fade-in")
        }, 300 * heroHeadings.length)
      }
  
      // Animate buttons after text
      heroButtons.forEach((button, index) => {
        setTimeout(
          () => {
            button.classList.add("animate-slide-in-right")
          },
          300 * (heroHeadings.length + 1) + 150 * index,
        )
      })
  
      // Animate form last
      if (heroForm) {
        setTimeout(
          () => {
            heroForm.classList.add("animate-fade-in")
          },
          300 * (heroHeadings.length + 2),
        )
      }
    }
  
    // Add CSS animations
    function addAnimationStyles() {
      const styleSheet = document.createElement("style")
      styleSheet.textContent = `
        /* Fade in animation */
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        /* Slide up animation */
        .animate-slide-up {
          animation: slideUp 0.8s ease forwards;
        }
        
        /* Slide in from right */
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease forwards;
        }
        
        /* Slide in from left */
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease forwards;
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        /* Set initial state for animated elements */
        .hero-section h2, 
        .hero-section p, 
        .hero-section a,
        .hero-section form,
        .project-card,
        .stats-section h2 {
          opacity: 0;
        }
        
        /* Ensure testimonial cards transition smoothly */
        #testimonialSlider > div {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        /* Add animation for Font Awesome icons */
        .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .group:hover .arrow-icon {
          transform: translateX(5px);
        }
        
        /* Add pulse animation for play button */
        .fa-play {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `
      styleSheet.textContent += `
      /* Custom animation for arrow icons */
      @keyframes arrowWiggle {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(3px); }
        75% { transform: translateX(-2px); }
      }
      
      .arrow-wiggle {
        animation: arrowWiggle 0.5s ease;
      }
    `
      document.head.appendChild(styleSheet)
    }
  
    // Initialize number counter animation for stats
    function initCounterAnimation() {
      const statElements = document.querySelectorAll(".stats-section h2")
  
      statElements.forEach((element) => {
        const finalValue = Number.parseInt(element.textContent.replace(/,/g, ""))
        element.setAttribute("data-final", finalValue)
        element.textContent = "0"
  
        element.addEventListener("animationstart", function () {
          if (this.classList.contains("animate-count")) {
            const final = Number.parseInt(this.getAttribute("data-final"))
            const duration = 2000 // 2 seconds
            const start = 0
            const startTime = performance.now()
  
            function updateCount(timestamp) {
              const elapsed = timestamp - startTime
              const progress = Math.min(elapsed / duration, 1)
  
              // Use easeOutQuad for smoother animation
              const easeProgress = 1 - (1 - progress) * (1 - progress)
              const currentValue = Math.floor(start + (final - start) * easeProgress)
  
              // Format with commas if needed
              element.textContent = currentValue.toLocaleString()
  
              if (progress < 1) {
                requestAnimationFrame(updateCount)
              } else {
                element.textContent = final.toLocaleString()
              }
            }
  
            requestAnimationFrame(updateCount)
          }
        })
      })
    }
  
    // Add hover animations for Font Awesome icons
    function addIconAnimations() {

  
      // Add special animation for arrow icons in links and buttons with the 'group' class
      const groupLinks = document.querySelectorAll(".group")
      groupLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          const icon = link.querySelector(".arrow-icon")
          if (icon) {
            // Add a subtle beat animation
            icon.classList.add("fa-beat-fade")
            icon.style.setProperty("--fa-beat-fade-opacity", "0.67")
            icon.style.setProperty("--fa-beat-fade-scale", "1.075")
          }
        })
  
        link.addEventListener("mouseleave", () => {
          const icon = link.querySelector(".arrow-icon")
          if (icon) {
            // Remove the beat animation
            icon.classList.remove("fa-beat-fade")
          }
        })
      })
    }
  
    // Initialize all animations
    function init() {
      addAnimationStyles()
      animateHeroElements()
      enhanceTestimonialSlider()
      initCounterAnimation()
      addIconAnimations()
  
      // Run scroll animations on load and scroll
      handleScrollAnimations()
      window.addEventListener("scroll", handleScrollAnimations)
    }
  
    // Start animations
    init()
  })
  