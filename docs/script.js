/* ===================== THEME TOGGLE ===================== */
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);
syncToggleIcon();

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  syncToggleIcon();
});

function syncToggleIcon() {
  toggle.textContent = root.getAttribute("data-theme") === "dark" ? "🌙" : "☀️";
}

/* ===================== NAV SHADOW ON SCROLL ===================== */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

/* ===================== TYPING EFFECT ===================== */
const phrases = [
  "event-driven microservices",
  "fault-tolerant Kafka pipelines",
  "cloud-native systems on AWS",
  "things that scale to 10M+ events/day",
];
const typedEl = document.getElementById("typed");
let pIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const current = phrases[pIdx];
  typedEl.textContent = current.slice(0, cIdx);

  if (!deleting && cIdx < current.length) {
    cIdx++;
    setTimeout(typeLoop, 70);
  } else if (!deleting && cIdx === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1800);
  } else if (deleting && cIdx > 0) {
    cIdx--;
    setTimeout(typeLoop, 35);
  } else {
    deleting = false;
    pIdx = (pIdx + 1) % phrases.length;
    setTimeout(typeLoop, 250);
  }
}
typeLoop();

/* ===================== SCROLL REVEAL ===================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ===================== ANIMATED COUNTERS ===================== */
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        value = Math.min(target, value + step);
        el.textContent = value + suffix;
        if (value < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterObserver.observe(c));
