// Author - Micho Eshete Date: 11/04/2024

import { page } from '@playwright/test';

export class ManageSecurityGroups {
    constructor (page) {
        this.page = page; 
        // Locator for the "Add Security Group" link
        this.addSecurityGroup_button = page.locator('#ApiGridManageSecurityGroup_action_0');
    }

    // Method to click on the "Add Security Group" link
    async clickAddSecurityGroup() {
        await this.addSecurityGroup_button.click();
    }




}