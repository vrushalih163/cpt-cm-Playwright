
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').click();
  await page1.locator('#UserNameTextBox').fill('Pavan Automation');
  await page1.locator('#UserNameTextBox').press('Tab');
  await page1.locator('#PasswordTextBox').fill('Organization=17');
  await page1.getByText('Log In').click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

  //await AppNav.NavigateToPatientsDefaultView();

  // Patient creation
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.getByLabel('MRN:').click();
  await page1.getByLabel('MRN:').fill('MRN_HCATestcase111');
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('Pavan');
  await page1.getByLabel('Last Name:', { exact: true }).fill('Shivakumar');
  await page1.locator('#ECINCalendarDateOfBirth_Date').fill('01.01.2000');
  await page1.locator('li').filter({ hasText: 'Date of Birth:' }).click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

// Admission Creation
  await page1.getByRole('link', { name: '' }).click();
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill('ACC_HCA_TC111');
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell40').click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('10:00 PM');
  await page1.locator('#dtProjectedDischarge_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '20', exact: true }).click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtProjectedDischarge_Time').click();
  await page1.locator('#dtProjectedDischarge_Time').fill('8:00 PM');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('Testing -  HCA Changes ');
  await page1.locator('#dtPatientTypeOrder_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '10', exact: true }).click();
  await page1.locator('#dtPatientTypeOrder_Time').click();
  await page1.locator('#dtPatientTypeOrder_Time').fill('11:00 AM');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

  // Financial Creation
  await page1.locator('li').filter({ hasText: 'Admission Admission Details' }).locator('i').first().click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Financial' }).click();
  await page1.waitForTimeout(2000);
  await page1.locator('#LinkAddPaymentSource').click();
  await page1.locator('#listPaymentType').selectOption('54562');
  await page1.locator('#txtPlanNumber').click();
  await page1.locator('#txtPlanNumber').fill('Plan No 111');
  await page1.locator('#txtPlanNumber').press('Tab');
  await page1.locator('#txtPlanDescription').fill('Plan Decp 111');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

//Inactivating Payment Source
  await page1.locator('#gridPaymentSources_ctl02_EditLink').click();
  await page1.locator('#cbInactive').check();
  await page1.locator('#ECINCalendarInactivatedOn_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '20', exact: true }).click();
  await page1.locator('#ECINCalendarInactivatedOn_Time').click();
  await page1.locator('#ECINCalendarInactivatedOn_Time').fill('12:00 AM');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForTimeout(3000);
  await expect(page1.locator('#gridPaymentSources')).toContainText('8/20/2024');

//Adding Diagnosis
  await page1.getByRole('link', { name: 'Diagnoses' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Add Diagnosis' }).click();
  await page1.waitForTimeout(1000);
  await page1.getByRole('link', { name: '[edit]' }).click();
  await page1.waitForTimeout(1000);
  await page1.locator('#txtCode').click();
  await page1.locator('#txtCode').fill('F');
  await page1.getByRole('button', { name: 'Refresh List' }).click();
  await page1.getByRole('link', { name: '(F01)  Vascular dementia' }).click();
  await page1.locator('#ddlType').selectOption('445');
  await page1.locator('#nePriority_Number').click();
  await page1.waitForTimeout(2000);
  await page1.locator('#nePriority_Number').fill('111');
  await page1.getByRole('cell', { name: '--Nothing Selected--', exact: true }).click();
  await page1.locator('#ddlPresentOnAdmission').selectOption('100');
  await page1.locator('#txtEditableComment').click();
  await page1.locator('#txtEditableComment').fill('Testing HCA Changes');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(3000);
  await expect(page1.locator('#ctrlDiagnosisList_dgDiagnoses_ctl02_lblDate')).toContainText('8/20/2024 4:10 AM (CT)');

//Adding Procedure
  await page1.getByRole('link', { name: 'Procedures' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Add Procedure' }).click();
  await page1.waitForTimeout(1000);
  await page1.getByRole('link', { name: '[edit]' }).click();
  await page1.waitForTimeout(1000);
  await page1.locator('#txtCode').click();
  await page1.locator('#txtCode').fill('6');
  await page1.getByRole('button', { name: 'Refresh List' }).click();
  await page1.waitForTimeout(1000);
  await page1.getByRole('link', { name: '(6A0Z0ZZ)  Atmospheric' }).click();
  await page1.locator('#ddlType').selectOption('512');
  await page1.locator('#nePriority_Number').click();
  await page1.waitForTimeout(1000);
  await page1.locator('#nePriority_Number').fill('222');
  await page1.locator('#txtEditableComment').click();
  await page1.locator('#txtEditableComment').fill('Testing HCA Changes');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForTimeout(3000);
  await expect(page1.locator('#procedureListCtrl_pxGrid_ctl02_codeDate')).toContainText('8/20/2024 4:11 AM (CT)');
  await page1.getByRole('link', { name: '', exact: true }).click();
});

