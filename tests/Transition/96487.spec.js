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

const { user, password, QAProvider1, HSPProvider1, HSPProvider2 } = process.env

test('Validate user search for providers through Provider Search and bring them back to Transition', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Step 1 - Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
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

  //Step 2 - Click on Create Referral icon/button. Select 'Transportation' Referral from the list of Referral types and click on create Referral button on the modal
  
  await ManageRef.CreateNewReferral('ATAutomation');

  
  //Step 3 - Click on Provider Search icon on top of the screen and validate user gets navigate to Provider search screen
  await ProviderSearch.ClickSearchProviderButton();

  //Step 4 - Select a value from Languages spoken dropdown
  //Step 5 - Select the checkboxes for the providers the Referral needs to be sent from the search results and click on Add to Referral
  let startIndex = QAProvider1.length - 15;
  await ProviderSearch.SearchProvider(QAProvider1.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);
  
  //Step 6 - Click on Send Referral button at the bottom of the page
  await TransContextNav.ClickSendReferralButton();

  //Step 7 - Click on Create Referral icon. Select the HSP Referral Type(Hospice) from the list of Referral types on the modal and click on create Referral button
  await ManageRef.CreateNewReferral('ATAutoHSP');

  //Step 8 - Click on Provider Search icon on top of the screen and validate user gets navigate to Provider search screen
  await TransContextNav.ClickProviderSearchIcon();
  startIndex = HSPProvider1.length - 15;

  //Step 9 - Select a value from Services dropdown
  //Step 10 - Select the checkboxes for the providers the Referral needs to be sent from the search results and click on Add to Referral
  await ProviderSearch.SearchProvider(HSPProvider1.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 11 - Click on Send tab
  await TransContextNav.ClickSendTab();
  
  //STEP 12 - Click on Send Referral button
  await TransContextNav.ClickSendReferralButton();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 13 - Editing the Referral - Click on Hospice Referral card on Manage Referrals page
  await ManageRef.ClickFirstReferral();

  //Step 14 - Click on Provider search icon, navigate to Provider search screen and validate the filters/ search results
  await TransContextNav.ClickProviderSearchIcon();
  await newPage.waitForLoadState('domcontentloaded');

  //Step 15 - Select few more providers along with earlier selections and click on Add to Referral
  
  startIndex = HSPProvider2.length - 15;
  await ProviderSearch.SearchProvider(HSPProvider2.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);
  
  //Step 16 - Select the checkboxes for earlier providers and Click on Send Referral button
  await TransContextNav.ClickSendReferralButton();

  //Step 17 - Editing the Referral - Click on Hospice Referral card on Manage Referrals page
  await ManageRef.ClickFirstReferral();

  //Step 18 - Select one provider from the list and from the Actions – click on Place Referral
  await ProviderSearch.ClickAnchorMenu(0);
  await ProviderSearch.ClickPlaceReferralMenuItem();

  //Step 19 - Select the Provider Name from the dropdown and click on Place button on the modal
  await ProviderSearch.ClickPlaceButton();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 20 - Validate user cannot see Provider Search icon on top of the screen when Referral been placed with any provider
  await TransContextNav.ValidateProviderSearchIconNotExists();

  //Step 21 - Through breadcrumb, Navigate to Manage Referrals and validate the status of the Hospice Referral card.
  await TransContextNav.ClickManageReferralBreadCrumb();
  await ManageRef.ValidateFirstReferralStatus('Placed');

  //Step 22 - Turn the toggle for Hospice card to close and validate the status
  await ManageRef.ToggleFirstReferralStatus();
  await ManageRef.ValidateFirstReferralStatus('Closed');

  //Step 23 - Click on the Hospice card on Manage Referrals page
  await ManageRef.ClickFirstReferral();

  //Step 24 - Validate user cannot see Provider Search icon on top of the screen when Referral been place and closed with any provider
  await TransContextNav.ValidateProviderSearchIconNotExists();

  //Step 25 - Select the placed provider from the list and from the Actions – click on Unplace Referral
  await ProviderSearch.ClickAnchorMenu(0);
  await ProviderSearch.ClickUnplaceReferralMenuItem();

  //Step 26 - Click on Unplace button
  await ProviderSearch.ClickUnplaceButton();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 27 - Validate Provider search icon appears on the top of the screen
  await TransContextNav.ValidateProviderSearchIconExists();
  
  
});