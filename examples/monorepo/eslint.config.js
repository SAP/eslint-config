const path = require("path");
const { withCustomConfig } = require("@sap/eslint-config");

module.exports = withCustomConfig([
  {
    ignores: ["dist"],
  },
  {
    files: ["packages/my-package-1/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname, "./packages/my-package-1"),
      },
    },
  },
  {
    files: ["packages/my-package-2/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname, "./packages/my-package-2"),
      },
    },
  },
]);
