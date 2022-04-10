const burger = document.querySelector(".icon-menu");
const menu = document.querySelector(".menu");
const menuLinks = menu.querySelectorAll(".menu-list__item");

burger.addEventListener("click", () => {
  menu.classList.toggle("_active");
  burger.classList.toggle("_active");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("_active");
    burger.classList.remove("_active");
  });
});

document.addEventListener("click", (e) => {
  if (!(e.target.closest(".menu") || e.target.closest(".icon-menu"))) {
    menu.classList.remove("_active");
    burger.classList.remove("_active");
  }
});
