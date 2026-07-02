import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Projects</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            A growing portfolio of analytics and product work.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            New project entries can be added in one data file and will automatically appear here with the same layout and interactions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20' : 'border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
