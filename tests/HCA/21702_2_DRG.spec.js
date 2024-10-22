
import { test, expect } from '@playwright/test';

test('CM- HCA to Support2', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/professional/home/logon.aspx');
  await page.locator('#UserNameTextBox').click();
  await page.locator('#UserNameTextBox').fill('srikannan');
  await page.locator('#PasswordTextBox').click();
  await page.locator('#PasswordTextBox').fill('Organization=20');
  await page.locator('#PasswordTextBox').press('Enter');
  await page.getByRole('link', { name: 'Change Organization' }).click();
  await page.getByRole('link', { name: '`Allscripts QA Hospital 124 (' }).click();
  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByRole('link', { name: 'Patient Favorites ' }).click();
  await page.getByRole('link', { name: 'M R, SRIKANNAN (974246)' }).click();
  await page.getByRole('link', { name: 'TEST12345 (7/9/2024)' }).click();
  await page.goto('https://pv02.extendedcare.health/professional/Manage/Admissions/AdmissionGeneralInformation.aspx');
  await page.goto('https://pv02.extendedcare.health/professional/Manage/DRGDocumentation/DRGDocumentationEditor.aspx');
  await expect(page.locator('#ecalDRGReviewDateTime_Date')).toBeVisible();
  await expect(page.locator('#ecalDRGReviewDateTime').getByRole('cell', { name: ':47 PM (GMT)' })).toBeVisible();
  await expect(page.locator('#ecalNextDRGDate_Date')).toBeVisible();
  await expect(page.locator('#ecalNextDRGDate').getByRole('cell', { name: ':47 PM (GMT)' })).toBeVisible();
  await page.locator('#lnkQueryPage').click();
  await expect(page.locator('#ecQueryDate_Date')).toBeVisible();
  await expect(page.locator('#ecQueryDate_Time')).toBeVisible();
  await page.locator('#ecNextQueryDate_CalImg').click();
  await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '23', exact: true }).click();
  await page.locator('#ddlQueryType').selectOption('1293');
  await page.locator('#ecNextQueryDate_Time').click();
  await page.locator('#ecNextQueryDate_Time').fill('12:40 PM');
  await page.getByRole('button', { name: 'Save' }).click();
  
});