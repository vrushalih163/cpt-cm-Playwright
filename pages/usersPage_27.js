// Author - Micho Eshete Date: 08/08/2024
import { Page, Locator, test, expect, value, itemname } from '@playwright/test';

export class usersPage {
  constructor(page) {
    this.page = page;
    this.userName_text_box = page.locator('#TextBoxFilter');
    this.addUser_link = page.locator('#LinkAddUser');
    this.userDelete_button = page.locator('#DataGrid1_ctl03_ImageButtonTrashCan'); 
    this.confirmation_button = page.locator('button:has-text("Yes")');
  }

   /**
   * Returns the user link element with the specified text.
   */
  async getUserLinkByText(name) {
    return this.page.getByRole('link', { name: name, exact: true });
  }


  /**
   * Searches for a user by name or username.
   */
  async searchNameOrUserName(name) {
    // Fill the text box, press 'Enter', and verify the value
    await this.userName_text_box.fill(name);
    await this.userName_text_box.press('Enter');
    await expect(this.userName_text_box).toHaveValue(name);

    const userLink = await this.getUserLinkByText(name);
    // Ensure only one element matches the search criteria.
    //await expect(userLink).toHaveCount(1, { timeout: 10000 }); 
    await this.page.waitForLoadState('domcontentloaded');
    
  }

  /**
   * Clicks on a user link by the given name and waits for the page to load.
   *
   */
  async clickUserName(name) {
    const userLink = await this.getUserLinkByText(name);
    await userLink.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Clicks the Add User link.
   */
  async clickAddUser() {
    await this.addUser_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

  /**
   * Clicks the delete button for the specified user.
   */
  /**
   * Deletes a user by clicking the delete button, waiting for the page to load,
   * and confirming the deletion. Includes delays to ensure actions are completed.
   */
  async deleteUser() {
    await this.userDelete_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.confirmation_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  

  }

 
}
