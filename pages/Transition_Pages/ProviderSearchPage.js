// Author - Rajakumar Maste, Created Date: 29 July 2024
//Modified By - Vrushali Honnatti, Date: 20th August, 2024 - modified Search Provider method
export class ProviderSearchPage {
    constructor(page) {
        this.page = page;
        this.SearchProvider_button = page.getByText('add_circle_outline');
        this.Provider_checkBox = page.locator('xpath=//table[@id="tblProviderSummary"]/tbody/tr/td/mat-checkbox/label/span[contains(@class,"mat-checkbox-inner-container")]');
    }

    async ClickProviderCheckBox(index) {
        await this.Provider_checkBox.nth(index).click();
    }
    
    async ClickSearchProviderButton() {
        await this.SearchProvider_button.click();
    }

    async SearchProvider(providerName) {
        await this.page.getByLabel('Clear').click();
        await this.page.getByPlaceholder('Search by address, city,').click();
        await this.page.keyboard.type('Hagåtña, 96910, Guam', { delay: 300 });

        await this.page.getByText('Hagåtña, 96910, Guam', { exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).fill('');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).type(providerName);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(8000);
        await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]').click();
        await this.page.getByRole('button', { name: 'Add 1 to Referral' }).click();
    }

    
}