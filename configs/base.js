const eslint = require("@eslint/js");
const globals = require("globals");

module.exports = [
  eslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "commonjs",
      },
      globals: {
        ...globals.node,
        ...globals.es2025,
      },
    },
    rules: {
      "curly": ["error", "multi-line"],
      "eqeqeq": "error",
      "no-console": "error",
      "no-duplicate-imports": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
      "no-use-before-define": ["error", { functions: false }],
      // Legacy? Not needed anymore?
      // "prettier/prettier": [
      //   "error",
      //   {
      //     endOfLine: "auto",
      //   },
      // ],
      "require-await": "error",

      // Covered by prettier
      // "lines-around-comment"
      // "max-len"
      // "no-tabs"
      // "no-unexpected-multiline"
      // "quotes"
      // "array-bracket-newline"
      // "array-bracket-spacing"
      // "array-element-newline"
      // "arrow-parens"
      // "arrow-spacing"
      // "block-spacing"
      // "brace-style"
      // "comma-dangle"
      // "comma-spacing"
      // "comma-style"
      // "computed-property-spacing"
      // "dot-location"
      // "eol-last"
      // "func-call-spacing"
      // "function-call-argument-newline"
      // "function-paren-newline"
      // "generator-star-spacing"
      // "implicit-arrow-linebreak"
      // "indent"
      // "jsx-quotes"
      // "key-spacing"
      // "keyword-spacing"
      // "linebreak-style"
      // "multiline-ternary"
      // "newline-per-chained-call"
      // "new-parens"
      // "no-extra-parens"
      // "no-extra-semi"
      // "no-floating-decimal"
      // "no-mixed-spaces-and-tabs"
      // "no-multi-spaces"
      // "no-multiple-empty-lines"
      // "no-trailing-spaces"
      // "no-whitespace-before-property"
      // "nonblock-statement-body-position"
      // "object-curly-newline"
      // "object-curly-spacing"
      // "object-property-newline"
      // "one-var-declaration-per-line"
      // "operator-linebreak"
      // "padded-blocks"
      // "quote-props"
      // "rest-spread-spacing"
      // "semi"
      // "semi-spacing"
      // "semi-style"
      // "sort-vars"
      // "space-before-blocks"
      // "space-before-function-paren":"off",
      // "space-in-parens"
      // "space-infix-ops"
      // "space-unary-ops"
      // "switch-colon-spacing"
      // "template-curly-spacing"
      // "template-tag-spacing"
      // "unicode-bom"
      // "wrap-iife"
      // "wrap-regex"
      // "yield-star-spacing"
    },
  },
];
