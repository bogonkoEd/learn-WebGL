import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshBasicMaterial } from "three";

//GUI
const gui = new dat.GUI();
gui.hide();

const parameters = {
  color: 0x0000ff,
};

gui.addColor(parameters, "color").onChange(() => {
  cube1.material.color.set(parameters.color);
});

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

//NEW BUFFER GEOMETRY
const geometry = new THREE.BufferGeometry();
const count = 52;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: parameters.color })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })
);
cube2.position.x = -3;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: parameters.color })
);
cube3.position.x = 3;
group.add(cube3);

//GUI CONTROLS
gui.add(group.position, "y").min(-3).max(3).step(0.05).name("elevation");

//AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//WINDOW SIZES
const sizes = {
  width: window.innerWidth,
  height: innerHeight,
};
//RESIZE EVENT
window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera Aspect Ratio
  camera.aspect = sizes.width / sizes.height;

  //Update Camera
  camera.updateProjectionMatrix();

  //Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  console.log("window resized");
});

//Full Screen double click function
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
