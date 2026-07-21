const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("figure img");
const lightboxCaption = lightbox?.querySelector("figcaption");
const closeButton = lightbox?.querySelector(".lightbox-close");
const previousButton = lightbox?.querySelector(".lightbox-prev");
const nextButton = lightbox?.querySelector(".lightbox-next");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof window.gsap !== "undefined" && !reduceMotion;

let currentIndex = 0;
let lastFocusedElement = null;

function animateFrom(items, options = {}) {
  if (!hasGsap || !items || items.length === 0) return;

  gsap.fromTo(
    items,
    {
      autoAlpha: options.fromOpacity ?? 0,
      y: options.y ?? 34,
      scale: options.scale ?? 1,
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: options.duration ?? 0.78,
      stagger: options.stagger ?? 0.08,
      ease: options.ease ?? "power3.out",
      clearProps: "transform,opacity,visibility",
    }
  );
}

function initCaseAnimations() {
  if (!hasGsap) return;

  animateFrom(document.querySelectorAll(".case-header, .hero-copy > *"), {
    y: 24,
    stagger: 0.07,
  });

  gsap.fromTo(
    ".browser-frame",
    { autoAlpha: 0, y: 46, scale: 0.98 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      delay: 0.25,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
    }
  );

  const revealGroups = document.querySelectorAll(
    ".meta-grid, .overview-intro, .case-cards, .features-layout, .tech-stack, .gallery-heading, .project-gallery, .cta-card, .footer-content"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateFrom(entry.target.children, { y: 28, stagger: 0.08 });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealGroups.forEach((group) => observer.observe(group));
}

function updateLightbox(index) {
  const total = galleryCards.length;
  if (!total || !lightboxImage || !lightboxCaption) return;

  currentIndex = (index + total) % total;

  const card = galleryCards[currentIndex];
  const image = card.dataset.image;
  const caption = card.dataset.caption;
  const thumbnail = card.querySelector("img");

  lightboxImage.src = image;
  lightboxImage.alt = thumbnail?.alt || caption;
  lightboxCaption.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} - ${caption}`;
}

function openLightbox(index) {
  if (!lightbox || !closeButton) return;

  lastFocusedElement = document.activeElement;
  updateLightbox(index);
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  if (hasGsap) {
    gsap.fromTo(
      lightbox,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.24, ease: "power2.out" }
    );
    gsap.fromTo(
      lightbox.querySelector("figure"),
      { y: 24, scale: 0.96 },
      { y: 0, scale: 1, duration: 0.38, ease: "power3.out" }
    );
  }

  closeButton.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  const finishClose = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  if (hasGsap) {
    gsap.to(lightbox, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: finishClose,
    });
    return;
  }

  finishClose();
}

function animateLightboxImage(direction = 1) {
  if (!hasGsap || !lightboxImage) return;

  gsap.fromTo(
    lightboxImage,
    { autoAlpha: 0.55, x: 18 * direction, scale: 0.985 },
    {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      duration: 0.28,
      ease: "power2.out",
      clearProps: "transform,opacity,visibility",
    }
  );
}

function showPreviousImage() {
  updateLightbox(currentIndex - 1);
  animateLightboxImage(-1);
}

function showNextImage() {
  updateLightbox(currentIndex + 1);
  animateLightboxImage(1);
}

galleryCards.forEach((card, index) => {
  card.addEventListener("click", () => openLightbox(index));
});

closeButton?.addEventListener("click", closeLightbox);
previousButton?.addEventListener("click", showPreviousImage);
nextButton?.addEventListener("click", showNextImage);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("active")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPreviousImage();
  if (event.key === "ArrowRight") showNextImage();
});

window.addEventListener("load", initCaseAnimations);
