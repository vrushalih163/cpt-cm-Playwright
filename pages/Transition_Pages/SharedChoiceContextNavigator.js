//Author: Rajakumar Maste, Created Date: 23 August 2024

import { expect } from '@playwright/test';

export class SharedChoiceContextNavigator {
    constructor(page) {
        this.page = page;
        this.SharedChoice_icon = page.locator('//div//mat-icon[@mattooltip="Shared Choice"]');
        this.PatientFaceSheet_icon = page.locator('//div//mat-icon[@mattooltip="Patient Face Sheet"]');
        this.ProviderSearch_icon = page.locator('#iconSearch');
        this.SharedChoiceDetails_icon = page.locator('//div//mat-icon[@mattooltip="Shared Choice Details"]');
        this.Reset_icon = page.locator('//div//mat-icon[@mattooltip="Reset"]');
        this.Choice_button = page.locator('#btnChoiceCartCounts');
    }

    /**
     * This method is used to click on the Shared Choice icon.
     */
    async SharedChoiceIcon_Click() {
        expect(await this.SharedChoice_icon).toBeVisible();
        await this.SharedChoice_icon.click()
    }

    /**
     * This method is used to click on the Patient Face Sheet icon.
     */
    async PatientFaceSheetIcon_Click() {
        expect(await this.PatientFaceSheet_icon).toBeVisible();
        await this.PatientFaceSheet_icon.click();
    }

    /**
     * This method is used to click on the Provider Search icon.
     */
    async ProviderSearchIcon_Click() {
        expect(await this.ProviderSearch_icon).toBeVisible();
        await this.ProviderSearch_icon.click();
    }

    /**
     * This method is used to click on the Shared Choice Details icon.
     */
    async SharedChoiceDetailsIcon_Click() {
        expect(await this.SharedChoiceDetails_icon).toBeVisible();
        await this.SharedChoiceDetails_icon.click();
    }

    /**
     * This method is used to click on the Reset icon.
     */
    async ResetIcon_Click() {
        expect(await this.Reset_icon).toBeVisible();
        await this.Reset_icon.click();
    }

    /**
     * This method is used to click on the Choice button.
     */
    async ChoiceButton_Click() {
        expect(await this.Choice_button).toBeVisible();
        await this.Choice_button.click();
    }

}