// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class PayorAuthorizations {
    constructor(page) {
        this.page = page;
        this.Add_link = page.locator('#lnkAddAuthorization');
        this.UMNotes_link = page.locator('#lnkAddNote');
        this.EditPayorAuthorization_link = page.locator('#dgNotesAndCommunications_ctl03_lnkCreatedOnDate');
    }

    /**
     * This method is used to click on Add link
     */
    async AddPayorAuthorizations() {
        await this.Add_link.click();
    }

    async AddUMNotes() {
        await this.UMNotes_link.click();
    }

    async EditPayorAuthorization() {
        await this.EditPayorAuthorization_link.click();
    }
    
}