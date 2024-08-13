//Author: Rajakumar Maste, Created Date: 13 August 2024

import { expect } from '@playwright/test';

export class SharedChoice {
    constructor(page) {
        this.page = page;
        //Create Patient Choice card
        this.createpatientchoice_plusIcon = page.locator('#iconAddCircleOutline');

        //Level of care selection
        this.searchlevelofcare = page.getByLabel('Search Level of Care');
        this.levelofcare_radiobutton = page.locator('//mat-radio-button[contains(@id, "mat-radio")]');
        this.select_button = page.getByRole('button', { name: 'Select' });

        //Shared choice card body

    }
/**
 * This method verifies the visibility of the Shared Choice card and clicking on '+' icon.
 */
async CreatePatientChoice_Click(){
    await expect(this.page.locator('#showProgressSpinnerId div').first()).toBeVisible();
    await this.createpatientchoice_plusIcon.click();
}

/**
 * 
 * @param {*} LevelOfCareName 
 * This method selects the level of care from the dropdown and clicks on the select button.
 */
async SelectLevelOfCare(LevelOfCareName){
    //await this.searchlevelofcare.fill(LevelOfCareName);
    await this.searchlevelofcare.type(LevelOfCareName, { delay: 300 });
    await this.levelofcare_radiobutton.click();
    await this.select_button.click();
}

}