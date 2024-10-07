// Author - Vrushali Honnatti Date:10th July, 2024
import { Page, Locator, test } from '@playwright/test';
export class ReferralAssignmentsPage {

    constructor(page) {
        this.page = page;
        this.lastName_textbox = page.locator('#txtLastName');
        this.Refresh_button = page.locator('#btnRefresh');
        this.user_checkbox = page.locator('//input[contains(@id,"UserItemAvailableList_List_Container") and @type="checkbox"]');
        this.save_button = page.locator('#ButtonBarSave');
    }

    /**
     * Select User
     * @param {string} username
     * */
    async SelectUser(username) {

        await this.lastName_textbox.fill(username);
        await this.Refresh_button.click();
        await this.user_checkbox.click();
        await this.save_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

}