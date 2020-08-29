module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./test/setup.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    //"!src/bridge/**/*.ts",
    "!src/**/*.config.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
