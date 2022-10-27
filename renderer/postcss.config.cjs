module.exports = {
  plugins: {
    // paths here are from the project root somehow, not the renderer root
    tailwindcss: { config: "./renderer/tailwind.config.cjs" },
    autoprefixer: {},
  },
};
