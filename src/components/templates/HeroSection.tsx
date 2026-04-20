// Hero Section Template
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import { Heading, Text } from '../atoms/Typography';
import { Button } from '../atoms/Button';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const setLoaded = useStore((state) => state.setLoaded);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    
    if (!container || !title || !subtitle || !cta) return;

    const timeline = gsap.timeline({
      onComplete: () => setLoaded(true),
    });

    // Initial state
    gsap.set([title, subtitle, cta], { opacity: 0, y: 50 });

    // Animations
    timeline
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        cta,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    return () => {
      timeline.kill();
    };
  }, [setLoaded]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--space-8)',
        position: 'relative',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(255, 42, 109, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Main Title */}
      <Heading level="h1" color="primary">
        <span
          ref={titleRef}
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            color: 'var(--color-graffiti-white)',
            textShadow: '0 0 40px var(--color-neon-pink), 0 0 80px var(--color-neon-pink)',
            marginBottom: 'var(--space-4)',
          }}
        >
          CREATIVE
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            background: 'linear-gradient(90deg, var(--color-neon-pink), var(--color-neon-purple), var(--color-neon-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          DEVELOPER
        </span>
      </Heading>

      {/* Subtitle */}
      <Text
        variant="subheading"
        color="secondary"
        align="center"
        style={{
          maxWidth: '600px',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <span ref={subtitleRef}>
          Building immersive digital experiences that blend technology with urban art aesthetics
        </span>
      </Text>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button variant="primary" size="lg" glow>
          VIEW WORK
        </Button>
        <Button variant="outline" size="lg">
          CONTACT ME
        </Button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neon-cyan)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-neon-cyan), transparent)',
            animation: 'scroll-indicator 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scroll-indicator {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.5; transform: scaleY(0.5); }
        }
      `}</style>
    </section>
  );
}