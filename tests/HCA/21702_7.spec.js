import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').click();
  await page1.locator('#UserNameTextBox').fill('srikannan');
  await page1.locator('#PasswordTextBox').click();
  await page1.locator('#PasswordTextBox').fill('Organization=20');
  await page1.getByText('Log In').click();
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.getByRole('link', { name: '`Allscripts QA Hospital 124 (' }).click();
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Patient Favorites ' }).click();
  await page1.getByRole('link', { name: 'M R, SRIKANNAN (974246)' }).click();
  await page1.getByRole('link', { name: 'TEST12345 (7/9/2024)' }).click();
  await page1.getByTitle('Create a new audit').click();
  await page1.locator('#ddlAuditType').selectOption('13093');
  await page1.locator('#ddlPlanDescription').selectOption('307844815');
  await page1.locator('#ddlAuditDepartment').selectOption('41303');
  await page1.locator('#lnkAddChartRequest').click();
  await page1.locator('#ddlChartRequestType').selectOption('25920');
  await page1.locator('#ecReceiptDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecWrittenDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.getByRole('row', { name: 'Chart Request Due Date:', exact: true }).getByRole('img').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '18', exact: true }).click();
  await page1.locator('#ecInternalDueDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecInternalDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecReviewDueDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecChartReviewedDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ddlDeliveryMethod').selectOption('38848');
  await page1.locator('#txtTrackingNumber').click();
  await page1.locator('#txtTrackingNumber').fill('346346346');
  await page1.locator('#nePostageCost_Number').click();
  await page1.locator('#nePostageCost_Number').fill('45');
  await page1.locator('#nePagesCopied_Number').click();
  await page1.locator('#nePagesCopied_Number').fill('65');
  await page1.locator('#ecSentDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecResponseDueDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '24', exact: true }).click();
  await page1.locator('#ecDeliveryReceiptDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell34').click();
  await page1.locator('#txtRecipientName').click();
  await page1.locator('#txtRecipientName').fill('test 123');
  await page1.locator('#ecResponseDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell54').click();
  await page1.locator('#ddlResult').selectOption('38821');
  await page1.locator('#ddlResponse').selectOption('25898');
  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.getByRole('cell', { name: '9/24/2024 9/24/2024', exact: true }).first()).toBeVisible();
  await expect(page1.getByRole('cell', { name: '9/24/2024 9/24/2024', exact: true }).nth(1)).toBeVisible();
  await expect(page1.getByRole('cell', { name: '9/24/2024', exact: true })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '9/27/2024', exact: true })).toBeVisible();
  await page1.locator('#lnkAddAuditNote').click();
  await page1.locator('#txtNotes').click();
  await page1.locator('#txtNotes').fill('tEST aUTOMATION nOTES AUFIT');
  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.getByRole('link', { name: '/24/2024 11:53 AM (GMT)' })).toBeVisible();
});