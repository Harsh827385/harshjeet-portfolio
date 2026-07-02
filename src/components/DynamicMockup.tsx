/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import * as Lucide from 'lucide-react';
import { AIAestheticTheme } from '../types';

interface DynamicMockupProps {
  theme: AIAestheticTheme | null;
}

// Fail-safe dynamic icon renderer using Lucide exports
export function DynamicIcon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  // Map string to actual Lucide component
  const IconComponent = (Lucide as any)[name] || Lucide.Sparkles;
  return <IconComponent className={className} size={size} />;
}

export default function DynamicMockup({ theme }: DynamicMockupProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Dynaimcally inject suggested Google Fonts
  useEffect(() => {
    if (!theme) return;
    const fonts = [theme.typography.headingFont, theme.typography.bodyFont];
    const formattedFonts = fonts.map(f => f.trim().replace(/\s+/g, '+') + ':wght@300;400;500;600;700');
    
    const linkId = 'aesthetic-studio-fonts';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFonts.join('&family=')}&display=swap`;
  }, [theme?.typography.headingFont, theme?.typography.bodyFont]);

  // Map generated keywords to standard high-quality hotlinked images using Unsplash Source API
  useEffect(() => {
    if (!theme) return;
    const keywords = theme.imageryKeywords || ['design', 'minimalist', 'vibe'];
    // Generate hotlinked image URLs with varying dimension profiles
    const urls = [
      `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80&sig=0`,
      `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80&sig=1`,
      `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80&sig=2`
    ];

    // Build smart Unsplash search urls based on generated themes' precise industry context
    const industryKey = encodeURIComponent(theme.imageryKeywords?.[0] || 'minimal');
    const conceptKey = encodeURIComponent(theme.imageryKeywords?.[1] || 'abstract');
    const moodKey = encodeURIComponent(theme.imageryKeywords?.[2] || 'architecture');

    const curatedUrls = [
      `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop`, // Primary high-res interior/abstract
      `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop`, // Artistic detail gradient
      `https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop`  // Modern spatial layout
    ];

    // Set curated background images fallback to custom term-guided picsum/unsplash tags
   setImageUrls([
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  "https://images.unsplash.com/photo-1543286386-713bdd548da4"
]); 
  }, [theme]);

  if (!theme) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center text-[#64748b]">
        <div className="w-16 h-16 rounded-full border border-dashed border-[#cbd5e1] flex items-center justify-center mb-4">
          <Lucide.Layout className="opacity-40 animate-pulse" size={28} />
        </div>
        <h3 className="font-sans font-medium text-[#1e293b] text-base mb-1">Theme Live Canvas</h3>
        <p className="font-sans text-sm max-w-sm">
          Formulate or load an aesthetic theme inside the designer to view its live high-fidelity landing page mockup.
        </p>
      </div>
    );
  }

  // Create local CSS variables
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
    '--font-body': theme.typography.bodyFont,
  } as React.CSSProperties;

  // Render features
  const renderFeatures = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {theme.uiMockup.features.map((feat, index) => (
          <div
            key={index}
            style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            className="p-6 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div
              style={{ backgroundColor: `${theme.colors.accent}12`, color: theme.colors.accent }}
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            >
              <DynamicIcon name={feat.iconName} size={22} />
            </div>
            <h4
              style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }}
              className="text-lg font-semibold tracking-tight mb-2"
            >
              {feat.title}
            </h4>
            <p style={{ color: theme.colors.subtext }} className="text-sm leading-relaxed">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={cssVars}
      className="w-full h-full min-h-[550px] overflow-y-auto select-none rounded-2xl shadow-inner border border-zinc-200/50 flex flex-col font-sans transition-all duration-500 bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {/* Dynamic Browser Bar Header */}
      <div className="sticky top-0 z-20 px-6 py-3 border-b bg-white border-zinc-200/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f87171] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#fbbf24] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#34d399] inline-block"></span>
          </div>
          <div className="bg-zinc-100/90 text-zinc-500 font-mono text-[10px] tracking-wider py-1 px-4 rounded-full ml-3 border border-zinc-200/40 select-none max-w-xs truncate">
           harshjeetchauhanportfolio.com
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#eff6ff] text-[#3b82f6] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-[#bfdbfe]">
            PROJECTS
          </span>
          <span style={{ color: theme.colors.accent }} className="font-mono text-xs tracking-tight font-medium">
            {theme.uiMockup.layoutType.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Website Frame Wrapper */}
      <div className="flex-1 flex flex-col py-2" style={{ fontFamily: theme.typography.bodyFont }}>
        
        {/* Navigation Bar */}
        <header
          style={{ borderColor: `${theme.colors.border}40`, backgroundColor: `${theme.colors.background}95` }}
          className="px-8 py-5 border-b sticky top-[45px] z-10 backdrop-blur-md flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})` }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            >
              <Lucide.Compass size={18} className="animate-spin-slow" />
            </div>
            <span
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-lg font-bold tracking-tight"
            >
              {"Harshjeet"}
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 ml-6">
  {["Home", "Projects", "Skills", "Experience"].map((navItem, index) => (
    <a
      key={index}
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{ color: theme.colors.subtext }}
      className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
    >
      {navItem}
    </a>
  ))}

  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    className="px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-md"
    style={{
      background: "linear-gradient(135deg, #2563EB, #1D4ED8)"
    }}
  >
    Contact
  </a>
</nav>

          <button
            style={{ backgroundColor: theme.colors.primary }}
            className="px-4.5 py-2 rounded-xl text-white text-xs font-semibold tracking-tight shadow-sm transition-opacity hover:opacity-90 active:scale-95 duration-150"
          >
            View Portfolio
          </button>
        </header>

        {/* Dynamic Website Content Body */}
        <main className="flex-1 p-8 md:p-12">
          
          {/* RENDER BENTO LAYOUT */}
          {theme.uiMockup.layoutType === 'bento' && (
            <div className="space-y-8">
              {/* Bento Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Large Intro Grid Item */}
                <div
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                  className="lg:col-span-2 p-8 md:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-[0_4px_30px_rgb(0,0,0,0.01)]"
                >
                  <div className="space-y-4">
                    <span
                      style={{ color: theme.colors.accent, borderColor: `${theme.colors.accent}40`, backgroundColor: `${theme.colors.accent}12` }}
                      className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
                    >
                      {theme.brandCopy.tagline}
                    </span>
                    <h1
                      style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }}
                      className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none"
                    >
                     {"Data-Driven Decisions. Real Business Impact."}
                    </h1>
                    <p style={{ color: theme.colors.subtext }} className="text-base leading-relaxed max-w-xl">
                      {theme.brandCopy.heroSubtitle}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-8 flex-wrap">
                    <button
                      style={{ backgroundColor: theme.colors.primary }}
                      className="px-6 py-3 rounded-2xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity active:scale-95"
                    >
                      {theme.uiMockup.callToAction}
                    </button>
                    <button
                      style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                      className="px-6 py-3 rounded-2xl border text-sm font-semibold hover:bg-[var(--color-surface)] bg-transparent transition-colors"
                    >
                      Explore Case Study
                    </button>
                  </div>
                </div>

                {/* Imagery / Aesthetic Grid Item */}
                <div
                  style={{ borderColor: theme.colors.border }}
                  className="rounded-3xl border overflow-hidden relative group min-h-[250px] aspect-square lg:aspect-auto"
                >
                  <img
                    src={imageUrls[0]}
                    alt="Scenic brand vibe"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <h4 className="text-white text-lg font-bold tracking-tight mb-1" style={{ fontFamily: theme.typography.headingFont }}>
                      Data Analytics Insights
                    </h4>
                    <p className="text-zinc-200 text-xs">Architecting unique digital landscapes</p>
                  </div>
                </div>
              </div>

              {/* Bento Row 2: Pitch & Values */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Value Pitch Banner */}
                <div
                  style={{ backgroundColor: `${theme.colors.secondary}12`, borderColor: theme.colors.border }}
                  className="p-8 rounded-3xl border flex flex-col justify-center gap-3 lg:col-span-1"
                >
                  
                </div>

                {/* Sub Features Array */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {theme.brandCopy.coreValues.map((val, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                      className="p-6 rounded-3xl border flex gap-4"
                    >
                      <div
                        style={{ color: theme.colors.accent, backgroundColor: `${theme.colors.accent}12` }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <DynamicIcon name={idx === 0 ? 'Zap' : idx === 1 ? 'Shield' : 'Activity'} size={18} />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: theme.typography.headingFont }} className="text-sm font-bold tracking-tight mb-1">
                          {val.title}
                        </h4>
                        <p style={{ color: theme.colors.subtext }} className="text-xs leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* RENDER SPLIT LAYOUT */}
          {theme.uiMockup.layoutType === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center py-4">
              
              {/* Product Info Column */}
              <div className="space-y-6">
                <span
                  style={{ color: theme.colors.accent }}
                  className="text-xs font-bold tracking-widest uppercase block"
                >
                  {theme.brandCopy.tagline}
                </span>
                
                <h1
                  style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }}
                  className="text-4.5xl font-extrabold tracking-tight leading-tight"
                >
                {"Data-Driven Decisions. Real Business Impact."}
                </h1>

                <p style={{ color: theme.colors.subtext }} className="text-base leading-relaxed">
                  {theme.brandCopy.heroSubtitle}
                </p>

                <div className="p-5 border-l-2 rounded-r-2xl" style={{ borderColor: theme.colors.primary, backgroundColor: `${theme.colors.surface}` }}>
                  <p style={{ color: theme.colors.text }} className="text-sm font-medium italic">
                    "{theme.brandCopy.elevatorPitch}"
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    style={{ backgroundColor: theme.colors.primary }}
                    className="px-6 py-3.5 rounded-2xl text-white text-sm font-bold shadow-md hover:translate-y-[-2px] transition-transform duration-150"
                  >
                    {theme.uiMockup.callToAction}
                  </button>
                  <button
                    style={{ borderColor: theme.colors.border }}
                    className="px-6 py-3.5 rounded-2xl border text-sm font-semibold hover:bg-zinc-100"
                  >
                    Explore Projects
                  </button>
                </div>
              </div>

              {/* Graphical Visualizers Column */}
              <div className="space-y-6">
                <div
                  style={{ borderColor: theme.colors.border }}
                  className="rounded-3xl border overflow-hidden aspect-[4/3] relative"
                >
                  <img
                    src={imageUrls[1]}
                    alt="Brand visual alignment"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    style={{ backgroundColor: `${theme.colors.surface}f2`, borderColor: theme.colors.border }}
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full animate-ping shrink-0" style={{ backgroundColor: theme.colors.accent }}></span>
                      <span className="text-xs font-mono font-semibold truncate tracking-tight">{theme.name} Workspace config</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">ACTIVE</span>
                  </div>
                </div>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {theme.brandCopy.coreValues.slice(0, 2).map((val, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                      className="p-5 rounded-2xl border"
                    >
                      <h4 style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }} className="text-xs font-bold uppercase tracking-widest mb-1.5">
                        {val.title}
                      </h4>
                      <p style={{ color: theme.colors.subtext }} className="text-[11px] leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* RENDER MINIMALIST-HERO LAYOUT */}
          {theme.uiMockup.layoutType === 'minimalist-hero' && (
            <div className="py-8 space-y-12">
              {/* Centered Hero Heading */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span
                  style={{ color: theme.colors.accent, borderColor: `${theme.colors.accent}30` }}
                  className="inline-block px-4 py-1 border rounded-full text-[11px] uppercase tracking-widest font-extrabold"
                >
                  {theme.brandCopy.tagline}
                </span>
                
                <h1
                  style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }}
                  className="text-4xl md:text-5.5xl font-extrabold tracking-tight leading-none"
                >
                {"Data-Driven Decisions. Real Business Impact."}
                </h1>
                
                <p style={{ color: theme.colors.subtext }} className="text-base leading-relaxed md:px-6">
                  {theme.brandCopy.heroSubtitle}
                </p>

                <div className="flex justify-center gap-3.5 pt-6">
                  <button
                    style={{ backgroundColor: theme.colors.primary }}
                    className="px-7 py-3.5 rounded-xl text-white text-sm font-bold shadow-xl transition-all hover:brightness-105"
                  >
                    {theme.uiMockup.callToAction}
                  </button>
                  <button
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    className="px-7 py-3.5 border rounded-xl text-sm font-medium hover:bg-zinc-50"
                  >
                    View Gallery
                  </button>
                </div>
              </div>

              {/* Big Minimal Canvas Backdrop */}
              <div
                style={{ borderColor: theme.colors.border }}
                className="rounded-3xl border overflow-hidden relative shadow-lg min-h-[350px]"
              >
                <img
                  src={imageUrls[0]}
                  alt="Minimal backdrop graphic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[350px] object-cover"
                />
                
                {/* Absolute Floating Brand Pitch Box */}
                <div
                  style={{ backgroundColor: `${theme.colors.surface}e6`, borderColor: theme.colors.border }}
                  className="absolute bottom-6 right-6 p-6 md:p-8 rounded-2xl border max-w-sm backdrop-blur-md hidden sm:block shadow-md"
                >
                  <p className="text-xs uppercase font-extrabold tracking-widest mb-2" style={{ color: theme.colors.accent }}>
                    The Manifesto
                  </p>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: theme.colors.text }}>
                    {theme.brandCopy.elevatorPitch}
                  </p>
                </div>
              </div>

              {/* Standard grids inside minimal layout */}
              <div className="pt-4">
                <hr style={{ borderColor: `${theme.colors.border}40` }} className="mb-10" />
                {renderFeatures()}
              </div>
            </div>
          )}


          {/* RENDER FEATURE-GRID LAYOUT */}
          {theme.uiMockup.layoutType === 'feature-grid' && (
            <div className="space-y-14">
              {/* Grid Top Block */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
                <div className="lg:col-span-2 space-y-4">
                  <span style={{ color: theme.colors.accent }} className="text-xs font-bold uppercase tracking-widest block">
                    {theme.brandCopy.tagline}
                  </span>
                  <h1
                    style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }}
                    className="text-3.5xl md:text-5xl font-extrabold tracking-tight"
                  >
                   {"Data-Driven Decisions. Real Business Impact."}
                  </h1>
                </div>
                <div>
                  <p style={{ color: theme.colors.subtext }} className="text-sm leading-relaxed mb-4">
                    {theme.brandCopy.heroSubtitle}
                  </p>
                  <button
                    style={{ backgroundColor: theme.colors.primary }}
                    className="w-full py-3 px-6 rounded-2xl text-white text-sm font-bold shadow-md"
                  >
                    {theme.uiMockup.callToAction}
                  </button>
                </div>
              </div>

              {/* 3 Core Value Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {theme.brandCopy.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                    className="p-6 rounded-2xl border"
                  >
                    <div
                      style={{ color: theme.colors.accent, backgroundColor: `${theme.colors.accent}12` }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    >
                      <span className="font-mono text-sm font-bold">0{idx + 1}</span>
                    </div>
                    <h3 style={{ fontFamily: theme.typography.headingFont, color: theme.colors.text }} className="text-base font-bold mb-2">
                      {val.title}
                    </h3>
                    <p style={{ color: theme.colors.subtext }} className="text-xs leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Big Immersive Banner */}
              <div
                style={{ borderColor: theme.colors.border }}
                className="h-[280px] rounded-3xl border overflow-hidden relative shadow-sm"
              >
                <img
                  src={imageUrls[2]}
                  alt="Feature banner spatial"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent p-8 md:p-12 flex flex-col justify-center max-w-xl">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2" style={{ fontFamily: theme.typography.headingFont }}>
                    Innovative Brand Dimensions
                  </h3>
                  <p className="text-zinc-200 text-xs md:text-sm leading-relaxed mb-4">
                    {theme.brandCopy.elevatorPitch}
                  </p>
                  <span className="text-[10px] uppercase tracking-widest text-[#60a5fa] font-bold">
                  Built with Python, SQL & Power BI
                  </span>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Dynamic Website Footer */}
        <footer
          style={{ borderColor: `${theme.colors.border}40`, backgroundColor: `${theme.colors.surface}50` }}
          className="border-t px-8 py-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-2">
           <span style={{ fontFamily: theme.typography.headingFont }} className="font-bold tracking-tight text-sm">
  Harshjeet
</span>
            <span className="text-zinc-400 px-2 border-l border-zinc-200">Harshjeet Chauhan Portfolio</span>
          </div>
          <div className="flex items-center gap-6" style={{ color: theme.colors.subtext }}>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary)]">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary)]">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary)]">Brand Kit</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
