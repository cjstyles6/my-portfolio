import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Floating Particle System
function ParticleField() {
  const count = 200;
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3ABEFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating Geometric Shapes
function FloatingShape({ position, shape, color, speed }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.4, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.5, 0]} />;
      case "torus":
        return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Glowing Ring
function GlowingRing({ position, scale }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#3ABEFF"
          emissive="#3ABEFF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.2} />

      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3ABEFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />

      {/* Stars Background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Particle Field */}
      <ParticleField />

      {/* Floating Shapes */}
      <FloatingShape
        position={[-5, 2, -5]}
        shape="octahedron"
        color="#3ABEFF"
        speed={0.3}
      />
      <FloatingShape
        position={[5, -2, -8]}
        shape="icosahedron"
        color="#3ABEFF"
        speed={0.2}
      />
      <FloatingShape
        position={[-3, -3, -3]}
        shape="tetrahedron"
        color="#00d4ff"
        speed={0.4}
      />
      <FloatingShape
        position={[4, 3, -6]}
        shape="torus"
        color="#3ABEFF"
        speed={0.25}
      />
      <FloatingShape
        position={[0, -4, -10]}
        shape="box"
        color="#00d4ff"
        speed={0.35}
      />

      {/* Glowing Rings */}
      <GlowingRing position={[0, 0, -15]} scale={2} />
      <GlowingRing position={[-8, 4, -20]} scale={1.5} />
      <GlowingRing position={[8, -3, -18]} scale={1} />
    </>
  );
}

const Background3D = () => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
