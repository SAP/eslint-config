const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    rules: {
      "curly": ["error", "multi-line"],
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["strictCamelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          selector: "variable",
        },
        {
          format: ["strictCamelCase"],
          selector: "function",
        },
        {
          format: ["StrictPascalCase", "UPPER_CASE"],
          selector: "enumMember",
        },
        {
          format: ["StrictPascalCase"],
          selector: "typeLike",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: false, allowDefinitionFiles: false }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "no-unused-vars": "off",
      "no-use-before-define": "off",

      // recommended (excluding type-checking ones)
      // "@typescript-eslint/adjacent-overload-signatures"
      // "@typescript-eslint/ban-ts-comment"
      // "@typescript-eslint/ban-types"
      // "@typescript-eslint/explicit-module-boundary-types"
      // "@typescript-eslint/no-empty-interface"
      // "@typescript-eslint/no-extra-non-null-assertion"
      // "@typescript-eslint/no-inferrable-types"
      // "@typescript-eslint/no-misused-new"
      // "@typescript-eslint/no-non-null-asserted-optional-chain"
      // "@typescript-eslint/no-non-null-assertion"
      // "@typescript-eslint/no-this-alias"
      // "@typescript-eslint/no-var-requires"
      // "@typescript-eslint/prefer-as-const"
      // "@typescript-eslint/prefer-namespace-keyword"
      // "@typescript-eslint/triple-slash-reference"

      // recommended extension rules (excluding type-checking ones)
      // "@typescript-eslint/no-array-constructor"
      // "@typescript-eslint/no-empty-function"
    },
  },
  {
    files: ["*.test.ts", "*.test.tsx", "**/__test__/**/*.ts", "**/__test__/**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
