module.exports = {
  root: true,
  extends: ["next", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "react-hooks/exhaustive-deps": "error"
  }
};
