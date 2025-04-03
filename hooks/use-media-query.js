"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Set initial value
      setMatches(media.matches)

      // Define callback for media query change
      const listener = (e) => {
        setMatches(e.matches)
      }

      // Add listener
      media.addEventListener("change", listener)

      // Cleanup
      return () => {
        media.removeEventListener("change", listener)
      };
    }
  }, [query])

  return matches
}

