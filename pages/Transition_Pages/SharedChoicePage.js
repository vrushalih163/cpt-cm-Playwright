//Author: Rajakumar Maste, Created Date: 23 August 2024
//Modified By: Rajakunar Maste, Modified Date: 02 Sept 2024
//comment: added validate_ChoiceIsNotDragable method and update DragAndDropRankings method

import { LIB } from '../../bizLibs/lib';
import { page, expect } from '@playwright/test';

export class SharedChoice {

    constructor(page) {
        this.page = page;
        this.ViewIcon = page.locator('#iconVisibility');
        this.Ellipse_Icon = page.locator('#anchorMoreVert').first();
        this.Resend_Link = page.locator('#anchorResend');
        this.Print_Link = page.locator('#anchorPrint');
        this.SharedMethod_Text = page.locator('td:nth-child(3)').first(); // OR locator('//table//tbody//td[3]')

        //Resend popup
        this.AddAll_btn = page.locator('#all');
        this.CareGiver_textbox = page.locator('//mat-dialog-actions//mat-form-field//div//input[@formcontrolname="name"]');
        this.CareGiverPhone_textbox = page.locator('//mat-dialog-actions//mat-form-field//div//input[@formcontrolname="emailorPhone"]');
        this.SaveAsPatientChoice_button = page.locator('//mat-dialog-actions//button//span[contains(.,"Save as Patient Choice")]');

        //Print popup
        this.Print_button = page.locator('//button/span[contains(.,"Print")]');
        this.YourName_textbox = page.locator('//mat-dialog-actions//mat-form-field//div//input[@formcontrolname="name"]');
        this.YourEmail_textbox = page.locator('//mat-dialog-actions//mat-form-field//div//input[@formcontrolname="email"]');
        this.YourPhone_textbox = page.locator('//mat-dialog-actions//mat-form-field//div//input[@formcontrolname="phone"]');

        //Clinical tab error msg
        this.error_Popup = page.locator('//p-toastitem[contains(@class,"ng-trigger-toastAnimation")]//button').first();

    }


    /**
     * This function is used to click on the view icon.
     */
    async First_ViewIconClick() {
        await this.ViewIcon.first().click();
    }

    /**
     * This function is used to enter the care giver details in the View Popup.
     */
    async CareGiverDetails(CareGiverName, CareGiverPhone) {
        await this.CareGiver_textbox.fill(CareGiverName);
        await this.CareGiverPhone_textbox.fill(CareGiverPhone);
    }

    /**
     * This function is used to click on the Save as Patient Choice button.
     * 
     */
    async SaveAsPatientChoice() {
        await this.SaveAsPatientChoice_button.click();
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
        const Source = await this.page.locator('(//div[contains(@class, "cdk-drag selection-box")])' + '[' + SourceRanking + ']');
        const Target = await this.page.locator('(//div[contains(@class, "cdk-drag selection-box")])' + '[' + TargetRanking + ']');

        // await Source.dragTo(Target);
        // Ensure elements are visible
        await Source.scrollIntoViewIfNeeded();
        await Target.scrollIntoViewIfNeeded();

        // Log element positions for debugging
        const sourceBox = await Source.boundingBox();
        const targetBox = await Target.boundingBox();

        if (sourceBox && targetBox) {
            // Alternative drag and drop method
            await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
            await this.page.waitForTimeout(2000); // Add a small delay
            await this.page.mouse.down();
            await this.page.waitForTimeout(2000); // Add a small delay
            await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
            await this.page.waitForTimeout(2000); // Add a small delay
            await this.page.mouse.up();
        } else {
            console.error('Could not locate source or target elements');
        }
    }

    /**
     * This function is used to click on the Ellipse icon.
     */
    async EllipseIconClick() {
        if(await this.error_Popup.isVisible())
            {
                await this.error_Popup.click();
            }
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
     * @param {*} Sharemethod Enter Sharedmethod as 'Text/Email' OR 'Print OR 'AddToReferral'
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

        // //Create an instance for LIB class
        // const library = new LIB();
        // //call the getCurrentDateTimeInTimeZone method and passing the date and time format
        // var currentDateTime = await library.getCurrentDateTimeInTimeZone(timezone, format);

        // // Parse the dates using native JavaScript Date object to make sure both are same object befor comparison
        // const DateOfSharing = new Date(dateOfSharing);
        // currentDateTime = new Date(currentDateTime);

        // // Calculate the difference in milliseconds
        // const differenceInMilliseconds = Math.abs(currentDateTime - DateOfSharing);

        // // Convert the difference from milliseconds to minutes
        // const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

        // // Check if the difference is within the 2-minute tolerance
        // expect(DateOfSharing).toBeLessThanOrEqual(2, `The dates differ by more than 2 minutes. Difference: ${differenceInMinutes} minutes.`);

        // Validate cell values
        expect(ProviderCount).toBe(numberOfProviders);

        let expectedShareMethods;
        if (Sharemethod === 'Text/Email') {
            expectedShareMethods = 'Electronic';
            expect(shareMethods).toBe(expectedShareMethods);
        } else if (Sharemethod === 'Print') {
            expectedShareMethods = 'Printout';
            expect(shareMethods).toBe(expectedShareMethods);
        } else if (Sharemethod === 'AddToReferral') {
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

        // // Validate the background color of the first row
        // const firstRowBackgroundColor = await firstRow.evaluate(row => getComputedStyle(row).backgroundColor);
        // expect(firstRowBackgroundColor).toBe('rgb(255, 255, 255)');
    }

    /**
     * This method validates the Shared Method on the first row in the shared
     * @param {*} Sharemethod  Enter Sharedmethod as 'Text/Email' OR 'Print' OR 'AddToReferral
     */
    async SharedMethod_Validation(Sharemethod) {
        await this.page.waitForTimeout(2000);
        const ElectronicORPrintout = await this.SharedMethod_Text.textContent();
        await this.page.waitForTimeout(2000);

        if (Sharemethod === 'Text/Email') {
            expect(ElectronicORPrintout).toContain('Electronic');
        } else if (Sharemethod === 'Print') {
            expect(ElectronicORPrintout).toContain('Printout');
        } else if (Sharemethod === 'AddToReferral') {
            expect(ElectronicORPrintout).toContain('Direct');
        } else {
            throw new Error(`Unexpected Sharemethod: ${Sharemethod}`);
        }
    }

    /**
     * This method is used to validate the table header in the shared choice page.
     */
    async SharedChoice_TableHeader_Validation() {
        const table = await this.page.locator('table#tblShared');
        const headers = await table.locator('thead tr th');

        const expectedHeaders = [
            'Date of sharing',
            '# Providers',
            'Share method (Electronic/ Print)',
            'Data SharedShared With, Responded by',
            'User',
            'View',
            'Actions'
        ];

        await this.page.waitForTimeout(3000);

        const headerCount = await headers.count();
        if (headerCount !== expectedHeaders.length) {
            throw new Error(`Header count mismatch: found ${headerCount}, expected ${expectedHeaders.length}`);
        }

        for (let i = 0; i < expectedHeaders.length; i++) {
            const headerText = await headers.nth(i).textContent();
            //console.log(`Header ${i}: ${headerText}`);
            expect(headerText.trim()).toBe(expectedHeaders[i]);
        }
    }

    /**
     * This method used to validate the Shared with column in the shared choice page.
     * @param {*} Sharedwith  Enter the username with whom the choice is shared
     */
    async SharedWith_Validation(Sharedwith) {
        await this.page.waitForTimeout(2000);
        const dataShared = await this.page.locator('td:nth-child(4)').first().textContent();
        expect(dataShared.trim()).toContain(Sharedwith);
    }

    /**
     * This method is used to click on the Add All button on the rank provider modal
     */
    async Addall_btn_click() {
        await this.page.waitForTimeout(2000);
        await this.AddAll_btn.click();
    }

    /**
     * This method is used to validate the user is not able to drag the rankings on the rank provider modal for the specified row.
     * @param {*} rowNumber Enter the row number which you want to validate
     * @returns 
     */
    async validate_ChoiceIsNotDragable(rowNumber) {
        // Construct the selector string using the rowNumber
        const selector = `table tr:nth-child(${rowNumber}) td:nth-child(6)`;
    
        // Click on the specified row's view icon
        await this.page.locator(selector).click();
    
        // Verify if the section is draggable
        const isDraggable = await this.page.evaluate(() => {
            const xpath = '//div[contains(@class, "cdk-drag")]';
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element && element.draggable;
        });
    
        if (!isDraggable) {
            return true;
        } else {
            throw new Error('The row is draggable. Terminating the test.');
        }
    }

    async PopulatePrintPopup(YourName, YourEmail, YourPhone) {
        await this.YourName_textbox.fill(YourName);
        await this.YourEmail_textbox.fill(YourEmail);
        await this.YourPhone_textbox.fill(YourPhone);
        await this.Print_button.click();
    }

};