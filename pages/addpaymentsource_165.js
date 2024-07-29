// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class AddPaymentSourcePage {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.finClass_select = page.locator('#listPaymentType');
      this.save_button = page.getByRole('button', { name: 'Save' });

      this.addfinancial_link = page.locator('#LinkAddPaymentSource');
}


async  setFinClass(finClass){

     await this.finClass_select.selectOption(finClass);
     await this.save_button.click();
           
}

}