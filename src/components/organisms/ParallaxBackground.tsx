// Advanced Parallax Background - More visible
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parallax layer with configurable depth
interface ParallaxLayer {
  depth: number;
  speed?: number;
  children: React.ReactNode;
}

function ParallaxLayer({ depth, speed = 1, children }: ParallaxLayer) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * depth * speed * 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, [depth, speed]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Floating glow with enhanced visibility
function FloatingGlow({ 
  initialX, 
  initialY, 
  width, 
  color, 
  blur = 50,
  depth = 0,
  animationDelay = 0 
}: { 
  initialX: string; 
  initialY: string; 
  width: string; 
  color: string; 
  blur?: number;
  depth?: number;
  animationDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(element, 
      { y: 0 },
      {
        y: depth * 80,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );
  }, [depth]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: initialX,
        top: initialY,
        width,
        height: width,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        animation: `float-glow 6s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
      }}
    />
  );
}

// Animated grid
function AnimatedGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      backgroundPosition: '50px 50px',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(5, 217, 232, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(5, 217, 232, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
}

// Main parallax background
export default function ParallaxBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        overflow: 'hidden',
        // Gradient base - more visible
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(211, 0, 197, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(255, 42, 109, 0.2) 0%, transparent 45%),
          radial-gradient(ellipse at 60% 70%, rgba(5, 217, 232, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 90%, rgba(57, 255, 20, 0.1) 0%, transparent 40%),
          radial-gradient(ellipse at 10% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
          #020408
        `,
        backgroundColor: '#020408',
      }}
    >
      {/* Grid overlay */}
      <ParallaxLayer depth={0.05} speed={0.3}>
        <AnimatedGrid />
      </ParallaxLayer>

      {/* Multiple floating glow spots - More visible and colorful */}
      <ParallaxLayer depth={0.1} speed={0.5}>
        <FloatingGlow
          initialX="5%"
          initialY="10%"
          width="600px"
          color="rgba(255, 42, 109, 0.3)"
          blur={60}
          depth={0.1}
          animationDelay={0}
        />
      </ParallaxLayer>

      <ParallaxLayer depth={0.15} speed={0.7}>
        <FloatingGlow
          initialX="55%"
          initialY="45%"
          width="500px"
          color="rgba(5, 217, 232, 0.25)"
          blur={50}
          depth={0.15}
          animationDelay={1}
        />
      </ParallaxLayer>

      <ParallaxLayer depth={0.08} speed={0.4}>
        <FloatingGlow
          initialX="25%"
          initialY="60%"
          width="450px"
          color="rgba(211, 0, 197, 0.25)"
          blur={45}
          depth={0.08}
          animationDelay={2}
        />
      </ParallaxLayer>

      <ParallaxLayer depth={0.12} speed={0.6}>
        <FloatingGlow
          initialX="65%"
          initialY="15%"
          width="400px"
          color="rgba(57, 255, 20, 0.2)"
          blur={40}
          depth={0.12}
          animationDelay={1.5}
        />
      </ParallaxLayer>

      <ParallaxLayer depth={0.2} speed={1}>
        <FloatingGlow
          initialX="5%"
          initialY="65%"
          width="350px"
          color="rgba(139, 92, 246, 0.22)"
          blur={35}
          depth={0.2}
          animationDelay={0.5}
        />
      </ParallaxLayer>

      {/* Additional accent glow */}
      <ParallaxLayer depth={0.18} speed={0.9}>
        <FloatingGlow
          initialX="75%"
          initialY="70%"
          width="300px"
          color="rgba(255, 42, 109, 0.18)"
          blur={30}
          depth={0.18}
          animationDelay={2.5}
        />
      </ParallaxLayer>

      {/* Noise texture */}
      <ParallaxLayer depth={0.3} speed={1.2}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />
      </ParallaxLayer>

      <style>{`
        @keyframes float-glow {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
          50% { 
            opacity: 0.75; 
            transform: scale(1.1) translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}