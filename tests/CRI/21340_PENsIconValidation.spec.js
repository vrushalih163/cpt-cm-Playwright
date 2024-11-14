// Author - Nikhil Hiwarkhede: Story ID: CCM:21057- PENs Icon validation on Left Nav.

//import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const {user, password} = process.env
test('CRI PENs Left Navigation Icon - MVP', async ({ page }) => {
  
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
  await customWait(page1,2000);
  await expect(page1.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await customWait(page1,2000);
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');

  // Step 2&3: Left Nav "PENs" icon validation.
  await expect(page1.getByRole('link', { name: 'PENs'})).toBeVisible();
  await expect(page1.locator('#MenuBar_PENs_Header')).toContainText('PENs');
  await page1.locator('//a[@data-title="PENs"]').click();
  await customWait(page1,4000);

  console.log('Test Case Passed and Completed');

});