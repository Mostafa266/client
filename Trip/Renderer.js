import Trip from "./Trip";
import * as THREE from 'three';

export default class Renderer{
    constructor(){
        this.trip = new Trip();
        this.sizes = this.trip.sizes;
        this.scene = this.trip.scene;
        this.canvas = this.trip.canvas;
        this.camera = this.trip.camera;

        this.setRenderer()
    }



    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas:this.canvas,
            antialias:true
        })
        this.scene.background = new THREE.Color( 0xeeeeee );
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio)  
    }

    update(){
        this.renderer.render(this.scene, this.camera.perspectiveCamera)
    }

}