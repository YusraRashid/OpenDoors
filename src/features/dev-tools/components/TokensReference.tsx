import { ScrollView, View } from 'react-native';

import { announce } from '@/lib/announce';
import { AppText, Button } from '@/ui';

import { colourTokens, radiusTokens, typeTokens, type ColourToken } from '../tokens';
import { SupabaseCheckPanel } from './SupabaseCheckPanel';

function SectionTitle({ children }: { children: string }) {
  return (
    <AppText variant="heading" accessibilityRole="header" className="mt-4">
      {children}
    </AppText>
  );
}

function textOnLabel(t: ColourToken['textOn']) {
  return 'note' in t ? `${t.token} (${t.note})` : t.token;
}

function ColourSwatch({ token }: { token: ColourToken }) {
  const sample = 'className' in token.textOn ? token.textOn.className : null;
  return (
    // One accessible element per swatch, read as a unit (rule 11).
    <View
      accessible
      accessibilityLabel={`${token.name}, ${token.value}, text on it: ${textOnLabel(token.textOn)}`}
      className="flex-row flex-wrap items-center gap-3 rounded-card bg-surface-raised p-3">
      <View
        className={`min-h-control min-w-control items-center justify-center rounded-toast border border-border-strong ${token.swatchClass}`}>
        {sample ? (
          <AppText variant="button" className={sample}>
            Aa
          </AppText>
        ) : null}
      </View>
      <View className="min-w-0 flex-1 basis-40 gap-1">
        <AppText variant="button">{token.name}</AppText>
        <AppText variant="secondary" tone="ink-secondary">
          {token.value}
        </AppText>
        <AppText variant="secondary" tone="ink-secondary">
          Text on it: {textOnLabel(token.textOn)}
        </AppText>
      </View>
    </View>
  );
}

export function TokensReference() {
  return (
    <ScrollView className="flex-1 bg-surface" contentContainerClassName="gap-3 px-4 pb-10">
      <SectionTitle>Colours</SectionTitle>
      {colourTokens.map((token) => (
        <ColourSwatch key={token.name} token={token} />
      ))}

      <SectionTitle>Type</SectionTitle>
      {typeTokens.map(({ variant, spec }) => (
        <View key={variant} accessible className="gap-1 rounded-card bg-surface-raised p-3">
          <AppText variant={variant}>{variant}: The quick brown fox</AppText>
          <AppText variant="caption" tone="ink-secondary">
            {spec}
          </AppText>
        </View>
      ))}

      <SectionTitle>Radii</SectionTitle>
      <View className="flex-row flex-wrap gap-3">
        {radiusTokens.map((r) => (
          <View
            key={r.name}
            accessible
            accessibilityLabel={`Radius ${r.name}, ${r.value}`}
            className={`min-h-control min-w-control items-center justify-center border border-border-strong bg-accent-soft px-4 py-2 ${r.className}`}>
            <AppText variant="caption">
              {r.name} {r.value}
            </AppText>
          </View>
        ))}
      </View>

      <SectionTitle>Buttons</SectionTitle>
      <AppText variant="secondary" tone="ink-secondary">
        Samples. Activating one announces which was pressed.
      </AppText>
      <View className="flex-row flex-wrap items-start gap-3">
        <Button
          label="Touch 44"
          variant="quiet"
          size="touch"
          onPress={() => announce('Touch 44 sample pressed')}
        />
        <Button label="Control 56" size="control" onPress={() => announce('Control 56 sample pressed')} />
      </View>

      <SectionTitle>Shadow</SectionTitle>
      <View className="rounded-card bg-surface-raised p-4 shadow-raised">
        <AppText>raised: 0 2px 6px</AppText>
      </View>

      <View className="mt-4">
        <SupabaseCheckPanel />
      </View>
    </ScrollView>
  );
}
