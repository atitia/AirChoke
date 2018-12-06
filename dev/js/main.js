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
        //var car = collada.getObjectByName("car", true);
        //        var car = new THREE.Mesh(box_geo, box_mat);
        //        car.position.set(0, -250, 0);
        //        box_mat.opacity = .7;
        //        scene.add(car);
        resolve('resolved');
        render();

        /* var carSmoke = new THREE.ColladaLoader();
         loader.load()

         timer = setInterval(makeSmoke, 2500);

         function makeSmoke() {
             var pos = carSmoke.position.clone();
             sprite = new THREE.Sprite(material);
             sprite.position.set(pos.x, pos.y, pos.z);
             sprite.scale.x = sprite.scale.y = sprite.scale.z = 10;
         }

         function render() {
             requestAnimationFrame(render);
             
         }*/
    });
    //position camera
    camera.position.set(10, 6, 10);
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
    car.position.x += 0.5;
    if (carSmoke.position.x > 500) {
        car.position.x = -500;
    }

    for (let i = 0; i < group.children.Length; i++) {
        var obj = group.children[i];
        if (obj.position.y < 80) {
            obj.position.y += 0.1;
            obj.scale.x = obj.scale.y = obj.scale.z += 0.08;
            obj.material.rotation += 0.00001 + (i / 50);
        }
    }
}
//y is height, z is to zoom 
const changeCamera = () => {
    let pos1 = new TWEEN.Tween(camera.position).to({
        x: 6,
        y: 3,
        z: 4
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos2 = new TWEEN.Tween(camera.position).to({
        x: 8,
        y: .9,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos3 = new TWEEN.Tween(camera.position).to({
        x: .9,
        y: 4,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos4 = new TWEEN.Tween(camera.position).to({
        x: 8,
        y: 4,
        z: -7
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos5 = new TWEEN.Tween(camera.position).to({
        x: -3,
        y: 1,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot6 = new TWEEN.Tween(camera.rotation).to({
        x: 12,
        y: 2,
        z: 5
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot2 = new TWEEN.Tween(camera.rotation).to({
        y: -1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot3 = new TWEEN.Tween(camera.rotation).to({
        z: 1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot4 = new TWEEN.Tween(camera.rotation).to({
        y: .6,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot5 = new TWEEN.Tween(camera.rotation).to({
        y: -25,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);



    slider.value == 1 ? (pos1.start(), switchTo('texts', 'text1')) : slider.value == 2 ? (pos2.start(), rot2.start(), switchTo('texts', 'text2')) : slider.value == 3 ? (pos3.start(), switchTo('texts', 'text3')) : slider.value == 4 ? (pos4.start(), switchTo('texts', 'text4')) : slider.value == 5 ? (pos5.start(), switchTo('texts', 'text5')) : slider.value == 6 ? (pos6.start(), switchTo('texts', 'text6')) : 0;
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
    target.style.opacity = 0;
    target.style.transition = 'opacity 10s ease-out';
    setTimeout(() => {
        target.style.opacity = 1;
    }, 100)
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
