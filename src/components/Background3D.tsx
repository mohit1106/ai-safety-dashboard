// src/components/Background3D.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Shield model component
const ShieldModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  // Create a simple shield model
  return (
    <mesh
      ref={mesh}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      scale={scale}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#4B88F0" 
        metalness={0.7}
        roughness={0.2}
        emissive="#2563eb"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Lock model component
const LockModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  // Create a simple lock model
  return (
    <group
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      scale={scale}
    >
      <mesh ref={mesh}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial 
          color="#f97316" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.4]} />
        <meshStandardMaterial 
          color="#f97316" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// Alert model component
const AlertModel = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.008;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Create a simple alert model
  return (
    <mesh
      ref={mesh}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={hover ? "#f97316" : "#ef4444"} 
        metalness={0.5}
        roughness={0.3}
        emissive={hover ? "#f97316" : "#ef4444"}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// src/components/Background3D.tsx (continued)
const Particles = ({ count = 20 }) => {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const [dummy] = useState(() => new THREE.Object3D());
  
    useFrame((state) => {
      if (mesh.current) {
        for (let i = 0; i < count; i++) {
          const t = state.clock.elapsedTime + i * 100;
          
          // Calculate position
          const x = Math.sin(t * 0.1) * 10;
          const y = Math.cos(t * 0.2) * 5;
          const z = Math.sin(t * 0.1 + i) * 10;
          
          dummy.position.set(x, y, z);
          dummy.rotation.set(t * 0.01, t * 0.01, t * 0.01);
          const scale = 0.1 + Math.sin(t * 0.3) * 0.05;
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          
          mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
      }
    });
  
    return (
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </instancedMesh>
    );
  };
  
  // Scene component
  const Scene = () => {
    return (
      <>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ShieldModel position={[-5, 0, -5]} scale={1.5} />
        <LockModel position={[5, 0, -3]} scale={1.2} />
        <AlertModel position={[0, 0, -8]} scale={1} />
        <Particles count={50} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Environment preset="city" />
      </>
    );
  };
  
  // Main Background3D component
  const Background3D: React.FC = () => {
    return (
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
    );
  };
  
  export default Background3D;