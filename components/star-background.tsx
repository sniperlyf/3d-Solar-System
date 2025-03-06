"use client"

import { useEffect, useRef } from "react"

export function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Clear any existing stars
    container.innerHTML = ""

    // Create stars
    const starCount = 200
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Random position
      const x = Math.random() * width
      const y = Math.random() * height

      // Random size (smaller stars are more common)
      const size = Math.random() * 2

      // Set styles
      star.style.left = `${x}px`
      star.style.top = `${y}px`
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Add twinkle animation to some stars
      if (Math.random() > 0.7) {
        star.classList.add("twinkle")
        // Randomize animation delay
        star.style.animationDelay = `${Math.random() * 2}s`
      }

      container.appendChild(star)
    }

    // Handle window resize
    const handleResize = () => {
      // Recreate stars on resize
      const width = window.innerWidth
      const height = window.innerHeight

      // Update star positions
      const stars = container.querySelectorAll(".star")
      stars.forEach((star) => {
        const x = Math.random() * width
        const y = Math.random() * height

        star.setAttribute(
          "style",
          `
          left: ${x}px;
          top: ${y}px;
          width: ${star.style.width};
          height: ${star.style.height};
          ${star.classList.contains("twinkle") ? `animation-delay: ${Math.random() * 2}s;` : ""}
        `,
        )
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={containerRef} className="stars" />
}

