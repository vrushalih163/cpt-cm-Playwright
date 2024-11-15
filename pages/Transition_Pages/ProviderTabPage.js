// Author - Rajakuamr Maste, Date: 13th August, 2024

import { expect } from '@playwright/test';

export class ProviderTab {
    constructor(page) {
        this.page = page;
        this.Ellipse_Icon = page.locator('//td//a[@id="anchorMenu"]');

        //selection factor controller
        this.Place_Referral = page.locator('//div//a[contains(text(), "Place Referral")]');
        this.Unplace_Referral = page.locator('//div//a[contains(text(), "Place Referral")]');
        this.SelectedProvider_dropdown = page.locator('//div//mat-select[@formcontrolname="providerNameControl"]//div[contains(@class, "mat-select-trigger ng-tns")]');
        this.SelectionFactor_dropdown = page.locator('//acm-mat-multiselect[@caption="Selection Factors"]');
        this.SelectionFactor_materror = page.getByText(' Please select at least one factor. ');
        this.Place_Btn = page.getByRole('button', { name: 'Place', exact: true });
        this.Placed_label = page.locator('//p//label[contains(text(), "Placed")]');
        this.Edit_icon = page.locator('//p//mat-icon[contains(text(), "edit")]');
        this.UpdateSelFact_btn = page.getByRole('button', {name: 'Update Selection Factors',exact: true});
        this.Unplace_Btn = page.getByRole('button', { name: 'Unplace'});
        this.ReferralPlaced_Toast = page.getByText('Success: Referral placed');
        this.ReferralUnplaced_Toast = page.getByText('Success: Referral Unplaced');
        

    }

    /**
     * This method is used to click ellipse icon present in the provider tab based on the index
     * @param {*} index Enter the index of the ellipse icon to click
     */
    async Click_EllipseIcon(index) {
        await this.Ellipse_Icon.nth(index).click();
    }

    /**
     * This method is used to click on Place Referral button
     */
    async Click_PlaceReferral() {
        await this.Place_Referral.click();
    }

    /**
     * This method is used to click on unplace referral option
     */
    async Click_UnPlaceReferral() {
        await this.Unplace_Referral.click();
    }

    /**
     * This method is used to select the provider from the dropdown
     * @param {*} option Enter the provider name to select from the dropdown
     * referrance : None or exactprovider name
     */
    async SelectedProvider_Dropdown(option) {
        await this.SelectedProvider_dropdown.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//mat-option//span[contains(text(), "${option}")]`).click();
    }

    /**
     * This method is used to check the Selection Factors dropdown is disable or not
     */
    async SelectionFactors_dropdown_Disabled() {
        await this.SelectionFactor_dropdown.isDisabled();
    }

    /**
     * This method is used to check the Selection Factors dropdown is enable or not
     */
    async SelectionFactors_dropdown_Enabled() {
        await this.SelectionFactor_dropdown.isEnabled();
    }

    /**
     * This method is used to check the visibility of Selection Factor dropdown
     */
    async SelectionFactor_dropdown_NotVisible() {
        await this.SelectionFactor_dropdown.not.toBeVisible();
    }

    /**
     * This method is used to select the Selection Factors from the dropdown
     * @param {*} SelectionFactors Enter the Selection Factors to select from the dropdown
     */
    async SelectionFactor_OptionSelection( SelectionFactors){
        await this.SelectionFactor_dropdown.click();
        const option = await this.page.locator('//div[@role="listbox"]//mat-option[.//mat-checkbox//span[contains(text(),"' + SelectionFactors + '")]/ancestor::mat-option]');
        await option.click();

        // Locate the checkbox within the option
        const checkbox = option.locator('mat-checkbox input[type="checkbox"]');
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.check();
        }
        // below line is for close the dropdown
        await this.page.keyboard.press('Escape');
    }

    /**
     * This method is used to validate the Selection Factors dropdown validation message
     */
    async SelectionFactor_ValidationMessage() {
        await this.SelectionFactor_dropdown.click();
        await this.page.keyboard.press('Escape');
        expect(this.SelectionFactor_materror).toBeVisible();
    }

    /**
     * This method is used to validate the Selection Factors dropdown validation message on Edit modal
     */
    async  SelectionFactor_ValidationOnEditModal() {
        // Click to open the dropdown
        await this.SelectionFactor_dropdown.click();
    
        // Locate all options within the dropdown
        const options = await this.page.locator('//div[@role="listbox"]//mat-option');
    
        // Iterate through each option and uncheck the checkbox if it is checked
        for (let i = 0; i < await options.count(); i++) {
            const option = options.nth(i);
            const checkbox = option.locator('mat-checkbox input[type="checkbox"]');
            const isChecked = await checkbox.isChecked();
            if (isChecked) {
                await checkbox.uncheck();
            }
        }
        // Close the dropdown
        await this.page.keyboard.press('Escape');
        expect(this.SelectionFactor_materror).toBeVisible();
    }
    
    /**
     * This method is used to check the Place button is disabled or not
     */
    async PlaceBtn_Disabled() {
        await this.Place_Btn.isDisabled();
    }

    /**
     * This method is used to check the Place button is enabled or not
     */
    async PlaceBtn_Enabled() {
        await this.Place_Btn.isEnabled();
    }

    /**
     * This method is used to click on Place button
     */
    async PlaceBtn_Click() {
        await this.Place_Btn.click();
    }

    /**
     * This method is used to validate the toast message after placing the referral
     */
    async ReferralPlaced_ToastMessage() {
        await expect(this.ReferralPlaced_Toast).toBeVisible();
    }

    /**
     * This method is used to validate the toast message after unplacing the referral
     */
    async ReferralUnPlaced_ToastMessage() {
        await expect(this.ReferralUnplaced_Toast).toBeVisible();
    }

    /**
     * This method is used to validate the placed label after placing the referral in the provider
     */
    async PlacedLabel_Visible() {
        await this.Placed_label.toBeVisible();
    }

    /**
     * This method is used to click on Edit icon
     */
    async EditIcon_Click() {
        await this.Edit_icon.click();
    }

    /**
     * This method is used to validate the Edit Selection Factors modal is visible
     */
    async UpdateSelectionFactorsBtn_Clcick() {
        await this.UpdateSelFact_btn.click();
    }

    /**
     * This method is used to click on unplace button on unplace referral modal
     */
    async UnPlaceBtn_Click() {
        await this.Unplace_Btn.click();
    }

}