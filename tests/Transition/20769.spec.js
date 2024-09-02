//Author: Rajakumar Maste, Created Date: 02 Sept 2024

import { LIB } from '../../bizLibs/lib';
import { test, expect } from '@playwright/test';
import { SharedChoiceHomePage } from '../../pages/Transition_Pages/SharedChoiceHomePage';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoicePage';
import { SCProviderSearch } from '../../pages/Transition_Pages/SharedChoice_ProviderSearch';
const { MailSlurpEMailId } = process.env;

test('Shared choice tab verification', async ({ }) => {
    test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

    //Step 1: Launch the Transition application for MRN-E1703
    const lib = new LIB();
    const newPage = await lib.HandleAppLaunch('Cadence, Anna', 'E1703', 'Patient Choice');

    await expect(newPage.getByText('Shared Choice')).toBeVisible();

    //step 2: Click on the first shared choice card
    const SCHP = new SharedChoiceHomePage(newPage);
    await SCHP.Click_FirstSharedChoiceCard();

    //Step 2: Verify column names present in shared choice tab
    const SC = new SharedChoice(newPage);
    await SC.SharedChoice_TableHeader_Validation();

    //get the rows count which is used to validate the step 5
    var rowscount = await newPage.locator('table#tblShared tbody tr').count();

    //Step 3: validate the shared method by sharing the choice via print
    //click on Ellipse icon
    await SC.EllipseIconClick();
    //click on print action
    await SC.Print();
    //click on Print button on the print popup
    await newPage.getByRole('button', { name: 'Print' }).click();
    await newPage.waitForTimeout(3000);

        // Wait for the print preview page to open
        const [printPreviewPage] = await Promise.all([
            browser.waitForEvent('page'),
            newPage.waitForTimeout(3000) // Adjust the timeout as needed
        ]);
    
        // Close the print preview page by clicking the cancel button
        await printPreviewPage.getByRole('button', { name: 'Cancel' }).click();
    
        // Continue with the rest of your test
        await newPage.waitForTimeout(3000);

    //Click on the Go to Transition button
    const SCPS = new SCProviderSearch(newPage);
    await SCPS.GoToTransition();
    await newPage.waitForTimeout(2000);

    //shared method verification
    await SC.SharedMethod_Validation('Print');
    await newPage.waitForTimeout(2000);

    //Step 5: verify the rows count after sharing with print
    var rowscount1 = await newPage.locator('table#tblShared tbody tr').count();
    if (rowscount1 > rowscount) {
        Boolean(true);
    } else {
        throw new Error('Row count did not increase after sharing via print. Terminating the test.');
    }

    //step 4: validate the shared method and shared with by sharing the choice via Text/Email
    await newPage.waitForTimeout(2000);
    var rowscount = await newPage.locator('table#tblShared tbody tr').count();
    //click on Ellipse icon
    await SC.EllipseIconClick();
    await newPage.waitForTimeout(2000);

    //click on Resend action
    await SC.Resend();
    await newPage.waitForTimeout(2000);

    //Enter the email id and click on Share button
    await SCPS.TextOREmail_Modal(MailSlurpEMailId);
    //Toast message verification
    await SCPS.ToastMessage_ChoiceShared();
    await newPage.waitForTimeout(2000);

    //Step 5: verify the rows count after sharing via Text/Email
    var rowscount1 = await newPage.locator('table#tblShared tbody tr').count();
    if (rowscount1 > rowscount) {
        Boolean(true);
    } else {
        throw new Error('Row count did not increase after sharing via Text/Email. Terminating the test.');
    }
    //shared method verification
    await SC.SharedMethod_Validation('Text/Email');

    //shared with verification
    await newPage.waitForTimeout(2000);
    await SC.SharedWith_Validation(MailSlurpEMailId);

    //Step 6: Validate the View (Eyeball) icon for all the row/records in the grid.
    //Ranks are provided in the rank provider modal
    await SC.First_ViewIconClick();
    await newPage.waitForTimeout(2000);

    await SC.Addall_btn_click();

    await SC.DragAndDropRankings(1, 3);
    await newPage.locator('//input[@formcontrolname="name"]').fill('TransitionAutomationUser');
    await newPage.locator('//input[@formcontrolname="emailorPhone"]').fill('Wellsky@Automation.com');
    await newPage.getByRole('button', { name: ' Save as Patient Choice ' }).click();

    //Ranks are not dragable on the rank provider modal when the user views the any rows except the first row
    await SC.validate_ChoiceIsNotDragable(2);
    
    await newPage.locator('//i[@type="button"]').click();
    await newPage.close();
});