// ── Shared JS for all pages ──────────────────────

// ── Auth gate ────────────────────────────────────
// Redirige vers gate.html si pas authentifié
if (sessionStorage.getItem('bsAuth') !== '1') {
  location.replace('gate.html');
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Active nav link
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  if (link.href === window.location.href || link.pathname === window.location.pathname) {
    link.classList.add('active');
  }
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    mobileMenu.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translateY(6px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translateY(-6px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });
}

// Scroll reveal via IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Rank accordion (hierarchy page)
document.querySelectorAll('.rank-row').forEach(row => {
  row.querySelector('.rank-header')?.addEventListener('click', () => {
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.rank-row').forEach(r => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  });
});

// Zone tabs (territory page)
const zoneTabs = document.querySelectorAll('.zone-tab');
const zoneDetails = document.querySelectorAll('.zone-detail-panel');
zoneTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    zoneTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.zone;
    zoneDetails.forEach(d => {
      d.style.display = d.dataset.zone === target ? 'block' : 'none';
    });
  });
});
// Activate first tab by default
if (zoneTabs.length) {
  zoneTabs[0].classList.add('active');
  if (zoneDetails.length) {
    zoneDetails.forEach((d, i) => { d.style.display = i === 0 ? 'block' : 'none'; });
  }
}

// Typewriter effect (homepage hero)
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const text = typeEl.dataset.text || '';
  let i = 0;
  typeEl.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  typeEl.parentElement.appendChild(cursor);
  const type = () => {
    if (i < text.length) {
      typeEl.textContent += text[i++];
      setTimeout(type, 75);
    } else {
      cursor.style.display = 'none';
    }
  };
  setTimeout(type, 600);
}

// Page transition overlay
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:#0A0A0A;z-index:9998;animation:none;';
    overlay.style.opacity = '0';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity .3s ease';
      overlay.style.opacity = '1';
      setTimeout(() => { window.location.href = href; }, 320);
    });
  });
});
