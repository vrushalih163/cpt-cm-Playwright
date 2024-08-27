//Author: Rajakumar Maste, Created Date: 13 August 2024
//Modified By: Rajakumar Maste, Modified Date: 16 August 2024
//Comment - Changed the variable name to MailslusrpEMailId and updated login flow with new login method

import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { SharedChoiceHomePage } from '../../pages/Transition_Pages/SharedChoiceHomePage';
import { SCProviderSearch } from '../../pages/Transition_Pages/SharedChoice_ProviderSeach';
import { Mailslurp } from '../../pages/Transition_Pages/Mailslurp';
const { MailSlurpEMailId } = process.env
const Providercount = 3;

test('Create Shared choice', async ({ }) => {
  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Creating an Object to LIB class
  const Library = new LIB();

  //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
  const newPage = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Patient Choice');

  await expect(newPage.getByText('Shared Choice')).toBeVisible();

  //Shared Choice Page details
  const SC = new SharedChoiceHomePage(newPage);

  //Click on create patient choice icon
  await SC.CreatePatientChoice_Click();

  //Select the level of care and click on Select button
  await SC.SelectLevelOfCare('Acute');

  //Shared Choice Provider Search Page details
  const SCPS = new SCProviderSearch(newPage);

  //Select the provider from the search result
  await SCPS.SelectProvider(Providercount);

  //Click on Add button to add the selected providers to the choice
  await SCPS.AddToChoice();

  // Selected providers details right side panel opened and verifying the heading
  await expect(newPage.getByRole('heading', { name: 'Patient Choice' })).toBeVisible();

  //Click on Text/Email button and enter the recipient email id and click on Share button 
  await SCPS.TextOREmail(MailSlurpEMailId);
  await newPage.waitForTimeout(10000);

  //Mailslurp class
  const mailcheck = new Mailslurp();

  //Open the email and click on the link present in the email body
  const Electronic_Page = await mailcheck.OpenTheLinkPresentInEMailBody('Post-Acute Options');

  await Electronic_Page.waitForTimeout(5000);
  await Electronic_Page.getByRole('button', { name: ' Add All  ' }).click();

  //
  mailcheck.CreateMailIdInMailslurp();

  await newPage.locator('#iconDashboardCustomize').click();


  // Click on Print button on the Shared Choice page and takes the screenshot of the printed page
  // await SCPS.PrintSharedChoice();

  // Click on Go to Transition button
  // await SCPS.GoToTransition();
});