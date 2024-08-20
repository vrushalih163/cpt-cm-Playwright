//Author: Vrushali Honnatti - 20th August, 2024
import { expect } from '@playwright/test';

export class SendPage {
    constructor(page) {
        this.page = page;
        this.ProviderSelected_label = page.locator('xpath=//h3[@id="providersSelected"]');
        
    }

    async ValidateProviderSelectedLabel(text) {
        await expect(this.ProviderSelected_label).toContainText(text);
    }

    async SelectProvider(index){
        this.page.locator('xpath=//table[@id="tblSenderData"]/tbody/tr/td/mat-checkbox//label//span[contains(@class,"mat-checkbox-inner-container")]').nth(index).click();
    }
}