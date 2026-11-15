import * as THREE from 'three';

export type FinishPresetId = 'obsidian-cobalt' | 'brushed-titanium' | 'studio-brass';

export interface FinishPreset {
  id: FinishPresetId;
  label: string;
  chassisColor: number;
  chassisRoughness: number;
  chassisMetalness: number;
  secondaryColor: number;
  secondaryRoughness: number;
  secondaryMetalness: number;
  accentColor: number;
  accentRoughness: number;
  accentMetalness: number;
  trimColor: number;
}

export const FINISH_PRESETS: Record<FinishPresetId, FinishPreset> = {
  'obsidian-cobalt': {
    id: 'obsidian-cobalt',
    label: 'Obsidian Cobalt',
    chassisColor: 0x1b212c,
    chassisRoughness: 0.42,
    chassisMetalness: 0.65,
    secondaryColor: 0x2c3442,
    secondaryRoughness: 0.28,
    secondaryMetalness: 0.85,
    accentColor: 0x2563eb,
    accentRoughness: 0.22,
    accentMetalness: 0.72,
    trimColor: 0x94a3b8,
  },
  'brushed-titanium': {
    id: 'brushed-titanium',
    label: 'Brushed Titanium',
    chassisColor: 0x8b95a5,
    chassisRoughness: 0.34,
    chassisMetalness: 0.88,
    secondaryColor: 0x242a34,
    secondaryRoughness: 0.62,
    secondaryMetalness: 0.2,
    accentColor: 0x3b82f6,
    accentRoughness: 0.24,
    accentMetalness: 0.68,
    trimColor: 0xe2e8f0,
  },
  'studio-brass': {
    id: 'studio-brass',
    label: 'Warm Brass',
    chassisColor: 0x1e2229,
    chassisRoughness: 0.5,
    chassisMetalness: 0.45,
    secondaryColor: 0x333a46,
    secondaryRoughness: 0.3,
    secondaryMetalness: 0.8,
    accentColor: 0xd49b4b,
    accentRoughness: 0.24,
    accentMetalness: 0.9,
    trimColor: 0xe9c48c,
  },
};

/**
 * Generates an isotropic / brushed metal roughness map in linear space (NoColorSpace)
 * for subtle specular breakup across anodized aluminum and machined chassis surfaces.
 */
export function createBrushedMetalRoughnessTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = 'rgb(185, 185, 185)';
    ctx.fillRect(0, 0, 256, 256);

    for (let y = 0; y < 256; y += 2) {
      const shade = 155 + Math.floor(((Math.sin(y * 0.43) + Math.cos(y * 1.17)) * 0.5 + 1) * 38);
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }

    // Fine micro-grain passes
    for (let i = 0; i < 420; i++) {
      const x = (i * 73) % 256;
      const y = (i * 41) % 256;
      const w = 14 + (i % 36);
      const tone = 145 + (i % 75);
      ctx.fillStyle = `rgba(${tone}, ${tone}, ${tone}, 0.35)`;
      ctx.fillRect(x, y, w, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = Math.min(maxAnisotropy, 8);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a high-resolution sRGB CanvasTexture depicting Farhad Ali's multi-track
 * video editing, AI asset generation, and color grading workstation screen.
 */
export function createStudioTimelineTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep monitor canvas
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, 1024, 512);

    // Top studio bar
    ctx.fillStyle = '#141a24';
    ctx.fillRect(0, 0, 1024, 44);
    ctx.fillStyle = '#253042';
    ctx.fillRect(0, 43, 1024, 1);

    // Header labels
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('FARHAD STUDIO // PRODUCTION TIMELINE', 24, 27);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '600 14px monospace';
    ctx.fillText('TC 00:02:14:08   24.00 FPS   4K HDR', 690, 27);

    // Left inspector panel
    ctx.fillStyle = '#111620';
    ctx.fillRect(18, 58, 226, 250);
    ctx.strokeStyle = '#243044';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 58, 226, 250);

    const nodes = [
      { title: '01 · SCRIPT & HOOK', color: '#3b82f6' },
      { title: '02 · AI MOTION PASS', color: '#60a5fa' },
      { title: '03 · COLOR GRADE LUT', color: '#93c5fd' },
      { title: '04 · AUDIO MASTERING', color: '#cbd5e1' },
    ];
    nodes.forEach((node, idx) => {
      const y = 78 + idx * 54;
      ctx.fillStyle = '#1a2232';
      ctx.fillRect(32, y, 198, 40);
      ctx.fillStyle = node.color;
      ctx.fillRect(32, y, 4, 40);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(node.title, 46, y + 24);
    });

    // Center preview frame (ThePOVNarrative / WhatTheByte style cinematic frame)
    const frameGrad = ctx.createLinearGradient(264, 58, 760, 308);
    frameGrad.addColorStop(0, '#10213d');
    frameGrad.addColorStop(0.55, '#193561');
    frameGrad.addColorStop(1, '#0c1322');
    ctx.fillStyle = frameGrad;
    ctx.fillRect(264, 58, 496, 250);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(264, 58, 496, 250);

    // Subtle horizon glow + geometric composition inside monitor preview
    const glow = ctx.createRadialGradient(512, 175, 18, 512, 175, 190);
    glow.addColorStop(0, 'rgba(59, 130, 246, 0.55)');
    glow.addColorStop(0.6, 'rgba(37, 99, 235, 0.14)');
    glow.addColorStop(1, 'rgba(13, 17, 23, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(266, 60, 492, 246);

    // Rule-of-thirds safe guides on monitor
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(429, 60);
    ctx.lineTo(429, 306);
    ctx.moveTo(595, 60);
    ctx.lineTo(595, 306);
    ctx.moveTo(266, 141);
    ctx.lineTo(758, 141);
    ctx.moveTo(266, 224);
    ctx.lineTo(758, 224);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('AI-ASSISTED VISUAL PIPELINE', 345, 176);
    ctx.fillStyle = '#93c5fd';
    ctx.font = '500 13px monospace';
    ctx.fillText('THE POV NARRATIVE  •  WHATTHEBYTE  •  FORD INVESTS', 300, 206);

    // Right scopes panel (RGB waveform simulation)
    ctx.fillStyle = '#111620';
    ctx.fillRect(780, 58, 226, 250);
    ctx.strokeStyle = '#243044';
    ctx.strokeRect(780, 58, 226, 250);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px monospace';
    ctx.fillText('LUMA / CHROMA SCOPE', 796, 80);

    for (let i = 0; i < 42; i++) {
      const bx = 796 + i * 4.7;
      const h = 34 + Math.sin(i * 0.35) * 28 + Math.cos(i * 0.72) * 18;
      ctx.fillStyle = i % 3 === 0 ? '#3b82f6' : '#64748b';
      ctx.fillRect(bx, 220 - h, 3, h);
    }

    // Bottom NLE Timeline Tracks
    ctx.fillStyle = '#111620';
    ctx.fillRect(18, 326, 988, 168);
    ctx.strokeStyle = '#243044';
    ctx.strokeRect(18, 326, 988, 168);

    const tracks = [
      { label: 'V3 FX', y: 342, color: '#3b82f6', clips: [[90, 210], [320, 260], [600, 310]] },
      { label: 'V2 AI', y: 378, color: '#2563eb', clips: [[90, 140], [250, 370], [640, 290]] },
      { label: 'V1 CUT', y: 414, color: '#475569', clips: [[90, 410], [516, 440]] },
      { label: 'A1 VO', y: 450, color: '#0ea5e9', clips: [[90, 860]] },
    ];

    tracks.forEach((track) => {
      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px monospace';
      ctx.fillText(track.label, 30, track.y + 19);

      track.clips.forEach(([cx, cw]) => {
        ctx.fillStyle = track.color;
        ctx.fillRect(cx, track.y, cw, 26);
        ctx.strokeStyle = '#0d1117';
        ctx.strokeRect(cx, track.y, cw, 26);
      });
    });

    // Playhead vertical line
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(468, 332, 2, 156);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(461, 326);
    ctx.lineTo(477, 326);
    ctx.lineTo(469, 338);
    ctx.closePath();
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(maxAnisotropy, 8);
  texture.needsUpdate = true;
  return texture;
}

export type StudioLightingMode = 'daylight' | 'night';

/**
 * Generates a subtle architectural studio grid floor texture (sRGB)
 * calibrated for either Soft Ceramic Daylight or Night Studio lighting.
 */
export function createFloorDiffuseTexture(
  maxAnisotropy = 4,
  mode: StudioLightingMode = 'daylight'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const isDaylight = mode === 'daylight';

  if (ctx) {
    ctx.fillStyle = isDaylight ? '#eef2f7' : '#12161d';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle ceramic studio grid lines
    ctx.strokeStyle = isDaylight
      ? 'rgba(15, 23, 42, 0.065)'
      : 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    // Cobalt architectural major crosshairs
    ctx.strokeStyle = isDaylight
      ? 'rgba(37, 99, 235, 0.14)'
      : 'rgba(59, 130, 246, 0.14)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, 0, 512, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.anisotropy = Math.min(maxAnisotropy, 8);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a soft radial alpha map for grounded contact shadow planes beneath
 * pedestals and the main studio rig.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    const gradient = ctx.createRadialGradient(128, 128, 16, 128, 128, 124);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.38)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
