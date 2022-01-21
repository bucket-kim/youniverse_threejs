import Experience from "./Experience";
import * as THREE from "three";
import normalizeWheel from "normalize-wheel";

export default class Navigation {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.config = this.experience.config;
    this.time = this.experience.time;

    // function
    this.setWheel();

    console.log(this.config);
  }

  setWheel() {
    this.wheel = {};
    this.wheel.delta = 0;
    this.wheel.sensitivity = 0.01;

    this.wheel.onWheel = (e) => {
      const normalizedWheel = normalizeWheel(e);

      this.wheel.delta += normalizedWheel.pixelY;
    };

    window.addEventListener("mousewheel", this.wheel.onWheel);
  }

  update() {
    this.wheel.delta = 0;
  }
}
