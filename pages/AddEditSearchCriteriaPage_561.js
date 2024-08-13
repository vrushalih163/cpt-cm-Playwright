//Author: Rajakumar Maste, Created Date: 13 August 2024

export class AddEditSearchCriteria {
    constructor(page) {
        this.page = page;
        this.SearchCriteria_Editlink = page.locator('//a[contains(@id, "_lnkSearchCriteria")]').first();
        this.EnablePatientChoice_checkbox = page.locator('#chkEnableCareport');
    }

    /**
     * Click on the Edit link for the Search Criteria
     */
    async Click_SearchCriteria_Editlink() {
        await this.SearchCriteria_Editlink.click();
        return this.page;
    }

    /**
     * Click on the Enable Patient Choice checkbox
     */
    async Click_EnablePatientChoice_checkbox(){
        if(!await this.EnablePatientChoice_checkbox.isEnabled()){
            await this.EnablePatientChoice_checkbox.check();
        }
    }

    /**
     * Click on Save button
     */
    async Click_SaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    /**
     * Click on Apply button
     */
    async Click_ApplyButton() {
        await this.page.getByRole('button', { name: 'Apply' }).click();
    }

    /**
     * Click on Cancel button
     */
    async Click_CancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}