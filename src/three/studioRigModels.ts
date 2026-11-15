import * as THREE from 'three';
import { FinishPreset } from './proceduralMaterials';

export type DisciplineId =
  | 'production-rig'
  | 'video-motion'
  | 'narrative-youtube'
  | 'ai-workflows'
  | 'ecommerce-brand';

export interface DisciplineMeta {
  id: DisciplineId;
  title: string;
  category: string;
  summary: string;
  reference: string;
}

export const STUDIO_DISCIPLINES: Record<DisciplineId, DisciplineMeta> = {
  'production-rig': {
    id: 'production-rig',
    title: 'AI & Cinema Production Rig',
    category: 'Core Creative Workstation',
    summary:
      'Central creative pipeline uniting script drafting, AI-assisted visual synthesis, multi-track video editing, and final color grading.',
    reference: 'ThePOVNarrative · WhatTheByte · FordInvests',
  },
  'video-motion': {
    id: 'video-motion',
    title: 'Video & Motion Systems',
    category: 'Short & Long-Form Production',
    summary:
      'Retention-paced editing, hook architecture, 3D motion framing, and cross-platform vertical/widescreen visual workflows.',
    reference: 'CapCut · Premiere Pro · After Effects',
  },
  'narrative-youtube': {
    id: 'narrative-youtube',
    title: 'YouTube & Narrative Channels',
    category: 'Multi-Channel Publishing',
    summary:
      'End-to-end packaging, thumbnail hierarchy, voiceover pacing, and audience retention systems for global channels.',
    reference: '@ThePOVNarrative · @fordinvestsUS · @theoshow22',
  },
  'ai-workflows': {
    id: 'ai-workflows',
    title: 'AI Creative Automation',
    category: 'Generative Pipelines',
    summary:
      'Modular prompt engineering, ComfyUI asset pipelines, and AI studio tooling to scale high-clarity digital production.',
    reference: '100% AI-Generated Visual Showcase · Gemini / Flux',
  },
  'ecommerce-brand': {
    id: 'ecommerce-brand',
    title: 'Storefronts & Brand Curation',
    category: 'Digital Commerce',
    summary:
      'Creator merchandising, Shopify storefront architecture, visual product curation, and structured buyer pathways.',
    reference: 'EleCoStudio Shopify · Fourthwall · Benable',
  },
};

export interface StudioMaterialsBundle {
  chassisMat: THREE.MeshStandardMaterial;
  secondaryMat: THREE.MeshStandardMaterial;
  rubberMat: THREE.MeshStandardMaterial;
  accentMat: THREE.MeshStandardMaterial;
  trimMat: THREE.MeshStandardMaterial;
  screenMat: THREE.MeshStandardMaterial;
  opticGlassMat: THREE.MeshPhysicalMaterial;
  glowRingMat: THREE.MeshStandardMaterial;
}

export interface StudioSceneObjects {
  root: THREE.Group;
  materials: StudioMaterialsBundle;
  stageRingMat: THREE.MeshStandardMaterial;
  explodableParts: THREE.Object3D[];
  interactiveTargets: THREE.Object3D[];
  animatedSpinners: THREE.Object3D[];
  calibrationMesh: THREE.InstancedMesh;
}

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function createChamferOctagonShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const sides = 8;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / 8;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  }
  shape.closePath();
  return shape;
}

function tagInteractive(obj: THREE.Object3D, disciplineId: DisciplineId, castShadow = true) {
  obj.traverse((child) => {
    child.userData.disciplineId = disciplineId;
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = castShadow;
      child.receiveShadow = true;
    }
  });
}

function registerExplodable(
  list: THREE.Object3D[],
  obj: THREE.Object3D,
  offset: THREE.Vector3
) {
  obj.userData.basePosition = obj.position.clone();
  obj.userData.explodeOffset = offset;
  list.push(obj);
}

export function createStudioMaterials(
  preset: FinishPreset,
  roughnessMap: THREE.Texture,
  screenTexture: THREE.Texture,
  isSoftwareGl: boolean
): StudioMaterialsBundle {
  const chassisMat = new THREE.MeshStandardMaterial({
    color: preset.chassisColor,
    roughness: preset.chassisRoughness,
    metalness: preset.chassisMetalness,
    roughnessMap,
    envMapIntensity: 1.0,
  });

  const secondaryMat = new THREE.MeshStandardMaterial({
    color: preset.secondaryColor,
    roughness: preset.secondaryRoughness,
    metalness: preset.secondaryMetalness,
    roughnessMap,
    envMapIntensity: 1.15,
  });

  // High-roughness non-metallic matte rubber creates >= 0.4 roughness contrast with metal
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111419,
    roughness: 0.88,
    metalness: 0.04,
    envMapIntensity: 0.35,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: preset.accentColor,
    roughness: preset.accentRoughness,
    metalness: preset.accentMetalness,
    envMapIntensity: 1.25,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: preset.trimColor,
    roughness: 0.2,
    metalness: 0.92,
    envMapIntensity: 1.3,
  });

  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTexture,
    emissiveMap: screenTexture,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.82,
    roughness: 0.14,
    metalness: 0.05,
  });

  // Optical glass uses physical transmission on hardware WebGL, and sleek reflective fallback on software WebGL
  const opticGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    roughness: 0.06,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    ior: 1.5,
    reflectivity: 0.9,
    transmission: isSoftwareGl ? 0 : 0.88,
    thickness: 0.35,
    transparent: true,
    opacity: isSoftwareGl ? 0.42 : 1.0,
  });

  const glowRingMat = new THREE.MeshStandardMaterial({
    color: preset.accentColor,
    emissive: new THREE.Color(preset.accentColor),
    emissiveIntensity: 1.1,
    roughness: 0.25,
    metalness: 0.4,
  });

  return {
    chassisMat,
    secondaryMat,
    rubberMat,
    accentMat,
    trimMat,
    screenMat,
    opticGlassMat,
    glowRingMat,
  };
}

export function applyFinishPreset(
  materials: StudioMaterialsBundle,
  preset: FinishPreset,
  stageRingMat?: THREE.MeshStandardMaterial
) {
  materials.chassisMat.color.setHex(preset.chassisColor);
  materials.chassisMat.roughness = preset.chassisRoughness;
  materials.chassisMat.metalness = preset.chassisMetalness;

  materials.secondaryMat.color.setHex(preset.secondaryColor);
  materials.secondaryMat.roughness = preset.secondaryRoughness;
  materials.secondaryMat.metalness = preset.secondaryMetalness;

  materials.accentMat.color.setHex(preset.accentColor);
  materials.accentMat.roughness = preset.accentRoughness;
  materials.accentMat.metalness = preset.accentMetalness;

  materials.trimMat.color.setHex(preset.trimColor);

  materials.glowRingMat.color.setHex(preset.accentColor);
  materials.glowRingMat.emissive.setHex(preset.accentColor);

  if (stageRingMat) {
    stageRingMat.color.setHex(preset.accentColor);
    stageRingMat.emissive.setHex(preset.accentColor);
  }
}

function buildProductionRig(
  materials: StudioMaterialsBundle,
  shadowTexture: THREE.Texture,
  explodableParts: THREE.Object3D[]
): THREE.Group {
  const rig = new THREE.Group();
  rig.name = 'ProductionRig';

  // 1. Grounded contact shadow beneath the central rig
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 3.4),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.52,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.004;
  rig.add(shadowPlane);

  // 2. Four matte rubber isolation feet resting directly on y = 0
  const footGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.06, 20);
  const footOffsets: [number, number][] = [
    [-1.15, -0.75],
    [1.15, -0.75],
    [-1.15, 0.75],
    [1.15, 0.75],
  ];
  footOffsets.forEach(([fx, fz]) => {
    const foot = new THREE.Mesh(footGeo, materials.rubberMat);
    foot.position.set(fx, 0.03, fz);
    rig.add(foot);
  });

  // 3. Machined beveled main plinth (ExtrudeGeometry)
  const plinthShape = createRoundedRectShape(2.9, 1.95, 0.22);
  const plinthGeo = new THREE.ExtrudeGeometry(plinthShape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
  });
  plinthGeo.rotateX(Math.PI / 2);
  const plinth = new THREE.Mesh(plinthGeo, materials.chassisMat);
  plinth.position.set(0, 0.2, 0);
  rig.add(plinth);
  registerExplodable(explodableParts, plinth, new THREE.Vector3(0, -0.05, 0));

  // 4. Precision stepped turntable collar (LatheGeometry) on top of plinth
  const collarPoints = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.92, 0.0),
    new THREE.Vector2(0.95, 0.03),
    new THREE.Vector2(0.84, 0.08),
    new THREE.Vector2(0.76, 0.08),
    new THREE.Vector2(0.72, 0.12),
    new THREE.Vector2(0.0, 0.12),
  ];
  const collarGeo = new THREE.LatheGeometry(collarPoints, 48);
  const collar = new THREE.Mesh(collarGeo, materials.secondaryMat);
  collar.position.set(0, 0.23, -0.05);
  rig.add(collar);
  registerExplodable(explodableParts, collar, new THREE.Vector3(0, 0.18, 0));

  // 5. Recessed cobalt accent ring around collar
  const accentCollar = new THREE.Mesh(
    new THREE.TorusGeometry(0.87, 0.018, 14, 64),
    materials.glowRingMat
  );
  accentCollar.rotation.x = Math.PI / 2;
  accentCollar.position.set(0, 0.285, -0.05);
  rig.add(accentCollar);
  registerExplodable(explodableParts, accentCollar, new THREE.Vector3(0, 0.24, 0));

  // 6. Dual chamfered gantry columns supporting the studio display
  const strutShape = createRoundedRectShape(0.14, 0.24, 0.03);
  const strutGeo = new THREE.ExtrudeGeometry(strutShape, {
    depth: 1.18,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  });
  strutGeo.rotateX(-Math.PI / 2);

  [-0.58, 0.58].forEach((sx, i) => {
    const strut = new THREE.Mesh(strutGeo, materials.secondaryMat);
    strut.position.set(sx, 0.34, -0.38);
    strut.rotation.x = 0.08;
    rig.add(strut);
    registerExplodable(
      explodableParts,
      strut,
      new THREE.Vector3(i === 0 ? -0.28 : 0.28, 0.22, -0.18)
    );
  });

  // Crossbar bridge connecting gantry struts
  const crossbar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.048, 1.38, 24),
    materials.trimMat
  );
  crossbar.rotation.z = Math.PI / 2;
  crossbar.position.set(0, 1.16, -0.32);
  rig.add(crossbar);
  registerExplodable(explodableParts, crossbar, new THREE.Vector3(0, 0.32, -0.22));

  // 7. Cinema Display Housing Assembly (ExtrudeGeometry chassis + screen + protective optic bezel)
  const displayGroup = new THREE.Group();
  displayGroup.position.set(0, 1.48, -0.16);
  displayGroup.rotation.x = -0.06;

  const monitorFrameShape = createRoundedRectShape(2.58, 1.34, 0.08);
  const monitorFrameGeo = new THREE.ExtrudeGeometry(monitorFrameShape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4,
  });
  const monitorFrame = new THREE.Mesh(monitorFrameGeo, materials.chassisMat);
  monitorFrame.position.z = -0.05;
  displayGroup.add(monitorFrame);

  // Rear cooling fin array (multi-part industrial detailing)
  const finGeo = new THREE.BoxGeometry(1.45, 0.028, 0.055);
  for (let f = 0; f < 5; f++) {
    const fin = new THREE.Mesh(finGeo, materials.secondaryMat);
    fin.position.set(0, -0.24 + f * 0.12, -0.08);
    displayGroup.add(fin);
  }

  // Emissive procedural timeline screen
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.18), materials.screenMat);
  screenMesh.position.set(0, 0, 0.066);
  displayGroup.add(screenMesh);

  // Protective ultra-thin glass cover plate
  const screenCover = new THREE.Mesh(
    new THREE.BoxGeometry(2.44, 1.22, 0.012),
    materials.opticGlassMat
  );
  screenCover.position.set(0, 0, 0.074);
  displayGroup.add(screenCover);

  // Top cobalt anodized studio tally bar
  const tallyBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.028, 0.045),
    materials.glowRingMat
  );
  tallyBar.position.set(0, 0.705, 0.01);
  displayGroup.add(tallyBar);

  rig.add(displayGroup);
  registerExplodable(explodableParts, displayGroup, new THREE.Vector3(0, 0.52, -0.35));

  // 8. Precision Optical Cinema Lens & Control Deck Module (Front right on plinth)
  const lensAssembly = new THREE.Group();
  lensAssembly.position.set(0.68, 0.58, 0.42);
  lensAssembly.rotation.y = -0.22;

  // Lens cradle yoke
  const cradle = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.24, 0.34),
    materials.secondaryMat
  );
  cradle.position.set(0, -0.16, 0);
  lensAssembly.add(cradle);

  // Stepped optical barrel using LatheGeometry
  const barrelPoints = [
    new THREE.Vector2(0.0, -0.26),
    new THREE.Vector2(0.22, -0.26),
    new THREE.Vector2(0.24, -0.18),
    new THREE.Vector2(0.24, 0.02),
    new THREE.Vector2(0.27, 0.05),
    new THREE.Vector2(0.27, 0.22),
    new THREE.Vector2(0.29, 0.25),
    new THREE.Vector2(0.29, 0.36),
    new THREE.Vector2(0.24, 0.36),
    new THREE.Vector2(0.22, 0.28),
    new THREE.Vector2(0.0, 0.28),
  ];
  const barrelGeo = new THREE.LatheGeometry(barrelPoints, 40);
  barrelGeo.rotateX(Math.PI / 2);
  const barrel = new THREE.Mesh(barrelGeo, materials.chassisMat);
  lensAssembly.add(barrel);

  // Knurled focus ring (accent material contrast)
  const focusRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.268, 0.022, 16, 48),
    materials.accentMat
  );
  focusRing.position.set(0, 0, 0.14);
  lensAssembly.add(focusRing);

  // Metallic aperture trim ring
  const trimRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.285, 0.012, 14, 48),
    materials.trimMat
  );
  trimRing.position.set(0, 0, 0.32);
  lensAssembly.add(trimRing);

  // Convex optical front glass element
  const opticSphereGeo = new THREE.SphereGeometry(0.23, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.42);
  opticSphereGeo.rotateX(Math.PI / 2);
  const opticElement = new THREE.Mesh(opticSphereGeo, materials.opticGlassMat);
  opticElement.position.set(0, 0, 0.21);
  lensAssembly.add(opticElement);

  rig.add(lensAssembly);
  registerExplodable(explodableParts, lensAssembly, new THREE.Vector3(0.42, 0.36, 0.48));

  // 9. Tactile Transport & Color-Wheel Deck (Front left on plinth)
  const controlDeck = new THREE.Group();
  controlDeck.position.set(-0.62, 0.31, 0.44);

  const deckShape = createRoundedRectShape(0.95, 0.56, 0.06);
  const deckGeo = new THREE.ExtrudeGeometry(deckShape, {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  });
  deckGeo.rotateX(Math.PI / 2);
  const deckBody = new THREE.Mesh(deckGeo, materials.secondaryMat);
  deckBody.position.y = 0.05;
  controlDeck.add(deckBody);

  // Dual machined rotary encoder dials + matte rubber fader strip
  [-0.24, 0.06].forEach((dx) => {
    const dial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.115, 0.055, 28),
      materials.trimMat
    );
    dial.position.set(dx, 0.085, 0.04);
    controlDeck.add(dial);

    const dialCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.082, 0.082, 0.062, 24),
      materials.rubberMat
    );
    dialCap.position.set(dx, 0.088, 0.04);
    controlDeck.add(dialCap);
  });

  // Precision jog bar
  const jogBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.032, 0.36),
    materials.accentMat
  );
  jogBar.position.set(0.31, 0.075, 0.0);
  controlDeck.add(jogBar);

  rig.add(controlDeck);
  registerExplodable(explodableParts, controlDeck, new THREE.Vector3(-0.38, 0.25, 0.42));

  // 10. Braided Studio Power & Data Conduit (TubeGeometry along CatmullRomCurve3)
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.48, 0.31, -0.25),
    new THREE.Vector3(-0.78, 0.45, -0.52),
    new THREE.Vector3(-0.68, 0.92, -0.45),
    new THREE.Vector3(-0.28, 1.18, -0.26),
  ]);
  const cableGeo = new THREE.TubeGeometry(cableCurve, 32, 0.024, 12, false);
  const cable = new THREE.Mesh(cableGeo, materials.rubberMat);
  rig.add(cable);
  registerExplodable(explodableParts, cable, new THREE.Vector3(-0.2, 0.12, -0.3));

  tagInteractive(rig, 'production-rig');
  return rig;
}

function createGroundedPedestal(
  materials: StudioMaterialsBundle,
  shadowTexture: THREE.Texture
): THREE.Group {
  const pedestal = new THREE.Group();

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.44,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.004;
  pedestal.add(shadow);

  // Rubber base pad flush on y = 0
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.49, 0.04, 24),
    materials.rubberMat
  );
  pad.position.y = 0.02;
  pedestal.add(pad);

  // Beveled octagonal pedestal plinth
  const octShape = createChamferOctagonShape(0.43);
  const octGeo = new THREE.ExtrudeGeometry(octShape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  octGeo.rotateX(-Math.PI / 2);
  const body = new THREE.Mesh(octGeo, materials.chassisMat);
  body.position.y = 0.04;
  pedestal.add(body);

  // Metallic top bezel ring
  const topBezel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.39, 0.05, 24),
    materials.secondaryMat
  );
  topBezel.position.y = 0.425;
  pedestal.add(topBezel);

  // Cobalt status rim
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.365, 0.012, 12, 36),
    materials.glowRingMat
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.45;
  pedestal.add(rim);

  return pedestal;
}

function buildDisciplineTotem(
  id: Exclude<DisciplineId, 'production-rig'>,
  position: THREE.Vector3,
  materials: StudioMaterialsBundle,
  shadowTexture: THREE.Texture,
  explodableParts: THREE.Object3D[],
  animatedSpinners: THREE.Object3D[]
): THREE.Group {
  const totem = new THREE.Group();
  totem.position.copy(position);

  const pedestal = createGroundedPedestal(materials, shadowTexture);
  totem.add(pedestal);

  const sculpture = new THREE.Group();
  sculpture.position.y = 0.88;

  if (id === 'video-motion') {
    // Stepped Cinema Frame Gimbal + Dual Film Reels
    const outerGimbal = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.024, 16, 48),
      materials.trimMat
    );
    sculpture.add(outerGimbal);

    const frameShape = createRoundedRectShape(0.34, 0.22, 0.03);
    const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    });
    const innerSlate = new THREE.Mesh(frameGeo, materials.chassisMat);
    innerSlate.position.z = -0.025;
    sculpture.add(innerSlate);

    const lensCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.09, 24),
      materials.accentMat
    );
    lensCore.rotation.x = Math.PI / 2;
    sculpture.add(lensCore);

    const glassLens = new THREE.Mesh(
      new THREE.SphereGeometry(0.068, 20, 14),
      materials.opticGlassMat
    );
    glassLens.position.z = 0.035;
    sculpture.add(glassLens);
  } else if (id === 'narrative-youtube') {
    // Broadcast Prism + Condenser Ring + Play Emblem
    const shieldRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.27, 0.018, 12, 42, Math.PI * 1.45),
      materials.secondaryMat
    );
    shieldRing.rotation.z = Math.PI * 0.275;
    sculpture.add(shieldRing);

    const broadcastBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.14, 0.34, 24),
      materials.chassisMat
    );
    sculpture.add(broadcastBody);

    const grille = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 24, 18),
      materials.trimMat
    );
    grille.position.y = 0.17;
    sculpture.add(grille);

    const playTri = new THREE.Mesh(
      new THREE.ConeGeometry(0.09, 0.14, 3),
      materials.glowRingMat
    );
    playTri.rotation.z = -Math.PI / 2;
    playTri.position.set(0.02, 0.0, 0.13);
    sculpture.add(playTri);
  } else if (id === 'ai-workflows') {
    // Neural Node Lattice (Octahedron Core + Dual Orbital Rings + Precision Satellites)
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      materials.accentMat
    );
    sculpture.add(core);

    const orbitA = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.016, 12, 42),
      materials.trimMat
    );
    orbitA.rotation.x = Math.PI / 3;
    sculpture.add(orbitA);

    const orbitB = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.016, 12, 42),
      materials.secondaryMat
    );
    orbitB.rotation.y = Math.PI / 3;
    sculpture.add(orbitB);

    const nodeGeo = new THREE.SphereGeometry(0.038, 16, 12);
    [
      [0.26, 0, 0],
      [-0.26, 0, 0],
      [0, 0.24, 0.1],
    ].forEach(([nx, ny, nz]) => {
      const node = new THREE.Mesh(nodeGeo, materials.glowRingMat);
      node.position.set(nx, ny, nz);
      sculpture.add(node);
    });
  } else {
    // E-Commerce & Brand Curation Arch + Faceted Display Cube
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, -0.22, 0),
      new THREE.Vector3(-0.2, 0.16, 0),
      new THREE.Vector3(0, 0.28, 0),
      new THREE.Vector3(0.2, 0.16, 0),
      new THREE.Vector3(0.22, -0.22, 0),
    ]);
    const arch = new THREE.Mesh(
      new THREE.TubeGeometry(archCurve, 28, 0.028, 12, false),
      materials.trimMat
    );
    sculpture.add(arch);

    const prism = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      materials.chassisMat
    );
    prism.rotation.set(0.35, 0.65, 0.2);
    sculpture.add(prism);

    const tagSeal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.23, 20),
      materials.accentMat
    );
    tagSeal.rotation.set(0.35, 0.65, 0.2);
    sculpture.add(tagSeal);
  }

  // Stem connecting pedestal top to kinetic emblem
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.045, 0.22, 16),
    materials.trimMat
  );
  stem.position.y = 0.56;
  totem.add(stem);
  registerExplodable(explodableParts, stem, new THREE.Vector3(0, 0.12, 0));

  totem.add(sculpture);
  registerExplodable(explodableParts, sculpture, new THREE.Vector3(0, 0.42, 0));
  animatedSpinners.push(sculpture);

  tagInteractive(totem, id);
  return totem;
}

export function buildCreativeStudioScene(
  materials: StudioMaterialsBundle,
  floorTexture: THREE.Texture,
  shadowTexture: THREE.Texture
): StudioSceneObjects {
  const root = new THREE.Group();
  const explodableParts: THREE.Object3D[] = [];
  const interactiveTargets: THREE.Object3D[] = [];
  const animatedSpinners: THREE.Object3D[] = [];

  // 1. Grounded architectural studio floor (y = 0)
  const floorGeo = new THREE.CircleGeometry(24, 64);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.78,
    metalness: 0.12,
    envMapIntensity: 0.45,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.receiveShadow = true;
  floor.position.y = 0;
  root.add(floor);

  // Stage platform perimeter ring using polygonOffset to prevent any z-fighting
  const stageRingGeo = new THREE.RingGeometry(3.85, 3.92, 96);
  stageRingGeo.rotateX(-Math.PI / 2);
  const stageRingMat = new THREE.MeshStandardMaterial({
    color: materials.accentMat.color,
    emissive: materials.accentMat.color,
    emissiveIntensity: 0.35,
    roughness: 0.4,
    metalness: 0.5,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const stageRing = new THREE.Mesh(stageRingGeo, stageRingMat);
  stageRing.position.y = 0.002;
  root.add(stageRing);

  // 2. InstancedMesh (>24 items) of radial studio calibration ticks around perimeter
  const markerCount = 36;
  const markerGeo = new THREE.BoxGeometry(0.04, 0.018, 0.18);
  const calibrationMesh = new THREE.InstancedMesh(markerGeo, materials.trimMat, markerCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < markerCount; i++) {
    const angle = (i / markerCount) * Math.PI * 2;
    const radius = 3.72;
    dummy.position.set(Math.cos(angle) * radius, 0.009, Math.sin(angle) * radius);
    dummy.rotation.set(0, -angle + Math.PI / 2, 0);
    dummy.scale.set(1, i % 3 === 0 ? 1.5 : 1.0, i % 3 === 0 ? 1.35 : 0.85);
    dummy.updateMatrix();
    calibrationMesh.setMatrixAt(i, dummy.matrix);
  }
  calibrationMesh.instanceMatrix.needsUpdate = true;
  calibrationMesh.computeBoundingSphere();
  root.add(calibrationMesh);

  // 3. Central Hero Production Rig
  const rig = buildProductionRig(materials, shadowTexture, explodableParts);
  root.add(rig);
  interactiveTargets.push(rig);

  // 4. Four Discipline Totems positioned symmetrically around the hero rig
  const totemSpecs: { id: Exclude<DisciplineId, 'production-rig'>; pos: THREE.Vector3 }[] = [
    { id: 'video-motion', pos: new THREE.Vector3(-2.65, 0, 1.35) },
    { id: 'narrative-youtube', pos: new THREE.Vector3(2.65, 0, 1.35) },
    { id: 'ai-workflows', pos: new THREE.Vector3(-2.65, 0, -1.65) },
    { id: 'ecommerce-brand', pos: new THREE.Vector3(2.65, 0, -1.65) },
  ];

  totemSpecs.forEach(({ id, pos }) => {
    const totem = buildDisciplineTotem(
      id,
      pos,
      materials,
      shadowTexture,
      explodableParts,
      animatedSpinners
    );
    root.add(totem);
    interactiveTargets.push(totem);
  });

  return {
    root,
    materials,
    stageRingMat,
    explodableParts,
    interactiveTargets,
    animatedSpinners,
    calibrationMesh,
  };
}
