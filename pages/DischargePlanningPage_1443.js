// Author - Pavan.S Date:8th Aug, 2024

const { expect } = require("@playwright/test")
const { URL } = process.env

export class DischargePlanningPage {

    constructor(page) {
        this.page = page;
        this.DischargePlanning_Link = page.getByTitle('Discharge Planning');

        //Connect Timeline Controls        
        this.ConnectTimeline_Icon = page.locator('#patientbanner-connect-timeline');
        this.ConnectTimeline_Label = page.getByRole('heading', { name: 'Connect Timeline' });
        this.Emergency_Label = page.getByText('emergency').first();
        this.ccd_Link = page.getByText('continuity of care document');

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