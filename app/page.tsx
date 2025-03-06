import { SolarSystem } from "@/components/solar-system"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Hero section with overlay text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Explore Our Solar System</h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-lg">
          An interactive 3D journey through the planets and celestial bodies
        </p>
        <div className="pointer-events-auto">
          <Link href="/planets">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            >
              View All Planets
            </Button>
          </Link>
        </div>
      </div>

      {/* Full-screen 3D solar system */}
      <div className="w-full h-[calc(100vh-64px)]">
        <SolarSystem interactive={true} autoRotate={false} />
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 p-4 rounded-md text-white text-sm max-w-md text-center">
        <p>Click and drag to rotate the view. Scroll to zoom in/out. Click on any planet to learn more about it.</p>
      </div>
    </div>
  )
}

