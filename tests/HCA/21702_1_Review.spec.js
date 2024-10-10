import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { LIB } from '../../bizLibs/lib';
import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';
import { PatientdetailsPage } from '../../pages/patientdetailspage_52';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { EditPaymentSource } from '../../pages/EditPaymentSourcePage_165';
import { AdmissionFinancialInformation } from '../../pages/AdmissionFinancialInformationPage_55';
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
const FS = new AdmissionFinancialInformation(page1);
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
  
  //await expect(page1.locator('#ECIN_Pagelet_Content')).toContainText('9/19/2024 5:31 AM (CT)');
  //await expect(page1.getByRole('cell', { name: '9/19/2024 5:31 AM (CT)', exact: true })).toBeVisible();

  //getting the current date and time in the given timezone
  var CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('button', { name: 'Lock & Add' }).click();
  await page1.waitForTimeout(5000);
  //await page1.locator('//table[@id="Table1"]//tr[1]//td[3]//select[@id="m_PlanDescriptionList"]').selectOption('Plan Desc 111 - Plan No 111');
  await page1.locator('//table[@id="Table1"]//tr[1]//td[3]//select[@id="m_PlanDescriptionList"]').selectOption('Plan Decp 111 - Plan No 111');
  await page1.getByRole('link', { name: 'Lookup' }).click();
  await page1.locator('#m_CompanyLookupTxt').click();
  await page1.locator('#m_CompanyLookupTxt').click();
  await page1.locator('#m_CompanyLookupTxt').fill('Pavan');
  await page1.getByRole('button', { name: 'Refresh List' }).click();
  await page1.getByRole('link', { name: 'Use' }).click();
  await page1.locator('#m_ContactMethodList').selectOption('1');
 // await page1.getByRole('cell', { name: 'Contact Date: 9/19/2024 5:34 AM (CT)', exact: true }).click();
  await page1.locator('#m_ContactComment').click();
  await page1.locator('#m_ContactComment').fill('Testing HCA');
  await page1.locator('#m_RequestedLOCList').selectOption('12958');
  await page1.getByRole('row', { name: 'Requested Approved', exact: true }).getByRole('cell').nth(3).click();
  await page1.locator('#m_ApprovedLOCList').selectOption('12958');
  await page1.getByRole('button', { name: 'Complete' }).click();
  await page1.waitForTimeout(2000);
//   await expect(page1.locator('#dgCommunications')).toContainText('9/19/2024 5:34 AM (CT) - -');
//   await expect(page1.getByRole('cell', { name: '9/19/2024 5:34 AM (CT) - -', exact: true })).toBeVisible();

  //getting the current date and time in the given timezone
  CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // //var timezone = 'CT';
  // const now1 = new Date();
  // const options3 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  // const formatter3 = new Intl.DateTimeFormat('en-US', options3);
  // var Time3 = formatter3.format(now1);

  // const options4 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  // const formatter4 = new Intl.DateTimeFormat('en-US', options4);
  // var Time4 = formatter4.format(now1);
  // Time3 = Time3.replace(/^0+/, '');
  // Time4 = Time4.replace(/^0+/, '');
  // let result2 = Time4 + ' ' + Time3 + ' ' +  '(' +  timezone  + ')';
  // //await expect(page1.locator('//td[@id="ECIN_Pagelet_Container"]/div//table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/a')).toContainText(result2);
  // console.log(result2);

//   await expect(page1.locator('#dgReviewVersion')).toContainText('9/19/2024 5:34 AM (CT)');
//   await expect(page1.locator('#dgReviewVersion').getByRole('cell', { name: '/19/2024 5:34 AM (CT)' })).toBeVisible();
  //getting the current date and time in the given timezone
   CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
//   const now3 = new Date();
//   const options7 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
//   const formatter7 = new Intl.DateTimeFormat('en-US', options7);
//   var Time7 = formatter7.format(now3);
  
//   const options8 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
//   const formatter8 = new Intl.DateTimeFormat('en-US', options8);
//   var Time8 = formatter8.format(now3);
//   Time7 = Time7.replace(/^0+/, '');
//   Time8 = Time8.replace(/^0+/, '');
//   let result4 = Time8 + ' ' + Time7 + ' ' +  '(' +  timezone  + ')';
//  // await expect(page1.locator('#dgReviewVersion')).toContainText(result4);
//   console.log(result4);

  await page1.getByRole('button', { name: 'Finish', exact: true }).click();
  await page1.waitForTimeout(2000);
  //await page1.getByText('ADM').first().click();
  //await page1.waitForTimeout(2000);
  await page1.waitForTimeout(90000);

 // await expect(page1.locator('//table[@id="Table1"]/tbody/tr[4]/td[2]')).toContainText('9/12/2024 8:15 AM (CT)');
   //getting the current date and time in the given timezone
    CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);

  // const now2 = new Date();
  // const options5 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  // const formatter5 = new Intl.DateTimeFormat('en-US', options5);
  // var Time5 = formatter5.format(now2);
  
  // const options6 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  // const formatter6 = new Intl.DateTimeFormat('en-US', options6);
  // var Time6 = formatter6.format(now2);
  
  // Time5 = Time5.replace(/^0+/, '');
  // Time6 = Time6.replace(/^0+/, '');
  // let MostRecentRevision = Time6 + ' ' + Time5 + ' ' +  '(' +  timezone  + ')';
  //const MRR= await page1.locator('//table[@id="Table1"]/tbody/tr[4]/td[2]').textContent();
  //console.log('MRRvalue:', MRR.trim());
  //await expect(MRR.trim()).toContain(MostRecentRevision);
  //console.log(MostRecentRevision);

  // await expect(page1.getByRole('cell', { name: '9/25/2024 4:38 AM (CT)', exact: true })).toBeVisible();
  // await expect(page1.locator('#//table[@id="Table1"]/tbody/tr[5]/td[2]')).toContainText('9/25/2024 4:38 AM (CT)');

    //getting the current date and time in the given timezone
     CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  // const now4 = new Date();
  // const options9 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  // const formatter9 = new Intl.DateTimeFormat('en-US', options9);
  // var Time9 = formatter9.format(now4);
  
  // const options10 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  // const formatter10 = new Intl.DateTimeFormat('en-US', options10);
  // var Time10 = formatter10.format(now4);
  // Time9 = Time9.replace(/^0+/, '');
  // Time10 = Time10.replace(/^0+/, '');
  // let ReviewCompletedOn= Time10 + ' ' + Time9 + ' ' +  '(' +  timezone  + ')';
  //await expect(page1.locator('//table[@id="Table1"]/tbody/tr[5]/td[2]')).toContainText(ReviewCompletedOn);
  //const RCO= await page1.locator('//table[@id="Table1"]/tbody/tr[5]/td[2]').textContent();
  //console.log('RCOvalue:', RCO.trim());
  //await expect(RCO.trim()).toContain(ReviewCompletedOn);
  //console.log(ReviewCompletedOn);

    //getting the current date and time in the given timezone
CDT = await library.getCurrentDateTimeInTimeZone(timeZone, format);
  // const now5 = new Date();
  // const options11 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  // const formatter11 = new Intl.DateTimeFormat('en-US', options11);
  // var Time11 = formatter11.format(now5);
  
  // const options12 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  // const formatter12 = new Intl.DateTimeFormat('en-US', options12);
  // var Time12 = formatter12.format(now5);
  // Time11 = Time11.replace(/^0+/, '');
  // Time12 = Time12.replace(/^0+/, '');
  // let FirstContactDate = Time12 + ' ' + Time11 + ' ' +  '(' +  timezone  + ')';
  //const FCO= await page1.locator('//table[@class="clsWorklist"]//tr[2]/td[1]').textContent();
  //console.log('FCOvalue:', FCO.trim());
  //await expect(FCO.trim()).toContain(FirstContactDate);
  //console.log(FirstContactDate);

  await page1.getByRole('link', { name: '', exact: true }).click();

});

