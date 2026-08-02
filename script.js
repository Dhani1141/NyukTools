/* ===================================================================
   NyukTools — Main Script
   Fungsionalitas: search, filter, typewriter, particles, theme, dll.
   =================================================================== */

// ==================== TOOLS DATA ====================
const toolsData = [
  // ── Text Tools ──
  { id: 1,  name: "Word Counter",         slug: "word-counter",         desc: "Hitung jumlah kata, karakter, kalimat, dan paragraf dari teks apapun secara instan.",          icon: "fas fa-font",             category: "text" },
  { id: 2,  name: "Lorem Ipsum Generator", slug: "lorem-ipsum",         desc: "Generate teks placeholder Lorem Ipsum untuk mockup dan desain dengan panjang kustom.",         icon: "fas fa-paragraph",        category: "text" },
  { id: 3,  name: "Case Converter",        slug: "case-converter",      desc: "Ubah teks ke UPPERCASE, lowercase, Title Case, camelCase, dan format lainnya.",                icon: "fas fa-text-height",      category: "text" },
  { id: 4,  name: "Text Diff Checker",     slug: "text-diff",           desc: "Bandingkan dua teks dan temukan perbedaannya dengan highlight berwarna.",                      icon: "fas fa-code-compare",     category: "text" },
  { id: 5,  name: "Markdown Preview",      slug: "markdown-preview",    desc: "Tulis dan preview Markdown secara real-time dengan syntax highlighting.",                      icon: "fas fa-file-code",        category: "text" },
  { id: 6,  name: "Slug Generator",        slug: "slug-generator",      desc: "Konversi judul atau teks menjadi URL slug yang SEO-friendly secara otomatis.",                  icon: "fas fa-link",             category: "text" },

  // ── Image Tools ──
  { id: 7,  name: "Color Picker",          slug: "color-picker",        desc: "Pilih warna dengan color wheel dan dapatkan kode HEX, RGB, HSL secara langsung.",              icon: "fas fa-eye-dropper",      category: "image" },
  { id: 8,  name: "QR Code Generator",     slug: "qr-generator",        desc: "Buat QR Code dari teks, URL, atau data apapun. Download sebagai PNG atau SVG.",                icon: "fas fa-qrcode",           category: "image" },
  { id: 9,  name: "Image Compressor",      slug: "image-compressor",    desc: "Kompres gambar PNG, JPG, WebP tanpa kehilangan kualitas secara signifikan.",                    icon: "fas fa-compress",         category: "image" },
  { id: 10, name: "Favicon Generator",     slug: "favicon-generator",   desc: "Buat favicon multi-ukuran dari gambar apapun untuk website dan web app.",                      icon: "fas fa-icons",            category: "image" },
  { id: 11, name: "Palette Generator",     slug: "palette-generator",   desc: "Generate palet warna harmonis dari warna dasar untuk desain UI yang konsisten.",                icon: "fas fa-palette",          category: "image" },

  // ── Dev Tools ──
  { id: 12, name: "JSON Formatter",        slug: "json-formatter",      desc: "Format, validasi, dan beautify data JSON dengan syntax highlighting dan tree view.",            icon: "fas fa-code",             category: "dev" },
  { id: 13, name: "Base64 Encoder",        slug: "base64-encoder",      desc: "Encode dan decode teks atau file ke/dari Base64 dengan cepat dan mudah.",                      icon: "fas fa-lock",             category: "dev" },
  { id: 14, name: "Regex Tester",          slug: "regex-tester",        desc: "Tes regular expression secara real-time dengan highlight match dan penjelasan pola.",           icon: "fas fa-asterisk",         category: "dev" },
  { id: 15, name: "CSS Minifier",          slug: "css-minifier",        desc: "Minifikasi kode CSS untuk mengurangi ukuran file dan meningkatkan performa website.",           icon: "fab fa-css3-alt",         category: "dev" },
  { id: 16, name: "HTML Beautifier",       slug: "html-beautifier",     desc: "Rapikan dan format ulang kode HTML yang berantakan menjadi rapi dan terbaca.",                  icon: "fab fa-html5",            category: "dev" },
  { id: 17, name: "JWT Decoder",           slug: "jwt-decoder",         desc: "Decode dan inspeksi JSON Web Token (JWT) — lihat header, payload, dan signature.",              icon: "fas fa-key",              category: "dev" },
  { id: 18, name: "Code Diff Viewer",      slug: "code-diff",           desc: "Bandingkan dua potongan kode dan lihat perubahan baris per baris dengan warna.",                icon: "fas fa-terminal",         category: "dev" },

  // ── Converter ──
  { id: 19, name: "Unit Converter",        slug: "unit-converter",      desc: "Konversi satuan panjang, berat, suhu, kecepatan, volume, dan lainnya dengan mudah.",            icon: "fas fa-ruler",            category: "converter" },
  { id: 20, name: "Currency Converter",    slug: "currency-converter",  desc: "Konversi mata uang dunia dengan kurs terkini — IDR, USD, EUR, dan 100+ lainnya.",              icon: "fas fa-money-bill-wave",  category: "converter" },
  { id: 21, name: "Number Base Converter", slug: "number-base",         desc: "Konversi angka antara desimal, biner, oktal, dan heksadesimal secara instan.",                  icon: "fas fa-hashtag",          category: "converter" },
  { id: 22, name: "Timestamp Converter",   slug: "timestamp-converter", desc: "Konversi Unix timestamp ke tanggal/waktu manusia dan sebaliknya.",                              icon: "fas fa-clock",            category: "converter" },
  { id: 23, name: "Color Converter",       slug: "color-converter",     desc: "Konversi warna antara format HEX, RGB, HSL, CMYK dengan preview langsung.",                    icon: "fas fa-fill-drip",        category: "converter" },
  { id: 24, name: "File Size Converter",   slug: "file-size-converter", desc: "Konversi ukuran file antar satuan: Bytes, KB, MB, GB, TB dengan presisi tinggi.",               icon: "fas fa-hard-drive",       category: "converter" },

  // ── Calculator ──
  { id: 25, name: "BMI Calculator",        slug: "bmi-calculator",      desc: "Hitung Body Mass Index dari berat dan tinggi badan. Lengkap dengan kategori kesehatan.",        icon: "fas fa-weight-scale",     category: "calculator" },
  { id: 26, name: "Percentage Calculator", slug: "percentage-calculator",desc: "Hitung persentase, kenaikan, penurunan, dan perbedaan antar angka dengan mudah.",               icon: "fas fa-percent",          category: "calculator" },
  { id: 27, name: "Age Calculator",        slug: "age-calculator",      desc: "Hitung umur tepat dari tanggal lahir — tahun, bulan, hari, bahkan jam dan menit.",              icon: "fas fa-cake-candles",     category: "calculator" },
  { id: 28, name: "Discount Calculator",   slug: "discount-calculator", desc: "Hitung harga akhir setelah diskon dan berapa total penghematan yang didapat.",                  icon: "fas fa-tags",             category: "calculator" },
  { id: 29, name: "Tip Calculator",        slug: "tip-calculator",      desc: "Hitung tip restoran berdasarkan total bill, persentase tip, dan jumlah orang.",                 icon: "fas fa-utensils",         category: "calculator" },

  // ── Generator ──
  { id: 30, name: "Password Generator",    slug: "password-generator",  desc: "Generate password kuat dan aman dengan kombinasi huruf, angka, dan simbol kustom.",             icon: "fas fa-shield-halved",    category: "generator" },
  { id: 31, name: "UUID Generator",        slug: "uuid-generator",      desc: "Generate UUID v4 unik secara acak. Salin satu atau bulk generate sekaligus.",                   icon: "fas fa-fingerprint",      category: "generator" },
  { id: 32, name: "Hash Generator",        slug: "hash-generator",      desc: "Generate hash MD5, SHA-1, SHA-256, SHA-512 dari teks input apapun.",                            icon: "fas fa-file-shield",      category: "generator" },
  { id: 33, name: "Gradient Generator",    slug: "gradient-generator",  desc: "Buat CSS gradient cantik dengan visual editor dan salin kode CSS-nya langsung.",                icon: "fas fa-wand-magic-sparkles", category: "generator" },
  { id: 34, name: "Box Shadow Generator",  slug: "box-shadow-generator",desc: "Desain CSS box-shadow dengan kontrol visual dan preview langsung. Salin kode CSS-nya.",         icon: "fas fa-square",           category: "generator" },

  // ── Downloader ──
  { id: 35, name: "TikTok Downloader",     slug: "tiktok-downloader",   desc: "Download video TikTok tanpa watermark dalam resolusi HD. Gratis & cepat.",                      icon: "fab fa-tiktok",           category: "downloader" },
  { id: 36, name: "Instagram Downloader",  slug: "instagram-downloader",desc: "Download foto & video Instagram/Reels dalam resolusi HD tanpa login.",                          icon: "fab fa-instagram",        category: "downloader" },
];

// Category labels for display
const categoryLabels = {
  text: "Text Tools",
  image: "Image Tools",
  dev: "Dev Tools",
  converter: "Converter",
  calculator: "Calculator",
  generator: "Generator",
  downloader: "Downloader",
};

// ==================== STATE ====================
let currentFilter = "all";
let currentSearch = "";

document.addEventListener("DOMContentLoaded", function () {
  initLoader();
  initParticles();
  initTypewriter();
  initNavbar();
  initThemeSelector();
  initSearch();
  initFilterTabs();
  renderTools();
  initStatsCounter();
  initScrollAnimations();
  initBackToTop();
  init3DCards();
});

// ==================== LOADER ====================
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.classList.add("hidden");
    }, 1200);
  });

  // Fallback: hide loader after 3s max
  setTimeout(function () {
    loader.classList.add("hidden");
  }, 3000);
}

// ==================== PARTICLES ====================
function initParticles() {
  if (typeof particlesJS === "undefined") return;

  // Get current accent color
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#10b981";

  particlesJS("particles-js", {
    particles: {
      number: { value: 45, density: { enable: true, value_area: 900 } },
      color: { value: accent },
      shape: { type: "circle" },
      opacity: {
        value: 0.25,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false },
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: true, speed: 1, size_min: 0.5, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: accent,
        opacity: 0.08,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: false },
        resize: true,
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.2 } },
      },
    },
    retina_detect: true,
  });
}

// ==================== TYPEWRITER ====================
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const phrases = [
    "36+ Tools Online Gratis 🚀",
    "Download TikTok & IG HD",
    "Developer • Desainer • Kreator",
    "Cepat, Mudah & Tanpa Registrasi",
    "Tools untuk Semua Kebutuhan ⚡",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

// ==================== NAVBAR ====================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Scroll effect: glassmorphism → solid
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      navbar.classList.add("solid");
    } else {
      navbar.classList.remove("solid");
    }
  });

  // Mobile hamburger toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu on link click
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// ==================== THEME SELECTOR ====================
function initThemeSelector() {
  const themeBtn = document.getElementById("themeBtn");
  const themeDropdown = document.getElementById("themeDropdown");
  const themeOptions = document.querySelectorAll(".theme-option");

  if (!themeBtn || !themeDropdown) return;

  // Toggle dropdown
  themeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    themeDropdown.classList.toggle("show");
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (!themeBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
      themeDropdown.classList.remove("show");
    }
  });

  // Load saved theme
  const savedAccent = localStorage.getItem("tn-accent");
  const savedHover = localStorage.getItem("tn-accent-hover");
  if (savedAccent && savedHover) {
    applyTheme(savedAccent, savedHover);
    themeOptions.forEach(function (opt) {
      opt.classList.toggle("active", opt.dataset.accent === savedAccent);
    });
  }

  // Theme option click
  themeOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      const accent = this.dataset.accent;
      const hover = this.dataset.hover;

      applyTheme(accent, hover);

      // Update active state
      themeOptions.forEach(function (o) { o.classList.remove("active"); });
      option.classList.add("active");

      // Save to localStorage
      localStorage.setItem("tn-accent", accent);
      localStorage.setItem("tn-accent-hover", hover);

      themeDropdown.classList.remove("show");
      showToast("Tema berhasil diubah! 🎨");
    });
  });
}

function applyTheme(accent, hover) {
  const root = document.documentElement;
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-hover", hover);

  // Update glow/subtle colors
  const r = parseInt(accent.slice(1, 3), 16);
  const g = parseInt(accent.slice(3, 5), 16);
  const b = parseInt(accent.slice(5, 7), 16);
  root.style.setProperty("--accent-glow", `rgba(${r}, ${g}, ${b}, 0.3)`);
  root.style.setProperty("--accent-subtle", `rgba(${r}, ${g}, ${b}, 0.1)`);
  root.style.setProperty("--shadow-accent", `0 8px 32px rgba(${r}, ${g}, ${b}, 0.2)`);

  // Re-init particles with new color
  if (typeof pJSDom !== "undefined" && pJSDom.length > 0) {
    pJSDom[0].pJS.fn.vendors.destroypJS();
    pJSDom = [];
    initParticles();
  }
}

// ==================== SEARCH ====================
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");

  if (!searchInput) return;

  let debounceTimer;

  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      currentSearch = searchInput.value.trim().toLowerCase();
      renderTools();
    }, 200);

    // Toggle clear button
    if (searchClear) {
      searchClear.classList.toggle("visible", searchInput.value.length > 0);
    }
  });

  if (searchClear) {
    searchClear.addEventListener("click", function () {
      searchInput.value = "";
      currentSearch = "";
      searchClear.classList.remove("visible");
      renderTools();
      searchInput.focus();
    });
  }
}

// ==================== FILTER TABS ====================
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderTools();
    });
  });
}

// Public helper for footer links
function filterByCategory(cat) {
  currentFilter = cat;
  currentSearch = "";

  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  if (searchInput) searchInput.value = "";
  if (searchClear) searchClear.classList.remove("visible");

  // Update active tab
  document.querySelectorAll(".filter-tab").forEach(function (t) {
    t.classList.toggle("active", t.dataset.filter === cat);
  });

  renderTools();

  // Scroll to tools section
  const toolsSection = document.getElementById("tools-section");
  if (toolsSection) {
    toolsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ==================== RENDER TOOLS ====================
function renderTools() {
  const grid = document.getElementById("toolsGrid");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("searchResultCount");

  if (!grid) return;

  // Filter tools
  const filtered = toolsData.filter(function (tool) {
    const matchesCategory = currentFilter === "all" || tool.category === currentFilter;
    const matchesSearch =
      !currentSearch ||
      tool.name.toLowerCase().includes(currentSearch) ||
      tool.desc.toLowerCase().includes(currentSearch) ||
      tool.category.toLowerCase().includes(currentSearch) ||
      (categoryLabels[tool.category] || "").toLowerCase().includes(currentSearch);
    return matchesCategory && matchesSearch;
  });

  // Update result count
  if (resultCount) {
    if (currentSearch || currentFilter !== "all") {
      resultCount.textContent = `Menampilkan ${filtered.length} dari ${toolsData.length} tools`;
    } else {
      resultCount.textContent = "";
    }
  }

  // Show/hide no results
  if (noResults) {
    noResults.style.display = filtered.length === 0 ? "block" : "none";
  }

  // Build cards HTML
  grid.innerHTML = filtered
    .map(function (tool, index) {
      return `
        <div class="tool-card">
          <span class="tool-card-category">${categoryLabels[tool.category] || tool.category}</span>
          <i class="${tool.icon} tool-card-icon"></i>
          <h3>${highlightMatch(tool.name)}</h3>
          <p>${highlightMatch(tool.desc)}</p>
          <a href="tool.html?id=${tool.slug}" class="tool-card-btn" style="display:block;text-align:center;text-decoration:none;">
            <i class="fas fa-external-link-alt" style="margin-right:0.4rem;font-size:0.8rem;"></i>Buka Tool
          </a>
        </div>
      `;
    })
    .join("");

  // Trigger scroll animations for new cards
  requestAnimationFrame(function () {
    observeCards();
  });
}

// Highlight search matches in text
function highlightMatch(text) {
  if (!currentSearch) return text;
  const regex = new RegExp(`(${escapeRegex(currentSearch)})`, "gi");
  return text.replace(regex, '<mark style="background:var(--accent-subtle);color:var(--accent);border-radius:2px;padding:0 2px;">$1</mark>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Open tool handler (fallback — cards now use direct links)
function openTool(slug) {
  window.location.href = 'tool.html?id=' + slug;
}

// ==================== STATS COUNTER ====================
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const progressFills = document.querySelectorAll(".progress-fill");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Animate numbers
          if (entry.target.classList.contains("stat-number")) {
            animateCounter(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  statNumbers.forEach(function (num) { observer.observe(num); });

  // Animate progress bars when stats section is visible
  const statsSection = document.getElementById("stats");
  if (statsSection) {
    const progressObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            progressFills.forEach(function (fill) {
              const target = fill.dataset.target;
              setTimeout(function () {
                fill.style.width = target + "%";
              }, 500);
            });
            progressObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    progressObserver.observe(statsSection);
  }
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal === "true";
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else if (target >= 1000) {
      el.textContent = Math.floor(current).toLocaleString("id-ID") + "+";
    } else {
      el.textContent = Math.floor(current) + "+";
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Final value
      if (isDecimal) {
        el.textContent = target.toFixed(1);
      } else if (target >= 1000) {
        el.textContent = target.toLocaleString("id-ID") + "+";
      } else {
        el.textContent = target + "+";
      }
    }
  }

  requestAnimationFrame(update);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  observeCards();
}

function observeCards() {
  const cards = document.querySelectorAll(".tool-card:not(.show)");

  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px 100px 0px",
    }
  );

  cards.forEach(function (card) { observer.observe(card); });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== TOAST ====================
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// ==================== 3D TILT CARD ENGINE ====================
function init3DCards() {
  var grid = document.getElementById("toolsGrid");
  if (!grid) return;

  var MAX_TILT = 15;       // Max tilt degrees
  var GLARE_OPACITY = 0.15; // Max glare brightness
  var SCALE_HOVER = 1.05;  // Scale on hover
  var TRANSITION_OUT = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)";

  // Use event delegation on the grid for performance
  grid.addEventListener("mousemove", function (e) {
    var card = e.target.closest(".tool-card");
    if (!card || !card.classList.contains("show")) return;

    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;  // Mouse X within card
    var y = e.clientY - rect.top;   // Mouse Y within card
    var w = rect.width;
    var h = rect.height;

    // Normalize to -1 to 1
    var normX = (x / w) * 2 - 1;
    var normY = (y / h) * 2 - 1;

    // Calculate tilt (inverted Y for natural feel)
    var tiltX = -normY * MAX_TILT;  // Tilt around X axis
    var tiltY = normX * MAX_TILT;   // Tilt around Y axis

    // Apply 3D transform — no CSS transition for instant response
    card.style.transition = "border-color 0.3s ease, background 0.3s ease";
    card.style.transform = "perspective(800px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) scale3d(" + SCALE_HOVER + "," + SCALE_HOVER + "," + SCALE_HOVER + ")";

    // Dynamic shadow — follows tilt direction
    var shadowX = tiltY * 1.5;
    var shadowY = -tiltX * 1.5;
    card.style.boxShadow = shadowX + "px " + shadowY + "px 30px rgba(0,0,0,0.3), " +
      "0 0 20px var(--accent-glow), " +
      "inset 0 0 0 1px rgba(255,255,255,0.05)";

    // Update CSS custom props for glare/glow position
    var percentX = (x / w * 100).toFixed(1) + "%";
    var percentY = (y / h * 100).toFixed(1) + "%";
    card.style.setProperty("--mouse-x", percentX);
    card.style.setProperty("--mouse-y", percentY);
  });

  // Reset on mouse leave — smooth spring back
  grid.addEventListener("mouseleave", handleReset, true);

  grid.addEventListener("mouseout", function (e) {
    var card = e.target.closest(".tool-card");
    var related = e.relatedTarget;
    if (card && (!related || !card.contains(related))) {
      resetCard(card);
    }
  });

  function handleReset(e) {
    var card = e.target.closest(".tool-card");
    if (card) resetCard(card);
  }

  function resetCard(card) {
    card.style.transition = TRANSITION_OUT;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow = "";
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
  }

  // Re-initialize after search/filter re-renders
  var observer = new MutationObserver(function () {
    // Cards are replaced on filter, no extra init needed since we use delegation
  });
  observer.observe(grid, { childList: true });
}

// Helper: attach 3D to footer category links
function filterByCategory(cat) {
  var tab = document.querySelector('.filter-tab[data-filter="' + cat + '"]');
  if (tab) {
    tab.click();
    document.getElementById("tools-section").scrollIntoView({ behavior: "smooth" });
  }
}
