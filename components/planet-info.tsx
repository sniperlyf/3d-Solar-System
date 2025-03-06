import type { Planet } from "@/lib/planet-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PlanetInfoProps {
  planet: Planet
}

export function PlanetInfo({ planet }: PlanetInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{planet.name}</CardTitle>
          <CardDescription>{planet.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{planet.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Key Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Distance from Sun</h3>
                <p>{planet.distanceFromSun} million km</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Orbital Period</h3>
                <p>{planet.orbitalPeriod} days</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Diameter</h3>
                <p>{planet.diameter} km</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Moons</h3>
                <p>{planet.moons}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Surface Temperature</h3>
              <p>{planet.temperature}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {planet.funFacts && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Fun Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {planet.funFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

