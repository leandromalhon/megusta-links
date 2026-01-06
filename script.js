// =========================
// LOADER
// =========================
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  // Garantir que o loader fique visível por pelo menos 1 segundo
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
      
      // Remover completamente após a animação
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1000);
});

// =========================
// FADE IN AO SCROLL
// =========================
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

elements.forEach(el => {
  if (el) observer.observe(el);
});

// =========================
// PARALLAX SUAVE (FUNDO)
// =========================
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.body.style.setProperty(
    "--parallax-offset",
    `${scrolled * 0.04}px`
  );
});

// =========================
// CARROSSEL LOGOS
// Desktop + Mobile
// =========================
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

// =========================
// DUPLICAR LOGOS PARA EFEITO DE LOOP CONTÍNUO
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.logos-track');
  
  if (track) {
    // Clonar os logos para criar loop contínuo
    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);
    
    // Ajustar a largura total
    const originalWidth = track.scrollWidth;
    track.style.width = `${originalWidth * 2}px`;
  }
});