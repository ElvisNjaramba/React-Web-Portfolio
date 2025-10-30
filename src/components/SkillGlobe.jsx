"use client";
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Icons
import reactIcon from "../assets/icons/react.svg?url";
import cssIcon from "../assets/icons/css3.svg?url";
import flutterIcon from "../assets/icons/flutter.svg?url";
import htmlIcon from "../assets/icons/html-5.svg?url";
import javaIcon from "../assets/icons/java.svg?url";
import jsIcon from "../assets/icons/javascript.svg?url";
import kotlinIcon from "../assets/icons/kotlin.svg?url";
import pythonIcon from "../assets/icons/python.svg?url";

const skills = ["React", "CSS3", "Flutter", "HTML5", "Java", "JavaScript", "Kotlin", "Python"];

const icons = [
  { src: reactIcon, position: [0, 1.6, 0] },
  { src: cssIcon, position: [1.3, 1, 0.4] },
  { src: flutterIcon, position: [-1.3, 1, 0.4] },
  { src: htmlIcon, position: [1.8, 0, 0] },
  { src: javaIcon, position: [-1.8, 0, 0] },
  { src: jsIcon, position: [1.3, -1, -0.4] },
  { src: kotlinIcon, position: [-1.3, -1, -0.4] },
  { src: pythonIcon, position: [0, -1.6, 0] },
];

const IconLabel = ({ src, position }) => (
  <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
    <group position={position}>
      <Html center transform distanceFactor={1.3}>
        <div className="relative group">
          <img
            src={src}
            alt="tech"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain opacity-95 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100"
            style={{
              filter:
                "drop-shadow(0 0 10px rgba(255,0,80,0.9)) drop-shadow(0 0 18px rgba(255,0,80,0.4)) brightness(1.1)",
              transform: "translateZ(0)",
            }}
          />
        </div>
      </Html>
    </group>
  </Float>
);

const AnimatedGlobe = () => {
  const meshRef = React.useRef();
  const innerRef = React.useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.08 * Math.sin(t * 2) + 0.15;
    if (meshRef.current) meshRef.current.material.opacity = 0.15 + pulse;
    if (innerRef.current) innerRef.current.material.opacity = 0.08 + pulse / 2;
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1.8, 48, 48]}>
        <meshBasicMaterial
          wireframe
          color="#ff0048"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </Sphere>

      <Sphere ref={innerRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial
          wireframe
          color="#ff0048"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </Sphere>
    </>
  );
};

const SkillGlobe = () => {
  return (
    <section className="py-24 text-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="text-rose-500">Skills Universe</span>
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-gray-300 hover:text-white transition-colors duration-300 relative group"
            whileHover={{ scale: 1.15 }}
          >
            {skill}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rose-500 group-hover:w-full transition-all duration-500"></span>
          </motion.span>
        ))}
      </motion.div>

      {/* ====== FIXED 3D GLOBE ====== */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px] overflow-hidden rounded-2xl">
        <Canvas
          style={{ background: "transparent", touchAction: "none" }}
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 4]} intensity={1.2} color="#ff0048" />
          <pointLight position={[-3, -3, -5]} intensity={0.3} color="#ff0048" />

          <Suspense fallback={<Html center><span className="text-white text-sm animate-pulse">Loading...</span></Html>}>
            <AnimatedGlobe />
            {icons.map((icon, i) => <IconLabel key={i} {...icon} />)}
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={1.3}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.8}
            touches={{ ONE: false, TWO: false }} // ✅ Allow mobile scroll
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.6}
          />
        </Canvas>

        {/* Overlays for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)] pointer-events-none" />
      </div>
    </section>
  );
};

export default SkillGlobe;
