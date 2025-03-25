module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    pluginsFile: "cypress/plugins/index.cjs",
  },
  component: {
    supportFile: "cypress/support/component.ts",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    pluginsFile: "cypress/plugins/index.cjs",
  },
  video: false,
  screenshotOnRunFailure: false,
};
