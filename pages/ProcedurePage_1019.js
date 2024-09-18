// Author - Rajakumar Maste, Created on - 18 Sept 2024

export class Procedure {
    constructor(page) {
        this.page = page;
        this.AddProcedure_link = page.locator('#procedureListCtrl_addPxLnk');
    }

    /**
     * This method is used to click on Add Procedure link
     */
    async Click_AddProcedure() {
        this.AddProcedure_link.click();
        this.page.waitForLoadState('networkidle');
    }
}