// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { AttachmentsPage } from '../../pages/Transition_Pages/AttachmentsPage';
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
  const Attachments = new AttachmentsPage(page1);

  //Step 2: Click on the Referral card (Transportation) on Manage Referrals page
  await ManageRef.ClickFirstReferral();

  //Step 3: Click on Attachments tab
  await TransContextNav.ClickAttachmentsTab();

  //For automation - upload a file
  await Attachments.ClickAddAttachmentButton();
  await Attachments.UploadFile('C:\\Temp\\111.txt');
  await Attachments.SelectAttachment();

  //Step 4: validate each Attachment appearing on the tab/page show the Date/Time along with Organization Time zone for Created on column
  //Step 5: Validate each Attachment appearing on the tab/page show the Created By details
  //Step 6: Validate the Send checkbox for all the 4 Attachments
  //Step 7: From Actions, click delete on one of the Attachments and validate user can delete existing Attachments
  //Step 8: Click cancel on the pop-up modal
  await Attachments.CancelDeleteAttachment();

  //Step 9: Click on delete and now select delete on the pop-up
  await Attachments.DeleteAttachment();
});