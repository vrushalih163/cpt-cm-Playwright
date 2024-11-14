// Author - Vrushali Honnatti Date:10th July, 2024
const {QAProvider1, QAProvider2, user, password} = process.env
import { LIB } from '../../bizLibs/lib';
import { test } from '../../pages/PageStart';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { LoginPage } from '../../pages/PageLogin_111';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { ReviewFaceSheetPage } from '../../pages/reviewFaceSheetPage_662';
import { ReviewCriteriaPage } from '../../pages/reviewCriteriaPage_663';
import { ReviewSummaryPage } from '../../pages/reviewSummaryPage_678';
import { PayorCommunicationPage } from '../../pages/PayorCommunicationPage_671';
import { CommunicationsPage } from '../../pages/communicationsPage_664';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AddPaymentSourcePage } from '../../pages/addpaymentsource_165';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { PayorAuthorization } from '../../pages/PayorAuthorizationPage_812';
import { PayorAuthorizations } from '../../pages/PayorAuthorizationsPage_745';
import { AddEditUMNotes } from '../../pages/AddEditUMNotesPage_746';
import { ReportLibraryPage } from '../../pages/ReportLibraryPage_1113';
import { UMConfigPage } from '../../pages/UMConfigPage_656';

test('87591_3925015 UM Status - Roll Up and Roll Down logic on admission detail and UM pages', async ({ page }) => {
  
    //Step -1: Login to Allscripts QA Hospital 1 as User1
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);
  
    const lib1 = new LIB(page1);
    
    //Step 2 - Navigate to Configure > Utilization Review > Utilization Management Configuration
    //Step 3 - Check the below checkboxes under Workflow Settings and Click on Apply. "-- UM Status should default to the current Admission Work List UM Status (otherwise default to ""Nothing Selected"") - Checked" "-- Saving UM Status as ""Nothing Selected"" will clear the Admission Work List UM Status (otherwise, previous status remains) - Checked"
    //Not automated - since it is a one time setting

    const AppNav = new ApplicationNavigator(page1);
    await AppNav.NavigateToUMConfiguration();
    
    const UMConfig = new UMConfigPage(page1);
    await UMConfig.SetAllowReviewsToBeLocked();
    await UMConfig.ClickApply();

    //Step 4 - Navigate to Manage > Patients > patients default view and Click on Add Patients
    //Step 5 - Enter all the mandatory fields on Patient Details page and click on Save
    var text = await lib1.createptandadm();
    await page1.waitForTimeout(2000);

    const AddPaymentSource = new AddPaymentSourcePage(page1);
    var planDesc = '';
    planDesc =  await AddPaymentSource.createFinancial('AUTOTST', 'Plan Desc 111', 'Plan No 111');
    await page1.waitForTimeout(2000);

    //Step 6 - Click on Add Admission and Create an Admission with a UM status value = UM_Status01
    const manageContextNavigator = new ManageContextNavigator(page1);
    await manageContextNavigator.NavigateToAdmissionDetails1();

    const admissiondetailsPage = new AdmissiondetailsPage(page1);
    await admissiondetailsPage.SetUMStatus('Admit');
    await admissiondetailsPage.clickApply();

    //Step 7 - Click on Add Review from the left navigation bar. Enter all the mandatory fields and navigate to Review criteria page
    const reviewFacesheet = new ReviewFaceSheetPage(page1);
    await manageContextNavigator.ClickCreateNewReview();
    await reviewFacesheet.SelectReviewType('AUTOREVIEWTYPE');
    await reviewFacesheet.ClickNext();

    manageContextNavigator.NavigateToReviewCriteria();
    
    const reviewCriteriaPage = new ReviewCriteriaPage(page1);
    reviewCriteriaPage.ValidateUMStatus('Admit');

    //Step 8 - Enter all the mandatory fields and update the UM status value (Nothing Selected) and Click on Apply
    reviewCriteriaPage.SetUMStatus('--Nothing Selected--');
    reviewCriteriaPage.ClickApply();

    //Step 9 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    AppNav.NavigateToAdmissionDefaultView();
    const admissionDefaultView = new AdmissionDefaultViewPage(page1);
    await admissionDefaultView.SearchAdmission('AutoAccntNo'+ text);
    await admissionDefaultView.navigateActionDDBox('Admission Details');

    await admissiondetailsPage.ValidateUMStatus('--Nothing Selected--');

    //Step 10 - Edit the Review created in Step #8. Navigate to Review Criteria page and Update UM status value to UM_Status02 and Click on Apply
    await manageContextNavigator.NavigateToFirstReview();
    
    const reviewSummary = new ReviewSummaryPage(page1);
    await reviewSummary.ClickEditReview();

    manageContextNavigator.NavigateToReviewCriteria();
    reviewCriteriaPage.SetUMStatus('Test Automation');
    reviewCriteriaPage.ClickApply();

    //Step 11 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    AppNav.NavigateToAdmissionDefaultView();
    await admissionDefaultView.SearchAdmission('AutoAccntNo'+ text);
    await admissionDefaultView.navigateActionDDBox('Admission Details');
    await admissiondetailsPage.ValidateUMStatus('Test Automation');

    //Step 12 - From Left Nav bar, Expand the Reivew created in Step #8 and Click on the Communications tab within the Review.
    await manageContextNavigator.NavigateToFirstReview();
    await reviewSummary.ClickEditReview();

    await manageContextNavigator.NavigateToCommunications();

    //Step 13 - Click on ""Lock & Add"" button
    const communications = new CommunicationsPage(page1);
    await communications.clickLockAdd();

    //Step 14 - Enter all the mandatory fields and Update UM status value to ""Nothing Selected"" and Click on Apply
    const PayorCommunication = new PayorCommunicationPage(page1);
    await PayorCommunication.ValidateUMStatus('Test Automation');
    
    await PayorCommunication.SetPlanDescription(planDesc);
    await PayorCommunication.SetContactMethod();
    await PayorCommunication.SetUMStatus('--Nothing Selected--');
    await PayorCommunication.clickApply();

    //Step 15 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    AppNav.NavigateToAdmissionDefaultView();
    await admissionDefaultView.SearchAdmission('AutoAccntNo'+ text);
    await admissionDefaultView.navigateActionDDBox('Admission Details');
    await admissiondetailsPage.ValidateUMStatus('--Nothing Selected--');

    //Step 16 - Edit the Communication created in Step #14 and Update UM status value to UM_Status03 and Click on Apply
    await manageContextNavigator.NavigateToFirstReview();
    await reviewSummary.ClickEditReview();

    await manageContextNavigator.NavigateToCommunications();
    await communications.clickEditCommunication();
    await PayorCommunication.SetUMStatus('UM Status 3');
    await PayorCommunication.clickApply();

    //Step 17 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    AppNav.NavigateToAdmissionDefaultView();
    await admissionDefaultView.SearchAdmission('AutoAccntNo'+ text);
    await admissionDefaultView.navigateActionDDBox('Admission Details');
    await admissiondetailsPage.ValidateUMStatus('UM Status 3');

    //Step 18 - From Left Nav bar, Expand the Review Created in Step #8. Navigate to Communications >> Payor Authorizations tab (left nav bar) and Click on Add link for Payor Authorizations.
    await manageContextNavigator.NavigateToFirstReview();
    await reviewSummary.ClickEditReview();

    await manageContextNavigator.NavigateToCommunications();
    await communications.clickAddCommunication();
    await PayorCommunication.ValidateUMStatus('UM Status 3');

    //Step 19 - Enter all the mandatory fields and update UM status value to Nothing Selected and Click on Apply
    await PayorCommunication.SetPlanDescription(planDesc);
    await PayorCommunication.SetContactMethod();
    await PayorCommunication.SetUMStatus('--Nothing Selected--');
    await PayorCommunication.clickApply();

    //Step 20 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    AppNav.NavigateToAdmissionDefaultView();
    await admissionDefaultView.SearchAdmission('AutoAccntNo'+ text);
    await admissionDefaultView.navigateActionDDBox('Admission Details');
    await admissiondetailsPage.ValidateUMStatus('--Nothing Selected--');

    //Step 21 - From Left Nav bar, Expand the Review Created in Step #8. Navigate to Communications >> Payor Authorizations tab (left nav bar). Click on Edit link for Payor Authorizations created in Step #22 and Update UM status value to UM_Status04
    await manageContextNavigator.NavigateToPayorAuthorizations();
    const payorAuthorizations = new PayorAuthorizations(page1);
    await payorAuthorizations.AddPayorAuthorizations();
    const payorAuthorization = new PayorAuthorization(page1);

    await payorAuthorization.PlanDescription(planDesc);
    await payorAuthorization.ContactMethod('Phone: To Payor');
    await payorAuthorization.UMStatus('Admit');
    await payorAuthorization.Save_btn();

    //Step 22 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    await manageContextNavigator.NavigateToAdmissionDetails();
    await admissiondetailsPage.ValidateUMStatus('Admit');

    //Step 23 - From Left Nav bar, Expand the Review Created in Step #8. Navigate to Communications >> Payor Authorizations tab (left nav bar) and Click on Add link for UM Notes.
    await manageContextNavigator.NavigateToPayorAuthorizations();
    await payorAuthorizations.AddUMNotes();

    const addEditUMNotes = new AddEditUMNotes(page1);
    await addEditUMNotes.ValidateUMStatus('Admit');
    
    //Step 24 - Enter all the mandatory fields and update UM status value to ""Nothing Selected"" and Click on Apply
    await addEditUMNotes.UMNotesType('Admission');
    await addEditUMNotes.UMNotes('UM Notes');
    await addEditUMNotes.UMStatus('--Nothing Selected--');
    await addEditUMNotes.Save_btn();

    //Step 25 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    await manageContextNavigator.NavigateToAdmissionDetails();
    await admissiondetailsPage.ValidateUMStatus('--Nothing Selected--');

    //Step 26 - From Left Nav bar, Expand the Review Created in Step #8. Navigate to Communications >> Payor Authorizations tab (left nav bar). Click on Edit link for UM Notes created in Step #24 and Update UM status value to UM_Status05
    await manageContextNavigator.NavigateToPayorAuthorizations();
    await payorAuthorizations.EditPayorAuthorization();
    await addEditUMNotes.UMStatus('Test Automation');
    await addEditUMNotes.Save_btn();

    //Step 27 - Navigate to Manage >> Admissions >> Admissions Default view and search for the Admission created in Step#6. Thereby select Admission Details and click on GO
    await manageContextNavigator.NavigateToAdmissionDetails();
    await admissiondetailsPage.ValidateUMStatus('Test Automation');

    //Step 28 - From left panel, Go to Reports ->> Report library ->> Utilization Management ->> Review Detail Report and click on Run icon against the report
    await AppNav.NavigateToReports();

    //Step 29 - Perform the following : - Enable checkbox for 'Include D/C Patients' and 'Include Reviews with the Reviewer 'Not Specified'' and select 'ALL' for all options - Specify Dates and click on 'Generate
    const ReportLibrary = new ReportLibraryPage(page1);
    await ReportLibrary.SearchReviewDetailsReport('AUTOREVIEWTYPE','Open','Test Automation');

    //Step 30 - Search for the Account # created in step 6 (Ex : Account # = ReviewAdm01) and validate the Review UM status column value
    //Step 31 - From left panel Navigate to Manage ->> Reviews ->> Review Testing (Refer pre-condition)
    //Step 32 - From left panel, enter the Review Id (from step # 8 ; Review Id - 415768) in the searchable field and click on Search

    
});
