module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended'
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        babelOptions: { presets: [] }
    },
    plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            alias: { map: [['@', './src']], extensions: ['.js', '.jsx'] }
        }
    },
    rules: {
        'react/prop-types': 'off',
        // Keep these as warnings so the app still builds, but surfaces issues.
        'jsx-a11y/anchor-is-valid': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    },
    ignorePatterns: ['dist', 'node_modules', 'backend', '*.config.js', 'scripts', 'src/tests/**']
};
