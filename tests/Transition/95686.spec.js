// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';

import { LIB } from '../../bizLibs/lib';

test('Manage Referrals - Create Referral', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Creating an Object to LIB class
  const Library = new LIB();

  //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
  const page1 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

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