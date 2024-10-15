import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').fill('srikannan');
  await page1.locator('#UserNameTextBox').press('Tab');
  await page1.locator('#PasswordTextBox').fill('Organization=20');
  await page1.getByText('Log In').click();
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.getByRole('link', { name: 'CM Automation Hospital', exact: true }).click();
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  //Add a Patient
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.getByLabel('MRN:').click();
  await page1.getByLabel('MRN:').fill('Automate_3');
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('Test1_Gen');
  await page1.getByLabel('Last Name:', { exact: true }).click();
  await page1.getByLabel('Last Name:', { exact: true }).fill('& Attachments');
  await page1.locator('#ECINCalendarDateOfBirth_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '15', exact: true }).click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: '' }).click();
  //Add Admission
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill('Acc_Gen_34');
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#selYear').selectOption('97');
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell31').click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('12:45 PM');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('OTB');
  await page1.getByRole('button', { name: 'Save' }).click();
  
  //Navigate to Genral information pages
  await page.getByRole('link', { name: 'Assessment / Needs' }).click();
  await page.getByRole('link', { name: 'DME General' }).click();
  await expect(page.locator('#dteDeliveryDate_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Functional Status - Current' }).click();
  await expect(page.locator('#ECINCalendarAsOf_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Functional Status - Initial' }).click();
  await expect(page.locator('#ECINCalendarAsOf_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Functional Status - Pre-' }).click();
  await expect(page.locator('#ECINCalendarAsOf_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Newborn Information' }).click();
  await expect(page.locator('#ECINCalendar1_Date')).toBeVisible();
  await expect(page.getByRole('cell', { name: '8:40 PM (GMT)', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Home Care' }).click();
  await expect(page.locator('#dteStartDateOfCare_Date')).toBeVisible();
  await expect(page.locator('#dteStartDateOfCare_Time')).toBeVisible();
  await expect(page.getByRole('cell', { name: '8:40 PM (GMT)', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Respiratory' }).click();
  await expect(page.getByRole('cell', { name: '8/30/2024', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Vital Signs' }).click();
  await expect(page.locator('#dtStartDate_Date')).toBeVisible();
  await expect(page.locator('#dtEndDate_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Transportation' }).click();
  await expect(page.locator('#calTransportDate_Date')).toBeVisible();
  await page.getByRole('link', { name: 'Allergies / Medications' }).click();
  await expect(page.getByRole('cell', { name: '9/3/2024', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '9/2/2024', exact: true })).toBeVisible();
});