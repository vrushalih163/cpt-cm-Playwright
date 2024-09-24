// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class PayorAuthorization {
    constructor(page) {
        this.page = page;
        this.PlanDescription_dropdown = page.locator('#m_PlanDescriptionList');
        this.ContactMethod_dropdown = page.locator('#m_ContactMethodList');
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
     * This method is used to click on the save button
     */
    async Save_btn() {
        await this.Save_button.click();
    }
}