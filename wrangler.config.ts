export default {
  rules: [
    {
      type: "Text",
      globs: ["**/*.html", "**/*.css", "**/iframe.js", "**/protocol.js"],
      fallthrough: false,
    },
  ],
};
