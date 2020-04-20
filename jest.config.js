module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["./tests/setup.ts"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/0.old/**/*.ts",
        "!src/bridge/*.ts",
        "!src/**/*.config.ts",
        "!src/MusiqueModule.ts"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};
