import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshBasicMaterial } from "three";

//Textures
const loading = new THREE.LoadingManager();
loading.onStart = () => {
  console.log("loading started");
};
loading.onLoad = () => {
  console.log("loading finished");
};

const textureLoader = new THREE.TextureLoader(loading);
const cubeTextureLoader = new THREE.CubeTextureLoader(loading);

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const colorTexture = textureLoader.load("/textures/minecraft.png");
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/3/px.jpg",
  "/textures/environmentMaps/3/nx.jpg",
  "/textures/environmentMaps/3/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/3/pz.jpg",
  "/textures/environmentMaps/3/nz.jpg",
]);

//FONTS
const fontLoader = new THREE.FontLoader();
const matcapText = textureLoader.load("/textures/matcaps/8.png");

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("NDANI YA COCKPIT", {
    font,
    size: 0.6,
    height: 0.3,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  textGeometry.center();

  const elementMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    metalness: 0.5,
  });

  const text = new THREE.Mesh(textGeometry, elementMaterial);

  text.castShadow = true;

  scene.add(text);

  const element = new THREE.TorusBufferGeometry(0.25, 0.2, 15, 45);

  for (let i = 0; i < 121; i++) {
    const ring = new THREE.Mesh(element, elementMaterial);

    ring.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );

    ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const scale = Math.random();
    ring.scale.set(scale, scale, scale);

    ring.castShadow = true;

    scene.add(ring);
  }

  //FLOOR
  const floor = new THREE.PlaneBufferGeometry(10, 10);
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    color: 0xffffff,
  });
  const floorMesh = new THREE.Mesh(floor, floorMaterial);
  floorMesh.rotation.x = -Math.PI * 0.5;
  floorMesh.position.y = -1;

  floorMesh.receiveShadow = true;
  scene.add(floorMesh);
});

// Using NearestFilter will make the texture look pixelated and is better for performance than LinearFilter
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

//GUI
const gui = new dat.GUI();

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
});

//SCENE
const scene = new THREE.Scene();

//OBJECTS
const group = new THREE.Group();
group.position.y = -1;
group.scale.y = 1.5;
group.rotation.y = 0.675;
// scene.add(group);

//NEW BUFFER GEOMETRY
const geometry = new THREE.BufferGeometry();
const count = 52;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
//NEW BUFFER ATTRIBUTE - MeshBasicMaterial
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x0000ff, // material.color.set(parameters.color);
//   map: colorTexture, // material.map = colorTexture;
//   wireframe: false, // material.wireframe = false;
//   opacity: 0.5, // material.opacity = 0.5;
//   transparent: true, // material.transparent = true;
// alphaMap: alphaTexture, // material.alphaMap = alphaTexture;
// side: THREE.DoubleSide, // material.side = THREE.DoubleSide;
//});

// //NEW BUFFER ATTRIBUTE - MeshNormalMaterial - This is the default material for lighting fx
// const material1 = new THREE.MeshNormalMaterial({
//   wireframe: false, // material.wireframe = false;
//   opacity: 0.5, // material.opacity = 0.5;
//   transparent: true, // material.transparent = true;
//   // alphaMap: alphaTexture, // material.alphaMap = alphaTexture;
//   // side: THREE.DoubleSide, // material.side = THREE.DoubleSide;
//   flatShading: true, // material.flatShading = true;
// });

// //NEW BUFFER ATTRIBUTE - MeshMatcapMaterial
// const material2 = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture, // material.matcap = matcapTexture;
// });

// //NEW BUFFER ATTRIBUTE - MeshDepthMaterial
// const material3 = new THREE.MeshDepthMaterial({});

// //NEW BUFFER ATTRIBUTE - MeshLambertMaterial
// const material4 = new THREE.MeshLambertMaterial({});

// //NEW BUFFER ATTRIBUTE - MeshPhongMaterial
// const material5 = new THREE.MeshPhongMaterial({
//   shininess: 1000, // material.shininess = 100;
//   specular: 0x0000ff, // material.specular = 0x0000ff;
// });

// //NEW BUFFER ATTRIBUTE - MeshToonMaterial
// const material6 = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture, // material.gradientMap = gradientTexture;
//   map: colorTexture, // material.map = colorTexture;
// });

// //NEW BUFFER ATTRIBUTE - MeshStandardMaterial
// const material7 = new THREE.MeshStandardMaterial({
//   map: colorTexture, // material.map = colorTexture;
//   metalness: 0.7, // material.metalness = 0.7;
//   roughness: 0.2, // material.roughness = 0.2;
//   envMap: environmentMapTexture, // material.envMap = environmentMapTexture;
// });

// gui.add(material7, "metalness").min(0).max(1).step(0.0001).name("metalness");
// gui.add(material7, "roughness").min(0).max(1).step(0.0001).name("roughness");
// gui
//   .add(material7, "displacementScale")
//   .min(0)
//   .max(1)
//   .step(0.0001)
//   .name("displacementScale");

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const cube1 = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 64, 64));
cube1.position.x = -3;
group.add(cube1);

const cube2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 96, 96));
cube2.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cube2.geometry.attributes.uv.array, 2)
);

cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.25, 64, 128));
cube3.position.x = 3;
group.add(cube3);

//GUI CONTROLS
gui.add(group.position, "y").min(-3).max(3).step(0.05).name("elevation");

//AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
directionalLight.position.set(2, 2, 3);
scene.add(directionalLight);

//SHADOWS
directionalLight.castShadow = true;

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.35);
// scene.add(hemisphereLight);

// const pointLight = new THREE.PointLight(0x0090ff, 0.5, 28, 2);
// pointLight.position.set(1, 1, 0.5);
// scene.add(pointLight);

// const rectLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
// rectLight.position.set(-2, 0, 1);
// rectLight.lookAt(THREE.Vector3());
// scene.add(rectLight);

// const spotLight = new THREE.SpotLight(0xf60000, 1, 10, Math.PI * 0.15, 0.1, 1);
// spotLight.position.set(0, 0.5, 5.5);
// scene.add(spotLight);

// spotLight.target.position.y = -2;
// scene.add(spotLight.target);

//LIGHT HELPER
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// window.requestAnimationFrame(() => {
//   spotLightHelper.update;
// });

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
  75, //FOV
  sizes.width / sizes.height, //Aspect Ratio
  0.5, //Near
  75 //Far
);

//Orthographic Camera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, //Left
//   1 * aspectRatio, //Right
//   1, //Top
//   -1, //Bottom
//   0.1, //Near
//   30 //Far
// );

camera.position.set(0, 0, 3);

//LOOK AT FUNCTION

scene.add(camera);

//RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;

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
  const animate = () => {
    // Update the positions, rotations, and scales of the rings
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry.type === "TorusBufferGeometry") {
          object.rotation.x += 0.01;
          object.rotation.y += 0.02;
          object.scale.set(
            Math.sin(Date.now() * 0.001) * 0.2 + 0.8,
            Math.sin(Date.now() * 0.001) * 0.2 + 0.8,
            Math.sin(Date.now() * 0.001) * 0.2 + 0.8
          );
        }
      }
    });

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame of animation
    requestAnimationFrame(animate);
  };

  animate();
};
loop();
