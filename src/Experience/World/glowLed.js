import * as THREE from "three";
import Experience from "../Experience";

export default class youniverseBase {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.resource1 = this.resources.items.ethereumModel;
    this.resource2 = this.resources.items.lettersModel;
    this.texture = this.resources.items.youniverseTexture;
    this.stageTexture = this.resources.items.stageTexture;
  }

  setModel() {
    this.model1 = this.resource1.scene;
    this.model1.rotation.y = -Math.PI * 0.5;
    this.model1.scale.set(0.75, 0.75, 0.75);

    this.model2 = this.resource2.scene;
    this.model2.rotation.y = -Math.PI * 0.5;
    this.model2.scale.set(0.75, 0.75, 0.75);

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
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

    this.camera.instance.layers.enable(1);
    this.model1.layers.set(1);

    console.log(this.camera.instance.layers);
    console.log(this.model1.layers);

    this.scene.add(this.model1);
    this.scene.add(this.model2);
  }

  setBloom() {
    this.renderScene = new RenderPass(this.scene, this.camera.instance);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 1;
    this.bloomPass.radius = 0.5;
    this.bloomPass.renderToScreen = true;

    this.bloomComposer = new EffectComposer(this.renderer.instance);

    this.bloomComposer.addPass(this.renderScene);
    this.bloomComposer.addPass(this.bloomPass);
  }
}
