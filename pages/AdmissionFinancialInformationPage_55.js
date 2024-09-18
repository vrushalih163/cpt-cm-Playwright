//Author - Rajakumar Maste, Created on - 18 Sept 2024

export class AdmissionFinancialInformation {
    constructor(page) {
        this.page = page;
        this.Edit_icon = page.locator('#gridPaymentSources_ctl02_EditLink');

    }

    /**
     * This method is used to click on Edit icon
     */
    async EditIcon_Click() {
        await this.Edit_icon.click();
    }
}