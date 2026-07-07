const { test, expect } = require('@playwright/test');

test('Flujo completo de compra en Sauce Demo', async ({ page }) => {
  // El parámetro { page } ya viene abierto y listo para usar
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Validar título de forma profesional usando aserciones nativas (expect)
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

  // Agregar producto al carrito
  await page.locator('#add-to-cart-sauce-labs-backpack').click();

  // Ir al carrito y Checkout
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
    
  // Formulario
  await page.locator('#first-name').fill('Anderson');
  await page.locator('#last-name').fill('Hernandez');
  await page.locator('#postal-code').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  // Validar mensaje final con expect (Esto es lo que el reporte registrará si pasa o falla)
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});