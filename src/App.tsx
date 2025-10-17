import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { 
  Swords, 
  Trophy, 
  BookOpen, 
  Settings, 
  Volume2, 
  VolumeX,
  Coins,
  Zap,
  Crown
} from 'lucide-react';

interface PlayerStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  coins: number;
}

// Realistic 3D Character Component
function RealisticCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.02;
    }
    
    // Head subtle movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
    }

    // Arm idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 0.8) * 0.1 + 0.2;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(t * 0.8 + Math.PI) * 0.1 + 0.2;
    }

    // Leg subtle shift
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 0.6) * 0.05;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * 0.6 + Math.PI) * 0.05;
    }
  });

  // Skin tone material
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: '#f4d6b8',
    roughness: 0.6,
    metalness: 0.1,
  });

  // Hair material
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: '#2c1810',
    roughness: 0.8,
    metalness: 0.0,
  });

  // Shirt material
  const shirtMaterial = new THREE.MeshStandardMaterial({
    color: '#8b5cf6',
    roughness: 0.7,
    metalness: 0.2,
  });

  // Pants material
  const pantsMaterial = new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.8,
    metalness: 0.1,
  });

  // Eye material
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.3,
  });

  const eyePupilMaterial = new THREE.MeshStandardMaterial({
    color: '#0ea5e9',
    roughness: 0.2,
    metalness: 0.3,
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 1, 0]}>
        {/* Head */}
        <mesh ref={headRef} position={[0, 0.85, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.18, 32, 32]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 16]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Hair - Top */}
        <mesh position={[0, 0.98, 0]} castShadow>
          <sphereGeometry args={[0.19, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>

        {/* Hair - Sides */}
        <mesh position={[-0.15, 0.88, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>
        <mesh position={[0.15, 0.88, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>

        {/* Eyes */}
        <group position={[0, 0.88, 0.16]}>
          {/* Left Eye */}
          <mesh position={[-0.07, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={eyeWhiteMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.07, 0, 0.035]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <primitive object={eyePupilMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.07, 0.005, 0.045]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Right Eye */}
          <mesh position={[0.07, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={eyeWhiteMaterial} attach="material" />
          </mesh>
          <mesh position={[0.07, 0, 0.035]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <primitive object={eyePupilMaterial} attach="material" />
          </mesh>
          <mesh position={[0.07, 0.005, 0.045]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh position={[-0.07, 0.93, 0.16]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.06, 0.01, 0.01]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>
        <mesh position={[0.07, 0.93, 0.16]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.06, 0.01, 0.01]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, 0.82, 0.19]} castShadow>
          <coneGeometry args={[0.025, 0.06, 8]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, 0.77, 0.17]} rotation={[1.5, 0, 0]}>
          <torusGeometry args={[0.05, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#8b4545" />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.18, 0.85, 0]} rotation={[0, 0, -0.2]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
        <mesh position={[0.18, 0.85, 0]} rotation={[0, 0, 0.2]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.5, 0.22]} />
          <primitive object={shirtMaterial} attach="material" />
        </mesh>

        {/* Shoulders padding */}
        <mesh position={[-0.2, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={shirtMaterial} attach="material" />
        </mesh>
        <mesh position={[0.2, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={shirtMaterial} attach="material" />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.25, 0.45, 0]}>
          {/* Upper Arm */}
          <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.05, 0.25, 16]} />
            <primitive object={shirtMaterial} attach="material" />
          </mesh>
          {/* Lower Arm */}
          <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.22, 16]} />
            <primitive object={skinMaterial} attach="material" />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <primitive object={skinMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.25, 0.45, 0]}>
          {/* Upper Arm */}
          <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.055, 0.05, 0.25, 16]} />
            <primitive object={shirtMaterial} attach="material" />
          </mesh>
          {/* Lower Arm */}
          <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.22, 16]} />
            <primitive object={skinMaterial} attach="material" />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <primitive object={skinMaterial} attach="material" />
          </mesh>
        </group>

        {/* Hips */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.15, 0.2]} />
          <primitive object={pantsMaterial} attach="material" />
        </mesh>

        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.09, -0.08, 0]}>
          {/* Upper Leg */}
          <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.35, 16]} />
            <primitive object={pantsMaterial} attach="material" />
          </mesh>
          {/* Lower Leg */}
          <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.3, 16]} />
            <primitive object={pantsMaterial} attach="material" />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.68, 0.03]} castShadow>
            <boxGeometry args={[0.09, 0.08, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.09, -0.08, 0]}>
          {/* Upper Leg */}
          <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.35, 16]} />
            <primitive object={pantsMaterial} attach="material" />
          </mesh>
          {/* Lower Leg */}
          <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.3, 16]} />
            <primitive object={pantsMaterial} attach="material" />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.68, 0.03]} castShadow>
            <boxGeometry args={[0.09, 0.08, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>

        {/* Crown accessory */}
        <mesh position={[0, 1.08, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.08, 6]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Crown points */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.09,
              1.12,
              Math.cos((angle * Math.PI) / 180) * 0.09
            ]}
            castShadow
          >
            <coneGeometry args={[0.02, 0.06, 4]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#fbbf24"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function App() {
  const [playerStats] = useState<PlayerStats>({
    name: 'Player_001',
    level: 42,
    currentXP: 3450,
    maxXP: 5000,
    coins: 12500
  });

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const xpPercentage = (playerStats.currentXP / playerStats.maxXP) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const menuButtons = [
    { icon: Swords, label: 'Start Battle', primary: true },
    { icon: BookOpen, label: 'Select Topic', primary: false },
    { icon: Trophy, label: 'Leaderboard', primary: false },
    { icon: Settings, label: 'Settings', primary: false }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Top Bar - Coins & XP */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="absolute top-4 left-4 right-4 flex justify-between items-center z-20"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{playerStats.coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-bold">{playerStats.currentXP} XP</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMusicEnabled(!musicEnabled)}
          className="bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-full p-3 hover:bg-purple-900/50 transition-colors"
        >
          {musicEnabled ? (
            <Volume2 className="w-5 h-5 text-purple-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left Side - Player Profile & 3D Character */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
          {/* 3D Character Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            className="relative w-64 h-64"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 p-1 shadow-2xl shadow-purple-500/50">
              <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                <Canvas 
                  shadows 
                  camera={{ position: [0, 0.3, 2.5], fov: 45 }}
                  gl={{ antialias: true }}
                >
                  <color attach="background" args={['#111827']} />
                  <ambientLight intensity={0.6} />
                  <directionalLight 
                    position={[3, 4, 5]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />
                  <pointLight position={[-3, 2, 3]} intensity={0.8} color="#ec4899" />
                  <pointLight position={[3, -2, -3]} intensity={0.8} color="#8b5cf6" />
                  <spotLight
                    position={[0, 5, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={0.5}
                    castShadow
                  />
                  <RealisticCharacter />
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Canvas>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 border-4 border-gray-900 shadow-lg">
              <Crown className="w-6 h-6 text-gray-900" />
            </div>
          </motion.div>

          {/* Player Info */}
          <div className="text-center space-y-3 w-full max-w-sm">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              {playerStats.name}
            </motion.h2>
            
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-4 py-1 border border-purple-400/30">
                <span className="text-white font-bold">Level {playerStats.level}</span>
              </div>
            </motion.div>

            {/* XP Bar */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{playerStats.currentXP} XP</span>
                <span>{playerStats.maxXP} XP</span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-purple-500/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"
                />
                <motion.div
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: '50%' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Game Logo & Menu Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-8">
          {/* Game Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
            className="text-center space-y-2"
          >
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              QUIZ CLASH
            </h1>
            <p className="text-purple-300/80 text-lg tracking-widest font-semibold">
              BATTLE ROYALE
            </p>
          </motion.div>

          {/* Menu Buttons */}
          <div className="w-full max-w-md space-y-4">
            {menuButtons.map((button, index) => (
              <motion.button
                key={button.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                custom={index}
                onClick={() => button.label === 'Settings' && setShowSettings(!showSettings)}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                  button.primary
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/80 backdrop-blur-md text-purple-300 border-2 border-purple-500/30 hover:bg-gray-700/80'
                }`}
              >
                <button.icon className="w-6 h-6" />
                {button.label}
                {button.primary && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 text-center"
          >
            <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-purple-400">1,247</div>
              <div className="text-xs text-gray-400">Battles Won</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-purple-500/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-pink-400">89%</div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gray-900 border-2 border-purple-500/50 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-6">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <span className="text-white">Background Music</span>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    musicEnabled ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: musicEnabled ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}