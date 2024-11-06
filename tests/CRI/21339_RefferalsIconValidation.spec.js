// Author - Nikhil Hiwarkhede: Story ID: CCM:20280 - Referrals Icon Validation for CRI Orgs

import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const { user, password } = process.env;

test('CRI Referrals Left Navigation Icon', async ({ page }) => {

  async function customWait(page, TimeInMilliSeconds) {
    await page1.waitForTimeout(TimeInMilliSeconds);
    await page1.waitForLoadState('domcontentloaded');
  }

  // Step1: Login to Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const Navigate = new ApplicationNavigator(page1);
  await Navigate.NavigateToChangeOrg('Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts');
  await expect(page1.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');

  // Step2: to verify Referrals icon on the left side of the screen
  await expect(page1.getByRole('link', { name: ' Referrals' })).toBeVisible();
  await expect(page1.locator('#MenuBar_Referrals_Header')).toContainText('Referrals');

  // Step3: Click on Referrals icon and verify user navigation to Single card worklist
  await page1.getByRole('link', { name: ' Referrals' }).click();

  // Get all buttons
  const buttonsTexts = await page1.locator('//div[@class="queue-group-container"]//button').allInnerTexts();
  
  // Expected texts for each button
  const expectedTexts = ['New', 'In Progress', 'Booked Here', 'Archived', 'All'];
  
  // Loop through each button and assert the text content
  for (let i = 0; i < buttonsTexts.length; i++) {
    const buttonText = buttonsTexts[i].trim();
    await expect(buttonText.trim()).toContain(expectedTexts[i]);
  }

  await expect(page1.getByRole('navigation')).toContainText('Sorted by');

  console.log('Test Case Passed and Completed');
});