// Author - Vrushali Honnatti Date:10th July, 2024
import { page, Locator, test } from '@playwright/test';
export class ApplicationNavigator {

  constructor(page) {
    this.page = page;

    this.refresh_link = page.getByRole('link', { name: 'PageHeader$IonHeaderRefreshButton' });
    this.manage_link = page.getByRole('link', { name: ' Manage' });

    this.patients_link = page.getByRole('link', { name: 'Patients ' });
    this.patientsdefaultview_link = page.getByRole('link', { name: 'Patients Default View' });

    this.IncomingReferrals_link = page.getByRole('link', { name: 'Incoming Referrals ' });
    this.IncomingReferralsEnhancedView_link = page.getByRole('link', { name: 'Incoming Referrals View -' });

    this.home_link = page.getByRole('link', { name: ' Home' });
    this.changeOrg_link = page.getByRole('link', { name: 'Change Organization' });

    //Configure icon 
    this.configure_link = page.locator('#MenuBar_Configure_Header');

    //Discharge planning link
    this.DischargePlanning_link = page.locator('//a[@data-id="Configure_Header_Configure_Header_Menu_Discharge Planning"]');

    //Referral type editor link
    this.ReferralTypeEditor_link = page.getByRole('link', { name: 'Referral Type Editor' });

    //Referral configuration link
    this.ReferralConfiguration_link = page.getByRole('link', { name: 'Referral Configuration' });

    //Referral lookup link
    this.ReferralLookup_link = page.getByRole('link', { name: 'Referral Lookup' });
  }

  async clickRefresh() {
    await this.refresh_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async NavigateToPatientsDefaultView() {

    await this.manage_link.click();
    await this.patients_link.click();
    await this.patientsdefaultview_link.click();
  }

  async NavigateToIncomingReferralsEnhancedView() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    await this.manage_link.click();
    await this.IncomingReferrals_link.click();
    await this.IncomingReferralsEnhancedView_link.click();
  }

  async NavigateToChangeOrg(orgName) {

    await this.home_link.click();
    await this.page.waitForTimeout(2000);
    await this.changeOrg_link.click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: orgName }).click();
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForTimeout(10000);
    return this.page;
  }

  /**
   * Navigate to Discharge Planning -> Referral Type Editor
   */
  async NavigateToReferralTypeEditor() {
    await this.configure_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.DischargePlanning_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.ReferralTypeEditor_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return this.page;
  }

  /**
   * Navigate to Discharge Planning -> Referral Configuration
   */
  async NavigateToReferralConfiguration() {
    await this.configure_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.DischargePlanning_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.ReferralConfiguration_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return this.page;
  }

  /**
   * Navigate to Referral Lookup
   */
  async navigateToReferralLookup() {
    await this.manage_link.click();
    await this.ReferralLookup_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}
}