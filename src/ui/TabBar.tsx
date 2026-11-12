import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './AppText';

// Expo Router does not export BottomTabBarProps from a public path, so take
// the type from the `tabBar` prop of its Tabs navigator.
type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/**
 * Bottom tab bar. Each tab is announced as "tab", with its label and selected
 * state. Icons come from each screen's `tabBarIcon` and are decorative.
 * The bar has a minimum height only, so it grows with text size.
 */
export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tabbar"
      className="min-h-tabbar flex-row border-t border-border bg-surface"
      style={{ paddingBottom: insets.bottom }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const focused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        };
        const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            onLongPress={onLongPress}
            className="min-h-touch flex-1 items-center justify-center gap-1 px-1 py-2">
            <View className={`items-center justify-center rounded-full px-5 py-1 ${focused ? 'bg-accent-soft' : ''}`}>
              {options.tabBarIcon?.({ focused, color: '', size: 24 })}
            </View>
            <AppText
              variant="tab"
              tone={focused ? 'ink' : 'ink-secondary'}
              className="text-center"
              // Three labels share the screen width and "Contribute" cannot
              // wrap; past 1.5x it would break mid-word. Allowed by CLAUDE.md
              // rule 3 for the tab bar only.
              maxFontSizeMultiplier={1.5}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
