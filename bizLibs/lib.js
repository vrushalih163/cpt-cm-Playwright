//Modified by Rajakumar Maste, Date: 14 Aug 2024, Description: added 'HandleAppLaunch' method to handle the application launch 
//comment - Added new login method i.e HandleAppLaunch
import { PatientdetailsPage } from '../pages/patientdetailspage_52';
import { AdmissiondetailsPage } from '../pages/admissiondetailspage_54';
import { ApplicationNavigator } from '../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../pages/ManageContextNavigator';
import { PatientdefaultviewPage } from '../pages/patientdefaultviewpage_631';
import { FinancialPage } from '../pages/financialpage_55';
import { AddPaymentSourcePage } from '../pages/addpaymentsource_165';
import { ReferralFacesheetPage } from '../pages/referralfacesheetpage_145';
import { ChooseRecipientsPage } from '../pages/chooseRecipientspage_1446';
import { SendReferralPage } from '../pages/sendReferralPage_176';
import { ReferralConfirmationPage } from '../pages/referralConfirmationPage_188';
import { LoginPage } from '../pages/PageLogin_111';
import { AdmissionFaceSheet } from '../pages/AdmisssionFaceSheet_51';
import { TransitionDignosis } from '../pages/TransitionDignosis_1469';
const { chromium } = require('playwright');
const fs = require('fs').promises;
const moment = require('moment-timezone');
const os = require('os');
const path = require('path');
const { FhirLaunchUrl, TransitionlaunchUrl, Tokens, LaunchThroughEPIC, user, password, TransitionOrg1 } = process.env

function generateUniqueText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


/**
* Map specific time zone text to IANA time zone identifiers.
* @param {string} timeZone - The input time zone string.
* @returns {string} - The IANA time zone identifier.
*/
function mapTimeZone(timeZone) {
    const lowerCaseTimeZone = timeZone.toLowerCase();

    if (lowerCaseTimeZone.includes('pt') || lowerCaseTimeZone.includes('pacific')) {
        return 'America/Los_Angeles';
    } else if (lowerCaseTimeZone.includes('ct') || lowerCaseTimeZone.includes('central')) {
        return 'America/Chicago';
    } else if (lowerCaseTimeZone.includes('et' || lowerCaseTimeZone.includes('eastern'))) {
        return 'America/Halifax';
    } else if (lowerCaseTimeZone.includes('atlantic')) {
        return 'America/Halifax';
    } else if (lowerCaseTimeZone.includes('mountain')) {
        return 'America/Denver';
    } else if (lowerCaseTimeZone.includes('alaska')) {
        return 'America/Anchorage';
    } else if (lowerCaseTimeZone.includes('hawaii') || lowerCaseTimeZone.includes('aleutian')) {
        return 'Pacific/Honolulu';
    } else if (lowerCaseTimeZone.includes('greenwich') || lowerCaseTimeZone.includes('gmt')) {
        return 'Etc/GMT';
    } else {
        throw new Error('Unsupported time zone');
    }
}

/**
 * Get the current date and time in a specified time zone.
 * @param {string} timeZone - The input time zone string.
 * @param {string} format - The time format ('12hr' or '24hr').
 * @returns {string} - The current date and time in the specified time zone and format.
 */
function getCurrentDateTimeInTimeZone(timeZone, format) {
    // Map the input time zone to an IANA time zone identifier
    const ianaTimeZone = mapTimeZone(timeZone);

    // Get the current date and time
    const now = moment();

    // Determine the time format
    const timeFormat = format === '12hr' ? 'M-D-YYYY hh:mm A' : 'M-D-YYYY HH:mm';

    // Convert to the specified time zone and format
    const dateTimeInTimeZone = now.tz(ianaTimeZone).format(timeFormat);

    return dateTimeInTimeZone;
}

export class LIB {

    constructor(page) {
        this.page = page;
    }

    /**
     * This method will switch the login flow based on the 'LaunchThroughEPIC' variable state
     * @param {*} TransPatientName 
     * For referrence: 'Cadence, Anna', 'Clin Doc, Henry', 'Grand Central, John','Optime, Omar','Nelson, Kyle'
     * @param {*} TransPatientMRN 
     * For reference: E2651, E1703, 3228, E3350, E3734
     * @param {*} TransNavigationOption 
     * Navigator options on Transition Dignosis page: Manage Referrals, Patient Choice, Tasks
     * @returns 
     */
    async HandleAppLaunch(TransPatientName, TransPatientMRN, TransNavigationOption) {
        if (LaunchThroughEPIC === 'true') {
            //EPIC Oauth popup details fill up and logging into Transition
            //getting persistant context
            var library = await this.DataDirectory();
            const userpath = library.toString();
            const browser = await chromium.launchPersistentContext(userpath);
            const pages = browser.pages();
            const page = pages[0];
            await page.goto(FhirLaunchUrl);
            await page.waitForLoadState('domcontentloaded');

            if (await page.getByText('Login').isVisible()) {
                await page.locator('#userLoginMenu').click();
                await page.waitForLoadState('domcontentloaded');
                await page.waitForTimeout(2000);

                await page.locator("//*[@id=\"LoginContextUSCDILogin\"]/span").click();
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(15000);
            }

            await page.locator('//a[@id="DocumentationDropdown"]').click();
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(2000);

            await page.locator('#mnulaunching').click();

            await page.locator('#btnTrySmart').click();//Try it button

            await page.locator('#selApp').selectOption('EPIC');

            await page.locator('//div[@id="divPickEpt"]//div[@title="Pick a patient"]//select[@id="selEpt"]').click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByLabel('Select a patient').selectOption(TransPatientName);

            await page.locator('#txtOAuth2LaunchUrl').fill(TransitionlaunchUrl);
            await page.locator('#txtTokens').fill(Tokens);
            const [newPage] = await Promise.all([
                page.waitForEvent('popup'),
                page.locator('#btnLaunch').click()
            ]);
            await newPage.waitForLoadState('domcontentloaded');
            await newPage.waitForTimeout(3000);
            return newPage;
        } else {
            // Launching new chromium instance
            const browser = await chromium.launch();
            const page = await browser.newPage();

            //Creating a object for LoginPage class
            const TransDign = new LoginPage(page);

            //Passing user and password parameters to login method
            const page1 = await TransDign.login(user, password);

            //Creating a object to ApplicationNavigator class
            const Appnav = new ApplicationNavigator(page1);

            //Calling & Passing Org name to NavigateToChangeOrg method
            await Appnav.NavigateToChangeOrg(TransitionOrg1);

            //calling NavigateToPatinetsDefaultView method
            await Appnav.NavigateToPatientsDefaultView();

            //Creating object to PatientdefaultviewPage and passing page1 to it.
            const PatientDefaultViewPage = new PatientdefaultviewPage(page1);

            //Calling & Passing the patient MRN to SearchPatientByMRN method
            await PatientDefaultViewPage.SearchPatientByMRN(TransPatientMRN);

            //Calling & Passing the option present in dropdown to NavigateActionDDBox method
            await PatientDefaultViewPage.NavigateActionDDBox('Most Recent Admission');

            //Creating object to AdmissiondetailsPage and passing page1 to it.
            const AdmFacesheet = new AdmissionFaceSheet(page1);

            //Clicking on Transition Diagnostics link
            await AdmFacesheet.TransitionDignosis_LinkClick();

            //Creating object to TransitionDignosis class and passing page1 to it.
            const TransDignPg = new TransitionDignosis(page1);
            const newPage = await TransDignPg.SelectNavigationPage_Dropdown(TransNavigationOption);
            return newPage;
        }
    }

    async createptandadm() {

        const Patientdetails = new PatientdetailsPage(this.page);
        const Admissiondetails = new AdmissiondetailsPage(this.page);
        const Patientdefaultviews = new PatientdefaultviewPage(this.page);

        const AppNav = new ApplicationNavigator(this.page);
        const ManageContextNav = new ManageContextNavigator(this.page);

        const result = generateUniqueText(5);

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await AppNav.NavigateToPatientsDefaultView();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        //--patientdefaultviewpage
        await Patientdefaultviews.clickaddapatient();

        //--patientdetailspage
        await Patientdetails.CreatePatient(result);

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await ManageContextNav.clickadmissionplusicon()

        //-Admissiondetailspage
        await Admissiondetails.createAdmission(result);
        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }

    async createFinancial(finClass) {

        const ManageContextNav = new ManageContextNavigator(this.page);
        const Financial = new FinancialPage(this.page)
        const AddPaymentSource = new AddPaymentSourcePage(this.page);


        await ManageContextNav.NavigateToFinancial();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await Financial.clickaddfinancial();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await AddPaymentSource.setFinClass(finClass);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        return this.page;
    }

    async createReferral(referralType, providerName) {

        const ReferralFacesheet = new ReferralFacesheetPage(this.page);
        const ChooseRecipients = new ChooseRecipientsPage(this.page);
        const SendReferral = new SendReferralPage(this.page);
        const ReferralConfirmation = new ReferralConfirmationPage(this.page);
        const ManageContextNav = new ManageContextNavigator(this.page);

        await ManageContextNav.NavigateToCreateReferral();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await ReferralFacesheet.createReferral(referralType);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await ManageContextNav.NavigateToChooseRecipients();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await this.page.getByLabel('Clear').click();
        await this.page.getByPlaceholder('Search by address, city,').click();
        await this.page.keyboard.type('Hagåtña, 96910, Guam', { delay: 1000 });

        await this.page.getByText('Hagåtña, 96910, Guam', { exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).type('Provider Online (226537)');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(8000);
        await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]').click();
        await this.page.getByRole('button', { name: 'Add 1 to Referral' }).click();

        //ChooseRecipients.choose1Recipient(providerName);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);


        await ManageContextNav.NavigateToSendReferrals()
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);

        this.page.locator('xpath=//a[@class="process-link" and @title="Masked"]').click();

        // SendReferral.unMaskPatientInfo_row1();
        // SendReferral.checkSendReferralCB_row1();
        await SendReferral.clickSendReferralButton();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);

        await ReferralConfirmation.validateConfirmationText('has been posted by automation');
    }

    /**
    * Function to copy all text to clipboard
    */
    async CopyTextToClipboard() {
        await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        await this.page.keyboard.press('Control+a');
        await this.page.keyboard.press('Control+c');
        // Read the clipboard content
        const clipboardContent2 = await this.page.evaluate(() => navigator.clipboard.readText());
    }

    /**
     * This method is used to clear the cache and which will helpful to get new code by clearing a existing cache.
     */
    async clearCache() {
        const userDataDir = await this.DataDirectory();

        try {
            const files = await fs.readdir(userDataDir);
            for (const file of files) {
                const filePath = path.join(userDataDir, file);
                const stat = await fs.lstat(filePath);

                if (stat.isDirectory()) {
                    await fs.rmdir(filePath, { recursive: true });
                } else {
                    await fs.unlink(filePath);
                }
            }
            console.log('Cache cleared successfully.');
            const cookiesFilePath = path.join(userDataDir, 'Cookies');
            try {
                await fs.unlink(cookiesFilePath);
                console.log('Cookies cleared successfully.');
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
                console.log('No cookies file found to clear.');
            }
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
};