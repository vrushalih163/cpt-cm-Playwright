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

  
  // //Navigation to Printable Documents
  // await page1.locator('li').filter({ hasText: 'Printable Documents Admission' }).locator('i').first().click();
  // await page.getByRole('link', { name: 'Admission Timeline' }).click();
  // await expect(page.getByRole('cell', { name: '7/9/2024 12:40 PM (CT)', exact: true })).toBeVisible();
  // await page.getByRole('link', { name: 'Call List' }).click();
  // await page.locator('#RptCalendar_FromDate_CalImg').click();
  // await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '14', exact: true }).click();
  // await page.locator('#RptCalendar_ToDate_CalImg').click();
  // await page.frameLocator('iframe[name="CalIFrame"]').locator('#selYear').selectOption('106');
  // await page.getByRole('button', { name: 'Generate' }).click();
  // await page.locator('#RptCalendar_ToDate_CalImg').click();
  // await page.frameLocator('iframe[name="CalIFrame"]').locator('#selYear').selectOption('103');
  // await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '17', exact: true }).click();
  // await page.getByRole('button', { name: 'Generate' }).click();
  // await page.locator('#RptCalendar_FromDate_CalImg').click();
  // await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '2024', exact: true }).click();
  // await page.frameLocator('iframe[name="CalIFrame"]').locator('#selYear').selectOption('116');
  // await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '13', exact: true }).click();
  // await page.locator('#RptCalendar_ToDate_CalImg').click();
  // await page.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '18', exact: true }).click();
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('button', { name: 'Generate' }).click();
  // const page1 = await page1Promise;
  // await expect(page1.getByText('/9/2024 12:40 PM (CT)')).toBeVisible();
  // await expect(page1.getByText('-- 9/13/2024 12:47:36 AM')).toBeVisible();
  // const page2Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Discharge Summary' }).click();
  // const page2 = await page2Promise;
  // await page.goto('https://pv02.extendedcare.health/professional/Reports/PatientDocuments/PrintableDischargeSummaryLaunch.aspx');
  // await expect(page2.getByText('/9/2024 12:40 PM (CT)')).toBeVisible();
  // const page3Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Patient Information' }).click();
  // const page3 = await page3Promise;
  // await page.goto('https://pv02.extendedcare.health/professional/Reports/PatientDocuments/PatientInformationLaunch.aspx');
  // await expect(page3.getByRole('cell', { name: '7/9/2024 12:40 PM (CT)', exact: true })).toBeVisible();
  // await expect(page3.getByRole('cell', { name: '8/9/2024 12:30 PM (CT)', exact: true })).toBeVisible();
  // const page4Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Review History' }).click();
  // const page4 = await page4Promise;
  // await page.goto('https://pv02.extendedcare.health/professional/Reports/PatientDocuments/ReviewHistoryLaunch.aspx');
  // await expect(page4.getByRole('cell', { name: '7/9/2024 12:40 PM (CT)', exact: true })).toBeVisible();
  // await expect(page4.getByText('-- 9/13/2024 12:50:06 AM')).toBeVisible();
});