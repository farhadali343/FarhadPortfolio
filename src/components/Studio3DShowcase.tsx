import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Maximize2,
  Minimize2,
  RotateCw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Box,
} from 'lucide-react';
import {
  FINISH_PRESETS,
  FinishPresetId,
  createBrushedMetalRoughnessTexture,
  createContactShadowTexture,
  createFloorDiffuseTexture,
  createStudioTimelineTexture,
} from '../three/proceduralMaterials';
import {
  DisciplineId,
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

const DISCIPLINE_CAMERA_TARGETS: Record<DisciplineId, { pos: [number, number, number]; look: [number, number, number] }> = {
  'production-rig': { pos: [0.45, 1.85, 3.3], look: [0, 1.25, -0.1] },
  'video-motion': { pos: [-1.15, 1.55, 3.35], look: [-2.65, 0.78, 1.35] },
  'narrative-youtube': { pos: [1.15, 1.55, 3.35], look: [2.65, 0.78, 1.35] },
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

  const [activePreset, setActivePreset] = useState<CameraPresetId>('overview');
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>('production-rig');
  const [explodePercent, setExplodePercent] = useState<number>(0);
  const [finishId, setFinishId] = useState<FinishPresetId>('obsidian-cobalt');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglStatus, setWebglStatus] = useState<'ready' | 'context-lost' | 'unsupported'>('ready');

  // Mutable refs synced into the WebGL loop without re-creating the scene
  const explodeTargetRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const isFullscreenRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const sceneObjectsRef = useRef<StudioSceneObjects | null>(null);
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

  // Apply finish changes directly to active PBR materials
  useEffect(() => {
    if (!sceneObjectsRef.current) return;
    applyFinishPreset(
      sceneObjectsRef.current.materials,
      FINISH_PRESETS[finishId],
      sceneObjectsRef.current.stageRingMat
    );
  }, [finishId]);

  // Keyboard shortcuts: H toggles bottom dock, Escape exits fullscreen studio mode
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
      } else if (event.key === 'Escape' && isFullscreenRef.current) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock body scroll when Fullscreen Studio Mode is active
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  // IntersectionObserver pauses rendering when scrolled off-screen (unless fullscreen)
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

  // Main Three.js WebGL Setup & Lifecycle
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
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    if (!isSoftwareGl) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x0f141c);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(0x0f141c, 0.044);

    const camera = new THREE.PerspectiveCamera(42, initialWidth / initialHeight, 0.1, 80);
    camera.position.set(5.2, 3.1, 5.6);

    // PMREM Studio IBL Environment
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;

    // Warm Key + Cool Fill + Crisp Rim Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.35);
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

    const hemiFill = new THREE.HemisphereLight(0xa5c8ff, 0x1a202c, 0.85);
    scene.add(hemiFill);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.85);
    rimLight.position.set(-5.0, 4.2, -5.5);
    scene.add(rimLight);

    // Procedural Textures (Zero External Assets)
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const roughnessTex = createBrushedMetalRoughnessTexture(maxAniso);
    const screenTex = createStudioTimelineTexture(maxAniso);
    const floorTex = createFloorDiffuseTexture(maxAniso);
    const shadowTex = createContactShadowTexture();

    const materials = createStudioMaterials(
      FINISH_PRESETS['obsidian-cobalt'],
      roughnessTex,
      screenTex,
      isSoftwareGl
    );
    const studioObjects = buildCreativeStudioScene(materials, floorTex, shadowTex);
    sceneObjectsRef.current = studioObjects;
    scene.add(studioObjects.root);

    // Pre-compile on hardware WebGL only
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // OrbitControls with damped inertia and floor clamp
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

    // Click Raycasting (throttled strictly to pointerup with < 5px drag tolerance)
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
          const camTarget = DISCIPLINE_CAMERA_TARGETS[hitId];
          cameraTweenRef.current.pos.set(...camTarget.pos);
          cameraTweenRef.current.look.set(...camTarget.look);
          cameraTweenRef.current.active = true;
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ResizeObserver handles both container resizes and fullscreen toggle seamlessly
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(Math.floor(entry.contentRect.width), 100);
      const h = Math.max(Math.floor(entry.contentRect.height), 100);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    // WebGL Context Loss & Restoration Handling
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglStatus('context-lost');
    };
    const onContextRestored = () => {
      setWebglStatus('ready');
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // Pre-allocated math objects outside the animation loop (zero per-frame GC)
    const _tmpVec = new THREE.Vector3();
    let currentExplode = 0;
    let lastTime = performance.now();
    let rafId = 0;
    let disposed = false;

    // WebGL2 fenceSync helper for software renderers (never setTimeout(tick, n))
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
        // Smooth camera preset damping
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

        // Smooth exploded-view interpolation
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

        // Gentle idle kinetic rotation on discipline totems (skipped on reduced-motion)
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

      // Thorough disposal of all GPU geometries, materials, textures, and targets
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
      floorTex.dispose();
      shadowTex.dispose();
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
      renderer.dispose();
      sceneObjectsRef.current = null;
    };
  }, []);

  const handleSelectPreset = (preset: CameraPresetSpec) => {
    setActivePreset(preset.id);
    if (preset.discipline) {
      setSelectedDiscipline(preset.discipline);
    }
    cameraTweenRef.current.pos.set(...preset.position);
    cameraTweenRef.current.look.set(...preset.target);
    cameraTweenRef.current.active = true;
  };

  const activeInfo = STUDIO_DISCIPLINES[selectedDiscipline];

  return (
    <section
      id="studio-3d"
      ref={containerRef}
      className="no-print border-b border-[#E5E7EB] bg-[#F8F9FB]"
    >
      {/* Editorial Section Header Above the Viewport */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono-tabular text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Interactive WebGL · Creative Studio Rig
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15191F]">
              3D Production Workspace
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#68717D] max-w-[52ch] leading-relaxed">
            Drag to orbit, scroll to zoom, or click any 3D pillar around the workstation to inspect
            how video, AI pipelines, YouTube channels, and e-commerce fit together.
          </p>
        </div>
      </div>

      {/* Interactive 3D Viewport Stage (Supports Embedded Full-Width & 100vw x 100vh Fullscreen) */}
      <div
        className={
          isFullscreen
            ? 'fixed inset-0 z-50 w-screen h-screen bg-[#0F141C]'
            : 'mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16'
        }
      >
        <div
          className={`relative w-full overflow-hidden bg-[#0F141C] ${
            isFullscreen
              ? 'h-full'
              : 'h-[560px] sm:h-[640px] rounded-xl border border-[#1E293B]'
          }`}
        >
          {/* Isolated WebGL Canvas Mount */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D creative studio rig powered by Three.js"
          />

          {/* Top-Left Minimal Spatial Title & Top-Right Fullscreen Trigger (Zero Backdrop Blur) */}
          <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <div className="pointer-events-auto rounded-md bg-[#15191F]/95 border border-[#2D3644] px-3 py-2 text-xs text-[#E2E8F0]">
              <span className="font-mono-tabular uppercase tracking-wider text-[#60A5FA]">
                STUDIO 3D
              </span>
              <span className="mx-2 text-[#475569]">|</span>
              <span className="font-medium text-white">{activeInfo.title}</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label={isFullscreen ? 'Exit fullscreen 3D studio' : 'Open fullscreen 3D studio'}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#15191F]/95 border border-[#2D3644] hover:border-[#60A5FA] px-3 py-2 text-xs font-medium text-[#E2E8F0] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
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

          {/* WebGL Unsupported / Context Lost Fallback Notice */}
          {webglStatus !== 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0F141C] p-6 text-center">
              <div className="max-w-md rounded-lg bg-[#15191F] border border-[#2D3644] p-6">
                <Box className="w-8 h-8 text-[#60A5FA] mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {webglStatus === 'context-lost'
                    ? '3D Graphics Context Paused'
                    : '3D View Unavailable'}
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  {webglStatus === 'context-lost'
                    ? 'The browser temporarily reclaimed GPU resources. Reload or resume interaction to restore the studio scene.'
                    : 'WebGL acceleration is disabled in this browser environment.'}
                </p>
              </div>
            </div>
          )}

          {/* Single Compact Collapsible Bottom Control Dock (No Backdrop Blur, <= 15% Footprint) */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col items-center">
            {dockCollapsed ? (
              <button
                type="button"
                onClick={() => setDockCollapsed(false)}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-[#15191F]/95 border border-[#2D3644] hover:border-[#60A5FA] px-3.5 py-2 text-xs font-medium text-[#E2E8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Controls (H)</span>
                <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>
            ) : (
              <div className="pointer-events-auto w-full max-w-[960px] rounded-lg bg-[#15191F]/95 border border-[#2D3644] px-4 py-3 text-xs text-[#E2E8F0]">
                {/* Row 1: Selected Discipline Readout + Collapse Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#252D3A]">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                    <span className="font-mono-tabular uppercase tracking-wider text-[11px] text-[#60A5FA]">
                      {activeInfo.category}
                    </span>
                    <span className="text-[#475569]">·</span>
                    <span className="text-[#CBD5E1] truncate max-w-[60ch]">
                      {activeInfo.summary}
                    </span>
                    <span className="hidden lg:inline font-mono-tabular text-[11px] text-[#94A3B8]">
                      ({activeInfo.reference})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDockCollapsed(true)}
                    title="Collapse controls (H)"
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-[#94A3B8] hover:text-white hover:bg-[#232A36] transition-colors shrink-0"
                  >
                    <span>Hide (H)</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Row 2: Camera Presets + Exploded View + Material Finish + Auto-Orbit */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
                  {/* Camera Presets */}
                  <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Camera Presets">
                    {CAMERA_PRESETS.map((preset) => {
                      const isActive = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                            isActive
                              ? 'bg-[#2563EB] text-white'
                              : 'bg-[#1F2631] text-[#CBD5E1] hover:bg-[#2A3342] hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Exploded View Slider */}
                  <label className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                    <span className="font-medium whitespace-nowrap">Explode</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={explodePercent}
                      onChange={(e) => setExplodePercent(Number(e.target.value))}
                      aria-label="Explode 3D rig assembly"
                      className="w-24 sm:w-28 accent-[#2563EB] cursor-pointer"
                    />
                    <span className="font-mono-tabular w-8 text-right text-[#94A3B8]">
                      {explodePercent}%
                    </span>
                  </label>

                  {/* Material Finish Selector & Auto-Orbit Toggle */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded bg-[#1F2631] p-0.5" role="group" aria-label="Studio Finish">
                      {(Object.keys(FINISH_PRESETS) as FinishPresetId[]).map((id) => {
                        const preset = FINISH_PRESETS[id];
                        const isActive = finishId === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setFinishId(id)}
                            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                              isActive
                                ? 'bg-[#334155] text-white'
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
                      onClick={() => setAutoRotate((prev) => !prev)}
                      aria-pressed={autoRotate}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                        autoRotate
                          ? 'bg-[#2563EB]/20 text-[#93C5FD] border border-[#2563EB]/50'
                          : 'bg-[#1F2631] text-[#94A3B8] border border-transparent hover:text-white'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Orbit</span>
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
