// Author - Micho Eshete Date: 11/04/2024

import { page } from '@playwright/test';

export class ManageSecurityGroups {
    constructor (page) {
        this.page = page; 
        // Locator for the "Add Security Group" link
        this.addSecurityGroup_button = page.locator('#ApiGridManageSecurityGroup_action_0');
        this.delete_link = page.locator('a.delete-link');

    }

    // Method to click on the "Add Security Group" link
    async clickAddSecurityGroup() {
        await this.addSecurityGroup_button.click();
    }


    
    /**
     * Deletes a security group by name.
     * 
     * @param {string} securityGroupName - The name of the security group to delete.
     * @returns {Promise<void>} A promise that resolves when the security group is deleted.
     */
    async deleteSecurityGroupByName(securityGroupName) {
        const rowLocator = this.page.locator(`tr:has-text("${securityGroupName}")`);
        const deleteLinkLocator = rowLocator.locator('a.delete-link');
        // Ensure the element is visible and scroll into view if necessary
        await deleteLinkLocator.scrollIntoViewIfNeeded();
        await deleteLinkLocator.waitFor({ state: 'visible' });
        await deleteLinkLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log(`Security group "${securityGroupName}" deleted`);
    
    }


}