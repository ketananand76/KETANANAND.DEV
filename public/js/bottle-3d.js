// 3D Bottle Model Viewer
let bottleScene, bottleCamera, bottleRenderer, bottleModel, bottleControls;
let bottleViewerInitialized = false;

function initBottle3DViewer() {
    const container = document.getElementById('bottle-3d-viewer');
    if (!container || bottleViewerInitialized) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        showError(container, '3D Library not loaded');
        return;
    }

    try {
        // Scene setup
        bottleScene = new THREE.Scene();
        bottleScene.background = new THREE.Color(0x667eea);

        // Camera setup
        const aspect = container.offsetWidth / container.offsetHeight;
        bottleCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        bottleCamera.position.set(0, 0, 3);

        // Renderer setup
        bottleRenderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        bottleRenderer.setSize(container.offsetWidth, container.offsetHeight);
        bottleRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bottleRenderer.shadowMap.enabled = true;
        bottleRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
        bottleRenderer.outputEncoding = THREE.sRGBEncoding;
        bottleRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        bottleRenderer.toneMappingExposure = 1.2;
        
        container.appendChild(bottleRenderer.domElement);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        bottleScene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(2, 2, 2);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        bottleScene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0x4f46e5, 0.3);
        fillLight.position.set(-2, -1, -1);
        bottleScene.add(fillLight);

        // Controls setup
        if (typeof THREE.OrbitControls !== 'undefined') {
            bottleControls = new THREE.OrbitControls(bottleCamera, bottleRenderer.domElement);
            bottleControls.enableDamping = true;
            bottleControls.dampingFactor = 0.05;
            bottleControls.enableZoom = true;
            bottleControls.autoRotate = true;
            bottleControls.autoRotateSpeed = 2;
            bottleControls.maxDistance = 10;
            bottleControls.minDistance = 1;
        } else {
            console.warn('OrbitControls not available, using fallback');
            showFallbackContent();
        }

        // Load the model
        loadBottleModel();

        // Animation loop
        animateBottle();

        // Handle resize
        window.addEventListener('resize', onBottleWindowResize);
        
        bottleViewerInitialized = true;

    } catch (error) {
        console.error('Error initializing 3D viewer:', error);
        showError(container, 'Failed to initialize 3D viewer');
    }
}

function loadBottleModel() {
    // Check if GLTFLoader is available
    if (typeof THREE.GLTFLoader === 'undefined') {
        console.warn('GLTFLoader not available, using fallback');
        showFallbackContent();
        return;
    }
    
    const loader = new THREE.GLTFLoader();
    const loadingElement = document.querySelector('.loading-3d');
    
    loader.load(
        'images/projects/lahorizira_bottel.glb',
        function(gltf) {
            bottleModel = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(bottleModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Center the model
            bottleModel.position.x += (bottleModel.position.x - center.x);
            bottleModel.position.y += (bottleModel.position.y - center.y);
            bottleModel.position.z += (bottleModel.position.z - center.z);
            
            // Scale the model to fit nicely
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            bottleModel.scale.setScalar(scale);
            
            // Enable shadows
            bottleModel.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    // Enhance material properties
                    if (child.material) {
                        child.material.metalness = 0.2;
                        child.material.roughness = 0.8;
                    }
                }
            });
            
            bottleScene.add(bottleModel);
            
            // Hide loading text
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            console.log('Bottle model loaded successfully');
        },
        function(progress) {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        function(error) {
            console.error('Error loading bottle model:', error);
            // Show fallback image instead of error
            const container = document.getElementById('bottle-3d-viewer');
            if (container) {
                container.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
                        <div style="text-align: center; color: white;">
                            <i class="fas fa-cube" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.8;"></i>
                            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 600;">3D Bottle Model</h3>
                            <p style="margin: 0.5rem 0 0 0; opacity: 0.8; font-size: 0.9rem;">Interactive 3D View</p>
                        </div>
                    </div>
                `;
            }
        }
    );
}

function animateBottle() {
    requestAnimationFrame(animateBottle);
    
    if (bottleControls) {
        bottleControls.update();
    }
    
    if (bottleRenderer && bottleScene && bottleCamera) {
        bottleRenderer.render(bottleScene, bottleCamera);
    }
}

function onBottleWindowResize() {
    const container = document.getElementById('bottle-3d-viewer');
    if (!container || !bottleCamera || !bottleRenderer) return;
    
    const newAspect = container.offsetWidth / container.offsetHeight;
    bottleCamera.aspect = newAspect;
    bottleCamera.updateProjectionMatrix();
    
    bottleRenderer.setSize(container.offsetWidth, container.offsetHeight);
}

function resetBottleRotation() {
    if (bottleControls) {
        bottleControls.reset();
        bottleControls.autoRotate = true;
    }
    return false; // Prevent default link behavior
}

function showFallbackContent() {
    const container = document.getElementById('bottle-3d-viewer');
    if (container) {
        container.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; cursor: pointer;" onclick="resetBottleRotation()">
                <div style="text-align: center; color: white;">
                    <i class="fas fa-cube" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.8; animation: rotate3d 4s linear infinite;"></i>
                    <h3 style="margin: 0; font-size: 1.2rem; font-weight: 600;">3D Bottle Model</h3>
                    <p style="margin: 0.5rem 0 0 0; opacity: 0.8; font-size: 0.9rem;">Interactive 3D View</p>
                    <p style="margin: 0.5rem 0 0 0; opacity: 0.6; font-size: 0.8rem;">Click to reset rotation</p>
                </div>
            </div>
            <style>
                @keyframes rotate3d {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
            </style>
        `;
    }
}

function showError(container, message) {
    container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ef4444;">
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>${message}</p>
            </div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Three.js to load
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInit() {
        if (typeof THREE !== 'undefined') {
            setTimeout(() => {
                initBottle3DViewer();
            }, 500);
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryInit, 500);
        } else {
            // Fallback if Three.js doesn't load
            const container = document.getElementById('bottle-3d-viewer');
            if (container) {
                container.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
                        <div style="text-align: center; color: white;">
                            <i class="fas fa-cube" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.8;"></i>
                            <h3 style="margin: 0; font-size: 1.2rem; font-weight: 600;">3D Bottle Model</h3>
                            <p style="margin: 0.5rem 0 0 0; opacity: 0.8; font-size: 0.9rem;">Interactive 3D View</p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    tryInit();
});

// Handle intersection observer for performance
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('bottle-3d-viewer');
        if (container) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !bottleViewerInitialized) {
                        initBottle3DViewer();
                    } else if (!entry.isIntersecting && bottleControls) {
                        bottleControls.autoRotate = false;
                    } else if (entry.isIntersecting && bottleControls) {
                        bottleControls.autoRotate = true;
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(container);
        }
    });
}