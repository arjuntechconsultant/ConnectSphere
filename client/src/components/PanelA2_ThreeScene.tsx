import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Person {
  id: number;
  name: string;
  avatar: string;
  title: string;
  tags: string[];
}

interface PanelA2Props {
  people: Person[];
  connections: [number, number][];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
}

function createInitialsTexture(name: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, "#8b5cf6");
  gradient.addColorStop(1, "#6366f1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function PanelA2_ThreeScene({
  people,
  connections,
  selectedPerson,
  setSelectedPerson,
}: PanelA2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPerson, setHoveredPerson] = useState<Person | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    nodeMeshes: Map<number, THREE.Mesh>;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    animationId: number;
    geometries: THREE.BufferGeometry[];
    materials: THREE.Material[];
    textures: THREE.Texture[];
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      75,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 30;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366f1, 0.5);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const nodeMeshes = new Map<number, THREE.Mesh>();
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const getPosition = (
      index: number,
      total: number
    ): [number, number, number] => {
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 6;

      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ];
    };

    people.forEach((person, index) => {
      const geometry = new THREE.SphereGeometry(0.7, 32, 32);
      geometries.push(geometry);

      const texture = createInitialsTexture(person.name);
      textures.push(texture);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.3,
      });
      materials.push(material);

      const sphere = new THREE.Mesh(geometry, material);
      const position = getPosition(index, people.length);
      sphere.position.set(...position);
      sphere.userData = { person, baseY: position[1] };
      scene.add(sphere);
      nodeMeshes.set(person.id, sphere);
    });

    connections.forEach(([id1, id2]) => {
      const mesh1 = nodeMeshes.get(id1);
      const mesh2 = nodeMeshes.get(id2);
      if (mesh1 && mesh2) {
        const geometry = new THREE.BufferGeometry();
        geometries.push(geometry);
        const vertices = new Float32Array([
          mesh1.position.x,
          mesh1.position.y,
          mesh1.position.z,
          mesh2.position.x,
          mesh2.position.y,
          mesh2.position.z,
        ]);
        geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.LineBasicMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.7,
          linewidth: 2,
        });
        materials.push(material);
        const line = new THREE.Line(geometry, material);
        line.userData = { isConnection: true };
        scene.add(line);
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPosition({
        x: event.clientX,
        y: event.clientY,
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        Array.from(nodeMeshes.values())
      );

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const person = hoveredMesh.userData.person as Person;
        setHoveredPerson(person);
        container.style.cursor = "pointer";
      } else {
        setHoveredPerson(null);
        container.style.cursor = "default";
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        Array.from(nodeMeshes.values())
      );

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const person = clickedMesh.userData.person as Person;
        setSelectedPerson(person);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);

    let time = 0;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }

      time += 0.01;

      nodeMeshes.forEach((mesh, id) => {
        const baseY = mesh.userData.baseY;
        mesh.position.y = baseY + Math.sin(time + id) * 0.3;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    const onResize = () => {
      const newRect = container.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    };

    window.addEventListener("resize", onResize);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      nodeMeshes,
      raycaster,
      mouse,
      animationId: 0,
      geometries,
      materials,
      textures,
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.controls.dispose();

        geometries.forEach((geo) => geo.dispose());
        materials.forEach((mat) => mat.dispose());
        textures.forEach((tex) => tex.dispose());

        sceneRef.current.renderer.dispose();
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [people, connections, setSelectedPerson]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { nodeMeshes } = sceneRef.current;

    nodeMeshes.forEach((mesh, id) => {
      if (selectedPerson?.id === id) {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x3b82f6);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        mesh.scale.set(1.2, 1.2, 1.2);
      } else if (hoveredPerson?.id === id) {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x6366f1);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
        mesh.scale.set(1.1, 1.1, 1.1);
      } else {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        mesh.scale.set(1, 1, 1);
      }
    });
  }, [selectedPerson, hoveredPerson]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-background to-muted/20 rounded-lg border border-card-border overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full"
        data-testid="3d-network-container"
      />

      {hoveredPerson && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`,
          }}
        >
          <div className="bg-card border border-card-border rounded-lg p-3 shadow-xl min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={hoveredPerson.avatar}
                  alt={hoveredPerson.name}
                />
                <AvatarFallback>
                  {hoveredPerson.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p
                  className="font-semibold text-sm"
                  data-testid={`text-person-name-${hoveredPerson.id}`}
                >
                  {hoveredPerson.name}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  data-testid={`text-person-title-${hoveredPerson.id}`}
                >
                  {hoveredPerson.title}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {hoveredPerson.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-card-border rounded-md px-3 py-2 text-xs text-muted-foreground">
        <p data-testid="text-instructions">
          Drag to rotate • Scroll to zoom • Click bubbles to select
        </p>
      </div>

      {selectedPerson && (
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-card-border rounded-md px-3 py-2 text-xs">
          <p className="font-semibold" data-testid="text-selected-person">
            Selected: {selectedPerson.name}
          </p>
        </div>
      )}
    </div>
  );
}
