// Prueba funcional: app.js pide las tareas a Supabase y Supabase responde 200
const { test, expect } = require('@playwright/test');

// Sin Service Worker, para que la petición salga siempre a la red
test.use({ serviceWorkers: 'block' });

test('app.js consulta la tabla tasks y Supabase responde 200', async ({ page }) => {
  // Esperar la petición GET que app.js hace a la tabla "tasks"
  const esperaRespuesta = page.waitForResponse(r =>
    r.url().includes('/rest/v1/tasks') && r.request().method() === 'GET'
  );

  await page.goto('/');

  const respuesta = await esperaRespuesta;
  expect(respuesta.status(), 'Supabase debe responder con estado 200').toBe(200);
});
