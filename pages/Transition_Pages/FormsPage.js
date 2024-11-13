// Author - Vrushali Honnatti Date:7th August, 2024
// Modified By: Rajakumar Maste, Date- 13th November 2024
export class FormsPage {
    constructor(page) {
        this.page = page;
        this.AddForm_button = page.getByText('add_circle_outline');
        this.Form_checkbox = page.locator('xpath=//mat-checkbox[contains(@id,"mat-checkbox")]//label[contains(@class,"mat-checkbox-layout")]//span[contains(@class,"mat-checkbox-inner-container")]');
        this.Form_First_Checkbox = page.locator('//table["#tblFormsData"]//tr[1]//td[2]//mat-checkbox');
    }

    /**
     * This method is used to add the form
     * @param {*} formName Enter the form name here
     */
    async SelectAForm(formName){
        await this.page.locator('#anchorExpandMore').click();
        await this.page.getByText(formName, { exact: true }).click();   
        await this.page.frameLocator('iframe[title="webviewer"]').getByRole('button', { name: 'Save' }).click();
        await this.Form_First_Checkbox.click();
    }

    async ClickAddFormButton() {
        await this.AddForm_button.click();
    }

    async ClickFormsCheckbox(index){
        await this.Form_checkbox.nth(index).click();
    }
}