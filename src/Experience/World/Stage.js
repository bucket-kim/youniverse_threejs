import * as THREE from "three";
import Experience from "../Experience";

export default class youniverseBase {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.resource = this.resources.items.stageModel;
    this.texture = this.resources.items.stageTexture;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.rotation.y = -Math.PI * 0.5;
    this.model.scale.set(0.75, 0.75, 0.75);

    this.texture.flipY = false;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      fog: false,
    });

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;
      }
    });

    this.scene.add(this.model);
  }
}
