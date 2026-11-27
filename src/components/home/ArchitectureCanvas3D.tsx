"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D metallic-lattice engineering sculpture rendered with Three.js.
 * Pauses automatically when scrolled out of view or when prefers-reduced-motion is active.
 */
export default function ArchitectureCanvas3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const group = new THREE.Group();
    scene.add(group);

    // Outer silver architectural wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const outerWire = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({ color: 0x9fb8d8, transparent: true, opacity: 0.42 });
    const outerMesh = new THREE.LineSegments(outerWire, outerMat);
    group.add(outerMesh);

    // Inner faceted metallic core
    const coreGeo = new THREE.OctahedronGeometry(0.92, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd9e4f5,
      metalness: 0.88,
      roughness: 0.22,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Subtle precision orbital ring
    const ringGeo = new THREE.TorusGeometry(2.05, 0.012, 12, 96);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.55 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.36;
    ringMesh.rotation.y = Math.PI * 0.14;
    group.add(ringMesh);

    const ambient = new THREE.AmbientLight(0xd8e6ff, 0.85);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 6);
    const rimLight = new THREE.DirectionalLight(0x6fa8ff, 1.4);
    rimLight.position.set(-5, -3, -2);
    scene.add(ambient, keyLight, rimLight);

    let targetRotX = 0.25;
    let targetRotY = 0.4;
    let visible = true;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.65;
      targetRotX = ny * 0.45;
    };

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!visible) return;
      rafId = requestAnimationFrame(animate);
      outerMesh.rotation.y += 0.0022;
      outerMesh.rotation.x += 0.001;
      coreMesh.rotation.y -= 0.0032;
      ringMesh.rotation.z += 0.0018;

      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
      renderFrame();
    };

    if (reduceMotion) {
      group.rotation.set(0.3, 0.45, 0);
      renderFrame();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      animate();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVis = entries[0]?.isIntersecting ?? true;
        if (isVis && !visible && !reduceMotion) {
          visible = true;
          animate();
        } else if (!isVis) {
          visible = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduceMotion) renderFrame();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      outerGeo.dispose();
      outerWire.dispose();
      outerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} aria-hidden className={`relative select-none ${className}`} />;
}
