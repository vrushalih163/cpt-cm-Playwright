// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoicePage';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';

const { user, password, QAProvider1} = process.env

test('102794_Validating the workflow of sharing a referral via direct method of share in Transition', async ({ }) => {

    test.setTimeout(10 * 60 * 1000);//5mins in milliseconds

    //Step 1 - Login to the EPIC FHIR Application and click on 'Create Referral' card
    //Creating an Object to LIB class
    const Library = new LIB();
    await Library.CreateNewAdmissionForTransPatient('E3350','6572');

    //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
    const newPage = await Library.HandleAppLaunch('Optime, Omar', 'E3350', 'Manage Referrals');

    const ManageRef = new ManageReferral(newPage);
    const ProviderSearch = new ProviderSearchPage(newPage);
    const TransContextNav = new TransitionContextNavigator(newPage);
    

    //Step 2 - Select the radio button option for any Referral Type configured for patient choice in the modal

    await ManageRef.CreateNewReferral('PatientChoice');

    //Step 3 - Click on (X) close
    //Step 4 - Again, click on Create Referral card on Manage Referral page
    //Step 5 - Select the radio button option for any Referral Type (Home Care Referral Type) in the modal
    //Step 6 - Click on 'Create Referral'
    //this scenario is automated in another test case

    //Step 7 - Click on Search Providers then Select a provider from those listed on the page by checking the checkboxes next to the provider. Click on 'Add to Choice'
    //for automation - if a provider is already present, remove it
    await newPage.waitForTimeout(5000);
    //await ProviderSearch.ClickRemoveProviderMenuItem();
    await ProviderSearch.ClickSearchProviderButton();
    await ProviderSearch.SearchProviderAndAddToCart1(QAProvider1);

    //Step 8 - Click the button 'Clear Providers'
    await ProviderSearch.ClickClearProviders_PCButton();

    //Step 9 - Click on 'Add Providers' displayed on the cart
    await ProviderSearch.ClickSearchProviderButton();

    //Step 10 - Add the same provider to the cart again and click on the 'Add to Referral' button
    await ProviderSearch.SearchProviderAndAddToCart(QAProvider1);
    await ProviderSearch.ClickAddToReferral_PCButton();

    //Step 11 - Choose a reason by selecting the corresponding radio button and click 'Select'
    await ProviderSearch.ClickChoiceReason_PCButton();

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
    const ViewOnlineReferral = new ViewOnlineReferralPage(page3);
    await ViewOnlineReferral.selectResponse('Yes, willing to accept patient');
    await ViewOnlineReferral.SetComment('Test Comment 1');
    await ViewOnlineReferral.clickSendResponse();
    await page3.waitForLoadState('domcontentloaded');
    await page3.waitForTimeout(2000);
    await AppNav.LogOff();
    await page2.close();

    //Step 19 - Login to Transition and click on the same referral card
    const page5 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

    const ManageRef1 = new ManageReferral(page5);
    await ManageRef1.ClickFirstReferral();

    //Step 20 - Observe that the response sent from the provider's side is displayed
    //Step 21 - Observe that the date displayed is in correct format
    //Step 22 - Observe that the time zone is synchronized with the user's organization's time zone.
    //await ProviderSearch1.Validate_First_row_Provider('central', '12hr', '1', QAProvider1, 'Test Agana Heights, GU 96910', 'Yes, willing to accept patient', 'Test Comment 1');
    await page5.close();

    //Step 23 - Login back to CM and navigate to the page for viewing the received referral. Change the response, add a reason and a comment to the referral and send it back
    const page4 = await browser.newPage();

    const Login1 = new LoginPage(page4);
    const page6 = await Login1.login(user, password);

    const AppNav1 = new ApplicationNavigator(page6);
    const IncomingReferralsEnhancedView1 = new IncomingReferralsEnhancedViewPage(page6);
    const ViewOnlineReferral1 = new ViewOnlineReferralPage(page6);
    await AppNav1.NavigateToChangeOrg(QAProvider1)
    await AppNav1.NavigateToIncomingReferralsEnhancedView();
    await IncomingReferralsEnhancedView1.searchReferralId(referralId);
    await page6.waitForLoadState('domcontentloaded');
    await page6.waitForTimeout(2000);
    await IncomingReferralsEnhancedView1.navigateActionDDBox('View Online Referral');
    await page6.waitForLoadState('domcontentloaded');
    await page6.waitForTimeout(2000);
    await ViewOnlineReferral1.selectResponse('Referral Received');
    await ViewOnlineReferral1.SetComment('Test Comment 2');
    await ViewOnlineReferral1.clickSendResponse();
    await page6.waitForLoadState('domcontentloaded');
    await page6.waitForTimeout(2000);
    await AppNav1.LogOff();
    await page4.close();

    //Step 24 - Observe that the response sent from the provider's side is displayed
    //Step 25 - Observe that the recently sent referral is listed at top of the list and the 'share method' column shows the entry as 'Direct'
    //Step 26 - Observe the 'Date of Sharing' and '# Providers' columns
    const page7 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

    const ProviderSearch2 = new ProviderSearchPage(page7);
    const TransContextNav2 = new TransitionContextNavigator(page7);
    const SharedChoice1 = new SharedChoice(page7);

    //await ProviderSearch2.Validate_First_row_Provider('central', '12hr', '1', QAProvider1, 'Test Agana Heights, GU 96910', 'Referral Received', 'Test Comment 2');

    //Step 27 - Click on the 'Action' icon corresponding to the referral an choose \"Print\"
    await TransContextNav2.ClickSharedChoiceTab();
    await SharedChoice1.EllipseIconClick();
    await SharedChoice1.Print();

    //Step 28 - Populate the mandatory fields in the pop up with valid data and click the \"Print\" button. Click print again on the print driver that appears for enabling the print
    await SharedChoice1.PopulatePrintPopup('Testreason', 'Test@gmail.com', '4256754325');

    //Step 29 - Observe the printed referral for its contents
    //Step 30 - Click on \"Go back to Transition\" button on the print page
    //Step 31 - Observe that a new share gets listed above the  referral shared via direct method previously
    //Step 32 - Observe the 'Share Method' column
    //Step 33 - Observe the \"Date of Sharing\" and \"# Providers\" columns

    //Step 34 - Create another referral by following the steps mentioned above and add 5 providers to it from the provider search page
    //adding 5 providers scenario cannot be automated because from automation prespective we will run out of providers for the referral
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