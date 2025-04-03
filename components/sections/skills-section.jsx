"use client"

import { motion } from "framer-motion"
import { useState, memo, useMemo } from "react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const skillBarVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  }),
}

// Memoized skill category component
const SkillCategory = memo(({
  category,
  index,
  isActive,
  onHover
}) => (
  <motion.div
    className={`bg-gray-700 bg-opacity-50 p-6 rounded-xl transition-all duration-300 ${isActive ? "ring-2 ring-green-400 transform scale-105" : ""}`}
    variants={itemVariants}
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    }}
    onHoverStart={() => onHover(index)}
    onHoverEnd={() => onHover(null)}>
    <h3 className="text-xl font-bold text-green-300 mb-4">{category.category}</h3>

    <div className="space-y-4">
      {category.skills.map((skill, i) => (
        <motion.div key={i} variants={itemVariants}>
          <div className="flex justify-between mb-1">
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <motion.div
              className="bg-green-500 h-2.5 rounded-full"
              custom={skill.level}
              variants={skillBarVariants}
              style={{ willChange: "width" }}></motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
))

// Memoized skill tag component
const SkillTag = memo(({
  skill,
  index
}) => (
  <motion.span
    className="bg-gray-600 px-3 py-1.5 rounded-full text-sm cursor-pointer"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5 + index * 0.05 },
    }}
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(34, 197, 94, 0.3)",
      color: "rgb(134, 239, 172)",
    }}
    whileTap={{ scale: 0.95 }}>
    {skill}
  </motion.span>
))

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(null)

  // Memoize skill categories data to prevent recreation on each render
  const skillCategories = useMemo(() => [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 75 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "GraphQL", level: 65 },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "CI/CD", level: 75 },
        { name: "Jest", level: 70 },
      ],
    },
  ], [])

  // Memoize other skills data
  const otherSkills = useMemo(() => [
    "UI/UX Design",
    "Responsive Design",
    "Progressive Web Apps",
    "Serverless Architecture",
    "Microservices",
    "RESTful APIs",
    "WebSockets",
    "Performance Optimization",
    "Accessibility",
    "SEO",
    "Mobile Development",
    "Agile Methodologies",
    "Technical Writing",
    "Mentoring",
  ], [])

  return (
    (<motion.div
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h2
        className="text-3xl font-bold text-green-300 mb-6"
        variants={itemVariants}>
        Skills
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={index}
            category={category}
            index={index}
            isActive={activeCategory === index}
            onHover={setActiveCategory} />
        ))}
      </div>
      <motion.div
        className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl"
        variants={itemVariants}>
        <h3 className="text-xl font-bold text-green-300 mb-4">Other Skills & Interests</h3>

        <div className="flex flex-wrap gap-3">
          {otherSkills.map((skill, i) => (
            <SkillTag key={i} skill={skill} index={i} />
          ))}
        </div>
      </motion.div>
    </motion.div>)
  );
}

export default memo(SkillsSection);

