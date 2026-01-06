/* =========================
   FADE IN AO SCROLL
========================= */

const elements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

elements.forEach(el => observer.observe(el));

/* =========================
   PARALLAX SUAVE (FUNDO)
========================= */

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.body.style.setProperty(
    "--parallax-offset",
    `${scrolled * 0.04}px`
  );
});

/* =========================
   CARROSSEL LOGOS
   Desktop + Mobile
========================= */

const logosTrack = document.querySelector(".logos-track");

if (logosTrack) {
  // Desktop
  logosTrack.addEventListener("mouseenter", () => {
    logosTrack.style.animationPlayState = "paused";
  });

  logosTrack.addEventListener("mouseleave", () => {
    logosTrack.style.animationPlayState = "running";
  });

  // Mobile
  logosTrack.addEventListener(
    "touchstart",
    () => {
      logosTrack.style.animationPlayState = "paused";
    },
    { passive: true }
  );

  logosTrack.addEventListener("touchend", () => {
    logosTrack.style.animationPlayState = "running";
  });

  logosTrack.addEventListener("touchcancel", () => {
    logosTrack.style.animationPlayState = "running";
  });
}
