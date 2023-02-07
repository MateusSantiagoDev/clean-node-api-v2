module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts', // quero coletar tudo de src
    '!<rootDir>/src/main/**' // porem não quero commitar o diretório /main
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest' // qualquer texto com final .ts quero rodar com ts-jest
  }
}

/* preset: '@shelf/jest-mongodb', */
