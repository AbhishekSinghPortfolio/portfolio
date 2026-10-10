import { useEffect, useRef } from 'react';
import type * as THREE from 'three';

/**
 * WebGL particle network background using Three.js.
 * Creates a neural-network style particle field with dynamic connections
 * that react subtly to mouse movement. Gold particles on obsidian black.
 */
export default function ParticleNetwork() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationId = 0;
    let resizeHandler: (() => void) | null = null;

    // Dynamic import to keep initial bundle smaller
    import('three').then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        mount.clientWidth / mount.clientHeight,
        1,
        1000
      );
      camera.position.z = 350;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // --- Particle field ---
      const particleCount = 180;
      const positions = new Float32Array(particleCount * 3);
      const velocities: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 700;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
        velocities.push(
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.15
        );
      }

      // Particle geometry — small glowing points
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Create a soft circular sprite texture
      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const sctx = spriteCanvas.getContext('2d');
      if (sctx) {
        const gradient = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,230,150,1)');
        gradient.addColorStop(0.3, 'rgba(212,175,55,0.6)');
        gradient.addColorStop(1, 'rgba(212,175,55,0)');
        sctx.fillStyle = gradient;
        sctx.fillRect(0, 0, 64, 64);
      }
      const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

      const particleMat = new THREE.PointsMaterial({
        size: 6,
        map: spriteTexture,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // --- Connection lines ---
      const maxConnections = 120;
      const linePositions = new Float32Array(maxConnections * 6);
      const lineColors = new Float32Array(maxConnections * 6);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSegments);

      // Mouse tracking
      const mouse = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };

      const mouseHandler = (e: MouseEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 60;
        target.y = -(e.clientY / window.innerHeight - 0.5) * 40;
      };
      window.addEventListener('mousemove', mouseHandler);

      const connectionDist = 130;
      const posAttr = particleGeo.attributes.position as import('three').BufferAttribute;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Smooth mouse follow
        mouse.x += (target.x - mouse.x) * 0.03;
        mouse.y += (target.y - mouse.y) * 0.03;

        // Update particles
        const posArr = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          posArr[ix] += velocities[i * 3];
          posArr[ix + 1] += velocities[i * 3 + 1];
          posArr[ix + 2] += velocities[i * 3 + 2];

          // Boundary wrap
          if (posArr[ix] > 350) posArr[ix] = -350;
          if (posArr[ix] < -350) posArr[ix] = 350;
          if (posArr[ix + 1] > 250) posArr[ix + 1] = -250;
          if (posArr[ix + 1] < -250) posArr[ix + 1] = 250;
          if (posArr[ix + 2] > 150) posArr[ix + 2] = -150;
          if (posArr[ix + 2] < -150) posArr[ix + 2] = 150;
        }
        posAttr.needsUpdate = true;

        // Update connections
        let lineIdx = 0;
        for (let i = 0; i < particleCount; i++) {
          if (lineIdx >= maxConnections * 6) break;
          const ix = i * 3;
          for (let j = i + 1; j < particleCount; j++) {
            if (lineIdx >= maxConnections * 6) break;
            const jx = j * 3;
            const dx = posArr[ix] - posArr[jx];
            const dy = posArr[ix + 1] - posArr[jx + 1];
            const dz = posArr[ix + 2] - posArr[jx + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectionDist) {
              const alpha = 1 - dist / connectionDist;
              linePositions[lineIdx] = posArr[ix];
              linePositions[lineIdx + 1] = posArr[ix + 1];
              linePositions[lineIdx + 2] = posArr[ix + 2];
              linePositions[lineIdx + 3] = posArr[jx];
              linePositions[lineIdx + 4] = posArr[jx + 1];
              linePositions[lineIdx + 5] = posArr[jx + 2];

              // Gold color with distance-based intensity
              lineColors[lineIdx] = 0.83 * alpha;
              lineColors[lineIdx + 1] = 0.69 * alpha;
              lineColors[lineIdx + 2] = 0.22 * alpha;
              lineColors[lineIdx + 3] = 0.83 * alpha;
              lineColors[lineIdx + 4] = 0.69 * alpha;
              lineColors[lineIdx + 5] = 0.22 * alpha;

              lineIdx += 6;
            }
          }
        }

        // Hide unused lines
        for (let i = lineIdx; i < maxConnections * 6; i++) {
          linePositions[i] = 0;
          lineColors[i] = 0;
        }

        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;

        // Gentle scene rotation based on mouse
        scene.rotation.y = mouse.x * 0.002;
        scene.rotation.x = -mouse.y * 0.002;

        // Slow auto-rotation
        particles.rotation.z += 0.0003;

        renderer.render(scene, camera);
      };

      animate();

      // Resize
      resizeHandler = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resizeHandler);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', mouseHandler);
        if (resizeHandler) window.removeEventListener('resize', resizeHandler);
        renderer.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        spriteTexture.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
