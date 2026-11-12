import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from './AppText';

type ScreenProps = {
  title: string;
  children?: ReactNode;
  /** Shown before the title, for example a back button. */
  leading?: ReactNode;
};

/** A plain screen with a header title on `surface`, inside the top safe area. */
export function Screen({ title, children, leading }: ScreenProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-surface">
      <View className="gap-2 px-4 pb-2 pt-4">
        {leading}
        <AppText variant="display" accessibilityRole="header">
          {title}
        </AppText>
      </View>
      {children}
    </SafeAreaView>
  );
}
