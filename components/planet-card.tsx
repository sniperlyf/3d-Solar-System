import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Planet } from "@/lib/planet-data"

interface PlanetCardProps {
  planet: Planet
}

export function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{planet.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-40 w-full flex items-center justify-center" style={{ backgroundColor: `${planet.color}20` }}>
          <div
            className="rounded-full"
            style={{
              backgroundColor: planet.color,
              width: `${planet.size * 20}px`,
              height: `${planet.size * 20}px`,
              maxWidth: "120px",
              maxHeight: "120px",
              minWidth: "40px",
              minHeight: "40px",
            }}
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{planet.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/planets/${planet.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Explore
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

