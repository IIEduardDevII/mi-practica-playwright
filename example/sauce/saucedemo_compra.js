const { chromium } = require('playwright');

(async () => {
  // Nota: Si quieres quitar los {delay: 500} de cada clic, puedes usar slowMo: 500 aquí arriba
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');

  // Login en la pagina de saucedemo
  await page.locator('#user-name').pressSequentially('standard_user', { delay: 100 });
  await page.locator('#password').pressSequentially('secret_sauce', { delay: 100 });
  await page.locator('#login-button').click();

  // Validar que el titulo de la pagina sea el correcto
  const titulo = await page.locator('.app_logo').textContent();
  if (titulo === 'Swag Labs') {
    console.log('El titulo es correcto');
  } else {
    console.log('El titulo es incorrecto');
  }

  // Agregar un producto al carrito (Entrando al detalle del producto)
  await page.getByText('Sauce Labs Backpack').click({ delay: 500 });
  await page.getByRole('button', { name: 'Add to cart' }).click({ delay: 500 });

  // VALIDACIÓN DE TEXTO: Usamos el ID del botón para extraer el texto de forma neutral
  const botonCarrito = await page.locator('#remove').textContent();
  if (botonCarrito === 'Remove') {
    console.log('El texto del boton es correcto');
  } else {
    console.log('El texto del boton es incorrecto');
  }

  // VALIDACIÓN DE COLOR: Usamos el ID para evaluar el estilo CSS
  const colorBoton = await page.locator('#remove').evaluate((element) => {
    return window.getComputedStyle(element).getPropertyValue('border-color');
  });
  
  if (colorBoton === 'rgb(226, 35, 26)') {
    console.log('El color del boton es correcto');
  } else {
    console.log('El color del boton es incorrecto');
  }

  // Ir al carrito de compras y hacer el flujo de checkout
  // Nota: En la página de detalles el botón de checkout se busca de manera general
  await page.locator('.shopping_cart_link').click({ delay: 500 });
  await page.getByRole('button', { name: 'Checkout' }).click({ delay: 500 }); // 'Checkout' va con C mayúscula en la web
    
  // Llenar el formulario de checkout
  await page.locator('#first-name').pressSequentially('Anderson', { delay: 100 });
  await page.locator('#last-name').pressSequentially('Hernandez', { delay: 100 });
  await page.locator('#postal-code').pressSequentially('12345', { delay: 100 });
  await page.getByRole('button', { name: 'Continue' }).click({ delay: 500 }); // Con C mayúscula
  await page.getByRole('button', { name: 'Finish' }).click({ delay: 500 });   // Con F mayúscula

  // Validar que el mensaje de confirmacion sea el correcto
  const mensajeConfirmacion = await page.locator('.complete-header').textContent();
  if (mensajeConfirmacion === 'Thank you for your order!') {
    console.log('El mensaje de confirmacion es correcto');
  } else {
    console.log('El mensaje de confirmacion es incorrecto');
  }

  await page.waitForTimeout(3000); 
  await browser.close();
})();