const {
    defineConfig,
} = require("eslint/config");

const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: compat.extends("next", "next/core-web-vitals", "prettier"),

    plugins: {
        prettier,
    },

    rules: {
        "prettier/prettier": "error",
        "react/no-unescaped-entities": 0,
    },
}]);
