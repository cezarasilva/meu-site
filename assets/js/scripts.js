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
  });
});

const arrowRight = document.querySelector(
  ".portifolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portifolio-box .navigation .arrow-left"
);

let index = 0;

const activePortifolio = () => {
  const imgSlide = document.querySelector(".portifolio-carousel .img-slide");
  if (imgSlide) {
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
  }
};

arrowRight.addEventListener("click", () => {
  if (index < 4) {
    index++;
    arrowLeft.classList.remove('disabled');
  } else {
    index = 5; 
    arrowRight.classList.add('disabled');
  }

  activePortifolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove('disabled');
  } else {
    index = 0;
    arrowLeft.classList.add('disabled');
  }

  activePortifolio();
});


// Seleciona todos os links do menu
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Evita o comportamento padrão do link

    // Remove 'active' de todos os links e seções
    navLinks.forEach((link) => link.classList.remove("active"));
    sections.forEach((section) => section.classList.remove("active"));

    // Adiciona 'active' ao link clicado
    link.classList.add("active");

    // Acha a seção correspondente
    const target = link.getAttribute("data-target");
    const section = document.querySelector(`.${target}`);
    if (section) section.classList.add("active");
  });
});
