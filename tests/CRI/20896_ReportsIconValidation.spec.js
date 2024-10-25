// Author - Nikhil Hiwarkhede: Story ID: CCM:20293- Reports Icon and Submenu under Reports option

import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const {user, password} = process.env
test('test', async ({ page }) => {
  
  // This method is created for wait execution for given time in milliseconds
  async function customWait(page,TimeInMilliSeconds){
  await page.waitForTimeout(TimeInMilliSeconds);
  await page.waitForLoadState('domcontentloaded');
  }

  // Step1: Login to Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts (CRI Org)
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const Navigate = new ApplicationNavigator(page1);
  await Navigate.NavigateToChangeOrg('Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts');
  await expect(page1.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');

  // Step 2&3: Left Nav "Reports" icon and SUb Menu under Reports option
  await expect(page1.locator('#MenuBar_Reports_Header')).toContainText('Reports');
  await page1.locator('//a[@data-title="Reports"]').click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Report Library' })).toBeVisible();
  await expect(page1.locator('//a[@name= "reports_report_library"]')).toContainText('Report Library');
  await page1.getByRole('link', { name: 'Report Library' }).click();
  await customWait(page1,2000);
  // Step 4 to verify Folders under Report Library
  await expect(page1.getByRole('link', { name: ' Incoming Referrals and' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Management' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Security' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' User Activity and Productivity' })).toBeVisible();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: ' Incoming Referrals and' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Report Library - Incoming')).toBeVisible();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: ' Management' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Report Library - Management')).toBeVisible();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: ' Security' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Report Library - Security')).toBeVisible();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: ' User Activity and Productivity' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Report Library - User Activity and Productivity')).toBeVisible();
  console.log('Test Case Passed and Completed');

});
