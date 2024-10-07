// Author - Vrushali Honnatti Date:23rd Sept, 2024
import {Page, Locator, test } from '@playwright/test';
export class ContactListPage {

constructor(page) {
      this.page = page;
      this.searchUsers_dropDown = page.getByRole('combobox', { name: 'Search users' });
      this.NotificationAssignedUser = page.getByLabel('Configurations').getByRole('checkbox').first(); ////acm-inputswitch[@id="swAssignedUsers"]//span[@class="ui-inputswitch-slider"]
}

/**
 * Search for a user
 * @param {string} userName    User name to be searched
 */
async  SearchUser(userName){

      await this.searchUsers_dropDown.click();
      await this.searchUsers_dropDown.fill(userName);
      await this.searchUsers_dropDown.press('Enter');
      await this.page.waitForTimeout(1000);
      await this.page.getByText('automation, qa').click();           
}

/**
 * Click on Notification Assigned User
 */
async  ClickNotificationAssignedUser(flag){
      const attributeValue = await this.page.$eval('//acm-inputswitch[@id="swAssignedUsers"]//div[@role="checkbox"]', element => element.getAttribute('aria-checked'));
      if(attributeValue !== flag)
      {
            await this.NotificationAssignedUser.click();
      }
}

}