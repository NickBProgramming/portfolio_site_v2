"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, memo, useMemo } from "react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

const ProjectCard = memo(({ project, index, isHovered, onHover }) => (
  <motion.div
    className="bg-gray-700 bg-opacity-50 rounded-xl overflow-hidden"
    variants={itemVariants}
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.2 },
    }}
    onHoverStart={() => onHover(index)}
    onHoverEnd={() => onHover(null)}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative h-48 md:h-full overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.5 },
          }}
          className="h-full w-full"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500"
            loading="lazy"
            unoptimized

          />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-blue-300 mb-2">{project.title}</h3>
        <p className="text-gray-200 mb-4 whitespace-pre-line">{project.description}</p>

        <div className="mb-4">
          <h4 className="text-sm text-gray-400 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="bg-gray-600 px-2 py-1 rounded-md text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1  }}
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                  scale: 1.05,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors"
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-300 hover:text-blue-200 transition-colors"
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </motion.a>
        </div> */}
      </div>
    </div>
  </motion.div>
))

function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = useMemo(() => [
    
    {
      title: "Portfolio Site V2",
      description: `This very portfolio you're exploring! A unique, interactive developer portfolio built around a hexagonal navigation system with animated transitions, responsive design, and optimized performance.`,
      technologies: ["Next.js","Javascript","Tailwind CSS", "Framer Motion", "React Hooks"],
      image: "/images/project1.png",
    },
    {
      title: "AI Powered Web Scraping System",
      description: `Led as Scrum Leader and architected an AI-powered web scraping system using Snowflake, Pinecone, and embeddings. Ensured accurate data integration and system performance. Collaborated cross-functionally and mentored team members in Agile practices.`,
      technologies: ["Python", "OpenAI API", "Prompt Engineering", "Snowflake", "Selenium", "Pinecone"],
      image: "/images/project5.png",
    },
    {
      title: "Portfolio Site V1",
      description: `Built my first personal portfolio site using React and Material UI for a clean, responsive design. Integrated smooth animations and deployed the site via Firebase Hosting. Focused on showcasing projects with intuitive navigation and performance in mind.`,
      technologies: ["Javascript", "HTML", "CSS", "Tailwind", "MaterialUI", "Firebase"],
      image: "/images/project2.png",
    },
    {
      title: "Commercial Websites",
      description: `I developed a websites for local businesses, incorporating essential features such as email functionality for seamless communication and integration with secure payment systems to facilitate smooth online transactions. Each project was tailored to the specific needs of the business, ensuring a user-friendly experience and efficient back-end operations.`,
      technologies: ["HTML", "Tailwind CSS", "MaterialUI"],
      image: "/images/project3.png",
    },
    {
      title: "Python Socket-Based Chat Server",
      description: `Built a multi-threaded chat server in Python using sockets and the select module. Implemented client-server communication, authentication, message broadcasting, chat scripting, and a basic UI with error handling.`,
      technologies: ["Python", "Sockets", "Networking", "GUI"],
      image: "/images/project41.png",
    },
  ], [])

  return (
    <motion.div
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-3xl font-bold text-blue-300 mb-6" variants={itemVariants}>
        Projects
      </motion.h2>
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isHovered={hoveredProject === index}
            onHover={setHoveredProject}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default memo(ProjectsSection)
