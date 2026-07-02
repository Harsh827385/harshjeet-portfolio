/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import * as Lucide from 'lucide-react';
import type { AIAestheticTheme, CreativeBrief } from '../types';
import { portfolioContent, portfolioTheme } from '../data/portfolioContent';

interface ThemeDashboardProps {
  activeTheme: AIAestheticTheme | null;
  onThemeGenerated: (theme: AIAestheticTheme) => void;
  onSelectSavedTheme: (theme: AIAestheticTheme) => void;
  savedThemes: AIAestheticTheme[];
  onDeleteSavedTheme: (id: string) => void;
}

const INDUSTRIES = ['Analytics', 'Business Intelligence', 'Data Strategy', 'Operations & Reporting'];

const MOODS = [
  { name: 'Professional & Clear', desc: 'Calm structure with polished cards and readable spacing' },
  { name: 'Modern & Confident', desc: 'Confident contrast, stronger calls to action, and modern polish' },
  { name: 'Analytical & Insight-led', desc: 'Designed around dashboards, metrics, and executive storytelling' }
];

const PRESETS = [
  {
    concept: 'A modern data analyst portfolio highlighting business impact, dashboard design, and reporting clarity.',
    industry: 'Business Intelligence',
    mood: 'Professional & Clear',
    colorPref: '#2563eb'
  },
  {
    concept: 'A technical analytics portfolio that emphasizes Python, SQL, Power BI, and measurable results.',
    industry: 'Analytics',
    mood: 'Modern & Confident',
    colorPref: '#0f172a'
  },
  {
    concept: 'A recruiter-friendly analytics portfolio with strong project storytelling and certifications.',
    industry: 'Data Strategy',
    mood: 'Analytical & Insight-led',
    colorPref: '#06b6d4'
  }
];

export default function ThemeDashboard({
  activeTheme,
  onThemeGenerated,
  onSelectSavedTheme,
  savedThemes,
  onDeleteSavedTheme
}: ThemeDashboardProps) {
  const [brief, setBrief] = useState<CreativeBrief>({
    concept: portfolioContent.about,
    industry: INDUSTRIES[0],
    mood: MOODS[0].name,
    primaryColorPreference: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadingCues = [
    'Preparing your portfolio preview...',
    'Polishing the data analyst story...',
    'Aligning the visual system...',
    'Refreshing the live mockup...'
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingCues.length);
      }, 2200);
    } else {
      setLoadingStep(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, loadingCues.length]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!brief.concept.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const generatedTheme: AIAestheticTheme = {
        ...portfolioTheme,
        id: `${portfolioTheme.id}-${Date.now()}`,
        name: `${portfolioContent.name} Portfolio`,
        moodDescription: `${brief.mood} • ${brief.industry}`,
        colors: {
          ...portfolioTheme.colors,
          primary: brief.primaryColorPreference || portfolioTheme.colors.primary,
          accent: '#0ea5e9'
        },
        brandCopy: {
          ...portfolioTheme.brandCopy,
          heroTitle: portfolioContent.heroTitle,
          heroSubtitle: portfolioContent.heroSubtitle,
          tagline: 'Data Analyst',
          elevatorPitch: portfolioContent.heroTitle,
          coreValues: portfolioTheme.brandCopy.coreValues
        },
        uiMockup: {
          ...portfolioTheme.uiMockup,
          navigation: ['About', 'Skills', 'Projects', 'Contact'],
          callToAction: 'View Projects'
        }
      };

      onThemeGenerated(generatedTheme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refresh the portfolio preview.');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: (typeof PRESETS)[number]) => {
    setBrief({
      concept: preset.concept,
      industry: preset.industry,
      mood: preset.mood,
      primaryColorPreference: preset.colorPref
    });
  };

  const activeThemeSummary = useMemo(() => {
    if (!activeTheme) return 'No theme selected';
    return `${activeTheme.name} • ${activeTheme.brandCopy.tagline}`;
  }, [activeTheme]);

  return (
    <div className="space-y-6 select-none">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-7">
        <div className="flex flex-wrap gap-3">
          <a href={portfolioContent.socialLinks.resume} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110">
            Download Resume
          </a>
          <a href={portfolioContent.socialLinks.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
            GitHub
          </a>
          <a
            href={portfolioContent.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(event) => {
              event.preventDefault();
              window.open(portfolioContent.socialLinks.linkedin, '_blank', 'noopener');
            }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
          >
            LinkedIn
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Professional Summary
            </label>
            <textarea
              value={brief.concept}
              onChange={(event) => setBrief({ ...brief, concept: event.target.value })}
              required
              rows={4}
              placeholder="Describe your analytics focus, business impact, and presentation style."
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-200 shadow-inner outline-none transition focus:border-cyan-400/40"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Focus Area
              </label>
              <select
                value={brief.industry}
                onChange={(event) => setBrief({ ...brief, industry: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-3.5 text-sm text-slate-200 outline-none transition focus:border-cyan-400/40"
              >
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Accent Color
              </label>
              <input
                type="color"
                value={brief.primaryColorPreference || portfolioTheme.colors.primary}
                onChange={(event) => setBrief({ ...brief, primaryColorPreference: event.target.value })}
                className="h-12 w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-950/70 p-1"
              />
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Presentation Style
              </label>
              <span className="text-xs text-slate-500">Presets</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.concept}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <p className="text-sm font-semibold text-white">{preset.mood}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{preset.industry}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-sm font-semibold text-white">Refresh preview instantly</p>
              <p className="text-sm text-slate-400">The live mockup remains stable and never falls back to a blank panel.</p>
            </div>
            <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
              {loading ? 'Updating...' : 'Refresh Preview'}
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <Lucide.Loader2 size={16} className="animate-spin text-cyan-300" />
            <span>{loadingCues[loadingStep]}</span>
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Active Portfolio</p>
            <h3 className="text-xl font-semibold text-white">{activeThemeSummary}</h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Live Preview
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Skills Spotlight</p>
            <p className="mt-2 text-sm text-slate-300">Python • SQL • Excel • Power BI • Pandas • NumPy • Statistics • Data Visualization</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Featured Focus</p>
            <p className="mt-2 text-sm text-slate-300">Dashboard storytelling, reporting automation, and actionable business insight.</p>
          </div>
        </div>
      </div>

      {savedThemes.length > 0 && (
        <div className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Saved Variants</p>
              <p className="text-sm text-slate-400">Switch between portfolio directions instantly.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              {savedThemes.length} Saved
            </span>
          </div>

          <div className="space-y-2.5">
            {savedThemes.map((theme) => (
              <div
                key={theme.id}
                className={`flex items-center justify-between rounded-2xl border bg-white/5 p-3.5 transition ${
                  activeTheme?.id === theme.id ? 'border-cyan-400/40 shadow-sm' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button type="button" onClick={() => onSelectSavedTheme(theme)} className="flex items-center gap-3 text-left">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                  <div>
                    <p className="text-sm font-semibold text-white">{theme.name}</p>
                    <p className="text-xs text-slate-400">{theme.brandCopy.tagline}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSavedTheme(theme.id)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
                  aria-label="Delete saved theme"
                >
                  <Lucide.Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
