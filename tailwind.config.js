module.exports = {
  purge: ["pages/**/*", "components/**/*", "lib/**/*"],
  theme: {
    extend: {},
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    minWidth: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "hover", "focus", "group-focus"],
    opacity: ["responsive", "hover", "focus", "group-focus", "group-hover"],
    backgroundOpacity: ["responsive", "hover", "focus", "group-focus"],
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
