//Author: Rajakumar Maste, Created Date: 13 August 2024
//Modified By: Rajakumar Maste, Modified Date: 11 Sept 2024
//Comment - combined the two test cases into one and updated the test case name 
import { test, expect, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { LIB } from '../../bizLibs/lib';
import { LoginPage } from '../../pages/PageLogin_111';
import { OrganizationLookup } from '../../pages/OrganizationLookupPage_595';
import { AddEditSearchCriteria } from '../../pages/AddEditSearchCriteriaPage_561';

// Override the configuration to use a single worker
test.use({ workers: 1 });
test.setTimeout(5 * 60 * 1000);
const { user, password, TransitionOrg1, TransitionOrg2 } = process.env

test('T20760: T2- ECIN Configuration for Sending Patient Choice in T2 without a Referral.', async ({ page }) => {

    //Patient Choice Dashboard

    //Created a object for LoginPage class
    const TransitionGhostOrg = new LoginPage(page);

    //passing the username and passowrd from env variable into the login function 
    const page1 = await TransitionGhostOrg.login(user, password);

    const Appnav = new ApplicationNavigator(page1);

    //Step 1: Login to 'ECIN Administrative Organization'
    await Appnav.NavigateToChangeOrg('ECIN Administrative Organization');

    //steps 2: Navigate as: Admin -> Organization lookup
    const ECIN_Conf = new OrganizationLookup(page1);

    //Step 3: Search for 'Transition QA Hospital 1' organization
    await ECIN_Conf.SearchOrganization('Hospital', TransitionOrg1);

    //Step 4: Click on 'Settings'
    await ECIN_Conf.OrgnizationSettings();

    //Step 5: Select 'Enable patient choice' and 'Enable Transition', and click on save button.
    if (!await page1.getByText('Org Can Create Referrals').isChecked()) {
        await page1.waitForLoadState('domcontentloaded');
        await page1.locator('#chkCreateReferrals').check();
        // Commentfield_Need_InputText = true;
    }


    if (!await page1.getByText('Enable Patient Choice').isChecked()) {
        await page1.waitForLoadState('domcontentloaded');
        await page1.waitForTimeout(2000);
        await page1.locator('#cbEnablePatientChoice').check();

    }

    if (!await page1.getByLabel('Enable Transition').isChecked()) {
        await page1.waitForLoadState('domcontentloaded');
        await page1.waitForTimeout(2000);
        await page1.locator('#cbIsTransitionEnabled').check();

    }

    // Select the Patient Choice Dashboard option from the dropdown
    await page1.locator('#cmbTransitionDashBoardOptions').selectOption('Patient Choice Dashboard');

    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    if (await page1.locator('#txtbxComments').isEnabled()) {
        // Adding the comment into the comments field
        await page1.locator('#txtbxComments').fill('StandAlone PC check');
    }

    // Click on save button
    await page1.getByRole('button', { name: 'Save' }).click();

    await page1.waitForTimeout(2000);

    //Step 6: change the org to 'Transition QA Hospital 1'
    await Appnav.NavigateToChangeOrg(TransitionOrg1);

    // Step 7: Navigate to configure and click on Discharge planning.
    await Appnav.NavigateToReferralConfiguration();

    //Checking the referral configuration header
    await page1.waitForLoadState('domcontentloaded');
    await expect(page1.getByTitle('Referral Configuration')).toBeVisible();
    await page1.waitForTimeout(2000);

    //Step 8: Click on Referral configuration and verify the user is able to see the flowsheet mapping section and able to download and upload the flowsheet.
    await expect(page1.getByText('Transition Flowsheet Row Mapping')).toBeVisible();
    await expect(page1.locator('#flowsheetFileUpload')).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Upload File' })).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Download Latest File' })).toBeVisible();

    // Click on configure icon
    await Appnav.NavigateToReferralTypeEditor();
    await page1.waitForTimeout(2000);

    //Step 9: Click on Configure -> Discharge planning -> Referral type editor -> Click on 'Edit' link in search criteria.
    await page1.waitForLoadState('domcontentloaded');
    await expect(page1.getByTitle('Referral Type Editor')).toBeVisible();
    await page1.waitForTimeout(2000);

    const AddEditSearchCriteriaPage = new AddEditSearchCriteria(page1);

    await AddEditSearchCriteriaPage.Click_SearchCriteria_Editlink();
    await page1.waitForTimeout(2000);

    // Enable Patient Choice checkbox
    if (!await page1.locator('#chkEnableCareport').isChecked()) {
        await page1.locator('#chkEnableCareport').check();
        await AddEditSearchCriteriaPage.Click_ApplyButton();
        await page1.waitForTimeout(2000);
    }
    if (await page1.locator('#chkEnableCareport').isChecked()) {
        await page1.locator('#chkEnableCareport').uncheck();
        await AddEditSearchCriteriaPage.Click_ApplyButton();
        await page1.waitForTimeout(2000);
        await AddEditSearchCriteriaPage.Click_SaveButton();
    }

    //closing the page1
    await page1.close();

    //Creating an Object to LIB class
    var Library = new LIB();

    //Step 10: Launch Transition through EPIC FHIR for patient "Cadence, Anna"
    const newPage = await Library.HandleAppLaunch('Clin Doc, Henry', 'E1703', 'Patient Choice');

    // Land on the shared choice page in Transition
    await expect(newPage.locator('#referralsPageTitle')).toBeVisible();

    //closing the newPage
    await newPage.close();

    //Referral Dashboard -> same steps from 1 to 10 will be repeated for Referral Dashboard
    //Created a object for Login Page class
    const TransitionGhostOrg1 = new LoginPage(page);

    //passing the username and passowrd from env variable into the login function 
    const page2 = await TransitionGhostOrg1.login(user, password);

    const Appnav1 = new ApplicationNavigator(page2);
    //Changin the org to ECIN Administrative Organization
    await Appnav1.NavigateToChangeOrg('ECIN Administrative Organization');

    //Created a object for OrganizationLookup class
    const ECIN_Conf1 = new OrganizationLookup(page2);

    //Searching the organization
    await ECIN_Conf1.SearchOrganization('Hospital', TransitionOrg1);

    // Click on setting icon
    await ECIN_Conf1.OrgnizationSettings();

    if (!await page2.getByText('Org Can Create Referrals').isChecked()) {
        await page2.waitForLoadState('domcontentloaded');
        await page2.locator('#chkCreateReferrals').check();
    }


    if (!await page2.getByText('Enable Patient Choice').isChecked()) {
        await page2.waitForLoadState('domcontentloaded');
        await page2.waitForTimeout(2000);
        await page2.locator('#cbEnablePatientChoice').check();
    }

    if (!await page2.getByLabel('Enable Transition').isChecked()) {
        await page2.waitForLoadState('domcontentloaded');
        await page2.waitForTimeout(2000);
        await page2.locator('#cbIsTransitionEnabled').check();
    }

    // Select the Referral Dashboard option from the dropdown
    await page2.locator('#cmbTransitionDashBoardOptions').selectOption('Referral Dashboard');

    await page2.waitForLoadState('domcontentloaded');
    await page2.waitForTimeout(2000);

    if (await page2.locator('#txtbxComments').isEnabled()) {
        // Adding the comment into the comments field
        await page2.locator('#txtbxComments').fill('StandAlone PC check');
    }
    // Click on save button
    await page2.getByRole('button', { name: 'Save' }).click();

    await page2.waitForTimeout(2000);

    //Changing the org to Transition org
    await Appnav1.NavigateToChangeOrg(TransitionOrg1);

    // Navigate to Referral Configuration page
    await Appnav1.NavigateToReferralConfiguration();

    //Checking the referral configuration header
    await page2.waitForLoadState('domcontentloaded');

    await expect(page2.getByTitle('Referral Configuration')).toBeVisible();
    await page2.waitForTimeout(2000);

    await expect(page2.getByText('Transition Flowsheet Row Mapping')).toBeVisible();
    await expect(page2.locator('#flowsheetFileUpload')).toBeVisible();
    await expect(page2.getByRole('button', { name: 'Upload File' })).toBeVisible();
    await expect(page2.getByRole('button', { name: 'Download Latest File' })).toBeVisible();

    // Click on configure icon
    await Appnav1.NavigateToReferralTypeEditor();
    await page2.waitForTimeout(2000);

    // Referral Type Editor should be visible
    await page2.waitForLoadState('domcontentloaded');
    await expect(page2.getByTitle('Referral Type Editor')).toBeVisible();
    await page2.waitForTimeout(2000);

    const AddEditSearchCriteriaPage1 = new AddEditSearchCriteria(page2);

    await AddEditSearchCriteriaPage1.Click_SearchCriteria_Editlink();
    await page2.waitForTimeout(2000);

    // Enable Patient Choice checkbox
    if (!await page2.locator('#chkEnableCareport').isChecked()) {
        await page2.locator('#chkEnableCareport').check();
        await AddEditSearchCriteriaPage1.Click_ApplyButton();
        await page2.waitForTimeout(2000);
    }
    if (await page2.locator('#chkEnableCareport').isChecked()) {
        await page2.locator('#chkEnableCareport').uncheck();
        await AddEditSearchCriteriaPage1.Click_ApplyButton();
        await page2.waitForTimeout(2000);
        await AddEditSearchCriteriaPage1.Click_SaveButton();
    }

    //closing the page2
    await page2.close();

    //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
    const newPage1 = await Library.HandleAppLaunch('Clin Doc, Henry', 'E1703', 'Manage Referrals');

    await expect(newPage1.locator('#referralsPageTitle')).toBeVisible();

    //closing the newPage
    await newPage1.close();
});
