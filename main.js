import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {WEBGL} from "three/examples/jsm/WebGL";

if (!WEBGL.isWebGLAvailable()) {
    let label = document.createElement('label');
    label.innerText = WEBGL.getWebGLErrorMessage();
    document.querySelector('#background').append(label);
} else {
    const generalNormal = new THREE.TextureLoader().load('generalPlanetNormal.jpg');
    let earthScale = 6;
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#background'),
    });
    let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    let earthVar = earth();
    let sunVar = sun();
    let mercuryVar = mercury();
    let venusVar = venus();
    let marsVar = mars();
    let jupiterVar = jupiter();
    const controls = new OrbitControls(camera, renderer.domElement);
    createScene();

    function createScene() {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(0.01);
        scene.background = new THREE.TextureLoader().load('spacev2.png');

        const light = new THREE.AmbientLight(0xffffff);
        Array(200).fill().forEach(generatestars);
        console.log(jupiterVar);
        scene.add(light, earthVar, sunVar, venusVar, mercuryVar, marsVar, jupiterVar);
        renderer.render(scene, camera);

        animate();
        document.body.onscroll = movecamera;
    }

    function jupiter() {
        const jupiterTexture = new THREE.TextureLoader().load('jupitertexture.jpg');
        console.log(earthScale);
        const jupiter = new THREE.Mesh(
            new THREE.SphereGeometry(earthScale*11,128,128),
            new THREE.MeshStandardMaterial({
                map: jupiterTexture,
                normalTexture:generalNormal,
            })
        );
        jupiter.position.z = 150;
        jupiter.position.x = -100;
        return jupiter;
    }

    function mars() {
        const marsTexture = new THREE.TextureLoader().load('marstexture.jpg');
        const mars = new THREE.Mesh(
            new THREE.SphereGeometry(earthScale*0.53,128,128),
            new THREE.MeshStandardMaterial({
                map: marsTexture,
                normalTexture:generalNormal,
            })
        );
        mars.position.z = 10;
        mars.position.x = -14;
        return mars;
    }

    function earth() {
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
        earth.position.x = -14;
        return earth;
    }

    function venus() {
        const venusTexture = new THREE.TextureLoader().load('venustexture.jpg');
        const venus = new THREE.Mesh(
            new THREE.SphereGeometry(earthScale*0.95,64,64),
            new THREE.MeshStandardMaterial({
                map: venusTexture,
                normalTexture:generalNormal,
            })
        );
        venus.position.z = -40;
        venus.position.x = -6;
        return venus;
    }

    function mercury() {
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
        return mercury;
    }

    function sun() {
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
        return sun;
    }

    //animate scene
    function animate() {
        requestAnimationFrame(animate);
        rotatePlanetsAnimation();
        controls.update();
        renderer.render(scene, camera);
    }

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
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
        star.position.set(x, y, z);
        scene.add(star);
    }

    function movecamera() {
        let top = document.body.getBoundingClientRect().top;
        top = top - 61;
        rotatePlanetsCamera();
        camera.position.z = top*-0.01;
    }

    function rotatePlanetsCamera() {
        earthVar.rotation.y += 0.01;
        earthVar.rotation.z += 0.00001;
        sunVar.rotation.x += 0.0003;
        sunVar.rotation.y += 0.0003;
        venusVar.rotation.y += 0.003;
        mercuryVar.rotation.y += 0.006;
        marsVar.rotation.y += 0.005;
        marsVar.rotation.z += 0.002;
        jupiterVar.rotation.y += 0.0008;
        jupiterVar.rotation.z += 0.0002;
    }

    function rotatePlanetsAnimation() {
        earthVar.rotation.y += 0.005;
        earthVar.rotation.z += 0.00001;
        sunVar.rotation.x += 0.0003;
        sunVar.rotation.y += 0.0003;
        venusVar.rotation.y += 0.006;
        venusVar.rotation.z += 0.001;
        mercuryVar.rotation.y += 0.006;
        mercuryVar.rotation.x += 0.00002;
        marsVar.rotation.y += 0.004;
        marsVar.rotation.z += 0.001;
        jupiterVar.rotation.y += 0.0008;
        jupiterVar.rotation.z += 0.0002;
    }
}



