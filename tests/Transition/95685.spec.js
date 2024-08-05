// Author - Vrushali Honnatti Date:10th July, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';

import { LIB } from '../../bizLibs/lib';

test('Manage Referrals - Create Referral', async ({ }) => {

  test.setTimeout(10 * 60 * 1000);//5mins in milliseconds

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

  await ManageRef.CreateNewReferral('ATAuto');

  // await page1.getByText('add_circle_outline').click();
  // await page1.getByPlaceholder('Search...').click();


  // await page1.getByLabel('Search referral type').click();
  // await page1.keyboard.type('ATAuto', { delay: 250 });
  // await page1.waitForTimeout(1000);

  // await page1.locator('.mat-radio-inner-circle').first().press('Enter');
  // await page1.pause();
  // await page1.locator('#btnCreatReferral').click();
  // await page1.waitForTimeout(1000);
  // await page1.getByRole('button', { name: 'Yes' }).click();
  // await page1.waitForLoadState('domcontentloaded');
  // await page1.waitForTimeout(2000);



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