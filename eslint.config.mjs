import { withCustomConfig } from "./configs/index.js";

export default withCustomConfig([
  {
    ignores: ["examples/*", "reports"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
