// Author - Vrushali Honnatti Date:22nd July, 2024
import { expect } from "@playwright/test";

export class ReviewSummaryPage {

constructor(page) {
      this.page = page;
      this.MCGCermeData_label = page.locator('xpath=//table[@id="Table2"]//td[@class="clsReferralOutputCell"]');
      this.EditReview_button = page.getByRole('button', { name: 'Edit Review' });
      this.SelectAll_checkbox = page.getByRole('cell', { name: 'Select All', exact: true });
      this.Next_button = page.getByRole('button', { name: 'Next' });
      
}

async ClickEditReview(){
    await this.EditReview_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    
    if(await this.SelectAll_checkbox.isVisible()){
        await this.page.waitForTimeout(2000);
        await this.SelectAll_checkbox.click();
        await this.Next_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
    
}   

async  ValidateMCGCermeData(data){
        
    expect(this.page.locator('//table[@id="Table2"]//td[@class="clsReferralOutputCell"]')).toContainText(data);
           
}

}