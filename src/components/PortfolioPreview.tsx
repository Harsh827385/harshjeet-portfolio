import * as Lucide from 'lucide-react';
import type { CSSProperties, ElementType } from 'react';
import type { AIAestheticTheme } from '../types';
import { portfolioContent } from '../data/portfolioContent';

interface PortfolioPreviewProps {
  theme: AIAestheticTheme | null;
}

export function DynamicIcon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const IconComponent = (Lucide as Record<string, ElementType>)[name] || Lucide.Sparkles;
  return <IconComponent className={className} size={size} />;
}

export default function PortfolioPreview({ theme }: PortfolioPreviewProps) {
  if (!theme) {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
          <Lucide.Layout size={28} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Portfolio Preview Ready</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
          The live preview is initialized with a professional data analyst portfolio and will refresh instantly as you adjust the layout.
        </p>
      </div>
    );
  }

  const cssVars = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-bg': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-border': theme.colors.border,
    '--color-text': theme.colors.text,
    '--color-subtext': theme.colors.subtext,
    '--font-display': theme.typography.headingFont,
    '--font-body': theme.typography.bodyFont
  } as CSSProperties;

  return (
    <div style={cssVars} className="min-h-[560px] overflow-hidden rounded-[24px] border border-slate-200 bg-[var(--color-bg)] text-[var(--color-text)] shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
          harshjeetchauhan.dev
        </div>
      </div>

      <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8" style={{ fontFamily: theme.typography.bodyFont }}>
        <header className="sticky top-0 z-10 rounded-[24px] border border-slate-200/80 bg-white/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Harshjeet Chauhan</p>
              <p className="text-sm font-semibold text-slate-900">{portfolioContent.title}</p>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              {theme.uiMockup.navigation.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[var(--color-primary)]">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="mt-6 space-y-6">
          <section className="grid gap-6 rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.28)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
                {theme.brandCopy.tagline}
              </div>
              <h1 style={{ fontFamily: theme.typography.headingFont }} className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {portfolioContent.heroTitle}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                {portfolioContent.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: theme.colors.primary }}>
                  {theme.uiMockup.callToAction}
                </a>
                <a href="#contact" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                  Let’s Connect
                </a>
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,rgba(37,99,235,0.14),rgba(6,182,212,0.16))] p-5">
              <div className="rounded-[20px] border border-white/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Snapshot</p>
                <div className="mt-4 space-y-3">
                  {portfolioContent.projects.slice(0, 2).map((project) => (
                    <div key={project.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-800">{project.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{project.metrics}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="grid gap-4 rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">About</p>
              <h2 style={{ fontFamily: theme.typography.headingFont }} className="mt-3 text-2xl font-semibold text-slate-900">Analytical thinking with business context.</h2>
            </div>
            <p className="text-sm leading-7 text-slate-600">{portfolioContent.about}</p>
          </section>

          <section id="skills" className="rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Skills</p>
                <h2 style={{ fontFamily: theme.typography.headingFont }} className="mt-2 text-2xl font-semibold text-slate-900">Core toolkit</h2>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {portfolioContent.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section id="projects" className="grid gap-4 lg:grid-cols-3">
            {portfolioContent.projects.map((project) => (
              <article key={project.title} className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Lucide.BarChart3 size={18} />
                </div>
                <h3 style={{ fontFamily: theme.typography.headingFont }} className="mt-4 text-lg font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                <p className="mt-3 text-sm font-semibold text-[var(--color-primary)]">{project.metrics}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="grid gap-4 rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Certifications</p>
              <h2 style={{ fontFamily: theme.typography.headingFont }} className="mt-2 text-2xl font-semibold text-slate-900">Professional credentials</h2>
            </div>
            <div className="space-y-3">
              {portfolioContent.certifications.map((certification) => (
                <div key={certification} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {certification}
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Contact</p>
                <h2 style={{ fontFamily: theme.typography.headingFont }} className="mt-2 text-2xl font-semibold text-slate-900">Let’s build insight-driven decisions together.</h2>
              </div>
              <a href={`mailto:${portfolioContent.contact.email}`} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: theme.colors.primary }}>
                Email Me
              </a>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Email</p>
                <p className="mt-1">{portfolioContent.contact.email}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Location</p>
                <p className="mt-1">{portfolioContent.contact.location}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Availability</p>
                <p className="mt-1">{portfolioContent.contact.availability}</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-6 rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-6 py-4 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© 2026 Harshjeet Chauhan · Data Analyst Portfolio</p>
            <div className="flex flex-wrap gap-4">
              <a href={portfolioContent.socialLinks.github} target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-primary)]">GitHub</a>
              <a
                href={portfolioContent.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(portfolioContent.socialLinks.linkedin, '_blank', 'noopener');
                }}
                className="transition hover:text-[var(--color-primary)]"
              >
                LinkedIn
              </a>
              <a href={portfolioContent.socialLinks.resume} target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-primary)]">Resume</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
