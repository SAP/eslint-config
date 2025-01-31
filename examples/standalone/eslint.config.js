const { withCustomConfig } = require("@sap/eslint-config");

module.exports = withCustomConfig([
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
]);
