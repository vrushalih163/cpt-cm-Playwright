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
import { ForwardReferralPage } from '../../pages/ForwardReferralPage_1061';

const {QAProvider1,user, password, QAOfflineProv1, QAOfflineProv2} = process.env
test('Verify the user is able to forward referral from the referral centre to the selected providers successfully', async ({ page }) => {
  
  //Step -1: Launch ACM test URL
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  const lib1 = new LIB(page1);
  
  //Step 2- Navigate to Manage>Admissions>Admission default View
  //Step 3- Enter the account number and click on Search
  await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  const ReferralConfirmation = new ReferralConfirmationPage(page1);
  const ViewOnlineReferral = new ViewOnlineReferralPage(page1);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page1);
  const AppNav = new ApplicationNavigator(page1);
  const ReferralSummary = new ReferralSummaryPage(page1);

  const ReferralFacesheet = new ReferralFacesheetPage(page1);
  const ChooseRecipients = new ChooseRecipientsPage(page1);
  const SendReferral = new SendReferralPage(page1);
  const ManageContextNav = new ManageContextNavigator(page1);

  //Step 4- Choose 'Create Referral" and click on Go
  await ManageContextNav.NavigateToCreateReferral();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 5- Choose referral centre Referral type and click on Next until choose recipients page
  await ReferralFacesheet.createReferral('ATAutomation');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 6- Click on Next
  await ManageContextNav.NavigateToSendReferrals()
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(4000);

  //Step 7- Click on Send Referral
  await SendReferral.clickSendReferralButton();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(4000);

  await ReferralConfirmation.validateConfirmationText('has been posted by automation');

  var referralId = await ReferralConfirmation.getReferralId();

  //Step 8- Login to QA Provider #1
  await ReferralConfirmation.clickJumpToProvider();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 9- Navigate to 'Manage-Incoming Referral view > Incoming Referral view Enhanced'
  await AppNav.NavigateToIncomingReferralsEnhancedView();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  //Step 10- Choose 'View online referral' from the actions drop down menu and click on Go.
  //Step 11- Click on 'Forward' link in left nav bar under 'Online Referral'.
  await IncomingReferralsEnhancedView.navigateActionDDBox('Forward');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  
  //Step 12- Under LOOKUP RECEPIENT BY NAME: select GU as State and enter 'qa p' in Name field and click on Find.Check the checkboxes beside 'QA Provider #4' and QA Provider #8 then click on Next
  await ChooseRecipients.SearchProviderName(QAOfflineProv1)
  await ChooseRecipients.SelectProvider(1);
  await ChooseRecipients.ClickNext();
  
  await ChooseRecipients.SearchProviderName(QAOfflineProv2)
  await ChooseRecipients.SelectProvider(1);
  await ChooseRecipients.ClickNext();

  //Step 13- Check the checkboxes 'Unmask patient information','Send referral' if not checked.
  await ChooseRecipients.UnmaskPatientInformation(`1`);
  await ChooseRecipients.UnmaskPatientInformation(`2`);
  await ChooseRecipients.ClickNext();

  //Step 14- Click on 'Forward' link in left nav bar
  //Step 15- Click on 'Forward' button
  const ForwardReferral = new ForwardReferralPage(page1);
  await ForwardReferral.ClickForwardReferral();
  //Step 16- "Navigate to the ""Incoming Referrals View - Enhanced"" view and check the ""Initial Forward Date""."
  //Step 17- Verify the notifications

});
