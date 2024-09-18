//Author - Rajakumar Maste, Created on - 18 Sept 2024

export class Diagnoses {
    constructor(page) {
        this.page = page;
        this.AddDiagnoses_link = page.locator('//a[@id="ctrlDiagnosisList_lnkAddDiagnosis"]');

    }

    /**
     * This method is used to click on Add Diagnosis link
     */
    async Click_AddDiagnoses() {
        await this.AddDiagnoses_link.click();
        await this.page.waitForLoadState('networkidle');
    }
    
}