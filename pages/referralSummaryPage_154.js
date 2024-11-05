// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test, expect } from '@playwright/test';
export class ReferralSummaryPage {

constructor(page) {
      this.page = page;
      this.LastResponseFirstRow_label = page.locator('xpath=//table[@id="Table2"]//table[@class="clsWorklist"]//tr[2]//td[8]');
      this.waitingForYouLink = page.locator('xpath=//a[contains(text(),"Waiting for")]');
      this.EditReferral_button = page.locator('xpath=//input[@id="ButtonBarEditReferral"]');
}

/**
 * Click on Waiting for you Link
 */
async  clickWaitingForYouLink(index){
      await this.waitingForYouLink.nth(index).click();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
}

/**
 * Click on Edit Referral Button
 */
async  clickEditReferralButton(){
      await this.EditReferral_button.click();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
}     

/**
 * Validate Last Response row1
 */
async  validateLastResponse_row1(response){
        
      await expect(this.LastResponseFirstRow_label).toContainText (response);
           
}

}