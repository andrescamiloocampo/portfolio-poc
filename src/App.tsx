// ARTISTIC LANDING PAGE - Enhanced with Particles, Parallax & GSAP Animations
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/atoms/Cursor';
import { Navigation } from './components/organisms/Navigation';
import Scene3D from './components/organisms/Scene3D';
import ParallaxBackground from './components/organisms/ParallaxBackground';
import './styles/variables.css';
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // GSAP Entry Animations
  useEffect(() => {
    // Hero animation
    const heroElements = heroRef.current?.querySelectorAll('.animate-in');
    if (heroElements) {
      gsap.fromTo(heroElements, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.3 
        }
      );
    }

    // Section animations with ScrollTrigger
    const sections = [
      { ref: servicesRef, from: { y: 80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8 } },
      { ref: workRef, from: { y: 80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8 } },
      { ref: aboutRef, from: { y: 80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8 } },
      { ref: contactRef, from: { y: 80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 0.8 } },
    ];

    sections.forEach(({ ref, from, to }) => {
      const section = ref.current;
      if (!section) return;
      
      gsap.fromTo(section, from, {
        ...to,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* 3D Scene Background */}
      <div className="scene-container">
        <Scene3D />
      </div>
      
      {/* Glow overlays */}
      <div className="glow-overlay glow-1" />
      <div className="glow-overlay glow-2" />
      <div className="glow-overlay glow-3" />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Organic Navigation */}
      <Navigation />

      {/* Hero */}
      <section id="hero" ref={heroRef} className="hero">
        <div className="hero-badge animate-in">
          <span className="badge-dot" />
          <span>Available for work</span>
        </div>

        <h1 className="hero-title animate-in">
          <span>Creative</span>
          <span>Developer</span>
        </h1>

        <p className="hero-subtitle animate-in">
          Crafting immersive digital experiences that blur the line between 
          <span className="highlight">art</span> and <span className="highlight">technology</span>
        </p>

        <div className="hero-cta animate-in">
          <a href="#contact" className="cta-primary">
            <span>Let&apos;s talk</span>
          </a>
          <a href="#work" className="cta-secondary">
            View work
          </a>
        </div>

        <div className="hero-stats animate-in">
          <div className="stat">
            <span className="stat-value">5+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servicesRef} className="services">
        <span className="section-label">What I do</span>
        <h2 className="section-title">Services</h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Web Development</h3>
            <p>Building high-performance websites with modern frameworks.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h3>3D Experiences</h3>
            <p>Creating immersive WebGL and Three.js experiences.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <h3>Creative Direction</h3>
            <p>Transforming ideas into visual narratives.</p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" ref={workRef} className="work-section">
        <span className="section-label">Selected work</span>
        <h2 className="section-title">Featured</h2>

        <div className="projects-grid">
          <a href="#" className="project-card project-large">
            <div className="project-bg gradient-1" />
            <div className="project-info">
              <span className="project-category">Web App</span>
              <h3>Cyber Nexus</h3>
              <p>Immersive 3D experience</p>
            </div>
          </a>

          <a href="#" className="project-card">
            <div className="project-bg gradient-2" />
            <div className="project-info">
              <span className="project-category">E-commerce</span>
              <h3>Neon Dreams</h3>
            </div>
          </a>

          <a href="#" className="project-card">
            <div className="project-bg gradient-3" />
            <div className="project-info">
              <span className="project-category">Web App</span>
              <h3>Urban Pulse</h3>
            </div>
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="about-section">
        <span className="section-label">About me</span>
        <h2 className="section-title">Based in Colombia, working globally</h2>
        
        <div className="about-content">
          <p>I'm a creative developer specializing in immersive digital experiences.</p>
          <p>With expertise in React, Three.js, WebGL, and GSAP, I create websites that feel.</p>
          <div className="tech-tags">
            <span>React</span>
            <span>Three.js</span>
            <span>GSAP</span>
            <span>WebGL</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="contact-section">
        <span className="section-label">Get in touch</span>
        <h2 className="contact-title">Let&apos;s create together</h2>
        <p className="contact-subtitle">Open for projects and collaborations</p>
        
        <a href="mailto:hello@example.com" className="contact-email">
          hello@example.com
        </a>
        
        <div className="social-links">
          <a href="#">GitHub</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        <span>Andres</span>
        <span>2024</span>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-page {
          width: 100%;
          position: relative;
          overflow-x: hidden;
          background: #020408;
        }

        /* Scene Container */
        .scene-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }
        
        /* Glow Overlays */
        .glow-overlay {
          position: fixed;
          z-index: 2;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .glow-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 42, 109, 0.15) 0%, transparent 70%);
          top: 10%;
          left: 5%;
          filter: blur(60px);
          animation: pulse-1 4s ease-in-out infinite;
        }
        
        .glow-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(5, 217, 232, 0.12) 0%, transparent 70%);
          top: 40%;
          right: 10%;
          filter: blur(50px);
          animation: pulse-2 5s ease-in-out infinite 1s;
        }
        
        .glow-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(211, 0, 197, 0.1) 0%, transparent 70%);
          bottom: 20%;
          left: 30%;
          filter: blur(40px);
          animation: pulse-3 6s ease-in-out infinite 2s;
        }
        
        @keyframes pulse-1 {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes pulse-2 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        
        @keyframes pulse-3 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          z-index: 10;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          background: rgba(5, 217, 232, 0.1);
          border: 1px solid #05d9e8;
          border-radius: 50px;
          font-size: 13px;
          color: #05d9e8;
          margin-bottom: 40px;
        }

        .badge-dot {
          width: 8px; 
          height: 8px;
          background: #39ff14;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          font-family: var(--font-display);
          font-weight: 800;
          margin-bottom: 32px;
        }

        .hero-title span:first-child {
          font-size: clamp(40px, 10vw, 100px);
          color: #f0f6fc;
        }

        .hero-title span:last-child {
          font-size: clamp(40px, 10vw, 100px);
          color: transparent;
          -webkit-text-stroke: 1.5px #05d9e8;
        }

        .hero-subtitle {
          font-size: clamp(14px, 2vw, 18px);
          color: #8b949e;
          max-width: 500px;
          margin-bottom: 40px;
        }

        .highlight { color: #05d9e8; }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta-primary {
          padding: 14px 28px;
          background: #f0f6fc;
          color: #020408;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(240, 246, 252, 0.2);
        }

        .cta-secondary {
          padding: 14px 28px;
          background: transparent;
          color: #f0f6fc;
          border: 1px solid #30363d;
          border-radius: 50px;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .cta-secondary:hover {
          border-color: #05d9e8;
          color: #05d9e8;
        }

        .hero-stats { display: flex; gap: 40px; }
        .stat-value { display: block; font-size: clamp(28px, 5vw, 48px); color: #ff2a6d; font-family: var(--font-display); font-weight: 700; }
        .stat-label { font-size: 12px; color: #8b949e; text-transform: uppercase; }

        /* SECTIONS */
        .services, .work-section, .about-section, .contact-section {
          padding: 100px 24px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .section-label { display: block; font-size: 13px; color: #05d9e8; text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-family: var(--font-display); font-size: clamp(32px, 6vw, 56px); font-weight: 700; margin-bottom: 50px; max-width: 600px; margin-left: auto; margin-right: auto; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .service-card {
          padding: 28px;
          background: rgba(10, 11, 20, 0.8);
          backdrop-filter: blur(var(--blur-md));
          border: 1px solid rgba(33, 38, 45, 0.5);
          border-radius: 12px;
          transition: all var(--transition-base);
        }

        .service-card:hover {
          border-color: rgba(5, 217, 232, 0.3);
          transform: translateY(-4px);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 217, 232, 0.1);
          border-radius: 10px;
          color: #05d9e8;
          margin-bottom: 20px;
        }

        .service-card h3 { font-size: 20px; margin-bottom: 10px; color: #f0f6fc; }
        .service-card p { font-size: 14px; color: #8b949e; }

        /* PROJECTS */
        .projects-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 280px 280px;
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto 30px;
        }

        .project-card {
          position: relative;
          background: #0a0b14;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .project-card:hover {
          transform: scale(1.02);
        }

        .project-large { grid-row: span 2; }

        .project-bg {
          position: absolute;
          inset: 0;
          transition: transform var(--transition-slower);
        }

        .project-card:hover .project-bg {
          transform: scale(1.1);
        }

        .gradient-1 { background: linear-gradient(135deg, #ff2a6d, #d300c5); }
        .gradient-2 { background: linear-gradient(135deg, #05d9e8, #00a8ff); }
        .gradient-3 { background: linear-gradient(135deg, #8b5cf6, #d300c5); }

        .project-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, #020408, transparent);
        }

        .project-category { font-size: 11px; color: #8b949e; text-transform: uppercase; }
        .project-card h3 { font-size: 20px; margin: 6px 0; color: #f0f6fc; }
        .project-info p { font-size: 13px; color: #8b949e; }

        /* ABOUT */
        .about-content { max-width: 600px; margin: 0 auto; text-align: center; }
        .about-content p { font-size: 16px; color: #c9d1d9; line-height: 1.7; margin-bottom: 20px; }

        .tech-tags { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .tech-tags span { padding: 6px 16px; background: #21262d; border-radius: 50px; font-size: 12px; color: #8b949e; transition: all var(--transition-base); }
        .tech-tags span:hover { background: #05d9e8; color: #020408; }

        /* CONTACT */
        .contact-section { text-align: center; }
        .contact-title { font-size: clamp(32px, 8vw, 80px); font-weight: 800; line-height: 1; margin-bottom: 20px; color: #f0f6fc; max-width: 700px; margin-left: auto; margin-right: auto; }
        .contact-subtitle { font-size: 16px; color: #8b949e; margin-bottom: 30px; }
        .contact-email { font-size: clamp(20px, 3vw, 32px); color: #05d9e8; text-decoration: none; transition: all var(--transition-base); }
        .contact-email:hover { text-shadow: 0 0 20px rgba(5, 217, 232, 0.5); }
        
        .social-links { display: flex; gap: 24px; justify-content: center; margin-top: 30px; }
        .social-links a { font-size: 12px; color: #8b949e; text-transform: uppercase; text-decoration: none; transition: all var(--transition-base); }
        .social-links a:hover { color: #05d9e8; }

        /* FOOTER */
        .footer { padding: 24px; display: flex; justify-content: space-between; border-top: 1px solid #21262d; position: relative; z-index: 1; }
        .footer span:first-child { font-size: 18px; }
        .footer span:last-child { font-size: 12px; color: #8b949e; }

        @media (max-width: 800px) {
          .services-grid, .projects-grid { grid-template-columns: 1fr; }
          .project-large { grid-row: span 1; min-height: 220px; }
        }
      `}</style>
    </div>
  );
}