// Author - Vrushali Honnatti Date:22nd July, 2024
import { expect } from "@playwright/test";

export class ReviewSummaryPage {

constructor(page) {
      this.page = page;
      this.MCGCermeData_label = page.locator('xpath=//table[@id="Table2"]//td[@class="clsReferralOutputCell"]');
      
}

async  ValidateMCGCermeData(data){
        
    expect(this.page.locator('//table[@id="Table2"]//td[@class="clsReferralOutputCell"]')).toContainText(data);
           
}

}