// Author - Vrushali Honnatti Date:22nd July, 2024

import { test, expect } from "@playwright/test";
const { URL } = process.env
export class ReviewCriteriaPage {

    constructor(page) {
        this.page = page;
        this.next_button = page.getByRole('button', { name: 'Next' });
        this.apply_button = page.getByRole('button', { name: 'Apply' });
        this.UMStatus_dropdown = page.locator('#ddlUMStatus');

        //MCG Controls
        this.MCG_textbox = page.locator('#MedNecControl_txtGuidelineOutput');

        //Cerme controls
        this.Cerme_textbox = page.locator('#dvCermeControls');

    }

    async ClickNext() {

        await this.next_button.click();
    }

    async SetUMStatus(status) {

        await this.UMStatus_dropdown.selectOption(status);
    }

    async ValidateUMStatus(status) {
            
            await expect(this.UMStatus_dropdown).toContainText(status);
    }
    async ClickApply() {
        await this.apply_button.click();
    }

    async LaunchCermeAdGetData() {

        await this.page.getByLabel('InterQual® Review').check();
        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: 'InterQual® Review' }).click();
        const page2 = await page2Promise;

        await page2.waitForTimeout(20000);
        await page2.evaluate(() => window.moveTo(0, 0));
        await page2.evaluate(() => window.resizeTo(1000, 1000));

        await page2.frameLocator('#iqConnect').getByTitle('Select Product').locator('span').first().click();
        await page2.frameLocator('#iqConnect').getByText('LOC:Acute Adult').click();
        await page2.frameLocator('#iqConnect').getByText('Acute Kidney Injury').click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'Begin Medical Review' }).click();
        await page2.frameLocator('#iqConnect').locator('#navMenuSelect div').nth(3).click();
        await page2.frameLocator('#iqConnect').getByText('Episode Day 3').click();
        await page2.frameLocator('#iqConnect').getByRole('treeitem', { name: 'OBSERVATION, One: Not Selected' }).locator('span').first().click();
        await page2.frameLocator('#iqConnect').getByRole('treeitem', { name: 'Non-responder, not clinically' }).locator('span').first().click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'For acute kidney injury (AKI' }).click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'For a condition other than' }).click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'OK' }).click();
        await page2.frameLocator('#iqConnect').getByRole('treeitem', { name: 'ACUTE, One: Not Selected' }).locator('span').first().click();
        await page2.frameLocator('#iqConnect').getByRole('treeitem', { name: 'Partial responder, not' }).locator('span').first().click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'Creatinine ≥ 1.5x baseline or' }).click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'Heart failure and, Both:' }).click();
        await page2.frameLocator('#iqConnect').getByRole('button', { name: 'Review Summary' }).click();
        await page2.frameLocator('#iqConnect').getByLabel('Save Review').click();
        await this.page.goto(URL + '/professional/Manage/ReviewManagementTool/MedicalNecessity.aspx');
    }

    async ValidateCermeData(data){

        await expect(this.Cerme_textbox).toContainText(data);
    }

    async LaunchMCGAndGetData() {

        await this.page.getByLabel('MCG CareWebQI').check();

        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('button', { name: 'Launch MCG' }).click();
        const page2 = await page2Promise;

        await page2.waitForTimeout(5000);

        await page2.locator('#MainContent_cgxGuidelineSearchCriteria_txtQuickSearch').click();
        await page2.locator('#MainContent_cgxGuidelineSearchCriteria_txtQuickSearch').fill('heart');
        await page2.locator('#MainContent_cgxGuidelineSearchCriteria_txtQuickSearchSearch').click();
        await page2.locator('#MainContent_cgxGuidelineSearchCriteria_rsltsGrid_rptSearchRelated_rptSearchRows_0_rptSearchCells_0_lblData_19').getByRole('link', { name: 'Select' }).click();

        await page2.waitForTimeout(5000);
        await page2.getByRole('button', { name: 'Add Episode Notes' }).click();

        await page2.waitForTimeout(2000);
        await page2.locator('#MainContent_cgxEpisodeOverview_ucNoteEditor_ddlSubject').selectOption('2');

        const frame = await page2.frameLocator('#notesEditor_ifr').locator('xpath=//body["#tinymce"]');
        await frame.click();
        await frame.fill('Text');
        await page2.keyboard.press('Enter');
        await page2.waitForTimeout(2000);
        await page2.locator('#MainContent_cgxEpisodeOverview_ucNoteEditor_btnSaveNotes1').click();

        await page2.getByRole('link', { name: 'Medicare Nationally Covered' }).click();
        await page2.getByLabel('Pediatric hospital that').check();
        await page2.getByLabel('Patient has been discharged').check();
        await page2.locator('#MainContent_cgxSection_ctl00_btnSave2').click();
        await page2.getByRole('button', { name: 'Exit Episode' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.locator('input[name="chkOutlineIndicationsAndNotes"]').check();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async ValidateMCGData(data) {
        await expect(this.MCG_textbox).toContainText(data);
    }

}