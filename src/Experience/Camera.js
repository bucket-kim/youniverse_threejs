import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControl();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );

    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControl() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableKeys = false;
    this.controls.enableZoom = true;
    this.controls.zoomSpeed = 0.25;
    this.controls.enableDamping = true;
    this.controls.target = new THREE.Vector3(0, 0.25, 0);

    // setting limit
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minAzimuthAngle = 0;
    this.controls.maxAzimuthAngle = Math.PI * 0.5;
    this.controls.maxDistance = 14;
    this.controls.minDistance = 3;
    this.controls.panSpeed = 0.65;
    this.controls.rotateSpeed = 0.65;
    this.controls.update();
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.instance.addEventListener("onmousedown", (e) => {
      this.instance.zoom = 0.8;
    });

    this.controls.update();
    this.instance.updateMatrixWorld();
  }
}
