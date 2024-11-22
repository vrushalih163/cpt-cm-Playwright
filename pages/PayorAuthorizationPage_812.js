// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class PayorAuthorization {
    constructor(page) {
        this.page = page;
        this.PlanDescription_dropdown = page.locator('#m_PlanDescriptionList');
        this.ContactMethod_dropdown = page.locator('#m_ContactMethodList');
        this.UMStatus_dropdown = page.locator('#ddlUMStatus');
        this.Save_button = page.getByRole('button', { name: 'Save' });

    }
 
    /**
     * This method is used to select the PlanDescription from the dropdown
     * @param {*} PlanDescription Enter the PlanDescription which the user wants to select
     */
    async PlanDescription(plandescription) {
        await this.PlanDescription_dropdown.selectOption(plandescription);
    }


    /**
     * This method is used to select the ContactMethod from the dropdown
     * @param {*} ContactMethod Enter the ContactMethod which the user wants to select
     */
    async ContactMethod(ContactMethod) { 
        await this.ContactMethod_dropdown.selectOption(ContactMethod);
    }

    /**
     * This method is used to select the UMStatus from the dropdown
     * @param {*} umStatus Enter the UMStatus which the user wants to select
     */
    async UMStatus(umStatus) {
        await this.UMStatus_dropdown.selectOption(umStatus);
    }

    /**
     * this method is used to validate the UMStatus
     * @param {*} umStatus 
     */
    async ValidateUMStatus(umStatus){
        expect(this.UMStatus_dropdown).toContain(umStatus);
    }

    /**
     * This method is used to click on the save button
     */
    async Save_btn() {
        await this.Save_button.click();
    }
}