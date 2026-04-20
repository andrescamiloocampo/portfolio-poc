// Atomic Typography Components
import React from 'react';

interface TextProps {
  variant?: 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'mono';
  color?: 'primary' | 'secondary' | 'muted' | 'neon-pink' | 'neon-cyan' | 'neon-purple' | 'neon-yellow';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Text({ variant = 'body', color = 'primary', align = 'left', children, className = '', style }: TextProps) {
  const variants: Record<string, React.CSSProperties> = {
    display: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-hero)',
      fontWeight: 'var(--font-weight-black)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: '-0.02em',
    },
    heading: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-4xl)',
      fontWeight: 'var(--font-weight-black)',
      lineHeight: 'var(--leading-tight)',
    },
    subheading: {
      fontFamily: 'var(--font-display-alt)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--font-weight-bold)',
      lineHeight: 'var(--leading-snug)',
    },
    body: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--font-weight-regular)',
      lineHeight: 'var(--leading-relaxed)',
    },
    caption: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--font-weight-regular)',
      lineHeight: 'var(--leading-normal)',
    },
    mono: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--font-weight-regular)',
      letterSpacing: '0.05em',
    },
  };

  const colors: Record<string, React.CSSProperties> = {
    primary: { color: 'var(--color-text-primary)' },
    secondary: { color: 'var(--color-text-secondary)' },
    muted: { color: 'var(--color-text-muted)' },
    'neon-pink': { color: 'var(--color-neon-pink)', textShadow: '0 0 10px var(--color-neon-pink)' },
    'neon-cyan': { color: 'var(--color-neon-cyan)', textShadow: '0 0 10px var(--color-neon-cyan)' },
    'neon-purple': { color: 'var(--color-neon-purple)', textShadow: '0 0 10px var(--color-neon-purple)' },
    'neon-yellow': { color: 'var(--color-neon-yellow)', textShadow: '0 0 10px var(--color-neon-yellow)' },
  };

  const aligns: Record<string, React.CSSProperties> = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
  };

  const combinedStyles: React.CSSProperties = {
    ...variants[variant],
    ...colors[color],
    ...aligns[align],
    ...style,
  };

  return (
    <span style={combinedStyles} className={className}>
      {children}
    </span>
  );
}

interface HeadingProps {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: 'primary' | 'secondary' | 'muted' | 'neon-pink' | 'neon-cyan' | 'neon-purple' | 'neon-yellow';
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, color = 'primary', children, className = '' }: HeadingProps) {
  const colors: Record<string, React.CSSProperties> = {
    primary: { color: 'var(--color-text-primary)' },
    secondary: { color: 'var(--color-text-secondary)' },
    muted: { color: 'var(--color-text-muted)' },
    'neon-pink': { color: 'var(--color-neon-pink)', textShadow: '0 0 20px var(--color-neon-pink)' },
    'neon-cyan': { color: 'var(--color-neon-cyan)', textShadow: '0 0 20px var(--color-neon-cyan)' },
    'neon-purple': { color: 'var(--color-neon-purple)', textShadow: '0 0 20px var(--color-neon-purple)' },
    'neon-yellow': { color: 'var(--color-neon-yellow)', textShadow: '0 0 20px var(--color-neon-yellow)' },
  };

  const sizes: Record<string, string> = {
    h1: 'var(--text-hero)',
    h2: 'var(--text-5xl)',
    h3: 'var(--text-4xl)',
    h4: 'var(--text-3xl)',
    h5: 'var(--text-2xl)',
    h6: 'var(--text-xl)',
  };

  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--font-weight-black)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: '-0.02em',
    ...colors[color],
  };

  if (level === 'h1') return <h1 style={{ ...baseStyle, fontSize: sizes.h1 }} className={className}>{children}</h1>;
  if (level === 'h2') return <h2 style={{ ...baseStyle, fontSize: sizes.h2 }} className={className}>{children}</h2>;
  if (level === 'h3') return <h3 style={{ ...baseStyle, fontSize: sizes.h3 }} className={className}>{children}</h3>;
  if (level === 'h4') return <h4 style={{ ...baseStyle, fontSize: sizes.h4 }} className={className}>{children}</h4>;
  if (level === 'h5') return <h5 style={{ ...baseStyle, fontSize: sizes.h5 }} className={className}>{children}</h5>;
  return <h6 style={{ ...baseStyle, fontSize: sizes.h6 }} className={className}>{children}</h6>;
}

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  children?: React.ReactNode;
}

export function Marquee({ text, speed = 20, direction = 'left', children }: MarqueeProps) {
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-neon-pink)', textShadow: '0 0 20px var(--color-neon-pink)' }}>
          {text} {text} {text} {text}
        </span>
        {children}
      </div>
    </div>
  );
}