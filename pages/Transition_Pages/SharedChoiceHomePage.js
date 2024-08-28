//Author: Rajakumar Maste, Created Date: 23 August 2024

import { page, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';


export class SharedChoiceHomePage {
    constructor(page) {
        this.page = page;
        //Create Patient Choice card
        this.createpatientchoice_plusIcon = page.locator('#iconAddCircleOutline');

        //Level of care selection
        this.searchlevelofcare = page.getByLabel('Search Level of Care');
        this.levelofcare_radiobutton = page.locator('//mat-radio-button[contains(@id, "mat-radio")]');
        this.select_button = page.getByRole('button', { name: 'Select' });

        //Shared choice card body
        this.status_text = page.locator('//*[@id="statusId"]');

        this.firstcard = page.locator('#transitionReferralContent')

        this.DateLastShared = page.locator('//card-content[@id="transitionReferralContent"]//span').first();

    }
    /**
     * This method verifies the visibility of the Shared Choice card and clicking on '+' icon.
     */
    async CreatePatientChoice_Click() {
        await expect(this.page.locator('#showProgressSpinnerId div').first()).toBeVisible();
        await this.createpatientchoice_plusIcon.click();
    }

    /**
     * 
     * @param {*} LevelOfCareName 
     * This method selects the level of care from the dropdown and clicks on the select button.
     */
    async SelectLevelOfCare(LevelOfCareName) {
        await this.searchlevelofcare.type(LevelOfCareName, { delay: 500 });
        await this.levelofcare_radiobutton.click();
        await this.select_button.click();
    }

    /**
     * This method is used to validate the status of the shared choice for the first shared choice card.
     * @param {*} status Pass the status of the shared choice which you are expecting.
     * Example: 'Choice Shared' or 'Choice Responded'
     * 
     * **Note:** This method validates the status of the shared choice on the first card.
     */
    async ValidateSharedChoice_Status(status) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        expect(await this.status_text.first()).toContainText(status);
    }

    /**
     * This method is used to validate the Date Last Shared on the first shared choice card.
    * @param {string} timeZone - The input time zone string. Example: If the timezone is PT then pass 'pacific'.
    * @param {string} format - The time format ('12hr' or '24hr'). 
     */
    async Validate_DateLastShared(timezone, format) {
        const FirstElement = await this.DateLastShared;
        const textContent = await FirstElement.textContent();
        const prefix = "Date Last Shared: ";
        var Datelastshared = textContent.replace(prefix, "");

        //Create an instance for LIB class
        const library = new LIB();

        //call the getCurrentDateTimeInTimeZone method and passing the date and time format
        var currentDateTime = await library.getCurrentDateTimeInTimeZone(timezone, format);

        // // Parse the dates using moment
        // const dateLastSharedMoment = moment.tz(Datelastshared, format === '12hr' ? 'M/D/YYYY hh:mm A' : 'M/D/YYYY HH:mm', timezone);
        // const currentDateTimeMoment = moment.tz(currentDateTime, format === '12hr' ? 'M/D/YYYY hh:mm A' : 'M/D/YYYY HH:mm', timezone);

        // // Calculate the difference in minutes
        // const differenceInMinutes = Math.abs(currentDateTimeMoment.diff(dateLastSharedMoment, 'minutes'));

        // Parse the dates using native JavaScript Date object to make sure both are same object befor comparison
        const dateLastShared = new Date(Datelastshared);
        currentDateTime = new Date(currentDateTime);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = Math.abs(currentDateTime - dateLastShared);

        // Convert the difference from milliseconds to minutes
        const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
       
        // Check if the difference is within the 2-minute tolerance
        expect(differenceInMinutes).toBeLessThanOrEqual(2, `The dates differ by more than 2 minutes. Difference: ${differenceInMinutes} minutes.`);
    }

    /**
     * This method is used to click on the first shared choice card.
     */
    async Click_FirstSharedChoiceCard() {
        await  this.firstcard.first().click();
    }
}