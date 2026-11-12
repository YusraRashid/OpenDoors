import { router } from 'expo-router';
import { View } from 'react-native';

import { AppText, Button, Screen } from '@/ui';

export default function ExploreScreen() {
  return (
    <Screen title="Explore">
      <View className="gap-6 px-4">
        <AppText>The map arrives in step 1.4.</AppText>
        {__DEV__ ? (
          <Button label="Open design tokens" onPress={() => router.push('/dev/tokens')} />
        ) : null}
      </View>
    </Screen>
  );
}
