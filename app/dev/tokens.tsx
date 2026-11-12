import { Redirect, router } from 'expo-router';

import { TokensReference } from '@/features/dev-tools';
import { Button, Screen } from '@/ui';

export default function DesignTokensScreen() {
  // Development builds only.
  if (!__DEV__) return <Redirect href="/" />;

  return (
    <Screen
      title="Design tokens"
      leading={
        <Button label="Back" variant="quiet" size="touch" className="self-start" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        />
      }>
      <TokensReference />
    </Screen>
  );
}
