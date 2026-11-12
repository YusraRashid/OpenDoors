import { AccessibilityInfo } from 'react-native';

/** Tell screen reader users about a change that happened away from focus. */
export function announce(message: string): void {
  AccessibilityInfo.announceForAccessibility(message);
}
