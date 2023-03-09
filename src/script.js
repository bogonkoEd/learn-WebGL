import "./style.css";
import * as THREE from "three";

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
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height);
camera.position.set(-1, -1, 3);
//LOOK AT FUNCTION

scene.add(camera);

//RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
