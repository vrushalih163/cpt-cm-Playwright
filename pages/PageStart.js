// Author - Vrushali Honnatti Date:10th July, 2024

const {test, expect} = require ("@playwright/test")
const {url, user, password} = process.env



exports.expect = expect
exports.test = test.extend({

    CMApp: async({page}, use) => {

        await page.goto(url, { waitUntil: 'networkidle' });
        page.waitForTimeout(1000);
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Log In' }).click();
        const page1 = await page1Promise;
        await page1.locator('#UserNameTextBox').click();
        await page1.locator('//input[@id="UserNameTextBox"]').fill(user);
        await page1.locator('#UserNameTextBox').press('Tab');
        await page1.locator('#PasswordTextBox').fill(password);
        await page1.locator('#PasswordTextBox').press('Enter');
        await page1.waitForLoadState('domcontentloaded');
        await expect(page1.getByText('Welcome Back')).toHaveCount(1);
        use(page1);
    }
})










