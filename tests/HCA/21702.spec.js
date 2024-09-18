
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';
import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';
import { PatientdetailsPage } from '../../pages/patientdetailspage_52';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { FinancialPage } from '../../pages/financialpage_55';
import { EditPaymentSource } from '../../pages/EditPaymentSourcePage_165';
import { AdmissionFinancialInformation } from '../../pages/AdmissionFinancialInformationPage_55';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { Diagnoses } from '../../pages/DiagnosesPage_1017';
import { CodeEditor } from '../../pages/CodeEditorPage_1020';
import { CodeLookUp } from '../../pages/CodeLookUpPage_1022';
import { Procedure } from '../../pages/ProcedurePage_1019';
const { user, password } = process.env;
const timeZone = 'CT';
const format = '12hr';

test('test', async ({ page }) => {

  //Login to the application
  const login = new LoginPage(page);
  const page1 = await login.login(user, password);

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
  const FS = new FinancialPage(page1);
  await FS.clickaddfinancial();

  //Adding Payment Source
  const EPS = new EditPaymentSource(page1);
  await EPS.AddPaymentSource('54562');

  //Inactivating Payment Source
  //Navigation to Admission Financial Information
  const AdmFinInfo = new AdmissionFinancialInformation(page1);

  //Clicking on Edit Icon
  await AdmFinInfo.EditIcon_Click();
  await page1.waitForLoadState('networkidle');

  //Inactivating Payment Source
  await EPS.InactivePaymentSource();
  await page1.waitForLoadState('networkidle');

  //getting the current date and time in the given timezone
  var CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  const PSCDT = await page1.locator('//table[@id="gridPaymentSources"]//tbody//tr[2]//td[6]').textContent();

  //Validating the Inactivation Date and Time
  await expect(CDT).toContain(PSCDT);

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

  // Validating the Diagnosis Date and Time
  await expect(page1.locator('#ctrlDiagnosisList_dgDiagnoses_ctl02_lblDate')).toContainText(CDT);

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

  // Validating the Procedure Date and Time
  await expect(page1.locator('#procedureListCtrl_pxGrid_ctl02_codeDate')).toContainText(CDT);

});
