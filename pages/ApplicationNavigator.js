// Author - Vrushali Honnatti Date:10th July, 2024
import { page, Locator, test } from '@playwright/test';
export class ApplicationNavigator {

  constructor(page) {
    this.page = page;

    this.refresh_link = page.locator('#PageHeader_IonHeaderRefreshButton');
    this.manage_link = page.locator('#MenuBar_Manage_Header');

    this.patients_link = page.locator('#Manage_Header_Manage_Header_Menu_Patients');
    this.patientsdefaultview_link = page.getByRole('link', { name: 'Patients Default View' });

    this.IncomingReferrals_link = page.getByRole('link', { name: 'Incoming Referrals ' });
    this.IncomingReferralsEnhancedView_link = page.getByRole('link', { name: 'Incoming Referrals View -' });

    this.home_link = page.getByRole('link', { name: ' Home' });
    this.changeOrg_link = page.getByRole('link', { name: 'Change Organization' });
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

  
}