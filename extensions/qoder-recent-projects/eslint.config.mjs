import raycastConfig from "@raycast/eslint-config";
import reactPlugin from "eslint-plugin-react";

// Flatten raycastConfig (it contains a nested array at index 5)
const flattenedRaycastConfig = raycastConfig.flat();

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  ...flattenedRaycastConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
    },
  },
];

