// Author - Vrushali Honnatti Date:10th July, 2024

import { test, expect, Browser,BrowserContext, chromium,Page } from '@playwright/test';
import { Console } from 'console';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ChooseRecipientsPage } from '../../pages/chooseRecipientspage_1446';
const {URL, user, password, persistentCookiepath, FhirLaunchUrl, TransitionlaunchUrl, Tokens, QAProvider1} = process.env

test('test', async ({  }) => {

  test.setTimeout(240 * 1000);
  const browser = await chromium.launchPersistentContext(persistentCookiepath ,{headless:false, channel:'chrome'});
  const pages  = browser.pages();
  const page = pages[0];
  await page.goto(FhirLaunchUrl, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#userLoginMenu').click();
  await page.waitForTimeout(3000);

  //await page.pause();
  
  await page.locator("//*[@id=\"LoginContextUSCDILogin\"]/span").click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(8000);
  await page.locator("(//a[@id=\"DocumentationDropdown\"])").click();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#mnulaunching').click();
  await page.locator('#btnTrySmart').click();
  await page.locator('#selApp').selectOption('EPIC');
  await page.locator('#txtOAuth2LaunchUrl').fill(TransitionlaunchUrl);
  await page.locator('#txtTokens').fill(Tokens);
  
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    await page.locator('#btnLaunch').click()
  ]);
  await page1.getByText('add_circle_outline').click();
  await page1.getByPlaceholder('Search...').click();

  
  await page1.getByLabel('Search referral type').click();
  await page1.keyboard.type('ATAuto', { delay: 250 });
  await page1.waitForTimeout(1000);

  await page1.locator('.mat-radio-inner-circle').first().press('Enter');
  await page1.pause();
  await page1.locator('#btnCreatReferral').click();
  await page1.waitForTimeout(1000);
  await page1.getByRole('button', { name: 'Yes' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await page1.getByText('add_circle_outline').click();

  const ChooseRecipients = new ChooseRecipientsPage(page1);

  await ChooseRecipients.choose1RecipientTransition('Provider Online (226537)');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await page1.getByText('Review and Send').click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await page1.locator('#anchorSendReferral').click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  let textMsg = await page1.locator('//card-content[@id="transitionReferralContent"]/div/h5').first().textContent();
  let referralId = textMsg.split('-')
  let temp = referralId[1].split(' ')

  const page2 = await browser.newPage();
  await page2.goto('chrome://new-tab-page/');

  await page2.goto(URL);
  const page3Promise = page2.waitForEvent('popup');
  await page2.getByRole('button', { name: 'Log In' }).click();
  const page3 = await page3Promise;
  await page3.locator('#UserNameTextBox').click();
  await page3.locator('#UserNameTextBox').fill(user);
  await page3.locator('#UserNameTextBox').press('Tab');
  await page3.locator('#PasswordTextBox').fill(password);
  await page3.locator('#PasswordTextBox').press('Enter');
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(10000);

  const AppNav = new ApplicationNavigator(page3);
  await AppNav.NavigateToChangeOrg(QAProvider1)
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  const ViewOnlineReferral = new ViewOnlineReferralPage(page3);
  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page3);


  await IncomingReferralsEnhancedView.searchReferralId(temp[0]);
  await page3.waitForLoadState('domcontentloaded');
  await page3.waitForTimeout(2000);

  // await page3.getByRole('link', { name: 'Maximize Panel' }).click();
  // await page3.getByRole('button', { name: 'Defaults' }).click();
  // await page3.locator('#ViewSearchBar_ReferralID').click();
  // await page3.locator('#ViewSearchBar_ReferralID').fill((await temp[0]).toString());
  // await page3.getByRole('button', { name: 'Search' }).click();

  // await page3.waitForLoadState('domcontentloaded');
  // await page3.waitForTimeout(2000);

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