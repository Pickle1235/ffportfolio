module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "prettier",
      "plugin:prettier/recommended"
    ],
    plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
};
  