// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactNativeA11y = require("eslint-plugin-react-native-a11y");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "ios/*", "android/*", ".expo/*"],
  },
  {
    // The plugin only ships legacy (.eslintrc) configs, so its "all"
    // recommended rule set is applied here in flat-config form.
    plugins: { "react-native-a11y": reactNativeA11y },
    rules: {
      ...reactNativeA11y.configs.all.rules,
      // CLAUDE.md rule 1: add accessibilityHint only when the result of
      // activating is not obvious from the label. This rule demands a hint
      // on every labelled element, which would produce redundant speech.
      "react-native-a11y/has-accessibility-hint": "off",
    },
  },
]);
