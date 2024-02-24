import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
const texture = new THREE.TextureLoader().load('./public/texture.jpg')
const renderer = new THREE.WebGLRenderer(); 

renderer.setSize( window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshBasicMaterial({map : texture});
const earth = new THREE.Mesh(geometry, material);
const control = new OrbitControls(camera,renderer.domElement);
scene.add(earth)
camera.position.z = 5;
renderer.render(scene,camera);

function animate(){
    requestAnimationFrame(animate);
    earth.rotation.x +=0.01;
    earth.rotation.y +=0.01;

    control.update();
    renderer.render(scene,camera);
}

animate();