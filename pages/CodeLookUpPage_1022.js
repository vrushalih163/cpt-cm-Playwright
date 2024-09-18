//Author - Rajakumar Maste, Created on - 18 Sept 2024   

export class CodeLookUp {
    constructor (page) {
        this.page = page;
        this.Code_field = page.locator('//input[@id="txtCode"]');
        this.RefreshList_btn = page.locator('#btnRefresh');
        this.FirstResult_link = page.locator('(//tr//td[@class="clsItemSelectBorder"])[1]//a');
    }

    /**
     * This method used to enter the code into code field
     * @param {*} code Enter the Proper code
     */
    async Code(code) {
        await this.Code_field.fill(code);
    }

    /**
     * This method is used to click on Refresh List button
     */
    async Click_RefreshList() {
        await this.RefreshList_btn.click();
    }

    /**
     * This method is used to click on First Result link
     */
    async Click_FirstResult() {
        await this.FirstResult_link.click();
    }
}