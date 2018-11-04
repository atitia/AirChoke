let scene, camera, renderer, raycaster, controls,
    mouse = new THREE.Vector2(),
    INTERSECTED;

const init = () => {
    //add detector to see if WebGL is supported
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //set up a scene
    scene = new THREE.Scene();
    //add a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //render the scene - start renderer and set it's size
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xcaf8f1, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //add to webpage
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera);

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('../../assets/island.dae', (collada) => {
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
            color: 0x2786e5,
            transparent: true
        });
        var water = new THREE.Mesh(box_geo, box_mat);
        water.position.set(0, -250, 0);
        box_mat.opacity = .7;
        scene.add(water);
        render();
    });

    //position camera
    camera.position.set(500, 300, 200);

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

function onClick(event) {

}

const render = () => {
    //call to render scene 60fps
    requestAnimationFrame(render);
    camera.lookAt(scene.position);
    //speed
    var timer = Date.now() * 0.00001;
    //distance
    camera.position.x = Math.cos(timer) * 100;
    camera.position.z = Math.sin(timer) * 200;
    camera.lookAt(scene.position);
    //keep displaying scene
    renderer.render(scene, camera);
}

//call the init function to run the code
init();
