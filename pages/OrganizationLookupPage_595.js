//Author: Rajakumar Maste, Created Date: 13 August 2024
//Modified By: Rajakumar Maste, Modified Date: 11 Sept 2024
//Comment: added a locator in SearchOrganization() method

const { expect } = require('@playwright/test');
export class OrganizationLookup {
    constructor(page) {
        this.page = page;

        this.Admin_Icon = page.getByRole('link', { name: ' Admin' });
        this.OrgLookup_link = page.getByRole('link', { name: 'Organization Lookup' });
        this.OrgType_Dropdownfield = page.locator('#cmbOrgTypes');
        this.OrgId_field = page.locator('#txtOrgID');
        this.Search_button = page.getByRole('button', { name: 'Search' });
        
        this.org_settings_icon = page.locator('xpath=//tr[@id="OrganizationsGrid-data-row-entity-index-1"]//a[@title="Settings"]');
        this.OrgSettings_Icon = page.locator('//a[@title="Settings"]').first();
        this.user_icon = page.locator('//a[@title="Users"]');
        this.search_user = (username) =>page.locator(`a[id^="dgUsers"]:has-text("${username}")`);
    }

    /**
     * The organization id is mentioned in the environment variable
     * @param {*} OrgType  - Organization Type - Facility Provider, Hospital, HSP Provider, Physician Practice
     */
    async SearchOrganization(OrgType , OrgName){
        // Click on Admin link
        this.Admin_Icon.click();
        this.page.waitForTimeout(3000);
  
        // Click on Organization Lookup link
        this.OrgLookup_link.click();
        this.page.waitForTimeout(3000);

        // Select the organization type
        await this.OrgType_Dropdownfield.selectOption(OrgType);
        await this.page.waitForLoadState('domcontentloaded');

        // Check if the field has a value
        const orgNameField = this.page.locator('#txtName');
        const currentValue = await orgNameField.inputValue();

        if (currentValue) {
            // Clear the field if it has a value
            await orgNameField.fill('');
        }

        // Fill the field with the new value
        await orgNameField.fill(OrgName);
        await this.page.waitForLoadState('domcontentloaded');

        // Clear the Organization ID field
        await this.OrgId_field.clear();

        // Click on search button
        await this.Search_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }

    async searchAnOrganization(OrgType, OrgName) {
        // Select the organization type
        await this.OrgType_Dropdownfield.selectOption(OrgType);
        await this.page.waitForLoadState('domcontentloaded');
       
        // Fill the field with the new value
        const orgNameField = this.page.locator('#txtName');
        await orgNameField.fill(OrgName);
        await this.page.waitForLoadState('domcontentloaded');
        
        // Clear the Organization ID field
        await this.OrgId_field.clear();

        // Click on search button
        await this.Search_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }

    async clickOrgnizationSettingsicon(){
        await this.org_settings_icon.click();
    }

    /** This method clicks on the Organization Settings icon    */
    async OrgnizationSettings(){
        await this.OrgSettings_Icon.click();
    }

    /** This method clicks on the User icon   */

    async userIcon(){
        await this.user_icon.click();
    }

    /**
   * Returns the user link element with the specified text.   */
   
  /** Returns the user link element with the specified username and clicks on it.  */
  async clickUserLogonLinkByUsername(username) {
    const userLogonLink = this.search_user(username);
    await expect(userLogonLink).toHaveCount(1); 
    await userLogonLink.click({ timeout: 20000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

}