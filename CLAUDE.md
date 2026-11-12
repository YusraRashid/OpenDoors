# OpenDoors

Native mobile app for finding and reviewing places by accessibility. Disabled people are the primary users. An inaccessible screen is a broken screen.

## Stack (do not change without being asked)

- Expo SDK 57, React Native, TypeScript (strict), Expo Router
- NativeWind v5 (release candidate) on Tailwind CSS v4; tokens live in `global.css`
- TanStack Query for server state, Zustand for client UI state
- Supabase (Postgres + PostGIS, Auth, Storage) through `src/lib/supabase.ts`
- react-native-maps with the Google provider on BOTH iOS and Android, added in step 1.4. Users tap Google's built-in places, which only the Google provider supports
- Development builds only (`expo-dev-client`); Expo Go is not supported
- `ios/` and `android/` are generated and not committed

## Structure

```
app/                 Expo Router routes. Thin: compose feature components, no logic.
src/features/<name>/ components/, hooks/, api/, types.ts, index.ts per feature
src/ui/              Shared primitives. No feature knowledge, no data fetching.
src/lib/             supabase client, query client, announce(), env
```

- A feature imports from `src/ui`, `src/lib` and its own folder. To use another feature, import only from that feature's `index.ts`.
- Supabase calls live in `src/features/<name>/api/`. Components never call Supabase directly.
- Server data goes through TanStack Query hooks with query keys defined beside the api file. Do not copy server data into Zustand.
- Zustand holds UI state only (selected place, open panels, drafts).

## Google place data (a licence constraint, not a preference)

- A place is either a Google Maps place (we store its place ID and coordinates only) or a user-added place (we store its details).
- Never write a Google place's name, address, category, opening hours, photos or ratings to the database, to device storage (SQLite, AsyncStorage, files) or to any persisted cache. Keep them in memory only (TanStack Query, not persisted) and fetch them again when needed.
- Every Places API call goes through the `places` Supabase Edge Function. No Places API key ever ships in the app. The only Google keys in the app are the two Maps SDK keys, injected by the react-native-maps config plugin from environment variables.
- The app never inserts into `locations`. The Edge Function creates a Google place's row after checking the place ID with Google.
- Wherever Google place details are shown without the map visible, show Google's attribution as its policies require.

## Accessibility rules (every change must meet all of these)

1. Every pressable element has `accessibilityRole`, and an `accessibilityLabel` unless its visible text is already the right label. Stateful controls set `accessibilityState` (`selected`, `checked`, `disabled`, `expanded`, `busy`). Add `accessibilityHint` only when the result of activating is not obvious from the label.
2. Touch targets are at least 44 x 44 pt. If the visual is smaller, extend with `hitSlop` or padding.
3. Text must scale. Never set a fixed `height` on anything containing text: use `minHeight` and padding. Never set `allowFontScaling={false}`. `maxFontSizeMultiplier` is allowed only on map pin labels and the tab bar, never below 1.5, and with a comment saying why. Layouts must work at 200% text size: rows wrap or stack, nothing clips or overlaps.
4. Colour is never the only signal. Status is always colour + shape + icon + word.
5. Decorative icons and images are hidden from assistive tech (`accessible={false}`, `importantForAccessibility="no"`, `accessibilityElementsHidden`). Meaningful images have a label.
6. Section titles use `accessibilityRole="header"`.
7. Modals and sheets: set `accessibilityViewIsModal`, move screen reader focus to the title on open, return it to the opener on close, support `onAccessibilityEscape` and the Android back button, and always provide a visible close button.
8. Nothing is gesture-only. Every swipe or drag has a button that does the same thing.
9. Changes that happen away from focus (saved, posted, failed, results loaded) are announced with `announce()` from `src/lib/announce.ts`.
10. Respect Reduce Motion: no essential information in animation, and skip non-essential animation when it is on.
11. Group text that belongs together into one accessible element when it reads better as a unit (for example a list row).
12. Use colour tokens only. No hex values in components. The text pairs listed in `global.css` are verified at 7:1 or better; any new text/background pair must be checked to at least 4.5:1 (aim for 7:1), and control edges to at least 3:1.

## Styling

- Style with `className` and the tokens in `global.css`. Use `style` only for values computed at runtime.
- Use `AppText` from `src/ui`, never the bare `Text` component, so font and scaling stay consistent.
- Font: Atkinson Hyperlegible, regular and bold only.

## Current scope: Phase 1

Build: map explorer on Google Maps, tapping any Google place to open its sheet, Google autocomplete search, place detail sheet, sign-in by emailed code, review form (overall rating, text, photos with required descriptions).

Do not build yet (Phase 2): per-criterion review data and the "What visitors report" grid, filter chips, accessibility needs profile and suitability match, adding places that are not on Google Maps, listing unreviewed nearby Google places, saved places, the Contribute tab's content.

Never ship a control that does nothing. If its feature is out of scope, leave the control out.

## Commands

- `npm run check` runs lint and typecheck. It must pass before every commit.
- `npx expo-doctor` must pass after any dependency change.

## Definition of done for any task

`npm run check` passes; every new control meets the rules above; the screen has been reasoned through at 200% text size and with a screen reader's reading order; and the report lists anything a human must verify on a device.
