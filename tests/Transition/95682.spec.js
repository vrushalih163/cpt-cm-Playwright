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
 const newPage = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

 // Land on the manage referral page in Transition
 await expect(newPage.getByText('Manage Referrals')).toBeVisible();

  const ManageRef = new ManageReferral(page1);
  const TransContextNav = new TransitionContextNavigator(page1);

  //Step 2: Click on Create Referral icon on the Manage Referrals page
  //Step 3: Validate the Referral Type values on the modal
  //Step 4: Validate the Referral Type dropdown showing the deleted Referral Types and Referral center configured one
  //Step 5: Enter the text/letter/number on Search for Referral Type and validate user can search the Referral Types on the modal. Search with a letter – a / A
  //Step 6: Select the radio button option for any Referral Type (Acute) in the modal

  await ManageRef.CreateReferralPopup('AT');

  //Step 7: Click on (X) close
  await ManageRef.CloseReferralPopup();

  //Step 8: Again, click on Create Referral card on Manage Referral page
  //Step 9: Select the radio button for Referral Type “Transportation”
  await ManageRef.CreateReferralPopup('Trans');

  //Step 10: Change the radio button selection to Referral Type “Acute “and validate user can select only one value each time
  await ManageRef.SearchReferral('Acute');

  //Step 11: Again, change the selection to Referral Type “Home care”
  await ManageRef.SearchReferral('ATAuto');
  await ManageRef.ClickCreateReferralButton();

  //Step 12: Click NO
  await ManageRef.ClickNoReferralConfirmation();

  //Step 13: Select the same radio button for “Home care” Referral type and Click on Yes
  await ManageRef.CreateNewReferral('ATAuto');

  //Step 14: Click on breadcrumb/page path for Manage Referrals
  await TransContextNav.ClickManageReferralBreadCrumb();
  await ManageRef.ValidateFirstReferralCardExists();
  
});