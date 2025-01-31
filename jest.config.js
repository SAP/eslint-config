module.exports = {
  coverageDirectory: "reports/jest/default",
  coveragePathIgnorePatterns: ["/tests/", "/node_modules/", "/configs/"],
  coverageReporters: ["lcov", "json", "clover", "cobertura"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "reports/jest/default",
        suiteName: "sap-eslint-config jest unit tests",
      },
    ],
  ],
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.(js|ts)"],
  modulePathIgnorePatterns: ["<rootDir>/examples"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
      },
    ],
  },
};
