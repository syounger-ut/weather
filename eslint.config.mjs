import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jestConfig from 'eslint-plugin-jest';

export default [
  pluginJs.configs.recommended,
  jestConfig.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: [
      "**/*.{js,ts}",
      "**/*.test.ts",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      }],
      "jest/no-mocks-import": "off",
      "object-curly-spacing": ["error", "always"],
      "semi": ["error", "always"],
    },
  },
  {
    ignores: [
      "**/function/",
    ],
  },
];
