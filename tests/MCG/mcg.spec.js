// Author - Vrushali Honnatti Date:22nd July, 2024
import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { ReviewFaceSheetPage } from '../../pages/reviewFaceSheetPage_662';
import { ReviewCriteriaPage } from '../../pages/reviewCriteriaPage_663';
import { CommunicationsPage } from '../../pages/communicationsPage_664';
import { ReviewSummaryPage } from '../../pages/reviewSummaryPage_678';

test('MCG POC', async ({ CMApp }) => {

  const AppNav = new ApplicationNavigator(CMApp);
  //Step 1 - Login and change org to Allscripts QA Hos 1
  const page1 = await AppNav.NavigateToChangeOrg('Allscripts QA Hospital 1 (')

  const ManageContextNav = new ManageContextNavigator(page1);
  const ReviewFaceSheet = new ReviewFaceSheetPage(page1);
  const ReviewCriteria = new ReviewCriteriaPage(page1);
  const Communications = new CommunicationsPage(page1);
  const ReviewSummary = new ReviewSummaryPage(page1);

  //Step 2 - Create a new patient and admission
  const lib1 = new LIB(page1);
  await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  //Step 3 - Click on Create a new Review Button
  await ManageContextNav.ClickCreateNewReview();

  //Step 4 - Select a Review type and click on Next
  await ReviewFaceSheet.SelectReviewType('2258')
  await ReviewFaceSheet.ClickNext();

  //Step 5 - Navigate to Review Criteria
  await ManageContextNav.NavigateToReviewCriteria();

  //Step 6 - Launch MCG and get data from MCG
  await ReviewCriteria.LaunchMCGAndGetData();

  //Step 7 - Validate MCG data and click on Next
  await ReviewCriteria.ValidateMCGData('NCD Heart Transplants (260.9) Version 3');
  await ReviewCriteria.ClickNext();

  //Step 8 - Navigate to Communications and click on Finish
  await ManageContextNav.NavigateToCommunications();
  await Communications.clickFinish();

});