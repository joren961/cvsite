import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {WEBGL} from "three/examples/jsm/WebGL";

class Background {
    constructor() {
        this.figures = {};
        this.lights = {};
        this.controls = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.createBackground();
        requestAnimationFrame(this.animate);
        this.animate();
    }

    createBackground() {
        if (!WEBGL.isWebGLAvailable()) {
            let label = document.createElement('label');
            label.innerText = WEBGL.getWebGLErrorMessage();
            document.querySelector('#background').append(label);
        }
        this.createScene();
        this.createFigure();
        this.createLight();

        for (const [key, value] of Object.entries(this.figures)) {
            this.scene.add(value);
        }
        for (const [key, value] of Object.entries(this.lights)) {
            this.scene.add(value);
        }
    }

    createScene() {
        let scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

       this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#background'),
        })

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setZ(30);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.scene = scene;
        this.renderer.render(this.scene, this.camera);

    }

    createFigure() {
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true});
        this.figures.figure1 = new THREE.Mesh(geometry, material);
    }

    createLight() {
        this.lights.light1 = new THREE.AmbientLight(0xffffff);
    }

    animate() {
        this.figures.figure1.rotation.x += 0.01;
        this.figures.figure1.rotation.y += 0.04;
        this.figures.figure1.rotation.z += 0.1;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new Background();
