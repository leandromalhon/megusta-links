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
// PARALLAX SUAVE (FUNDO) - MARCA D'ÁGUA NAVEGANTE
// =========================
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.body.style.setProperty(
    "--parallax-offset",
    `${scrolled * 0.05}px` // Aumentei para 0.05 para mais movimento
  );
});

// =========================
// CARROSSEL LOGOS - LOOPING INFINITO
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const logosContainer = document.querySelector('.logos');
  const track = document.querySelector('.logos-track');
  
  if (!track) return;
  
  // 1. DUPLICAR OS LOGOS PARA CRIAR EFEITO DE LOOP CONTÍNUO
  const cloneTrack = track.cloneNode(true);
  track.parentNode.appendChild(cloneTrack);
  
  // 2. AJUSTAR LARGURA PARA DUAS CÓPIAS
  const originalImages = track.querySelectorAll('img');
  const totalWidth = originalImages.length * (90 + 32); // largura + gap
  track.style.width = `${totalWidth * 2}px`; // Dobra a largura
  
  // 3. CONFIGURAR ANIMAÇÃO
  const animationDuration = 40; // segundos
  track.style.animationDuration = `${animationDuration}s`;
  
  // 4. INTERAÇÃO: PAUSA AO PASSAR MOUSE/DEDO
  // Desktop
  logosContainer.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  
  logosContainer.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
  
  // Mobile
  logosContainer.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  }, { passive: true });
  
  logosContainer.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  });
  
  logosContainer.addEventListener("touchcancel", () => {
    track.style.animationPlayState = "running";
  });
  
  // 5. RESET SUAVE DA ANIMAÇÃO (evitar piscar no fim do loop)
  track.addEventListener('animationiteration', () => {
    // A animação CSS já cria um loop perfeito com translateX(-50%)
  });
  
  // 6. OTIMIZAR IMAGENS - AJUSTAR ALTURA DINAMICAMENTE
  const allLogos = document.querySelectorAll('.logos img');
  allLogos.forEach(img => {
    // Quando a imagem carregar, ajustar se necessário
    img.onload = function() {
      const naturalRatio = this.naturalWidth / this.naturalHeight;
      const displayRatio = 90 / 50; // width / height do container
      
      // Se a imagem for muito vertical, ajustar clip-path
      if (naturalRatio < 1.2) { // Imagem mais quadrada/vertical
        this.style.clipPath = 'inset(10% 0 10% 0)';
      } else if (naturalRatio > 2) { // Imagem muito horizontal
        this.style.clipPath = 'inset(2% 0 2% 0)';
      }
    };
    
    // Forçar verificação se já carregou
    if (img.complete) img.onload();
  });
});

// =========================
// OTIMIZAÇÃO DE PERFORMANCE
// =========================
// Usar requestAnimationFrame para parallax suave
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      document.body.style.setProperty(
        "--parallax-offset",
        `${scrolled * 0.05}px`
      );
      ticking = false;
    });
    ticking = true;
  }
});