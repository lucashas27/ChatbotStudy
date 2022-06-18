module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    "@typescript-eslint",
    "no-loops",
    "prettier"
  ],
  rules: {
    'linebreak-style': 0,
    'no-loops/no-loops': 2, // 2 singifica "retornar um errro"
    'no-console': 1,
    'prettier/prettier': 2,
  },
};

console.log('Hello world!');
for (let i = 0; i < 12; i++) {
  console.log(i);
}