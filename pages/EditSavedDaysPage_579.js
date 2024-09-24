// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class EditSavedDays {
    constructor(page) {
        this.page = page;
        this.NumberOfDays_field = page.locator('#neNumberOfDays_Number');
        this.Reason_dropdown= page.locator('#ddReasons');
        this.Level_dropdown = page.locator('#ddFacilityLevelOfCare');
        this.PayorPlan_dropdown = page.locator('#ddPayorPlan');
        this.Comment_field = page.locator('#txtComment');
        this.Save_button = page.getByRole('button', { name: 'Save' });   
    }

    /**
     * This method is used to enter number of days
     * @param {*} Days Enter the number of days
     */
    async NumberOfDays(Days) {
        await this.NumberOfDays_field.fill(Days);

    }

    /**
     * This method is used to select the reason from the dropdown
     * @param {*} reason Enter the reason which the user wants to select
     */
    async Reason(reason) {
        await this.Reason_dropdown.selectOption(reason);
    }

    /**
     * This method is used to select the level from the dropdown
     * @param {*} level Enter the level to select from the dropdown
     */
    async Level(level) {
        await this.Level_dropdown.selectOption(level);
    }

    /**
     * This method is used to select the payor plan from the dropdown
     * @param {*} payorpaln Enter the payor plan to select from the dropdown
     */
    async Payorplan(payorplan) {
        await this.PayorPlan_dropdown.selectOption(payorplan);
    }

    /**
     * This method is used to enter the comment
     * @param {*} comment Enter the comment
     */
    async Comment(comment) {
        await this.Comment_field.fill(comment);
    }

    /**
     * This method is used to click on the save button
     */
    async Save_btn() {
        await this.Save_button.click();
    }
}