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

    resumeDetails[idx].classList.add("active")
  });
});

// // Seleciona todos os links do menu
// const navLinks = document.querySelectorAll(".nav-link");
// const sections = document.querySelectorAll("section");

// navLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault(); // Evita o comportamento padrão do link

//     // Remove 'active' de todos os links e seções
//     navLinks.forEach((link) => link.classList.remove("active"));
//     sections.forEach((section) => section.classList.remove("active"));

//     // Adiciona 'active' ao link clicado
//     link.classList.add("active");

//     // Acha a seção correspondente
//     const target = link.getAttribute("data-target");
//     const section = document.querySelector(`.${target}`);
//     if (section) section.classList.add("active");
//   });
// });
