// create a timeline
let tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to(".decoration-box-1", { rotation: 360 });
tl.to(".decoration-box-2", { rotation: 360 });
tl.to(".decoration-box-3", { rotation: 360 });
tl.to(".decoration-box-4", { rotation: 360 });
tl.to(".decoration-box-5", { rotation: 360 });
tl.to(".decoration-box-6", { rotation: 360 });
tl.to(".decoration-box-7", { rotation: 360 });

tl.play();

console.log("test");
