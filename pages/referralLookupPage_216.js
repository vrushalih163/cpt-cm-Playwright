//Author: Priyanka Bachwal Date: August 21,2024

import {Page, Locator, test, expect} from '@playwright/test';
export class ReferralLookupPage {

constructor(page) {
    this.page = page;
    this.referralnumber_field = page.locator('#edtReferralNumber_Number');
    this.continue_button = page.getByRole('button', { name: 'Continue' });
    this.page_label = page.getByTitle('Referral Lookup');
}

//Verify the Referral Lookup page title is displayed
async validateReferralLookuppage() {
  await expect(this.page_label).toBeVisible();
  if (await this.page_label.isVisible()){
      console.log('Referral Lookup title is displayed');
  }else{
      console.log('Error Message : Referral Lookup title is not displayed');
  }    
}

//Fill the Referral Number and click on Continue button
async searchByReferralNum(refNum)
{
  await this.referralnumber_field.fill(refNum);
  await this.continue_button.click({timeout:20000});
}
}


