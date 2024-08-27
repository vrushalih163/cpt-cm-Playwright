//Author: Rajakumar Maste, Created Date: 23 August 2024

import { LIB } from '../../bizLibs/lib';
import { page, expect } from '@playwright/test';

export class SharedChoice {

    constructor(page) {
        this.page = page;
        this.ViewIcon = page.locator('#iconVisibility');
        this.Ellipse_Icon = page.locator('#anchorMoreVert');
        this.Resend_Link = page.locator('#anchorResend');
        this.Print_Link = page.locator('#anchorPrint');
    }


    /**
     * This function is used to click on the view icon.
     */
    async First_ViewIconClick() {
        await this.ViewIcon.first().click();
    }

    /**
     * This function is used to drag the ranking after adding the rankings.
     * @param {*} SourceRanking 
     * Just give the interger number of the source rank.
     * Here SourceRanking is nothing but the provider rank which you want to drag.
     * @param {*} TargetRanking 
     * Just give the integer number of the target rank.
     * Here TargetRanking is nothing but the provider rank where you want to place it.
     */
    async DragAndDropRankings(SourceRanking, TargetRanking) {
        const Source = await this.page.locator('//*[@id="cdk-drop-list-1"]/div[${SourceRanking}]/div[1]/text()');
        const Target = await this.page.locator('//*[@id="cdk-drop-list-1"]/div[${TargetRanking}]/div[1]/text()');

        await Source.dragTo(Target);
    }

    /**
     * This function is used to click on the Ellipse icon.
     */
    async EllipseIconClick() {
        await this.Ellipse_Icon.click();
    }

    /**
     * This function is used to click on the Resend button.
     */
    async Resend() {
        await this.Resend_Link.click();
    }

    /**
     * This function is used to click on the Print button.
     */
    async Print() {
        await this.Print_Link.click();
    }

    /**
     * This method validates the Date of sharing, Providers conunt, Share method, 'Shared with',
     *  view icon, ellipse icon and background color of the first row in the shared choice page.
     * @param {*} timezone The input time zone string. Example: If the timezone is PT then pass 'pacific'.
     * @param {*} format The time format ('12hr' or '24hr').
     * @param {*} ProviderCount Enter Provider count
     * @param {*} Sharemethod Enter Sharedmethod as 'Text/Email' OR 'Print'
     * @param {*} Sharedwith Enter the username with whom the choice is shared
     */
    async Validate_First_row_OnceChoiceShared(timezone, format, ProviderCount, Sharemethod, Sharedwith) {
        const table = await this.page.locator('table#tblShared');

        // Locate the first row with white background
        const firstRow = await table.locator('tr');

        // Extract cell values
        var dateOfSharing = (await firstRow.locator('td:nth-child(1)').first().textContent()).trim();
        dateOfSharing = dateOfSharing.split(" ");
        dateOfSharing = dateOfSharing[0] + " " + dateOfSharing[1] + " " + dateOfSharing[2] + " " + dateOfSharing[4];

        const numberOfProviders = (await firstRow.locator('td:nth-child(2)').first().textContent()).trim();;

        const shareMethods = (await firstRow.locator('td:nth-child(3)').first().textContent()).trim();

        const dataShared = (await firstRow.locator('td:nth-child(4)').first().textContent()).trim();

        const user = (await firstRow.locator('td:nth-child(5)').first().textContent()).trim();

        const viewIcon = await firstRow.locator('td:nth-child(6) #iconVisibility');

        const actionIcon = await firstRow.locator('td:nth-child(7) #anchorMoreVert');

        //Create an instance for LIB class
        const library = new LIB();
        //call the getCurrentDateTimeInTimeZone method and passing the date and time format
        var currentDateTime = await library.getCurrentDateTimeInTimeZone(timezone, format);

        // Parse the dates using native JavaScript Date object to make sure both are same object befor comparison
        const DateOfSharing = new Date(dateOfSharing);
        currentDateTime = new Date(currentDateTime);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = Math.abs(currentDateTime - DateOfSharing);

        // Convert the difference from milliseconds to minutes
        const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

        // Check if the difference is within the 2-minute tolerance
        expect(DateOfSharing).toBeLessThanOrEqual(2, `The dates differ by more than 2 minutes. Difference: ${differenceInMinutes} minutes.`);

        // Validate cell values
        expect(ProviderCount).toBe(numberOfProviders);

        let expectedShareMethods;
        if (Sharemethod === 'Text/Email') {
            expectedShareMethods = 'Electronic';
            expect(shareMethods).toBe(expectedShareMethods);
        } else if (Sharemethod === 'Print') {
            expectedShareMethods = 'Printout';
            expect(shareMethods).toBe(expectedShareMethods);
        } else if(Sharemethod === 'Direct'){
            expectedShareMethods = 'Direct';
            expect(shareMethods).toBe(expectedShareMethods);
        }
        else {
            throw new Error(`Unexpected Sharemethod: ${Sharemethod}`);
        }

        expect(dataShared).toBe(Sharedwith);
        
        //expect(user).toBe('expected-username');

        expect(viewIcon).not.toBeNull();
        expect(actionIcon).not.toBeNull();

        // Validate the background color of the first row
        const firstRowBackgroundColor = await firstRow.evaluate(row => getComputedStyle(row).backgroundColor);
        expect(firstRowBackgroundColor).toBe('rgb(255, 255, 255)');
    }
};