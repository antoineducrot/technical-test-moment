module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "./base.js",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
  },
  overrides: [
    {
      files: [
        "layout.tsx",
        "page.tsx",
        "error.tsx",
        "not-found.tsx",
        "global-error.tsx",
        "next.config.mjs",
        "tailwind.config.ts",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
