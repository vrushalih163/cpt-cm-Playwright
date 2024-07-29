// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class FinancialPage {

constructor(page) {
      this.page = page;
      this.addfinancial_link = page.locator('#LinkAddPaymentSource');
}


async  clickaddfinancial(){

      await this.addfinancial_link.click();
           
}

}