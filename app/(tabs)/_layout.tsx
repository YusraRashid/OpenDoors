import { Tabs } from 'expo-router';

import { BookmarkIcon, MapPinIcon, PlusCircleIcon, TabBar } from '@/ui';

const iconClass = (focused: boolean) => (focused ? 'text-accent' : 'text-ink-secondary');

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Explore', tabBarIcon: ({ focused }) => <MapPinIcon className={iconClass(focused)} /> }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: 'Saved', tabBarIcon: ({ focused }) => <BookmarkIcon className={iconClass(focused)} /> }}
      />
      <Tabs.Screen
        name="contribute"
        options={{
          title: 'Contribute',
          tabBarIcon: ({ focused }) => <PlusCircleIcon className={iconClass(focused)} />,
        }}
      />
    </Tabs>
  );
}
