//Author - Priyanka Bachwal Date: 09/17/2024
//Modified By - Vrushali Date: 11/21/2024
import { Page, Locator, test, expect } from '@playwright/test';
export class OrganizationDetailsPage {
  constructor(page) {
    this.page = page;

    this.organization_editcompanyprofilelink = page.getByRole('link', { name: 'Edit Company Profile' });
    this.ExternalAuth_checkbox = page.locator('#chkCanUseExternalAuthentication');
    this.AuthenticationProvider_dropdown = page.locator('#cmbAuthenticationProvider');
    this.Save_button = page.locator('#ButtonBarSave');
  }

  /**
  * Click on Edit Company Profile link
  */
  async clickEditCompanyProfileLink() {
    await this.organization_editcompanyprofilelink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Click on External Auth Checkbox
   */
  async ClickExternalAuthCheckbox() {
    await this.ExternalAuth_checkbox.click();
  }

  /**
   * Select Authentication Provider
   */
  async selectAuthenticationProvider(value) {
    await this.AuthenticationProvider_dropdown.selectOption({ label: value });
}

  /**
   * Click on Save Button
   */
  async clickSaveButton() {
    await this.Save_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
}



