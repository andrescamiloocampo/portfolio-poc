// About Section Template
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heading, Text } from '../atoms/Typography';
import { useStore } from '../../store/useStore';

const skills = [
  'React / Next.js',
  'Three.js / R3F',
  'GSAP Animations',
  'WebGL',
  'TypeScript',
  'Node.js',
];

const stats = [
  { value: '5+', label: 'Years Exp' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '100%', label: 'Satisfaction' },
];

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCursorHovering = useStore((state) => state.setCursorHovering);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Content reveal
    const content = section.querySelectorAll('.about-content');
    gsap.fromTo(
      content,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: 'var(--space-20) var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
      >
        {/* Left Column - Image/Visual */}
        <div className="about-content" style={{ position: 'relative' }}>
          <div
            style={{
              aspectRatio: '1',
              background: 'linear-gradient(135deg, var(--color-neon-pink), var(--color-neon-purple))',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <div
              style={{
                position: 'absolute',
                inset: '20px',
                border: '2px solid var(--color-void-black)',
                borderRadius: 'var(--radius-lg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '60px',
                height: '60px',
                border: '3px solid var(--color-neon-cyan)',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '15%',
                width: '40px',
                height: '40px',
                background: 'var(--color-neon-yellow)',
                transform: 'rotate(45deg)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                color: 'var(--color-void-black)',
              }}
            >
              AD
            </span>
          </div>
        </div>

        {/* Right Column - Content */}
        <div>
          <div className="about-content">
            <Heading level="h2" color="neon-pink">
              ABOUT ME
            </Heading>
            <Text
              variant="body"
              color="secondary"
              style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}
            >
              I'm a creative developer based in Colombia, specializing in building 
              immersive digital experiences that combine cutting-edge technology with 
              bold visual design. My work lives at the intersection of code and art.
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              With a background in both design and engineering, I approach each project 
              with a holistic perspective - ensuring every pixel serves a purpose and every 
              interaction tells a story.
            </Text>

            {/* Skills */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <Text variant="subheading" color="neon-cyan" style={{ marginBottom: 'var(--space-3)' }}>
                Tech Stack
              </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setCursorHovering(true, 'skill')}
                    onMouseLeave={() => setCursorHovering(false)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--color-charcoal)',
                      border: '1px solid var(--color-steel)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-text-secondary)',
                      cursor: 'none',
                      transition: 'all var(--transition-base)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-4)',
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="about-content"
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-4)',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      color: 'var(--color-neon-cyan)',
                      textShadow: '0 0 20px var(--color-neon-cyan)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}