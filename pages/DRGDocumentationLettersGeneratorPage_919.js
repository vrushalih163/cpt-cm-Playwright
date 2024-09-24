// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class DRGDocumentationLettersGenerator {
    constructor(page) {
        this.page = page;
        this.LetterToCreate_dropdown = page.locator('#ddlLetterToCreate');
        this.Generator_button = page.getByRole('button', { name: 'Generate' });
        this.Back_button = page.getByRole('button', { name: 'Back' });
    }

    /**
     * This method is used to select the Letter from the Letter To Create dropdown
     * @param {*} letter Enter the letter name
     */
    async LetterToCreate (letter) {
        await this.LetterToCreate_dropdown.selectOption(letter);
    }

    /**
     * This method is used to click on save button
     */
    async Generate_btn() {
        await this.Generator_button.click();
    }

    async Back_btn() {
        await this.Back_button.click();
    }
}