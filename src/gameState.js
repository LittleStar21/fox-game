import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungryTime,
  getNextDieTime,
  getNextPoopTime,
} from "./constants";

import { modifyFox, modifyScene, togglePoopBag } from "./ui";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToFinishCelebrating: -1,

  tick() {
    this.clock++;
    console.log("clock:", this.clock);

    switch (this.clock) {
      case this.wakeTime:
        this.wake();
        break;
      case this.sleepTime:
        this.sleep();
        break;
      case this.hungryTime:
        this.getHungry();
        break;
      case this.dieTime:
        this.die();
        break;
      case this.poopTime:
        this.poop();
        break;
      case this.timeToStartCelebrating:
        this.startCelebrating();
        break;
      case this.timeToFinishCelebrating:
        this.finishCelebrating();
        break;
    }

    return this.clock;
  },

  handleUserAction(icon) {
    if (
      this.current === "SLEEP" ||
      this.current === "FEEDING" ||
      this.current === "CELEBRATING" ||
      this.current === "HATCHING"
    ) {
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },

  startGame() {
    const innerModal = document.querySelector(".modal-inner");
    innerModal.textContent = "The Fox is Hatching";

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        innerModal.textContent += ".";
      }, (i + 1) * 1000);
    }

    this.current = "HATCHING";
    this.wakeTime = this.clock + 3; // 3 game ticks

    modifyFox("egg");
    modifyScene("day");
  },

  wake() {
    document.querySelector(".modal-inner").textContent = "The Fox Game";
    this.current = "IDLING";
    this.wakeTime = -1;

    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modifyScene(SCENES[this.scene]);

    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungryTime(this.clock);

    this.determineFoxState();
  },

  sleep() {
    this.state = "SLEEP";
    modifyFox("sleep");
    modifyScene("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;

    modifyFox("hungry");
    document.querySelector(".modal-inner").textContent = "The Fox is Hungry";
  },

  die() {
    document.querySelector(".modal-inner").textContent = "The Fox Died";
    modifyFox("die");
  },

  startCelebrating() {
    this.current = "CELEBRATING";
    modifyFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToFinishCelebrating = this.clock + 2;
  },

  finishCelebrating() {
    this.current = "IDLING";
    this.timeToFinishCelebrating = -1;
    this.determineFoxState();
    togglePoopBag(false);
  },

  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modifyFox("rain");
      } else {
        modifyFox("idling");
      }
    }
  },

  poop() {
    document.querySelector(".modal-inner").textContent = "The Fox Pooped";
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modifyFox("pooping");
  },

  changeWeather() {
    console.log("Weather");
  },

  cleanUpPoop() {
    if (this.current !== "POOPING") return;

    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungryTime(this.clock);
  },

  feed() {
    if (this.current !== "HUNGRY") return;

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modifyFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
