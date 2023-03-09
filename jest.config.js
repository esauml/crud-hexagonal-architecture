module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: ['**/*.spec.ts'],
    collectCoverageFrom: ['**/*.ts', '!**/*.spec.ts', '!**/node_modules/**'],
    coverageDirectory: './coverage',
    coverageReporters: ['text-summary', 'lcov']
}
