const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

// Theme
const savedTheme = localStorage.getItem("shiva-theme");
if (savedTheme === "light") body.setAttribute("data-theme", "light");

themeToggle.addEventListener("click", () => {
  const light = body.getAttribute("data-theme") === "light";
  if (light) {
    body.removeAttribute("data-theme");
    localStorage.setItem("shiva-theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("shiva-theme", "light");
  }
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal animations
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Subtle cursor glow on desktop
const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 950) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
