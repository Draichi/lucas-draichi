import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
