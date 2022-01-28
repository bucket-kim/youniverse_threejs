import * as THREE from "three";
import Experience from "../Experience";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

export default class youniverseBase {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.renderer = this.experience.renderer;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.resource = this.resources.items.youniverseModel;
    this.resource1 = this.resources.items.lettersModel;
    this.resource2 = this.resources.items.ethereumModel;
    this.resource3 = this.resources.items.stageModel;
    this.camera = this.experience.camera;

    this.renderer.instance.autoClear = false;

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
    // this.model2.position.y = 0.75;

    this.texture = this.resources.items.youniverseTexture;
    this.texture.flipY = false;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });

    this.material1 = new THREE.MeshBasicMaterial({
      map: this.texture1,
      flipY: false,
    });

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;

        child.layers.enable(0);
      }
    });

    this.model1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;

        child.layers.enable(1);
      }
    });

    this.model2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material = this.material;

        child.layers.enable(1);
      }
    });

    this.scene.add(this.model1);
    this.scene.add(this.model2);
    this.scene.add(this.model);
  }

  setBloom() {
    this.camera.instance.layers.enable(1);

    this.renderScene = new RenderPass(this.scene, this.camera.instance);

    // this.fxaa = new ShaderPass();
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 3;
    this.bloomPass.radius = 1;
    this.bloomPass.renderToScreen = true;

    this.bloomComposer = new EffectComposer(this.renderer.instance);

    this.bloomComposer.addPass(this.renderScene);
    this.bloomComposer.addPass(this.bloomPass);
  }

  resize() {
    this.bloomComposer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.renderer.instance.clear();

    this.camera.instance.layers.set(1);
    this.bloomComposer.render();

    this.renderer.instance.clearDepth();
    this.camera.instance.layers.set(0);
  }
}
