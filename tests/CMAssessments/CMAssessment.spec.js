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
  const page1 = await Login.login(user, password);

  const lib1 = new LIB(page1);
  
  //Step 2- Create patient and admission
  await lib1.createptandadm();
  await page1.waitForTimeout(2000);

  //Step 3 - Navigate to CM assessments under the patient context
  const ManageContextNav = new ManageContextNavigator(page1);
  await ManageContextNav.NavigateTOCMAssessments();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  //await page1.getByRole('link', { name: 'CM Assessments' }).click();

  //Step 4 - Click on Add assessmets button
  const objAssessments = new Assessments(page1);
  await objAssessments.clickAddAssessmentButton();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

});
