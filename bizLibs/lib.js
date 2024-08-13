

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
const moment = require('moment-timezone');
const os = require('os');
const path = require('path');
const { FhirLaunchUrl, TransitionlaunchUrl, Tokens } = process.env

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
     * This method is used to fetch the user directory path automatically
     * @returns user directory path
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


    /**
    * EPIC Oauth login popup
    * 
    * **Patient Name**
    * Enter the correct patient name. For referrence: 'Cadence, Anna', 'Clin Doc, Henry', 'Grand Central, John','Optime, Omar','Nelson, Kyle'
    * 
    */
    async TransitionLogin(patientName) {
        await this.page.goto(FhirLaunchUrl);
        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator('#userLoginMenu').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        await this.page.locator("//*[@id=\"LoginContextUSCDILogin\"]/span").click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(10000);

        await this.page.locator('//a[@id="DocumentationDropdown"]').click();
        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator('#mnulaunching').click();

        await this.page.locator('#btnTrySmart').click();//Try it button

        await this.page.locator('#selApp').selectOption('EPIC');

        await this.page.locator('//div[@id="divPickEpt"]//div[@title="Pick a patient"]//select[@id="selEpt"]').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByLabel('Select a patient').selectOption(patientName);

        await this.page.locator('#txtOAuth2LaunchUrl').fill(TransitionlaunchUrl);
        await this.page.locator('#txtTokens').fill(Tokens);
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator('#btnLaunch').click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await newPage.waitForTimeout(3000);
        return newPage;
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
        const userDataDir = await DataDirectory();

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
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
};