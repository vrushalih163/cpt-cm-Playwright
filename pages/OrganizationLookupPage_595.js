//Author: Rajakumar Maste, Created Date: 13 August 2024

export class OrganizationLookup {
    constructor(page) {
        this.page = page;
        this.Admin_Icon = page.getByRole('link', { name: ' Admin' });
        this.OrgLookup_link = page.getByRole('link', { name: 'Organization Lookup' });
        this.OrgType_Dropdownfield = page.locator('#cmbOrgTypes');
        this.Search_button = page.getByRole('button', { name: 'Search' });

        this.OrgSettings_Icon = page.locator('//a[@title="Settings"]');


    }

    /**
     * The organization id is mentioned in the environment variable
     * @param {*} OrgType  - Organization Type - Facility Provider, Hospital, HSP Provider, Physician Practice
     */
    async SearchOrganization(OrgType , OrgId){
        // Click on Admin link
        await this.Admin_Icon.click();
  
        // Click on Organization Lookup link
        await this.OrgLookup_link.click();

        // Select the organization type
        await this.OrgType_Dropdownfield.selectOption(OrgType);
        await this.page.waitForLoadState('domcontentloaded');

        // Check if the field has a value
        const orgIDField = this.page.locator('#txtOrgID');
        const currentValue = await orgIDField.inputValue();

        if (currentValue) {
            // Clear the field if it has a value
            await orgIDField.fill('');
        }

        // Fill the field with the new value
        await orgIDField.fill(OrgId);
        await this.page.waitForLoadState('domcontentloaded');

        // Click on search button
        await this.Search_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }

    /**
     * This method clicks on the Organization Settings icon
     */
    async OrgnizationSettings(){
        await this.OrgSettings_Icon.click();
    }
}