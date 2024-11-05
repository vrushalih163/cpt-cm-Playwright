// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';

import { LIB } from '../../bizLibs/lib';

test('95685_Manage Referrals - Referral Type Cards', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Creating an Object to LIB class
  const Library = new LIB();

  //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
  const page1 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

  const ManageRef = new ManageReferral(page1);
  const TransContextNav = new TransitionContextNavigator(page1);

  //Step 2: Validate all the previously created Referrals were representing as cards on Manage Referrals page

  await ManageRef.CreateNewReferral('ATAuto');

  //Step 3: Validate the order of the Cards
  //Step 4: Validate the status of each card on the Manage Referrals page
  await ManageRef.ValidateFirstReferralStatus('Not Sent')
  await TransContextNav.ClickManageReferralBreadCrumb();

  //Step 5: Validate that user can Edit the Referral on Manage Referrals page
  await ManageRef.ClickFirstReferral();

  //Step 6: Click on the breadcrumb/page path for Manage Referral page
  await TransContextNav.ClickManageReferralBreadCrumb();
  await ManageRef.ValidateFirstReferralCardExists();

  //Step 7: Validate that user can open/close the Referral on Manage Referrals page
  await ManageRef.ToggleFirstReferralStatus()
  await ManageRef.ValidateFirstReferralStatus('Closed');

  await ManageRef.ToggleFirstReferralStatus()
  await ManageRef.ValidateFirstReferralStatus('Not Sent');

  //Step 8: Switch the Toggle to Open for “Home care” Referral card (current status: closed) and validate the behavior
  //Step 9: Switch the Toggle to close for “Hospice” Referral card (current status: placed) and validate the behavior
  //Step 10: Validate that user can delete the Referral on Manage Referrals page
  //Delete referrals feature is not there anymore
});