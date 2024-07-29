// Author - Vrushali Honnatti Date:10th July, 2024

const {test} = require ("@playwright/test")
import { LIB } from '../../bizLibs/lib';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { Assessments } from '../../pages/AssessmentsPage_1224';
import {LoginPage} from '../../pages/PageLogin_111';

const {user, password} = process.env

test('CM Assessment', async ({ page }) => {
  
  //Step -1: Login to the app
  const Login = new LoginPage(page);
  await Login.login(user, password);

  const lib1 = new LIB(page);
  
  //Step 2- Create patient and admission
  await lib1.createptandadm();
  await page.waitForTimeout(2000);

  //Step 3 - Navigate to CM assessments under the patient context
  const ManageContextNav = new ManageContextNavigator();
  await ManageContextNav.NavigateTOCMAssessments();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  //await page.getByRole('link', { name: 'CM Assessments' }).click();

  //Step 4 - Click on Add assessmets button
  const objAssessments = new Assessments();
  await objAssessments.clickAddAssessmentButton();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  //await page.getByRole('link', { name: 'Add Assessment' }).click();

  //Step 5 - Select an assessment in the drop down
  await page.locator('#ddlAssessments').selectOption('557|932|1');

  //Step 6 - Click on next button and it navigates to EDit assessment page
  await page.goto('https://pv01.extendedcare.health/professional/Manage/CMAssessments/AdultSocialAssessment.aspx');

  //Step 7 - Fill first name and last name in the assessment 
  await page.locator('#txtPCFirstName').fill('hgjffgj');
  await page.locator('#txtPCLastName').click();
  await page.locator('#txtPCLastName').fill('ghfghjf');

  //Step 8 - save the assessment
  await page.getByRole('button', { name: 'Save', exact: true }).click();


});
