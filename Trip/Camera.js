import * as THREE from 'three';
import Trip from './Trip';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class Camera{

    constructor(){
        this.trip = new Trip()
        this.sizes = this.trip.sizes;
        this.scene = this.trip.scene;
        this.canvas = this.trip.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();

        
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z = 10;
        this.perspectiveCamera.position.y = 5;
    }

    createOrthographicCamera(){
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2 ,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100);

        this.scene.add(this.orthographicCamera);

        
        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );


        const axesHelper = new THREE.AxesHelper( 8 );
        this.scene.add( axesHelper );
    }


    resize(){
        // To update the perspectiveCamera on resize
        this.perspectiveCamera.aspect    = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        // To update the orthographicCamera on resize
        this.orthographicCamera.left     = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right    = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top      = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom   = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }


    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true
    }
  
    update(){
        this.controls.update()
        
    }
}