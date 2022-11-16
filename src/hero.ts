import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroAnimations = gsap.timeline({
  yoyo: true,
  repeat: -1,
  defaults: {
    ease: "back.inOut(1.7)",
    duration: 1,
  },
});

const scrollAnimations = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-one",
    start: "0%",
    end: "20%",
    scrub: true,
    markers: true,
  },
});

gsap.to(".section-one__scroll-icon", {
  y: 20,
  repeat: -1,
  yoyo: true,
  ease: "power1.easeOut",
  duration: 1,
});

gsap.to(".section-one__scroll-icon > circle", {
  y: -10,
  repeat: -1,
  yoyo: true,
  ease: "power1.easeOut",
  duration: 1,
});

// heroAnimations.fromTo(
//   ".section-one__my-photo",
//   {
//     y: "100%",
//     opacity: 0,
//   },
//   {
//     y: 0,
//     opacity: 1,
//   },
//   "<50%"
// );

// heroAnimations.fromTo(
//   "#heading",
//   {
//     x: "-100%",
//     opacity: 0,
//   },
//   {
//     x: 0,
//     opacity: 1,
//   },
//   "<30%"
// );

// heroAnimations.fromTo(
//   ".section-one__subheader > span",
//   {
//     y: "100%",
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     y: 0,
//     stagger: 0.05,
//     ease: "back.out(3)",
//     duration: 3,
//   }
// );

scrollAnimations.fromTo(
  ".section-one__my-photo",
  {
    y: 0,
  },
  {
    yPercent: -10,
    opacity: 0,
  }
);

scrollAnimations.fromTo(
  ".section-one__heading",
  {
    y: 0,
  },
  {
    yPercent: -10,
    opacity: 0,
  },
  "<"
);

scrollAnimations.fromTo(
  ".section-one__subheader",
  {
    y: 0,
  },
  {
    yPercent: -20,
    opacity: 0,
  }
);
