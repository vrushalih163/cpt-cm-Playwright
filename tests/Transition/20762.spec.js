//Author: Rajakumar Maste, Created Date: 13 August 2024

import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoice';
import { SCProviderSearch } from '../../pages/Transition_Pages/SharedChoice_ProviderSeach';
import { Mailslurp } from '../../pages/Transition_Pages/Mailslurp';
const { SharedChoiceRecepientUser } = process.env
const Providercount = 3;

test('Create Task', async ({ }) => {
  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  const Library = new LIB();

  //getting persistant context
  var library = Library.DataDirectory();
  const userpath = ((await library).toString());
  const browser = await chromium.launchPersistentContext(userpath);
  const pages = browser.pages();
  const page = pages[0];

  //EPIC Oauth popup details fill up and logging into Transition
  const library1 = new LIB(page);
  const newPage = await library1.TransitionLogin('Cadence, Anna');
  await newPage.waitForTimeout(5000);

  await expect(newPage.getByText('Shared Choice')).toBeVisible();

  //Shared Choice Page details
  const SC = new SharedChoice(newPage);

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
  await SCPS.TextOREmail(SharedChoiceRecepientUser);
  await newPage.waitForTimeout(10000);

  //Mailslurp class
  const mailcheck = new Mailslurp();

  //Open the email and click on the link present in the email body
  const Electronic_Page= await mailcheck.OpenTheLinkPresentInEMailBody('Post-Acute Options');

  await Electronic_Page.waitForTimeout(5000);
  await Electronic_Page.getByRole('button', { name: ' Add All  ' }).click();

  //
  mailcheck.CreateMailIdInMailslurp();

  await newPage.locator('#iconDashboardCustomize').click();


  // //Click on Print button on the Shared Choice page and takes the screenshot of the printed page
  // await SCPS.PrintSharedChoice();

  // //Click on Go to Transition button
  // await SCPS.GoToTransition();
});