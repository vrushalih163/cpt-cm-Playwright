
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
const { user, password, timeZone, format  } = process.env;

test('HCA - Testing ASPX pages of DRG Documentation', async ({ page }) => {
  await page.goto('https://pv02.extendedcare.health/');
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
  await page1.locator('li').filter({ hasText: 'Documentation Avoidable Days' }).locator('i').first().click();
  await page1.getByRole('link', { name: 'DRG Documentation' }).click();
  await expect(page1.locator('#ecalDRGReviewDateTime_Date')).toBeVisible();
 // await expect(page1.locator('#ecalDRGReviewDateTime').getByRole('cell', { name: ':21 PM (CT)' })).toBeVisible();
  await expect(page1.locator('#ecalNextDRGDate_Date')).toBeVisible();
 // await expect(page1.locator('#ecalNextDRGDate').getByRole('cell', { name: ':21 PM (CT)' })).toBeVisible();
  await page1.locator('#ddlDRGStatus').selectOption('1276');
  await page1.locator('#lnkDocumentationComments').click();
  await page1.locator('#ddDocumentationType').selectOption('Concurrent');
  await page1.locator('#txtComments').click();
  await page1.locator('#txtComments').fill('DRG teststart123');
  await page1.getByRole('button', { name: 'Save' }).click();
 // await expect(page1.getByRole('cell', { name: 'M R, Srikannan', exact: true })).toBeVisible();
 // await expect(page1.getByRole('cell', { name: '10/14/2024 2:22 PM (CT)', exact: true })).toBeVisible();
  await page1.locator('#lnkQueryPage').click();
  await page1.locator('#cbPrimaryQueryPage').check();
  await page1.locator('#ddlQueryType').selectOption('916');
  await expect(page1.locator('#ecQueryDate_Date')).toBeVisible();
  await expect(page1.locator('#ecQueryDate_Time')).toBeVisible();
  await page1.locator('#ecNextQueryDate_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '17', exact: true }).click();
  await page1.locator('#ecNextQueryDate_Time').click();
  await page1.locator('#ecNextQueryDate_Time').fill('5:45 PM');
  await page1.locator('#ddQueryStatus').selectOption('AUTO Complete');
  await page1.locator('#ddQueryCommunicationMethod').selectOption('711');
  await page1.locator('#lnkQueryCommentAdd').click();
  await page1.locator('#txtComments').fill('CMT DG DRG');
  await page1.getByRole('button', { name: 'Save' }).click();
 // await expect(page1.getByRole('cell', { name: 'M R, Srikannan', exact: true })).toBeVisible();
 // await expect(page1.getByRole('cell', { name: '10/14/2024 2:24 PM (CT)', exact: true })).toBeVisible();
  await page1.waitForTimeout(7000);
  await page1.locator('#ecPhysicianDateTime_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '15', exact: true }).click();
  await page1.locator('#ecPhysicianDateTime_Time').click();
  await page1.locator('#ecPhysicianDateTime_Time').fill('12:45 PM');
  await page1.locator('#txtComments').click();
  await page1.locator('#txtComments').fill('test');
  await page1.getByRole('button', { name: 'Save' }).click();
  await expect(page1.getByRole('link', { name: 'AUTO Query Type' })).toBeVisible();
 // await expect(page1.locator('#dgQuery').getByRole('cell', { name: 'M R, Srikannan' })).toBeVisible();
 // await expect(page1.getByRole('cell', { name: '10/14/2024 2:23 PM (CT)', exact: true })).toBeVisible();
  //await expect(page1.getByRole('cell', { name: '10/17/2024 5:45 PM (CT)', exact: true })).toBeVisible();
  await expect(page1.getByRole('cell', { name: 'AUTO Email', exact: true })).toBeVisible();
  await expect(page1.getByRole('cell', { name: 'AUTO Complete', exact: true })).toBeVisible();
  await page1.getByRole('button', { name: 'Save' }).click();
  
});