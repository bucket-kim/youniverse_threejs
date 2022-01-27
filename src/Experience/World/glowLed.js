import * as THREE from "three";
import Experience from "../Experience";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

export default class youniverseBase {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.resource = this.resources.items.ledModel;
    this.resource1 = this.resources.items.ethereumModel;
    this.resource2 = this.resources.items.lettersModel;
    this.texture = this.resources.items.youniverseTexture;

    this.setModel();
    this.setBloom();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.rotation.y = -Math.PI * 0.5;
    this.model.scale.set(0.75, 0.75, 0.75);

    this.model1 = this.resource1.scene;
    this.model1.rotation.y = -Math.PI * 0.5;
    this.model1.scale.set(0.75, 0.75, 0.75);

    this.model2 = this.resource2.scene;
    this.model2.rotation.y = -Math.PI * 0.5;
    this.model2.scale.set(0.75, 0.75, 0.75);

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

    this.model1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;
      }
    });
    this.model2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;
      }
    });

    this.scene.add(this.model);
    this.scene.add(this.model1);
    this.scene.add(this.model2);
  }

  setBloom() {
    this.renderScene = new RenderPass(this.scene, this.camera.instance);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0.3;
    this.bloomPass.radius = 0.0;

    this.composer = new EffectComposer(this.renderer.instance);
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.bloomPass);
  }

  resize() {
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {
    this.composer.render();
  }
}
