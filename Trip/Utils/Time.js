import {EventEmitter} from "events";

export default class Time extends EventEmitter{
    constructor(){

        super();
        // When the trip is start
        this.start = Date.now();
        this.current = this.start;

        // Elapsed time has been passing since we started the experience
        this.elapsed = 0;

        // the between each frame at 60fps - this amount in milliseconds
        this.delta = 16;

        this.update()

    }


    update(){
        const currentTime = Date.now();
        // Time from start  -  time now
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.emit('update')
        // This update function already update it self because we called the request animation frame
        window.requestAnimationFrame(() => this.update());


    }
}