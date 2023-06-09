const changeThemes = () => {
  const btnChangeWhite = document.querySelector(".top__button-color--white");
  const btnChangeBlack = document.querySelector(".top__button-color--black");
  const body = document.body;

  const state = {
    color: body.classList.contains("white") ? "white" : "black",
  };

  const changeToBlack = () => {
    if (state.color !== "black") {
      body.classList.add("black");
      body.classList.remove("white");
      state.color = "black";
    }
  };

  const changeToWhite = () => {
    if (state.color !== "white") {
      body.classList.add("white");
      body.classList.remove("black");
      state.color = "white";
    }
  };

  btnChangeWhite.addEventListener("click", changeToWhite);
  btnChangeBlack.addEventListener("click", changeToBlack);
};

changeThemes();
