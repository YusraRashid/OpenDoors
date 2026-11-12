import { Pressable, type PressableProps } from 'react-native';

import { AppText } from './AppText';

export type ButtonProps = Omit<PressableProps, 'children' | 'className'> & {
  label: string;
  variant?: 'primary' | 'quiet';
  /** `control` (56 pt) for primary actions, `touch` (44 pt) for secondary ones. */
  size?: 'control' | 'touch';
  className?: string;
};

const variantClass = {
  primary: 'bg-accent',
  quiet: 'bg-surface-sunken border border-border-strong',
} as const;

const sizeClass = {
  control: 'min-h-control px-6 py-3',
  touch: 'min-h-touch min-w-touch px-4 py-2',
} as const;

/**
 * A labelled button. Its visible text is its accessible name. Grows with text
 * size: only minimum heights are set, never fixed ones.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'control',
  className,
  disabled,
  accessibilityState,
  ...rest
}: ButtonProps) {
  const state = { ...accessibilityState, disabled: !!disabled };
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={state}
      disabled={disabled}
      className={`items-center justify-center rounded-full active:opacity-80 ${sizeClass[size]} ${variantClass[variant]} ${disabled ? 'opacity-50' : ''} ${className ?? ''}`}
      {...rest}>
      <AppText variant="button" tone={variant === 'primary' ? 'on-accent' : 'ink'} className="text-center">
        {label}
      </AppText>
    </Pressable>
  );
}
