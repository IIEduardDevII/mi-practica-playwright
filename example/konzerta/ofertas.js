const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.konzerta.com/');

    // Buscamos el input que esté visible dentro de la clase contenedora.
    // Si cambian el texto del placeholder o del label, este selector seguirá funcionando al 100%.
    const inputPuesto = await page.locator('.select__input input:visible').first().pressSequentially('Analista de calidad', { delay: 500 });
    await page.waitForTimeout(500);
    const butonBuscar = await page.locator('#buscarTrabajo').first().click({ delay: 700 });
    
      
  })();