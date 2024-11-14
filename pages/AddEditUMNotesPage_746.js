// Author: Rajakumar Maste, Created on: 24 Sept 2024

import {Page, Locator, test, expect } from '@playwright/test';
export class AddEditUMNotes {
    constructor(page) {
        this.page = page;
        this.UMNotesType_dropdown = page.locator('#ddlUMNoteType');
        this.UMNotes_textarea = page.locator('#txtUMNotes');
        this.UMStatus_dropdown = page.locator('#ddlUMStatus');
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

    /**
     * This method is used to select UM Status
     * @param {*} umStatus Enter UM Status
     */
    async UMStatus(umStatus) {
        await this.UMStatus_dropdown.selectOption(umStatus);
    }   

    /**
     * this method is used to validate the UMStatus
     * @param {*} umStatus 
     */
    async ValidateUMStatus(umStatus){
       await expect(this.UMStatus_dropdown).toContainText(umStatus); 
    }
    
    /**
     * This method is used to click on the save button
     */
    async Save_btn() {
        await this.Save_button.click();
    }
}