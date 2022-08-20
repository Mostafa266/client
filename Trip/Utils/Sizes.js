import { EventEmitter } from "events";
import Trip from "../Trip";

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.wrapper = document.querySelector('.wrapper')


        this.trip = new Trip();
        this.canvas = this.trip.canvas;
        this.width = this.wrapper.clientWidth;
        this.height =  this.wrapper.clientHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize',()=>{
            this.width = this.wrapper.clientWidth;
            this.height =  this.wrapper.clientHeight;
            this.aspect = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit("resize")
        })

    }
}