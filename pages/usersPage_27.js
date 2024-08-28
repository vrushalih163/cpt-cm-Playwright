// Author - Micho Eshete Date: 08/08/2024
import { Page, Locator, test, expect, value, itemname } from '@playwright/test';

export class usersPage {
  constructor(page) {
    this.page = page;
    this.userName_text_box = page.locator('#TextBoxFilter');
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
    await expect(userLink).toHaveCount(1); 
    await userLink.click({timeout:20000});
    await this.page.waitForLoadState('domcontentloaded');
    
  }
}


