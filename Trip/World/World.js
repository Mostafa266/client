import Trip from "../Trip";
import * as THREE from 'three';
import Table from "./Table";
import Enviroment from "./Enviroment";

export default class World{
    constructor(){
        this.trip = new Trip();
        this.sizes = this.trip.sizes;
        this.scene = this.trip.scene;
        this.canvas = this.trip.canvas;
        this.camera = this.trip.camera;
        this.resources = this.trip.resources;

        this.resources.on('ready',()=>{
            this.enviroment = new Enviroment()
            this.Table = new Table();
        })
     
    }


    resize(){}
    update(){}
}