// =========================
// LOADER & INICIALIZAÇÃO
// =========================
document.addEventListener('DOMContentLoaded', () => {
  
  // Remover loader após animação
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
    
    // Iniciar carrossel após loader
    initCarousel();
    
    // Adicionar efeito de parallax suave nas marcas d'água
    initWatermarkParallax();
    
  }, 1200); // Tempo igual ao CSS animation-delay

  // Adicionar hover effect nos cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Efeito especial no CTA
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.addEventListener('mouseenter', () => {
      cta.style.transform = 'translateY(-3px)';
      cta.style.boxShadow = '0 15px 40px rgba(255, 122, 0, 0.45)';
    });
    
    cta.addEventListener('mouseleave', () => {
      cta.style.transform = 'translateY(0)';
      cta.style.boxShadow = 'none';
    });
    
    // Efeito de clique
    cta.addEventListener('mousedown', () => {
      cta.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    cta.addEventListener('mouseup', () => {
      cta.style.transform = 'translateY(-3px)';
    });
  }
});

// =========================
// CARROSSEL DE LOGOS
// =========================
function initCarousel() {
  const track = document.querySelector('.logos-track');
  const container = document.querySelector('.logos');
  
  if (!track || !container) return;
  
  // 1. Clonar logos para criar loop infinito
  const originalImages = track.querySelectorAll('img');
  const cloneTrack = track.cloneNode(true);
  track.parentNode.appendChild(cloneTrack);
  
  // 2. Ajustar largura total
  const totalImages = originalImages.length;
  const gap = 32; // gap do CSS
  const minWidth = 90; // min-width do CSS
  const totalWidth = totalImages * (minWidth + gap);
  track.style.width = `${totalWidth * 2}px`;
  
  // 3. Configurar velocidade baseada na quantidade
  const baseDuration = 40; // segundos para 43 imagens
  const duration = baseDuration;
  track.style.animationDuration = `${duration}s`;
  
  // 4. Interação - pausa no hover/touch
  // Desktop
  container.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
  
  // Mobile
  let isTouching = false;
  container.addEventListener('touchstart', (e) => {
    track.style.animationPlayState = 'paused';
    isTouching = true;
    e.preventDefault();
  }, { passive: false });
  
  container.addEventListener('touchend', () => {
    isTouching = false;
    setTimeout(() => {
      if (!isTouching) {
        track.style.animationPlayState = 'running';
      }
    }, 300);
  });
  
  container.addEventListener('touchcancel', () => {
    isTouching = false;
    track.style.animationPlayState = 'running';
  });
  
  // 5. Otimizar imagens
  const allLogos = document.querySelectorAll('.logos img');
  allLogos.forEach(img => {
    // Prevenir drag das imagens
    img.setAttribute('draggable', 'false');
    
    // Ajustar clip-path baseado na proporção
    img.onload = function() {
      adjustLogoClip(this);
    };
    
    if (img.complete) adjustLogoClip(img);
  });
}

function adjustLogoClip(img) {
  const naturalRatio = img.naturalWidth / img.naturalHeight;
  
  // Ajustar clip-path baseado na proporção da imagem
  if (naturalRatio < 1.2) { // Imagem mais quadrada/vertical
    img.style.clipPath = 'inset(10% 0 10% 0)';
  } else if (naturalRatio > 2) { // Imagem muito horizontal
    img.style.clipPath = 'inset(2% 0 2% 0)';
  } else { // Proporção normal
    img.style.clipPath = 'inset(5% 0 5% 0)';
  }
}

// =========================
// PARALLAX NAS MARCAS D'ÁGUA
// =========================
function initWatermarkParallax() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const speed = 0.03; // Velocidade do parallax
        
        // Aplicar parallax suave
        document.body.style.setProperty('--parallax-offset', `${scrolled * speed}px`);
        
        // Efeito adicional nas marcas d'água
        const watermarks = document.querySelectorAll('body::before, body::after');
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// =========================
// DETECTAR REDIMENSIONAMENTO
// =========================
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reajustar carrossel se necessário
    const track = document.querySelector('.logos-track');
    if (track) {
      track.style.animationPlayState = 'running';
    }
  }, 250);
});

// =========================
// ANIMAÇÃO DE ENTRADA OBSERVER
// =========================
// Adicionar fallback para browsers antigos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observar elementos que podem ter sido carregados depois
document.querySelectorAll('.fade-element').forEach(el => {
  observer.observe(el);
});