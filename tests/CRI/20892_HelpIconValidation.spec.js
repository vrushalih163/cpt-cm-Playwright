
import { test, expect } from '@playwright/test';




test('CM: CRI Help Icon', async ({ page }) => {

  await page.goto('https://pv02.extendedcare.health/professional/home/logon.aspx');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#UserNameTextBox').click();
  await page.locator('#UserNameTextBox').fill('automation');
  await page.locator('#PasswordTextBox').click();
  await page.locator('#PasswordTextBox').fill('Organization=17');
  await page.getByText('Log In').click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByRole('link', { name: 'Change Organization' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: 'Allscripts QA Provider 50 -' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Help' })).toBeVisible();
  await expect(page.locator('#MenuBar_Help_Header')).toContainText('Help');
  await page.getByRole('link', { name: ' Help' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('link', { name: 'Contact Us', exact: true })).toBeVisible();
  await expect(page.locator('//a[@name= "help_contact_us"]')).toContainText('Contact Us'); 
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Contact Us', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
  await expect(page1.locator('h2')).toContainText('Contact Us');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByRole('heading', { name: 'Support team phone numbers' })).toBeVisible();
  await expect(page1.getByRole('heading', { name: 'Contact form' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByText('CarePort Account Number')).toBeVisible();
  await expect(page1.getByText('Name', { exact: true })).toBeVisible();
  await expect(page1.getByText('Phone', { exact: true })).toBeVisible();
  await expect(page1.getByText('Email')).toBeVisible();
  await expect(page1.locator('#txtEmail')).toBeVisible();
  await page1.getByText('Subject').click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ddlSubject')).toBeVisible();
  await page1.locator('#ddlSubject').selectOption('47*****False');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByText('Description')).toBeVisible();
  await expect(page1.locator('#m_DescText')).toBeVisible();
  await page1.locator('#m_DescText').click();
  await page1.locator('#m_DescText').fill('requesting for testing purpose');
  await expect(page1.getByRole('button', { name: 'Submit form' })).toBeVisible();
  await expect(page1.getByRole('button', { name: 'Close window' })).toBeVisible();
   await page1.getByRole('button', { name: 'Submit form' }).click();
   await page.waitForTimeout(2000);
   await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByText('Thank you for taking the time')).toBeVisible();
  await expect(page1.locator('#m_ConfirmLabel')).toContainText('Thank you for taking the time to contact us.Somebody from CarePort will contact you to let you know the resolution.');
  await expect(page1.getByRole('button', { name: 'Close window' })).toBeVisible();
  await page1.getByRole('button', { name: 'Close window' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await page.getByRole('link', { name: ' Help' }).click();
  await expect(page.getByRole('link', { name: 'Archived Release Notes' })).toBeVisible();
  await expect(page.locator('//a[@name= "help_archived_release_notes"]')).toContainText('Archived Release Notes');
  await page.getByRole('link', { name: 'Archived Release Notes' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: ' Help' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'System Status -' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  const page2 = await page2Promise;
  await expect(page2.getByRole('heading', { name: 'WellSky Connected Networks' })).toBeVisible();
  await expect(page2.getByRole('link', { name: 'Page logo' })).toBeVisible();
  await expect(page2.locator('h5')).toContainText('WellSky Connected Networks');
  await expect(page2.locator('body')).toContainText('About This Site WellSky Connected NetworksThis site provides information about the status of the Connected Networks’ suite of solutions. Please bookmark this site and check back here to view the current status of the solutions listed below, including updates on maintenance, performance and security. Recurring maintenances are located at the bottom of this page.For updates on the Change Healthcare cybersecurity event, please visit https://wellsky.com/changestatus');
  await expect(page2.locator('div').filter({ hasText: 'All Systems Operational' }).nth(2)).toBeVisible();
  await expect(page2.locator('body')).toContainText('All Systems Operational');
  await expect(page2.getByText('CarePort Intake')).toBeVisible(); //NOT SURE
  await expect(page2.locator('body')).toContainText('CarePort Intake'); //NOT SURE
  await expect(page2.locator('div:nth-child(7) > .component-inner-container > .component-status')).toBeVisible();
  await expect(page2.locator('body')).toContainText('Operational');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  //await expect(page2.getByRole('link', { name: 'Page logo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  console.log('Test Passed and Completed');

});

