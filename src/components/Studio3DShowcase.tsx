import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Moon,
  RotateCw,
  SlidersHorizontal,
  Sun,
  X,
} from 'lucide-react';
import {
  FINISH_PRESETS,
  FinishPresetId,
  StudioLightingMode,
  createBrushedMetalRoughnessTexture,
  createContactShadowTexture,
  createFloorDiffuseTexture,
  createStudioTimelineTexture,
} from '../three/proceduralMaterials';
import {
  DisciplineId,
  PILLAR_HOTSPOTS,
  STUDIO_DISCIPLINES,
  StudioSceneObjects,
  applyFinishPreset,
  buildCreativeStudioScene,
  createStudioMaterials,
} from '../three/studioRigModels';

type CameraPresetId = 'overview' | 'rig' | 'lens' | 'pillars';

interface CameraPresetSpec {
  id: CameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  discipline?: DisciplineId;
}

const CAMERA_PRESETS: CameraPresetSpec[] = [
  {
    id: 'overview',
    label: 'Overview',
    position: [5.2, 3.1, 5.6],
    target: [0, 0.9, -0.1],
    discipline: 'production-rig',
  },
  {
    id: 'rig',
    label: 'Workstation',
    position: [0.4, 1.85, 3.25],
    target: [0, 1.32, -0.12],
    discipline: 'production-rig',
  },
  {
    id: 'lens',
    label: 'Cinema Optic',
    position: [2.15, 1.28, 2.2],
    target: [0.68, 0.62, 0.42],
    discipline: 'video-motion',
  },
  {
    id: 'pillars',
    label: '4 Pillars',
    position: [-5.1, 4.1, 4.9],
    target: [0, 0.72, -0.15],
  },
];

const DISCIPLINE_CAMERA_TARGETS: Record<
  DisciplineId,
  { pos: [number, number, number]; look: [number, number, number] }
> = {
  'production-rig': { pos: [0.45, 1.85, 3.3], look: [0, 1.25, -0.1] },
  'video-motion': { pos: [-1.15, 1.6, 3.35], look: [-2.65, 0.78, 1.35] },
  'narrative-youtube': { pos: [1.15, 1.6, 3.35], look: [2.65, 0.78, 1.35] },
  'ai-workflows': { pos: [-1.1, 1.65, 0.45], look: [-2.65, 0.78, -1.65] },
  'ecommerce-brand': { pos: [1.1, 1.65, 0.45], look: [2.65, 0.78, -1.65] },
};

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      (probeCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return false;

    const debugExt = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererInfo = debugExt
      ? String(gl.getParameter(debugExt.UNMASKED_RENDERER_WEBGL) || '')
      : String(gl.getParameter(gl.RENDERER) || '');

    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererInfo);
  } catch {
    return false;
  }
}

export default function Studio3DShowcase() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [lightingMode, setLightingMode] = useState<StudioLightingMode>('daylight');
  const [activePreset, setActivePreset] = useState<CameraPresetId>('overview');
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>('production-rig');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [explodePercent, setExplodePercent] = useState<number>(0);
  const [finishId, setFinishId] = useState<FinishPresetId>('brushed-titanium');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglStatus, setWebglStatus] = useState<'ready' | 'context-lost' | 'unsupported'>('ready');

  const explodeTargetRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const isFullscreenRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const sceneObjectsRef = useRef<StudioSceneObjects | null>(null);
  const applyLightingRef = useRef<((mode: StudioLightingMode) => void) | null>(null);

  const cameraTweenRef = useRef<{
    active: boolean;
    pos: THREE.Vector3;
    look: THREE.Vector3;
  }>({
    active: false,
    pos: new THREE.Vector3(5.2, 3.1, 5.6),
    look: new THREE.Vector3(0, 0.9, -0.1),
  });

  useEffect(() => {
    explodeTargetRef.current = explodePercent / 100;
  }, [explodePercent]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    isFullscreenRef.current = isFullscreen;
  }, [isFullscreen]);

  // Apply material finish dynamically
  useEffect(() => {
    if (!sceneObjectsRef.current) return;
    applyFinishPreset(
      sceneObjectsRef.current.materials,
      FINISH_PRESETS[finishId],
      sceneObjectsRef.current.stageRingMat
    );
  }, [finishId]);

  // Apply Daylight / Night studio lighting dynamically
  useEffect(() => {
    applyLightingRef.current?.(lightingMode);
  }, [lightingMode]);

  // Keyboard shortcuts: H toggles bottom dock, Escape exits fullscreen or closes drawer
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;
      if (isInput) return;

      if (event.key === 'h' || event.key === 'H') {
        setDockCollapsed((prev) => !prev);
      } else if (event.key === 'Escape') {
        if (isFullscreenRef.current) {
          setIsFullscreen(false);
        } else {
          setDrawerOpen(false);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisibleRef.current = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Main Three.js WebGL Lifecycle
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches || isSoftwareGl) {
      setAutoRotate(false);
      autoRotateRef.current = false;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglStatus('unsupported');
      return;
    }

    const initialWidth = Math.max(mount.clientWidth, 320);
    const initialHeight = Math.max(mount.clientHeight, 320);

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    if (!isSoftwareGl) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const daylightBg = new THREE.Color(0xedf2f7);
    const nightBg = new THREE.Color(0x0f141c);
    scene.background = daylightBg.clone();
    scene.fog = new THREE.FogExp2(0xedf2f7, 0.032);

    const camera = new THREE.PerspectiveCamera(42, initialWidth / initialHeight, 0.1, 80);
    camera.position.set(5.2, 3.1, 5.6);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;

    // Warm Key + Cool Fill + Crisp Rim Studio Lights
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.45);
    keyLight.position.set(5.5, 8.5, 5.2);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 24;
      keyLight.shadow.camera.left = -5.5;
      keyLight.shadow.camera.right = 5.5;
      keyLight.shadow.camera.top = 5.5;
      keyLight.shadow.camera.bottom = -5.5;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiFill = new THREE.HemisphereLight(0xf8fafc, 0xcbd5e1, 1.35);
    scene.add(hemiFill);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.9);
    rimLight.position.set(-5.0, 4.2, -5.5);
    scene.add(rimLight);

    // Procedural Textures
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const roughnessTex = createBrushedMetalRoughnessTexture(maxAniso);
    const screenTex = createStudioTimelineTexture(maxAniso);
    const daylightFloorTex = createFloorDiffuseTexture(maxAniso, 'daylight');
    const nightFloorTex = createFloorDiffuseTexture(maxAniso, 'night');
    const shadowTex = createContactShadowTexture();

    const materials = createStudioMaterials(
      FINISH_PRESETS['brushed-titanium'],
      roughnessTex,
      screenTex,
      isSoftwareGl
    );
    const studioObjects = buildCreativeStudioScene(materials, daylightFloorTex, shadowTex);
    sceneObjectsRef.current = studioObjects;
    scene.add(studioObjects.root);

    applyLightingRef.current = (mode: StudioLightingMode) => {
      const isDay = mode === 'daylight';
      scene.background = (isDay ? daylightBg : nightBg).clone();
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(isDay ? daylightBg : nightBg);
        scene.fog.density = isDay ? 0.032 : 0.044;
      }

      studioObjects.floorMat.map = isDay ? daylightFloorTex : nightFloorTex;
      studioObjects.floorMat.roughness = isDay ? 0.65 : 0.78;
      studioObjects.floorMat.needsUpdate = true;

      if (isDay) {
        keyLight.color.setHex(0xfff5e6);
        keyLight.intensity = 2.45;
        hemiFill.color.setHex(0xf8fafc);
        hemiFill.groundColor.setHex(0xcbd5e1);
        hemiFill.intensity = 1.35;
        rimLight.intensity = 0.75;
        renderer.toneMappingExposure = 1.08;
      } else {
        keyLight.color.setHex(0xfff1dc);
        keyLight.intensity = 2.35;
        hemiFill.color.setHex(0xa5c8ff);
        hemiFill.groundColor.setHex(0x1a202c);
        hemiFill.intensity = 0.85;
        rimLight.intensity = 0.9;
        renderer.toneMappingExposure = 1.1;
      }
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.9, -0.1);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.1;
    controls.maxDistance = 12.5;
    controls.maxPolarAngle = Math.PI * 0.472;
    controls.minPolarAngle = 0.18;
    controls.autoRotateSpeed = 0.45;
    controls.update();

    const onControlsStart = () => {
      cameraTweenRef.current.active = false;
    };
    controls.addEventListener('start', onControlsStart);

    // Throttled Pointer-Up Raycasting
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let downX = 0;
    let downY = 0;

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(studioObjects.interactiveTargets, true);
      if (hits.length > 0) {
        const hitId = hits[0].object.userData.disciplineId as DisciplineId | undefined;
        if (hitId && STUDIO_DISCIPLINES[hitId]) {
          setSelectedDiscipline(hitId);
          setDrawerOpen(true);
          const camTarget = DISCIPLINE_CAMERA_TARGETS[hitId];
          cameraTweenRef.current.pos.set(...camTarget.pos);
          cameraTweenRef.current.look.set(...camTarget.look);
          cameraTweenRef.current.active = true;
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    let viewportWidth = initialWidth;
    let viewportHeight = initialHeight;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      viewportWidth = Math.max(Math.floor(entry.contentRect.width), 100);
      viewportHeight = Math.max(Math.floor(entry.contentRect.height), 100);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(viewportWidth, viewportHeight);
    });
    resizeObserver.observe(mount);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglStatus('context-lost');
    };
    const onContextRestored = () => {
      setWebglStatus('ready');
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // Pre-allocated vectors outside animation loop (zero per-frame GC)
    const _tmpVec = new THREE.Vector3();
    const _projVec = new THREE.Vector3();
    let currentExplode = 0;
    let lastTime = performance.now();
    let rafId = 0;
    let disposed = false;

    const glContext = renderer.getContext();
    const isWebGL2 =
      typeof WebGL2RenderingContext !== 'undefined' &&
      glContext instanceof WebGL2RenderingContext;

    const scheduleNextFrame = () => {
      if (disposed) return;

      if (!isSoftwareGl || !isWebGL2) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const gl2 = glContext as WebGL2RenderingContext;
      const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!sync) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      gl2.flush();
      const startWait = performance.now();

      const afterDraw = () => {
        if (disposed) {
          gl2.deleteSync(sync);
          return;
        }
        const status = gl2.getSyncParameter(sync, gl2.SYNC_STATUS);
        if (status === gl2.SIGNALED || performance.now() - startWait >= 80) {
          gl2.deleteSync(sync);
          rafId = requestAnimationFrame(animate);
        } else {
          rafId = requestAnimationFrame(afterDraw);
        }
      };

      rafId = requestAnimationFrame(afterDraw);
    };

    const animate = (now: number) => {
      if (disposed) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const shouldRender =
        !document.hidden && (isVisibleRef.current || isFullscreenRef.current);

      if (shouldRender) {
        if (cameraTweenRef.current.active) {
          camera.position.x = THREE.MathUtils.damp(
            camera.position.x,
            cameraTweenRef.current.pos.x,
            5.5,
            delta
          );
          camera.position.y = THREE.MathUtils.damp(
            camera.position.y,
            cameraTweenRef.current.pos.y,
            5.5,
            delta
          );
          camera.position.z = THREE.MathUtils.damp(
            camera.position.z,
            cameraTweenRef.current.pos.z,
            5.5,
            delta
          );

          controls.target.x = THREE.MathUtils.damp(
            controls.target.x,
            cameraTweenRef.current.look.x,
            6.5,
            delta
          );
          controls.target.y = THREE.MathUtils.damp(
            controls.target.y,
            cameraTweenRef.current.look.y,
            6.5,
            delta
          );
          controls.target.z = THREE.MathUtils.damp(
            controls.target.z,
            cameraTweenRef.current.look.z,
            6.5,
            delta
          );

          if (
            camera.position.distanceTo(cameraTweenRef.current.pos) < 0.025 &&
            controls.target.distanceTo(cameraTweenRef.current.look) < 0.02
          ) {
            cameraTweenRef.current.active = false;
          }
        }

        currentExplode = THREE.MathUtils.damp(
          currentExplode,
          explodeTargetRef.current,
          7,
          delta
        );
        const parts = studioObjects.explodableParts;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          const base = part.userData.basePosition as THREE.Vector3 | undefined;
          const offset = part.userData.explodeOffset as THREE.Vector3 | undefined;
          if (base && offset) {
            _tmpVec.copy(offset).multiplyScalar(currentExplode);
            part.position.copy(base).add(_tmpVec);
          }
        }

        if (!reducedMotionQuery.matches) {
          const spinners = studioObjects.animatedSpinners;
          for (let i = 0; i < spinners.length; i++) {
            spinners[i].rotation.y += delta * (0.32 + i * 0.06);
          }
        }

        controls.autoRotate =
          !isSoftwareGl &&
          !reducedMotionQuery.matches &&
          autoRotateRef.current &&
          !cameraTweenRef.current.active;

        controls.update();
        renderer.render(scene, camera);

        // Update 2D projected positions of the 4 Pillar Hotspot Pins (zero React state re-renders)
        for (let i = 0; i < PILLAR_HOTSPOTS.length; i++) {
          const spec = PILLAR_HOTSPOTS[i];
          const pinEl = pinRefs.current[spec.id];
          if (!pinEl) continue;

          _projVec.set(
            spec.position[0],
            spec.anchorHeight + currentExplode * 0.42,
            spec.position[2]
          );
          _projVec.project(camera);

          const isVisible =
            _projVec.z >= -1 &&
            _projVec.z <= 1 &&
            _projVec.x >= -0.95 &&
            _projVec.x <= 0.95 &&
            _projVec.y >= -0.9 &&
            _projVec.y <= 0.9;

          if (!isVisible) {
            pinEl.style.opacity = '0';
            pinEl.style.pointerEvents = 'none';
          } else {
            const px = (_projVec.x * 0.5 + 0.5) * viewportWidth;
            const py = (-_projVec.y * 0.5 + 0.5) * viewportHeight;
            pinEl.style.opacity = '1';
            pinEl.style.pointerEvents = 'auto';
            pinEl.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -100%)`;
          }
        }
      }

      scheduleNextFrame();
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlsStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });

      roughnessTex.dispose();
      screenTex.dispose();
      daylightFloorTex.dispose();
      nightFloorTex.dispose();
      shadowTex.dispose();
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
      renderer.dispose();
      sceneObjectsRef.current = null;
      applyLightingRef.current = null;
    };
  }, []);

  const handleSelectPreset = (preset: CameraPresetSpec) => {
    setActivePreset(preset.id);
    if (preset.discipline) {
      setSelectedDiscipline(preset.discipline);
    }
    if (preset.id === 'overview' || preset.id === 'pillars') {
      setDrawerOpen(false);
    }
    cameraTweenRef.current.pos.set(...preset.position);
    cameraTweenRef.current.look.set(...preset.target);
    cameraTweenRef.current.active = true;
  };

  const handleHotspotClick = (id: DisciplineId) => {
    setSelectedDiscipline(id);
    setDrawerOpen(true);
    const camTarget = DISCIPLINE_CAMERA_TARGETS[id];
    cameraTweenRef.current.pos.set(...camTarget.pos);
    cameraTweenRef.current.look.set(...camTarget.look);
    cameraTweenRef.current.active = true;
  };

  const activeInfo = STUDIO_DISCIPLINES[selectedDiscipline];
  const isDay = lightingMode === 'daylight';

  return (
    <section
      id="studio-3d"
      ref={containerRef}
      className="no-print border-b border-slate-200/80 bg-[#F8FAFC]"
    >
      {/* Editorial Section Header Above the Viewport */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono-tabular text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Interactive WebGL · Soft Ceramic Studio
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              3D Production Workspace
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-[52ch] leading-relaxed">
            Orbit the workstation, switch studio lighting, explode the assembly, or click any
            floating pillar pin to inspect its live systems and deliverables.
          </p>
        </div>
      </div>

      {/* Interactive 3D Viewport Stage */}
      <div
        className={
          isFullscreen
            ? 'fixed inset-0 z-50 w-screen h-screen bg-[#EDF2F7]'
            : 'mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16'
        }
      >
        <div
          className={`relative w-full overflow-hidden transition-colors duration-300 ${
            isDay ? 'bg-[#EDF2F7]' : 'bg-[#0F141C]'
          } ${
            isFullscreen
              ? 'h-full'
              : 'h-[580px] sm:h-[650px] rounded-2xl border border-slate-200/90 studio-card-shadow'
          }`}
        >
          {/* Isolated WebGL Canvas Mount */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D creative studio rig powered by Three.js"
          />

          {/* Interactive 3D Floating Hotspot Pins Projected Over the 4 Pillars */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {PILLAR_HOTSPOTS.map((spec, idx) => {
              const meta = STUDIO_DISCIPLINES[spec.id];
              const isSelected = selectedDiscipline === spec.id && drawerOpen;
              return (
                <button
                  key={spec.id}
                  ref={(el) => {
                    pinRefs.current[spec.id] = el;
                  }}
                  type="button"
                  onClick={() => handleHotspotClick(spec.id)}
                  style={{ opacity: 0, left: 0, top: 0 }}
                  className={`absolute flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors shadow-[0_8px_20px_-6px_rgba(15,23,42,0.28)] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isSelected
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : isDay
                        ? 'bg-white/95 text-[#0F172A] border-slate-300/90 hover:border-[#2563EB]'
                        : 'bg-[#15191F]/95 text-white border-slate-700 hover:border-[#60A5FA]'
                  }`}
                >
                  <span
                    className={`font-mono-tabular text-[10px] font-bold ${
                      isSelected ? 'text-white' : 'text-[#2563EB]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="whitespace-nowrap">{meta.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Top-Left Minimal Spatial Title & Top-Right Fullscreen Trigger (No Backdrop Blur Over WebGL) */}
          <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <div
              className={`pointer-events-auto rounded-xl border px-3.5 py-2 text-xs shadow-sm ${
                isDay
                  ? 'bg-white/95 border-slate-200 text-slate-700'
                  : 'bg-[#15191F]/95 border-[#2D3644] text-[#E2E8F0]'
              }`}
            >
              <span className="font-mono-tabular font-semibold uppercase tracking-wider text-[#2563EB]">
                STUDIO 3D
              </span>
              <span className="mx-2 opacity-40">|</span>
              <span className={`font-semibold ${isDay ? 'text-[#0F172A]' : 'text-white'}`}>
                {activeInfo.title}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label={isFullscreen ? 'Exit fullscreen 3D studio' : 'Open fullscreen 3D studio'}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isDay
                    ? 'bg-white/95 border-slate-200 text-[#0F172A] hover:border-[#2563EB]'
                    : 'bg-[#15191F]/95 border-[#2D3644] text-[#E2E8F0] hover:border-[#60A5FA]'
                }`}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Pillar Detail Drawer (Cleanly Tucked at Top-Left Below Header When Active) */}
          {drawerOpen && (
            <div
              role="region"
              aria-label={`${activeInfo.title} details`}
              className={`pointer-events-auto absolute top-16 left-4 w-[calc(100%-2rem)] sm:w-80 rounded-2xl border p-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.22)] ${
                isDay
                  ? 'bg-white/95 border-slate-200 text-[#0F172A]'
                  : 'bg-[#15191F]/95 border-[#2D3644] text-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200/40">
                <div>
                  <div className="font-mono-tabular text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                    {activeInfo.category}
                  </div>
                  <h3 className="font-display text-sm font-bold mt-0.5">{activeInfo.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close pillar detail drawer"
                  className={`p-1 rounded-lg transition-colors ${
                    isDay ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p
                className={`text-xs leading-relaxed ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {activeInfo.summary}
              </p>

              <ul className="mt-3 space-y-1.5">
                {activeInfo.highlights.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 text-[11px] leading-snug ${
                      isDay ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    <span className="font-mono-tabular text-[#C28E36] mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-3 pt-2.5 border-t text-[11px] font-mono-tabular ${
                  isDay
                    ? 'border-slate-200/80 text-slate-500'
                    : 'border-slate-700 text-slate-400'
                }`}
              >
                {activeInfo.reference}
              </div>
            </div>
          )}

          {/* WebGL Fallback */}
          {webglStatus !== 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#EDF2F7] p-6 text-center">
              <div className="max-w-md rounded-2xl bg-white border border-slate-200 p-6 studio-card-shadow">
                <Box className="w-8 h-8 text-[#2563EB] mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold text-[#0F172A] mb-2">
                  {webglStatus === 'context-lost'
                    ? '3D Graphics Context Paused'
                    : '3D View Unavailable'}
                </h3>
                <p className="text-sm text-slate-600">
                  {webglStatus === 'context-lost'
                    ? 'The browser temporarily reclaimed GPU resources. Reload or resume interaction to restore the studio scene.'
                    : 'WebGL acceleration is disabled in this browser environment.'}
                </p>
              </div>
            </div>
          )}

          {/* Single Compact Collapsible Bottom Control Dock */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col items-center">
            {dockCollapsed ? (
              <button
                type="button"
                onClick={() => setDockCollapsed(false)}
                className={`pointer-events-auto inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isDay
                    ? 'bg-white/95 border-slate-200 text-[#0F172A] hover:border-[#2563EB]'
                    : 'bg-[#15191F]/95 border-[#2D3644] text-[#E2E8F0] hover:border-[#60A5FA]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Controls (H)</span>
                <ChevronUp className="w-3.5 h-3.5 opacity-70" />
              </button>
            ) : (
              <div
                className={`pointer-events-auto w-full max-w-[980px] rounded-2xl border px-4 py-3 text-xs shadow-[0_18px_38px_-14px_rgba(15,23,42,0.22)] ${
                  isDay
                    ? 'bg-white/95 border-slate-200/95 text-[#0F172A]'
                    : 'bg-[#15191F]/95 border-[#2D3644] text-[#E2E8F0]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
                  {/* Camera Presets */}
                  <div
                    className="flex flex-wrap items-center gap-1.5"
                    role="group"
                    aria-label="Camera Presets"
                  >
                    {CAMERA_PRESETS.map((preset) => {
                      const isActive = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                            isActive
                              ? 'bg-[#2563EB] text-white'
                              : isDay
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#0F172A]'
                                : 'bg-[#1F2631] text-[#CBD5E1] hover:bg-[#2A3342] hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Exploded View Slider */}
                  <label className="flex items-center gap-2 text-xs">
                    <span className="font-medium whitespace-nowrap">Explode</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={explodePercent}
                      onChange={(e) => setExplodePercent(Number(e.target.value))}
                      aria-label="Explode 3D rig assembly"
                      className="w-20 sm:w-24 accent-[#2563EB] cursor-pointer"
                    />
                    <span className="font-mono-tabular w-8 text-right opacity-75">
                      {explodePercent}%
                    </span>
                  </label>

                  {/* Material Finish + Lighting Toggle + Auto-Orbit + Collapse */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className={`flex items-center gap-1 rounded-lg p-0.5 ${
                        isDay ? 'bg-slate-100' : 'bg-[#1F2631]'
                      }`}
                      role="group"
                      aria-label="Studio Material Finish"
                    >
                      {(Object.keys(FINISH_PRESETS) as FinishPresetId[]).map((id) => {
                        const preset = FINISH_PRESETS[id];
                        const isActive = finishId === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setFinishId(id)}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                              isActive
                                ? isDay
                                  ? 'bg-white text-[#0F172A] shadow-xs'
                                  : 'bg-[#334155] text-white'
                                : isDay
                                  ? 'text-slate-600 hover:text-[#0F172A]'
                                  : 'text-[#94A3B8] hover:text-white'
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setLightingMode((prev) => (prev === 'daylight' ? 'night' : 'daylight'))
                      }
                      aria-label={
                        isDay ? 'Switch to Night studio lighting' : 'Switch to Daylight studio lighting'
                      }
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        isDay
                          ? 'bg-slate-100 text-[#0F172A] hover:bg-slate-200'
                          : 'bg-[#1F2631] text-[#E2E8F0] hover:bg-[#2A3342]'
                      }`}
                    >
                      {isDay ? (
                        <>
                          <Sun className="w-3.5 h-3.5 text-[#C28E36]" />
                          <span className="hidden sm:inline">Daylight</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5 text-[#60A5FA]" />
                          <span className="hidden sm:inline">Night</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAutoRotate((prev) => !prev)}
                      aria-pressed={autoRotate}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        autoRotate
                          ? 'bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/30'
                          : isDay
                            ? 'bg-slate-100 text-slate-600 border border-transparent hover:text-[#0F172A]'
                            : 'bg-[#1F2631] text-[#94A3B8] border border-transparent hover:text-white'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Orbit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDockCollapsed(true)}
                      title="Collapse controls (H)"
                      aria-label="Hide 3D studio controls"
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors ${
                        isDay
                          ? 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-100'
                          : 'text-[#94A3B8] hover:text-white hover:bg-[#232A36]'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
