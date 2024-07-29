// Author - Rajakumar Maste, Created Date: 29 July 2024
export class ManageReferral {
    constructor(page) {
        this.page = page;
        this.PatientTaskWorkList_icon = page.locator('div').filter({ hasText: /^checklist$/ });

    }

    /**
    * Manage Referral Page
    * 
    * **Visibility**
    * Patient task worklist icon will be visible in secondary banner page of manage referral page. Upon clicking on this patient task worklist modal will get opened.
    * 
    */
    async PatientTaskWorkList() {
        await this.PatientTaskWorkList_icon.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
}