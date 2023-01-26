// create a timeline
let tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

tl.to(".decoration-box-green", { rotation: 360 });
tl.to(".decoration-box-purple", { rotation: 360 });
tl.to(".ecoration-box-orange", { rotation: 360 });
tl.play();

console.log("test");
