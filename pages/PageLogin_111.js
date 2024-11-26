// Author - Vrushali Honnatti Date:10th July, 2024
// Author - Micho Eshete Date: 08/23/2024


const {expect} = require ("@playwright/test")
const {URL} = process.env

export class LoginPage{

    constructor(page) {
        this.page = page;
        this.username_field = page.locator('#UserNameTextBox');
        this.password_field = page.locator('#PasswordTextBox');
        this.AuthenticationProvider_field = page.locator('#ProviderNameTextBox');
        this.ExternalAuth_errorMsg = page.locator(`xpath=//form[@id='form1']//div[2]`);
        this.login_button = page.getByText('Log In');

        this.cards_queue_count = (cardText) => page.locator(`app-queue-count-card:has-text("${cardText}")`);
    }

    /**
     * 
     * @param {*} username 
     * @param {*} password 
     * @returns page1
     */
    async login(user, password){
      
        await this.page.goto(URL, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(1000);
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: 'Log In' }).click();
        const page1 = await page1Promise;
        await page1.setViewportSize({ width: 1300, height: 800 });
        await page1.locator('#UserNameTextBox').click();
        await page1.locator('//input[@id="UserNameTextBox"]').fill(user);
        await page1.locator('#UserNameTextBox').press('Tab');
        await page1.locator('#PasswordTextBox').fill(password);
        //await page1.locator('#PasswordTextBox').press('Enter');
        await page1.getByText('Log In').click();
        await page1.waitForLoadState('domcontentloaded');
        await expect(page1.getByText('Welcome Back')).toHaveCount(1);
        await page1.waitForTimeout(2000);
        return page1;
        //await expect(page1.getByText('Welcome Back')).toHaveCount(1);
    
    }


    
    /**
     * Clicks on a card on the home page identified by cardText.
     * 
     * cardText - The text of the card to click.
     * pagePromise - A promise that resolves to the page that opened in a new tab, if applicable.
     */
    async clickCardsOnHomePage(cardText) {
        let pagePromise;
        if (cardText === 'Online Help') {
            pagePromise = this.page.waitForEvent('popup');
        }
        await this.cards_queue_count(cardText).click({timeout: 20000});
        let page;
        if (pagePromise) {
            page = await pagePromise;
            await page.waitForLoadState('domcontentloaded');
        }
        return page;
    }

    /**
     * Verifies that the specified card is not displayed on the home page basend on the configeration.
     * 
     * cardText - The text of the card to verify is not displayed.
     */
    async verifyCardNotDisplayed(cardText) {
        await expect(this.cards_queue_count(cardText)).not.toBeVisible();
    }

    async SAMLLogin(provider){
        await this.page.goto(URL, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(1000);
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: 'Log In' }).click();
        const page1 = await page1Promise;
        await page1.setViewportSize({ width: 1300, height: 800 });
        await page1.locator('#ProviderNameTextBox').fill(provider);
        await page1.getByText('Log In').click();
        await page1.waitForLoadState('domcontentloaded');
        await expect(page1.getByText('Welcome Back')).toHaveCount(1);
        await page1.waitForTimeout(2000);
        return page1;
    }

    async SAMLLoginInvalid(provider){
        await this.page.goto(URL, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(1000);
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: 'Log In' }).click();
        const page1 = await page1Promise;
        await page1.setViewportSize({ width: 1300, height: 800 });
        await page1.locator('#ProviderNameTextBox').fill(provider);
        await page1.getByText('Log In').click();
        await page1.waitForLoadState('domcontentloaded');
        await page1.waitForTimeout(2000);
        await expect(this.ExternalAuth_errorMsg).toContainText('Invalid User Name or Account Locked.Please try again. If you need assistance, contact a Security Administrator at your organization.');
        return page1;
    }
}