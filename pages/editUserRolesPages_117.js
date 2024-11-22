// Author - Micho Eshete Date: 11/015/2024

import { exept } from '@playwright/test';

export class editUserRoles {
    constructor(page) {

        this.page = page;

        this.selectAllRoles_checkbox = page.locator('#tblRoles');
        this.save_button = page.locator('#ButtonBarSave');
    }



 /**
 * Uncheck the checkboxes next to all roles except the specified role.
 * 
 * @param {string} roleToKeep - The label of the role checkbox to keep checked.
 */
async uncheckMultipleRolesExcept(roleToKeep) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    // Get all labels
    const labels = await this.page.locator('#tblRoles label').elementHandles();

    for (const label of labels) {
        // Get the text of the label
        const labelText = await label.evaluate(node => node.innerText);

        // Uncheck the checkbox if the label is not the specified role
        if (labelText !== roleToKeep) {
            // Get the associated checkbox using the 'for' attribute
            const checkboxId = await label.evaluate(node => node.getAttribute('for'));
            const checkbox = this.page.locator(`#${checkboxId}`);

            const isChecked = await checkbox.evaluate(node => node.checked);
            if (isChecked) {
                await checkbox.click(); // Click the checkbox to uncheck it
            }
        }
    }
    await this.save_button.click(); 
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

}