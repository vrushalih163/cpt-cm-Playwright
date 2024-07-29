// Author - Vrushali Honnatti Date:10th July, 2024
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
import { LoginPage } from '../../pages/PageLogin_111';

const {QAProvider1,user, password} = process.env
test('Create Referral', async ({ page }) => {
  
  //Step -1: Login to the app 
  const Login = new LoginPage(page);
  await Login.login(user, password);

  const lib1 = new LIB(page);
  
  //Step 2- Create patient and admission
  await lib1.createptandadm();
  await page.waitForTimeout(2000);

  // page = await lib1.createFinancial('AUTOTST')
  // await page.waitForTimeout(2000);
  //page = await lib1.createReferral('AUTO CM Referral', 'Allscripts Provider Online (226537)');

  const ReferralConfirmation = new ReferralConfirmationPage(page);
  const ViewOnlineReferral = new ViewOnlineReferralPage(page);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page);
  const AppNav = new ApplicationNavigator(page);
  const ReferralSummary = new ReferralSummaryPage(page);

  const ReferralFacesheet = new ReferralFacesheetPage(page);
  const ChooseRecipients = new ChooseRecipientsPage(page);
  const SendReferral = new SendReferralPage(page);
  const ManageContextNav = new ManageContextNavigator(page);

  await ManageContextNav.NavigateToCreateReferral();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await ReferralFacesheet.createReferral('AUTO CM Referral');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await ManageContextNav.NavigateToChooseRecipients();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  let startIndex = QAProvider1.length -15;

  await ChooseRecipients.choose1Recipient(QAProvider1.substring(startIndex));
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);


  await ManageContextNav.NavigateToSendReferrals()
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(4000);

  //await page.pause();
  //await page.locator('xpath=//tr[@id="ApiGridSelectedRecipients-data-row-entity-index-0"]//td[5]//a//i').click();
  //await page.getByRole('link', { name: '' }).click()

  await SendReferral.unMaskAllPatientInfo();
  await SendReferral.clickSendReferralButton();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(4000);

  await ReferralConfirmation.validateConfirmationText('has been posted by automation');

  referralId = await ReferralConfirmation.getReferralId();

  await ReferralConfirmation.clickJumpToProvider();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await AppNav.NavigateToIncomingReferralsEnhancedView();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await ViewOnlineReferral.selectResponse('Yes, willing to accept patient');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await ViewOnlineReferral.clickSendResponse();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(4000);

  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await ViewOnlineReferral.clickJumpToReferralSource()
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  await ReferralSummary.validateLastResponse_row1('Yes, willing to accept patient')
});
