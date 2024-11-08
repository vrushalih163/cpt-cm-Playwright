import { test, expect } from '@playwright/test';

test('Remove breadcrumbs', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').fill('automation');
  await page1.locator('#PasswordTextBox').click();
  await page1.locator('#PasswordTextBox').fill('Organization=17');
  await page1.getByText('Log In').click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: ' Home' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.locator('#ECIN_Pagelet_Content').click();
  await page1.getByRole('link', { name: 'ECIN Administrative' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: ' Admin' }).click();
  await page1.getByRole('link', { name: 'Organization Lookup' }).click();
  await page1.locator('input[name="txtOrgID"]').click();
  await page1.locator('input[name="txtOrgID"]').fill('230399');
  await page1.getByRole('button', { name: 'Search' }).click();
  await page1.getByRole('link', { name: '', exact: true }).click();
  await page1.getByText('Can Login').check();
  
  const selectedOption = await page1.locator('#cmbGUIMode').inputValue();
  if (!selectedOption === 'CRI') {
  await page1.locator('#cmbGUIMode').selectOption('CRI');
}
if (await page1.locator('#txtbxComments').isEnabled()) {
  // Adding the comment into the comments field
  await page1.locator('#txtbxComments').fill('Update GUI');
}
 await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.getByRole('link', { name: 'Allscripts QA Provider 50 -' }).click();
  await expect(page1.locator('#PagePathID')).not.toBeVisible()
});