/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import * as Lucide from 'lucide-react';
import type { AIAestheticTheme } from './types';
import ThemeDashboard from './components/ThemeDashboard';
import PortfolioPreview from './components/PortfolioPreview';
import ProjectsSection from './components/ProjectsSection';
import { portfolioContent, portfolioTheme } from './data/portfolioContent';
import { projects } from './data/projects';

const skillGroups = [
  {
    title: 'Analytics & SQL',
    description: 'Reliable querying, reporting logic, and insight-driven analysis.',
    items: ['SQL', 'Python', 'Excel', 'Power BI'],
    icon: Lucide.Database
  },
  {
    title: 'Visualization',
    description: 'Executive-ready visuals designed for clarity and decision making.',
    items: ['Dashboards', 'Storytelling', 'PBI', 'Charts'],
    icon: Lucide.PieChart
  },
  {
    title: 'Machine Learning',
    description: 'Prototype models and experimentation for prediction and forecasting.',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'Statistics'],
    icon: Lucide.Bot
  }
];

const education = [
  {
    school: 'Data Analytics Foundations',
    degree: 'Applied analytics, reporting, and decision support',
    period: '2023 – Present'
  },
  {
    school: 'Business Intelligence Practice',
    degree: 'Metrics, dashboards, and stakeholder communication',
    period: '2024 – Present'
  }
];

export default function App() {
  const [activeTheme, setActiveTheme] = useState<AIAestheticTheme | null>(portfolioTheme);
  const [savedThemes, setSavedThemes] = useState<AIAestheticTheme[]>([portfolioTheme]);

  const previewTheme = useMemo(() => activeTheme ?? portfolioTheme, [activeTheme]);

  const handleThemeGenerated = (newTheme: AIAestheticTheme) => {
    const updated = [newTheme, ...savedThemes.filter((theme) => theme.id !== newTheme.id)];
    setSavedThemes(updated);
    setActiveTheme(newTheme);
  };

  const handleSelectSavedTheme = (theme: AIAestheticTheme) => {
    setActiveTheme(theme);
  };

  const handleDeleteSavedTheme = (id: string) => {
    const updated = savedThemes.filter((theme) => theme.id !== id);
    setSavedThemes(updated);
    if (activeTheme?.id === id) {
      setActiveTheme(updated[0] ?? portfolioTheme);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#071126_45%,_#030712_100%)] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              HC
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Professional Portfolio</p>
              <p className="text-sm font-semibold text-white">Harshjeet Chauhan</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 md:flex">
            <a className="transition hover:text-white" href="#about">About</a>
            <a className="transition hover:text-white" href="#skills">Skills</a>
            <a className="transition hover:text-white" href="#projects">Projects</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-8 lg:px-8 lg:py-8">
        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_30px_100px_-40px_rgba(59,130,246,0.45)] backdrop-blur-xl sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                <Lucide.Sparkles size={14} />
                Data Analyst Portfolio
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Harshjeet <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">Chauhan</span>
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    Turning complex data into confident decisions through thoughtful analysis, crisp dashboards, and measurable impact.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#projects" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110">
                      View Projects
                    </a>
                    <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
                      Contact Me
                    </a>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-3">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">Professional portrait</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      A premium circular presentation for your portfolio hero.
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: 'Projects', value: `${projects.length}+` },
                      { label: 'Focus', value: 'BI & Insights' },
                      { label: 'Availability', value: 'Open to work' }
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ThemeDashboard
              activeTheme={activeTheme}
              onThemeGenerated={handleThemeGenerated}
              onSelectSavedTheme={handleSelectSavedTheme}
              savedThemes={savedThemes}
              onDeleteSavedTheme={handleDeleteSavedTheme}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="space-y-4"
          >
            <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-3 shadow-[0_30px_100px_-40px_rgba(129,140,248,0.3)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Lucide.Layout className="text-cyan-300" size={16} />
                  <span className="text-sm font-semibold text-slate-200">Live Portfolio Preview</span>
                </div>
                <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {previewTheme.typography.headingFont}
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-2">
                <PortfolioPreview theme={previewTheme} />
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">About</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Crafting insight-led stories from complex data.</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">Business-minded analytics</span>
              <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-200">Executive dashboards</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">Clear storytelling</span>
            </div>
          </div>
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>{portfolioContent.about}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Analytics Focus', value: 'Dashboard & reporting' },
                { label: 'Core Strength', value: 'Actionable insight' },
                { label: 'Delivery Style', value: 'Clear & polished' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-1 font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3 }}
          className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Skills</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Modern toolkit for analytical work.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">A blend of technical depth, reporting fluency, and thoughtful product thinking.</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {skillGroups.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
                <motion.article
                  key={skillGroup.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{skillGroup.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{skillGroup.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <ProjectsSection />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Education</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Learning path and continued growth.</h2>
            <div className="mt-6 space-y-4">
              {education.map((item) => (
                <div key={item.school} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.school}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.degree}</p>
                    </div>
                    <span className="text-sm font-medium text-cyan-300">{item.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: 0.06 }}
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-500/10 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Certifications</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Professional credentials and milestones.</h2>
            <div className="mt-6 space-y-3">
              {portfolioContent.certifications.map((certification) => (
                <div key={certification} className="rounded-[20px] border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                  {certification}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Contact</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Let’s build something thoughtful and useful.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Interested in analytics, dashboards, or data storytelling? I’d be glad to connect and discuss opportunities.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${portfolioContent.contact.email}`} className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
                  Email Me
                </a>
                <a
                  href={portfolioContent.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(portfolioContent.socialLinks.linkedin, '_blank', 'noopener');
                  }}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="space-y-3">
                {[
                  { label: 'Email', value: portfolioContent.contact.email },
                  { label: 'Location', value: portfolioContent.contact.location },
                  { label: 'Availability', value: portfolioContent.contact.availability }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <p className="mt-1 font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/70 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-center text-sm text-slate-400 md:flex-row md:text-left lg:px-8">
          <p>© 2026 Harshjeet Chauhan. Data Analyst Portfolio.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
