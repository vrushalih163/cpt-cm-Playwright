//  Author - Pavan.S Date:8th Aug, 2024

const { expect } = require("@playwright/test")
const { URL } = process.env

export class AdmissionDefaultViewPage {

    constructor(page) {
        this.page = page;
        this.ConnectTimeline_link = page.getByRole('link', { name: 'Navigate to Connect Timeline' });
    }

    /**
     * This method is used to click on the Connect Timeline link in Admission Default View page.
     */
    async ClickConnectTimeline() {
        await this.ConnectTimeline_link.click();
        await this.page.waitForTimeout(3000);

    }

}