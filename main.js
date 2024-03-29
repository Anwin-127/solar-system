const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const orbit = new THREE.OrbitControls(camera, renderer.domElement);

        camera.position.set(-90, 140, 140);
        orbit.update();

        const ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        scene.background = cubeTextureLoader.load([
            './public/stars.jpg',
            './public/stars.jpg',
            './public/stars.jpg',
            './public/stars.jpg',
            './public/stars.jpg',
            './public/stars.jpg'
        ]);

        const labelRenderer = new THREE.CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(labelRenderer.domElement);

        const solarT = document.createElement('p');
        solarT.textContent = 'SOLAR SYSTEM';
        const div = document.createElement('div');
        div.appendChild(solarT);
        const divContainer = new THREE.CSS2DObject(div);
        scene.add(divContainer);
        divContainer.position.set(0, 50, 0)



        const textureLoader = new THREE.TextureLoader();

        const sunGeo = new THREE.SphereGeometry(16, 30, 30);
        const sunMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load('./public/sun.jpg')
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);

        function createPlanete(size, texture, position, ring) {
            const geo = new THREE.SphereGeometry(size, 30, 30);
            const mat = new THREE.MeshStandardMaterial({
                map: textureLoader.load(texture)
            });
            const mesh = new THREE.Mesh(geo, mat);
            const obj = new THREE.Object3D();
            obj.add(mesh);

            if (ring) {
                const ringGeo = new THREE.RingGeometry(
                    ring.innerRadius,
                    ring.outerRadius,
                    32);
                const ringMat = new THREE.MeshBasicMaterial({
                    map: textureLoader.load(ring.texture),
                    side: THREE.DoubleSide
                });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                obj.add(ringMesh);
                ringMesh.position.x = position;
                ringMesh.rotation.x = -0.5 * Math.PI;
            }
            scene.add(obj);
            mesh.position.x = position;
            return { mesh, obj }
        }

        const mercury = createPlanete(3.2, './public/mercury.jpg', 28);
        const venus = createPlanete(5.8, './public/venus.jpg', 44);
        const earth = createPlanete(6, './public/earth.jpg', 62);
        const mars = createPlanete(4, './public/mars.jpg', 78);
        const jupiter = createPlanete(12, './public/jupiter.jpg', 100);
        const saturn = createPlanete(10, './public/saturn.jpg', 138, {
            innerRadius: 10,
            outerRadius: 20,
            texture: './public/saturn ring.png'
        });
        const uranus = createPlanete(7, './public/uranus.jpg', 176, {
            innerRadius: 7,
            outerRadius: 12,
            texture: './public/uranus ring.png'
        });
        const neptune = createPlanete(7, './public/neptune.jpg', 200);

        const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
        scene.add(pointLight);


        function animate() {

            sun.rotateY(0.004);
            mercury.mesh.rotateY(0.004);
            venus.mesh.rotateY(0.002);
            earth.mesh.rotateY(0.02);
            mars.mesh.rotateY(0.018);
            jupiter.mesh.rotateY(0.04);
            saturn.mesh.rotateY(0.038);
            uranus.mesh.rotateY(0.03);
            neptune.mesh.rotateY(0.032);

            mercury.obj.rotateY(0.04);
            venus.obj.rotateY(0.015);
            earth.obj.rotateY(0.01);
            mars.obj.rotateY(0.008);
            jupiter.obj.rotateY(0.002);
            saturn.obj.rotateY(0.0009);
            uranus.obj.rotateY(0.0004);
            neptune.obj.rotateY(0.0001);
            labelRenderer.render(scene, camera);
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);
