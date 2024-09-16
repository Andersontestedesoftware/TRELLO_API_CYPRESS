/*const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
*/
/*
const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on);
    },
  },
});
*/
/*
const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  }
})
*/

const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      on('after:run', (results) => {
        const data = `Environment=${process.env.ENVIRONMENT}\nBrowser=${results.browserName}\nBrowserVersion=${results.browserVersion}`
        fs.writeFile('allure-results/environment.properties', data, (err) => {
          if (err) throw err;
        });
      })
      return config;
    },
  },
});