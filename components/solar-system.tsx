"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { planets } from "@/lib/planet-data"
import { useRouter } from "next/navigation"

interface SolarSystemProps {
  interactive?: boolean
  autoRotate?: boolean
}

export function SolarSystem({ interactive = true, autoRotate = false }: SolarSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [showDistances, setShowDistances] = useState(false)

  // Use refs instead of state for orbit lines to prevent re-renders
  const orbitLinesRef = useRef<THREE.Line[]>([])
  const planetRefs = useRef<{ [key: string]: THREE.Group }>({})

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 50
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    // Add directional light (sun)
    const sunLight = new THREE.PointLight(0xffffff, 2)
    sunLight.position.set(0, 0, 0)
    scene.add(sunLight)

    // Add stars
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    })

    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 0.5
    controlsRef.current = controls

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sun)

    // Create planets
    const planetObjects: { [key: string]: THREE.Object3D } = {}
    const planetOrbits: THREE.Line[] = []

    planets.forEach((planet, index) => {
      // Create orbit
      const orbitRadius = 10 + (index + 1) * 5
      const orbitGeometry = new THREE.BufferGeometry()
      const orbitPoints = []
      const orbitSegments = 128

      for (let i = 0; i <= orbitSegments; i++) {
        const angle = (i / orbitSegments) * Math.PI * 2
        orbitPoints.push(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius)
      }

      orbitGeometry.setAttribute("position", new THREE.Float32BufferAttribute(orbitPoints, 3))
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 })
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
      scene.add(orbit)
      planetOrbits.push(orbit)

      // Create planet
      const planetGeometry = new THREE.SphereGeometry(planet.size, 32, 32)
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.7,
        metalness: 0.1,
      })
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)

      // Position planet
      const angle = Math.random() * Math.PI * 2
      planetMesh.position.x = Math.cos(angle) * orbitRadius
      planetMesh.position.z = Math.sin(angle) * orbitRadius

      // Create planet group (for rotation)
      const planetGroup = new THREE.Group()
      planetGroup.add(planetMesh)
      scene.add(planetGroup)

      // Store reference to planet object
      planetObjects[planet.id] = planetGroup

      // Add click event if interactive
      if (interactive) {
        planetMesh.userData = { id: planet.id }
      }
    })

    // Add distance measurement lines
    const createDistanceLine = (planetId1: string, planetId2: string) => {
      if (!planetObjects[planetId1] || !planetObjects[planetId2]) return null

      const lineGeometry = new THREE.BufferGeometry()
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      })

      // Create line with initial positions
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)

      return line
    }

    // Create distance measurement lines between planets
    if (interactive) {
      const distanceLines: THREE.Line[] = []

      // Create a line from Sun to each planet
      planets.forEach((planet) => {
        const line = createDistanceLine("sun", planet.id)
        if (line) distanceLines.push(line)
      })

      // Store in ref instead of state to avoid re-renders
      orbitLinesRef.current = distanceLines
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Handle clicks if interactive
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event: MouseEvent) => {
      if (!interactive || !containerRef.current || !cameraRef.current || !sceneRef.current) return

      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, cameraRef.current)

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(sceneRef.current.children, true)

      if (intersects.length > 0) {
        // Find the first intersected object that has a planet ID
        for (const intersect of intersects) {
          if (intersect.object.userData && intersect.object.userData.id) {
            router.push(`/planets/${intersect.object.userData.id}`)
            break
          }
        }
      }
    }

    if (interactive) {
      window.addEventListener("click", handleClick)
    }

    // Animation loop
    const animate = () => {
      if (!controlsRef.current) return

      // Update controls
      controlsRef.current.update()

      // Rotate planets around the sun
      Object.keys(planetObjects).forEach((id, index) => {
        const planetGroup = planetObjects[id]
        const orbitSpeed = 0.001 / (index + 1)
        planetGroup.rotation.y += orbitSpeed

        // Store reference to planet group
        planetRefs.current[id] = planetGroup
      })

      // Update distance lines if showing distances
      if (showDistances && orbitLinesRef.current.length > 0) {
        orbitLinesRef.current.forEach((line, index) => {
          if (!line) return

          const planet = planets[index]
          const sunPosition = new THREE.Vector3(0, 0, 0)

          // Find the planet mesh inside the group
          const planetPosition = new THREE.Vector3()
          if (planetRefs.current[planet.id]) {
            // Get the first child which should be the planet mesh
            const planetMesh = planetRefs.current[planet.id].children[0]
            if (planetMesh) {
              planetMesh.getWorldPosition(planetPosition)
            }
          }

          // Update line geometry
          const points = [sunPosition, planetPosition]
          line.geometry.setFromPoints(points)

          // Set visibility based on showDistances state
          line.visible = showDistances
        })
      }

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    // Set loading state to false
    setIsLoading(false)

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      if (interactive) {
        window.removeEventListener("click", handleClick)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      // Dispose of geometries and materials
      Object.values(planetObjects).forEach((obj) => {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            } else if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose())
            }
          }
        })
      })

      planetOrbits.forEach((orbit) => {
        orbit.geometry.dispose()
        if (orbit.material instanceof THREE.Material) {
          orbit.material.dispose()
        }
      })
    }
  }, [interactive, autoRotate, router, showDistances]) // Removed orbitLines.length from dependencies

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
      {interactive && (
        <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setShowDistances(!showDistances)}
            className="px-4 py-2 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
          >
            {showDistances ? "Hide Distances" : "Show Distances"}
          </button>
        </div>
      )}

      {showDistances && interactive && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 p-4 rounded-md text-white text-sm">
          <h3 className="font-bold mb-2">Distance from Sun</h3>
          <ul className="space-y-1">
            {planets.map((planet) => (
              <li key={planet.id} className="flex justify-between gap-4">
                <span>{planet.name}:</span>
                <span>{planet.distanceFromSun} million km</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

