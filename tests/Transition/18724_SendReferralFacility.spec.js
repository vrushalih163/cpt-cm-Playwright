// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { FormsPage } from '../../pages/Transition_Pages/FormsPage';
import { SendPage } from '../../pages/Transition_Pages/SendPage';
import { AttachmentsPage } from '../../pages/Transition_Pages/AttachmentsPage';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';

const { user, password, QAProvider1, QAProvider2, TransitionlaunchUrl } = process.env

test('98513_To verify the Send Referral page behavior for New Referral when providers are selected', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Step 1 - Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
  //Creating an Object to LIB class
  const Library = new LIB();

  //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
  const newPage = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals', TransitionlaunchUrl);

  const ManageRef = new ManageReferral(newPage);
  const ProviderSearch = new ProviderSearchPage(newPage);
  const TransContextNav = new TransitionContextNavigator(newPage);
  const Forms = new FormsPage(newPage);
  const Attachments = new AttachmentsPage(newPage);
  const Send = new SendPage(newPage);

  //Step 2 - Click on Create Referral card
  //Step 3 - Choose the required referral type and click on 'Create Referral' button
  await ManageRef.CreateNewReferral('ATAutomation');

  //Step 4 - Click on Search Providers
  await ProviderSearch.ClickSearchProviderButton();

  //Step 5 - Enter the zipcode 96912 and Click on Refresh
  let startIndex = QAProvider1.length - 15;
  await ProviderSearch.SearchProvider(QAProvider1.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);
  
  //Step 6 - Without selecting the Providers, click on the Manage referrals breadcrumb
  //Scenario covered in TC 95685
  await ProviderSearch.ClickProviderCheckBox(0);

  //Step 7 - Click on Forms tab, add forms
  await TransContextNav.ClickFormsTab();
  await Forms.SelectAForm('1823 - Medicaid');
  await TransContextNav.ValidateSendReferralButtonDisabled();

  //Step 8 - Click on Attachments tab
  await TransContextNav.ClickAttachmentsTab();

  //Step 9 - Click on Add Attachment and attach the required document
  await Attachments.ClickAddAttachmentButton();
  await Attachments.UploadFile('C:\\Temp\\111.txt');
  await Attachments.SelectAttachment();

  await TransContextNav.ValidateSendReferralButtonDisabled();

  //Step 10 - Click on Information tab, enter the Projected discharge date and Primary diagnosis, Click on Send tab
  await TransContextNav.ClickSendTab();

  //Step 11 - Verify the Providers and Send Referral button 
  await TransContextNav.ValidateSendReferralButtonDisabled();
  await Send.ValidateProviderSelectedLabel('0 Providers are Selected')

  //Step 12 - Click on Providers tab
  await TransContextNav.ClickProvidersTab();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 13 - Click on Search Providers
  await TransContextNav.ClickProviderSearchIcon();
  startIndex = QAProvider2.length - 15;

  //Step 14 - Enter the zipcode 96912 and Click on Refresh
  //Step 15 - Select the checkboxes present against each of the providers and click on Add to Referral button
  await ProviderSearch.SearchProvider(QAProvider2.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 16 - Select the checkboxes present against the following and click on Send tab: QA Provider 1 QA Provider 2
  await ProviderSearch.ClickProviderCheckBox(1);
  await TransContextNav.ClickSendReferralButton();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //extract referral ID for automation
 
  var referralId = await ManageRef.GetFirstReferralID();

  //Step 17 - Verify the Providers
  //Step 18 - Select the QA Provider 8 in the Send tab
  //Step 19 - Click on Providers tab and verify QA Provider 8 checkbox
  //Step 20 - Unselect all the Providers  in the Providers tab and Verify the Send Referral button navigating through all tabs
  //Step 21 - Click on Providers tab, select the checkbox against QA provider 1 and click on Send tab
  //Step 22 - Click on Send Referral button
  //covered these scenarios in the above steps

  //step 23 - Login to CM application as QA Provider 1
  await newPage.close();
  const browser = await chromium.launch();
  const page2 = await browser.newPage();

  const Login = new LoginPage(page2);
  const page3 = await Login.login(user, password);

  const AppNav = new ApplicationNavigator(page3);
  await AppNav.NavigateToChangeOrg(QAProvider1)

  //Step 24 - Navigate to Manage>Incoming referrals enhanced
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page3);

  //Step 25 - Enter  the referral ID created in the  Step 2
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  //Step 26 - Choose View online referral and click on Go
  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  //Step 27 - Verify the Forms, Attachments, referral data
  //Step 28 - Login to CM application as QA Provider 2
  await AppNav.NavigateToChangeOrg(QAProvider2)

  //Step 29 - Navigate to Manage>Incoming referrals enhanced
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  //Step 30 - Enter  the referral ID created in the  Step 2
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);
  //await IncomingReferralsEnhancedView.ValidateNoRecordsLabel();
  await AppNav.LogOff();
  await page2.close();

  //Step 31 - Navigate back to  the Transition application
  const page5 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals', TransitionlaunchUrl);

  const ManageRef1 = new ManageReferral(page5);
  const ProviderSearch1 = new ProviderSearchPage(page5);
  const TransContextNav1 = new TransitionContextNavigator(page5);
  const Forms1 = new FormsPage(page5);
  const Attachments1 = new AttachmentsPage(page5);
  const Send1 = new SendPage(page5);
  

  //Step 32 - Click on the referral created
  await ManageRef1.ClickFirstReferral();

  //Step 33 - Click on Forms, unselect the checkbox under Send against a form which was sent already and navigate to Attachments tab
  await TransContextNav1.ClickFormsTab();
  await newPage.pause();
  await Forms1.ClickFormsCheckbox(1);

  //Step 34 - Add a new attachment
  await TransContextNav1.ClickAttachmentsTab();
  await Attachments1.ClickAttachmentCheckBox(1);

  //Step 35 - Click on Send checkbox present against the attachment
  await Attachments1.ClickAttachmentCheckBox(2);
  
  //Step 36 - Click on Send
  await TransContextNav1.ClickSendTab();

  //Step 37 - Select the checkbox present against QA Provider 1
  await Send1.SelectProvider(1);

  //step 38 - Click on Send Referral button
  await TransContextNav1.ClickSendReferralButton();

  //step 39 - Login to CM application as QA Provider 1
  const page4 = await browser.newPage();

  const Login1 = new LoginPage(page4);
  const page6 = await Login1.login(user, password);

  const AppNav1 = new ApplicationNavigator(page6);
  const IncomingReferralsEnhancedView1 = new IncomingReferralsEnhancedViewPage(page6);
  await AppNav1.NavigateToChangeOrg(QAProvider1)

  //step 40 - Navigate to Manage>Incoming referrals enhanced
  await AppNav1.NavigateToIncomingReferralsEnhancedView();

  //step 41 - Enter  the referral ID created in the  Step 2
  await IncomingReferralsEnhancedView1.searchReferralId(referralId);
  await page6.waitForLoadState('domcontentloaded');
  await page6.waitForTimeout(2000);

  //Step 42 - Choose View online referral and click on Go
  await IncomingReferralsEnhancedView1.navigateActionDDBox('View Online Referral');
  await page6.waitForLoadState('domcontentloaded');
  await page6.waitForTimeout(2000);

  //Step 43 - Verify the Forms, Attachments, referral data
  
});