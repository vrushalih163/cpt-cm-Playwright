// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class SavedDays {
    constructor(page) {
        this.page = page;
        this.Add_link = page.locator('td a#lnkAdd');
        this.Reason_dropdown = page.locator('#ddFacilityLevelOfCare');
    }
 
    /**
     * This method is used to click on Add link
     */
    async ClickAdd() {
        await this.Add_link.click();
    }

}