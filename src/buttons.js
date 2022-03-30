import { ICONS } from "./constants";

const toggleHighlighted = (icon, isShow) => {
  document
    .querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", isShow);
};

const initButtons = (handleUserAction) => {
  let selectedIcon = 0;

  const buttonClick = ({ target }) => {
    if (target.classList.contains("left-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (selectedIcon + 2) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (selectedIcon + 1) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleUserAction(ICONS[selectedIcon]);
    }
  };

  document.querySelector(".buttons").addEventListener("click", buttonClick);
};

export default initButtons;
