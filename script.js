window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  setTimeout(() => {
    if (loader) {
      loader.style.display = 'none';
    }
    initCarousel();
  }, 1200);
});

function initCarousel() {
  const track = document.querySelector('.logos-track');
  const container = document.querySelector('.logos');
  
  if (!track || !container) return;
  
  setCarouselSpeed();
  
  if (window.innerWidth > 480) {
    container.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    container.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
  
  container.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('touchend', () => {
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 300);
  });
  
  optimizeCarouselImages();
  window.addEventListener('resize', debounce(setCarouselSpeed, 250));
}

function setCarouselSpeed() {
  const track = document.querySelector('.logos-track');
  if (!track) return;
  
  const isMobile = window.innerWidth <= 480;
   const speed = isMobile ? '40s' : '35s';
  
  track.style.animation = `scroll ${speed} linear infinite`;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function optimizeCarouselImages() {
  const logos = document.querySelectorAll('.logos img');
  
  logos.forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => e.preventDefault());
    
    img.onload = function() {
      adjustLogoClip(this);
    };
    
    if (img.complete) adjustLogoClip(img);
  });
}

function adjustLogoClip(img) {
  const naturalRatio = img.naturalWidth / img.naturalHeight;
  
  if (naturalRatio < 1.2) {
    img.style.clipPath = 'inset(10% 0 10% 0)';
  } else if (naturalRatio > 2) {
    img.style.clipPath = 'inset(2% 0 2% 0)';
  } else {
    img.style.clipPath = 'inset(5% 0 5% 0)';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  optimizeCarouselImages();
  
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mousedown', () => {
      card.style.transform = 'translateY(0) scale(0.98)';
    });
    
    card.addEventListener('mouseup', () => {
      card.style.transform = 'translateY(-2px)';
    });
  });
  
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
    
    cta.addEventListener('mousedown', () => {
      cta.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    cta.addEventListener('mouseup', () => {
      cta.style.transform = 'translateY(-3px)';
    });
  }
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        optimizeCarouselImages();
      }
    });
  });
  
  const track = document.querySelector('.logos-track');
  if (track) {
    observer.observe(track, { childList: true });
  }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

let startY = 0;
document.addEventListener('touchstart', (event) => {
  startY = event.touches[0].pageY;
}, { passive: true });

document.addEventListener('touchmove', (event) => {
  const y = event.touches[0].pageY;
  if (window.scrollY === 0 && y > startY) {
    event.preventDefault();
  }
}, { passive: false });