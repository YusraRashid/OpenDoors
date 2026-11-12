import { View } from 'react-native';

import { AppText, Screen } from '@/ui';

export default function ContributeScreen() {
  return (
    <Screen title="Contribute">
      <View className="px-4">
        <AppText>Adding places is coming in the next release.</AppText>
      </View>
    </Screen>
  );
}
