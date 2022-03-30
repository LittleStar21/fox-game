import gameState from "./gameState";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";

const init = async () => {
  console.log("Starting game");
  initButtons(gameState.handleUserAction);

  let nextTickTime = Date.now();

  const nextAnimationFrame = () => {
    const nowTime = Date.now();

    if (nextTickTime <= nowTime) {
      gameState.tick();
      nextTickTime = nowTime + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  };

  requestAnimationFrame(nextAnimationFrame);
};

init();
