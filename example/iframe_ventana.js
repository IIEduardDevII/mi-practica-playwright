const { chromium } = require('playwright');

(async () => {
    // Añadimos slowMo para que puedas ver el proceso con tus ojos
    const browser = await chromium.launch({ headless: false, slowMo: 600 });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe');

    // 1. Apuntamos al iframe correcto usando frameLocator (El contenedor del resultado de W3Schools)
    const iframeResult = page.frameLocator('#iframeResult');

    // 2. Dentro de ese iframe, buscamos el iframe interno que contiene la página de prueba
    // Lo identificamos por su atributo title
    const iframePrueba = iframeResult.frameLocator('iframe[title="W3Schools Free Online Web Tutorials"]');

    console.log("Estructura de iframes localizada.");

    // 3. Hacemos clic en el enlace que dice "HTML" utilizando getByRole de forma segura
    await iframePrueba.getByRole('link', { name: 'HTML', exact: true }).click();
    
    console.log("Se hizo click en el enlace HTML dentro del iframe de prueba");

    // await browser.close();
})();