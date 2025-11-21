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

export default function PanelA2_ThreeScene({
  people,
  connections,
  selectedPerson,
  setSelectedPerson,
}: PanelA2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPerson, setHoveredPerson] = useState<Person | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    nodeMeshes: Map<number, THREE.Mesh>;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
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
    const textureLoader = new THREE.TextureLoader();

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
      
      textureLoader.load(
        person.avatar,
        (texture) => {
          const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.4,
            metalness: 0.3,
          });
          const mesh = nodeMeshes.get(person.id);
          if (mesh) {
            mesh.material = material;
          }
        },
        undefined,
        () => {
          const material = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            roughness: 0.4,
            metalness: 0.6,
          });
          const mesh = nodeMeshes.get(person.id);
          if (mesh) {
            mesh.material = material;
          }
        }
      );

      const material = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.4,
        metalness: 0.6,
      });

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
          color: 0x444444,
          transparent: true,
          opacity: 0.3,
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      setMousePosition({ x: event.clientX, y: event.clientY });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(nodeMeshes.values()));

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
      const intersects = raycaster.intersectObjects(Array.from(nodeMeshes.values()));

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
      sceneRef.current!.animationId = animationId;

      time += 0.01;

      nodeMeshes.forEach((mesh, id) => {
        const baseY = mesh.userData.baseY;
        mesh.position.y = baseY + Math.sin(time + id) * 0.3;

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

      controls.update();
      renderer.render(scene, camera);
    };

    const onResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
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
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.controls.dispose();
        sceneRef.current.renderer.dispose();
        container.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, [people, connections]);

  useEffect(() => {
    if (sceneRef.current && selectedPerson) {
      const mesh = sceneRef.current.nodeMeshes.get(selectedPerson.id);
      if (mesh) {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x3b82f6);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
      }
    }
  }, [selectedPerson]);

  return (
    <div className="relative w-full h-[60vh] bg-gradient-to-b from-background to-muted/20 rounded-lg border border-card-border overflow-hidden">
      <div ref={containerRef} className="w-full h-full" data-testid="3d-network-container" />

      {hoveredPerson && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y + 15}px`,
          }}
        >
          <div className="bg-card border border-card-border rounded-lg p-3 shadow-xl min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={hoveredPerson.avatar} alt={hoveredPerson.name} />
                <AvatarFallback>
                  {hoveredPerson.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm" data-testid={`text-person-name-${hoveredPerson.id}`}>
                  {hoveredPerson.name}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`text-person-title-${hoveredPerson.id}`}>
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
