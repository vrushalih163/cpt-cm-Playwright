// Author - Vrushali Honnatti Date:10th July, 2024

import { test, expect, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';

const { user, password, QAProvider1 } = process.env

test('Validate user search for providers through Provider Search and bring them back to Transition', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  const Library = new LIB();

  //Step 1 - Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
  //getting persistant context
  var library = Library.DataDirectory();
  const userpath = ((await library).toString());
  const browser = await chromium.launchPersistentContext(userpath);
  const pages = browser.pages();
  const page = pages[0];

  //EPIC Oauth popup details fill up and logging into Transition
  library = new LIB(page);
  const  newPage = await library.TransitionLogin('Clin Doc, Henry');

  //Step 2 - Click on Create Referral card
  await newPage.getByText('add_circle_outline').click();
  await newPage.getByPlaceholder('Search...').click();

 //Step 3 - Choose the required referral type and click on 'Create Referral' button
  await newPage.getByLabel('Search referral type').click();
  await newPage.keyboard.type('ATAuto', { delay: 250 });
  await newPage.waitForTimeout(1000);

  await newPage.locator('.mat-radio-inner-circle').first().press('Enter');
  await newPage.pause();
  await newPage.locator('#btnCreatReferral').click();
  await newPage.waitForTimeout(1000);
  await newPage.getByRole('button', { name: 'Yes' }).click();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 4 - Click on Search Providers
  await newPage.getByText('add_circle_outline').click();

  const ProviderSearch = new ProviderSearchPage(newPage);

  let startIndex = QAProvider1.length -15;

  //Step 5 - Enter the zipcode 96912 and Click on Refresh
  await ProviderSearch.SearchProvider(QAProvider1.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 6 - Without selecting the Providers, click on the Manage referrals breadcrumb
  //Scenario covered in TC 95685

  //Step 7 - Click on Forms tab, add forms
  //Step 8 - Click on Attachments tab
  //Step 9 - Click on Add Attachment and attach the required document
  //Step 10 - Click on Information tab, enter the Projected discharge date and Primary diagnosis, Click on Send tab
  await newPage.getByText('Review and Send').click();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Step 11 - Verify the Providers and Send Referral button 
  //Step 12 - Click on Providers tab
  //Step 13 - Click on Search Providers
  //Step 14 - Enter the zipcode 96912 and Click on Refresh
  //Step 15 - Select the checkboxes present against each of the providers and click on Add to Referral button
  await newPage.locator('#anchorSendReferral').click();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  let textMsg = await newPage.locator('//card-content[@id="transitionReferralContent"]/div/h5').first().textContent();
  let referralId = textMsg.split('-')
  let temp = referralId[1].split(' ')

  const page2 = await browser.newPage();
  await page2.goto('chrome://new-tab-page/');

  const Login = new LoginPage(page2);
  const page3 = await Login.login(user, password);

  const AppNav = new ApplicationNavigator(page3);
  await AppNav.NavigateToChangeOrg(QAProvider1)
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  const ViewOnlineReferral = new ViewOnlineReferralPage(page3);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page3);


  await IncomingReferralsEnhancedView.searchReferralId(temp[0]);
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  await ViewOnlineReferral.selectResponse('Yes, willing to accept patient');
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  await ViewOnlineReferral.clickSendResponse();
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(4000);

  await page.bringToFront();
  await page.locator('#btnTrySmart').click();
  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Launch' }).click();
  const page5 = await page5Promise;

  await page5.getByRole('heading', { name: 'ATAutomation' }).first().click();
  await page5.waitForLoadState('domcontentloaded');
  await page5.waitForTimeout(2000);
  await expect(page5.locator('#lastResponse')).toContainText('Yes, willing to accept patient');
});