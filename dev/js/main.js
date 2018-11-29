var scene, camera, renderer, raycaster, light, dirLight,
    mouse = new THREE.Vector2(),
    INTERSECTED,
    slider = document.getElementById('slider'),
    tween, object, dae, car, material, timer, cloud, sprite;
var textureLoader = new THREE.TextureLoader();

var cameraSpeed = .1;

const init = (resolve) => {
    //add detector to see if WebGL is supported
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //set up a scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 0.01, 20)
    //add a camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    //render the scene - start renderer and set it's size
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //add to webpage
    document.body.appendChild(renderer.domElement);
    light = new THREE.AmbientLight(0xffffff, .5);
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dirLight);
    scene.add(light);
    group = new THREE.Group();
    cloud = textureLoader.load("cloud.png");
    material = new THREE.SpriteMaterial({
        map: cloud,
        color: 0xffffff,
    });

    for (i = 0; i < 100; i++) {
        var x = 300 * Math.random() - 150;
        var y = (10 * Math.random()) + 90;
        var z = 300 * Math.random() - 150;

        sprite = new THREE.Sprite(material);
        sprite.position.set(x, y, z);
        sprite.scale.x = sprite.scale.y = sprite.scale.z = 20;
        group.add(sprite);

    }
    scene.add(group);

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('/assets/Canada.dae', collada => {
        dae = collada.scene;
        dae.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        dae.scale.x = dae.scale.y = dae.scale.z = 1;
        dae.updateMatrix();
        scene.add(dae);
        var box_geo = new THREE.BoxGeometry(5000, 600, 5000);
        var box_mat = new THREE.MeshBasicMaterial({
            color: 0x343932,
            transparent: true

        });


        var car = new THREE.Mesh(box_geo, box_mat);
        car.position.set(0, -250, 0);
        box_mat.opacity = .7;
        scene.add(car);
        resolve('resolved');
        render();

    });
    //position camera
    camera.position.set(10, 5, 10);
    camera.rotation.y = 0.8;
    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

const onDocumentMouseMove = event => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.onmousedown = e => {
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
    dirLight.position.set(camera.position.x, camera.position.y, camera.position.z);
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
        x: 14,
        y: .5,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos3 = new TWEEN.Tween(camera.position).to({
        x: 2,
        y: 3,
        z: -5
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos4 = new TWEEN.Tween(camera.position).to({
        x: 12,
        y: 6,
        z: 3
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos5 = new TWEEN.Tween(camera.position).to({
        x: 2,
        y: 4,
        z: 5
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot1 = new TWEEN.Tween(camera.rotation).to({
        y: .5,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot2 = new TWEEN.Tween(camera.rotation).to({
        y: -1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot3 = new TWEEN.Tween(camera.rotation).to({
        z: 1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot4 = new TWEEN.Tween(camera.rotation).to({
        y: -1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot5 = new TWEEN.Tween(camera.rotation).to({
        y: -1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    slider.value == 1 ? (pos1.start(), switchTo('texts', 'text1')) : slider.value == 2 ? (pos2.start(), rot2.start(), switchTo('texts', 'text2')) : slider.value == 3 ? (pos3.start(), switchTo('texts', 'text3')) : slider.value == 4 ? (pos4.start(), switchTo('texts', 'text4')) : slider.value == 5 ? (pos5.start(), switchTo('texts', 'text5')) : 0;
}

//dynamic functions
const switchTo = (off, on) => {
    //Hiding all
    let allTargets = document.getElementsByClassName(off);
    for (let i = 0; i < allTargets.length; i++) {
        allTargets[i].style.display = 'none';
    }
    //Showing dynamic
    let target = document.getElementsByClassName(on)[0];
    target.style.display = 'block';
}

function initThreeJs() {
    return new Promise(resolve => {
        init(resolve);
    });
}

async function deleteLoading() {
    var result = await initThreeJs();
    let preLoad = document.getElementsByClassName('preload')[0];
    preLoad.style.display = 'none';
}

deleteLoading();
