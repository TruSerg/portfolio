const tabs = () => {
  const tabButtons = document.querySelectorAll(".design-list__item");
  const tabDescriptions = document.querySelectorAll(".design__descr");
  const tabWorks = document.querySelectorAll(".works");
  const tabMainImages = document.querySelectorAll(".design-block__img");
  const tabTitles = document.querySelectorAll(".design__title");

  const changeContent = (array, value) => {
    array.forEach((elem) => {
      if (elem.dataset.tabsField === value) {
        elem.classList.remove("hidden");
      } else {
        elem.classList.add("hidden");
      }
    });
  };

  tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener("click", (e) => {
      const dataValue = tabButton.dataset.tabsHandler;

      tabTitles.forEach((title, indexTitle) => {
        if (index === indexTitle) {
          title.classList.remove("hidden");
          document.title = title.innerText;
        } else {
          title.classList.add("hidden");
        }
      });

      changeContent(tabDescriptions, dataValue);
      changeContent(tabWorks, dataValue);
      changeContent(tabMainImages, dataValue);

      tabButtons.forEach((btn) => {
        if (btn === e.target) {
          btn.classList.add("design-list__item_active");
        } else {
          btn.classList.remove("design-list__item_active");
        }
      });
    });
  });
};

tabs();
