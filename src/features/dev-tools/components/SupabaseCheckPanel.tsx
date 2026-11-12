import { useEffect } from 'react';
import { View } from 'react-native';

import { isSupabaseConfigured } from '@/lib/env';
import { announce } from '@/lib/announce';
import { AppText, Button } from '@/ui';

import { useLocationsCheck } from '../api/locationsCheck';

function useStatusMessage(): { message: string; busy: boolean } {
  const check = useLocationsCheck();
  if (!isSupabaseConfigured) return { message: 'Supabase is not configured', busy: false };
  if (check.isFetching) return { message: 'Checking the connection…', busy: true };
  if (check.isError) return { message: check.error.message, busy: false };
  if (check.isSuccess) {
    const n = check.data;
    return { message: `Connected: ${n} ${n === 1 ? 'place' : 'places'} returned`, busy: false };
  }
  return { message: 'Not checked yet', busy: false };
}

export function SupabaseCheckPanel() {
  const check = useLocationsCheck();
  const { message, busy } = useStatusMessage();

  // The result arrives away from focus, so announce it (CLAUDE.md rule 9).
  useEffect(() => {
    if (!busy && isSupabaseConfigured && (check.isSuccess || check.isError)) {
      announce(`Supabase check: ${message}`);
    }
  }, [busy, check.isSuccess, check.isError, message]);

  return (
    <View className="gap-3 rounded-card border border-border-strong bg-surface-raised p-4">
      <AppText variant="heading" accessibilityRole="header">
        Supabase check
      </AppText>
      <AppText accessibilityLiveRegion="polite">{message}</AppText>
      {isSupabaseConfigured ? (
        <Button
          label="Check again"
          variant="quiet"
          size="touch"
          className="self-start"
          disabled={busy}
          accessibilityState={{ busy }}
          onPress={() => void check.refetch()}
        />
      ) : null}
    </View>
  );
}
