import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').click();
  await page1.locator('#UserNameTextBox').fill('akash');
  await page1.locator('#PasswordTextBox').click();
  await page1.locator('#PasswordTextBox').fill('Organization=17');
  await page1.getByText('Log In').click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: ' Home' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Allscripts QA Hospital 1 (' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#PageHeader')).toContainText('Allscripts QA Hospital 1 (harpo - 226280)');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: ' Reports' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Report Library' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: ' Management' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ApiGridReports-data-row-entity-index-14')).toContainText('Post Acute Authorization Report');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  const page2Promise = page1.waitForEvent('popup');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.locator('#ApiGridReports-data-row-entity-index-14').getByRole('link', { name: '' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  const page2 = await page2Promise;
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.locator('#reportViewer_ctl08_ctl05_ctl01').click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.frameLocator('iframe[name="reportViewer_ctl08_ctl05_ctl02"]').locator('[id="\\32 0241001"]').click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.locator('#reportViewer_ctl08_ctl07_ctl01').click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.frameLocator('iframe[name="reportViewer_ctl08_ctl07_ctl02"]').getByRole('link', { name: '16', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.locator('#reportViewer_ctl08_ctl09_ctl01').click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.getByLabel('(Select All)').check();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page2.getByRole('button', { name: 'View Report' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page2.getByLabel('Report text')).toContainText('Post Acute Authorization Report');
});