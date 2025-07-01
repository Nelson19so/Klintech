document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuItems = document.querySelectorAll(".nav-links li");
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  let lastScrollTop = 0;

  // Toggle menu function
  const toggleMenu = () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Toggle body scroll
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";

    menuItems.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `fadeInUp 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  };

  // Toggle menu on nav-toggle click
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close mobile menu when a link is clicked
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isMenuOpen = navLinks.classList.contains("active");
    const clickedInsideMenu = navLinks.contains(e.target);
    const clickedOnToggle = navToggle.contains(e.target);

    if (isMenuOpen && !clickedInsideMenu && !clickedOnToggle) {
      toggleMenu();
    }
  });

  // Prevent clicks inside the menu from closing it
  navLinks.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll event listener
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle scroll-to-top button
    if (scrollTop > 100) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", (e) => {
    // allowing form submission
    // e.preventDefault();
    // ---------------------------

    alert("Thank you for your message! I'll get back to you soon.");

    // removed reset function
    // Reason: it delete all input onSubmit form
    // contactForm.reset();
  });

  // Animate on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project-card, .skill-category, .about-content"
    );
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Intersection Observer for fade-in animation
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    fadeInObserver.observe(element);
  });

  // Initial animations
  window.addEventListener("load", () => {
    animateOnScroll();
  });

  window.addEventListener("scroll", animateOnScroll);
});
