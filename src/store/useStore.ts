// Zustand Store - Portfolio State Management
import { create } from 'zustand';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  position: CursorPosition;
  isHovering: boolean;
  isClicking: boolean;
  hoverTarget: string | null;
  hoverElement: HTMLElement | null;
}

interface NavigationState {
  currentSection: string;
  isMenuOpen: boolean;
}

interface AnimationState {
  isLoaded: boolean;
  scrollProgress: number;
}

interface AppState {
  cursor: CursorState;
  navigation: NavigationState;
  animation: AnimationState;
  setCursorPosition: (position: CursorPosition) => void;
  setCursorHovering: (isHovering: boolean, hoverTarget?: string | null, hoverElement?: HTMLElement | null) => void;
  setCursorClicking: (isClicking: boolean) => void;
  setCurrentSection: (section: string) => void;
  toggleMenu: (isOpen?: boolean) => void;
  setLoaded: (loaded: boolean) => void;
  setScrollProgress: (progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
    cursor: {
      position: { x: 0, y: 0 },
      isHovering: false,
      isClicking: false,
      hoverTarget: null,
      hoverElement: null,
    },
  navigation: {
    currentSection: 'hero',
    isMenuOpen: false,
  },
  animation: {
    isLoaded: false,
    scrollProgress: 0,
  },
  setCursorPosition: (position) =>
    set((state) => ({ cursor: { ...state.cursor, position } })),
  setCursorHovering: (isHovering, hoverTarget = null, hoverElement = null) =>
    set((state) => ({ cursor: { ...state.cursor, isHovering, hoverTarget, hoverElement } })),
  setCursorClicking: (isClicking) =>
    set((state) => ({ cursor: { ...state.cursor, isClicking } })),
  setCurrentSection: (currentSection) =>
    set((state) => ({ navigation: { ...state.navigation, currentSection } })),
  toggleMenu: (isOpen) =>
    set((state) => ({
      navigation: { ...state.navigation, isMenuOpen: isOpen ?? !state.navigation.isMenuOpen },
    })),
  setLoaded: (isLoaded) =>
    set((state) => ({ animation: { ...state.animation, isLoaded } })),
  setScrollProgress: (scrollProgress) =>
    set((state) => ({ animation: { ...state.animation, scrollProgress } })),
}));

// Selectors for optimized re-renders
export const selectCursorPosition = (state: AppState) => state.cursor.position;
export const selectCursorHovering = (state: AppState) => state.cursor.isHovering;
export const selectCurrentSection = (state: AppState) => state.navigation.currentSection;
export const selectIsMenuOpen = (state: AppState) => state.navigation.isMenuOpen;
export const selectScrollProgress = (state: AppState) => state.animation.scrollProgress;
export const selectIsLoaded = (state: AppState) => state.animation.isLoaded;