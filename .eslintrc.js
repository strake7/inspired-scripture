module.exports = {
  extends: ["next", "next/core-web-vitals", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/no-unescaped-entities": 0
  },
}
