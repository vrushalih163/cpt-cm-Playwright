// Author - Rajakumar Maste, Created on - 18 Sept 2024

export class EditPaymentSource {
    constructor(page) {
        this.page = page;
        this.FinancialClass_dropdown = page.locator('#listPaymentType');
        this.PlanNumber_field = page.locator('#txtPlanNumber');
        this.PlanDescription_field = page.locator('#txtPlanDescription');
        this.Save_button = page.getByRole('button', { name: 'Save' });
        this.Inactive_checkbox = page.locator('#cbInactive');
        this.InactivateOn_Date = page.locator('#ECINCalendarInactivatedOn_Date');
        this.Inactivate_Time = page.locator('#ECINCalendarInactivatedOn_Time');
    }

    /**
     * This method is used to add payment source
     * @param {*} PaymentName Enter the payment source name
     */
    async AddPaymentSource(PaymentName) {
        await this.page.waitForTimeout(2000);
        await this.FinancialClass_dropdown.selectOption(PaymentName);
        await this.PlanNumber_field.fill('Plan No 111');
        await this.PlanDescription_field.fill('Plan Decp 111');
        await this.Save_button.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * This method is used to click on Save button present on Edit Payment Source page
     */
    async Savebtn_Click() {
        await this.Save_button.click();
    }

    /**
     * This method is used to inactivate payment source
     */
    async InactivePaymentSource() {
        await this.Inactive_checkbox.check();
        await this.InactivateOn_Date.isEnabled();
        await this.InactivateOn_Date.fill('+0');
        await this.page.waitForTimeout(2000);
        await this.Inactivate_Time.fill('10:10');
        await this.page.waitForTimeout(2000);
        await this.Save_button.click();
    }
}