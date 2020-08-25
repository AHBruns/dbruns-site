module.exports = {
  purge: ["pages/**/*", "components/**/*", "lib/**/*"],
  theme: {
    extend: {},
  },
  variants: {
    width: ["responsive", "hover", "focus"],
  },
  plugins: [require("@tailwindcss/ui")],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
