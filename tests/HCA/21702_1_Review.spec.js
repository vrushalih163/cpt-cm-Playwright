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


// Creating a Review

  await page1.getByTitle('Create a new review').click();
  await page1.waitForTimeout(2000);
  await page1.locator('#ddReviewTypes').selectOption('1603');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('link', { name: 'STEP 3 - Review Criteria' }).click();
  await page1.locator('#ddlUMStatus').selectOption('1773');
  await page1.locator('#ddlCaseStatus').selectOption('1702');
  await page1.locator('#ddlReCertification').selectOption('2718');
  await page1.locator('#ddlOrderVerification').selectOption('5436');
  await page1.locator('#ddlSecondaryReviewer').selectOption('1693168');
  await page1.locator('#ddlOutcomeReason').selectOption('2276');
  await page1.locator('#ddlReviewOutcome').selectOption('3423');
  await page1.locator('#ECINCalendarReviewedDaysStartingOn_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell01').click();
  await page1.locator('#ECINCalendarReviewedDaysThroughEndOf_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '10', exact: true }).click();
  await page1.locator('#txtSecondaryReviewNotes_StampTextBoxControl').click();
  await page1.locator('#txtSecondaryReviewNotes_StampTextBoxControl').fill('Testing HCA in Reviews');
  await page1.locator('#ddLevelOfCare').selectOption('12958');
  await page1.getByRole('cell', { name: 'Yes', exact: true }).click();
  await page1.locator('#MedNecControl_txtMedNec_StampTextBoxControl').click();
  await page1.locator('#MedNecControl_txtMedNec_StampTextBoxControl').fill('Testing - Pavan');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('button', { name: 'Lock & Add' }).click();
  await page1.waitForTimeout(5000);
  await page1.locator('//table[@id="Table1"]//tr[1]//td[3]//select[@id="m_PlanDescriptionList"]').selectOption('Plan Decp 111 - Plan No 111');
  await page1.getByRole('link', { name: 'Lookup' }).click();
  await page1.locator('#m_CompanyLookupTxt').click();
  await page1.locator('#m_CompanyLookupTxt').click();
  await page1.locator('#m_CompanyLookupTxt').fill('Pavan');
  await page1.getByRole('button', { name: 'Refresh List' }).click();
  await page1.getByRole('link', { name: 'Use' }).click();
  await page1.locator('#m_ContactMethodList').selectOption('1');
  await page1.locator('#m_ContactComment').click();
  await page1.locator('#m_ContactComment').fill('Testing HCA');
  await page1.locator('#m_RequestedLOCList').selectOption('12958');
  await page1.getByRole('row', { name: 'Requested Approved', exact: true }).getByRole('cell').nth(3).click();
  await page1.locator('#m_ApprovedLOCList').selectOption('12958');
  await page1.getByRole('button', { name: 'Complete' }).click();
  await page1.waitForTimeout(2000);
 // await page1.waitForTimeout(90000);
  //getting the current date and time in the given timezone
  var  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  
  var PSCDT = await page1.locator('//*[@id="dgCommunications_ctl03_lnkContactDateValue"]').textContent();

   // Validate the Diagnosis Date and Time with tolerance
  expect(isTimeWithinTolerance(PSCDT, CDT, 1)).toBe(true);

  PSCDT = await page1.locator('//*[@id="dgReviewVersion_ctl03_lblReviewSavedOnValue"]').textContent();


   // Validate the Business Letter Date and Time with tolerance
   expect(isTimeWithinTolerance(PSCDT, CDT, 1)).toBe(true);

  await page1.getByRole('button', { name: 'Finish', exact: true }).click();
  await page1.waitForTimeout(2000);


  await page1.getByRole('link', { name: '', exact: true }).click();

});

// Custom function to compare times with tolerance
function isTimeWithinTolerance(actualTime, expectedTime, toleranceMinutes) {
  const actualDate = new Date(actualTime);
  const expectedDate = new Date(expectedTime);
  const toleranceMillis = toleranceMinutes * 60 * 1000;
  return Math.abs(actualDate - expectedDate) <= toleranceMillis;
}

