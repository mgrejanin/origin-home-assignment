module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  collectCoverage: true,
  coverageReporters: ["html", "json", "text-summary"],
  testMatch: ["**/+(*.)+(spec).+(ts|js)?(x)"],
};
