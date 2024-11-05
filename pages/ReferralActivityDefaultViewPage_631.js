// Author - Vrushali Honnatti Date:10th July, 2024
//Modified - Vrushali Honnatti Date: 7th August, 2024
import { expect } from '@playwright/test';
export class ReferralActivityDefaultViewPage {
  //exports.LoginPage = class PatientdefaultviewsPage {

  constructor(page) {
    this.page = page;
    this.maximizeSearchPanel_link = page.getByRole('link', { name: 'Maximize Panel' });
    this.viewSearchBar_ReferralID = page.locator('#ViewSearchBar_ReferralID');
    this.search_button = page.getByRole('button', { name: 'Search' });

    this.action_dropdownbox = page.locator('#ucViewGrid_dgView_ctl03_Actions_0_0_0_ActionItems');

    this.maximizePanel_Button = page.getByRole('link', { name: 'Maximize Panel' });
    this.noRecords_label = page.locator('span#ucViewGrid_lblNoRecords');

    this.unasigned_link = page.locator('a#ucViewGrid_dgView_ctl03_AssignedUser_0_0_1');

  }

  async searchReferralId(referralId) {

    const elementSelector = 'span#ucViewGrid_lblNoRecords';
    let isVisible = await this.page.isVisible(elementSelector);

    do {
      await this.page.getByRole('link', { name: 'Maximize Panel' }).click();
      await this.page.getByRole('button', { name: 'Defaults' }).click();
      await this.page.locator('#ViewSearchBar_ReferralID').click();
      await this.page.locator('#ViewSearchBar_ReferralID').fill((await referralId).toString());
      await this.page.getByRole('button', { name: 'Search' }).click();
      await this.page.waitForTimeout(2000);
      isVisible = await this.page.isVisible(elementSelector);
    } while (isVisible)

  }

  async navigateActionDDBox(action) {
    await this.action_dropdownbox.selectOption(action)
    this.page.waitForTimeout(2000);
    //await this.page.getByText(action).click();
  }

  async ValidateNoRecordsLabel() {
    await expect(this.noRecords_label).toContainText('No records found');
  }

  /**
   * Click on Unassigned link
   */
  async ClickUnassignedLink() {
    await this.unasigned_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  } 
}