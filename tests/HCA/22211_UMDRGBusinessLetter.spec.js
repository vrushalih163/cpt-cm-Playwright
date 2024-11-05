//Modified by: Rajakumar Maste, Modified Date: 24 sept 2024

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

test('HCA Timezone changes related to Admission page payment source Diagnosis Procedures Business Letter', async ({ page }) => {

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

  //Inactivating Payment Source
  //Navigation to Admission Financial Information
  const AdmFinInfo = new AdmissionFinancialInformationPage(page1);

  //Clicking on Edit Icon
  await AdmFinInfo.EditIcon_Click();
  await page1.waitForLoadState('networkidle');

  //Inactivating Payment Source
  await EPS.InactivePaymentSource();
  await page1.waitForLoadState('networkidle');

  //getting the current date and time in the given timezone
  var CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  const PSCDT = await page1.locator('//table[@id="gridPaymentSources"]//tbody//tr[2]//td[6]').textContent();

  // Validate the Diagnosis Date and Time with tolerance
  expect(CDT).toContain(PSCDT);

  //Activating Payment Source
  await AdmFinInfo.EditIcon_Click();
  await EPS.ActivatePaymentSource();

  //Adding Diagnosis
  //Navigation to Diagnoses
  await MCN.Click_Dignoses();

  //Clicking on Add Diagnoses
  const Digno = new Diagnoses(page1);
  await Digno.Click_AddDiagnoses();

  //Clicking on Code Edit hyper link
  const CE = new CodeEditor(page1);
  await CE.Click_CodeEdit();

  // Entering the Diagnosis Code
  const CLU = new CodeLookUp(page1);
  await CLU.Code('F');

  // Clicking on Refresh List button
  await CLU.Click_RefreshList();

  // Clicking on the first result
  await CLU.Click_FirstResult();

  // Selecting the Type
  await CE.Type_selection('Admission');

  // Entering the Priority
  await CE.Priority_selection('111');

  // Selecting the Present On Admission value from the drop down
  await CE.PresentOnAdmission_selection('Clinically Undetermined');

  // Entering the Comment into the text area
  await CE.Comment('Testing HCA Changes');

  // Clicking on Save button
  await CE.Savebtn_Click();

  // getting the current date and time in the given timezone
  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // Extract the text content from the locator
  const diagnosisDateText = await page1.locator('#ctrlDiagnosisList_dgDiagnoses_ctl02_lblDate').innerText();

  // Validate the Diagnosis Date and Time with tolerance
  expect(isTimeWithinTolerance(diagnosisDateText, CDT, 2)).toBe(true);

  //Adding Procedure
  // Navigation to Procedure
  await MCN.NavigateToProcedure();

  // Clicking on Add Procedure
  const Proc = new Procedure(page1);
  await Proc.Click_AddProcedure();

  // Clicking on Code Edit hyper link
  await CE.Click_CodeEdit();

  // Entering the Procedure Code
  await CLU.Code('6');

  // Clicking on Refresh List button
  await CLU.Click_RefreshList();

  // Clicking on the first result
  await CLU.Click_FirstResult();

  // Selecting the Type
  await CE.Type_selection('Admitting');

  // Entering the Priority
  await CE.Priority_selection('222');

  // Entering the Comment into the text area
  await CE.Comment('Testing HCA Changes');

  // Clicking on Save button
  await CE.Savebtn_Click();

  // getting the current date and time in the given timezone
  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // Extract the text content from the locator
  const procedureDateText = await page1.locator('#procedureListCtrl_pxGrid_ctl02_codeDate').innerText();

  // Validate the Procedure Date and Time with tolerance
  expect(isTimeWithinTolerance(procedureDateText, CDT, 2)).toBe(true);

  // Adding Saved Days
  await MCN.Click_Documentation();

  // Navigation to Saved Days
  await MCN.NavigateToSavedDays();

  const SD = new SavedDays(page1);
  //Clicking on Add button on saved days page
  await SD.ClickAdd();

  const ESD = new EditSavedDays(page1);
  //Enter the number of saved days
  await ESD.NumberOfDays('5');

  //Enter the Reason for saved days
  await ESD.Reason('AUTO Reason');

  //Enter the level which you want to select from the drop down
  await ESD.Level('Acute');

  //Enter the Payor Plan which you want to select from the drop down
  await ESD.Payorplan('Plan Decp 111 - Plan No 111');

  //Enter the comment into comment text area field
  await ESD.Comment('Playwright Automation test');
  //Click on Save button
  await ESD.Save_btn();

  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  // Extract the text content from the locator
  const savedDaysDateText = await page1.locator('//table[@id="dgSavedDays"]/tbody/tr[last()]/td[5]').innerText();

  // Validate the Saved Days Date and Time with tolerance
  expect(isTimeWithinTolerance(savedDaysDateText, CDT, 2)).toBe(true);

  // Adding Payor Authorization
  //Navigate to Payor Authorizations
  await MCN.PayorAuthorizations_Click();

  const PAs = new PayorAuthorizations(page1);
  //Click on Add link on the Payor Authorizations page
  await PAs.Add_PayorAuthorizations();

  const PA = new PayorAuthorization(page1);
  //Enter the Payor Plan Description
  await PA.PlanDescription('Plan Decp 111 - Plan No 111');

  //Enter contact method which you want to select from the drop down
  await PA.ContactMethod('Phone: To Payor');

  //click on save button
  await PA.Save_btn();

  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // Extract the text content from the locator
  const payorAuthDateText = await page1.locator('#dgNotesAndCommunications_ctl03_lnkContactDate').innerText();

  // Validate the Payor Authorization Date and Time with tolerance
  expect(isTimeWithinTolerance(payorAuthDateText, CDT, 2)).toBe(true);

  // Adding UM Notes
  //click on Add notes link
  await PAs.Add_UMNotes();

  const AEUMnotes = new AddEditUMNotes(page1);
  //Enter the UM Notes Type
  await AEUMnotes.UMNotesType('AUTO UM Note Type');

  //Enter the UM Notes
  await AEUMnotes.UMNotes('Playwright Automation test');

  //click on save button
  await AEUMnotes.Save_btn();

  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // Extract the text content from the locator
  const umNotesDateText = await page1.locator('#dgNotesAndCommunications_ctl03_lnkContactDate').innerText();

  // Validate the UM Notes Date and Time with tolerance
  expect(isTimeWithinTolerance(umNotesDateText, CDT, 2)).toBe(true);

  // Adding Business Letters
  // Navigate to Business Letters
  await MCN.BusinessLetter_Click();

  const DRGDL = new DRGDocumentationLetters(page1);

  //click on 'Generate Business Letter' hyperlink
  await DRGDL.Click_DRGDocumentationLetters();

  const DRGDLG = new DRGDocumentationLettersGenerator(page1);

  //Select the Letter from the Letter To Create dropdown
  await DRGDLG.LetterToCreate('Chest Pain');

  // check the show me letter checkbox
  await page1.getByLabel('Show Me Letter').check();

  // click on Generate button
  await DRGDLG.Generate_btn();

  // click on Back button
  await DRGDLG.Back_btn();

  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  // Extract the text content from the locator
  const businessLetterDateText = await page1.locator('#ctrlBusinessLettersList_dgBusinessLetters_ctl02_lblCreatedOn').innerText();

  // Validate the Business Letter Date and Time with tolerance
  expect(isTimeWithinTolerance(businessLetterDateText, CDT, 2)).toBe(true);

});

// Custom function to compare times with tolerance
function isTimeWithinTolerance(actualTime, expectedTime, toleranceMinutes) {
  const actualDate = new Date(actualTime);
  const expectedDate = new Date(expectedTime);
  const toleranceMillis = toleranceMinutes * 60 * 1000;
  return Math.abs(actualDate - expectedDate) <= toleranceMillis;
}