// Author - Vrushali Honnatti Date:10th July, 2024
// Modified by: Rajakumar Maste, Modified on: 24 Sept 2024
import { Page, Locator, test } from '@playwright/test';
export class AdmissionFinancialInformation {
      constructor(page) {
            this.page = page;
            this.addfinancial_link = page.locator('#LinkAddPaymentSource');
            this.Edit_icon = page.locator('#gridPaymentSources_ctl02_EditLink');
      }


      async clickaddfinancial() {

            await this.addfinancial_link.click();

      }
      /**
       * This method is used to click on Edit icon of financial class
       */
      async EditIcon_Click() {
            await this.Edit_icon.click();
      }

}