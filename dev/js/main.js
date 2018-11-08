let scene, camera, renderer, raycaster,
    mouse = new THREE.Vector2(),
    INTERSECTED,
    slider = document.getElementById('slider'),
    tween;

//Camera change parameters
let cameraSpeed = .1;

const init = () => {
    //add detector to see if WebGL is supported
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //set up a scene
    scene = new THREE.Scene();
    //add a camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    //render the scene - start renderer and set it's size
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x1c456d, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //add to webpage
    document.body.appendChild(renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('../../assets/Canada.dae', (collada) => {
        var dae = collada.scene;

        dae.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

        });
        dae.scale.x = dae.scale.y = dae.scale.z = 0.5;
        dae.updateMatrix();
        scene.add(dae);


        var box_geo = new THREE.BoxGeometry(5000, 600, 5000);
        var box_mat = new THREE.MeshBasicMaterial({
            color: 0x343932,
            transparent: true
        });
        var water = new THREE.Mesh(box_geo, box_mat);
        water.position.set(0, -250, 0);
        box_mat.opacity = .7;
        scene.add(water);
        render();
    });

    //position camera
    camera.position.set(10, 5, 10);
    camera.rotation.y = 0.8;

    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //render the scene
    //render();
}

const onDocumentMouseMove = event => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.onmousedown = (e) => {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        INTERSECTED = intersects[0].object;
        if (INTERSECTED.parent.name == "tree") {
            INTERSECTED.position.y += 10;
        }
    }
}


const render = () => {
    TWEEN.update();
    requestAnimationFrame(render);
    var timer = Date.now() * 0.00001;
    renderer.render(scene, camera);
}

const changeCamera = () => {
    let pos1 = new TWEEN.Tween(camera.position).to({
        x: 2,
        y: 1,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    let pos2 = new TWEEN.Tween(camera.position).to({
        x: 2,
        y: 3,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    let pos3 = new TWEEN.Tween(camera.position).to({
        x: 20,
        y: .5,
        z: 2
          }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    let rot1 = new TWEEN.Tween(camera.rotation).to({
        y: .5,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    let rot2 = new TWEEN.Tween(camera.rotation).to({
        y: .5,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    let rot3 = new TWEEN.Tween(camera.rotation).to({
        z: 1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    if (slider.value == 1) {
        pos1.start();
    } else if (slider.value == 2) {
        pos2.start();
        rot2.start();
    } else if(slider.value== 3){
        pos3.start();
    }
}
//call the init function to run the code
init();
