const timer = () => {
  const timerBlock = document.querySelector(".timer__time");
  const deadline = "30 february 2024";

  let interval;

  const updateClock = () => {
    const date = new Date().getTime();
    const dateDeadline = new Date(deadline).getTime();
    const timeRemaining = (dateDeadline - date) / 1000;

    const days = Math.floor(timeRemaining / 60 / 60 / 24);
    const hours = Math.floor((timeRemaining / 60 / 60) % 24);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const seconds = Math.floor(timeRemaining % 60);

    const fdays = days < 10 ? "0" + days : days;
    const fHours = hours < 10 ? "0" + hours : hours;
    const fMinutes = minutes < 10 ? "0" + minutes : minutes;
    const fSeconds = seconds < 10 ? "0" + seconds : seconds;

    timerBlock.textContent = `${fdays}:${fHours}:${fMinutes}:${fSeconds}`;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      timerBlock.textContent = `00:00:00`;
    }
  };

  updateClock();

  interval = setInterval(updateClock, 500);
};

timer();
