// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test, expect } from '@playwright/test';
export class ReferralSummaryPage {

constructor(page) {
      this.page = page;
      this.LastResponseFirstRow_label = page.locator('xpath=//table[@id="Table2"]//table[@class="clsWorklist"]//tr[2]//td[8]');
      
}

async  validateLastResponse_row1(response){
        
      await expect(this.LastResponseFirstRow_label).toContainText (response);
           
}

}