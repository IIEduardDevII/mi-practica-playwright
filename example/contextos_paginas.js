const {chromium} = require('playwright'); //importamos playwright

(async () => {
    const browser = await chromium.launch({headless: false})
    
    //contexto 1 google
    //lanzamos el navegador
    const googleContext = await browser.newContext();
    const googlePage = await googleContext.newPage();
    await googlePage.goto('https://www.google.com');
    await googlePage.waitForTimeout(5000);
    console.log("contexto 1 de google abierto");

    //contexto 2 wikipedia
    const wikipediaContext = await browser.newContext();
    const wikipediaPage = await wikipediaContext.newPage();
    await wikipediaPage.goto('https://www.wikipedia.org');
    await wikipediaPage.waitForTimeout(5000);
    console.log("contexto 2 de wikipedia abierto");
    await browser.close();

    console.log("navegadores cerrados exitosamente");
})();