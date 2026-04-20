// Custom Hooks - Animations and Parallax
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(options?: {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaults = {
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1 },
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
    };

    const config = { ...defaults, ...options };

    gsap.fromTo(element, config.from, {
      ...config.to,
      scrollTrigger: {
        trigger: element,
        start: config.start,
        end: config.end,
        scrub: config.scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// Hook for entry animations
export function useEntryAnimation(delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const setLoaded = useStore((state) => state.setLoaded);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const timeline = gsap.timeline({
      onComplete: () => setLoaded(true),
    });

    timeline.fromTo(
      element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );

    return () => {
      timeline.kill();
    };
  }, [delay, setLoaded]);

  return ref;
}

// Hook for track scroll progress
export function useScrollProgress() {
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollProgress]);
}

// Hook for section visibility tracking
export function useSectionTracking(sectionId: string) {
  const setCurrentSection = useStore((state) => state.setCurrentSection);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection(sectionId),
      onEnterBack: () => setCurrentSection(sectionId),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sectionId, setCurrentSection]);
}

// Hook for staggered animations
export function useStaggeredAnimation(options?: {
  items?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll(options?.items || '*');
    if (!items.length) return;

    gsap.fromTo(
      items,
      options?.from || { y: 30, opacity: 0 },
      {
        ...(options?.to || { y: 0, opacity: 1 }),
        stagger: options?.stagger || 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

// Hook for 3D scene scroll effect
export function use3DScrollEffect(cameraRef: React.RefObject<THREE.Camera | null>) {
  useEffect(() => {
    if (!cameraRef.current) return;

    gsap.to(cameraRef.current.position, {
      y: 5,
      z: 3,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cameraRef]);
}

// Utility: Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Utility: Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}