//Author: Rajakumar Maste, Created Date: 13 August 2024
//Modified By: Rajakumar Maste, Modified Date: 11 Sept 2024
//Comment - Updated the test case title and added the test case execution steps

import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { SharedChoiceHomePage } from '../../pages/Transition_Pages/SharedChoiceHomePage';
import { SCProviderSearch } from '../../pages/Transition_Pages/SharedChoice_ProviderSearch';
import { Mailslurp } from '../../pages/Transition_Pages/Mailslurp';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoicePage';
import { SharedChoiceContextNavigator } from '../../pages/Transition_Pages/SharedChoiceContextNavigator';
const { MailSlurpEMailId } = process.env
const Providercount = 5;
const ReferralType_Name = 'Automation - StandAlone PC';

test('Standalone PC - Shared Choice landing Page - Create Patient Choice and validating the Card and it details', async ({ }) => {
  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Step 1: Click on Launch and validate user launches to Shared Choice Landing page
  //Creating an Object to LIB class
  const Library = new LIB();

  await Library.CreateNewAdmissionForTransPatient('E3350','6572');

  //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
  const newPage = await Library.HandleAppLaunch('Optime, Omar', 'E3350', 'Patient Choice');

  await expect(newPage.locator('#referralsPageTitle')).toBeVisible();

  //Shared Choice Page details
  const SCHP = new SharedChoiceHomePage(newPage);

  //step 2: Click on Create Patient Choice button
  await SCHP.CreatePatientChoice_Click();

  //step 3: Choose "Automation - Shared Choice" and click on Select button on the modal 
  await SCHP.SelectLevelOfCare(ReferralType_Name);

  //step 4: Enter the Search by Address/ZIP = 96910 and Search by Name as "QA P" and validate the page

  //Shared Choice Provider Search Page details
  const SCPS = new SCProviderSearch(newPage);

  await SCPS.SCprovider_Search();
  expect(await newPage.getByRole('button', { name: ' Add 0 to Choice ' })).toBeVisible();

  //Select the provider from the search result
  await SCPS.SelectProvider(Providercount);

  //Click on Add button to add the selected providers to the choice
  await SCPS.AddToChoice();

  // Selected providers details right side panel opened and verifying the heading
  await expect(newPage.getByRole('heading', { name: 'Patient Choice' })).toBeVisible();

  //Click on Text/Email button 
  await SCPS.TextOREmail_Click();

  //Click on Text/Email button and enter the recipient email id and click on Share button 
  await SCPS.TextOREmail_Modal(MailSlurpEMailId);

  await SCPS.ToastMessage_ChoiceShared();
  await newPage.waitForTimeout(2000);
  //Mailslurp class
  //const mailcheck = new Mailslurp();

  //Open the email and click on the link present in the email body
  //const Electronic_Page = await mailcheck.OpenTheLinkPresentInEMailBody('Post-Acute Options');

  // await Electronic_Page.waitForTimeout(5000);
  // await Electronic_Page.getByRole('button', { name: ' Add All  ' }).click();

  // mailcheck.CreateMailIdInMailslurp();

  const SCCN = new SharedChoiceContextNavigator(newPage);
  await SCCN.SharedChoiceIcon_Click();
  await newPage.waitForTimeout(2000);

  // // This below block of code will help you to find the card which you want to click based on the text
  // const count = await newPage.locator('div card-content div h3').count();
  // console.log(`Number of cards found: ${count}`);
  // const SharedChoiceCard = newPage.locator('div card-content div h3');
  // for (let i = 0; i < count; i++) {
  //   const cardText = await SharedChoiceCard.nth(i).innerText();
  //   console.log(`Card ${i} text: ${cardText}`);
  //   if (cardText.includes(ReferralType_Name)) {
  //     await SharedChoiceCard.nth(i).click();
  //     break;
  //   }
  // }

  await SCHP.ValidateSharedChoice_Status('Choice Shared');
  await newPage.waitForTimeout(2000);

  await SCHP.Validate_DateLastShared('CT', '12hr');
  await newPage.waitForTimeout(2000);

  await SCHP.Click_FirstSharedChoiceCard();

  const SCP = new SharedChoice(newPage);
  await SCP.SharedChoice_TableHeader_Validation();
  await SCP.SharedMethod_Validation('Text/Email');
  await SCP.SharedWith_Validation(MailSlurpEMailId);

});