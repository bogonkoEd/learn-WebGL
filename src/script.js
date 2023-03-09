import "./style.css";
import * as THREE from "three";

//SCENE
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//SIZES
const sizes = {
  width: 1080,
  height: 720,
};

//CAMERA
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
