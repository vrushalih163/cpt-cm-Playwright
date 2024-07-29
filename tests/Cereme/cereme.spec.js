// Author - Vrushali Honnatti Date:10th July, 2024
import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { ReviewFaceSheetPage } from '../../pages/reviewFaceSheetPage_662';
import { ReviewCriteriaPage } from '../../pages/reviewCriteriaPage_663';
import { CommunicationsPage } from '../../pages/communicationsPage_664';
import { ReviewSummaryPage } from '../../pages/reviewSummaryPage_678';

test('Cereme POC', async ({ CMApp }) => {

  const AppNav = new ApplicationNavigator(CMApp);

  //Step 1 - Login and change org to Allscripts QA Hos 1
  const page1 = await AppNav.NavigateToChangeOrg('Allscripts QA Hospital 1 (')

  const ManageContextNav = new ManageContextNavigator(page1);
  const AdmissionDetails = new AdmissiondetailsPage(page1);
  const ReviewFaceSheet = new ReviewFaceSheetPage(page1);
  const ReviewCriteria = new ReviewCriteriaPage(page1);
  const Communications = new CommunicationsPage(page1);
  const ReviewSummary = new ReviewSummaryPage(page1);

  //Step 2 - Create a new patient and admission
  const lib1 = new LIB(page1);
  await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  //Step 3 - navigate to admission details page
  await ManageContextNav.NavigateToAdmissionDetails();

  //Step 4 - select a cereme specific facility
  await AdmissionDetails.selectFacility('Allscripts QA Hospital 1Test');

  //Step 5 - Click on Apply
  await AdmissionDetails.clickApply()

  //Step 6 - Click on Create a new Review Button
  await ManageContextNav.ClickCreateNewReview();

  //Step 7 - Select a Review type and click on Next
  await ReviewFaceSheet.SelectReviewType('2258')
  await ReviewFaceSheet.ClickNext();

  //Step 8 - Navigate to Review Criteria
  await ManageContextNav.NavigateToReviewCriteria();

  //Step 9 - Launch Cerme and bring back data from Cerme
  await ReviewCriteria.LaunchCermeAdGetData();

  //Step 10 - Validate Cerme data and click on Next
  await ReviewCriteria.ValidateCermeData('Acute Kidney Injury');
  await ReviewCriteria.ClickNext();

  //Step 11 - Navigate to Communications and click on Finish
  await ManageContextNav.NavigateToCommunications();
  await Communications.clickFinish();

});