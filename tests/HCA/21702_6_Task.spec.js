import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';
import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';
import { PatientdetailsPage } from '../../pages/patientdetailspage_52';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { EditPaymentSource } from '../../pages/EditPaymentSourcePage_165';
import { AdmissionFinancialInformationPage } from '../../pages/AdmissionFinancialInformationPage_55';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { Diagnoses } from '../../pages/DiagnosesPage_1017';
import { CodeEditor } from '../../pages/CodeEditorPage_1020';
import { CodeLookUp } from '../../pages/CodeLookUpPage_1022';
import { Procedure } from '../../pages/ProcedurePage_1019';
import { SavedDays } from '../../pages/SavedDaysPage_578';
import { EditSavedDays } from '../../pages/EditSavedDaysPage_579';
import { PayorAuthorizations } from '../../pages/PayorAuthorizationsPage_745';
import { PayorAuthorization } from '../../pages/PayorAuthorizationPage_812';
import { AddEditUMNotes } from '../../pages/AddEditUMNotesPage_746'
import { DRGDocumentationLetters } from '../../pages/DRGDocumentationLettersPage_918';
import { DRGDocumentationLettersGenerator } from '../../pages/DRGDocumentationLettersGeneratorPage_919';
const { user, password } = process.env;
const timeZone = 'CT';
const format = '12hr';

<<<<<<< Updated upstream
test('CM- HCA to Support', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').fill('srikannan');
  await page1.locator('#PasswordTextBox').click();
  await page1.locator('#PasswordTextBox').fill('Organization=20');
  await page1.getByText('Log In').click();
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.getByRole('link', { name: '`Allscripts QA Hospital 124 (' }).click();
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.getByLabel('MRN:').click();
  await page1.getByLabel('MRN:').fill('123456');
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('sri');
  await page1.getByLabel('Last Name:', { exact: true }).click();
  await page1.getByLabel('Last Name:', { exact: true }).fill('kannan');
  await page1.locator('#ECINCalendarDateOfBirth_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '11', exact: true }).click();
  await page1.getByLabel('Sex at Birth:').selectOption('1');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: '' }).click();
  await page1.getByLabel('Create Admission').check();
  await page1.getByRole('button', { name: 'Ok' }).click();
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill('adm123');
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '12', exact: true }).click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('12:45');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('OTB');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.locator('li').filter({ hasText: 'Documentation Interdisciplinary Documentation Business Letters DRG' }).locator('i').first().click();
=======
test('test', async ({ page }) => {
  //Login to the application
const login = new LoginPage(page);
const page1 = await login.login(user, password);
await page1.waitForTimeout(2000);
//Generating Unique Text
var library = new LIB(page1);
const uniquetext = await library.generateUniqueText(10);
//const MRN = MRN + '-' + uniquetext;

// Patient creation
//Navigation to Patient Default View
const AppNav = new ApplicationNavigator(page1);
await AppNav.NavigateToPatientsDefaultView();
await page1.waitForTimeout(2000);

//Clicking on Add Patient
const patientdefViewpg = new PatientdefaultviewPage(page1);
await patientdefViewpg.clickaddapatient();

//Creating a Patient
const patientdetailspg = new PatientdetailsPage(page1);
await patientdetailspg.CreatePatient(uniquetext);

// Admission Creation
//Navigation to Manage Context Navigator
const MCN = new ManageContextNavigator(page1);

//Clicking on Admission '+' icon
await MCN.clickadmissionplusicon();
await page1.waitForTimeout(2000);

//Creating an Admission
const adm = new AdmissiondetailsPage(page1);
await adm.createAdmission(uniquetext);

// Financial Creation
//Navigation to Financial
await MCN.NavigateToFinancial();
await page1.waitForLoadState('networkidle');

//Clicking on Add Financial
const FS = new AdmissionFinancialInformationPage(page1);
await FS.clickaddfinancial();

//Adding Payment Source
const EPS = new EditPaymentSource(page1);
await EPS.AddPaymentSource('54562');

  await page1.getByRole('link', { name: ' Configure' }).click();
  await page1.getByRole('link', { name: 'Workflow ' }).click();
  await page1.getByRole('link', { name: 'Task Library' }).click();
  await page1.getByRole('link', { name: 'Add Task Item' }).click();
  await page1.getByLabel('Yes').check();
  await page1.locator('#txtTiName').click();
  await page1.locator('#txtTiName').fill('TEst Task');
  await page1.locator('#txtDescription').click();
  await page1.locator('#txtDescription').fill('Desc123task');
  await page1.locator('#ddlDefaultStatus').selectOption('1295');
  await page1.locator('#eneDefaultStartOnOffsetDays_Number').click();
  await page1.locator('#eneDefaultStartOnOffsetDays_Number').fill('0');
  await page1.locator('#eneDefaultStartOnOffsetHrs_Number').click();
  await page1.locator('#eneDefaultStartOnOffsetHrs_Number').fill('0');
  await page1.locator('#eneDefaultDueDateOffsetDays_Number').click();
  await page1.locator('#eneDefaultDueDateOffsetDays_Number').fill('0');
  await page1.locator('#eneDefaultDueDateOffsetHrs_Number').click();
  await page1.locator('#eneDefaultDueDateOffsetHrs_Number').fill('0');
  await page1.locator('#cbDefaultNotifyCreatorWhenAssigned').check();
  await page1.locator('#cbDefaultNotifyOwnerWhenAssigned').check();
  await page1.locator('#cbDefaultNotifyCreatorWhenPastDue').check();
  await page1.locator('#cbDefaultNotifyOwnerWhenPastDue').check();
  await page1.locator('#cbDefaultNotifyCreatorWhenCompleted').check();
  await page1.locator('#cbDefaultNotifyOwnerWhenCompleted').check();
  await page1.locator('#txtAssignedMessagePager_ddlIVIT_ddl_variables').selectOption('TaskID');
  await page1.locator('#txtAssignedMessagePager_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_ddl_variables').selectOption('TaskCompletedOn');
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_ddl_variables').selectOption('ActualTime');
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_ddl_variables').selectOption('ProjectedTime');
  await page1.locator('#txtAssignedMessageEmail_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_ddl_variables').selectOption('ActualTime');
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_ddl_variables').selectOption('TaskCompletedOn');
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_btn_add').click();
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_ddl_variables').selectOption('ProjectedTime');
  await page1.locator('#txtAssignedMessageSysAlert_ddlIVIT_btn_add').click();
  await page1.locator('#txtCompletedMessagePager_ddlIVIT_ddl_variables').selectOption('ActualTime');
  await page1.locator('#txtCompletedMessagePager_txtTextArea').click();
  await page1.locator('#txtCompletedMessagePager_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.locator('#txtCompletedMessageEmail_txtTextArea').click();
  await page1.locator('#txtCompletedMessageEmail_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.locator('#txtCompletedMessageSysAlert_txtTextArea').click();
  await page1.locator('#txtCompletedMessageSysAlert_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.locator('#txtPastDueMessagePager_txtTextArea').click();
  await page1.locator('#txtPastDueMessagePager_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.locator('#txtPastDueMessageEmail_txtTextArea').click();
  await page1.locator('#txtPastDueMessageEmail_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.locator('#txtPastDueMessageSysAlert_txtTextArea').click();
  await page1.locator('#txtPastDueMessageSysAlert_txtTextArea').fill('$[ActualTime]$$[TaskCompletedOn]$$[ProjectedTime]$');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  await page1.locator('li').filter({ hasText: 'Documentation Avoidable Days' }).locator('i').first().click();
>>>>>>> Stashed changes
  await page1.getByRole('link', { name: 'Tasks' }).click();
  await page1.getByRole('link', { name: 'Add' }).click();
  await page1.locator('#ddlTaskItemId').selectOption('3016');
  await page1.locator('#ddlAssignToId').selectOption('1693662');
  await expect(page1.locator('#ecStartOn').getByRole('cell', { name: ':18 AM (CT)' })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '7:18 AM (CT)', exact: true }).nth(1)).toBeVisible();
  await page1.locator('#ddlStatus').selectOption('4467');
  await page1.locator('#cbNotifyCreatorWhenAssigned').check();
  await page1.locator('#cbNotifyCreatorWhenPastDue').check();
  await page1.locator('#cbNotifyCreatorWhenCompleted').check();
  await page1.locator('#cbNotifyOwnerWhenAssigned').check();
  await page1.locator('#cbNotifyOwnerWhenPastDue').check();
  await page1.locator('#cbNotifyOwnerWhenCompleted').check();
  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.getByRole('cell', { name: '9/14/2024 12:35 PM (CT) 9/11/2024 1:35 AM (CT)', exact: true })).toBeVisible();
});