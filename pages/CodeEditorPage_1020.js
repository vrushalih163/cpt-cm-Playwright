// Author - Rajakumar Maste, Created on - 18 Sept 2024

export class CodeEditor {
    constructor (page) {
        this.page = page;
        this.Code_Edit_link = page.locator('#lnkCode');
        this.Type_dropdown = page.locator('#ddlType');
        this.Priority_field = page.locator('#nePriority_Number');
        this.PresentOnAdmission_dropdown = page.locator('#ddlPresentOnAdmission');
        this.Comment_field = page.locator('#txtEditableComment');
        this.Save_btn = page.getByRole('button', { name: 'Save' });

    }

    /**
     * This method is used to click on Code Edit link
     */
    async Click_CodeEdit() {
        await this.Code_Edit_link.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * This method is used to select the dropdown value
     * @param {*} type Enter the dropdown value 
     */
    async Type_selection(type) {
        await this.Type_dropdown.selectOption(type);
    }

    /**
     * This method is used to enter the priority into priority field
     * @param {*} priority Enter the priority 
     */
    async Priority_selection(priority) {
        await this.Priority_field.fill(priority);
    }

    /**
     * This method is used to select the dropdown value
     * @param {*} poa Enter the PresentOnAdmission text
     */
    async PresentOnAdmission_selection(poa) {
        await this.PresentOnAdmission_dropdown.selectOption(poa);
    }

    /**
     * This method is used to enter the comment into comment field
     * @param {*} comment Enter the comment
     */
    async Comment(comment) {
        await this.Comment_field.fill(comment);
    }

    /**
     * This method is used to click on Save button
     */
    async Savebtn_Click() {
        await this.Save_btn.click();
        await this.page.waitForLoadState('networkidle');
    }
}