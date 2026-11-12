import { View } from 'react-native';

import { AppText, Screen } from '@/ui';

export default function SavedScreen() {
  return (
    <Screen title="Saved">
      <View className="px-4">
        <AppText>Saved places are coming in the next release.</AppText>
      </View>
    </Screen>
  );
}
