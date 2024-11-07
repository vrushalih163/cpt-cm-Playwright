import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';

test('test', async ({ page }) => {
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

  var library = new LIB(page1);
const uniquetext = await library.generateUniqueText(10);
const Accnumber = 'AutoAccntNo' + uniquetext;

  //Creating a Patient
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.waitForTimeout(3000);
  await page1.getByRole('link', { name: 'Patients ' }).click();
  await page1.waitForTimeout(3000);
  await page1.getByRole('link', { name: 'Patients Default View' }).click();
  await page1.waitForTimeout(3000);
  await page1.getByRole('link', { name: 'Add a Patient' }).click();
  await page1.waitForTimeout(3000);
  await page1.getByLabel('MRN:').fill(uniquetext);
  await page1.getByLabel('MRN:').press('Tab');
  await page1.getByLabel('First Name:', { exact: true }).click();
  await page1.getByLabel('First Name:', { exact: true }).fill('Pavan');
  await page1.getByLabel('Last Name:', { exact: true }).click();
  await page1.getByLabel('Last Name:', { exact: true }).fill('Shivakumar');
  await page1.getByText('Last Name: Preferred First').click();
  await page1.locator('#ECINCalendarDateOfBirth_Date').click();
  await page1.locator('#ECINCalendarDateOfBirth_Date').fill('01.01.2000');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(5000);

//Create Admission
  await page1.getByRole('link', { name: '' }).click();
  await page1.locator('#txtHospitalAdmissionID').click();
  await page1.locator('#txtHospitalAdmissionID').fill(Accnumber);
  await page1.locator('#dtPatientAdmission_Date').click();
  await page1.locator('#dtPatientAdmission_CalImg').click();
  await page1.locator('iframe[name="CalIFrame"]').contentFrame().locator('#Cell50').click();
  await page1.locator('#dtPatientAdmission_Time').click();
  await page1.locator('#dtPatientAdmission_Time').fill('10:00 AM');
  await page1.locator('#txtPrimaryDiagnosis').click();
  await page1.locator('#txtPrimaryDiagnosis').fill('Testing - Pavan');
  await page1.locator('#ddFacilityTypes').selectOption('874');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

//Assign facility to user in Myprofile page
  await page1.getByRole('link', { name: ' Info' }).click();
  await page1.getByRole('link', { name: 'My Profile' }).click();
  await page1.waitForTimeout(2000);
  await page1.locator('#linkEditFacilityTyypeAssignments').click();
  await page1.getByRole('cell', { name: 'Facility Name Starts With' }).getByRole('textbox').click();
  await page1.getByRole('cell', { name: 'Facility Name Starts With' }).getByRole('textbox').fill('Auto');
  await page1.getByRole('button', { name: 'Filter' }).click();
  await page1.getByRole('row', { name: 'AUTO Facility1', exact: true }).getByRole('checkbox').check();
  page1.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForTimeout(2000);

  // Change Org to ECIN to enable Privacy settings org Cap

  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'ECIN Administrative' }).click();
  await page1.waitForTimeout(3000);
  await page1.getByRole('link', { name: ' Admin' }).click();
  await page1.getByRole('link', { name: 'Organization Lookup' }).click();
  await page1.locator('#txtName').fill('CM Automation');
  await page1.getByRole('button', { name: 'Search' }).click();
  await page1.waitForTimeout(2000);
  await page1.locator('#OrganizationsGrid-data-row-entity-index-0').getByRole('link', { name: '' }).click();
  await expect(page1.getByText('Can Use Privacy Settings')).toBeVisible();
  await page1.getByLabel('Can Use Privacy Settings').check();
  await page1.locator('#txtbxComments').click();
  await page1.locator('#txtbxComments').fill('test');
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(3000);

  //Naviagte back to test org
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'CM Automation Hospital', exact: true }).click();
  await page1.waitForTimeout(2000);

  
  //search Admission and verify the facility related admission is displayed.
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Admissions ' }).click();
  await page1.getByRole('link', { name: 'Admissions Default View' }).click();
  await page1.getByRole('link', { name: 'Maximize Panel' }).click();
  await page1.locator('#ViewSearchBar_AccountNumber').click();
  await page1.locator('#ViewSearchBar_AccountNumber').fill(Accnumber);
  await page1.getByRole('button', { name: 'Search' }).click();
  await expect(page1.getByRole('cell', { name: 'Testing - Pavan', exact: true })).toBeVisible();

  // Change Org to ECIN to disable Privacy settings org Cap

 await page1.getByRole('link', { name: ' Home' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'Change Organization' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'ECIN Administrative' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: ' Admin' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'Organization Lookup' }).click();
 await page1.locator('#txtName').fill('CM Automation');
 await page1.getByRole('button', { name: 'Search' }).click();
 await page1.waitForTimeout(2000);
 await page1.locator('#OrganizationsGrid-data-row-entity-index-0').getByRole('link', { name: '' }).click();
 await expect(page1.getByText('Can Use Privacy Settings')).toBeVisible();
 await page1.getByLabel('Can Use Privacy Settings').uncheck();
 await page1.locator('#txtbxComments').click();
 await page1.locator('#txtbxComments').fill('test');
 await page1.getByRole('button', { name: 'Save' }).click();
 await page1.waitForLoadState('domcontentloaded');
 await page1.waitForTimeout(3000);


  //Naviagte back to test org
  await page1.getByRole('link', { name: ' Home' }).click();
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page1.waitForTimeout(2000);
  await page1.getByRole('link', { name: 'CM Automation Hospital', exact: true }).click();
  await page1.waitForTimeout(2000);
 
//Unassign facility to user in myprofile page
  await page1.getByRole('link', { name: ' Info' }).click();
  await page1.getByRole('link', { name: 'My Profile' }).click();
  await page1.locator('#linkEditFacilityTyypeAssignments').click();
  await page1.getByRole('cell', { name: 'Facility Name Starts With' }).getByRole('textbox').click();
  await page1.getByRole('cell', { name: 'Facility Name Starts With' }).getByRole('textbox').fill('Auto');
  await page1.getByRole('button', { name: 'Filter' }).click();
  await page1.getByRole('row', { name: 'AUTO Facility1', exact: true }).getByRole('checkbox').uncheck();
  page1.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.waitForTimeout(2000);


   // Change Org to ECIN to enable Privacy settings org Cap

   await page1.getByRole('link', { name: ' Home' }).click();
   await page1.waitForTimeout(2000);
   await page1.getByRole('link', { name: 'Change Organization' }).click();
   await page1.waitForTimeout(2000);
   await page1.getByRole('link', { name: 'ECIN Administrative' }).click();
   await page1.waitForTimeout(2000);
   await page1.getByRole('link', { name: ' Admin' }).click();
   await page1.getByRole('link', { name: 'Organization Lookup' }).click();
   await page1.locator('#txtName').fill('CM Automation');
   await page1.getByRole('button', { name: 'Search' }).click();
   await page1.waitForTimeout(2000);
   await page1.locator('#OrganizationsGrid-data-row-entity-index-0').getByRole('link', { name: '' }).click();
   await expect(page1.getByText('Can Use Privacy Settings')).toBeVisible();
   await page1.getByLabel('Can Use Privacy Settings').check();
   await page1.locator('#txtbxComments').click();
   await page1.locator('#txtbxComments').fill('test');
   await page1.getByRole('button', { name: 'Save' }).click();
   await page1.waitForLoadState('domcontentloaded');
   await page1.waitForTimeout(3000);
 
   //Naviagte back to test org
   await page1.getByRole('link', { name: ' Home' }).click();
   await page1.getByRole('link', { name: 'Change Organization' }).click();
   await page1.waitForTimeout(2000);
   await page1.getByRole('link', { name: 'CM Automation Hospital', exact: true }).click();
   await page1.waitForTimeout(2000);

  //search Admission and verify the facility related admission is not displayed
  await page1.getByRole('link', { name: ' Manage' }).click();
  await page1.getByRole('link', { name: 'Admissions ' }).click();
  await page1.getByRole('link', { name: 'Admissions Default View' }).click();
  await page1.getByRole('link', { name: 'Maximize Panel' }).click();
  await page1.locator('#ViewSearchBar_AccountNumber').click();
  await page1.locator('#ViewSearchBar_AccountNumber').fill(Accnumber);
  await page1.getByRole('button', { name: 'Search' }).click();
  await expect(page1.locator('p').filter({ hasText: 'No records found.' })).toBeVisible();
  await page1.waitForTimeout(2000);

 // Change Org to ECIN to disable Privacy settings org Cap

 await page1.getByRole('link', { name: ' Home' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'Change Organization' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'ECIN Administrative' }).click();
 await page1.getByRole('link', { name: ' Admin' }).click();
 await page1.waitForTimeout(2000);
 await page1.getByRole('link', { name: 'Organization Lookup' }).click();
 await page1.locator('#txtName').fill('CM Automation');
 await page1.getByRole('button', { name: 'Search' }).click();
 await page1.waitForTimeout(2000);
 await page1.locator('#OrganizationsGrid-data-row-entity-index-0').getByRole('link', { name: '' }).click();
 await expect(page1.getByText('Can Use Privacy Settings')).toBeVisible();
 await page1.getByLabel('Can Use Privacy Settings').uncheck();
 await page1.locator('#txtbxComments').click();
 await page1.locator('#txtbxComments').fill('test');
 await page1.getByRole('button', { name: 'Save' }).click();
 await page1.waitForLoadState('domcontentloaded');
 await page1.waitForTimeout(3000);

});