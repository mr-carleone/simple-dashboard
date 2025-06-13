import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        video: false,
        screenshotOnRunFailure: true,
        retries: {
            runMode: 2,
            openMode: 0
        },
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,
        pageLoadTimeout: 30000,
        chromeWebSecurity: false,
        experimentalStudio: true,
        experimentalRunAllSpecs: true,
        experimentalMemoryManagement: true
    },
    env: {
        apiUrl: 'http://localhost:5173/api'
    }
})
