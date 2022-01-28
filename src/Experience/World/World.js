import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import youniverseBase from "./youniverseBase.js";
import mainStage from "./Stage.js";
import glasses from "./glasses.js";
import Stars from "./Stars.js";

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
      // this.environment = new Environment();
      this.mainStage = new mainStage();
      // this.glasses = new glasses();
      // this.stars = new Stars();
    });
  }

  update() {
    // if (this.fox) {
    //   this.fox.update();
    // }
    if (this.youniverseBase) {
      this.youniverseBase.update();
    }
  }
}
