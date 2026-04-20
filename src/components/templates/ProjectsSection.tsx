// Projects Section Template
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heading } from '../atoms/Typography';
import { ProjectCard } from '../atoms/Card';

const projects = [
  {
    id: 1,
    title: 'CYBER NEXUS',
    description: 'Immersive 3D web experience with WebGL, GSAP animations, and interactive elements.',
    tags: ['React', 'Three.js', 'GSAP', 'WebGL'],
  },
  {
    id: 2,
    title: 'GRAFFITI VAULT',
    description: 'Digital art gallery featuring urban artists with immersive storytelling.',
    tags: ['Next.js', 'Framer Motion', 'WebGL'],
  },
  {
    id: 3,
    title: 'NEON DREAMS',
    description: 'E-commerce platform with cyberpunk aesthetics and 3D product showcases.',
    tags: ['React', 'Stripe', 'Three.js'],
  },
  {
    id: 4,
    title: 'URBAN PULSE',
    description: 'Music streaming platform with visualizer and spatial audio experience.',
    tags: ['React', 'Web Audio API', 'Canvas'],
  },
  {
    id: 5,
    title: 'DIGITAL CANVAS',
    description: 'Interactive art tool for creating digital graffiti in-browser.',
    tags: ['Canvas', 'WebGL', 'React'],
  },
  {
    id: 6,
    title: 'NIGHT CITY',
    description: 'Full-stack application simulating a cyberpunk city with NFT marketplace.',
    tags: ['Solidity', 'Web3.js', 'React'],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    
    if (!section || !title || !grid) return;

    // Title animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
      }
    );

    // Cards staggered animation
    const cards = grid.querySelectorAll('.project-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: 'var(--space-20) var(--space-6)',
        position: 'relative',
      }}
    >
      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <Heading level="h2" color="neon-pink">
          <span ref={titleRef}>SELECTED WORK</span>
        </Heading>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--space-4)',
          }}
        >
          Projects that define my creative journey
        </p>
      </div>

      {/* Projects Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
          maxWidth: 'var(--container-xl)',
          margin: '0 auto',
        }}
      >
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
}