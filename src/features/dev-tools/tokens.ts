// Display data for the design tokens reference screen. The values here are
// shown as text so they can be checked against global.css by eye; components
// must still style with the token classes, never with these hex strings.

export type ColourToken = {
  name: string;
  value: string;
  /** Full class name so Tailwind can find it. */
  swatchClass: string;
  /** The text colour token used on this colour, with its sample class. */
  textOn: { token: string; className: string } | { token: string; note: string };
};

const onInk = { token: 'ink', className: 'text-ink' };
const onAccent = { token: 'on-accent', className: 'text-on-accent' };

export const colourTokens: ColourToken[] = [
  { name: 'ink', value: '#2A2238', swatchClass: 'bg-ink', textOn: onAccent },
  { name: 'ink-secondary', value: '#4A4058', swatchClass: 'bg-ink-secondary', textOn: onAccent },
  { name: 'ink-muted', value: '#5A5068', swatchClass: 'bg-ink-muted', textOn: onAccent },
  { name: 'surface', value: '#FFFDF8', swatchClass: 'bg-surface', textOn: onInk },
  { name: 'surface-raised', value: '#FFFFFF', swatchClass: 'bg-surface-raised', textOn: onInk },
  { name: 'surface-sunken', value: '#F1ECE4', swatchClass: 'bg-surface-sunken', textOn: onInk },
  { name: 'surface-warm', value: '#F6EFE6', swatchClass: 'bg-surface-warm', textOn: onInk },
  { name: 'surface-lilac', value: '#F1EDF6', swatchClass: 'bg-surface-lilac', textOn: onInk },
  { name: 'border', value: '#E8E1D8', swatchClass: 'bg-border', textOn: onInk },
  { name: 'border-strong', value: '#6E6680', swatchClass: 'bg-border-strong', textOn: onAccent },
  { name: 'accent', value: '#4B3BAF', swatchClass: 'bg-accent', textOn: onAccent },
  { name: 'accent-soft', value: '#E6E3F4', swatchClass: 'bg-accent-soft', textOn: onInk },
  { name: 'on-accent', value: '#FFFFFF', swatchClass: 'bg-on-accent', textOn: onInk },
  { name: 'status-full', value: '#11704A', swatchClass: 'bg-status-full', textOn: { token: 'on-accent', note: 'icons only' } },
  { name: 'status-full-tint', value: '#DDF2E4', swatchClass: 'bg-status-full-tint', textOn: { token: 'status-full-ink', className: 'text-status-full-ink' } },
  { name: 'status-full-ink', value: '#0B4F33', swatchClass: 'bg-status-full-ink', textOn: onAccent },
  { name: 'status-partial', value: '#F2A900', swatchClass: 'bg-status-partial', textOn: onInk },
  { name: 'status-partial-tint', value: '#FCEBC2', swatchClass: 'bg-status-partial-tint', textOn: { token: 'status-partial-ink', className: 'text-status-partial-ink' } },
  { name: 'status-partial-ink', value: '#5C3600', swatchClass: 'bg-status-partial-ink', textOn: onAccent },
  { name: 'status-none', value: '#B3261E', swatchClass: 'bg-status-none', textOn: { token: 'on-accent', note: 'icons only' } },
  { name: 'status-none-tint', value: '#FCE4E1', swatchClass: 'bg-status-none-tint', textOn: { token: 'status-none-ink', className: 'text-status-none-ink' } },
  { name: 'status-none-ink', value: '#7F1A15', swatchClass: 'bg-status-none-ink', textOn: onAccent },
  { name: 'pin-label-full', value: '#1F4D24', swatchClass: 'bg-pin-label-full', textOn: onAccent },
  { name: 'pin-label-partial', value: '#6B3E00', swatchClass: 'bg-pin-label-partial', textOn: onAccent },
  { name: 'pin-label-none', value: '#8C1D18', swatchClass: 'bg-pin-label-none', textOn: onAccent },
  { name: 'focus', value: '#FFD43B', swatchClass: 'bg-focus', textOn: onInk },
  { name: 'location', value: '#1A73E8', swatchClass: 'bg-location', textOn: { token: 'none', note: 'position dot, no text' } },
  { name: 'scrim', value: 'rgba(42, 34, 56, 0.35)', swatchClass: 'bg-scrim', textOn: onInk },
];

export const typeTokens = [
  { variant: 'display', spec: '26 / 30 bold' },
  { variant: 'heading', spec: '19 / 24 bold' },
  { variant: 'button', spec: '18 / 24 bold' },
  { variant: 'body', spec: '17 / 25 regular' },
  { variant: 'secondary', spec: '16 / 22 regular' },
  { variant: 'caption', spec: '15 / 20 regular' },
  { variant: 'tab', spec: '14 / 18 bold' },
  { variant: 'pin', spec: '13 / 16 bold' },
] as const;

export const radiusTokens = [
  { name: 'sheet', value: '28', className: 'rounded-sheet' },
  { name: 'card', value: '18', className: 'rounded-card' },
  { name: 'toast', value: '16', className: 'rounded-toast' },
  { name: 'pill', value: 'full', className: 'rounded-full' },
] as const;
