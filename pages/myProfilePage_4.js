// Author - Micho Eshete Date: 11/18/2024

import { expect } from '@playwright/test';
import { ApplicationNavigator } from './ApplicationNavigator';



export class MyProfile {
    constructor(page) {
        this.page = page;
        this.Appnav = new ApplicationNavigator(page);
        //this.userRoles_link = (roleName) => page.locator(`tr:has-text("${roleName}")`).first();
        this.userRoles_text = (roleName) => page.getByText(roleName);


    }
    
    /**
     * Checks if the specified role name is associated with the user roles.
     *
     * @param {string} roleName - The name of the role to check.
     * @returns {Promise<void>} A promise that resolves when the role check is complete.
     */
    async checkUserRolesAssociated(roleName) {
        const expectedRoles = await this.userRoles_text(roleName).innerText();
        expect(expectedRoles).toContain(roleName);
        console.log('Role associated with the user :' + roleName);
      }


}