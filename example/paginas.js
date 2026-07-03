const { chromium } = require('playwright');

(async () => {
    // Añadimos slowMo para que puedas ver el proceso con tus ojos
    const browser = await chromium.launch({ headless: false, slowMo: 600 });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    console.log("Página de Google cargada.");

    const page2 = await context.newPage();
    await page2.goto('https://www.facebook.com/');
    console.log("Segunda página cargada");

    console.log("Cambiando a la pestaña de Google...");
    await page.bringToFront();
    //await page.fill('#APjFqb', 'Cap Captcha');
    await page.locator('#APjFqb').pressSequentially('Cap Captcha', { delay: 100 });
    await page.keyboard.press('Enter');

    console.log("Cambiando a la pestaña de Facebook...");
    await page2.bringToFront();
    //await page2.fill('#_R_1h6kqsqppb6amH1_', 'gotocap@gmail.com');
    await page2.locator('#_R_1h6kqsqppb6amH1_').pressSequentially('gotocap@gmail.com', { delay: 100 });
    //await page2.fill('#_R_1hmkqsqppb6amH1_', 'Cap123456');
    await page2.locator('#_R_1hmkqsqppb6amH1_').pressSequentially('Cap123456', { delay: 100 });

    await browser.close();
})();