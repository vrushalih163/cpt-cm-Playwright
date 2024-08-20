// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { AttachmentsPage } from '../../pages/Transition_Pages/AttachmentsPage';
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