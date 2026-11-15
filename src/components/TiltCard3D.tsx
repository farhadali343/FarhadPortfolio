import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  liftZ?: number;
  sheenOpacity?: number;
}

export default function TiltCard3D({
  children,
  className = '',
  maxTilt = 7,
  liftZ = 10,
  sheenOpacity = 0.16,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tiltState, setTiltState] = useState({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    sheenX: 50,
    sheenY: 50,
    active: false,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - py) * 2 * maxTilt;

    setTiltState({
      rotateX,
      rotateY,
      translateZ: liftZ,
      sheenX: Math.round(px * 100),
      sheenY: Math.round(py * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTiltState((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      active: false,
    }));
  };

  const transformStyle = reducedMotion
    ? undefined
    : `perspective(1200px) rotateX(${tiltState.rotateX.toFixed(2)}deg) rotateY(${tiltState.rotateY.toFixed(2)}deg) translate3d(0, 0, ${tiltState.translateZ}px)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: tiltState.active
          ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease-out'
          : 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease-out',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: tiltState.active ? sheenOpacity : 0,
            background: `radial-gradient(circle at ${tiltState.sheenX}% ${tiltState.sheenY}%, rgba(255, 255, 255, 0.85), rgba(37, 99, 235, 0.08) 42%, transparent 72%)`,
          }}
        />
      )}
    </div>
  );
}
