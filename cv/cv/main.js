import './style.css'
import * as THREE from 'three';
import {GridHelper} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {WEBGL} from "three/examples/jsm/WebGL";

if (!WEBGL.isWebGLAvailable()) {
    let label = document.createElement('label');
    label.innerText = WEBGL.getWebGLErrorMessage();
    document.querySelector('#background').append(label);
} else {
    //create scene/camera/renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#background'),
    })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(0.01);
    scene.background = new THREE.TextureLoader().load('spacev2.png');

    //create scene elements
    const generalNormal = new THREE.TextureLoader().load('generalPlanetNormal.jpg');
    let earthScale = 6;
    //create earth
    const earthTexture = new THREE.TextureLoader().load('earth.jpg');
    const normalTexture = new THREE.TextureLoader().load('earth_normalmap.png');
    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(earthScale,128,128),
        new THREE.MeshStandardMaterial({
            map: earthTexture,
            normalTexture:normalTexture,
        })
    );
    earth.position.z = -15;
    earth.position.x = -10;


    //create venus
    const venusTexture = new THREE.TextureLoader().load('venustexture.jpg');
    const venus = new THREE.Mesh(
        new THREE.SphereGeometry(earthScale*0.95,64,64),
        new THREE.MeshStandardMaterial({
            map: venusTexture,
            normalTexture:generalNormal,
        })
    );
    venus.position.z = -40;
    venus.position.x = -2;

    //create mercury
    const mercuryTexture = new THREE.TextureLoader().load('mercurytexture.png');
    const mercury = new THREE.Mesh(
        new THREE.SphereGeometry(earthScale*0.38,64,64),
        new THREE.MeshStandardMaterial({
            map: mercuryTexture,
            normalTexture:generalNormal,
        })
    );
    mercury.position.z = -80;
    mercury.position.x = 10;

    //create sun
    const sunTexture = new THREE.TextureLoader().load('suntexture.jpg');
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(earthScale*109, 128, 128),
        new THREE.MeshStandardMaterial({
            map: sunTexture,
            normalTexture: generalNormal,
        })
    );
    sun.position.z = -1250;
    sun.position.x =400;


    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);

    // const gridhelper = new GridHelper(200, 50);

    //add to scene
    scene.add(light, earth, sun, venus, mercury);
    renderer.render(scene, camera);

    //animate scene
    function animate() {
        requestAnimationFrame(animate);
        rotatePlanetsAnimation();
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    //generate stars in random places
    function generatestars() {
        const geom = new THREE.SphereGeometry(0.2, 24, 24);
        let rnd = Math.floor(Math.random()*4);
        let color;
        if (rnd === 0 || 1) {
            color = 0xfff4f3;
        } else if (rnd === 2) {
            color = 0xc7d8ff;
        } else {
            color = 0xffd9b2;
        }
        const mat = new THREE.MeshStandardMaterial({color: color});
        const star = new THREE.Mesh(geom, mat);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(450));
        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(200).fill().forEach(generatestars);

    function movecamera() {
        let top = document.body.getBoundingClientRect().top;
        top = top - 61;
        rotatePlanetsCamera();
        camera.position.z = top*-0.01;
    }

    function rotatePlanetsCamera() {
        earth.rotation.y += 0.02;
        earth.rotation.z += 0.00001;
        sun.rotation.x += 0.0003;
        sun.rotation.y += 0.0003;
        venus.rotation.y += 0.003;
        mercury.rotation.y += 0.006;
    }

    function rotatePlanetsAnimation() {
        earth.rotation.y += 0.005;
        earth.rotation.z += 0.00001;
        sun.rotation.x += 0.0003;
        sun.rotation.y += 0.0003;
        venus.rotation.y += 0.006;
        mercury.rotation.y += 0.006;
        mercury.rotation.x += 0.00002;
    }

    document.body.onscroll = movecamera;
}



