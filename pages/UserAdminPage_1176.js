// Author - Micho Eshete Date: 08/14/2024
import { Page, Locator, test, expect} from '@playwright/test';

export class UserAdminPage {
    constructor(page) {
    this.page = page;
    
    //Locators
    
    this.user_admin_title = page.locator('span.ion-page-header-page-title[title="User Admin"]');
    this.user_dropdown = page.locator('#ddUsers');
    this.refresh_button = page.locator('#btnRefresh_Button');
    this.edit_associations_link = page.locator('#lnkEditAssociations'); 

    this.delete_button_1 = page.locator('input[type="image"][itemname="Allscripts QA Hospital 1 (harpo - 226280)"]');
    this.delete_button_2 = page.locator('input[type="image"][itemname="Allscripts QA Hospital 2 (zeppo - 226281)"]');
    this.delete_button_3 = page.locator('input[type="image"][itemname="ECIN Administrative Organization"]');
    this.delete_button_4 = page.locator('input[type="image"][itemname="QA Provider #1 (80891)"]');
    this.delete_button_5 = page.locator('input[type="image"][itemname="QA Provider #2 (80925)"]');
    this.default_radio_button_1 = page.locator(`input[name="rdoIsDefault"][value="226484"]`);
    this.default_radio_button_2 = page.locator(`input[name="rdoIsDefault"][value="8"]`);
    this.default_radio_button_3 = page.locator(`input[name="rdoIsDefault"][value="80891"]`);
    this.default_radio_button_4 = page.locator(`input[name="rdoIsDefault"][value="80925"]`);
    this.default_radio_button_5 = page.locator(`input[name="rdoIsDefault"][value="226280"]`);
    this.default_radio_button_6 = page.locator(`input[name="rdoIsDefault"][value="226281"]`);
    this.owning_org_radio_button_1 = page.locator(`input[name="rdoIsDefault"][value="226484"]`);
    this.owning_org_radio_button_2 = page.locator(`input[name="rdoIsDefault"][value="8"]`);
    this.owning_org_radio_button_3 = page.locator(`input[name="rdoIsDefault"][value="80891"]`);
    this.owning_org_radio_button_4 = page.locator(`input[name="rdoIsDefault"][value="80925"]`);
    this.owning_org_radio_button_5 = page.locator(`input[name="rdoIsDefault"][value="226280"]`);
    this.owning_org_radio_button_6 = page.locator(`input[name="rdoIsDefault"][value="226281"]`);
    
    this.contact_us_link = page.getByRole('link', { name: ' Contact Us' });
    this.save_button = page.locator('#ButtonBarSave');
    this.apply_button = page.locator('#ButtonBarSave');
    this.reset_button = page.locator('#ButtonBarReset');
    this.cancel_button = page.locator('#ButtonBarCancel');

    }

    async UserAdminPageTitle(expectedTitle) {
       await expect(this.user_admin_title).toContainText(expectedTitle);
    }

    async clickEditAssociationsLink() {
    await this.edit_associations_link.click({timeout: 2000});
    await this.page.waitForLoadState('domcontentloaded');

    }

    async testTabOrder() {
        const elements = [
          this.user_dropdown,
          this.refresh_button,
          this.edit_associations_link,
          this.delete_button_1,
          this.delete_button_2,
          this.default_radio_button_1,
          this.default_radio_button_2,
          this.default_radio_button_3,
          this.default_radio_button_4,
          this.default_radio_button_5,
          this.default_radio_button_6,
          this.owning_org_radio_button_1,
          this.owning_org_radio_button_2,
          this.owning_org_radio_button_3,
          this.owning_org_radio_button_4,
          this.owning_org_radio_button_5,
          this.owning_org_radio_button_6,
          this.delete_button_3,
          this.delete_button_4,
          this.contact_us_link,
          this.save_button,
          this.apply_button,
          this.reset_button
        ];
    
        for (let i = 0; i < elements.length; i++) {
          await elements[i].focus();
          await expect(elements[i]).toBeFocused();
          await this.page.keyboard.press('Tab');
        }
    }



}
