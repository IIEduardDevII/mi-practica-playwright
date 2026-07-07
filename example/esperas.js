const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://facebook.com');
    //espera implicita
    page.setDefaultNavigationTimeout(5000);

    await page.locator('#_R_1h6kqsqppb6amH1_').pressSequentially('gotocap@gmail.com', { delay: 100 });
    await page.locator('#_R_1hmkqsqppb6amH1_').pressSequentially('Cap123456', { delay: 100 });
    await page.locator('#_R_1h6kqsqppb6amH1_').press('Enter');

    await page.waitForTimeout(5000); //espera explicita
    await browser.close();
})();