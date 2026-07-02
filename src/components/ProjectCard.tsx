import { motion } from 'motion/react';
import * as Lucide from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = Boolean(project.githubUrl || project.liveDemoUrl);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_24px_70px_-28px_rgba(34,211,238,0.2)]"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.featured && (
            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur">
              Featured
            </span>
          )}
          <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] ${project.status === 'Completed' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
            {project.status}
          </span>
        </div>
        {project.status === 'In Progress' && (
          <div className="absolute right-4 top-4 rounded-full border border-amber-300/60 bg-amber-100/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700">
            Coming Soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-300">
            {project.category}
          </span>
          <span className="text-xs font-medium text-slate-400">{project.completionDate}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              <Lucide.GitBranch size={16} />
              GitHub
            </a>
          ) : null}
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <Lucide.ExternalLink size={16} />
              Live Demo
            </a>
          ) : null}
        </div>

        {!hasLinks && (
          <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
            Links will be added as soon as the project is published.
          </div>
        )}
      </div>
    </motion.article>
  );
}
