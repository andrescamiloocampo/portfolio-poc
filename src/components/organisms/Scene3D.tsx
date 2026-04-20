// Three.js 3D Scene - Fixed and Working
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ 
  position, 
  color, 
  speed = 1,
  size = 0.3 
}: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.02;
    meshRef.current.rotation.y += speed * 0.03;
  });
  
  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Float>
  );
}

function SimpleShape({ 
  position, 
  color = '#ff2a6d',
  type = 'box'
}: { 
  position: [number, number, number]; 
  color?: string;
  type?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.02;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      {type === 'box' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
      {type === 'tetra' && <tetrahedronGeometry args={[0.4]} />}
      {type === 'octa' && <octahedronGeometry args={[0.4]} />}
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      {/* Luz ambiental para visibilidad */}
      <ambientLight intensity={1} />
      
      {/* Esferas básicas con colores sólidos - muy visibles */}
      <FloatingSphere position={[-1.5, 0, 0]} color="#ff2a6d" speed={1} size={0.3} />
      <FloatingSphere position={[1.5, 0.5, 0]} color="#05d9e8" speed={1.2} size={0.25} />
      <FloatingSphere position={[0, -1, -0.5]} color="#d300c5" speed={0.8} size={0.2} />
      <FloatingSphere position={[-1, 1.5, -0.8]} color="#39ff14" speed={1.5} size={0.18} />
      <FloatingSphere position={[1, -1.5, -0.8]} color="#8b5cf6" speed={1.1} size={0.22} />
      
      {/* Formas wireframe */}
      <SimpleShape position={[-2.5, -1, -1]} color="#ff2a6d" type="box" />
      <SimpleShape position={[2.5, 1.5, -1]} color="#05d9e8" type="tetra" />
      <SimpleShape position={[0, 2, -1.2]} color="#d300c5" type="octa" />
    </>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#05d9e8" wireframe />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ display: 'block' }}
      >
        <Suspense fallback={<Loader />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}