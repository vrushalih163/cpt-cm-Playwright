//Author: Rajakumar Maste, Created Date: 02 Sept 2024
//Modified By: Rajakumar Maste, Modified Date: 11 Sept 2024
//comment: Moved printable shared choice verification at the end of the test case

import { LIB } from '../../bizLibs/lib';
import { test, expect } from '@playwright/test';
import { SharedChoiceHomePage } from '../../pages/Transition_Pages/SharedChoiceHomePage';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoicePage';
import { SCProviderSearch } from '../../pages/Transition_Pages/SharedChoice_ProviderSearch';
import { SharedChoiceContextNavigator } from '../../pages/Transition_Pages/SharedChoiceContextNavigator';
const { MailSlurpEMailId, TransitionlaunchUrl } = process.env;
const Providercount = 5;
const ReferralType_Name = 'Automation - StandAlone PC';

test('Standalone PC - Shared Choice tab', async ({ browser }) => {
    test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

    //Step 1: Launch the Transition application for MRN-E1703
    const lib = new LIB();
    const newPage = await lib.HandleAppLaunch('Grand Central, John', 'E3228', 'Patient Choice', TransitionlaunchUrl);
    await newPage.waitForTimeout(2000);

    await expect(newPage.getByText('Shared Choice')).toBeVisible();

    //step 2: Click on the first shared choice card
    const SCHP = new SharedChoiceHomePage(newPage);

    //-----Create a new patient choice -------
    await SCHP.CreatePatientChoice_Click();
    await SCHP.SelectLevelOfCare(ReferralType_Name);
    const SCPS = new SCProviderSearch(newPage);
    await SCPS.SCprovider_Search();
    expect(await newPage.getByRole('button', { name: ' Add 0 to Choice ' })).toBeVisible();

    //Select the provider from the search result
    await SCPS.SelectProvider(Providercount);

    //Click on Add button to add the selected providers to the choice
    await SCPS.AddToChoice();

    // Selected providers details right side panel opened and verifying the heading
    await expect(newPage.getByRole('heading', { name: 'Patient Choice' })).toBeVisible();

    //Click on Text/Email button 
    await SCPS.TextOREmail_Click();

    //Click on Text/Email button and enter the recipient email id and click on Share button 
    await SCPS.TextOREmail_Modal(MailSlurpEMailId);

    await SCPS.ToastMessage_ChoiceShared();
    await newPage.waitForTimeout(2000);
    const SCCN = new SharedChoiceContextNavigator(newPage);
    await SCCN.SharedChoiceIcon_Click();
    await newPage.waitForTimeout(2000);

    //------ created a patient choice

    await SCHP.Click_FirstSharedChoiceCard();

    //Step 2: Verify column names present in shared choice tab
    const SC = new SharedChoice(newPage);
    await SC.SharedChoice_TableHeader_Validation();


    //step 4: validate the shared method and shared with by sharing the choice via Text/Email
    await newPage.waitForTimeout(2000);
    var rowscount = await newPage.locator('table#tblShared tbody tr').count();
    //click on Ellipse icon
    await SC.EllipseIconClick();
    await newPage.waitForTimeout(2000);

    //click on Resend action
    await SC.Resend();
    await newPage.waitForTimeout(2000);

    //Click on the Go to Transition button

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

    await SC.DragAndDropRankings(1, 2);
    await newPage.locator('//input[@formcontrolname="name"]').fill('TransitionAutomationUser');
    await newPage.locator('//input[@formcontrolname="emailorPhone"]').fill('Wellsky@Automation.com');
    await newPage.getByRole('button', { name: ' Save as Patient Choice ' }).click();

    //Ranks are not dragable on the rank provider modal when the user views the any rows except the first row
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.waitForTimeout(2000);
    await SC.validate_ChoiceIsNotDragable(2);
    await newPage.waitForTimeout(2000);
    await newPage.getByRole('heading', { name: '' }).locator('i').click();

    //get the rows count which is used to validate the step 5
    var rowscount = await newPage.locator('table#tblShared tbody tr').count();

    //Step 3: validate the shared method by sharing the choice via print
    //click on Ellipse icon
    await SC.EllipseIconClick();
    await newPage.waitForTimeout(2000);
    //click on print action
    await SC.Print();
    //click on Print button on the print popup
    await newPage.getByRole('button', { name: 'Print' }).click();

    // Close the print preview popup by clicking the cancel button using XPath
    //await newPage.locator('xpath=//*[@id="sidebar"]//print-preview-button-strip//div/cr-button[2]').click();

    await SCPS.GoToTransition();

    //shared method verification
    await newPage.waitForTimeout(2000);
    await SC.SharedMethod_Validation('Print');

    //Step 5: verify the rows count after sharing with print
    var rowscount1 = await newPage.locator('table#tblShared tbody tr').count();
    if (rowscount1 > rowscount) {
        Boolean(true);
    } else {
        throw new Error('Row count did not increase after sharing via print. Terminating the test.');
    }

    await newPage.close();

});