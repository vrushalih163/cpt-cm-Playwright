// Author - Vrushali Honnatti Date: 20th August, 2024

import { test } from '@playwright/test';
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

const { user, password, QAProvider1, QAProvider2, QAProvider3 } = process.env

test('Validate user search for providers through Provider Search and bring them back to Transition', async ({ }) => {

    test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

    //Step 1 - Login to the EPIC FHIR Application and click on 'Create Referral' card
    //Creating an Object to LIB class
    const Library = new LIB();

    //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
    const newPage = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

    const ManageRef = new ManageReferral(newPage);
    const ProviderSearch = new ProviderSearchPage(newPage);
    const TransContextNav = new TransitionContextNavigator(newPage);
    const Forms = new FormsPage(newPage);
    const Attachments = new AttachmentsPage(newPage);
    const Send = new SendPage(newPage);

    //Step 2 - Select the radio button option for any Referral Type configured for patient choice in the modal

    await ManageRef.CreateNewReferral('PatientChoice');

    //Step 3 - Click on (X) close
    //Step 4 - Again, click on Create Referral card on Manage Referral page
    //Step 5 - Select the radio button option for any Referral Type (Home Care Referral Type) in the modal
    //Step 6 - Click on 'Create Referral'
    //this scenario is automated in another test case

    //Step 7 - Click on Search Providers then Select a provider from those listed on the page by checking the checkboxes next to the provider. Click on 'Add to Choice'
    await ProviderSearch.ClickSearchProviderButton();
  await ProviderSearch.AddProviderToCart("1");

    //Step 8 - Click the button 'Clear Providers'
    await ProviderSearch.ClickClearProviders_PCButton();

    //Step 9 - Click on 'Add Providers' displayed on the cart
    await ProviderSearch.ClickAddToReferral_PCButton();

    //Step 10 - Add the same provider to the cart again and click on the 'Add to Referral' button
    await ProviderSearch.AddProviderToCart("1");

    //Step 11 - Choose a reason by selecting the corresponding radio button and click 'Select'
    //this is not showing up

    //Step 12 - Observe that the user lands on referral summary page

    //Step 13 - Click on the 'Send Referral' button at the bottom right corner page
    await TransContextNav.ClickSendReferralButton();
    //extract referral ID for automation

  var referralId = await ManageRef.GetFirstReferralID();
  await ManageRef.ClickFirstReferral();

    //Step 14 - Click on the 'Shared Choice' tab
    await TransContextNav.ClickSharedChoiceTab();

    //additional steps
    await newPage.close();

    //Step 15 - Login to CM and view the referral by navigating to incoming referrals>incoming professional referrals page of the provider
  const browser = await chromium.launch();
  const page2 = await browser.newPage();

  const Login = new LoginPage(page2);
  const page3 = await Login.login(user, password);

  const AppNav = new ApplicationNavigator(page3);
  await AppNav.NavigateToChangeOrg(QAProvider1)
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page3);

    //Step 16 - Enter  the referral ID created in the  Step 6
    await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

    //Step 17 - Click the referral open and observe the details
    await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
    await page3.waitForLoadState('domcontentloaded');
    await page3.waitForTimeout(2000);

    //Step 18 - Choose a response from the dropdown and click on \"Send Response\"
    await ViewOnlineReferral.selectResponse('Yes, willing to accept patient');
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);
  await AppNav.LogOff();
 await page2.close();

    //Step 19 - Login to Transition and click on the same referral card
    const page5 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

    const ManageRef1 = new ManageReferral(page5);
  const ProviderSearch1 = new ProviderSearchPage(page5);
  const TransContextNav1 = new TransitionContextNavigator(page5);

  await ManageRef1.ClickFirstReferral();
    //Step 20 - Observe that the response sent from the provider's side is displayed
    

    //Step 21 - Observe that the date displayed is in correct format
    //Step 22 - Observe that the time zone is synchronized with the user's organization's time zone.

    await page5.close();

    //Step 23 - Login back to CM and navigate to the page for viewing the received referral. Change the response, add a reason and a comment to the referral and send it back
    const page4 = await browser.newPage();

  const Login1 = new LoginPage(page4);
  const page6 = await Login1.login(user, password);

  const AppNav1 = new ApplicationNavigator(page6);
  const IncomingReferralsEnhancedView1 = new IncomingReferralsEnhancedViewPage(page6);
  await AppNav1.NavigateToChangeOrg(QAProvider1)
  await AppNav1.NavigateToIncomingReferralsEnhancedView();
  await IncomingReferralsEnhancedView1.searchReferralId(referralId);
  await page6.waitForLoadState('domcontentloaded');
  await page6.waitForTimeout(2000);
  await IncomingReferralsEnhancedView1.navigateActionDDBox('View Online Referral');
  await page6.waitForLoadState('domcontentloaded');
  await page6.waitForTimeout(2000);
    await ViewOnlineReferral.selectResponse('No, unable to accept patient');
    await page6.waitForLoadState('domcontentloaded');
    await page6.waitForTimeout(2000);
    await AppNav1.LogOff();
    await page4.close();

    //Step 24 - Observe that the response sent from the provider's side is displayed
    //Step 25 - Observe that the recently sent referral is listed at top of the list and the 'share method' column shows the entry as 'Direct'
    //Step 26 - Observe the 'Date of Sharing' and '# Providers' columns

    //Step 27 - Click on the 'Action' icon corresponding to the referral an choose \"Print\"
    
    //Step 28 - Populate the mandatory fields in the pop up with valid data and click the \"Print\" button. Click print again on the print driver that appears for enabling the print
    //Step 29 - Observe the printed referral for its contents
    //Step 30 - Click on \"Go back to Transition\" button on the print page
    //Step 31 - Observe that a new share gets listed above the  referral shared via direct method previously
    //Step 32 - Observe the 'Share Method' column
    //Step 33 - Observe the \"Date of Sharing\" and \"# Providers\" columns
    //Step 34 - Create another referral by following the steps mentioned above and add 5 providers to it from the provider search page
    //Step 35 - Navigate to shared choice tab
    //Step 36 - Click on the 'Action' icon corresponding to the referral an choose \"Resend\"
    //Step 37 - Populate the mandatory fields in the pop up with valid data and click the \"Share\" button.
    //Step 38 - Check the email for incoming referral and click on the link to open the referral sent
    //Step 39 - Observe the referral
    //Step 40 - Navigate back to the shared choice tab
    //Step 41 - Observe that a new share gets listed above the  referral shared via direct method previously
    //Step 42 - Observe the 'Share Method' column
    //Step 43 - Observe the \"Date of Sharing\" and \"# Providers\" columns
//cannot be automated

});