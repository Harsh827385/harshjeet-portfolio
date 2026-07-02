/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CreativeBrief {
  concept: string;
  industry: string;
  mood: string;
  primaryColorPreference?: string;
}

export interface BrandCopy {
  tagline: string;
  elevatorPitch: string;
  coreValues: {
    title: string;
    description: string;
  }[];
  heroTitle: string;
  heroSubtitle: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  subtext: string;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  headingStyle: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  iconName: string; // Will map to Lucide icons
}

export interface UiMockup {
  layoutType: 'bento' | 'split' | 'minimalist-hero' | 'feature-grid';
  navigation: string[];
  features: FeatureCard[];
  callToAction: string;
}

export interface AIAestheticTheme {
  id: string;
  name: string;
  moodDescription: string;
  colors: ColorPalette;
  typography: TypographyConfig;
  imageryKeywords: string[];
  brandCopy: BrandCopy;
  uiMockup: UiMockup;
  createdAt: number;
}
