const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },

  plugins: ["simple-import-sort"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
  ],

  rules: {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",

    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
  },

  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      env: {
        jest: true,
      },
    },
  ],
};
