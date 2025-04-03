"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hexagon from "@/components/hexagon"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import ExperienceSection from "@/components/sections/experience-section"
import ContactSection from "@/components/sections/contact-section"
import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import HobbiesSection from "./sections/hobbies-section";

// Update the sections data to position hexagons closer together
const sections = [
  { id: "about", label: "About Me", color: "from-purple-500 to-purple-700", x: -0.5, y: -1.5 },
  { id: "experience", label: "Experience", color: "from-yellow-500 to-yellow-700", x: 0.5, y: -1.5 },
  { id: "projects", label: "Projects", color: "from-blue-500 to-blue-700", x: 1, y: 0 },
  { id: "skills", label: "Skills", color: "from-green-500 to-green-700", x: 0.5, y: 1.5 },
  // { id: "socials", label: "Find Me Online", color: "from-pink-500 to-pink-700", x: -0.5, y: 1.5 },
  { id: "hobbies", label: "Hobbies", color: "from-indigo-500 to-indigo-700", x: -0.5, y: 1.5 },
  { id: "contact", label: "Let's Connect", color: "from-red-500 to-red-700", x: -1, y: 0 },

];


export default function HexagonGrid() {
  const [activeSection, setActiveSection] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0, scale: 1 })
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const frameSkip = useRef(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Optimize dimension update with useCallback
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  // Optimize mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    // Skip frames for performance (only update every 3 frames)
    if (frameSkip.current < 2) {
      frameSkip.current++
      return
    }

    frameSkip.current = 0

    // Only apply parallax effect if no section is active
    if (!activeSection) {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }
  }, [activeSection])

  // Setup and cleanup effects
  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(requestRef.current)
    };
  }, [updateDimensions, handleMouseMove])

  // Optimize hexagon click handler
  const handleHexagonClick = useCallback((id, x, y) => {
    // If already active, close it
    if (activeSection === id) {
      setActiveSection(null)
      setPosition({ x: 0, y: 0, scale: 1 })
      return
    }

    // Calculate the position to center the hexagon
    const baseSize = Math.min(dimensions.width, dimensions.height) * 0.16
    const targetX = -x * baseSize * 1.3
    const targetY = -y * baseSize * 0.75

    // First center the view on the hexagon
    setPosition({ x: targetX, y: targetY, scale: 1 })

    // Then after a short delay, set the active section
    setTimeout(() => {
      setActiveSection(id)
    }, 500)
  }, [activeSection, dimensions])

  // Optimize close handler
  const handleClose = useCallback((e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setActiveSection(null)
    setPosition({ x: 0, y: 0, scale: 1 })
  }, [])

  // Memoize section content rendering
  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "experience":
        return <ExperienceSection />;
      case "contact":
        return <ContactSection />;
      case "hobbies":
        return <HobbiesSection />;
      default:
        return null
    }
  }, [activeSection])

  // Memoize parallax effect calculation
  const parallaxPosition = useMemo(() => {
    return {
      x: position.x + (activeSection ? 0 : mousePosition.x * (isMobile ? 5 : 20)),
      y: position.y + (activeSection ? 0 : mousePosition.y * (isMobile ? 5 : 20)),
      scale: position.scale,
    }
  }, [position, activeSection, mousePosition, isMobile])

  return (
    (<div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden z-10 "
      >
      <motion.div
        className="relative"
        animate={parallaxPosition}
        transition={{
          type: activeSection ? "spring" : "tween",
          stiffness: 100,
          damping: 20,
          duration: 0.2,
        }}>
        {sections.map((section, index) => (
          <Hexagon
            key={section.id}
            id={section.id}
            label={section.label}
            color={section.color} // Keep passing color normally
            x={section.x}
            y={section.y}
            isActive={activeSection === section.id}
            onClick={() => handleHexagonClick(section.id, section.x, section.y)}
            index={index} />
        ))}
      </motion.div>
      <AnimatePresence>
        {activeSection && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: "auto" }}>
            <motion.div
              className="bg-gray-800 bg-opacity-95 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              // Prevent clicks from propagating
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-300 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors z-50"
                aria-label="Close section"
                style={{ pointerEvents: "auto" }}>
                <X className="w-5 h-5" />
              </button>
              {sectionContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>)
  );
}

