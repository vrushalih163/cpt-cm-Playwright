//  Author - Pavan.S Date:8th Aug, 2024

const { expect } = require("@playwright/test")
const { URL } = process.env

export class AdmissionDefaultViewPage {

    constructor(page) {
        this.page = page;
        this.ConnectTimeline_link = page.getByRole('link', { name: 'Navigate to Connect Timeline' });
        this.action_dropdownbox = page.locator('#ucViewGrid_dgView_ctl03_Actions_0_0_0_ActionItems');
    }

    /**
     * This method is used to click on the Connect Timeline link in Admission Default View page.
     */
    async ClickConnectTimeline() {
        await this.ConnectTimeline_link.click();
        await this.page.waitForTimeout(3000);

    }

    /**
     * This method is used to search an admission in Admission Default View page.
     * @param {string} admission
     */
    async SearchAdmission(admissionId) {
        await this.page.getByRole('link', { name: 'Maximize Panel' }).click();
        await this.page.getByRole('button', { name: 'Defaults' }).click();
        await this.page.locator('#ViewSearchBar_AccountNumber').click();
        await this.page.locator('#ViewSearchBar_AccountNumber').fill((await admissionId).toString());
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    /**
     * This method is used to navigate to the action dropdown box in Admission Default View page.
     * @param {string} action
     */
    async navigateActionDDBox(action) {
        await this.action_dropdownbox.selectOption(action);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
      }
}