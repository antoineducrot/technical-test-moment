const { rules } = require("./next");

module.exports = {
  extends: ["./base.js"],

  rules: {
    "unicorn/prefer-top-level-await": "off",
  },
};
