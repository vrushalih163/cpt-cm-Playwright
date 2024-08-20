// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';

import { LIB } from '../../bizLibs/lib';

test('Manage Referrals - Create Referral', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  const Library = new LIB();

  //Step 1: Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
  //getting persistant context
  var library = Library.DataDirectory();
  const userpath = ((await library).toString());
  const browser = await chromium.launchPersistentContext(userpath);
  const pages = browser.pages();
  const page = pages[0];

  //EPIC Oauth popup details fill up and logging into Transition
  library = new LIB(page);
  const page1 = await library.TransitionLogin('Clin Doc, Henry');

  const ManageRef = new ManageReferral(page1);
  const TransContextNav = new TransitionContextNavigator(page1);

  //Step 2: Validate all the previously created Referrals were representing as cards on Manage Referrals page
  ManageRef.ValidateFirstReferralCardExists();

  //Step 3: Validate the Referral information on the Cards
  ManageRef.ValidateFirstReferralStatus('Not Sent');

  //Step 4: Validate the status of each card on the Manage Referrals page
  //Step 5: Validate that user can see the information - For how many providers the Referral sent and how many has been responded and see count of communications/responses on the Referral card as 'How many of total providers Responded' and # Messages
  //Step 6: Validate the color of the text for # Messages
  //Step 7: Validate that user can close the Referral from Manage Referrals page by clicking on the toggle
  ManageRef.ToggleFirstReferralStatus();
  
  ManageRef.ValidateFirstReferralStatus('Closed');
  
  //Step 8: Click the toggle for closing the Transportation Referral and validate the status on the card and #Messages
  //Step 9: Validate that Notifications has been triggered while closing the Transportation Referral through Manage Referrals page

  //Step 10: Validate that user can Edit the Referral through Manage Referrals page
  ManageRef.ClickFirstReferral();

  //Step 11: Click on the breadcrumb/page path and validate user can navigate to Manage Referrals page
  await TransContextNav.ClickManageReferralBreadCrumb();
  await ManageRef.ValidateFirstReferralCardExists();

});