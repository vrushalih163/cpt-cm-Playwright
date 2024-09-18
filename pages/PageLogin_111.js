// Author - Vrushali Honnatti Date:10th July, 2024

const {expect} = require ("@playwright/test")
const {URL} = process.env

export class LoginPage{

    constructor(page) {
        this.page = page;
        // this.username_field = page.locator('#UserNameTextBox');
        // this.password_field = page.locator('#PasswordTextBox');
        // this.login_button = page.getByText('Log In');
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
        return page1;
        //await expect(page1.getByText('Welcome Back')).toHaveCount(1);
    
    }
    
}