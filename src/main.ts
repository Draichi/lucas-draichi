import "./style.css";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//Variables for setup
const canvas = document.getElementById("webgl-renderer") as HTMLCanvasElement;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Create scene
const scene = new THREE.Scene();

const fov = 35;
const aspect = sizes.width / sizes.height;
const near = 0.9;
const far = 1000;

//Camera setup
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Loader
const gltfLoader = new GLTFLoader();

if (window.innerWidth <= 400) {
  gltfLoader.load(
    "/3d-models/low_poly_mobile_phone/scene.gltf",
    ({ scene: modelScene }) => {
      modelScene.scale.set(3, 3, 3);
      modelScene.rotation.x = -Math.PI * 1.25;
      modelScene.position.set(0, 8, 0);
      scene.add(modelScene);
      camera.lookAt(modelScene.position);
      camera.position.y = -9;
      camera.position.x = -0.75;
    }
  );
} else {
  gltfLoader.load(
    "/3d-models/laptop_computer_low_poly/scene.gltf",
    ({ scene: modelScene }) => {
      modelScene.name = "laptop_computer_low_poly";
      console.log(modelScene.name);
      modelScene.scale.set(2, 2, 2);
      modelScene.rotation.x = 2;
      modelScene.position.set(0.0, 2, 0.0);
      scene.add(modelScene);
      camera.lookAt(modelScene.position);
    }
  );
}

//Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const light = new THREE.DirectionalLight("#fff", 1);
light.position.set(0, -2, 0);

scene.add(light);

/*
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("mousemove", (event) => {
  const { clientX } = event;

  const modelScene =
    scene?.getObjectByName("laptop_computer_low_poly") ||
    ({} as THREE.Object3D);
  modelScene.rotation.y = (clientX / sizes.width - 0.5) * -0.3;
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
});

function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
