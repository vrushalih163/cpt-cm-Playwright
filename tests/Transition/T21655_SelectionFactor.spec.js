import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').click();
  await page1.locator('#UserNameTextBox').fill('nkolasani');
  await page1.locator('#UserNameTextBox').press('Tab');
  await page1.locator('#PasswordTextBox').fill('Organization=17');
  await page1.getByText('Log In').click();
  await page1.goto('https://pv02.extendedcare.health/professional/AngularPages/Home/Dashboard.aspx/home/dashboard');
  await page1.goto('https://pv02.extendedcare.health/professional/AngularPages/Home/Dashboard.aspx/home/dashboard');
  await page1.getByRole('heading', { name: 'Automation Selection Factor' }).click();
  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await expect(page1.locator('div').filter({ hasText: /^Selection Factors \*$/ }).nth(3)).toBeVisible();
  await page1.locator('#acm-mat-multiselect-52 span').first().click();
  await page1.locator('#mat-checkbox-1216 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#mat-checkbox-1217 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.getByText('QA Provider #1 (80891)Selected Provider *Selection Factors *').click();
  await page1.getByText('You may continue').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByLabel('Select Values').click();
  await page1.locator('#mat-checkbox-1232 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#mat-checkbox-1233 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.getByText('You may continue').click();
  await expect(page1.getByRole('button', { name: 'Place' })).toBeVisible();
  await page1.getByRole('button', { name: 'Place' }).click();
  await expect(page1.getByText('Reasons: Active with Agency,')).toBeVisible();
  await page1.getByText('edit').click();
  await expect(page1.getByLabel('Select Values')).toBeVisible();
  await page1.locator('#acm-mat-multiselect-54 span').first().click();
  await page1.locator('#mat-checkbox-1275 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#Edit').click();
  await page1.locator('mat-dialog-content').click();
  await page1.locator('#Edit').click();
  await page1.locator('mat-dialog-actions').filter({ hasText: 'Edit Selection Factors' }).click();
  await page1.getByRole('button', { name: 'Update Selection Factors' }).click();
  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Unplace Referral' }).click();
  await page1.getByRole('button', { name: 'Unplace' }).click();
  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByLabel('Selected Provider *').locator('div').nth(3).click();
  await page1.getByText('None').click();
  await expect(page1.getByRole('button', { name: 'Place' })).toBeVisible();
  await page1.getByRole('button', { name: 'Place' }).click();

  await page1.getByRole('heading', { name: 'Automation Non Selection' }).click();
  await page1.getByRole('row', { name: 'Allscripts QA Provider 37 -' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByRole('button', { name: 'Place' }).click();
});
