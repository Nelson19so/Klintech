document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")
  const menuItems = document.querySelectorAll(".nav-links li")
  const scrollToTopBtn = document.querySelector(".scroll-to-top")
  let lastScrollTop = 0

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll event listener with optimized performance
  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > 100) {
        scrollToTopBtn.classList.add("show")
      } else {
        scrollToTopBtn.classList.remove("show")
      }

      if (scrollTop > lastScrollTop) {
        navToggle.style.left = "auto"
        navToggle.style.right = "20px"
      } else {
        navToggle.style.left = "20px"
        navToggle.style.right = "auto"
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
  })

  // Optimized toggle menu function
  const toggleMenu = () => {
    navLinks.classList.toggle("active")
    navToggle.classList.toggle("active")
    menuItems.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = ""
      } else {
        item.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })
  }

  navToggle.addEventListener("click", toggleMenu)

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toggleMenu()
      }
    })
  })

  // Optimized animate on scroll
  const animateOnScroll = () => {
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll(".project-card, .skill-category, .about-content")
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    })
  }

  // Optimized Intersection Observer
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          fadeInObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: "50px" }
  )

  document.querySelectorAll(".fade-in").forEach((element) => {
    fadeInObserver.observe(element)
  })


