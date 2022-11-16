import "./style.css";
import "./hero";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import meshToonTextureImage from "/toonTexture.jpg";
//Variables for setup

const container = document.querySelector(".scene.one") as HTMLDivElement;

//Create scene
const scene = new THREE.Scene();

const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.9;
const far = 1000;

//Camera setup
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const meshToonTexture = textureLoader.load(meshToonTextureImage);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshToonMaterial({
  color: "#CEE1F3",
  gradientMap: meshToonTexture,
});
var box = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight("#fff", 1);
light.position.set(0, -2, 0);
box.scale.set(2, 2, 2);
box.position.set(0.0, 2, 0.0);

scene.add(box, light);
animate();

camera.lookAt(box.position);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

gsap.registerPlugin(ScrollTrigger);

camera.position.set(0, 0, 0);

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
});

const iPhoneAnimation = gsap.timeline();

iPhoneAnimation.to(camera.position, {
  y: -5,
  scrollTrigger: {
    trigger: ".section-three",

    endTrigger: ".section-five",
    end: "top bottom",
  },
});

iPhoneAnimation.to(camera.rotation, {
  y: 0.25,
  scrollTrigger: {
    trigger: ".section-four",

    start: "top bottom",
    end: "top top",
  },
});

iPhoneAnimation.to(box.rotation, {
  z: -0.25,
  scrollTrigger: {
    trigger: ".section-four",

    start: "top bottom",
    end: "top top",
  },
});

iPhoneAnimation.to(box.position, {
  x: -25,
  y: 10,
  scrollTrigger: {
    trigger: ".section-five",

    start: "top bottom",
    end: "top top",
  },
});

iPhoneAnimation.to(box.rotation, {
  x: 25,
  y: 10,
  scrollTrigger: {
    trigger: ".section-five",

    start: "top bottom",
    end: "top top",
  },
});
