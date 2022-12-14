// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  root: false,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended", // disable core eslint rules that conflict with replacement @typescript-eslint rules
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier", // config-prettier disables eslint rules that conflict with prettier
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "../tsconfig.node.json"],
  },
  // DataPicker parts are ignored as they're largely copy-pasted from the react-aria tailwind datepicker example
  ignorePatterns: ["*.cjs", "components/DateRangePicker/*.tsx"],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react/prop-types": "off",
  },
  overrides: [],
};

module.exports = eslintConfig;
