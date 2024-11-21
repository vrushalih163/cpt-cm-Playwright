// Author: Jackie Szatkowski, Date: 11/12/2024
const { expect } = require('@playwright/test');

export class PatientFaceSheet {
    constructor(page) {
        this.page = page;
        this.patientFaceSheetTitle_link = page.locator('span[title="Patient Face Sheet"]');
        this.patientName_link = page.locator('#m_PatNameLink');
        this.patientDOB_link = page.locator('#m_DOBLink');
        this.patientMRN_link = page.locator('#m_MRNLink');
        //this.footerPage_URL = page.locator('div.ion-footer-info-panel', {hastext: '171'});
        this.footerPage_URL = page.locator('div.ion-footer-info-panel span:has-text("171")');
        this.patient_link = page.locator('#LeftNavBar_ctl26');
        this.patientDetails_link = page.locator('a[name = "navbar_patient_details"]');

    }

    async verifyPatientValues(expectedTitle, expectedName, expectedDOB, expectedMRN) {
        await this.patientFaceSheetTitle_link.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.patientFaceSheetTitle_link).toHaveText(expectedTitle, { timeout: 10000 });
        await this.patientName_link.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.patientName_link).toHaveText(expectedName, { timeout: 10000 });
        await this.patientDOB_link.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.patientDOB_link).toContainText(expectedDOB, { timeout: 10000 });
        await this.patientMRN_link.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.patientMRN_link).toHaveText(expectedMRN, { timeout: 10000 });
    }

    async verifyFooterPageURL() {
        await expect(this.footerPage_URL).toBeVisible();
        await expect(this.footerPage_URL).toHaveText('171');
    }

    async clickPatient() {
        await this.patient_link.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async clickPatientDetails() {
        await this.clickPatient();
        await this.patientDetails_link.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
}