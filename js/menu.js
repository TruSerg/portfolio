const burger = document.querySelector(".icon-menu");
const menu = document.querySelector(".menu");
const menuLinks = menu.querySelectorAll(".menu-list__item");
const body = document.querySelector(".body");

burger.addEventListener("click", () => {
  menu.classList.toggle("_active");
  burger.classList.toggle("_active");
  body.classList.toggle("lock");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("_active");
    burger.classList.remove("_active");
    body.classList.remove("lock");
  });
});

document.addEventListener("click", (e) => {
  if (!(e.target.closest(".menu") || e.target.closest(".icon-menu"))) {
    menu.classList.remove("_active");
    burger.classList.remove("_active");
    body.classList.remove("lock");
  }
});
