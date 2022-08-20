
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import * as THREE from 'three';
import Time from "./Utils/Time";
import Renderer from "./Renderer";
import World from "./World/World";
import assets from "./Utils/assets";
import Resources from "./Utils/Resources";





export default class Trip{
    static instance;
    constructor(canvas){
        // ==========================
        if(Trip.instance){
            return Trip.instance
        }
        Trip.instance = this;
        // ==========================

        this.canvas         = canvas;
        this.scene          = new THREE.Scene();
        this.time           = new Time()
        this.sizes          = new Sizes();
        this.camera         = new Camera();
        this.renderer       = new Renderer();
        this.resources      = new Resources(assets);
        this.world = new World()


        this.time.on("update", () =>{
            this.update()
        })
        this.sizes.on("resize", () =>{
            this.resize()
        })

    }


    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.renderer.update()
    }
}