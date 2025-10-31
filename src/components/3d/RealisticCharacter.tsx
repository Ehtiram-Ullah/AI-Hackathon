// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Float } from '@react-three/drei';
// import * as THREE from 'three';

// export default function RealisticCharacter() {
//   const groupRef = useRef<THREE.Group>(null);
//   const headRef = useRef<THREE.Mesh>(null);
//   const leftArmRef = useRef<THREE.Group>(null);
//   const rightArmRef = useRef<THREE.Group>(null);
//   const leftLegRef = useRef<THREE.Group>(null);
//   const rightLegRef = useRef<THREE.Group>(null);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
    
//     if (groupRef.current) {
//       groupRef.current.position.y = Math.sin(t * 1.5) * 0.02;
//     }
    
//     if (headRef.current) {
//       headRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
//       headRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
//     }

//     if (leftArmRef.current) {
//       leftArmRef.current.rotation.x = Math.sin(t * 0.8) * 0.1 + 0.2;
//     }
//     if (rightArmRef.current) {
//       rightArmRef.current.rotation.x = Math.sin(t * 0.8 + Math.PI) * 0.1 + 0.2;
//     }

//     if (leftLegRef.current) {
//       leftLegRef.current.rotation.x = Math.sin(t * 0.6) * 0.05;
//     }
//     if (rightLegRef.current) {
//       rightLegRef.current.rotation.x = Math.sin(t * 0.6 + Math.PI) * 0.05;
//     }
//   });

//   const skinMaterial = new THREE.MeshStandardMaterial({
//     color: '#f4d6b8',
//     roughness: 0.6,
//     metalness: 0.1,
//   });

//   const hairMaterial = new THREE.MeshStandardMaterial({
//     color: '#2c1810',
//     roughness: 0.8,
//     metalness: 0.0,
//   });

//   const shirtMaterial = new THREE.MeshStandardMaterial({
//     color: '#8b5cf6',
//     roughness: 0.7,
//     metalness: 0.2,
//   });

//   const pantsMaterial = new THREE.MeshStandardMaterial({
//     color: '#1e293b',
//     roughness: 0.8,
//     metalness: 0.1,
//   });

//   const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
//     color: '#ffffff',
//     roughness: 0.3,
//   });

//   const eyePupilMaterial = new THREE.MeshStandardMaterial({
//     color: '#0ea5e9',
//     roughness: 0.2,
//     metalness: 0.3,
//   });

//   return (
//     <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
//       <group ref={groupRef} position={[0, -0.3, 0]}>
//         {/* Head */}
//         <mesh ref={headRef} position={[0, 0.85, 0]} castShadow receiveShadow>
//           <sphereGeometry args={[0.18, 32, 32]} />
//           <primitive object={skinMaterial} attach="material" />
//         </mesh>

//         {/* Neck */}
//         <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
//           <cylinderGeometry args={[0.08, 0.09, 0.12, 16]} />
//           <primitive object={skinMaterial} attach="material" />
//         </mesh>

//         {/* Hair - Top */}
//         <mesh position={[0, 0.98, 0]} castShadow>
//           <sphereGeometry args={[0.19, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
//           <primitive object={hairMaterial} attach="material" />
//         </mesh>

//         {/* Hair - Sides */}
//         <mesh position={[-0.15, 0.88, 0]} castShadow>
//           <sphereGeometry args={[0.08, 16, 16]} />
//           <primitive object={hairMaterial} attach="material" />
//         </mesh>
//         <mesh position={[0.15, 0.88, 0]} castShadow>
//           <sphereGeometry args={[0.08, 16, 16]} />
//           <primitive object={hairMaterial} attach="material" />
//         </mesh>

//         {/* Eyes */}
//         <group position={[0, 0.88, 0.16]}>
//           {/* Left Eye */}
//           <mesh position={[-0.07, 0, 0]}>
//             <sphereGeometry args={[0.04, 16, 16]} />
//             <primitive object={eyeWhiteMaterial} attach="material" />
//           </mesh>
//           <mesh position={[-0.07, 0, 0.035]}>
//             <sphereGeometry args={[0.02, 16, 16]} />
//             <primitive object={eyePupilMaterial} attach="material" />
//           </mesh>
//           <mesh position={[-0.07, 0.005, 0.045]}>
//             <sphereGeometry args={[0.015, 8, 8]} />
//             <meshStandardMaterial color="#000000" />
//           </mesh>

//           {/* Right Eye */}
//           <mesh position={[0.07, 0, 0]}>
//             <sphereGeometry args={[0.04, 16, 16]} />
//             <primitive object={eyeWhiteMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0.07, 0, 0.035]}>
//             <sphereGeometry args={[0.02, 16, 16]} />
//             <primitive object={eyePupilMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0.07, 0.005, 0.045]}>
//             <sphereGeometry args={[0.015, 8, 8]} />
//             <meshStandardMaterial color="#000000" />
//           </mesh>
//         </group>

//         {/* Eyebrows */}
//         <mesh position={[-0.07, 0.93, 0.16]} rotation={[0, 0, -0.1]}>
//           <boxGeometry args={[0.06, 0.01, 0.01]} />
//           <primitive object={hairMaterial} attach="material" />
//         </mesh>
//         <mesh position={[0.07, 0.93, 0.16]} rotation={[0, 0, 0.1]}>
//           <boxGeometry args={[0.06, 0.01, 0.01]} />
//           <primitive object={hairMaterial} attach="material" />
//         </mesh>

//         {/* Nose */}
//         <mesh position={[0, 0.82, 0.19]} castShadow>
//           <coneGeometry args={[0.025, 0.06, 8]} />
//           <primitive object={skinMaterial} attach="material" />
//         </mesh>

//         {/* Mouth */}
//         <mesh position={[0, 0.77, 0.17]} rotation={[1.5, 0, 0]}>
//           <torusGeometry args={[0.05, 0.01, 8, 16, Math.PI]} />
//           <meshStandardMaterial color="#8b4545" />
//         </mesh>

//         {/* Ears */}
//         <mesh position={[-0.18, 0.85, 0]} rotation={[0, 0, -0.2]} castShadow>
//           <sphereGeometry args={[0.04, 16, 16]} />
//           <primitive object={skinMaterial} attach="material" />
//         </mesh>
//         <mesh position={[0.18, 0.85, 0]} rotation={[0, 0, 0.2]} castShadow>
//           <sphereGeometry args={[0.04, 16, 16]} />
//           <primitive object={skinMaterial} attach="material" />
//         </mesh>

//         {/* Torso */}
//         <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
//           <boxGeometry args={[0.35, 0.5, 0.22]} />
//           <primitive object={shirtMaterial} attach="material" />
//         </mesh>

//         {/* Shoulders */}
//         <mesh position={[-0.2, 0.52, 0]} castShadow>
//           <sphereGeometry args={[0.08, 16, 16]} />
//           <primitive object={shirtMaterial} attach="material" />
//         </mesh>
//         <mesh position={[0.2, 0.52, 0]} castShadow>
//           <sphereGeometry args={[0.08, 16, 16]} />
//           <primitive object={shirtMaterial} attach="material" />
//         </mesh>

//         {/* Left Arm */}
//         <group ref={leftArmRef} position={[-0.25, 0.45, 0]}>
//           <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.055, 0.05, 0.25, 16]} />
//             <primitive object={shirtMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.045, 0.04, 0.22, 16]} />
//             <primitive object={skinMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.52, 0]} castShadow>
//             <sphereGeometry args={[0.045, 12, 12]} />
//             <primitive object={skinMaterial} attach="material" />
//           </mesh>
//         </group>

//         {/* Right Arm */}
//         <group ref={rightArmRef} position={[0.25, 0.45, 0]}>
//           <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.055, 0.05, 0.25, 16]} />
//             <primitive object={shirtMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.045, 0.04, 0.22, 16]} />
//             <primitive object={skinMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.52, 0]} castShadow>
//             <sphereGeometry args={[0.045, 12, 12]} />
//             <primitive object={skinMaterial} attach="material" />
//           </mesh>
//         </group>

//         {/* Hips */}
//         <mesh position={[0, 0, 0]} castShadow receiveShadow>
//           <boxGeometry args={[0.3, 0.15, 0.2]} />
//           <primitive object={pantsMaterial} attach="material" />
//         </mesh>

//         {/* Left Leg */}
//         <group ref={leftLegRef} position={[-0.09, -0.08, 0]}>
//           <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.08, 0.07, 0.35, 16]} />
//             <primitive object={pantsMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.06, 0.055, 0.3, 16]} />
//             <primitive object={pantsMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.68, 0.03]} castShadow>
//             <boxGeometry args={[0.09, 0.08, 0.15]} />
//             <meshStandardMaterial color="#1a1a1a" />
//           </mesh>
//         </group>

//         {/* Right Leg */}
//         <group ref={rightLegRef} position={[0.09, -0.08, 0]}>
//           <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.08, 0.07, 0.35, 16]} />
//             <primitive object={pantsMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
//             <cylinderGeometry args={[0.06, 0.055, 0.3, 16]} />
//             <primitive object={pantsMaterial} attach="material" />
//           </mesh>
//           <mesh position={[0, -0.68, 0.03]} castShadow>
//             <boxGeometry args={[0.09, 0.08, 0.15]} />
//             <meshStandardMaterial color="#1a1a1a" />
//           </mesh>
//         </group>

//         {/* Crown */}
//         <mesh position={[0, 1.08, 0]} rotation={[0, 0, 0]} castShadow>
//           <cylinderGeometry args={[0.08, 0.1, 0.08, 6]} />
//           <meshStandardMaterial 
//             color="#fbbf24" 
//             metalness={0.9} 
//             roughness={0.1}
//             emissive="#fbbf24"
//             emissiveIntensity={0.2}
//           />
//         </mesh>
//         {[0, 60, 120, 180, 240, 300].map((angle, i) => (
//           <mesh
//             key={i}
//             position={[
//               Math.sin((angle * Math.PI) / 180) * 0.09,
//               1.12,
//               Math.cos((angle * Math.PI) / 180) * 0.09
//             ]}
//             castShadow
//           >
//             <coneGeometry args={[0.02, 0.06, 4]} />
//             <meshStandardMaterial 
//               color="#fbbf24" 
//               metalness={0.9} 
//               roughness={0.1}
//               emissive="#fbbf24"
//               emissiveIntensity={0.2}
//             />
//           </mesh>
//         ))}
//       </group>
//     </Float>
//   );
// }