import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboveTheFoldTimeline = gsap.timeline({
  defaults: {
    duration: 0.85,
    ease: "power3.out",
  },
});

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-1",
  {
    x: "100%",
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
  }
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-2",
  {
    y: "100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
  "<40%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-3",
  {
    x: "-100%",
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
  },
  "<40%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-4",
  {
    y: "-100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
  "<40%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-5",
  {
    x: "-100%",
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
  },
  "<40%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__word-6",
  {
    y: "100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
  "<40%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__buttons a",
  {
    y: "-100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.2,
  },
  "<80%"
);

aboveTheFoldTimeline.fromTo(
  ".above-the-fold__title",
  {
    y: "-100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
  "<70%"
);

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
});
