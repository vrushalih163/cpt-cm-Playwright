//Author: Rajakumar Maste, Created Date: 13 August 2024

import { test, expect, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { LIB } from '../../bizLibs/lib';
import { LoginPage } from '../../pages/PageLogin_111';
import { OrganizationLookup } from '../../pages/OrganizationLookupPage_595';
import { AddEditSearchCriteria } from '../../pages/AddEditSearchCriteriaPage_561';

// Override the configuration to use a single worker
test.use({ workers: 1 });
test.setTimeout(5 * 60 * 1000);
const { user, password, TransitionOrg1, TransitionOrg1_ID } = process.env

// Constants for test types
const FIRST_TEST = 'first';
const SECOND_TEST = 'second';

// Function to launch the Transition application and perform login
async function launchTransitionAndLogin(testType) {
    try {
        // Launch the Transition application
        const Library = new LIB();

        // Getting persistent context
        var library = Library.DataDirectory();
        const userpath = ((await library).toString());
        const browser = await chromium.launchPersistentContext(userpath);
        const pages = browser.pages();
        const page3 = pages[0];

        // EPIC Oauth popup details fill up and logging into Transition
        const library1 = new LIB(page3);
        const newPage = await library1.TransitionLogin('Clin Doc, Henry');

        if (testType === FIRST_TEST) {
            // Land on the shared choice page in Transition
            await expect(newPage.getByText('Shared Choice')).toBeVisible();
        } else {
            // Land on the manage referral page in Transition
            await expect(newPage.getByText('Manage Referrals')).toBeVisible();
        }
        await browser.close();
    } catch (error) {
        if (testType === FIRST_TEST) {
            console.error("Failed to land on the shared choice page in Transition:", error.message);
        } else {
            console.error("Failed to land on the manage referral page in Transition:", error.message);
        }
       // throw error; // Re-throw the error after logging it
    }
}

test('Patient Choice Dashboard', async ({ page }) => {

    //Created a object for LoginPage class
    const TransitionGhostOrg = new LoginPage(page);

    //passing the username and passowrd from env variable into the login function 
    const page1 = await TransitionGhostOrg.login(user, password);

    const Appnav = new ApplicationNavigator(page1);
    //Changin the org to ECIN Administrative Organization
    await Appnav.NavigateToChangeOrg('ECIN Administrative Organization');

    //Created a object for OrganizationLookup class
    const ECIN_Conf = new OrganizationLookup(page1);

    //Searching the organization
    await ECIN_Conf.SearchOrganization('Hospital', TransitionOrg1_ID);

    // Click on setting icon
    await ECIN_Conf.OrgnizationSettings();


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

    //Changing the org to Transition org
    await Appnav.NavigateToChangeOrg(TransitionOrg1);

    // Navigate to Referral Configuration page
    await Appnav.NavigateToReferralConfiguration();

    //Checking the referral configuration header
    await page1.waitForLoadState('domcontentloaded');
    await expect(page1.getByTitle('Referral Configuration')).toBeVisible();
    await page1.waitForTimeout(2000);

    await expect(page1.getByText('Transition Flowsheet Row Mapping')).toBeVisible();
    await expect(page1.locator('#flowsheetFileUpload')).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Upload File' })).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Download Latest File' })).toBeVisible();

    // Click on configure icon
    await Appnav.NavigateToReferralTypeEditor();
    await page1.waitForTimeout(2000);

    // Referral Type Editor should be visible
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
    if(await page1.locator('#chkEnableCareport').isChecked()) {
        await page1.locator('#chkEnableCareport').uncheck();
        await AddEditSearchCriteriaPage.Click_ApplyButton();
        await page1.waitForTimeout(2000);
        await AddEditSearchCriteriaPage.Click_SaveButton();
    }

    //closing the page1
    await page1.close();

    // Call the function to launch Transition and login
    launchTransitionAndLogin(FIRST_TEST);
});

test('Referral Dashboard', async ({ page }) => {

    //Created a object for Login Page class
    const TransitionGhostOrg = new LoginPage(page);

    //passing the username and passowrd from env variable into the login function 
    const page1 = await TransitionGhostOrg.login(user, password);

    const Appnav = new ApplicationNavigator(page1);
    //Changin the org to ECIN Administrative Organization
    await Appnav.NavigateToChangeOrg('ECIN Administrative Organization');

    //Created a object for OrganizationLookup class
    const ECIN_Conf = new OrganizationLookup(page1);

    //Searching the organization
    await ECIN_Conf.SearchOrganization('Hospital', TransitionOrg1_ID);

    // Click on setting icon
    await ECIN_Conf.OrgnizationSettings();

    if (!await page1.getByText('Org Can Create Referrals').isChecked()) {
        await page1.waitForLoadState('domcontentloaded');
        await page1.locator('#chkCreateReferrals').check();
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

    // Select the Referral Dashboard option from the dropdown
    await page1.locator('#cmbTransitionDashBoardOptions').selectOption('Referral Dashboard');

    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    if (await page1.locator('#txtbxComments').isEnabled()) {
        // Adding the comment into the comments field
        await page1.locator('#txtbxComments').fill('StandAlone PC check');
    }
    // Click on save button
    await page1.getByRole('button', { name: 'Save' }).click();

    await page1.waitForTimeout(2000);

    //Changing the org to Transition org
    await Appnav.NavigateToChangeOrg(TransitionOrg1);

    // Navigate to Referral Configuration page
    await Appnav.NavigateToReferralConfiguration();

    //Checking the referral configuration header
    await page1.waitForLoadState('domcontentloaded');

    await expect(page1.getByTitle('Referral Configuration')).toBeVisible();
    await page1.waitForTimeout(2000);

    await expect(page1.getByText('Transition Flowsheet Row Mapping')).toBeVisible();
    await expect(page1.locator('#flowsheetFileUpload')).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Upload File' })).toBeVisible();
    await expect(page1.getByRole('button', { name: 'Download Latest File' })).toBeVisible();

    // Click on configure icon
    await Appnav.NavigateToReferralTypeEditor();
    await page1.waitForTimeout(2000);

    // Referral Type Editor should be visible
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
    if(await page1.locator('#chkEnableCareport').isChecked()) {
        await page1.locator('#chkEnableCareport').uncheck();
        await AddEditSearchCriteriaPage.Click_ApplyButton();
        await page1.waitForTimeout(2000);
        await AddEditSearchCriteriaPage.Click_SaveButton();
    }

    //closing the page1
    await page1.close();

    // Call the function to launch Transition and login
    await launchTransitionAndLogin(SECOND_TEST);
});
