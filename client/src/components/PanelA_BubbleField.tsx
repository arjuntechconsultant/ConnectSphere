import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

interface Person {
  id: number;
  name: string;
  avatar: string;
  title: string;
  tags: string[];
}

interface PanelAProps {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
}

interface PersonBubbleProps {
  person: Person;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}

function PersonBubble({ person, position, isSelected, onClick }: PersonBubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.5, 0.5]}
    >
      <group position={position}>
        {/* Main bubble sphere */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={isSelected ? "#3b82f6" : "#8b5cf6"}
            emissive={isSelected ? "#3b82f6" : hovered ? "#6366f1" : "#000000"}
            emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>

        {/* Selection ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6, 0.05, 16, 100]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.8}
            />
          </mesh>
        )}

        {/* Avatar and tooltip on hover */}
        {hovered && (
          <Html
            position={[0, 0.8, 0]}
            center
            distanceFactor={6}
            style={{
              transition: "all 0.2s",
              opacity: hovered ? 1 : 0,
              transform: `scale(${hovered ? 1 : 0.5})`,
            }}
          >
            <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg min-w-[200px] pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.title}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {person.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function BubbleFieldScene({
  people,
  selectedPerson,
  setSelectedPerson,
}: PanelAProps) {
  // Generate 3D positions for bubbles in a sphere-like formation
  const getPosition = (index: number, total: number): [number, number, number] => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 4;
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ];
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={5}
      />

      {/* Fog for depth perception */}
      <fog attach="fog" args={["#000", 8, 20]} />

      {/* Person bubbles */}
      {people.map((person, index) => (
        <PersonBubble
          key={person.id}
          person={person}
          position={getPosition(index, people.length)}
          isSelected={selectedPerson?.id === person.id}
          onClick={() => setSelectedPerson(person)}
        />
      ))}
    </>
  );
}

export default function PanelA_BubbleField({
  people,
  selectedPerson,
  setSelectedPerson,
}: PanelAProps) {
  return (
    <div className="relative w-full h-[60vh] bg-gradient-to-b from-background to-muted/20 rounded-lg border border-card-border overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <BubbleFieldScene
            people={people}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
        </Suspense>
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-card-border rounded-md px-3 py-2 text-xs text-muted-foreground">
        <p>Drag to rotate • Scroll to zoom • Click bubbles to select</p>
      </div>
    </div>
  );
}
