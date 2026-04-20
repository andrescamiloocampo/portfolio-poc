// Custom Reactive Cursor Component
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  const position = useStore((state) => state.cursor.position);
  const isHovering = useStore((state) => state.cursor.isHovering);
  const isClicking = useStore((state) => state.cursor.isClicking);
  const hoverTarget = useStore((state) => state.cursor.hoverTarget);
  const setCursorPosition = useStore((state) => state.setCursorPosition);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Direct cursor follow
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      // Delayed follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setCursorPosition]);

  // Hover state animations
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    if (isHovering) {
      // Scale up and color change based on target
      const targetColors: Record<string, string> = {
        button: 'var(--color-neon-pink)',
        card: 'var(--color-neon-cyan)',
        project: 'var(--color-neon-purple)',
        link: 'var(--color-neon-yellow)',
        default: 'var(--color-neon-pink)',
      };
      
      const color = targetColors[hoverTarget || 'default'] || targetColors.default;

      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: color,
        duration: 0.2,
      });

      gsap.to(follower, {
        scale: 2,
        borderColor: color,
        duration: 0.2,
      });
    } else {
      // Reset
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'var(--color-neon-cyan)',
        duration: 0.2,
      });

      gsap.to(follower, {
        scale: 1,
        borderColor: 'var(--color-neon-cyan)',
        duration: 0.2,
      });
    }
  }, [isHovering, hoverTarget]);

  // Click state
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isClicking) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.1,
      });
    }
  }, [isClicking]);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: 'var(--color-neon-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          marginLeft: '-6px',
          marginTop: '-6px',
          boxShadow: '0 0 10px var(--color-neon-cyan), 0 0 20px var(--color-neon-cyan)',
        }}
      />
      
      {/* Cursor Follower Ring */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '2px solid var(--color-neon-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'calc(var(--z-cursor) - 1)',
          marginLeft: '-20px',
          marginTop: '-20px',
          transition: 'border-color 0.2s, transform 0.2s',
        }}
      />
    </>
  );
}