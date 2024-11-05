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
import { ReferralSummaryPage } from '../../pages/referralSummaryPage_154';
import { ReferralCommentsPage } from '../../pages/ReferralCommentsPage_212';
import { ReferralActivityDefaultViewPage  } from '../../pages/ReferralActivityDefaultViewPage_631';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { ResponseNotesPage } from '../../pages/ResponseNotesPage_213';

const fs = require('fs').promises;

const { user, user2, password, QAProvider1, Hospital1, QAOfflineProv1, QAOfflineProv2 } = process.env

test('To verify the notification is sent when referral is created updated closed and when hospital sends the response', async ({ page }) => {

  //Step -1: Launch ACM test URL
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  const lib1 = new LIB(page1);

  //Step 2- Navigate to Manage>Admissions>Admission default View
  //Step 3- Enter the account number and click on Search
  let result = await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  //Step 4 - Choose 'Create Referral" and click on Go
  const ReferralConfirmation = new ReferralConfirmationPage(page1);
  const ReferralFacesheet = new ReferralFacesheetPage(page1);
  const ChooseRecipients = new ChooseRecipientsPage(page1);
  const SendReferral = new SendReferralPage(page1);
  const ManageContextNav = new ManageContextNavigator(page1);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page1);
  const ReferralSummary = new ReferralSummaryPage(page1);
  const ReferralComments = new ReferralCommentsPage(page1);
  const AppNav = new ApplicationNavigator(page1);
  const ViewOnlineReferral = new ViewOnlineReferralPage(page1);

  await ManageContextNav.NavigateToCreateReferral();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 5 - Choose Referral type and click on Next until choose recipients page
  await ReferralFacesheet.createReferral('ATAutomation5');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await ManageContextNav.NavigateToChooseRecipients();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 6 - Create a referral by selecting the same referral type as created in precondition  and send the referral to below provider (as configured in precondition)
  // Online provider : QA Provider #1
  // Offline  provider (web )  :  QA Provider #4 (use 9198006418 as the fax number)
  // Offline  provider (Summary  )  :  QA Provider #8 (use 9198006418 as the fax number)
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

  // Step 7 - Click on Delivery link
  // "Enter the QE's corporate eFax number into the ""Fax Number to Use"" field."
  // "For the ""Fax Number Change is"" field
  // "Enter text into the ""Reason for Fax Number Change"" field."
  // Click the Save button.
  // Step 8 - Click the OK button.
  //did not implement the above steps as they need not be automated as it is a one time setting as part of test data setup

  //step 9 - "Set the ""Unmask Patient Information"" flag to ""True"" for all three recipients."
  await SendReferral.unMaskAllPatientInfo();

  //Step 10 - Navigate to the final step in the RCT (i.e. Send Referral).
  await SendReferral.clickSendReferralButton();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(4000);

  await ReferralConfirmation.validateConfirmationText('has been posted by automation');
  var referralId = await ReferralConfirmation.getReferralId();
  await ReferralConfirmation.ClickContinue();
  await ManageContextNav.GetAUTReferralLink();

  //Step 11 - Scan the contact listing and confirm the Anticipated Contact and Anticipated Delivery Methods for the three facility providers.
  //Step 12 - Open the email notification and read the contents.
  //Step 13 - Open the pager notification and read the contents.
  //Step 14 - After the faxed-based notifications arrive via Microsoft Outlook
  //Step 15 - Open the .pdf files in both emails and read the contents.

  //Step 16 - In the left nav bar, click on the referral created
  //Step 17 - Click on the "Waiting for You" link and Verify that the Notify Recipient checkbox is set to True.
  await ReferralSummary.clickWaitingForYouLink(2);

  //Step 18 - Set "Send Updated Referral Information" to True.
  await ReferralComments.clickSendReferralCheck();

  //Step 19 - "Enter comments into the ""Your Comments to Recipient"" checkbox."
  await ReferralComments.enterReferralComments('test');

  //Step 20 - Click the "Send Response" button."
  await ReferralComments.clickSendReferralButton();

  //Step 21 - Verify the notifications received
  //Step 22 - Open the email notification and verify the contents.
  //Step 23 - Open the pager notification and read the contents.
  //Step 24 - In the left nav bar, click on the referral created
  //Step 25 - Click on the "Waiting for You" link and Verify that the Notify Recipient checkbox is set to True.
  await ReferralSummary.clickWaitingForYouLink(2);
  await ReferralComments.ValidateNotifyChecked(true);

  //Step 26 - Set "Send Updated Referral Information" to True.
  await ReferralComments.clickSendReferralCheck();

  //Step 27 - "Enter comments into the ""Your Comments to Recipient"" checkbox."
  await ReferralComments.enterReferralComments('test 2');

  //Step 28 - Click the "Send Response" button."
  await ReferralComments.clickSendReferralButton();

  //Step 29 - Verify the notifications received
  //Step 30 - Open the email notification and verify the contents.
  //Step 31 - Open the pager notification and read the contents.
  //Step 32 - Change Org to QA Provider #1

  await AppNav.NavigateToChangeOrg(QAProvider1);
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  //Step 33 - Navigate to Manage>Incoming enhanced view, enter the referral ID and search
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  //Step 34 - Choose View Online Referral and click on Go
  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 35 - Choose the Response as "Yes Willing to accept" Enter "Use the "Date/Time Provider Can Take Patient" field to enter a date and time. The date and time should not precede the date that the referral was sent."
  await ViewOnlineReferral.selectResponse('Yes, willing to accept patient');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  //Step 36 - Enter some comments into the Comments field.
  //Step 37 - Click the "Send Response" button.
  await ViewOnlineReferral.clickSendResponse();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(4000);

  await AppNav.LogOff();
  await page1.close();

  //Step 38 - Verify the notifications received
  //Step 39 - Open the email notification andverify
  //Step 40 - Open the pager notification and verify
  //Step 41 - Log into the test hospital using the second test user (from General Preconditions).
  const page2 = await Login.login(user2, password);

  const ReferralConfirmation1 = new ReferralConfirmationPage(page2);
  const ReferralFacesheet1 = new ReferralFacesheetPage(page2);
  const ChooseRecipients1 = new ChooseRecipientsPage(page2);
  const SendReferral1 = new SendReferralPage(page2);
  const DischargePlanning1 = new DischargePlanningPage(page2);
  const ReferralSummary1 = new ReferralSummaryPage(page2);
  const ReferralComments1 = new ReferralCommentsPage(page2);
  const AppNav1 = new ApplicationNavigator(page2);
  const ReferralActivityDefaultView1 = new ReferralActivityDefaultViewPage(page2);
  const ResponseNotes = new ResponseNotesPage(page2);

  //Step 42 - Use the Referral Activity Default View to locate the Summary Referral that was sent to the facility provider (non-subscriber).
  await AppNav1.NavigateToReferralActivityDefaultViewPage();

  //Step 43 - "From the Action dropdown select "Log a Response" and click the GO button."
  await ReferralActivityDefaultView1.searchReferralId(referralId);
  await ReferralActivityDefaultView1.navigateActionDDBox('Log a Response');

  //Step 44 - Verify that the "Notify Contacts" checkbox is enabled and checked.
  await ReferralComments1.ValidateNotifyChecked(true);

  //Step 45 - Enter a value for the ""Caller Name"" field.
  await ResponseNotes.SetCallerName('Test Automation');
  
  //Step 46 - "Choose the following response for the ""How did this recipient reply"" field: Interested but need more information" Enter some comments into the Comments field. Click the Save button.
  await ResponseNotes.ClickInterestedResponse();
  await ResponseNotes.SetComments('Test Comments');
  await ResponseNotes.ClickSave();
  
  //Step 47 - Verify the notifications received
  //Step 48 - Open the email notification and verify
  //Step 49 - Open the pager notification and verify

  //Steps 50 to 69 are not implemented as they cannot be automated
  //Step 50 - Open the attachment and locate the Referral ID and Access Code.
  //Step 51 - "On the Care Management login page
  //Step 52 - "Enter the Referral ID and the Access Code and and then click the ""View Referral"" button."
  //Step 53 - "Enter a value into the ""Your Name"" field."
  //Step 54 - "Choose the following value from the ""Response"" dropdown: No unable to accept patient" Select any value from the ""Reason (if Response is "No") field. Enter some comments into the Comments field. Click the Send Response button.
  //Step 55 - Go to the applicable network location to search for the email and pager notifications.
  //Step 56 - Open the email notification and verify
  //Step 57 - Open the pager notification and verify
  //Step 58 - Click the Exit Referral button.
  //Step 59 - "From the left nav bar, click on "Discharge Planning"
  //Step 60 - Expand the Placements accordion.
  //Step 61 - Click on the Recipient dropdown for the Referral ID which has been used in the workflow so far.
  //Step 62 - Choose None
  //Step 63 - Toggle the Close
  //Step 64 - Click on Save button
  //Step 65 - Go to the applicable network location to search for the email and pager notifications.
  //Step 66 - Open the email notification and read the contents.
  //Step 67 - Open the pager notification and read the contents.
  //Step 68 - After the faxed-based notifications arrive via Microsoft Outlook, open them and read the contents.
  //Step 69 - Open the .pdf files in both emails and read the contents.


  //Step 11 - Verify the Email generated notification for QA Provider #1
  const filePath = 'NotificationDetails.txt';
  const content = 'NEW Referral ' + referralId + ' for ' + QAProvider1 + ' from ' + Hospital1 + '|Referral ' + referralId + ' from ' + Hospital1 + ' was placed elsewhere.|Referral ' + referralId + ' from ' + Hospital1 + ' was placed with you.|CarePort Care Management Alert';
  await fs.writeFile(filePath, content, 'utf8');
});
