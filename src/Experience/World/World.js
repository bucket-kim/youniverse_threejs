import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import youniverseBase from "./youniverseBase.js";
import mainStage from "./Stage.js";
import glasses from "./glasses.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );

    // this.scene.add(testMesh);

    this.resources.on("ready", () => {
      // setup
      this.youniverseBase = new youniverseBase();
      // this.fox = new Fox();
      this.environment = new Environment();
      this.mainStage = new mainStage();
      this.glasses = new glasses();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
