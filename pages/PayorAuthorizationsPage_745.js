// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class PayorAuthorizations {
    constructor(page) {
        this.page = page;
        this.Add_link = page.locator('#lnkAddAuthorization');
        this.UMNotes_link = page.locator('#lnkAddNote');
    }

    /**
     * This method is used to click on Add link
     */
    async Add_PayorAuthorizations() {
        await this.Add_link.click();
    }

    async Add_UMNotes() {
        await this.UMNotes_link.click();
    }
    
}