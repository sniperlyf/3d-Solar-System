import { PlanetViewer } from "@/components/planet-viewer"
import { PlanetInfo } from "@/components/planet-info"
import { planets } from "@/lib/planet-data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return planets.map((planet) => ({
    id: planet.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const planet = planets.find((p) => p.id === params.id)

  if (!planet) {
    return {
      title: "Planet Not Found",
    }
  }

  return {
    title: `${planet.name} - Solar System Explorer`,
    description: planet.description,
  }
}

export default function PlanetPage({ params }: { params: { id: string } }) {
  const planet = planets.find((p) => p.id === params.id)

  if (!planet) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
          <PlanetViewer planetId={planet.id} />
        </div>
        <PlanetInfo planet={planet} />
      </div>
    </div>
  )
}

