// Car Lineup Data
const carData = [
  {
    id: "cx5",
    name: "MAZDA CX-5",
    subtitle: "NÂNG TẦM ĐẲNG CẤP",
    category: "suv",
    imageDefault: "assets/img/car-model/cx5.jpg",
    imageHover: "assets/img/car-model/cx5-2.jpg",
  },
  {
    id: "cx30",
    name: "MAZDA CX-30",
    subtitle: "LINH HOẠT & ĐA DỤNG",
    category: "hatchbacks",
    imageDefault: "assets/img/car-model/cx30.jpg",
    imageHover: "assets/img/car-model/cx30-2.jpg",
  },
  {
    id: "cx90",
    name: "MAZDA CX-90",
    subtitle: "NÂNG TẦM ĐẲNG CẤP",
    category: "suv",
    imageDefault: "assets/img/car-model/cx90.jpg",
    imageHover: "assets/img/car-model/cx90-2.jpg",
  },
  {
    id: "cx70",
    name: "MAZDA CX-70",
    subtitle: "SANG TRỌNG & TINH TẾ",
    category: "suv",
    imageDefault: "assets/img/car-model/cx70.jpg",
    imageHover: "assets/img/car-model/cx70-2.jpg",
  },
  {
    id: "cx70hybird",
    name: "MAZDA CX-70 HYBRID",
    subtitle: "TIẾT KIỆM & MẠNH MẼ",
    category: "suv",
    imageDefault: "assets/img/car-model/cx70hybird.jpg",
    imageHover: "assets/img/car-model/cx70hybird-2.jpg",
  },
];

// Car Lineup Swiper
let carLineupSwiper = null;

function initCarLineup() {
  const swiperWrapper = document.getElementById("carlineup-swiper-wrapper");
  const filters = document.querySelectorAll(".carlineup__filter");
  let currentCategory = "all";
  const MIN_LOOP_SLIDES = 6;

  function filterCars(category) {
    currentCategory = category;
    const filteredCars =
      category === "all"
        ? carData
        : carData.filter((car) => car.category === category);

    let carsForSlides = [...filteredCars];
    if (carsForSlides.length > 0) {
      while (carsForSlides.length < MIN_LOOP_SLIDES) {
        carsForSlides = carsForSlides.concat(filteredCars);
      }
    }

    filters.forEach((filter) => {
      const filterCategory = filter.getAttribute("data-category");
      if (filterCategory === category) {
        filter.setAttribute("data-active", "true");
      } else {
        filter.setAttribute("data-active", "false");
      }
    });

    generateSlides(carsForSlides);

    if (carLineupSwiper) {
      carLineupSwiper.destroy(true, true);
    }
    initSwiper(carsForSlides.length);
  }

  function generateSlides(cars) {
    swiperWrapper.innerHTML = "";
    cars.forEach((car) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide carlineup__slide";
      slide.innerHTML = `
        <div class="carlineup__card">
          <div class="carlineup__image-wrapper">
            <img
              src="${car.imageDefault}"
              alt="${car.name}"
              class="carlineup__image carlineup__image--default"
            />
            <img
              src="${car.imageHover}"
              alt="${car.name}"
              class="carlineup__image carlineup__image--hover"
            />
            <div class="carlineup__overlay">
              <div class="carlineup__overlay-top">
                <h3 class="carlineup__name-overlay">${car.name}</h3>
                <div class="carlineup__subtitle-overlay">${car.subtitle}</div>
              </div>
              <div class="carlineup__overlay-bottom">
                <div class="carlineup__divider"></div>
                <div class="carlineup__actions-overlay">
                  <a href="#" class="carlineup__link-overlay">KHÁM PHÁ</a>
                  <a href="#" class="carlineup__link-overlay">GIÁ TỪ 749 TRIỆU ĐỒNG</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });
  }

  function initSwiper(totalSlides) {
    const swiperEl = document.querySelector(".carlineup__swiper");
    const prevBtn = document.querySelector(".carlineup__nav-btn--prev");
    const nextBtn = document.querySelector(".carlineup__nav-btn--next");

    carLineupSwiper = new Swiper(swiperEl, {
      slidesPerView: 1.2,
      spaceBetween: 24,
      loop: true,
      loopAdditionalSlides: Math.max(3, Math.ceil((totalSlides || 6) / 2)),
      loopedSlides: Math.max(3, Math.min(totalSlides || 6, 10)),
      speed: 600,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      mousewheel: { forceToAxis: true, sensitivity: 0.6 },
      keyboard: { enabled: true },
      watchSlidesProgress: true,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: 3.2,
          spaceBetween: 24,
        },
      },
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-category");
      filterCars(category);
    });
  });

  filterCars("all");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initCarLineup();
    initBackToTop();
    initHeader();
  });
} else {
  initCarLineup();
  initBackToTop();
  initHeader();
}

// Header - Mobile Menu & Sticky
function initHeader() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".header__menu-toggle");
  const mobileMenu = document.querySelector(".header__mobile-menu");
  const SCROLL_THRESHOLD = 50;

  if (!header) return;

  // Sticky header on scroll
  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.setAttribute("aria-hidden", isExpanded);
      
      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll(".header__mobile-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.getAttribute("aria-hidden") === "false" &&
        !header.contains(e.target)
      ) {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }
}

// Back To Top
function initBackToTop() {
  const btn = document.querySelector(".backtotop");
  if (!btn) return;
  const SHOW_AFTER = 400;

  function onScroll() {
    if (window.scrollY > SHOW_AFTER) {
      btn.setAttribute("data-visible", "true");
    } else {
      btn.setAttribute("data-visible", "false");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}