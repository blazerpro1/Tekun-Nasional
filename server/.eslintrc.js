module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true

    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "global-require": "off",
        "no-unused-vars": ['warn', { argsIgnorePattern: '^_' }],
        "no-param-reassign": ["error", { "props": false }]
    }
};
