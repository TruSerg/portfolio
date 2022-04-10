const links = document.querySelectorAll(".menu-list__link");
const mainScroll = document.querySelector(".main__scroll");

const allLinks = [...links, mainScroll];

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href").substring(1);
    const section = document.getElementById(id);

    if (section) {
      seamless.scrollIntoView(section, {
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  });
});
