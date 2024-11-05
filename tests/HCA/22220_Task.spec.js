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

test('CM- HCA to Support6', async ({ page }) => {
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
  await page1.getByRole('link', { name: 'Tasks' }).click();
  await page1.getByRole('link', { name: 'Add' }).click();
  await page1.locator('#ddlTaskItemId').selectOption('AUTO ADMISSION task');
  await page1.locator('#ddlAssignToId').selectOption('1693662');
 // await expect(page1.locator('#ecStartOn').getByRole('cell', { name: ':18 AM (CT)' })).toBeVisible();
 // await expect(page1.getByRole('cell', { name: '7:18 AM (CT)', exact: true }).nth(1)).toBeVisible();
  // await page1.locator('#ddlStatus').selectOption('4467');
  // await page1.locator('#cbNotifyCreatorWhenAssigned').check();
  // await page1.locator('#cbNotifyCreatorWhenPastDue').check();
  // await page1.locator('#cbNotifyCreatorWhenCompleted').check();
  // await page1.locator('#cbNotifyOwnerWhenAssigned').check();
  // await page1.locator('#cbNotifyOwnerWhenPastDue').check();
  // await page1.locator('#cbNotifyOwnerWhenCompleted').check();
  await page1.getByRole('button', { name: 'Save' }).click();
 // await expect(page1.getByRole('cell', { name: '9/14/2024 12:35 PM (CT) 9/11/2024 1:35 AM (CT)', exact: true })).toBeVisible();
});