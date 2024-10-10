// Author - Vrushali Honnatti Date:23rd Sept, 2024

const { test } = require("@playwright/test")
import { LIB } from '../../bizLibs/lib';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { ContactListPage } from '../../pages/ContactListPage_1434';
import { LoginPage } from '../../pages/PageLogin_111';
import { ReferralConfirmationPage } from '../../pages/referralConfirmationPage_188';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ReferralFacesheetPage } from '../../pages/referralfacesheetpage_145';
import { ChooseRecipientsPage } from '../../pages/chooseRecipientspage_1446';
import { SendReferralPage } from '../../pages/sendReferralPage_176';
import { DischargePlanningPage } from '../../pages/DischargePlanningPage_1443';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { AdmitExpressPage } from '../../pages/AdmitExpressPage_139';
const fs = require('fs').promises;

const { user, password, QAProvider1, Hospital1, QAOfflineProv1, QAOfflineProv2 } = process.env

test('DP Notifications for referral created through Admit Express', async ({ page }) => {

    //Step -1: Login into CM application and navigate to Wellsky QA Hospital 1.
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);

    //Creating a object to ApplicationNavigator class
    const Appnav = new ApplicationNavigator(page1);

    const lib1 = new LIB(page1);

    //Step 2- Create patient and admission
    var result = await lib1.createptandadm();
    await lib1.createFinancial('AUTOTST');
    await page1.waitForTimeout(2000);

    const ReferralConfirmation = new ReferralConfirmationPage(page1);
    const ManageContextNav = new ManageContextNavigator(page1);
    const AdmissionDefaultView = new AdmissionDefaultViewPage(page1);
    const AdmitExpress = new AdmitExpressPage(page1);

    //Step 3- Navigate to Admission default view
    //Search the Admission which is created in step 2
    await Appnav.NavigateToAdmissionDefaultView();
    await AdmissionDefaultView.SearchAdmission(result);

    //Step 4 - From the actionsdropdown select "Admit Express" 
    await AdmissionDefaultView.navigateActionDDBox('Admit Express');

    //Step 5 - Enter all the necessary details and send the referral to below providers 
    // Online provider : QA Provider #1
    // Offline  provider (web )  :  QA Provider #4 (use 9198006418 as the fax number)
    // Offline  provider (Summary  )  :  QA Provider #8 (use 9198006418 as the fax number)
    await AdmitExpress.SelectReferralType('ATAutomation5')
    await AdmitExpress.ChooseRecipients(QAProvider1);
    await AdmitExpress.ChooseRecipients(QAOfflineProv1);
    await AdmitExpress.ChooseRecipients(QAOfflineProv2);
    await AdmitExpress.unMaskAllPatientInfo();
    await AdmitExpress.ClickSendReferral();

    await ReferralConfirmation.validateConfirmationText('has been posted by automation');
    var referralID = await ReferralConfirmation.getReferralId();
    await ReferralConfirmation.ClickContinue();

    //Step 6 - From the left Nav bar click on Discharge Planning link
    await AdmissionDefaultView.navigateActionDDBox('Discharge Planning');

    //Step 7 - 1. Click on the Placements tab 
    // 2. Click on the Recipient dropdown for the Referral ID which has been used in the workflow  and select QA Provider #1 as the placement provider
    // 3. Click on the [edit] link for Selection Factor.
    // 4. Choose one or more selection factors from the available list.
    // 5. Add placement notes 

    // Click on Save button
    const DischargePlanning = new DischargePlanningPage(page1);

    await page1.pause();
    await page1.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]').first().click(); 
    await page1.getByText(QAProvider1).click();
    // await DischargePlanning.SelectPlacement(1, QAProvider1);
    await DischargePlanning.ClickApply();

    //Step 8 - Verify the fax generated email (Fax generated for QA Provider #4 & QA Provider #8
    //Step 9 - From the left Nav bar click on Discharge Planning link
    //Step 10 - 1. Click on the Placements tab 
    // 2. Click on the Recipient dropdown for the Referral ID which has been used in the workflow and select QA Provider #4 as the placement provider
    // 3. Click on the [edit] link for Selection Factor.
    // 4. Choose one or more selection factors from the available list.
    // 5. Add placement notes 
    // Click on Save button
    await page1.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]').first().click(); 
    await page1.getByText(QAOfflineProv1).first().click();
    await DischargePlanning.ClickNoteLink(0);
    await DischargePlanning.AddNote('Test Note 2');
    await DischargePlanning.ClickApply();
   
    //Step 11 - Verify the Email generated notification for QA Provider #1
    const filePath = 'NotificationDetails.txt';
    const content = 'NEW Referral ' + referralID +' for '+ QAProvider1 +' from '+ Hospital1 +'|Referral ' + referralID +' from '+ Hospital1 +' was placed elsewhere.|Referral ' + referralID +' from '+ Hospital1 +' was placed with you.|CarePort Care Management Alert';
    await fs.writeFile(filePath, content, 'utf8');
});
