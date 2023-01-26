// create a timeline
let tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

tl.to(".green", { rotation: 360 });
tl.to(".purple", { rotation: 360 });
tl.to(".orange", { rotation: 360 });
tl.play();

console.log("test");
