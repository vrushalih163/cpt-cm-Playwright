// Author - Rajakuamr Maste, Date: 13th August, 2024

class ReferralWorklist {
    constructor(page) {
        this.page = page;
        this.Filter_icon = page.locator('//app-worklist//mat-drawer-container//mat-drawer-content//div//mat-icon[@mattooltip="Select Filters"]');
        this.ReferralId_field = page.locator('#ReferralID');
        this.SearchButton = page.getByRole('button', { name: 'Search', exact: true });
        }

    async FirstRefCard_YesResponse_Click() {

    }

    async FirstRefCard_LaunchReferral_Click() {

    }

    async SearchWithRefID() {

    }

    async FirstRefCard_PatientName_Click() { 
        
    }

    /**
     * This method is used to filter the referral with referral id
     * @param {*} RefId Enter Referral ID to filter the referral worklist
     */
    async RefIDFilter(RefId) {
        await this.Filter_icon.click();
        await this.ReferralId_field.fill(RefId);
        await this.SearchButton.click();
    }
}