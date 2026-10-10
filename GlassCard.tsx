import { useCallback, useRef, useState } from 'react';

/**
 * Hook that gives any element a smooth 3D tilt effect following the mouse.
 * Returns a ref to attach and the live transform style.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 8) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;

      setTransform(
        `perspective(1000px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) scale(1.02)`
      );
      setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)');
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return {
    ref,
    transform,
    glowPos,
    handleMouseMove,
    handleMouseLeave,
  };
}

/**
 * Glass card with 3D mouse-tracking tilt and a radial glow that follows the cursor.
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  tiltAmount = 6,
  glow = true,
  onClick,
}: GlassCardProps) {
  const { ref, transform, glowPos, handleMouseMove, handleMouseLeave } =
    useTilt<HTMLDivElement>(tiltAmount);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass glass-hover rounded-2xl ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
        willChange: 'transform',
      }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,175,55,0.08), transparent 40%)`,
          }}
          onMouseEnter={() => {}}
        />
      )}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
