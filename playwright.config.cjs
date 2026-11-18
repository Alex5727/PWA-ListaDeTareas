// Configuración de Playwright para la prueba funcional de la PWA
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'resultados/junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'retain-on-failure',
  },
  // Antes de las pruebas levanta un servidor local con la carpeta public/
  webServer: {
    command: 'node tests/servidor.cjs',
    url: 'http://localhost:8080',
    reuseExistingServer: false,
    timeout: 20000,
  },
});
