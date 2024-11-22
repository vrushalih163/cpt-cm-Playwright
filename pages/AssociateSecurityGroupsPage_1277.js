// Author - Micho Eshete Date: 11/04/2024

import { expect } from '@playwright/test';

export class AssociateSecurityGroups {
    constructor(page) {
        this.page = page;
        this.securityGroupAssociation_title = page.locator('#lblFormSubHeader');
        this.checkbox = page.locator('.data-row .row-check input[type="checkbox"]');
        this.securityGroup_checkbox = (securityGroupName) => page.locator(`tr:has(td:has-text("${securityGroupName}")) .row-check input[type="checkbox"]`);
        this.associateSecurityGropus_button = page.locator('#ApiGridAvailableSecurityGroups_action_0');
        this.back_button = page.locator('#ButtonBarBack');

    }



    /**
     * Checks if the "Associate Security Groups" title is displayed.
     * 
     * @returns {Promise<void>} A promise that resolves when the title check is complete.
     */
    async checkSecurityGroupAssociationTitle(epectedTitle) {
        const title = await this.securityGroupAssociation_title.innerText();
        expect(title).toContain(epectedTitle);
        console.log('Associate Security Groups title is displayed');
    }


 
    /**
     * Selects the security group by checking the corresponding checkbox.
     * 
     * @param {string} securityGroupName - The name of the security group to select.
     * @returns {Promise<void>} A promise that resolves when the security group is selected.
     */

    async selectSecurityGroupAndAssociate() {
        await this.checkbox.check();
        await this.page.waitForLoadState('domcontentloaded');
        await this.associateSecurityGropus_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.back_button.click();
    }

}