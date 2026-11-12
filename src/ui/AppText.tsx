import { Text, type TextProps } from 'react-native';

export type TextVariant =
  | 'display'
  | 'heading'
  | 'button'
  | 'body'
  | 'secondary'
  | 'caption'
  | 'tab'
  | 'pin';

export type TextTone =
  | 'ink'
  | 'ink-secondary'
  | 'ink-muted'
  | 'accent'
  | 'on-accent'
  | 'status-full-ink'
  | 'status-partial-ink'
  | 'status-none-ink'
  | 'pin-label-full'
  | 'pin-label-partial'
  | 'pin-label-none';

// Class names are written out in full so Tailwind can find them.
// Bold variants use the bold font family: React Native does not synthesise
// weights for custom fonts, so fontWeight alone would not switch files.
const variantClass: Record<TextVariant, string> = {
  display: 'text-display font-atkinson-bold',
  heading: 'text-heading font-atkinson-bold',
  button: 'text-button font-atkinson-bold',
  body: 'text-body font-atkinson',
  secondary: 'text-secondary font-atkinson',
  caption: 'text-caption font-atkinson',
  tab: 'text-tab font-atkinson-bold',
  pin: 'text-pin font-atkinson-bold',
};

const toneClass: Record<TextTone, string> = {
  ink: 'text-ink',
  'ink-secondary': 'text-ink-secondary',
  'ink-muted': 'text-ink-muted',
  accent: 'text-accent',
  'on-accent': 'text-on-accent',
  'status-full-ink': 'text-status-full-ink',
  'status-partial-ink': 'text-status-partial-ink',
  'status-none-ink': 'text-status-none-ink',
  'pin-label-full': 'text-pin-label-full',
  'pin-label-partial': 'text-pin-label-partial',
  'pin-label-none': 'text-pin-label-none',
};

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
};

/** Use instead of Text everywhere. Font scaling always stays on. */
export function AppText({ variant = 'body', tone = 'ink', className, ...rest }: AppTextProps) {
  const classes = [variantClass[variant], toneClass[tone], className].filter(Boolean).join(' ');
  return <Text {...rest} className={classes} />;
}
