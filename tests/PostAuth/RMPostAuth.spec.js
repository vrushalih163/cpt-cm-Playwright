// Author - Vrushali Honnatti Date:10th July, 2024
const { QAProvider1, QAProvider2, user, password } = process.env
import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ReferralConfirmationPage } from '../../pages/referralConfirmationPage_188';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ReferralSummaryPage } from '../../pages/referralSummaryPage_154';
import { ReferralFacesheetPage } from '../../pages/referralfacesheetpage_145';
import { ChooseRecipientsPage } from '../../pages/chooseRecipientspage_1446';
import { SendReferralPage } from '../../pages/sendReferralPage_176';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { RmPostauthSummaryPage } from '../../pages/rmPostauthSummaryPage_1463';
import { LoginPage } from '../../pages/PageLogin_111';

let referralId;

test('Create RM Post Auth', async ({ page }) => {
  
  //Step -1: Login to the app
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  const lib1 = new LIB(page1);
  
  //Step 2- Create patient and admission
  await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  page = await lib1.createFinancial('AUTOTST')
  await page1.waitForTimeout(2000);

  const ReferralConfirmation = new ReferralConfirmationPage(page1);
  const AppNav = new ApplicationNavigator(page1);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page1);

  const RmPostauthSummary = new RmPostauthSummaryPage(page1);

  const ReferralFacesheet = new ReferralFacesheetPage(page1);
  const ChooseRecipients = new ChooseRecipientsPage(page1);
  const SendReferral = new SendReferralPage(page1);
  const ManageContextNav = new ManageContextNavigator(page1);

  await ManageContextNav.NavigateToCreateReferral();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await ReferralFacesheet.createReferral('Post Auth Referral');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await ManageContextNav.NavigateToChooseRecipients();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  let startIndex = QAProvider1.length -15;

  await ChooseRecipients.choose1Recipient(QAProvider1.substring(startIndex));
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
  referralId = await ReferralConfirmation.getReferralId();

  await ReferralConfirmation.clickJumpToProvider();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await AppNav.NavigateToIncomingReferralsEnhancedView();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await IncomingReferralsEnhancedView.navigateActionDDBox('Post-Acute Authorization');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickRequestAuth();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickAddressBookButton();
  await RmPostauthSummary.searchAddressBook(QAProvider2);
  await RmPostauthSummary.selectAddressBook(QAProvider2);

  await RmPostauthSummary.selectLOC();

  await RmPostauthSummary.clickSendRequest();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickRecordCommunication();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.setPayorResponse('Cancelled');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.setPayorResponseReason('Member did not admit to PAC');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickSave();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickNotResponsibleForAuth();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.clickSave();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await RmPostauthSummary.ValidateDataSummaryPage('Exclusion for Post-Acute Authorization');
  await RmPostauthSummary.ValidateDataSummaryPage('Communication');
  await RmPostauthSummary.ValidateDataSummaryPage('Post-Acute Authorization Request');
  await RmPostauthSummary.ValidateDataSummaryPage('Status: Cancelled Comment: —');
  await RmPostauthSummary.ValidateDataSummaryPage('Payor Authorization Number : — Status: Cancelled Comment: —');
  await RmPostauthSummary.ValidateDataSummaryPage('Status: Waiting on Payor Comment: —');

});
