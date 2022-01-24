import Experience from "../Experience";
import * as THREE from "three";

export default class Stars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.texture = this.resources.items.galaxyTexture;

    this.setStars();
  }

  setStars() {
    this.stars = {};
    this.starGeometry = new THREE.SphereGeometry(80, 64, 64);
    this.starMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.BackSide,
      transparent: true,
    });

    this.stars.mesh = new THREE.Mesh(this.starGeometry, this.starMaterial);

    this.scene.add(this.stars.mesh);
  }
}
