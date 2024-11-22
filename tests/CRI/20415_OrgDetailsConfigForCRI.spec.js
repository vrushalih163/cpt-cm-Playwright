// //Author Asha Fernandes Story ID: CCM:20415 CM: Org Details Configurations for CRI


import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const {user, password} = process.env

test('OrgDetailsConfigForCRI', async ({ page }) => {

  // Step1: Login to ECIN
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const AppNav = new ApplicationNavigator(page1);
  const page2 = await AppNav.NavigateToChangeOrg('ECIN Administrative Organization');
  await page2.waitForTimeout(5000);

  // Step2: Admin > Org Lookup
  await page1.getByRole('link', { name: ' Admin' }).click();
  await page1.getByRole('link', { name: 'Organization Lookup' }).click();
  await page1.locator('input[name="txtOrgID"]').click();
  await page1.locator('input[name="txtOrgID"]').click();
  await page1.locator('input[name="txtOrgID"]').click();
  await page1.locator('input[name="txtOrgID"]').press('ControlOrMeta+a');

  // Step3: Search for Org and click on Setting icon
  await page1.locator('input[name="txtOrgID"]').fill('234160');
  await page1.getByRole('button', { name: 'Search' }).click();
  await page1.getByRole('link', { name: '', exact: true }).click();
  await expect(page1.getByTitle('Organization Details (')).toBeVisible();

  // Step4: Verify two options are added with a checkbox under the “Receive Professional Referrals section”
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  // Step5: Verify the checkboxes are DISABLED 
  await page1.locator('#cmbGUIMode').selectOption('4');
  await page1.getByLabel('Org Can Receive Professional').uncheck();
  await page1.locator('#txtbxComments').click();
  await page1.locator('#txtbxComments').fill('step5');
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  // Step6: Verify the checkboxes are DISABLED 
  await page1.getByLabel('Org Can Receive Professional').check();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  // Step7: Verify the checkboxes are DISABLED
  await page1.locator('#cmbGUIMode').selectOption('5');
  await page1.getByLabel('Org Can Receive Professional').uncheck();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  //Step8: Verify the checkboxes are DISABLED
  await page1.getByLabel('Org Can Receive Professional').check();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  //step9: Verify the checkboxes are DISABLED
  await page1.getByLabel('Org Can Receive Professional').uncheck();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  //Step10: Verify checkboxes are ENABLED and UNCHECKED
  await page1.locator('#cmbGUIMode').selectOption('6');
  await page1.getByLabel('Org Can Receive Professional').check();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  //Step11: Click on checkboxes and verify they are Checked
  await page1.getByLabel('Enable Referrals From Discharge').check();
  await page1.getByLabel('Enable Referrals From Care').check();
  await page1.locator('#txtbxComments').click();
  await page1.locator('#txtbxComments').press('ControlOrMeta+a');
  await page1.locator('#txtbxComments').fill('checkboxes checked');

  // Step12: Click on APPLY
  await page1.getByRole('button', { name: 'Apply' }).click();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();

  // Step13: Click on checkboxes and verify they are Unchecked
  await page1.getByLabel('Enable Referrals From Discharge').uncheck();
  await page1.getByLabel('Enable Referrals From Care').uncheck();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();
  await page1.locator('#txtbxComments').click();
  await page1.locator('#txtbxComments').press('ControlOrMeta+a');
  await page1.locator('#txtbxComments').fill('checkboxes unchecked');

  // Step14: Click on APPLY
  await page1.getByRole('button', { name: 'Apply' }).click();
  await expect(page1.getByText('Enable Referrals From Discharge')).toBeVisible();
  await expect(page1.getByText('Enable Referrals From Care')).toBeVisible();
  await page1.getByRole('link', { name: '', exact: true }).click();
});
