import globals from "globals";

export default [
  {
    files: ["server/**/*.js", "**/*.test.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
    },
  },
  {
    ignores: ["node_modules/", "client/", "coverage/", ".github/"],
  },
];
