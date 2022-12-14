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
  ".works",
  {
    y: "100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
  "<70%"
);

aboveTheFoldTimeline.fromTo(
  ".navbar__title",
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

aboveTheFoldTimeline.fromTo(
  ".navbar__items-wrapper a",
  {
    y: "-100%",
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.2,
  },
  "<70%"
);

const worksItems = document.querySelectorAll(".works__list-item");

function showLastElementChild(item: Element) {
  gsap.to(item.lastElementChild, {
    y: 0,
    opacity: 1,
  });
}

function hideLastElementChild(item: Element) {
  gsap.to(item.lastElementChild, {
    opacity: 0,
    y: "100%",
  });
}

function showFirstElementChild(item: Element) {
  gsap.to(item.firstElementChild, {
    y: 0,
    opacity: 1,
  });
}

function hideFirstElementChild(item: Element) {
  gsap.to(item.firstElementChild, {
    opacity: 0,
    y: "-100%",
  });
}

function registerDesktopWorksMouseEffect() {
  worksItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      hideFirstElementChild(item);
      showLastElementChild(item);
    });
    item.addEventListener("mouseout", () => {
      showFirstElementChild(item);
      hideLastElementChild(item);
    });
  });
}

ScrollTrigger.defaults({
  immediateRender: false,
  scrub: true,
});

function registerMobileWorksScrollEffect() {
  const middleScreen = Math.round(window.innerHeight / 2);

  let itemHightlighted: number | null = null;
  window.addEventListener("scroll", () => {
    worksItems.forEach((item, index) => {
      const itemPosition = Math.round(item.getBoundingClientRect().top);
      const isItemAboveMiddleScreen = itemPosition < middleScreen - 20;
      const isItemBelowMiddleScreen = itemPosition > middleScreen + 20;

      if (!isItemAboveMiddleScreen && !isItemBelowMiddleScreen) {
        hideFirstElementChild(item);
        showLastElementChild(item);
        itemHightlighted = index;
      } else if (itemHightlighted == index) {
        showFirstElementChild(item);
        hideLastElementChild(item);
        itemHightlighted = null;
      }
    });
  });
}

if (window.innerWidth <= 500) {
  registerMobileWorksScrollEffect();

  const contactParallax = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-contact-wrapper",
      start: "-100%",
      scrub: true,
    },
  });
  contactParallax.fromTo(
    ".about__profile-photo",
    {
      x: 0,
    },
    {
      x: "-100%",
    }
  );
} else {
  registerDesktopWorksMouseEffect();

  const contactParallax = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-contact-wrapper",
      start: "-65%",
      scrub: true,
    },
  });

  contactParallax.fromTo(
    ".about-contact-wrapper__photo",
    {
      y: 0,
    },
    {
      y: "100%",
    }
  );

  contactParallax.fromTo(
    ".about",
    {
      y: 0,
    },
    {
      y: "50%",
    },
    "<"
  );
}
