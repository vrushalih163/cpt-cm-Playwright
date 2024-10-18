
//Author Asha Fernandes Story ID: CCM:20278
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const {user, password} = process.env

test('Verify CRI Left Navigation Style Guide Changes', async ({ page }) => {

  // Login to Application
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  // Change to CRI enabled Org- Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts (230399)
  const AppNav = new ApplicationNavigator(page1);
  const page2 = await AppNav.NavigateToChangeOrg('Allscripts QA Provider 50 -');
  await page2.waitForTimeout(5000);
  
  // Verify the left navigation icons
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');
  await expect(page1.locator('#globalMenuBar_container div')).toBeVisible();

  // Change Org RM enabled - QA Provider #1 (80891)
  const page3 = await AppNav.NavigateToChangeOrg('QA Provider #1 (80891)');
  await page3.waitForTimeout(5000);

  // Verify the left navigation icons
  await expect(page1.getByText('QA Provider #1 (80891)')).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Home' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Manage' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Search' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Reports' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Configure' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Configure' })).toBeVisible();
  await expect(page1.getByRole('link', { name: ' Help' })).toBeVisible();
  await page1.getByRole('link', { name: ' Logoff' }).click();
  await expect(page1.getByRole('link', { name: ' Logoff' })).toBeVisible();
});