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
  await page.waitForTimeout(5000);
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.getByRole('link', { name: 'CM Automation Hospital', exact: true }).click();
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  //Add a Patient
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.getByLabel('MRN:').click();
  await page1.getByLabel('MRN:').fill('Automate_22');
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('Test1_Forms');
  await page1.getByLabel('Last Name:', { exact: true }).click();
  await page1.getByLabel('Last Name:', { exact: true }).fill('& Attachments');
  await page1.locator('#ECINCalendarDateOfBirth_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '15', exact: true }).click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: '' }).click();
  //Add Admission
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill('Acc_FR_22');
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#selYear').selectOption('97');
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell31').click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('12:45 PM');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('OTB');
  await page1.getByRole('button', { name: 'Save' }).click();
  //Navigation to Forms & Attachments
  await page1.getByRole('link', { name: 'Forms and Attachments' }).click();
  await page1.locator('#m_MasterFormsList').selectOption('1_1_4640');
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.locator('#m_MasterFormsList').selectOption('1_1_8089');
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.frameLocator('iframe[title="webviewer"]').getByRole('button', { name: 'Save' }).click();
  await expect(page1.locator('#m_FormContentsRow')).toContainText('10/4/2024 6:13 AM (CT)');
  await expect(page1.locator('#m_FormContentsRow')).toContainText('10/4/2024 6:13 AM (CT)');
  await page1.locator('#m_MasterFormsList').selectOption('1_1_8089');
  await page1.getByRole('button', { name: 'Add' }).click();
});

