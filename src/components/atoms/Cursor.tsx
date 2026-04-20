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
  const hoverElement = useStore((state) => state.cursor.hoverElement);
  const setCursorPosition = useStore((state) => state.setCursorPosition);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Direct cursor follow - always active
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      // Delayed follower - ONLY active when NOT hovering
      if (!isHovering) {
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setCursorPosition, isHovering]);

  // Hover state animations (The Morphing Effect)
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    if (isHovering && hoverElement) {
      const rect = hoverElement.getBoundingClientRect();
      const padding = 8;
      
      const targetColors: Record<string, string> = {
        button: 'var(--color-neon-pink)',
        card: 'var(--color-neon-cyan)',
        project: 'var(--color-neon-purple)',
        link: 'var(--color-neon-yellow)',
        default: 'var(--color-neon-pink)',
      };
      
      const color = targetColors[hoverTarget || 'default'] || targetColors.default;

      // Main cursor morph
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: color,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Follower morph to enclose element
      gsap.to(follower, {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        borderRadius: getComputedStyle(hoverElement).borderRadius || '12px',
        borderColor: color,
        duration: 0.4,
        ease: 'elastic.out(1, 0.8)',
        marginLeft: 0,
        marginTop: 0,
      });
    } else {
      // Reset to circle
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'var(--color-neon-cyan)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(follower, {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        borderColor: 'var(--color-neon-cyan)',
        duration: 0.3,
        ease: 'power2.out',
        marginLeft: '-20px',
        marginTop: '-20px',
      });
    }
  }, [isHovering, hoverTarget, hoverElement]);

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
          willChange: 'transform, width, height, border-radius',
        }}
      />
    </>
  );
}
