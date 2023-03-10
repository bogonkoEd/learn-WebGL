import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//CURSOR
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.y);
});

//SCENE
const scene = new THREE.Scene();

//OBJECTS
const group = new THREE.Group();
group.position.y = -1;
group.scale.y = 1.5;
group.rotation.y = 0.675;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube2.position.x = -3;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 3;
group.add(cube3);

//AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//SIZES
const sizes = {
  width: 960,
  height: 640,
};

//CAMERA

const camera = new THREE.PerspectiveCamera(
  90, //FOV
  sizes.width / sizes.height, //Aspect Ratio
  0.1, //Near
  30 //Far
);

//Orthographic Camera
/*const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, //Left
  1 * aspectRatio, //Right
  1, //Top
  -1, //Bottom
  0.1, //Near
  30 //Far
);*/

camera.position.set(0, 0, 2);

//LOOK AT FUNCTION

scene.add(camera);

//RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//ANIMATION
// gsap.to(group.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(group.position, { duration: 1, delay: 2, x: 0 });

const clock = new THREE.Clock();
const loop = () => {
  //TIMING
  const deltaTime = clock.getElapsedTime();

  //New Frame
  window.requestAnimationFrame(loop);
  //Update Camera Position
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 6;

  //Update Camera Controls
  controls.update();

  camera.lookAt(group.position);
  //Update Objects Position
  group.rotation.y = deltaTime;
  // group.position.y = Math.sin(deltaTime);
  // group.position.z = Math.cos(deltaTime);

  camera.lookAt(group.position);
  //New Object Render
  renderer.render(scene, camera);
};
loop();
