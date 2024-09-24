// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class DRGDocumentationLetters {
    constructor(page) {
        this.page = page;
        this.DRGDocumentationLetters_link = page.locator('#lnkGenerateBusinessLetter');
    }

    /**
     * This method is used to click on DRG Documentation Letters link
     */
    async Click_DRGDocumentationLetters() {
        await this.DRGDocumentationLetters_link.click();
    }
}