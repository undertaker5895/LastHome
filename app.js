/**
 * app.js - Cinematic Meadow & High-End 3D Portfolio
 * ('Company' 섹션 삼각형 군집 복구 및 로딩 애니메이션, 글자 워프 효과 적용 버전)
 */

class SceneManager {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.currentScene = 'home';
        this.isTransitioning = false;
        
        this.groups = {
            home: new THREE.Group(),
            school: new THREE.Group(),
            portfolio: new THREE.Group(),
            company: new THREE.Group(),
            board: new THREE.Group(),
            warp: new THREE.Group()
        };

        this.init();
    }

    async init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.setupIBL();
        this.setupComposer();

        Object.keys(this.groups).forEach(key => {
            if (key !== 'warp') {
                this.groups[key].visible = false;
            } else {
                this.groups[key].visible = true; 
            }
            this.scene.add(this.groups[key]);
        });

        this.createHomeScene();
        this.createSchoolScene();
        this.createPortfolioScene();
        this.createCompanyScene(); 
        this.createBoardScene();
        this.createWarpScene();

        this.groups.home.visible = true;

        this.setupEventListeners();
        this.animate();

        gsap.to('.progress', { width: '100%', duration: 1.5, onComplete: () => {
            gsap.to('#loader', { opacity: 0, duration: 1, onComplete: () => {
                document.getElementById('loader').style.display = 'none';
            }});
        }});
    }

    setupIBL() {
        const loader = new THREE.RGBELoader();
        loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.environment = texture;
            this.scene.background = new THREE.Color(0x000000);
        });
    }

    setupComposer() {
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

        this.bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 1.5
        );
        this.composer.addPass(this.bloomPass);

        this.bokehPass = new THREE.BokehPass(this.scene, this.camera, {
            focus: 20.0,
            aperture: 0.005,
            maxblur: 0.002,
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.bokehPass.enabled = false;
        this.composer.addPass(this.bokehPass);
    }

    createHomeScene() {
        const shellGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        const shellMat = new THREE.MeshPhysicalMaterial({
            transmission: 0.98, roughness: 0.02, metalness: 0.1, ior: 2.4, thickness: 1.5,
            specularIntensity: 1, clearcoat: 1, color: 0xffffff, transparent: true
        });
        this.mainCube = new THREE.Mesh(shellGeo, shellMat);
        this.mainCube.position.set(2, 0, 0);
        this.groups.home.add(this.mainCube);

        const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xaa00ff, emissive: 0xaa00ff, emissiveIntensity: 15, wireframe: true
        });
        this.innerCore = new THREE.Mesh(coreGeo, coreMat);
        this.mainCube.add(this.innerCore);
    }

    createSchoolScene() {
        const group = this.groups.school;
        const groundGeo = new THREE.PlaneGeometry(100, 100, 32, 32);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a0a2e, roughness: 0.9 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        group.add(ground);

        const bladeGeo = new THREE.PlaneGeometry(0.1, 0.8, 1, 4);
        bladeGeo.translate(0, 0.4, 0); 
        const bladeMat = new THREE.MeshStandardMaterial({ 
            color: 0x2e1a4d, side: THREE.DoubleSide, roughness: 0.8, transparent: true 
        });
        
        const count = 30000;
        this.grassInstances = new THREE.InstancedMesh(bladeGeo, bladeMat, count);
        const dummy = new THREE.Object3D();
        for(let i=0; i<count; i++) {
            dummy.position.set((Math.random()-0.5)*40, -2, (Math.random()-0.5)*40);
            dummy.rotation.y = Math.random() * Math.PI;
            dummy.scale.set(0.5+Math.random(), 0.5+Math.random(), 0.5+Math.random());
            dummy.updateMatrix();
            this.grassInstances.setMatrixAt(i, dummy.matrix);
        }
        group.add(this.grassInstances);

        const ringGeo = new THREE.BoxGeometry(4, 2, 0.1);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffccff, emissiveIntensity: 20 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(0, -0.5, -5);
        group.add(ring);

        const mountGeo = new THREE.PlaneGeometry(200, 100, 64, 64);
        const mountPos = mountGeo.attributes.position.array;
        for(let i=0; i<mountPos.length; i+=3) {
            mountPos[i+2] = Math.random() * 5 + Math.sin(mountPos[i]/10) * Math.cos(mountPos[i+1]/10) * 20;
        }
        const mountMat = new THREE.MeshStandardMaterial({ color: 0x0a1a2e, flatShading: true });
        const mountains = new THREE.Mesh(mountGeo, mountMat);
        mountains.position.set(0, 0, -80);
        mountains.rotation.x = -Math.PI / 3;
        group.add(mountains);

        const sun = new THREE.DirectionalLight(0xffaa66, 2);
        sun.position.set(10, 10, -30);
        group.add(sun);
    }

    createPortfolioScene() {
        const group = this.groups.portfolio;
        const sandGeo = new THREE.PlaneGeometry(100, 100, 64, 64);
        const sandPos = sandGeo.attributes.position.array;
        for(let i=0; i<sandPos.length; i+=3) {
            sandPos[i+2] = Math.sin(sandPos[i]/5) * Math.cos(sandPos[i+1]/5) * 3 + Math.sin(sandPos[i]/2) * 0.5;
        }
        sandGeo.computeVertexNormals();
        const sandMat = new THREE.MeshStandardMaterial({ color: 0x4d3319, roughness: 1, metalness: 0 });
        const desert = new THREE.Mesh(sandGeo, sandMat);
        desert.rotation.x = -Math.PI / 2;
        desert.position.y = -5;
        desert.receiveShadow = true;
        group.add(desert);

        const pyramidGeo = new THREE.ConeGeometry(3, 4, 4);
        const pyramidMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.4, clearcoat: 1 });

        this.invertedPyramid = new THREE.Mesh(pyramidGeo, pyramidMat);
        this.invertedPyramid.rotation.x = Math.PI;
        this.invertedPyramid.position.set(0, 0, -5);
        this.invertedPyramid.castShadow = true;
        group.add(this.invertedPyramid);

        const sunGeo = new THREE.SphereGeometry(15, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xff2200 });
        this.desertSun = new THREE.Mesh(sunGeo, sunMat);
        this.desertSun.position.set(0, -5, -60);
        group.add(this.desertSun);

        const sunsetLight = new THREE.DirectionalLight(0xff6600, 3);
        sunsetLight.position.set(0, 5, -50);
        sunsetLight.castShadow = true;
        group.add(sunsetLight);
    }

    createCompanyScene() {
        const group = this.groups.company;

        const oceanGeo = new THREE.BoxGeometry(100, 100, 100);
        const oceanMat = new THREE.MeshStandardMaterial({ 
            color: 0x001a33, 
            side: THREE.BackSide,
            roughness: 1
        });
        const ocean = new THREE.Mesh(oceanGeo, oceanMat);
        group.add(ocean);

        const ringGeo = new THREE.TorusGeometry(5, 0.05, 16, 4);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x00ccff,
            emissiveIntensity: 15
        });
        this.diamondRing = new THREE.Mesh(ringGeo, ringMat);
        this.diamondRing.rotation.z = Math.PI / 4; 
        this.diamondRing.position.set(0, 0, -5);
        group.add(this.diamondRing);

        const pyramidGeo = new THREE.ConeGeometry(0.1, 0.3, 4); 
        pyramidGeo.rotateX(Math.PI / 2); 
        const pyramidMat = new THREE.MeshStandardMaterial({ 
            color: 0xff4400, 
            emissive: 0xff6600, 
            emissiveIntensity: 2,
            roughness: 0.5
        });

        this.companyPyramids = [];
        for(let i=0; i<100; i++) {
            const pyramid = new THREE.Mesh(pyramidGeo, pyramidMat);
            pyramid.position.set((Math.random()-0.5)*20, (Math.random()-0.5)*10, (Math.random()-0.5)*20);
            pyramid.lookAt(this.diamondRing.position);
            group.add(pyramid);
            
            this.companyPyramids.push({
                mesh: pyramid,
                speed: 0.02 + Math.random() * 0.03, 
                angle: Math.random() * Math.PI * 2, 
                phase: Math.random() * Math.PI * 2, 
                rotSpeed: (Math.random()-0.5)*0.05 
            });
        }

        const snowGeo = new THREE.BufferGeometry();
        const snowCount = 2000;
        const snowPos = new Float32Array(snowCount * 3);
        for(let i=0; i<snowCount; i++) {
            snowPos[i*3] = (Math.random()-0.5)*40;
            snowPos[i*3+1] = (Math.random()-0.5)*40;
            snowPos[i*3+2] = (Math.random()-0.5)*40;
        }
        snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
        const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.3 });
        this.marineSnow = new THREE.Points(snowGeo, snowMat);
        group.add(this.marineSnow);

        const causticLight = new THREE.SpotLight(0x00ffff, 5, 50, Math.PI/4, 0.5, 2);
        causticLight.position.set(0, 20, -5);
        causticLight.target = this.diamondRing;
        group.add(causticLight);
    }

    createBoardScene() {
        const group = this.groups.board;
        const moonGeo = new THREE.PlaneGeometry(100, 100, 64, 64);
        const moonPos = moonGeo.attributes.position.array;
        for(let i=0; i<moonPos.length; i+=3) {
            moonPos[i+2] = Math.sin(moonPos[i]/3) * Math.cos(moonPos[i+1]/3) * 1.5 + (Math.random() * 0.5);
        }
        moonGeo.computeVertexNormals();
        const moonMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9, metalness: 0.1, flatShading: true });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        moon.rotation.x = -Math.PI / 2;
        moon.position.y = -2;
        group.add(moon);

        const portalGeo = new THREE.TorusGeometry(6, 0.1, 16, 100);
        const portalMat = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 15 });
        this.greenPortal = new THREE.Mesh(portalGeo, portalMat);
        this.greenPortal.position.set(-15, 3, -10);
        this.greenPortal.rotation.y = Math.PI / 4;
        group.add(this.greenPortal);
        
        const portalLight = new THREE.PointLight(0x00ff00, 10, 50);
        portalLight.position.copy(this.greenPortal.position);
        group.add(portalLight);
    }

    createWarpScene() {
        const warpCount = 3500;
        const warpGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(warpCount * 6);
        const colors = new Float32Array(warpCount * 6);
        this.warpVelocities = new Float32Array(warpCount);
        const colorPool = [new THREE.Color(0xaa00ff), new THREE.Color(0xff00ff)];
        
        for (let i = 0; i < warpCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 47;
            const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius;
            const z = Math.random() * -200;
            positions[i * 6] = x; positions[i * 6 + 1] = y; positions[i * 6 + 2] = z;
            positions[i * 6 + 3] = x; positions[i * 6 + 4] = y; positions[i * 6 + 5] = z - 1;
            const c = colorPool[Math.floor(Math.random() * colorPool.length)];
            for (let j = 0; j < 2; j++) {
                colors[i * 6 + j * 3] = c.r; colors[i * 6 + j * 3 + 1] = c.g; colors[i * 6 + j * 3 + 2] = c.b;
            }
            this.warpVelocities[i] = 1 + Math.random() * 2;
        }
        warpGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        warpGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const warpMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false });
        this.warpRays = new THREE.LineSegments(warpGeo, warpMat);
        this.warpRays.renderOrder = 999;
        this.groups.warp.add(this.warpRays);
        this.warpSpeedMultiplier = 1;

        const redWarpCount = 4000; 
        const redWarpGeo = new THREE.BufferGeometry();
        const redPositions = new Float32Array(redWarpCount * 6);
        const redColors = new Float32Array(redWarpCount * 6);
        this.redWarpVelocities = new Float32Array(redWarpCount);
        const redColor = new THREE.Color(0xff0000); 
        
        for (let i = 0; i < redWarpCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 0.5 + Math.random() * 30; 
            const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius;
            const z = 100 + Math.random() * 50; 
            
            redPositions[i * 6] = x; redPositions[i * 6 + 1] = y; redPositions[i * 6 + 2] = z;
            redPositions[i * 6 + 3] = x; redPositions[i * 6 + 4] = y; redPositions[i * 6 + 5] = z - 4; 
            
            for (let j = 0; j < 2; j++) {
                redColors[i * 6 + j * 3] = redColor.r; redColors[i * 6 + j * 3 + 1] = redColor.g; redColors[i * 6 + j * 3 + 2] = redColor.b;
            }
            this.redWarpVelocities[i] = 5 + Math.random() * 10; 
        }
        redWarpGeo.setAttribute('position', new THREE.BufferAttribute(redPositions, 3));
        redWarpGeo.setAttribute('color', new THREE.BufferAttribute(redColors, 3));
        const redWarpMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthTest: false });
        this.redWarpRays = new THREE.LineSegments(redWarpGeo, redWarpMat);
        this.redWarpRays.renderOrder = 1000;
        this.groups.warp.add(this.redWarpRays);

        const suckCubeGeo = new THREE.BoxGeometry(10, 10, 10);
        const suckCubeMat = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 10, 
            wireframe: true,
            transparent: true,
            opacity: 0
        });
        this.suckCube = new THREE.Mesh(suckCubeGeo, suckCubeMat);
        this.groups.warp.add(this.suckCube);
    }

    async transitionTo(sceneName) {
        if(this.isTransitioning || this.currentScene === sceneName) return;
        this.isTransitioning = true;

        const themeColors = {
            school: 0xaa00ff, portfolio: 0x00ffff, company: 0xffa500, board: 0x00ff00, home: 0xffffff
        };

        const currentSection = document.getElementById(`section-${this.currentScene}`);
        const currentContent = currentSection ? currentSection.querySelector('.content') : null;

        gsap.to(this.redWarpRays.material, { opacity: 1, duration: 0.1 });
        
        this.suckCube.scale.set(4, 4, 4);
        this.suckCube.position.set(0, 0, 10);
        this.suckCube.rotation.set(0, 0, 0);
        gsap.to(this.suckCube.material, { opacity: 1, duration: 0.2 });

        if (currentContent) {
            gsap.to(currentContent, {
                scale: 0,
                opacity: 0,
                filter: "blur(20px)",
                duration: 1.0,
                ease: "power2.in"
            });
        }

        gsap.to(this.suckCube.position, { z: -150, duration: 1.0, ease: "power2.in" });
        gsap.to(this.suckCube.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 1.0, ease: "power2.in" });
        gsap.to(this.suckCube.rotation, { x: Math.PI * 4, y: Math.PI * 4, z: Math.PI * 4, duration: 1.0, ease: "power1.inOut" });

        if(this.currentScene === 'home') {
            gsap.to(this.mainCube.position, { z: -200, duration: 1.0, ease: "power3.in" });
            gsap.to(this.mainCube.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: "power3.in" });
        } else {
            gsap.to(this.groups[this.currentScene].position, { z: -200, opacity: 0, duration: 1.0, ease: "power2.in" });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        gsap.to(this.redWarpRays.material, { opacity: 0, duration: 0.1 });
        gsap.to(this.suckCube.material, { opacity: 0, duration: 0.1 });


        gsap.to(this.warpRays.material, { opacity: 1, duration: 0.3 });
        gsap.to(this, { warpSpeedMultiplier: 20, duration: 1.5, ease: "power4.in" });
        gsap.to(this.bloomPass, { strength: 10, duration: 1.5, ease: "power4.in" });

        const targetColor = new THREE.Color(themeColors[sceneName]);
        gsap.to(this.warpRays.material.color, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 1.5 });

        await new Promise(resolve => setTimeout(resolve, 500));

        this.scene.fog = (sceneName === 'school') ? new THREE.FogExp2(0x1a0a2e, 0.05) : null;
        if(sceneName === 'company') this.scene.fog = new THREE.FogExp2(0x001a33, 0.05);
        if(sceneName === 'portfolio') this.scene.fog = new THREE.FogExp2(0x4d3300, 0.02);
        if(sceneName === 'board') this.scene.fog = new THREE.FogExp2(0x001100, 0.03); 

        this.bokehPass.enabled = (sceneName === 'school');

        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        const nextSection = document.getElementById(`section-${sceneName}`);
        nextSection.classList.add('active');

        const nextContent = nextSection.querySelector('.content');
        if (nextContent) {
            gsap.set(nextContent, { scale: 3, opacity: 0, filter: "blur(20px)" });
        }

        Object.keys(this.groups).forEach(key => {
            if (key !== 'warp') this.groups[key].visible = false;
        });
        this.groups[sceneName].visible = true;
        this.groups[sceneName].position.set(0, -10, -50); 

        if(sceneName === 'school') {
            gsap.to(this.camera.position, { y: 5, z: 20, duration: 2.5, ease: "power3.inOut" });
        } else {
            gsap.to(this.camera.position, { y: 0, z: 5, duration: 1.8, ease: "power3.out" });
        }

        if(sceneName === 'portfolio') this.startCountUp();
        if(sceneName !== 'home') document.getElementById('btn-back').classList.remove('hidden');
        else {
            document.getElementById('btn-back').classList.add('hidden');
            this.mainCube.position.set(2, 0, 0); this.mainCube.scale.set(1, 1, 1);
        }

        gsap.to(this, { warpSpeedMultiplier: 1, duration: 2, ease: "power2.out" });
        gsap.to(this.bloomPass, { strength: 1.5, duration: 2, ease: "power2.out" });
        gsap.to(this.groups[sceneName].position, { z: 0, y: 0, duration: 1.8, ease: "power3.out" });
        gsap.to(this.warpRays.material, { opacity: 0, duration: 1, delay: 1 });
        
        if (nextContent) {
            gsap.to(nextContent, {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "power3.out",
                clearProps: "all" 
            });

            // School Card Stagger Animation
            if (sceneName === 'school') {
                gsap.fromTo('.school-card', 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 1.2 }
                );
            }

            // Company Card Stagger Animation
            if (sceneName === 'company') {
                gsap.fromTo('.company-card', 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 1.2 }
                );
            }

            // Tool Card Depth-Zoom Animation
            if (sceneName === 'portfolio') {
                gsap.fromTo('.tool-card', 
                    { z: -800, opacity: 0, scale: 0.2 }, 
                    { z: 0, opacity: 1, scale: 1, duration: 1.8, stagger: 0.2, ease: "power3.out", delay: 1.2 }
                );
            }
        }

        this.currentScene = sceneName;
        this.isTransitioning = false;
    }

    startCountUp() {
        document.querySelectorAll('.counter').forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const obj = { val: 0 };
            gsap.to(obj, { val: target, duration: 2, onUpdate: () => el.innerText = obj.val.toFixed(target % 1 === 0 ? 0 : 1)});
        });
    }

    setupEventListeners() {
        document.querySelectorAll('#main-nav li').forEach(li => {
            li.addEventListener('click', (e) => {
                const scene = e.currentTarget.getAttribute('data-scene');
                if(!scene) return;
                document.querySelectorAll('#main-nav li').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.transitionTo(scene);
            });
        });
        document.getElementById('btn-back').addEventListener('click', () => {
            document.querySelectorAll('#main-nav li').forEach(l => l.classList.remove('active'));
            document.querySelector('[data-scene="home"]').classList.add('active');
            this.transitionTo('home');
        });
        window.addEventListener('mousemove', (e) => {
            const cursor = document.getElementById('cursor');
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            cursor.style.left = e.clientX + 'px'; 
            cursor.style.top = e.clientY + 'px';

            if(!this.isTransitioning) {
                let parallaxIntensity = 0.5;
                if(this.currentScene === 'portfolio') parallaxIntensity = 1.2; 
                
                gsap.to(this.camera.position, { 
                    x: x * parallaxIntensity, 
                    y: (this.currentScene === 'school' ? 5 : 0) + y * (parallaxIntensity * 0.5), 
                    duration: 1.5,
                    ease: "power2.out"
                });
                this.camera.lookAt(0, 0, -5); 
            }
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight; 
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            if(this.composer) this.composer.setSize(window.innerWidth, window.innerHeight);
        });

    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = Date.now() * 0.001;

        if(this.groups.home.visible) {
            this.mainCube.rotation.y += 0.005; this.mainCube.rotation.z += 0.003;
            this.innerCore.rotation.x += 0.01; this.innerCore.rotation.y += 0.01;
        }

        if(this.warpRays && (this.warpRays.material.opacity > 0 || this.isTransitioning)) {
            const pos = this.warpRays.geometry.attributes.position.array;
            for(let i=0; i<3500; i++) {
                const v = this.warpVelocities[i] * this.warpSpeedMultiplier;
                pos[i * 6 + 2] += v; pos[i * 6 + 5] += v;
                pos[i * 6 + 5] = pos[i * 6 + 2] - (1 + v * 0.5);
                if(pos[i * 6 + 5] > 50) { pos[i * 6 + 2] = -200; pos[i * 6 + 5] = -201; }
            }
            this.warpRays.geometry.attributes.position.needsUpdate = true;
        }

        if(this.redWarpRays && this.redWarpRays.material.opacity > 0) {
            const pos = this.redWarpRays.geometry.attributes.position.array;
            for(let i=0; i<4000; i++) {
                const v = this.redWarpVelocities[i];
                pos[i * 6 + 2] -= v; pos[i * 6 + 5] -= v; 
                
                if(pos[i * 6 + 2] < -150) { 
                    pos[i * 6 + 2] = 100 + Math.random() * 50; 
                    pos[i * 6 + 5] = pos[i * 6 + 2] - 4; 
                }
            }
            this.redWarpRays.geometry.attributes.position.needsUpdate = true;
        }

        if(this.groups.school.visible && this.grassInstances) {
            this.grassInstances.rotation.z = Math.sin(time * 0.5) * 0.03;
        }

        if(this.groups.portfolio.visible) {
            if(this.invertedPyramid) {
                this.invertedPyramid.rotation.y += 0.003;
                this.invertedPyramid.position.y = Math.sin(time * 0.8) * 0.15;
                this.invertedPyramid.rotation.z = Math.sin(time * 0.5) * 0.05; 
            }
        }
        
        if(this.groups.company.visible) {
            if(this.diamondRing) {
                this.diamondRing.rotation.y += 0.005;
                this.diamondRing.position.y = Math.sin(time * 0.7) * 0.3;
            }
            if(this.companyPyramids) {
                this.companyPyramids.forEach(p => {
                    p.phase += 0.05; 
                    
                    p.mesh.position.x += Math.cos(p.angle) * p.speed;
                    p.mesh.position.z += Math.sin(p.angle) * p.speed;
                    p.mesh.position.y += Math.sin(p.phase) * 0.02; 
                    
                    if(Math.abs(p.mesh.position.x) > 15 || Math.abs(p.mesh.position.z) > 15) {
                        p.angle += Math.PI; 
                    }
                    
                    p.mesh.lookAt(this.diamondRing.position);
                    p.mesh.rotation.x += p.rotSpeed;
                });
            }
            if(this.marineSnow) {
                const pos = this.marineSnow.geometry.attributes.position.array;
                for(let i=1; i<pos.length; i+=3) {
                    pos[i] -= 0.01; 
                    if(pos[i] < -20) pos[i] = 20; 
                }
                this.marineSnow.geometry.attributes.position.needsUpdate = true;
            }
        }

        if(this.groups.board.visible) {
            if(this.greenPortal) {
                this.greenPortal.material.emissiveIntensity = 10 + Math.sin(time * 2) * 5;
                this.greenPortal.rotation.z += 0.01;
            }
        }

        if(this.composer) this.composer.render();
        else this.renderer.render(this.scene, this.camera);
    }
}

new SceneManager();

// --- Guestbook Firebase Firestore Real-time Connection Logic (Compat Version) ---
// Note: Firebase SDKs are loaded via CDN in index.html as Compat versions to support local file system execution.

// 인증 확인된 고유 프로젝트 마스터 키
const firebaseConfig = {
  apiKey: "AIzaSyAKSONEILnCTf0_E1HyWK-1gl9bvxX69Uo",
  authDomain: "last-92c1d.firebaseapp.com",
  projectId: "last-92c1d",
  storageBucket: "last-92c1d.firebasestorage.app",
  messagingSenderId: "49325777716",
  appId: "1:49325777716:web:6d197113785e5ecf047b61",
  measurementId: "G-TZMXTS28BW"
};

// Firebase 초기화
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;
const guestbookRef = db ? db.collection("guestbook") : null;

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const messageInput = document.getElementById('message-input');
    const messageBoard = document.getElementById('message-board');

    if (submitBtn && messageInput && messageBoard && guestbookRef) {
        // 1. 실시간 데이터 읽기 및 화면 업데이트 (Read)
        guestbookRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            messageBoard.innerHTML = ''; // 화면 클리어 후 재렌더링
            
            snapshot.forEach((snapshotDoc) => {
                const data = snapshotDoc.data();
                const docId = snapshotDoc.id;

                const msgItem = document.createElement('div');
                msgItem.className = 'message-item';
                
                msgItem.innerHTML = `
                    <span class="message-time">${data.timeLabel || '[전송 완료]'}</span>
                    <div class="message-content" style="line-height: 1.5;">${data.text}</div>
                    <textarea class="edit-input-field">${data.text}</textarea>
                    <div class="msg-actions">
                        <button class="btn-msg-action edit">수정</button>
                        <button class="btn-msg-action delete">삭제</button>
                    </div>
                `;

                const editBtn = msgItem.querySelector('.edit');
                const deleteBtn = msgItem.querySelector('.delete');
                const contentDiv = msgItem.querySelector('.message-content');
                const editField = msgItem.querySelector('.edit-input-field');

                // 2. 실시간 데이터 삭제 기능 (Delete)
                deleteBtn.addEventListener('click', async () => {
                    if (confirm('기록을 실시간 데이터베이스에서 정말 삭제하시겠습니까?')) {
                        try {
                            await db.collection("guestbook").doc(docId).delete();
                        } catch (err) {
                            alert("삭제 권한 오류 또는 네트워크 장애 발생: " + err.message);
                        }
                    }
                });

                // 3. 실시간 데이터 인라인 수정 기능 (Update)
                editBtn.addEventListener('click', async () => {
                    if (editBtn.textContent === '수정') {
                        contentDiv.style.display = 'none';
                        editField.style.display = 'block';
                        editField.focus();
                        editBtn.textContent = '저장';
                        editBtn.style.borderColor = '#00f2ff';
                        editBtn.style.color = '#00f2ff';
                    } else {
                        const newText = editField.value.trim();
                        if (newText === '') {
                            alert('내용을 입력해주세요.');
                            return;
                        }
                        try {
                            const now = new Date();
                            const editTimeStr = `[${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} 수정됨]`;
                            
                            await db.collection("guestbook").doc(docId).update({
                                text: newText,
                                timeLabel: editTimeStr
                            });
                        } catch (err) {
                            alert("수정 실패: " + err.message);
                        }
                    }
                });

                messageBoard.appendChild(msgItem);
            });
        });

        // 4. 데이터베이스 저장 기능 (Create)
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const text = messageInput.value.trim();
            
            if (text === '') {
                alert('메시지를 입력해주세요!');
                return;
            }

            const now = new Date();
            const timeStr = `[${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} 전송됨]`;

            try {
                await guestbookRef.add({
                    text: text,
                    timestamp: Date.now(),
                    timeLabel: timeStr
                });
                messageInput.value = '';
            } catch (err) {
                alert("데이터 전송 실패: " + err.message);
            }
        });
    }
});