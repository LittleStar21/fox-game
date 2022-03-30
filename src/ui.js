export const modifyFox = (state) => {
  document.querySelector(".fox").className = `fox fox-${state}`;
};

export const modifyScene = (state) => {
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = (isShow) => {
  document.querySelector(".poop-bag").classList.toggle("hidden", !isShow);
};
