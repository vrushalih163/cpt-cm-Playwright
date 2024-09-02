// Author - Vrushali Honnatti Date: 20th August, 2024

import { test, chromium } from '@playwright/test';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { InformationPage } from '../../pages/Transition_Pages/InformationPage';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';

import { LIB } from '../../bizLibs/lib';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { LoginPage } from '../../pages/PageLogin_111';

const {TransitionOrg1, user, password} = process.env

test('Referral - Information Tab (Referral Type is configured for Homecare and Notes/consults)', async ({ page }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //For automation - Login to the CM App and extract values for validation
  const Login = new LoginPage(page);
  const newPage = await Login.login(user, password);
  const AppNav = new ApplicationNavigator(newPage)
  await AppNav.NavigateToChangeOrg(TransitionOrg1);

  //Searching patient in Patient Default View

  await AppNav.NavigateToPatientsDefaultView();
  const PatientDefaultView = new PatientdefaultviewPage(newPage);
  await PatientDefaultView.SearchPatientByMRN('E1703');
  await PatientDefaultView.NavigateActionDDBox('Most Recent Admission');
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  //Navigate to admission details page and extract the values for validation
  const ManageContextNav = new ManageContextNavigator(newPage);
  await ManageContextNav.NavigateToAdmissionDetails();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(2000);

  const AdmDetails = new AdmissiondetailsPage(newPage);
  var ProjectedDischargeDate = await AdmDetails.GetProjectedDischargeDate();
  var PrimaryDiagnosis = await AdmDetails.GetPrimaryDiagnosis();
  var ProjectedDischargeTime = await AdmDetails.GetProjectedDischargeTime();

  await AppNav.LogOff();
  await page.close();

 //Creating an Object to LIB class
 const Library = new LIB();

 //Step 1 - Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
 //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
 const page1 = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

  const ManageRef = new ManageReferral(page1);
  const TransContextNav = new TransitionContextNavigator(page1);
  const Info = new InformationPage(page1);

  //Step 2 - Click on Create Referral icon/button. Select 'Transportation' Referral from the list of Referral types and click on create Referral button on the modal
  await ManageRef.CreateNewReferral('ATAutomation');

  //Step 3 - Click on Information tab and validate the controls/fields on the page
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

 
  //Step 4 - Validate the “Projected Discharge Date”
  await Info.ValidateProjectedDischargeDate(ProjectedDischargeDate);

  //Step 5 - Validate the “Primary Diagnosis” Textbox
  await Info.ValidatePrimaryDiagnosis(PrimaryDiagnosis);

  //Step 6 - Validate Address 1, Address 2, City, State, Zip and Start of Care Date values
  //Step 7 - Remove the “Start of Care Date” value
  //Step 8 - Remove any value from the textbox controls
  await Info.SetPrimaryDiagnosis(''); //Clearing the value
  await Info.ValidatePrimaryDiagnosisError()

  //Step 9 - Enter incorrect date format for Start of Care Date
  await Info.SetProjectedDischargeDate('223');
  await Info.ValidateDischargeDateRangeError();

  //Step 10 - Update some of the values manually, then click on any other tab and come back to Information tab
  await Info.SetProjectedDischargeDate('12/12/2027');
  await TransContextNav.ClickAttachmentsTab();
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  
  await Info.ValidateProjectedDischargeDate('12/12/2027');

  //Step 11 - Click on breadcrumb/Page path for Manage Referrals
  await TransContextNav.ClickManageReferralBreadCrumb();

  //Step 12 - Again, click on Create Referral icon/button. Select “Hospice” Referral from the list of Referral types on the modal and click on create Referral button
  await ManageRef.CreateNewReferral('ATAutoHSP');

  //Step 13 - Click on Information tab and validate the controls/fields on the page
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 14 - Validate the “Projected Discharge Date”
  await Info.ValidateProjectedDischargeDate(ProjectedDischargeDate);

  //Step 15 - Validate the “Primary Diagnosis” Textbox
  await Info.ValidatePrimaryDiagnosis(PrimaryDiagnosis);

  //Step 16 - Validate the comments textbox
  //Step 17 - Update Primary Diagnosis and Comments values then click on any other tab and come back to Information tab
  await Info.SetProjectedDischargeDate('12/12/2027');
  await TransContextNav.ClickAttachmentsTab();
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await Info.ValidateProjectedDischargeDate('12/12/2027');

  //Step 18 - Click on breadcrumb/Page path for Manage Referrals
  await TransContextNav.ClickManageReferralBreadCrumb();

  //Step 19 - Again, click on Create Referral icon/button. Select “Acute” Referral from the list of Referral types on the modal and click on create Referral button
  await ManageRef.CreateNewReferral('Acute Referral Type');

  //Step 20 - Click on Information tab and validate the controls/fields on the page
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //Step 21 - Validate all the controls on the page
  await Info.SetAddress1('1234 Test Address');
  await Info.SetAddress2('Suite 100');
  await Info.SetCity('Test City');
  await Info.SetState('AL');
  await Info.SetZipCode('12345');
  await Info.SetStartOfCareDate('12/12/2027');
  await Info.SetProjectedDischargeDate('12/12/2027');
  await Info.SetComments('Testing Comments');

  //Step 22 - Update some of the data on the fields and then click on any other tab and come back to Information tab
  await TransContextNav.ClickAttachmentsTab();
  await TransContextNav.ClickInformationTab();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  await Info.ValidateAddress1('1234 Test Address');
  await Info.ValidateAddress2('Suite 100');
  await Info.ValidateCity('Test City');
  await Info.ValidateZipCode('12345');
  await Info.ValidateStartOfCareDate('12/12/2027');
  await Info.ValidateProjectedDischargeDate('12/12/2027');
  await Info.ValidateComments('Testing Comments');
  
  //Step 23 - Click on breadcrumb/Page path for Manage Referrals
  
});