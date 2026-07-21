const navLinks = document.querySelectorAll("header nav a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navBar = document.querySelector("header nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = () => typeof window.gsap !== "undefined" && !reduceMotion;
const sectionTargets = Array.from(navLinks).map((link) => link.dataset.target);

const getSectionIndex = (target) => sectionTargets.indexOf(target);

const animateItems = (items, options = {}) => {
  if (!hasGsap() || !items || items.length === 0) return;

  gsap.fromTo(
    items,
    {
      autoAlpha: options.fromOpacity ?? 0,
      y: options.y ?? 32,
      x: options.x ?? 0,
      scale: options.scale ?? 1,
    },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: options.duration ?? 0.75,
      stagger: options.stagger ?? 0.08,
      ease: options.ease ?? "power3.out",
      clearProps: "transform,opacity,visibility",
    }
  );
};

const animateSection = (section) => {
  if (!section || !hasGsap()) return;

  const selectors = {
    home: ".home-detail > *, .home-img",
    services: ".heading, .services-box",
    resume: ".resume-box",
    portifolio: ".heading, .portifolio-box",
    contact: ".contact-box",
  };

  const sectionClass = Array.from(section.classList).find(
    (className) => selectors[className]
  );

  animateItems(section.querySelectorAll(selectors[sectionClass] || "> *"));
};

const showSection = (idx) => {
  sections[idx].classList.add("active");
  setTimeout(() => animateSection(sections[idx]), 1700);
};

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navBar.classList.toggle("active");

  if (navBar.classList.contains("active")) {
    animateItems(navBar.querySelectorAll("a"), { y: 16, stagger: 0.06 });
  }
});

const activePage = () => {
  const header = document.querySelector("header");
  const barsBox = document.querySelector(".bars-box");

  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 1100);

  navLinks.forEach((section) => {
    section.classList.remove("active");
  });

  barsBox.classList.remove("active");
  setTimeout(() => {
    barsBox.classList.add("active");
  }, 1100);
  sections.forEach((link) => {
    link.classList.remove("active");
  });

  menuIcon.classList.remove("bx-x");
  navBar.classList.remove("active");
};

navLinks.forEach((link, idx) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!link.classList.contains("active")) {
      activePage();

      link.classList.add("active");
      window.history.replaceState(null, "", `#${link.dataset.target}`);

      setTimeout(() => {
        showSection(idx);
      }, 1100);
    }
  });
});

logoLink.addEventListener("click", () => {
  window.history.replaceState(null, "", "#home");

  if (!navLinks[0].classList.contains("active")) {
    activePage();

    navLinks[0].classList.add("active");

    setTimeout(() => {
      showSection(0);
    }, 1100);
  }
});

const activateInitialHash = () => {
  const target = window.location.hash.replace("#", "");
  const targetIndex = getSectionIndex(target);

  if (targetIndex <= 0) return;

  navLinks.forEach((link) => link.classList.remove("active"));
  sections.forEach((section) => section.classList.remove("active"));

  navLinks[targetIndex].classList.add("active");
  sections[targetIndex].classList.add("active");
};

activateInitialHash();

const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });

    resumeDetails[idx].classList.add("active");
    animateItems(resumeDetails[idx].querySelectorAll(".resume-item"), {
      y: 24,
      stagger: 0.05,
    });
  });
});

const arrowRight = document.querySelector(
  ".portifolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portifolio-box .navigation .arrow-left"
);

let index = 0;

const getPortfolioImages = () =>
  document.querySelectorAll(".portifolio-carousel .img-item");

const updatePortfolioNavigation = () => {
  const maxIndex = Math.max(getPortfolioImages().length - 1, 0);

  if (arrowLeft) {
    arrowLeft.classList.toggle("disabled", index <= 0);
    arrowLeft.disabled = index <= 0;
  }

  if (arrowRight) {
    arrowRight.classList.toggle("disabled", index >= maxIndex);
    arrowRight.disabled = index >= maxIndex;
  }
};

const animatePortfolio = () => {
  if (!hasGsap()) return;

  const activeDetail = document.querySelector(".portifolio-detail.active");
  const activeImage = getPortfolioImages()[index];

  if (activeDetail) {
    animateItems(activeDetail.children, { x: -24, y: 0, stagger: 0.06 });
  }

  if (activeImage) {
    gsap.fromTo(
      activeImage.querySelector("img"),
      { autoAlpha: 0.72, scale: 1.04 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
      }
    );
  }
};

const activePortifolio = () => {
  const imgSlide = document.querySelector(".portifolio-carousel .img-slide");
  const portifolioDetails = document.querySelectorAll(".portifolio-detail");
  const maxIndex = Math.max(getPortfolioImages().length - 1, 0);

  if (imgSlide) {
    index = Math.max(0, Math.min(index, maxIndex));

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
      index * 2
    }rem))`;

    portifolioDetails.forEach((detail) => {
      detail.classList.remove("active");
    });

    const activeDetail = portifolioDetails[index] || portifolioDetails[0];

    if (activeDetail) {
      activeDetail.classList.add("active");
    }

    updatePortfolioNavigation();
    animatePortfolio();
  }
};

if (arrowRight) {
  arrowRight.addEventListener("click", () => {
    const maxIndex = Math.max(getPortfolioImages().length - 1, 0);

    if (index < maxIndex) {
      index++;
    }

    activePortifolio();
  });
}

if (arrowLeft) {
  arrowLeft.addEventListener("click", () => {
    if (index > 0) {
      index--;
    }

    activePortifolio();
  });
}

window.addEventListener("load", () => {
  setTimeout(() => animateSection(document.querySelector("section.active")), 1800);
  updatePortfolioNavigation();
});
