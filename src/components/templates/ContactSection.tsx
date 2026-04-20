// Contact Section Template
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heading, Text } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { useStore } from '../../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const setCursorHovering = useStore((state) => state.setCursorHovering);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll('.contact-content'),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section
      id="contact"
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
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div className="contact-content" style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <Heading level="h2" color="neon-pink">
            GET IN TOUCH
          </Heading>
          <Text
            variant="subheading"
            color="secondary"
            style={{ marginTop: 'var(--space-4)' }}
          >
            Let's create something amazing together
          </Text>
        </div>

        <div className="contact-content">
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--space-12)',
                background: 'var(--color-charcoal)',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--color-neon-green)',
                boxShadow: '0 0 30px var(--color-neon-green)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  color: 'var(--color-neon-green)',
                  textShadow: '0 0 20px var(--color-neon-green)',
                }}
              >
                MESSAGE SENT
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  marginTop: 'var(--space-4)',
                }}
              >
                Thanks for reaching out. I'll get back to you soon!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neon-cyan)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    background: 'var(--color-charcoal)',
                    border: '2px solid var(--color-steel)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    outline: 'none',
                    transition: 'border-color var(--transition-base)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-neon-cyan)';
                    setCursorHovering(true, 'input');
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-steel)';
                    setCursorHovering(false);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neon-cyan)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    background: 'var(--color-charcoal)',
                    border: '2px solid var(--color-steel)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    outline: 'none',
                    transition: 'border-color var(--transition-base)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-neon-cyan)';
                    setCursorHovering(true, 'input');
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-steel)';
                    setCursorHovering(false);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neon-cyan)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    background: 'var(--color-charcoal)',
                    border: '2px solid var(--color-steel)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color var(--transition-base)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-neon-cyan)';
                    setCursorHovering(true, 'input');
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-steel)';
                    setCursorHovering(false);
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                glow
                style={{ width: '100%', marginTop: 'var(--space-4)' }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </Button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div
          className="contact-content"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-6)',
            marginTop: 'var(--space-12)',
          }}
        >
          {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
            <a
              key={social}
              href="#"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                padding: 'var(--space-2) var(--space-4)',
                border: '1px solid var(--color-steel)',
                borderRadius: 'var(--radius-full)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-neon-cyan)';
                e.currentTarget.style.borderColor = 'var(--color-neon-cyan)';
                setCursorHovering(true, 'link');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-steel)';
                setCursorHovering(false);
              }}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}