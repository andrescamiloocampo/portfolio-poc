// Atomic Button Component
import React, { forwardRef } from 'react';
import { useStore } from '../../store/useStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', glow = false, children, className = '', ...props }, ref) => {
    const setCursorHovering = useStore((state) => state.setCursorHovering);
    const setCursorClicking = useStore((state) => state.setCursorClicking);

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-weight-black)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      border: 'none',
      cursor: 'none',
      transition: 'all var(--transition-base)',
      position: 'relative',
      overflow: 'hidden',
    };

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--color-neon-pink)',
        color: 'var(--color-void-black)',
      },
      secondary: {
        background: 'var(--color-neon-cyan)',
        color: 'var(--color-void-black)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-neon-cyan)',
        border: '2px solid var(--color-neon-cyan)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--color-graffiti-white)',
      },
    };

    const sizes: Record<string, React.CSSProperties> = {
      sm: {
        padding: '0.5rem 1rem',
        fontSize: 'var(--text-sm)',
      },
      md: {
        padding: '0.75rem 1.5rem',
        fontSize: 'var(--text-base)',
      },
      lg: {
        padding: '1rem 2rem',
        fontSize: 'var(--text-lg)',
      },
    };

    return (
      <button
        ref={ref}
        style={{ ...baseStyles, ...variants[variant], ...sizes[size] }}
        className={className}
        onMouseEnter={() => setCursorHovering(true, 'button')}
        onMouseLeave={() => setCursorHovering(false)}
        onMouseDown={() => setCursorClicking(true)}
        onMouseUp={() => setCursorClicking(false)}
        {...props}
      >
        {glow && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--shadow-glow-pink)',
              filter: 'blur(20px)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
        )}
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';