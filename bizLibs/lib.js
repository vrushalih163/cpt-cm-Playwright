
//home.page.ts
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
            await this.page.locator('#btnLaunch').click()
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
}