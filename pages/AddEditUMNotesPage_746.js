// Author: Rajakumar Maste, Created on: 24 Sept 2024

export class AddEditUMNotes {
    constructor(page) {
        this.page = page;
        this.UMNotesType_dropdown = page.locator('#ddlUMNoteType');
        this.UMNotes_textarea = page.locator('#txtUMNotes');
        this.Save_button = page.getByRole('button', { name: 'Save' })
    }

    /**
     * This method is used to select UM Notes Type
     * @param {*} UMnotestype Enter UM Notes Type
     */
    async UMNotesType(UMnotestype) {
        await this.UMNotesType_dropdown.selectOption(UMnotestype);
    }

    /**
     * This method is used to enter UM Notes
     * @param {*} notes Enter UM Notes
     */
    async UMNotes(notes) {
        await this.UMNotes_textarea.fill(notes);
    }

    async Save_btn() {
        await this.Save_button.click();
    }
}