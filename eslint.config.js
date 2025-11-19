import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // Possible Problems
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off",

            // Suggestions
            "prefer-const": "warn",
            "no-var": "error",
            "prefer-arrow-callback": "warn",
            "prefer-template": "warn",

            // Stylistic
            "indent": ["error", 4, { SwitchCase: 1 }],
            "quotes": ["error", "double", { avoidEscape: true }],
            "semi": ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "arrow-spacing": "error",
            "space-before-blocks": "error",
            "keyword-spacing": "error",
        },
    },
    {
        ignores: [
            "node_modules/",
            "temp/",
            "build/",
            "*.min.js",
        ],
    },
];
