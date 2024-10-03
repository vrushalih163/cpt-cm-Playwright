//Author Asha Fernandes Story ID: CCM:20468

import { test, expect } from '../pages/PageStart';
import { LoginPage } from '../pages/PageLogin_111';
import { ApplicationNavigator } from '../pages/ApplicationNavigator';
const {user, password} = process.env
test('CM: CRI Logout', async ({ page }) => {
  
  // Login to Org
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const AppNav = new ApplicationNavigator(page1);
  const page2 = await AppNav.NavigateToChangeOrg('Allscripts QA Provider 50 -');
  await page2.waitForTimeout(5000);
  await expect(page1.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');
  // Verify Logoff link is visible
  await expect(page1.getByRole('link', { name: '' })).toBeVisible();
  //Click on Logoff link
  await page1.getByRole('link', { name: '' }).click();
});
