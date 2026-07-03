const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://trycap.dev/');

    // 0. Buscamos y seleccionamos el boton de búsqueda
    await page.click('.DocSearch.DocSearch-Button');

    // 1. Hacemos clic en el input para asegurarnos de que tiene el foco
    await page.click('#docsearch-input');

    // 2. Escribimos letra por letra con un delay de 100 milisegundos entre cada una
    await page.locator('#docsearch-input').pressSequentially('CAPTCHA', { delay: 100 });

    // 3. Ahora sí, presionamos Enter
    await page.press('#docsearch-input', 'Enter');

    //esperar a que se cargue la página después de la busqueda
    await page.waitForSelector('h3');

    // Espera 2 segundos (2000 milisegundos) antes de proceder
    await page.waitForTimeout(2000);

    //seleccionamos un elemento dentro de los resultados de la búsqueda
    //await page.click('text=Full comparison: Cap vs Cloudflare Turnstile');
    await page.getByText('Full comparison: Cap vs Cloudflare Turnstile').click();

    await browser.close();

})();