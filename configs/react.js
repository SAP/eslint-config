module.exports = [
  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["strictCamelCase", "UPPER_CASE", "StrictPascalCase"],
          leadingUnderscore: "allow",
          selector: "variable",
        },
        {
          format: ["strictCamelCase", "StrictPascalCase"],
          selector: "function",
        },
        {
          format: ["StrictPascalCase"],
          selector: "enumMember",
        },
        {
          format: ["StrictPascalCase"],
          selector: "typeLike",
        },
      ],
    },
  },
];
