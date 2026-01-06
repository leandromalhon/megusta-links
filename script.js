// =========================
// LOADER
// =========================
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  // Garantir que o loader fique visível por pelo menos 1 segundo
  setTimeout(() => {
    if (loader) {
      loader.style.display = 'none';
    }
    
    // Iniciar carrossel após loader
    initCarousel();
    
  }, 1200);
});

// =========================
// CARROSSEL DE LOGOS SIMPLES
// =========================
function initCarousel() {
  const track = document.querySelector('.logos-track');
  const container = document.querySelector('.logos');
  
  if (!track || !container) return;
  
  // Configurar animação CSS diretamente
  track.style.animation = 'scroll 30s linear infinite';
  
  // Pausar no hover
  container.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
  
  // Pausar no touch (mobile)
  container.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('touchend', () => {
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 300);
  });
  
  // Adicionar keyframes dinamicamente
  addScrollKeyframes();
}

// =========================
// ADICIONAR KEYFRAMES DINAMICAMENTE
// =========================
function addScrollKeyframes() {
  // Verificar se já existe
  if (document.querySelector('#scroll-keyframes')) return;
  
  const style = document.createElement('style');
  style.id = 'scroll-keyframes';
  
  // Calcular porcentagem baseada no número de imagens
  // Com 43 imagens duplicadas = 86 imagens no total
  // A animação move 50% (metade das imagens) para criar loop
  style.textContent = `
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `;
  
  document.head.appendChild(style);
}

// =========================
// OTIMIZAR IMAGENS DO CARROSSEL
// =========================
function optimizeCarouselImages() {
  const logos = document.querySelectorAll('.logos img');
  
  logos.forEach(img => {
    // Prevenir drag
    img.setAttribute('draggable', 'false');
    
    // Ajustar clip-path se necessário
    img.onload = function() {
      adjustLogoClip(this);
    };
    
    if (img.complete) adjustLogoClip(img);
  });
}

function adjustLogoClip(img) {
  const naturalRatio = img.naturalWidth / img.naturalHeight;
  
  // Ajustes diferentes baseados na proporção
  if (naturalRatio < 1.2) {
    img.style.clipPath = 'inset(10% 0 10% 0)';
  } else if (naturalRatio > 2) {
    img.style.clipPath = 'inset(2% 0 2% 0)';
  } else {
    img.style.clipPath = 'inset(5% 0 5% 0)';
  }
}

// =========================
// INICIALIZAR TUDO
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // Otimizar imagens
  optimizeCarouselImages();
  
  // Efeitos de hover simples
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Efeito no CTA
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.addEventListener('mouseenter', () => {
      cta.style.transform = 'translateY(-3px)';
    });
    
    cta.addEventListener('mouseleave', () => {
      cta.style.transform = 'translateY(0)';
    });
  }
});