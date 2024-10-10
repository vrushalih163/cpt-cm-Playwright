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
const fs = require('fs').promises;

const { user, password, QAProvider3, Hospital1, QAOfflineProv1, QAOfflineProv2 } = process.env

test('DP Notifications  : When user is configured only as Schedule user.', async ({ page }) => {

    //Step -1: Login into CM application and navigate to Wellsky QA Hospital 1.
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);

    //Creating a object to ApplicationNavigator class
    const Appnav = new ApplicationNavigator(page1);
    const lib1 = new LIB(page1);

    //Step 2- Create patient and admission
    await lib1.createptandadm();
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

    await ManageContextNav.NavigateToCreateReferral();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ReferralFacesheet.createReferral('AUTO CM Referral');
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ManageContextNav.NavigateToChooseRecipients();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    let startIndex = QAProvider3.length - 15;

    await ChooseRecipients.choose1Recipient(QAProvider3.substring(startIndex));
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

    await SendReferral.unMaskAllPatientInfo();
    await SendReferral.clickSendReferralButton();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(4000);

    await ReferralConfirmation.validateConfirmationText('has been posted by automation');
    var referralId = await ReferralConfirmation.getReferralId();
    await ReferralConfirmation.ClickContinue();

    //Step 4 - From the left Nav bar click on Discharge Planning link
    await ManageContextNav.NavigateToDischargePlanning();

    //Step 5 - 1. Click on the Placements tab 
    // 2. Click on the Recipient dropdown for the Referral ID which has been used in the workflow  and select QA Provider #1 as the placement provider
    // 3. Click on the [edit] link for Selection Factor.
    // 4. Choose one or more selection factors from the available list.
    // 5. Add placement notes 

    // Click on Save button
    const DischargePlanning = new DischargePlanningPage(page1);

    await page1.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]').first().click(); 
    await page1.getByText(QAProvider3).click();
    // await DischargePlanning.SelectPlacement(1, QAProvider1);
    await DischargePlanning.ClickApply();

    //Step 6 - Verify the fax generated email (Fax generated for QA Provider #4 & QA Provider #8
    //Step 7 - From the left Nav bar click on Discharge Planning link
    //Step 8 - 1. Click on the Placements tab 
    // 2. Click on the Recipient dropdown for the Referral ID which has been used in the workflow and select QA Provider #4 as the placement provider
    // 3. Click on the [edit] link for Selection Factor.
    // 4. Choose one or more selection factors from the available list.
    // 5. Add placement notes 

    // Click on Save button
    await page1.locator('//acm-dropdown[@id="placement"]//div[contains(@class,"ui-dropdown-trigger")]//span[contains(@class,"ui-dropdown-trigger-icon")]').first().click(); 
    await page1.getByText(QAOfflineProv1).first().click();
    //await DischargePlanning.SelectPlacement(1, QAOfflineProv1);

    // await DischargePlanning.ClickSelectionFactorLink(1);
    // await DischargePlanning.SelectSelectionFactor(2);
    await DischargePlanning.ClickNoteLink(0);
    await DischargePlanning.AddNote('Test Note 2');
    await DischargePlanning.ClickApply();
    
    await Appnav.NavigateToChangeOrg(QAProvider3);

    //Step 9 - Verify the Email generated notification for QA Provider #1
    const filePath = 'NotificationDetails.txt';
    var content = 'NEW Referral ' + referralId +' for '+ QAProvider1 +' from '+ Hospital1 +'|Referral ' + referralId +' from '+ Hospital1 +' was placed elsewhere.|Referral ' + referralId +' from '+ Hospital1 +' was placed with you.|CarePort Care Management Alert';
    await fs.writeFile(filePath, content, 'utf8');

});
