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
      "no-unused-vars": "error",
    },
  },
  {
    ignores: [
      "**/function/",
    ],
  },
];
