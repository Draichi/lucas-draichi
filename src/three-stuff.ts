import "./style.css";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import sabidoImage from "/works/sabido_mobile_2.png";
import ibmImage from "/works/ibm_mobile_1.png";
// import GUI from "lil-gui";

// const gui = new GUI();

const API = {
  offsetX: 0,
  offsetY: 0.25,
  repeatX: 4,
  repeatY: 2.8,
  rotation: 0, // positive is counter-clockwise
  centerX: 0.5,
  centerY: 0.5,
};

//Variables for setup
const canvas = document.getElementById("webgl-renderer") as HTMLCanvasElement;

const sizes = {
  width: canvas.getBoundingClientRect().width,
  height: canvas.getBoundingClientRect().height,
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
const textureLoader = new THREE.TextureLoader();

const sabidoMaterial = textureLoader.load(sabidoImage);
const ibmMaterial = textureLoader.load(ibmImage);

function updateUvTransform(texture: any) {
  if (texture.matrixAutoUpdate === true) {
    texture.offset.set(API.offsetX, API.offsetY);
    texture.repeat.set(API.repeatX, API.repeatY);
    texture.center.set(API.centerX, API.centerY);
    texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]
  }
}

function loadMobilePhone() {
  gltfLoader.load(
    "/3d-models/low_poly_mobile_phone/scene.gltf",
    ({ scene: modelScene }) => {
      modelScene.name = "iphone";
      modelScene.scale.set(0.8, 0.8, 0.8);
      modelScene.rotation.x = Math.PI * 2;
      modelScene.rotation.y = Math.PI * 1;
      modelScene.position.set(0, 2, 0);
      modelScene.traverse(async (child: any) => {
        if (child?.isMesh && child.name === "Phone_Case_PhoneFace_Mat_0") {
          child.material = new THREE.MeshBasicMaterial({
            transparent: true,
            map: sabidoMaterial,
          });

          updateUvTransform(sabidoMaterial);

          // gui
          //   .add(API, "offsetX", 0.0, 1.0)
          //   .name("offset.x")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "offsetY", 0.0, 1.0)
          //   .name("offset.y")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "repeatX", 0, 7.0)
          //   .name("repeat.x")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "repeatY", 0, 4.0)
          //   .name("repeat.y")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "rotation", -2.0, 2.0)
          //   .name("rotation")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "centerX", 0.0, 1.0)
          //   .name("center.x")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
          // gui
          //   .add(API, "centerY", 0.0, 1.0)
          //   .name("center.y")
          //   .onChange(() => updateUvTransform(sabidoMaterial));
        }
      });

      setTimeout(() => {
        modelScene.traverse((child: any) => {
          if (child?.isMesh && child.name === "Phone_Case_PhoneFace_Mat_0") {
            child.material.map = ibmMaterial;

            updateUvTransform(ibmMaterial);
          }
        });
      }, 5000);
      scene.add(modelScene);
      camera.lookAt(modelScene.position);

      modelScene.position.x = 1;
      gsap.to(modelScene.position, {
        x: -0.05,
        duration: 1,
        ease: "power1.easeOut",
      });

      gsap.to(modelScene.rotation, {
        z: Math.PI,
        duration: 2,
        delay: 1,
        ease: "power1.easeOut",
      });

      // gsap.to(modelScene.rotation, {
      //   x: -1,
      //   duration: 2,
      //   delay: 3,
      //   ease: "power1.easeOut",
      // });
    }
  );
}

function loadLaptop() {
  gltfLoader.load(
    "/3d-models/laptop_computer_low_poly/scene.gltf",
    ({ scene: modelScene }) => {
      modelScene.name = "laptop_computer_low_poly";
      console.log(modelScene.name);
      modelScene.scale.set(2, 2, 2);
      if (window.innerWidth <= 400) {
        modelScene.scale.set(1, 1, 1);
      }
      modelScene.position.set(0, 1.2, 0);
      modelScene.rotation.x = 2;
      scene.add(modelScene);
      camera.lookAt(modelScene.position);
    }
  );

  window.addEventListener("mousemove", (event) => {
    const { clientX } = event;

    const modelScene =
      scene?.getObjectByName("laptop_computer_low_poly") ||
      ({} as THREE.Object3D);
    modelScene.rotation.y = (clientX / sizes.width - 0.5) * -0.3;
  });
}

if (window.innerWidth <= 400) {
  // loadMobilePhone();
  loadLaptop();
} else {
  loadLaptop();
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

gsap.registerPlugin(ScrollTrigger);

// gsap.to(camera.rotation, {
//   y: Math.PI * 0.05,
//   duration: 2,
//   delay: 1,
//   ease: "power1.easeOut",
// });

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
});

function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
