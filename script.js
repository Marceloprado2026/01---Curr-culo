/* ========================================
   Marcelo Prado Artes — Interações
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initNav();
  initThemeToggle();
  initReveal();
  initParticles();
  initLangBars();
  initPortfolioModal();
  initActiveNav();
  initHeroTags();
  initHomeFab();
});

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---- Tema claro / escuro ---- */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("mpa-theme", theme);
    } catch (e) {}
    const isDark = theme !== "light";
    btn.setAttribute("aria-checked", String(isDark));
    btn.setAttribute(
      "aria-label",
      isDark ? "Desativar modo escuro" : "Ativar modo escuro"
    );
    btn.title = isDark ? "Dark Mode ativo" : "Dark Mode desativado";
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  applyTheme(currentTheme());

  btn.addEventListener("click", () => {
    applyTheme(currentTheme() === "light" ? "dark" : "light");
  });
}

/* ---- Navegação ---- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    links.classList.toggle("open");
  });

  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      links.classList.remove("open");
    });
  });
}

/* ---- Reveal ao scroll ---- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = (entry.target.dataset.delay || i % 4) * 80;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el, i) => {
    el.dataset.delay = i % 4;
    observer.observe(el);
  });
}

/* ---- Barras de idioma ---- */
function initLangBars() {
  const cards = document.querySelectorAll(".lang-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  cards.forEach((card) => observer.observe(card));
}

/* ---- Nav ativa por seção ---- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-15% 0px -45% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---- Galeria / Lightbox tela cheia ---- */
const GALLERY = [
  {
    id: "grafite",
    projectTitle: "Retratos em Grafite",
    images: [
      {
        title: "Perfil em Sombra Suave",
        technique: "Grafite sobre papel texturizado",
        year: "2023",
        author: "Marcelo Prado",
        src: "assets/portfolio-grafite.jpg",
        desc: "Retrato em perfil explorando a transição entre luz e sombra, com ênfase na delicadeza do traço.",
      },
      {
        title: "Olhar em Três Quartos",
        technique: "Grafite 2B–6B",
        year: "2023",
        author: "Marcelo Prado",
        src: "assets/grafite-2.jpg",
        desc: "Estudo de volume facial em três quartos, com modelagem clássica e contraste controlado.",
      },
      {
        title: "Estudo de Olhar",
        technique: "Grafite fino e esfumado",
        year: "2022",
        author: "Marcelo Prado",
        src: "assets/grafite-3.jpg",
        desc: "Close do olhar e da estrutura nasal — detalhe anatômico e atmosfera contemplativa.",
      },
    ],
  },
  {
    id: "foto",
    projectTitle: "Luz Azul Urbana",
    images: [
      {
        title: "Reflexos Noturnos",
        technique: "Fotografia digital — blue hour",
        year: "2022",
        author: "Marcelo Prado",
        src: "assets/portfolio-foto.jpg",
        desc: "Rua molhada sob luz azul, com reflexos e profundidade de campo cinematográfica.",
      },
      {
        title: "Neon sobre o Asfalto",
        technique: "Fotografia noturna",
        year: "2022",
        author: "Marcelo Prado",
        src: "assets/foto-2.jpg",
        desc: "Neon e chuva no pavimento — atmosfera urbana em cobalto e ciano.",
      },
      {
        title: "Silêncio da Blue Hour",
        technique: "Fotografia documental",
        year: "2021",
        author: "Marcelo Prado",
        src: "assets/foto-3.jpg",
        desc: "Rua quieta na blue hour, com bokeh suave e tons frios.",
      },
    ],
  },
  {
    id: "ilustracao",
    projectTitle: "Correntes Visuais",
    images: [
      {
        title: "Ondas de Cobalto",
        technique: "Ilustração digital mista",
        year: "2024",
        author: "Marcelo Prado",
        src: "assets/portfolio-ilustracao.jpg",
        desc: "Formas orgânicas em cobalto e ciano inspiradas em tinta e água em movimento.",
      },
      {
        title: "Fluxo Azul",
        technique: "Ink digital e aquarela",
        year: "2024",
        author: "Marcelo Prado",
        src: "assets/ilustracao-2.jpg",
        desc: "Composição fluida que sugere respiração e ritmo visual contínuo.",
      },
      {
        title: "Botânica Etérea",
        technique: "Ilustração digital",
        year: "2023",
        author: "Marcelo Prado",
        src: "assets/ilustracao-3.jpg",
        desc: "Formas botânicas e gestos de pincel em paleta azul profunda.",
      },
    ],
  },
  {
    id: "tecnicas",
    projectTitle: "Técnicas mistas",
    images: [
      {
        title: "Estudo de Mãos",
        technique: "Grafite e carvão sobre papel tonalizado",
        year: "2021",
        author: "Marcelo Prado",
        src: "assets/tecnicas-mistas-1.jpg",
        desc: "Estudo anatômico de duas mãos em técnicas mistas, com hachuras e volume sobre papel tonalizado.",
      },
    ],
  },
];

function initPortfolioModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const img = document.getElementById("modalImage");
  const title = document.getElementById("modalTitle");
  const technique = document.getElementById("modalTechnique");
  const year = document.getElementById("modalYear");
  const author = document.getElementById("modalAuthor");
  const desc = document.getElementById("modalDesc");
  const counter = document.getElementById("modalCounter");
  const projectLabel = document.getElementById("modalProjectLabel");
  const dots = document.getElementById("modalDots");
  const btnPrevProject = document.getElementById("lightboxPrevProject");
  const btnNextProject = document.getElementById("lightboxNextProject");
  const btnPrevImage = document.getElementById("lightboxPrevImage");
  const btnNextImage = document.getElementById("lightboxNextImage");
  const zoomTrigger = document.getElementById("lightboxZoomTrigger");
  const imageZoom = document.getElementById("imageZoom");
  const zoomImage = document.getElementById("zoomImage");
  const figure = modal.querySelector(".lightbox-figure");

  let projectIndex = 0;
  let imageIndex = 0;

  function wrap(index, length) {
    return ((index % length) + length) % length;
  }

  function renderDots(total, active) {
    if (!dots) return;
    dots.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      if (i === active) dot.classList.add("active");
      dots.appendChild(dot);
    }
  }

  function render(animate = true) {
    const project = GALLERY[projectIndex];
    const item = project.images[imageIndex];
    const totalImages = project.images.length;

    const apply = () => {
      img.src = item.src;
      img.alt = item.title;
      title.textContent = item.title;
      technique.textContent = item.technique;
      year.textContent = item.year;
      author.textContent = item.author;
      desc.textContent = item.desc;
      projectLabel.textContent = `Projeto ${projectIndex + 1} / ${GALLERY.length} · ${project.projectTitle}`;
      counter.textContent = `Imagem ${imageIndex + 1} / ${totalImages}`;
      renderDots(totalImages, imageIndex);
      img.classList.remove("is-switching");

      if (animate && figure) {
        figure.style.animation = "none";
        void figure.offsetWidth;
        figure.style.animation = "";
      }
    };

    if (animate) {
      img.classList.add("is-switching");
      setTimeout(apply, 160);
    } else {
      apply();
    }
  }

  function isZoomOpen() {
    return imageZoom?.classList.contains("open");
  }

  function openZoom() {
    const item = GALLERY[projectIndex].images[imageIndex];
    if (!imageZoom || !zoomImage || !item) return;
    zoomImage.src = item.src;
    zoomImage.alt = item.title;
    imageZoom.classList.add("open");
    imageZoom.setAttribute("aria-hidden", "false");
    modal.classList.add("zoom-active");
  }

  function closeZoom() {
    if (!imageZoom) return;
    imageZoom.classList.remove("open");
    imageZoom.setAttribute("aria-hidden", "true");
    modal.classList.remove("zoom-active");
  }

  function openModal(key) {
    const index = GALLERY.findIndex((item) => item.id === key);
    projectIndex = index >= 0 ? index : 0;
    imageIndex = 0;
    closeZoom();
    render(false);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    closeZoom();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }

  function syncZoomImage() {
    if (!isZoomOpen() || !zoomImage) return;
    const item = GALLERY[projectIndex].images[imageIndex];
    if (!item) return;
    zoomImage.classList.add("is-switching");
    setTimeout(() => {
      zoomImage.src = item.src;
      zoomImage.alt = item.title;
      zoomImage.classList.remove("is-switching");
    }, 120);
  }

  function changeProject(delta) {
    if (isZoomOpen()) return;
    projectIndex = wrap(projectIndex + delta, GALLERY.length);
    imageIndex = 0;
    render(true);
  }

  function changeImage(delta) {
    const total = GALLERY[projectIndex].images.length;
    if (total <= 1) return;
    imageIndex = wrap(imageIndex + delta, total);
    render(!isZoomOpen());
    syncZoomImage();
  }

  document.querySelectorAll(".portfolio-card").forEach((card) => {
    const btn = card.querySelector(".open-project");
    const key = card.dataset.project;

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(key);
    });

    card.addEventListener("click", () => openModal(key));
  });

  btnPrevProject?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeProject(-1);
  });

  btnNextProject?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeProject(1);
  });

  btnPrevImage?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeImage(-1);
  });

  btnNextImage?.addEventListener("click", (e) => {
    e.stopPropagation();
    changeImage(1);
  });

  zoomTrigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    openZoom();
  });

  imageZoom?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeZoom();
  });

  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      if (isZoomOpen()) closeZoom();
      else closeModal();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") {
      if (isZoomOpen()) closeZoom();
      else closeModal();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      changeImage(-1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      changeImage(1);
      return;
    }
    if (isZoomOpen()) return;
    if (e.key === "ArrowLeft") changeProject(-1);
    if (e.key === "ArrowRight") changeProject(1);
  });
}

/* ---- Tags Ilustração / Fotografia / Grafite ---- */
function initHeroTags() {
  const tags = document.querySelectorAll(".hero-tags .tag");
  const cards = document.querySelectorAll(".portfolio-card");
  if (!tags.length || !cards.length) return;

  let clearTimer = null;

  function applyFilter(filter) {
    tags.forEach((tag) => {
      tag.classList.toggle("active", tag.dataset.filter === filter);
    });

    cards.forEach((card) => {
      const match = card.dataset.category === filter;
      card.classList.toggle("is-highlighted", match);
      card.classList.toggle("is-dimmed", !match);
    });

    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove("is-highlighted", "is-dimmed");
      });
      tags.forEach((tag) => tag.classList.remove("active"));
    }, 4500);
  }

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const filter = tag.dataset.filter;
      const section = document.getElementById("projetos");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      applyFilter(filter);
    });
  });
}

/* ---- Botão flutuante Home ---- */
function initHomeFab() {
  const fab = document.getElementById("homeFab");
  const hero = document.getElementById("inicio");
  if (!fab || !hero) return;

  const mediaEls = () =>
    document.querySelectorAll(
      ".portrait-img, .portfolio-thumb img, .lightbox.open img"
    );

  function updateVisibility() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const pastHome = window.scrollY + 120 > heroBottom * 0.55;
    fab.classList.toggle("visible", pastHome);
  }

  function updateOverlap() {
    if (!fab.classList.contains("visible")) {
      fab.classList.remove("over-media");
      return;
    }

    const fabRect = fab.getBoundingClientRect();
    let overlaps = false;

    mediaEls().forEach((el) => {
      const r = el.getBoundingClientRect();
      const hit =
        fabRect.left < r.right &&
        fabRect.right > r.left &&
        fabRect.top < r.bottom &&
        fabRect.bottom > r.top;
      if (hit) overlaps = true;
    });

    fab.classList.toggle("over-media", overlaps);
  }

  function onScroll() {
    updateVisibility();
    updateOverlap();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  fab.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
  });
}

/* ---- Partículas / poeira artística ---- */
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];
  let raf = null;
  let mouse = { x: null, y: null };

  const PARTICLE_COUNT = 55;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.1,
      alpha: Math.random() * 0.45 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulse += 0.02;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }
      }

      const a = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const fill = light ? `rgba(43, 108, 176, ${a * 0.75})` : `rgba(126, 182, 232, ${a})`;
      const strokeBase = light ? "43, 108, 176" : "94, 200, 255";

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${strokeBase}, ${0.08 * (1 - d / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "mouseleave",
    () => {
      mouse.x = null;
      mouse.y = null;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
  });

  resize();
  init();
  draw();
}
