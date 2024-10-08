import { test, expect } from '@playwright/test';

test('Verify the style of top nav for CRI Orgs', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page2 = await page2Promise;
  await page2.locator('#UserNameTextBox').fill('automation');
  await page2.locator('#UserNameTextBox').press('Tab');
  await page2.locator('#PasswordTextBox').fill('Organization=17');
  await page2.getByText('Log In').click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page2.getByRole('link', { name: ' Home' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page2.getByRole('link', { name: 'Change Organization' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page2.getByRole('link', { name: 'Allscripts QA Provider 50 -' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page2.getByRole('row', { name: 'CarePort Referral Intake ' }).getByRole('img')).toBeVisible();
  await expect(page2.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page2.getByRole('link', { name: '' })).toBeVisible();
  await page2.getByRole('link', { name: '' }).click();
});