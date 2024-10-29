//Modified by Rajakumar Maste, Date: 11 Sept 2024 
//comment - Added new method called 'CreateNewAdmissionForTransPatient()' and moved 'generateUniqueText()' method inside the class
import { PatientdetailsPage } from '../pages/patientdetailspage_52';
import { AdmissiondetailsPage } from '../pages/admissiondetailspage_54';
import { ApplicationNavigator } from '../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../pages/ManageContextNavigator';
import { PatientdefaultviewPage } from '../pages/patientdefaultviewpage_631';
import { AdmissionFinancialInformationPage } from '../pages/AdmissionFinancialInformationPage_55';
import { AddPaymentSourcePage } from '../pages/addpaymentsource_165';
import { LoginPage } from '../pages/PageLogin_111';
import { AdmissionFaceSheet } from '../pages/AdmisssionFaceSheet_51';
import { TransitionDignosis } from '../pages/TransitionDignosis_1469';
import { AdmissionDefaultViewPage } from '../pages/AdmissionDefaultViewPage_631';
import { expect } from '@playwright/test';
const { chromium } = require('playwright');
const fs = require('fs').promises;
const moment = require('moment-timezone');
const os = require('os');
const path = require('path');
const { timeZone, format, FhirLaunchUrl, TransitionlaunchUrl, Tokens, LaunchThroughEPIC, user, password, TransitionOrg1 } = process.env



export class LIB {

    constructor(page) {
        this.page = page;

    }

    /**
     * This method generates a unique text based on the length provided
     * @param {*} length  Enter the length of the text you want to generate
     * @returns 
     */
    async generateUniqueText(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /** This method generates a unique integer string based on the length provided
     * @param {*} length  Enter the length of the integer string you want to generate
     * @returns   */
    async generateUniqueIntegerString(length){
        const digits = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return result;
    }

    /**
     * This method will switch the login flow based on the 'LaunchThroughEPIC' variable state
     * @param {*} TransPatientName 
     * For referrence: 'Cadence, Anna', 'Clin Doc, Henry', 'Grand Central, John','Optime, Omar','Nelson, Kyle'
     * @param {*} TransPatientMRN 
     * For reference: E2651, E1703, E3228, E3350, E3734
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
            await page.setViewportSize({ width: 1300, height: 800 });

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
            await page.setViewportSize({ width: 1300, height: 800 });

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

    /**
     * This method is used to get the persistent context path
     * @returns percistent context path
     */
    async DataDirectory() {
        // Get the user's home directory
        const homeDir = os.homedir();
        // Construct the full path to the user data directory
        const userDataDir = path.join(homeDir, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Network');
        // Add an extra backslash wherever a backslash is present
        const modifiedPath = userDataDir.replace(/\\/g, "\\\\");
        return String(modifiedPath);
    }

    async createptandadm() {

        const Patientdetails = new PatientdetailsPage(this.page);
        const Admissiondetails = new AdmissiondetailsPage(this.page);
        const Patientdefaultviews = new PatientdefaultviewPage(this.page);

        const AppNav = new ApplicationNavigator(this.page);
        const ManageContextNav = new ManageContextNavigator(this.page);

        let result = (await this.generateUniqueText(5)).toString();

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
        return result;
    }

    /**
     * This method is used to search an admission in Admission Default View page.
     * @param {string} AdmissionID
     */
    async SearchAdmission(AdmissionID) {
        const AppNav = new ApplicationNavigator(this.page);
        const AdmissionDefaultView = new AdmissionDefaultViewPage(this.page);
        await AppNav.NavigateToAdmissionDefaultView();
        await AdmissionDefaultView.SearchAdmission(AdmissionID);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
    async createFinancial(finClass) {

        const ManageContextNav = new ManageContextNavigator(this.page);
        const AdmissionFinancialInformation = new AdmissionFinancialInformationPage(this.page)
        const AddPaymentSource = new AddPaymentSourcePage(this.page);


        await ManageContextNav.NavigateToFinancial();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await AdmissionFinancialInformation.clickaddfinancial();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await AddPaymentSource.setFinClass(finClass);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        return this.page;
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
 * Get the current date and time in a specified time zone.
 * @param {string} timeZone - The input time zone string. Example: If the timezone is PT then pass 'pacific'.
 * @param {string} format - The time format ('12hr' or '24hr').
 * @returns {Promise<string>} - The current date and time in the specified time zone and format.
 */
    async getCurrentDateTimeInTimeZone(timeZone, format) {
        // Map the input time zone to an IANA time zone identifier and abbreviation
        const lowerCaseTimeZone = timeZone.toLowerCase();
        let iana, abbreviation;

        switch (true) {
            case lowerCaseTimeZone.includes('pt') || lowerCaseTimeZone.includes('pacific'):
                iana = 'America/Los_Angeles';
                abbreviation = 'PT';
                break;
            case lowerCaseTimeZone.includes('ct') || lowerCaseTimeZone.includes('central'):
                iana = 'America/Chicago';
                abbreviation = 'CT';
                break;
            case lowerCaseTimeZone.includes('et') || lowerCaseTimeZone.includes('eastern'):
                iana = 'America/New_York';
                abbreviation = 'ET';
                break;
            case lowerCaseTimeZone.includes('atlantic'):
                iana = 'America/Halifax';
                abbreviation = 'AT';
                break;
            case lowerCaseTimeZone.includes('mountain'):
                iana = 'America/Denver';
                abbreviation = 'MT';
                break;
            case lowerCaseTimeZone.includes('alaska'):
                iana = 'America/Anchorage';
                abbreviation = 'AKT';
                break;
            case lowerCaseTimeZone.includes('hawaii') || lowerCaseTimeZone.includes('aleutian'):
                iana = 'Pacific/Honolulu';
                abbreviation = 'HAT';
                break;
            case lowerCaseTimeZone.includes('greenwich') || lowerCaseTimeZone.includes('gmt'):
                iana = 'Etc/GMT';
                abbreviation = 'GMT';
                break;
            default:
                throw new Error('Unsupported time zone');
        }

        // Get the current date and time
        const now = moment();

        // Determine the time format
        const timeFormat = format === '12hr' ? 'M/D/YYYY h:mm A' : 'M/D/YYYY H:mm';

        // Convert to the specified time zone and format
        const dateTimeInTimeZone = now.tz(iana).format(timeFormat);

        return `${dateTimeInTimeZone} (${abbreviation})`;
    }

    /**
     * This method is used to create a new admission for a transition patient
     * @param {*} PatientMRN  Enter the patient MRN
     * @param {*} PatientAccNumber Enter the patient account number
     * 
     * **Referrence:**
     * - Patient Name: 'Cadence, Anna', 'Clin Doc, Henry', 'Grand Central, John','Optime, Omar','Nelson, Kyle'
     * - Patient MRN: E2651, E1703, 3228, E3350, E3734
     * - Patient Account Number: 27485, 27418, 1993, 6572, 20042
     * 
     * Above Patient Name, MRN and Account Number are in the same order.
     */
    async CreateNewAdmissionForTransPatient(PatientMRN, PatientAccNumber) {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1350, height: 800 });

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
        await PatientDefaultViewPage.SearchPatientByMRN(PatientMRN);

        //Calling & Passing the option present in dropdown to NavigateActionDDBox method
        await PatientDefaultViewPage.NavigateActionDDBox('Most Recent Admission');

        //Clicking on the Admission link in the left navigation
        await page1.getByRole('link', { name: 'Admission' }).click();
        await page1.waitForLoadState('domcontentloaded');

        //Clicking on the Admission Details link
        await page1.getByRole('link', { name: 'Admission Details' }).click();
        await page1.waitForLoadState('domcontentloaded');

        //generating unique text
        const uniqueText = await this.generateUniqueText(5);

        //Entering the text in the account number field
        await (page1.locator('//input[@name="txtHospitalAdmissionID"]')).fill(PatientAccNumber+'-'+uniqueText);

        //Click on Save Button
        await page1.locator('#ButtonBarSave').click();

        //selecting Create admission from the action dropdown
        await PatientDefaultViewPage.NavigateActionDDBox('Create Admission');
        await page1.waitForLoadState('domcontentloaded');

        //Calling the generateUniqueText method to generate a unique text
        const result = this.generateUniqueText(5);
        const AdmissionDetails = new AdmissiondetailsPage(page1);
        //Entering all the mandatory fields in the Admission Details page
        await AdmissionDetails.createAdmission((await result).toString());

        //Click on Save Button
        await AdmissionDetails.clicksave();

        //Closing the browser
        await page1.close();
        await page.close();
    }

    async validatetime(PSCDT,CDT)
    {
          expect(isTimeWithinTolerance(PSCDT, CDT, 1)).toBe(true);
    }    

};

// Custom function to compare times with tolerance
function isTimeWithinTolerance(actualTime, expectedTime, toleranceMinutes) {
    const actualDate = new Date(actualTime);
    const expectedDate = new Date(expectedTime);
    const toleranceMillis = toleranceMinutes * 60 * 1000;
    return Math.abs(actualDate - expectedDate) <= toleranceMillis;
  }