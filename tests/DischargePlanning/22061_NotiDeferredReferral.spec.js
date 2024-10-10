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
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ReferralAssignmentsPage } from '../../pages/ReferralAssignmentsPage_819';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
const fs = require('fs').promises;

const { user, password, QAProvider1, Hospital1, QAOfflineProv1, QAOfflineProv2 } = process.env

test('DP Notifications for deferred referral', async ({ page }) => {

    //Step -1: Login into CM application and navigate to Wellsky QA Hospital 1.
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);

    const lib1 = new LIB(page1);

    //Step 2- Create patient and admission
    let result = await lib1.createptandadm();
    await page1.waitForTimeout(2000);

    //Step 3- Create a referral by selecting the same referral type as created in precondition  and send the referral to below provider (as configured in precondition)
    // Online provider : QA Provider #1
    // Offline  provider (web )  :  QA Provider #4 (use 9198006418 as the fax number)
    // Offline  provider (Summary  )  :  QA Provider #8 (use 9198006418 as the fax number)
    const ReferralConfirmation = new ReferralConfirmationPage(page1);
    const ReferralFacesheet = new ReferralFacesheetPage(page1);
    const ChooseRecipients = new ChooseRecipientsPage(page1);
    const SendReferral = new SendReferralPage(page1);
    const ManageContextNav = new ManageContextNavigator(page1);
    const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page1);
    const ReferalAssignments = new ReferralAssignmentsPage(page1);
    const DischargePlanning = new DischargePlanningPage(page1);
    const AppNav = new ApplicationNavigator(page1);

    await ManageContextNav.NavigateToCreateReferral();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ReferralFacesheet.createReferral('ATAutomation5');
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ManageContextNav.NavigateToChooseRecipients();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    let startIndex = QAProvider1.length - 15;

    await ChooseRecipients.choose1Recipient(QAProvider1.substring(startIndex));
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await page1.locator('//acm-label-textbox[@id="tbProviderName"]//span[@title="Clear"]').click();
    //await ChooseRecipients.ClearProviderNameTextbox();
    startIndex = QAOfflineProv1.length - 15;
    await ChooseRecipients.choose1Recipient(QAOfflineProv1.substring(startIndex));
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await page1.locator('//acm-label-textbox[@id="tbProviderName"]//span[@title="Clear"]').click();
    //await ChooseRecipients.ClearProviderNameTextbox();
    startIndex = QAOfflineProv2.length - 15;
    await ChooseRecipients.choose1Recipient(QAOfflineProv2.substring(startIndex));
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ManageContextNav.NavigateToSendReferrals()
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(4000);

    //Step 4 - Click on Send Later radio button and select below values 
    //Select  In: 1 hours 1 mins	
    //Click on send referral button
    
    await SendReferral.SendLater();
    await SendReferral.unMaskAllPatientInfo();
    await SendReferral.clickSendReferralButton();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(4000);

    await ReferralConfirmation.validateConfirmationText('has been posted by automation');
    var referralId = await ReferralConfirmation.getReferralId();
    await ReferralConfirmation.ClickContinue();

    //Step 5 - 1. Navigate to QA Provider#1 after 1 hour and 1 min  
    // 2. Search for referral which is created above in Incoming Referral View.
    // 3. Click on Assigned user link and select Logged In User 2  as the assigned user for the above referral ID.
    
    await AppNav.NavigateToChangeOrg(QAProvider1);
    await AppNav.NavigateToIncomingReferralsEnhancedView();
    await IncomingReferralsEnhancedView.searchReferralId(referralId);
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await IncomingReferralsEnhancedView.ClickUnassignedLink();
    await ReferalAssignments.SelectUser('Automation15');

    //Step 6 - Navigate to Wellsky QA Hospital 1
    //Search the admission as created in above step
    //From the left Nav bar click on Discharge Planning link
    await AppNav.NavigateToChangeOrg(Hospital1);
    await lib1.SearchAdmission('AutoAccntNo' + result);
    const AdmissionDefaultView = new AdmissionDefaultViewPage(page1);
    await AdmissionDefaultView.navigateActionDDBox('Discharge Planning');

    //Step 7 - 1. Click on the Placements tab 
    // 2. Click on the Recipient dropdown for the Referral ID which has been used in the workflow  and select QA Provider #1 as the placement provider
    // 3. Click on the [edit] link for Selection Factor.
    // 4. Choose one or more selection factors from the available list.
    // 5. Add placement notes 
    // Click on Save button
    await page1.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]').first().click(); 
    await page1.getByText(QAProvider1).first().click();
    await DischargePlanning.ClickNoteLink(0);
    await DischargePlanning.AddNote('Test Note 1');
    await DischargePlanning.ClickApply();

    //Step 8 - Verify the fax generated email (Fax generated for QA Provider #4 & QA Provider #8)

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
    const content = 'NEW Referral ' + referralId +' for '+ QAProvider1 +' from '+ Hospital1 +'|Referral ' + referralId +' from '+ Hospital1 +' was placed elsewhere.|Referral ' + referralId +' from '+ Hospital1 +' was placed with you.|CarePort Care Management Alert';
    await fs.writeFile(filePath, content, 'utf8');
});
