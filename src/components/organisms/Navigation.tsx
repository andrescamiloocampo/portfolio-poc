// Organic Navigation - No header, floating navigation dots
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMenuOpen = useStore((state) => state.navigation.isMenuOpen);
  const toggleMenu = useStore((state) => state.toggleMenu);
  const setCursorHovering = useStore((state) => state.setCursorHovering);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll detection and section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Track active section
    const sections = navLinks.map(link => link.href.slice(1));
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate nav on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        delay: 0.5 
      }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  };

  return (
    <>
      {/* Floating Navigation - Desktop */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: '50%',
          right: '24px',
          transform: 'translateY(-50%)',
          zIndex: 'var(--z-sticky)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-3)',
          background: isScrolled ? 'rgba(10, 10, 15, 0.85)' : 'rgba(10, 10, 15, 0.5)',
          backdropFilter: 'blur(var(--blur-md))',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(5, 217, 232, 0.15)',
          transition: 'all var(--transition-base)',
        }}
        className="nav-floating"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => setCursorHovering(true, 'link')}
              onMouseLeave={() => setCursorHovering(false)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              title={link.label}
            >
              {/* Dot indicator */}
              <span
                style={{
                  width: isActive ? '10px' : '6px',
                  height: isActive ? '10px' : '6px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--color-neon-cyan)' : 'rgba(139, 148, 158, 0.5)',
                  boxShadow: isActive ? '0 0 10px var(--color-neon-cyan)' : 'none',
                  transition: 'all var(--transition-base)',
                }}
              />
              {/* Hover label */}
              <span
                className="nav-tooltip"
                style={{
                  position: 'absolute',
                  right: '100%',
                  marginRight: '12px',
                  padding: '4px 12px',
                  background: 'rgba(10, 10, 15, 0.95)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  color: isActive ? 'var(--color-neon-cyan)' : 'var(--color-graffiti-white)',
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  transform: 'translateX(10px)',
                  pointerEvents: 'none',
                  transition: 'all var(--transition-base)',
                }}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Navigation - Bottom bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-sticky)',
          display: 'none',
          justifyContent: 'space-around',
          padding: 'var(--space-3) var(--space-4)',
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(var(--blur-lg))',
          borderTop: '1px solid rgba(5, 217, 232, 0.15)',
        }}
        className="nav-mobile-bar"
      >
        {navLinks.slice(0, 4).map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--color-neon-cyan)' : 'rgba(139, 148, 158, 0.5)',
                  transition: 'all var(--transition-base)',
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  color: isActive ? 'var(--color-neon-cyan)' : 'var(--color-mist)',
                }}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => toggleMenu()}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 'var(--z-sticky)',
          display: 'none',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-neon-pink), var(--color-neon-magenta))',
          border: 'none',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(255, 42, 109, 0.4)',
        }}
        className="nav-mobile-fab"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-overlay)',
          background: 'rgba(2, 4, 8, 0.98)',
          backdropFilter: 'blur(var(--blur-xl))',
          display: isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-6)',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity var(--transition-base)',
        }}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: activeSection === link.href.slice(1) 
                ? 'var(--color-neon-cyan)' 
                : 'var(--color-graffiti-white)',
              textDecoration: 'none',
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all var(--transition-base)',
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => toggleMenu()}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon-cyan)" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        /* Desktop nav hover */
        .nav-floating a:hover .nav-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        
        /* Hide desktop nav on mobile */
        @media (max-width: 768px) {
          .nav-floating { display: none !important; }
          .nav-mobile-bar { display: flex !important; }
          .nav-mobile-fab { display: flex !important; }
        }
      `}</style>
    </>
  );
}