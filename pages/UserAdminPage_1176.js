import { Page, Locator, test, expect } from '@playwright/test';

export class UserAdminPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.user_admin_title = page.locator('span.ion-page-header-page-title[title="User Admin"]');
        this.user_dropdown = page.locator('#ddUsers');
        this.refresh_button = page.locator('#btnRefresh_Button');
        this.edit_associations_link = page.locator('#lnkEditAssociations');

    }

    async UserAdminPageTitle(expectedTitle) {
        await expect(this.user_admin_title).toContainText(expectedTitle);
    }

    async clickEditAssociationsLink() {
        await this.edit_associations_link.click({ timeout: 2000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * This method is designed to locate and return a set of delete button elements 
     * on user admin page based on predefined values.
     */
    async deleteButton() {
        // Delete buttons

        const deleteButtonNames = [
            "Allscripts QA Hospital 1 (harpo - 226280)",
            "Allscripts QA Hospital 2 (zeppo - 226281)",
            "ECIN Administrative Organization",
            "QA Provider #1 (80891)",
            "QA Provider #2 (80925)"
        ];

        this.delete_buttons = deleteButtonNames.map(name => this.page.locator(`input[type="image"][itemname="${name}"]`));
        return this.delete_buttons;

    };

    /**
     * This method is designed to locate and return a set of default radio button elements 
     * on user admin page based on predefined values.
     */
    async defaultRadioButtons() {
        // Default radio buttons
        const defaultRadioValues = ["226484", "8", "80891", "80925", "226280", "226281", "226484"];
        this.default_radio_buttons = defaultRadioValues.map(value => this.page.locator(`input[name="rdoIsDefault"][value="${value}"]`));
        return this.default_radio_buttons;

    };

    /**
     * This method is designed to locate and return a set of owning org radio button elements 
     * on user admin page based on predefined values.
     */

    async owningOrgRadioButtons() {
        // Owning org radio buttons
        const owningOrgRadioValues = ["226484", "8", "80891", "80925", "226280", "226281", "226484"];
        this.owning_org_radio_buttons = owningOrgRadioValues.map(value => this.page.locator(`input[name="rdoIsOwningOrg"][value="${value}"]`));
        return this.owning_org_radio_buttons;

    };

    /**
     * This method is designed to locate and return a set of action bar button elements 
     * on user admin page.
     */

    async actionBarButtons() {
        // Action bar buttons
        const actionBarButtonsValues = ["Save", "Apply", "Reset", "Cancel"];
        this.action_bar_buttons = actionBarButtonsValues.map(value => this.page.locator(`button[value="${value}"]`));
        return this.action_bar_buttons;
    };

    /**
     * Performs the user admin tab order logic.
     * Ensures that delete buttons and radio buttons are initialized.
     * Focuses on each element in a specific order and presses the Tab key.
     * 
     */
    async userAdminTabOrderLogic() {

        // Ensure delete buttons and radio buttons are initialized
        await this.deleteButton();
        await this.defaultRadioButtons();
        await this.owningOrgRadioButtons();
        await this.actionBarButtons();

        const elements = [
            this.user_dropdown,
            this.refresh_button,
            this.edit_associations_link,
            ...await this.defaultRadioButtons(),
            ...await this.owningOrgRadioButtons(),
            ...await this.deleteButton(),
            ...await this.actionBarButtons(),
        ];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            await this.page.keyboard.press('Tab');
            await element.focus();
            await expect(element).toBeFocused();
            
           
        }
    }
}