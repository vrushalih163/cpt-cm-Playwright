// Author - Pavan.S Date:8th Aug, 2024

const { expect } = require("@playwright/test")
const { URL } = process.env

export class ConnectTimelinePage {

    constructor(page) {
        this.page = page;
        this.ConnectTimeline_Label = page.getByRole('heading', { name: 'Connect Timeline' });
        this.emergency_Label = page.getByText('emergency').first();
        this.ccd_Link = page.getByText('continuity of care document');

    }

    /**
     * This method is used to validate the Connect Timeline page after clicking on the Connect Timeline link in Admission Default View page.
     */
    async ValidateConnectTimelinePage() {
        await expect(this.ConnectTimeline_Label).toBeVisible();


        if (await this.emergency_Label.isVisible()) {
            await expect(this.emergency_Label).toBeVisible();
        } else {
            console.log('Error Message : Patient does not have any visible encounters in connect.');
        }



        await expect(this.ccd_Link).toBeVisible();

    }

    /**
     * This method is used to click on the Continuity of Care Document link in Connect Timeline page.
     */
    async ClickContinuityOfCareDocument() {

        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByText('continuity of care document').click();
        const page2 = await page2Promise;
        await page2.waitForLoadState('domcontentloaded');
        await page2.waitForTimeout(5000);

        // Below code is used for evaluating the pop-up code which is opened on clicking continuity of care link
        await page2.screenshot({
            path: 'C:\\Playwright\\screenshot.jpg',
            fullPage: true,
            omitBackground: true, // Removes the background
            quality: 80, // Only for JPEGs
            type: 'jpeg' // Can be 'png' or 'jpeg'
        });

        await page2.waitForLoadState('domcontentloaded');
        await page2.close();
        await this.page.waitForTimeout(2000);
       
    }
}
