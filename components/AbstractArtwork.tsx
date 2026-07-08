"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function PlanetScene({ pGroupRef }: { pGroupRef: React.RefObject<THREE.Group> }) {
  const pMesh = useRef<THREE.Mesh>(null);
  const asteroidsGroup = useRef<THREE.Group>(null);

  // Generate high-density particle ring positions with vertical thickness
  const ringParticles = useMemo(() => {
    const rpc = 3000;
    const rpp = new Float32Array(rpc * 3);
    for (let i = 0; i < rpc; i++) {
      const a = (i / rpc) * Math.PI * 2;
      const r = 4.6 + Math.random() * 3.0; // Spread across the rings
      const tl = 0.42;
      const hOffset = (Math.random() - 0.5) * 0.15; // Vertical thickness
      rpp[i * 3] = r * Math.cos(a);
      rpp[i * 3 + 1] = r * Math.sin(a) * Math.sin(tl) + hOffset;
      rpp[i * 3 + 2] = r * Math.sin(a) * Math.cos(tl) + hOffset;
    }
    return rpp;
  }, []);

  // Generate realistic rocky asteroids
  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      const r = 10 + Math.random() * 25;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.random() * Math.PI;
      arr.push({
        position: [
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph)
        ] as [number, number, number],
        size: 0.05 + Math.random() * 0.15,
        floatSpeed: 0.5 + Math.random() * 1.5,
        rotIntensity: Math.random() * 2,
        floatIntensity: Math.random() * 2,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (pMesh.current) pMesh.current.rotation.y += 0.0014;
    if (pGroupRef.current) pGroupRef.current.rotation.y += 0.0007;
    if (asteroidsGroup.current) {
      asteroidsGroup.current.children.forEach((child, i) => {
        child.rotateOnAxis(asteroids[i].axis, 0.005);
      });
    }
  });

  return (
    <>
      {/* High-fidelity Lighting Setup */}
      <directionalLight position={[15, 5, 10]} intensity={3.5} color={0xaaccff} castShadow />
      <ambientLight color={0x0a0a30} intensity={1.5} />
      <pointLight position={[-12, 8, -5]} intensity={2.0} distance={100} color={0x4466ff} />
      
      {/* PBR Environment for realistic reflections */}
      <Environment preset="city" />

      {/* Main Planet Group */}
      <group ref={pGroupRef}>
        {/* Planet Core - Realistic PBR Material */}
        <mesh ref={pMesh}>
          <sphereGeometry args={[3.5, 128, 128]} />
          <meshPhysicalMaterial 
            color={0x081640} 
            emissive={0x020411}
            roughness={0.6} 
            metalness={0.4} 
            clearcoat={0.3}
            clearcoatRoughness={0.6}
          />
        </mesh>

        {/* Realistic Volumetric Atmosphere Glows using Additive Blending */}
        <mesh>
          <sphereGeometry args={[3.6, 64, 64]} />
          <meshStandardMaterial color={0x2a5add} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[3.8, 64, 64]} />
          <meshStandardMaterial color={0x1133aa} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[4.2, 64, 64]} />
          <meshStandardMaterial color={0x051155} transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        {/* Realistic Solid Rings */}
        {[
          { ir: 4.7, or: 5.9, color: 0x8aa5d0, op: 0.35 },
          { ir: 6.1, or: 6.9, color: 0x6a8ab0, op: 0.25 },
          { ir: 7.1, or: 7.4, color: 0x4a6a90, op: 0.15 },
        ].map((ring, i) => (
          <mesh key={i} rotation={[Math.PI * 0.42, 0, 0.2]}>
            <ringGeometry args={[ring.ir, ring.or, 256]} />
            <meshPhysicalMaterial color={ring.color} side={THREE.DoubleSide} transparent opacity={ring.op} roughness={0.8} metalness={0.2} />
          </mesh>
        ))}

        {/* High-density Dust Particle Ring */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={3000} array={ringParticles} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color={0x88bbff} size={0.03} transparent opacity={0.8} sizeAttenuation={true} blending={THREE.AdditiveBlending} />
        </points>
      </group>

      {/* Realistic Floating Asteroids */}
      <group ref={asteroidsGroup}>
        {asteroids.map((ast, i) => (
          <Float key={i} speed={ast.floatSpeed} rotationIntensity={ast.rotIntensity} floatIntensity={ast.floatIntensity}>
            <mesh position={ast.position}>
              <dodecahedronGeometry args={[ast.size, 1]} />
              <meshPhysicalMaterial color={0x2a3a5a} roughness={0.9} metalness={0.4} />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}

function ScrollAndMouseController({ pGroup }: { pGroup: React.RefObject<THREE.Group> }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      // Note: original HTML has positive Y downward, but R3F uses positive Y upward. 
      // We will match the original behavior precisely.
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Replicate original mouse tracking
    const targetX = mouse.current.x * 0.7;
    const targetY = mouse.current.y * 0.7;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);

    // Replicate original scroll logic but normalize it to the page height
    // so it doesn't sink off the bottom of long pages.
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Scale scroll progress so it moves from 0 to 2 over the entire page length
    const sf = scrollProgress * 2;
    
    if (pGroup.current) {
      // Offset planet to the right on desktop, center on mobile
      const isDesktop = window.innerWidth > 1024;
      const baseX = isDesktop ? 4.5 : 0;

      // Move planet down and to the right on scroll
      pGroup.current.position.y = -sf * 4;
      pGroup.current.position.x = baseX + (sf * 2);
      
      // Zoom out on scroll to shrink the size
      const targetZ = 14 + sf * 6;
      state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    }
  });
  return null;
}

export default function AbstractArtwork() {
  const pGroupRef = useRef<THREE.Group>(null);
  
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 14], fov: 60 }} gl={{ alpha: true }}>
        <PlanetScene pGroupRef={pGroupRef} />
        <ScrollAndMouseController pGroup={pGroupRef} />
      </Canvas>
    </div>
  );
}
