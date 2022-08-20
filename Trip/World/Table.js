import * as THREE from 'three'
import Trip from '../Trip';

export default class Table{
    constructor(){
        this.trip = new Trip();
        this.scene = this.trip.scene;
        this.resources = this.trip.resources;
        this.table = this.resources.items.scene;
        this.colorController = document.querySelector("#color-changer");
        this.finalColor = '';
        this.setModel();
    }
    // colorChanger(){
    //     this.colorController.addEventListener('change',(e)=>{
    //         this.finalColor = e.target.value;
    //         var colorValue = parseInt ( this.finalColor.replace("#","0x"), 16 );
    //         var colored = new THREE.Color( colorValue );
    //         this.finalColor = colored;
    //     })
    // }


    setModel(){
            this.createCheckBoxes();
            this.scene.add(this.table);
    }

    createCheckBoxes(){
        let checkBoxes = document.getElementById('check-parts')
        this.table.children.forEach(child => {

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = child.name;
            checkbox.value = `${child.name}_value`;
            checkbox.id = `${child.name}_id`;
            checkBoxes.appendChild(checkbox);
            // ====================
            var checkBoxesTitle = document.createElement('span');
            checkBoxesTitle.textContent = child.name;
            checkBoxes.appendChild(checkBoxesTitle);
            // ====================
           
        });


        let box = document.querySelectorAll('input[type=checkbox]');
        box.forEach(box =>{
            box.addEventListener('change',(e)=>{
                  this.table.children.forEach(child =>{
                    console.log(child);
                if(e.target.checked){
                    if(e.target.name === child.name){
                        this.colorController.addEventListener('change',(e)=>{
                            this.finalColor = e.target.value;
                            var colorValue = parseInt ( this.finalColor.replace("#","0x"), 16 );
                            var colored = new THREE.Color( colorValue );
                            child.material = new THREE.MeshBasicMaterial( { color: colored} );
                        })
                        // ============== Start apply Textures
                        this.resources.on("applyTextures", () =>{
                            const getTextures = window.localStorage.getItem('uploadedtexture')
                            var textureLoader = new THREE.TextureLoader();
                            textureLoader.crossOrigin = true;
                            textureLoader.load(getTextures, function(texture) {
                                texture.anisotropy = 16;
                                var material = new THREE.MeshPhongMaterial( { map: texture, opacity:1, transparent: true} );
                                child.material = material
                            });
                        })
                        // ============== Start apply Textures
                    }
                }
               
                  })
            });
        })
    }


  
}