import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Planet Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The celestial body you're looking for seems to have drifted out of our solar system.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}

