module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'indent': ['error', 4],
        'vue/html-indent': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/attributes-order': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-multi-spaces': 'off',
        'vue/no-template-shadow': 'off',
        'vue/no-v-html': 'off',
        'vue/order-in-components': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/require-prop-types': 'off',
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prefer-const': 'off'
    }
}