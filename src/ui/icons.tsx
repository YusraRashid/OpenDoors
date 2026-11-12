import Svg, { Circle, Path } from 'react-native-svg';
import { styled } from 'nativewind';

// Lets icons take a text colour class (`className="text-accent"`), which is
// mapped onto Svg's `color` prop and drawn through `currentColor`.
const TokenSvg = styled(Svg, {
  className: { target: false, nativeStyleMapping: { color: 'color' } },
});

type IconProps = {
  /** A text colour token class, for example `text-accent`. */
  className?: string;
  size?: number;
};

// Icons are decorative: the control that contains them carries the label.
const hidden = {
  accessible: false,
  importantForAccessibility: 'no-hide-descendants',
  accessibilityElementsHidden: true,
} as const;

export function MapPinIcon({ className, size = 24 }: IconProps) {
  return (
    <TokenSvg {...hidden} className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21.5s-7-6.1-7-11.5a7 7 0 0 1 14 0c0 5.4-7 11.5-7 11.5Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={2.6} stroke="currentColor" strokeWidth={2} />
    </TokenSvg>
  );
}

export function BookmarkIcon({ className, size = 24 }: IconProps) {
  return (
    <TokenSvg {...hidden} className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.5-7 4.5v-16a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </TokenSvg>
  );
}

export function PlusCircleIcon({ className, size = 24 }: IconProps) {
  return (
    <TokenSvg {...hidden} className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={2} />
      <Path d="M12 7.5v9M7.5 12h9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </TokenSvg>
  );
}
