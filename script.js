// ===== DARK / LIGHT MODE TOGGLE =====
(function () {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const body = document.body;

  // Load saved theme from localStorage
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle theme on button click
  toggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.querySelector(".back-top");
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== CONTACT FORM SUBMIT =====
  const form = document.getElementById("contactForm");
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const formStatus = document.getElementById("formStatus");

  if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.disabled = true;

      if (formStatus) {
        formStatus.innerHTML = "";
      }

      try {
        const response = await fetch("https://formspree.io/f/xaqrwode", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();
        console.log("Form Response:", data);

        if (response.ok) {
          if (formStatus) {
            formStatus.innerHTML =
              " Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "#22c55e";
            formStatus.style.fontWeight = "bold";
          }
          form.reset();
        } else {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        console.error("Form Error:", error);
        if (formStatus) {
          formStatus.innerHTML = "Error: " + error.message;
          formStatus.style.color = "#ef4444";
          formStatus.style.fontWeight = "bold";
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
})();
