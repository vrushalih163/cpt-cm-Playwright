import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  let x1 = Math.floor((Math.random() * 100000) + 1);
  let x2 = "Sept20241";
  let mrn = x2.concat(x1);
  await page.goto('https://pv02.extendedcare.health/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#UserNameTextBox').click();
  await page1.locator('#UserNameTextBox').fill('Pavan Automation');
  await page1.locator('#UserNameTextBox').press('Tab');
  await page1.locator('#PasswordTextBox').fill('Organization=17');
  await page1.getByText('Log In').click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

  //await AppNav.NavigateToPatientsDefaultView();

  // Patient creation
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.getByLabel('MRN:').click();
  await page1.getByLabel('MRN:').fill(mrn);
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('AutoHCA');
  await page1.getByLabel('Last Name:', { exact: true }).fill('Test');
  await page1.locator('#ECINCalendarDateOfBirth_Date').fill('01.01.2000');
  await page1.locator('li').filter({ hasText: 'Date of Birth:' }).click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

// Admission Creation
  await page1.getByRole('link', { name: '' }).click();
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill(mrn);
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').locator('#Cell40').click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('10:00 PM');
  await page1.locator('#dtProjectedDischarge_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '20', exact: true }).click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtProjectedDischarge_Time').click();
  await page1.locator('#dtProjectedDischarge_Time').fill('8:00 PM');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('Testing -  HCA Changes ');
  await page1.locator('#dtPatientTypeOrder_CalImg').click();
  await page1.frameLocator('iframe[name="CalIFrame"]').getByRole('cell', { name: '10', exact: true }).click();
  await page1.locator('#dtPatientTypeOrder_Time').click();
  await page1.locator('#dtPatientTypeOrder_Time').fill('11:00 AM');
  await page1.locator('#ddFacilityTypes').selectOption('3371');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

  // Financial Creation
  await page1.locator('li').filter({ hasText: 'Admission Admission Details' }).locator('i').first().click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Financial' }).click();
  await page1.waitForTimeout(2000);
  await page1.locator('#LinkAddPaymentSource').click();
  await page1.locator('#listPaymentType').selectOption('54562');
  await page1.locator('#txtPlanNumber').click();
  await page1.locator('#txtPlanNumber').fill('Plan No 111');
  await page1.locator('#txtPlanNumber').press('Tab');
  await page1.locator('#txtPlanDescription').fill('Plan Decp 111');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

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

  var timezone = 'CT';
  const now = new Date();
  const options1 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
 const formatter1 = new Intl.DateTimeFormat('en-US', options1);
 var Time1 = formatter1.format(now);
 
 const options2 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
 const formatter2 = new Intl.DateTimeFormat('en-US', options2);
 var Time2 = formatter2.format(now);
 Time1 = Time1.replace(/^0+/, '');
 Time2 = Time2.replace(/^0+/, '');
 let resulttext = Time2 + ' ' + Time1 + ' ' +  '(' +  timezone  + ')';
 const text= await page1.locator('//td[@id="ECIN_Pagelet_Container"]/div//table[@class="clsWorklist"]/tbody/tr[2]/td[1]').textContent();
 console.log('text:', text);
 console.log('result:', resulttext);

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
  //var timezone = 'CT';
  const now1 = new Date();
  const options3 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  const formatter3 = new Intl.DateTimeFormat('en-US', options3);
  var Time3 = formatter3.format(now1);

  const options4 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter4 = new Intl.DateTimeFormat('en-US', options4);
  var Time4 = formatter4.format(now1);
  Time3 = Time3.replace(/^0+/, '');
  Time4 = Time4.replace(/^0+/, '');
  let result2 = Time4 + ' ' + Time3 + ' ' +  '(' +  timezone  + ')';
  await expect(page1.locator('//td[@id="ECIN_Pagelet_Container"]/div//table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/a')).toContainText(result2);
  console.log(result2);

//   await expect(page1.locator('#dgReviewVersion')).toContainText('9/19/2024 5:34 AM (CT)');
//   await expect(page1.locator('#dgReviewVersion').getByRole('cell', { name: '/19/2024 5:34 AM (CT)' })).toBeVisible();

  const now3 = new Date();
  const options7 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  const formatter7 = new Intl.DateTimeFormat('en-US', options7);
  var Time7 = formatter7.format(now3);
  
  const options8 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter8 = new Intl.DateTimeFormat('en-US', options8);
  var Time8 = formatter8.format(now3);
  Time7 = Time7.replace(/^0+/, '');
  Time8 = Time8.replace(/^0+/, '');
  let result4 = Time8 + ' ' + Time7 + ' ' +  '(' +  timezone  + ')';
  await expect(page1.locator('#dgReviewVersion')).toContainText(result4);
  console.log(result4);

  await page1.getByRole('button', { name: 'Finish', exact: true }).click();
  await page1.waitForTimeout(2000);
  await page1.getByText('ADM').first().click();
  await page1.waitForTimeout(2000);

 // await expect(page1.locator('//table[@id="Table1"]/tbody/tr[4]/td[2]')).toContainText('9/12/2024 8:15 AM (CT)');
 

  const now2 = new Date();
  const options5 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  const formatter5 = new Intl.DateTimeFormat('en-US', options5);
  var Time5 = formatter5.format(now2);
  
  const options6 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter6 = new Intl.DateTimeFormat('en-US', options6);
  var Time6 = formatter6.format(now2);
  
  Time5 = Time5.replace(/^0+/, '');
  Time6 = Time6.replace(/^0+/, '');
  let MostRecentRevision = Time6 + ' ' + Time5 + ' ' +  '(' +  timezone  + ')';
  const MRR= await page1.locator('//table[@id="Table1"]/tbody/tr[4]/td[2]').textContent();
  console.log('MRRvalue:', MRR.trim());
  await expect(MRR.trim()).toContain(MostRecentRevision);
  console.log(MostRecentRevision);

  // await expect(page1.getByRole('cell', { name: '9/25/2024 4:38 AM (CT)', exact: true })).toBeVisible();
  // await expect(page1.locator('#//table[@id="Table1"]/tbody/tr[5]/td[2]')).toContainText('9/25/2024 4:38 AM (CT)');

  
  const now4 = new Date();
  const options9 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  const formatter9 = new Intl.DateTimeFormat('en-US', options9);
  var Time9 = formatter9.format(now4);
  
  const options10 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter10 = new Intl.DateTimeFormat('en-US', options10);
  var Time10 = formatter10.format(now4);
  Time9 = Time9.replace(/^0+/, '');
  Time10 = Time10.replace(/^0+/, '');
  let ReviewCompletedOn= Time10 + ' ' + Time9 + ' ' +  '(' +  timezone  + ')';
  //await expect(page1.locator('//table[@id="Table1"]/tbody/tr[5]/td[2]')).toContainText(ReviewCompletedOn);
  const RCO= await page1.locator('//table[@id="Table1"]/tbody/tr[5]/td[2]').textContent();
  console.log('RCOvalue:', RCO.trim());
  await expect(RCO.trim()).toContain(ReviewCompletedOn);
  console.log(ReviewCompletedOn);

  const now5 = new Date();
  const options11 = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true };
  const formatter11 = new Intl.DateTimeFormat('en-US', options11);
  var Time11 = formatter11.format(now5);
  
  const options12 = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter12 = new Intl.DateTimeFormat('en-US', options12);
  var Time12 = formatter12.format(now5);
  Time11 = Time11.replace(/^0+/, '');
  Time12 = Time12.replace(/^0+/, '');
  let FirstContactDate = Time12 + ' ' + Time11 + ' ' +  '(' +  timezone  + ')';
  const FCO= await page1.locator('//table[@class="clsWorklist"]//tr[2]/td[1]').textContent();
  console.log('FCOvalue:', FCO.trim());
  await expect(FCO.trim()).toContain(FirstContactDate);
  console.log(FirstContactDate);

  await page1.getByRole('link', { name: '', exact: true }).click();

});

