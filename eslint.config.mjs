import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "prefer-const": "error",
            "no-unused-expressions": "error",
            "no-undef": "error",
            "no-console": "warn",
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "no-duplicate-imports": "warn",
        },
    },
    {
        ignores: ["node_modules", ".env.*", "dist/**/*"],
    },
];
