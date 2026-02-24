import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg') as HTMLCanvasElement,

});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const moonTexture = new THREE.TextureLoader().load('/images/moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpeg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ 
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 5);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill(0).forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/images/space.jpg');
scene.background = spaceTexture;
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;   

    controls.update();

    renderer.render(scene, camera);

}

animate();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});