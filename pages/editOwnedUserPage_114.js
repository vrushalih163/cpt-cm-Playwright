// Author - Micho Eshete Date: 11/15/2024

import { expect } from '@playwright/test';


export class editOwnedUser {
    constructor(page) {
        this.page = page;
        this.editUserRoles_link = page.locator('#LinkEditApplicationRights');
        this.securityGroupAssociation_link = page.locator('#LinkAssociateSecurityGroups');
        this.rolesAssociatedSecurit_Link = (linkText) => page.getByRole('link', { name: linkText });
        this.securityGroupsModal_test = page.locator('#SecurityGroupsGrid-data-row-entity-index-0');
        this.close_button = page.getByRole('button', { name: 'Close' });



    }


    /**
     * Clicks on the "Edit User Roles" link and waits for the page to load.
     * 
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */
    async clickEditUserRolesLInk() {
        await this.editUserRoles_link.click();
        await this.page.waitForLoadState('domcontentloaded');
    }


    /**
     * Clicks on the "Security Group Association" link and waits for the page to load.
     * 
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */

    async clickSecurityGroupAssociationLink() {
        await this.securityGroupAssociation_link.click();
        await this.page.waitForLoadState('domcontentloaded');

    }

    
    /**
     * Clicks on the "Yes" link to confirm the roles associated with the security groups.
     * 
     * @param {boolean} boolean - Indicates whether to click "Yes" or "No".
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */
    async clickYesNoLink(boolean) {
        const linkText = boolean ? 'Yes' : 'No';
        await this.rolesAssociatedSecurit_Link(linkText).click();
        await this.page.waitForLoadState('domcontentloaded');
    }



    /**
     * Verifies the security groups modal contains the specified name and description.
     * 
     * @param {string} name - The name to verify in the modal.
     * @param {string} description - The description to verify in the modal.
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     */
    async verifySecurityGroupsModal(nameAndDescription) {
        await expect(this.securityGroupsModal_test).toContainText(nameAndDescription);
        await this.close_button.click();
    }

   
}