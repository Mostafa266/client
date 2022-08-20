import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { EventEmitter } from "events";



export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        this.hasModel = false;
        this.uploadBtn = document.getElementById('upload-btn')
        this.chooseModel = document.getElementById('upload-input')
        this.chooseMaterial = document.getElementById('change-material')
        this.uploadTextures();
        this.setLoaders();
        this.uploadModel();
        this.textureName = document.getElementById('textureName');
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
    };

    uploadModel(){
        this.uploadBtn.style.display = 'none';

        this.chooseModel.addEventListener('change',(e)=>{
            e.preventDefault();
            this.uploadBtn.style.display = 'inline-block';
            const url = window.URL.createObjectURL(new Blob([e.target.files[0]]));
            this.uploadBtn.addEventListener('click',()=>{
                if(this.hasModel === false){
                    window.localStorage.setItem('uploadedModel',url);
                    this.startLoading();
                }
            })
        });
    }


    uploadTextures(){

        this.chooseMaterial.addEventListener('change',(e)=>{
            e.preventDefault();
            console.log('sasa');
            const url = window.URL.createObjectURL(new Blob([e.target.files[0]]));
            if(this.hasModel === false){
                window.localStorage.setItem('uploadedtexture',url);
                this.textureName.textContent = e.target.files[0].name;
                this.emit("applyTextures")

                // this.startLoading();
            }
        });
    }





    startLoading(){
        const getModel = window.localStorage.getItem('uploadedModel')
        this.loaders.gltfLoader.load(getModel, (file)=>{
            this.items = file;
            this.emit('ready')
        });
    }

}