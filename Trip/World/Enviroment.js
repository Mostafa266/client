import * as THREE from 'three';
import Trip from '../Trip';

export default class Enviroment{
    constructor(){
        this.trip = new Trip();
        this.scene = this.trip.scene;
        this.resources = this.trip.resources;

        
        this.setSunlight();
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(1.5, 7, 3)
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight('#ffffff',1);
        this.scene.add(this.ambientLight)
    }

    resize(){
    }

    update(){
    }
}