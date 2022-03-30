import gameState from "./gameState";

const TICK_RATE = 3000;

const init = async () => {
  console.log("Starting game");

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
