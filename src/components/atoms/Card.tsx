// Atomic Card Component
import React from 'react';
import { useStore } from '../../store/useStore';

interface CardProps {
  variant?: 'default' | 'glass' | 'neon';
  glowColor?: 'pink' | 'cyan' | 'purple' | 'yellow';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ variant = 'default', glowColor = 'pink', hoverEffect = true, children, className = '', onClick }: CardProps) {
  const setCursorHovering = useStore((state) => state.setCursorHovering);

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    padding: 'var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-base)',
    cursor: 'none',
  };

  const variants: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--color-charcoal)',
      border: '1px solid var(--color-steel)',
    },
    glass: {
      background: 'rgba(20, 20, 31, 0.8)',
      backdropFilter: 'blur(var(--blur-md))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    neon: {
      background: 'var(--color-charcoal)',
      border: `2px solid var(--color-neon-${glowColor})`,
      boxShadow: `0 0 20px var(--color-neon-${glowColor})`,
    },
  };

  const glowColors: Record<string, string> = {
    pink: 'var(--color-neon-pink)',
    cyan: 'var(--color-neon-cyan)',
    purple: 'var(--color-neon-purple)',
    yellow: 'var(--color-neon-yellow)',
  };

  return (
    <div
      style={{ ...baseStyles, ...variants[variant] }}
      className={className}
      onMouseEnter={() => hoverEffect && setCursorHovering(true, 'card')}
      onMouseLeave={() => hoverEffect && setCursorHovering(false)}
      onClick={onClick}
    >
      {variant === 'neon' && (
        <div
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: 'var(--radius-lg)',
            background: `linear-gradient(45deg, ${glowColors[glowColor]}, transparent, ${glowColors[glowColor]})`,
            zIndex: -1,
            filter: 'blur(10px)',
            opacity: 0.5,
          }}
        />
      )}
      {children}
    </div>
  );
}

// Project Card with Image
interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
}

export function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  const setCursorHovering = useStore((state) => state.setCursorHovering);

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-charcoal)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'all var(--transition-base)',
      }}
      onMouseEnter={() => setCursorHovering(true, 'project')}
      onMouseLeave={() => setCursorHovering(false)}
    >
      {/* Image Container */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: image ? `url(${image}) center/cover` : 'linear-gradient(135deg, var(--color-neon-pink), var(--color-neon-purple))',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--color-void-black), transparent)',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--space-4)' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-graffiti-white)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {description}
        </p>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                padding: '0.25rem 0.5rem',
                background: 'var(--color-steel)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-neon-cyan)',
                border: '1px solid var(--color-neon-cyan)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}