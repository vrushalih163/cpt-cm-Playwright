// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class ReportLibraryPage {

constructor(page) {
      this.page = page;
      this.UM_Link = page.getByRole('link', { name: ' Utilization Management' });
      this.RunReviewDetailReport_Link = page.locator('#ApiGridReports-data-row-entity-index-10').getByRole('link', { name: '' });

      // UM Report Type Controls
      this.cbxIncludeDCPatients = page.locator('#cbxIncludeDCPatients');
      this.cbxIncludeNotNullReviewer = page.locator('#cbxIncludeNotNullReviewer');
      this.ReviewType_filter = page.locator('#rptReviewType_ddlFiveDDLFilter');
      this.ReviewType_dd1 = page.locator('#rptReviewType_ddl1');
      this.ReviewCriteria_filter = page.locator('#rptReviewCriteriaStatus_ddlFiveDDLFilter');
      this.ReviewCriteria_dd1 = page.locator('#rptReviewCriteriaStatus_ddl1');
      this.UMStatus_filter = page.locator('#rptUMStatus_ddlFiveDDLFilter');
      this.UMStatus_dd1 = page.locator('#rptUMStatus_ddl1');
      this.Generate_button = page.locator('#ButtonBarGenerate');
}

async SearchReviewDetailsReport(reviewType, reviewCriteria, UMStatus){
    await this.UM_Link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.RunReviewDetailReport_Link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    
    if(await this.cbxIncludeDCPatients.isChecked() == false){
        await this.cbxIncludeDCPatients.check();
    }

    if(await this.cbxIncludeNotNullReviewer.isChecked() == false){
        await this.cbxIncludeNotNullReviewer.check();
    }

    await this.ReviewType_filter.selectOption('Include');
    await this.page.waitForTimeout(500);
    await this.ReviewType_dd1.selectOption(reviewType);

    await this.ReviewCriteria_filter.selectOption('Include');
    await this.page.waitForTimeout(500);
    await this.ReviewCriteria_dd1.selectOption(reviewCriteria);

    await this.UMStatus_filter.selectOption('Include');
    await this.page.waitForTimeout(500);
    await this.UMStatus_dd1.selectOption(UMStatus);

    const page5Promise = this.page.waitForEvent('popup');
    await this.Generate_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  const page5 = await page5Promise;

}

}