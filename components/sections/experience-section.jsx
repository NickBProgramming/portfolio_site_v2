"use client"

import { Calendar, MapPin, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { memo, useMemo } from "react"

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
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.5,
    },
  }),
}

// Memoized experience item component
const ExperienceItem = memo(({
  experience,
  index,
  isLast
}) => (
  <motion.div className="relative" variants={itemVariants}>
    {/* Timeline connector */}
    {!isLast && (
      <motion.div
        className="absolute top-12 w-0.5 bg-yellow-700 bg-opacity-50"
        style={{left:20, bottom: 12 }}
        initial={{ height: 0 }}
        animate={{ height: "110%" }}
        transition={{ duration: 1, delay: 0.5 }}></motion.div>
    )}

    <motion.div
      className="bg-gray-700 bg-opacity-50 rounded-xl p-6 relative"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}>
      {/* Timeline dot with animation */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-yellow-500"
        style={{left: 10, top: 27}}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.2 + index * 0.1,
        }}></motion.div>

      <div className="ml-4">
        <motion.h3
          className="text-2xl font-bold text-yellow-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}>
          {experience.title}
        </motion.h3>

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-gray-300">
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}>
            <Briefcase className="w-4 h-4 text-yellow-500" />
            <span>{experience.company}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}>
            <MapPin className="w-4 h-4 text-yellow-500" />
            <span>{experience.location}</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}>
            <Calendar className="w-4 h-4 text-yellow-500" />
            <span>{experience.period}</span>
          </motion.div>
        </div>

        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-200">
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ x: 5, color: "#fde68a" }}>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  </motion.div>
))

function ExperienceSection() {
  // Memoize experiences data to prevent recreation on each render
  const experiences = useMemo(() => [
    {
      title: "Software Engineer - Advanced",
      company: "Hitachi Vantara",
      location: "Remote / Englewood, CO",
      period: "Augest 2024 - Present",
      description: [
        "Led the development of a microservices architecture that improved system scalability by 200%",
        "Assisted and facilitated the development and deployment of 4 cutting edge products",
        "Implemented CI/CD pipelines that reduced deployment time by 70%",
        "Mentored junior developers and conducted code reviews to maintain code quality",
        "Collaborated with product and design teams to deliver features that increased user engagement by 35%",
      ],
    },
    {
      title: "Software Engineer",
      company: "Hitachi Vantara",
      location: "Remote / Englewood, CO",
      period: "Sept 2021 - Aug 2024",
      description: [
        "Developed and maintained multiple client-facing web applications using React and Node.js",
        "Designed and implemented RESTful APIs that handled over 1M requests per day",
        "Optimized database queries resulting in a 40% reduction in response time",
        "Integrated third-party services and APIs to enhance application functionality",
      ],
    },
    {
      title: "IT Software Intern",
      company: "Hitachi Vantara",
      location: "Englewood, CO",
      period: "Jun 2021 - Sept 2021",
      description: [
        "Built responsive user interfaces using React and modern CSS frameworks",
        "Collaborated with designers to implement pixel-perfect designs",
        "Improved website performance by implementing lazy loading and code splitting",
        "Participated in agile development processes including daily standups and sprint planning",
      ],
    },
  ], [])

  return (
    (<motion.div
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h2
        className="text-3xl font-bold text-yellow-300 mb-6"
        variants={itemVariants}>
        Experience
      </motion.h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            experience={exp}
            index={index}
            isLast={index === experiences.length - 1} />
        ))}
      </div>
      <motion.div
        className="mt-8 bg-gray-700 bg-opacity-50 p-6 rounded-xl"
        variants={itemVariants}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}>
        <h3 className="text-xl font-bold text-yellow-300 mb-4">Education</h3>

        <div className="flex items-start gap-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-yellow-700 flex items-center justify-center flex-shrink-0"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}>
            <span className="text-2xl">🎓</span>
          </motion.div>

          <div>
            <motion.h4
              className="text-lg font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}>
              Bachelor of Science in Computer Science
            </motion.h4>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}>
              Colorado School of Mines
            </motion.p>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}>
              2021 - 2024
            </motion.p>
            <motion.p
              className="mt-2 text-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}>
              Specialized in software engineering and artifical intelligence. Participated in multiple
              hackathons and coding competitions. Worked with local companies to create or boost existing products
            </motion.p>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-9">
          <motion.div
            className="w-12 h-12 rounded-full bg-yellow-700 flex items-center justify-center flex-shrink-0"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}>
            <span className="text-2xl">🎓</span>
          </motion.div>

          <div>
            <motion.h4
              className="text-lg font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}>
              Associate of Science in Computer Science
            </motion.h4>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}>
              Red Rocks Community College
            </motion.p>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}>
              2020 - 2021
            </motion.p>
            <motion.p
              className="mt-2 text-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}>
              Graduated with Honors with a GPA of 3.98. Designed and programmed a conceptual orbital garbage collection robot which recieved a 9.8 out of 10 score among peers at the yearly engineering showcase.
            </motion.p>
          </div>
        </div>
      </motion.div>
      
    </motion.div>)
  );
}

export default memo(ExperienceSection);

