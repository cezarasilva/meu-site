const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = () => typeof window.gsap !== "undefined" && !reduceMotion;

if (hasGsap()) {
  gsap.fromTo(
    ".service-header",
    { autoAlpha: 0, y: -18 },
    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
  );

  gsap.fromTo(
    ".breadcrumbs, .service-hero h1, .hero-description, .hero-actions",
    { autoAlpha: 0, y: 34 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.15,
    }
  );

  gsap.fromTo(
    ".hero-panel",
    { autoAlpha: 0, x: 28 },
    { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.45 }
  );

  const revealItems = document.querySelectorAll(
    ".proof-grid article, .benefit-list li, .process-grid article, .faq-list article, .related-services a, .final-cta h2, .final-cta p, .final-actions"
  );

  gsap.set(revealItems, { autoAlpha: 0, y: 28 });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
