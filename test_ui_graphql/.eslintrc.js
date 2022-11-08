module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        jsx: true,
        ecmaVersion: 2021,
        sourceType: "module",
    },
    plugins: [
        "react", "@typescript-eslint",
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
    overrides: [],
    globals: {
        __IS_DEV__: true,
        __API__: true,
    },
    settings: {react: {version: "detect"}},
}
