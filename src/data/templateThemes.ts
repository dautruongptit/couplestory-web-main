// One visual identity per template. DynamicStoryTemplate reads this to render the same
// StoryData with genuinely different color, type and decorative treatment per
// template_id - not just a different accent color on an identical layout.

export type PhotoFrame = 'clean' | 'polaroid' | 'arch' | 'ornate';
export type Divider = 'line' | 'ornate' | 'dots' | 'none';

export interface TemplateTheme {
  code: string;
  label: string;
  bg: string;            // page background
  surface: string;       // card/section background
  surfaceAlt: string;    // secondary section background (alternating sections)
  ink: string;           // primary text
  inkSoft: string;       // secondary text
  accent: string;        // primary accent (numbers, icons, highlights)
  accentSoft: string;    // tint of accent for chips/backgrounds
  onAccent: string;      // text color on top of accent
  headlineFont: string;  // Tailwind font-family utility class already defined in index.css
  headlineStyle: 'upright' | 'italic';
  bodyFont: string;
  heroTreatment: 'photo-dark' | 'gradient' | 'photo-light';
  heroGradient?: string; // used when heroTreatment === 'gradient'
  photoFrame: PhotoFrame;
  divider: Divider;
}

export const DEFAULT_TEMPLATE_CODE = 'minimal-couple';

export const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  'minimal-couple': {
    code: 'minimal-couple',
    label: 'Minimal Couple',
    bg: '#FBF3EC',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EAE0',
    ink: '#2B211C',
    inkSoft: '#6B5D54',
    accent: '#C97B63',
    accentSoft: '#F0DDD3',
    onAccent: '#FFFFFF',
    headlineFont: 'font-headline-lg',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-light',
    photoFrame: 'clean',
    divider: 'line',
  },
  'eternal-love': {
    code: 'eternal-love',
    label: 'Eternal Love',
    bg: '#0F0509',
    surface: '#1A0A12',
    surfaceAlt: '#160710',
    ink: '#F5E9EE',
    inkSoft: '#C9A9B5',
    accent: '#D4AF6A',
    accentSoft: '#3A2A1A',
    onAccent: '#160710',
    headlineFont: 'font-headline-lg',
    headlineStyle: 'italic',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-dark',
    photoFrame: 'clean',
    divider: 'ornate',
  },
  'autumn-paris': {
    code: 'autumn-paris',
    label: 'Autumn Paris Romance',
    bg: '#F2E8DC',
    surface: '#FFFDF8',
    surfaceAlt: '#EADFCE',
    ink: '#4A3B32',
    inkSoft: '#8A7364',
    accent: '#C1694A',
    accentSoft: '#EAD9CB',
    onAccent: '#FFFFFF',
    headlineFont: 'font-headline-lg',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-light',
    photoFrame: 'arch',
    divider: 'dots',
  },
  'sunset-horizon': {
    code: 'sunset-horizon',
    label: 'Sunset Horizon',
    bg: '#FFF8F3',
    surface: '#FFFFFF',
    surfaceAlt: '#FFEDE1',
    ink: '#3A2A2E',
    inkSoft: '#7A5D5F',
    accent: '#FF6F91',
    accentSoft: '#FFE1E9',
    onAccent: '#FFFFFF',
    headlineFont: 'font-title-lg',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'gradient',
    heroGradient: 'linear-gradient(180deg, #FFB27A 0%, #FF6F91 55%, #4A2545 100%)',
    photoFrame: 'clean',
    divider: 'line',
  },
  'sweet-polaroid': {
    code: 'sweet-polaroid',
    label: 'Sweet Polaroid Story',
    bg: '#FFF6F2',
    surface: '#FFFFFF',
    surfaceAlt: '#FFE9DE',
    ink: '#4A3540',
    inkSoft: '#8A6E78',
    accent: '#FF8FAB',
    accentSoft: '#FFE1EC',
    onAccent: '#4A3540',
    headlineFont: 'font-dancing',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-light',
    photoFrame: 'polaroid',
    divider: 'dots',
  },
  'romantic-anniversary': {
    code: 'romantic-anniversary',
    label: 'Romantic Anniversary',
    bg: '#FFF0F5',
    surface: '#FFFFFF',
    surfaceAlt: '#FCE4EC',
    ink: '#3E2723',
    inkSoft: '#6D4C5E',
    accent: '#E91E8C',
    accentSoft: '#FDDDE6',
    onAccent: '#FFFFFF',
    headlineFont: 'font-dancing',
    headlineStyle: 'italic',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-light',
    photoFrame: 'clean',
    divider: 'dots',
  },
  'memory-wall': {
    code: 'memory-wall',
    label: 'Romantic Memory Wall',
    bg: '#FDF6EE',
    surface: '#FFFFFF',
    surfaceAlt: '#F5ECE0',
    ink: '#3B2F2F',
    inkSoft: '#7A6B60',
    accent: '#E07A5F',
    accentSoft: '#FADDD1',
    onAccent: '#FFFFFF',
    headlineFont: 'font-dancing',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-light',
    photoFrame: 'polaroid',
    divider: 'none',
  },
  'royal-wedding': {
    code: 'royal-wedding',
    label: 'Royal Wedding Memoir',
    bg: '#FAF6EC',
    surface: '#FFFFFF',
    surfaceAlt: '#F1E7D0',
    ink: '#2A2218',
    inkSoft: '#75674F',
    accent: '#B08D3D',
    accentSoft: '#EFE3C2',
    onAccent: '#FFFFFF',
    headlineFont: 'font-headline-lg',
    headlineStyle: 'upright',
    bodyFont: 'font-body-md',
    heroTreatment: 'photo-dark',
    photoFrame: 'ornate',
    divider: 'ornate',
  },
};

export function getTemplateTheme(templateId: string | undefined): TemplateTheme {
  if (templateId && TEMPLATE_THEMES[templateId]) return TEMPLATE_THEMES[templateId];
  return TEMPLATE_THEMES[DEFAULT_TEMPLATE_CODE];
}
