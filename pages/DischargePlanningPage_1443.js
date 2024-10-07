// Author - Pavan.S Date:8th Aug, 2024
// Modified by - Vrushali Honnatti Date:24th Sept, 2024

const { expect } = require("@playwright/test")

export class DischargePlanningPage {

    constructor(page) {
        this.page = page;
        this.DischargePlanning_Link = page.getByTitle('Discharge Planning');

        this.Apply_button = page.locator('//button[contains(@id,"btnApply")]');
        this.Save_button = page.locator('//button[contains(@id,"btnSave")]');

        //Placement Accordion Controls
        this.Placement_Label = page.getByRole('heading', { name: 'Placement' });
        this.Placement_dropdown = page.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]');
        this.SelectionFactor_link = page.locator('//a[contains(@id,"lnkSelectionFactor-")]');
        this.SelectFactor_button = page.locator('//button[contains(@id,"btnSelect")]');
        this.OkSelectionFactorPopup_button = page.locator('//button[contains(@id,"btnOK")]');
        this.Note_link = page.locator('//a[contains(@id,"note-")]');
        this.AddNote_textbox = page.locator('//textarea[@placeholder="Add a Note"]');
        this.OkNotePopup_button = page.locator('//button[contains(@id,"btnAddNote")]');

        //Connect Timeline Controls        
        this.ConnectTimeline_Icon = page.locator('#patientbanner-connect-timeline');
        this.ConnectTimeline_Label = page.getByRole('heading', { name: 'Connect Timeline' });
        this.Emergency_Label = page.getByText('emergency').first();
        this.ccd_Link = page.getByText('continuity of care document');

    }

    /**
     * Click on Apply button
     */
    async ClickApply() {
        this.Apply_button.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');

        //This code is done to refresh the page. If this step is not there, then when u try to navigate away from DP page, some of the links dont get clicked properly
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000);
    }

    /**
     * Click on Save button
     */
    async ClickSave() {
        this.Save_button.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');

        //This code is done to refresh the page. If this step is not there, then when u try to navigate away from DP page, some of the links dont get clicked properly
        await this.page.reload();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000);
    }

    /**
     * Select value from Placement dropdown
     * @param {number} index    Index of the Placement dropdown
     * @param {string} value    Value to be selected from the Placement dropdown
     */
    async SelectPlacement(index, value) {
        this.Placement_dropdown.first().click();
        this.page.getByText(value).first().click();
    }

    /**
     * Click on Selection Factor link
     * @param {number} index    Index of the Selection Factor link
     */
    async ClickSelectionFactorLink(index) {
        this.SelectionFactor_link.nth(index).click();
    }

    /**
     * Select Selection Factor
     * @param {number} index    Index of the Selection Factor
     */
    async SelectSelectionFactor(index) {
        this.SelectFactor_button.nth(index).click();
        this.OkSelectionFactorPopup_button.click();
    }

    /** 
     * Click on Note link
     * @param {number} index    Index of the Note link
     */
    async ClickNoteLink(index) {
        this.Note_link.nth(index).click();
    }

    /** 
     * Add a note
     * @param {string} note    Note to be added
     */
    async AddNote(note) {
        this.AddNote_textbox.click();
        this.AddNote_textbox.fill(note);
        this.OkNotePopup_button.click();
    }

    /**
     * This method is used to validate the Connect Timeline functionality in Discharge Planning page.
     */
    async ConnectTimelineValidationinDischargePlanning() {

        await expect(this.DischargePlanning_Link).toBeVisible();
        await this.page.waitForTimeout(5000);
        await this.ConnectTimeline_Icon.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
        await expect(this.ConnectTimeline_Label).toBeVisible();
        await expect(this.Emergency_Label).toBeVisible();
        await expect(this.ccd_Link).toBeVisible();
        const page3Promise = this.page.waitForEvent('popup');
        await this.ccd_Link.click();
        const page3 = await page3Promise;
        // await page3.waitForLoadState('domcontentloaded');
        await page3.waitForTimeout(5000);

        //Below code is used for evaluatig the pop up code which is opened on clicking continuity of care link
        await page3.screenshot({
            path: 'C:\\Playwright\\screenshot2.jpg',
            fullPage: true,
            omitBackground: true, // Removes the background
            quality: 80, // Only for JPEGs
            type: 'jpeg' // Can be 'png' or 'jpeg'
        });

        await page3.waitForLoadState('domcontentloaded');
        await page3.close();
        await this.page.waitForTimeout(2000);
        await this.page.getByText('close', { exact: true }).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('#PageHeader_ctl26').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}