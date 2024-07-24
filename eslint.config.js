import antfu from "@antfu/eslint-config";

export default antfu(
    {
        formatters: true,
        unocss: true,
        react: true,
        jsx: true,
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true,
            overrides: {
                "style/array-bracket-newline": ["error", { multiline: true }],
                "style/function-call-argument-newline": ["error", "consistent"],
                "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
                "style/max-statements-per-line": ["error", { max: 2 }],
                "style/jsx-self-closing-comp": ["error", { component: true, html: true }],
                "style/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
            },
        },
        rules: {
            "antfu/if-newline": "off",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "import/order": [
                "error",
                {
                    "newlines-between": "always",
                    "groups": [["external"], ["parent", "internal", "builtin", "sibling", "index"], "object", "type"],
                    "pathGroups": [
                        {
                            group: "unknown",
                            pattern: "~@/**",
                            position: "after",
                        },
                    ],
                    "alphabetize": { order: "asc", caseInsensitive: true },
                },
            ],
            "import/newline-after-import": ["error", { count: 1 }],
        },
    },
    {
        files: [".generated/**/*"],
        rules: {
            "eslint-comments/no-unlimited-disable": "off",
        },
    },
    {
        files: ["index.html", "README.md"],
        rules: {
            "format/prettier": "off",
        },
    },
);
