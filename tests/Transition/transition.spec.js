// Author - Vrushali Honnatti Date:10th July, 2024

import { test, expect, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';

const { user, password, QAProvider1 } = process.env

test('Transition POC', async ({ }) => {

  test.setTimeout(10 * 60 * 1000);//5mins in milliseconds

  const Library = new LIB();

  //getting persistant context
  var library = Library.DataDirectory();
  const userpath = ((await library).toString());
  const browser = await chromium.launchPersistentContext(userpath);
  const pages = browser.pages();
  const page = pages[0];

  //EPIC Oauth popup details fill up and logging into Transition
  library = new LIB(page);
  const  newPage = await library.TransitionLogin('Clin Doc, Henry');

  await newPage.getByText('add_circle_outline').click();
  await newPage.getByPlaceholder('Search...').click();


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

  await newPage.getByText('add_circle_outline').click();

  const ProviderSearch = new ProviderSearchPage(newPage);

  let startIndex = QAProvider1.length -15;

  await ProviderSearch.SearchProvider(QAProvider1.substring(startIndex));
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  await newPage.getByText('Review and Send').click();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

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