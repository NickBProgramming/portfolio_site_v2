"use client"

import { motion } from "framer-motion"
import { useState, memo, useMemo, useCallback } from "react"

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

// Skill Category Component
const SkillCategory = memo(
  ({ category, index, isActive, onHover }) => (
    <motion.div
      className={`bg-gray-700 bg-opacity-50 p-6 rounded-xl transition-all duration-300 ${isActive ? "ring-2 ring-green-400 transform scale-105" : ""}`}
      variants={itemVariants}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
    >
      <h3 className="text-xl font-bold text-green-300 mb-4">{category.category}</h3>

      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <motion.div key={i} variants={itemVariants}>
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
              <span className="text-white font-medium">{skill.name}</span>
            </div>
            <div className="pl-4 text-sm text-gray-300">{skill.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ),
)

// Skill Tag Component
const SkillTag = memo(({ skill, index }) => (
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
    whileTap={{ scale: 0.95 }}
  >
    {skill}
  </motion.span>
))

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(null)

  // Memoize the skill categories and other skills data to prevent recreation on each render
  const skillCategories = useMemo(() => [
    {
      category: "Frontend",
      skills: [
        { name: "React", description: "Component architecture, hooks, context API, and performance optimization" },
        { name: "Next.js", description: "Server components, app router, and full-stack development" },
        { name: "TypeScript", description: "Type safety, interfaces, generics, and advanced patterns" },
        { name: "Tailwind CSS", description: "Responsive design, custom theming, and component styling" },
        { name: "Framer Motion", description: "Interactive animations, gestures, and transitions" },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", description: "RESTful APIs, middleware, authentication, and authorization" },
        { name: "Express", description: "Route handling, middleware patterns, and API design" },
        { name: "MongoDB", description: "Schema design, aggregation pipeline, and data modeling" },
        { name: "PostgreSQL", description: "Relational database design, complex queries, and indexing" },
        { name: "GraphQL", description: "Schema definition, resolvers, and Apollo Server implementation" },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Git", description: "Branching strategies, CI/CD integration, and collaborative workflows" },
        { name: "Docker", description: "Containerization, multi-container applications, and orchestration" },
        { name: "AWS", description: "EC2, S3, Lambda, and serverless architecture" },
        { name: "CI/CD", description: "GitHub Actions, Jenkins, and automated testing pipelines" },
        { name: "Jest", description: "Unit testing, integration testing, and test-driven development" },
      ],
    },
    {
      category: "Cloud & Architecture",
      skills: [
        { name: "Microservices", description: "Service decomposition, API gateways, and distributed systems" },
        { name: "Serverless", description: "Function-as-a-Service, event-driven architecture, and cost optimization" },
        { name: "Kubernetes", description: "Container orchestration, deployment strategies, and scaling" },
        { name: "System Design", description: "Scalable architectures, performance optimization, and resilience patterns" },
        { name: "Cloud Providers", description: "AWS, Azure, GCP with focus on managed services and infrastructure as code" },
      ],
    },
  ], [])

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

  const programmingLanguages = useMemo(() => [
    "Python",
    "Java",
    "Javascript",
    "CSS",
    "C++",
    "Kotlin",
    "Go",
    "TypeScript",
    "C",
    "MySQL",
    "PostgreSQL",
    "Rust"
  ], [])

  // Handler to set active category
  const handleHover = useCallback((index) => {
    setActiveCategory(index)
  }, [])

  return (
    <motion.div className="text-white" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-3xl font-bold text-green-300 mb-6" variants={itemVariants}>
        Skills
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={index}
            category={category}
            index={index}
            isActive={activeCategory === index}
            onHover={handleHover}
          />
        ))}
      </div>

      <motion.div className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl" variants={itemVariants}>
        <h3 className="text-xl font-bold text-green-300 mb-4">Other Skills & Interests</h3>

        <div className="flex flex-wrap gap-3">
          {otherSkills.map((skill, i) => (
            <SkillTag key={i} skill={skill} index={i} />
          ))}
        </div>
      </motion.div>
      <motion.div className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl" variants={itemVariants}>
        <h3 className="text-xl font-bold text-green-300 mb-4">Programming Languages</h3>

        <div className="flex flex-wrap gap-3">
          {programmingLanguages.map((skill, i) => (
            <SkillTag key={i} skill={skill} index={i} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default memo(SkillsSection)
