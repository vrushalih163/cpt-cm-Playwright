//Author Asha Fernandes Date: 20th August, 2024
//import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { YourCompanyProfileFacilityPage } from '../../pages/yourcompanyprofilefacilityPage_268';
const {user, password} = process.env
test('CM: Verify the Updated RM Contact Information page', async ({ page }) => {
  // Login to Org
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const YourCompanyProfileFacility = new YourCompanyProfileFacilityPage(page1);
  await expect(page1.locator('h2')).toContainText('Welcome Back automation');
  await expect(page1.getByTitle('Home Page')).toBeVisible();
  await page1.getByRole('link', { name: ' Home' }).click();
  // Change org Allscripts Provider Online Second
  await page1.getByRole('link', { name: 'Change Organization' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Allscripts Provider Online Second' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByTitle('Home Page')).toBeVisible();
  await expect(page1.locator('h2')).toContainText('Welcome Back automation');
  // Click on Configure > Your Compant Profile > Contact Information
  await page1.getByRole('link', { name: ' Configure' }).click();
  await page1.getByRole('link', { name: 'Your Company Profile' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page1.getByRole('link', { name: 'Contact Information' }).click();
  await expect(page1.getByText('Your Company Profile (')).toBeVisible();
  await expect(page1.getByText('Enter the following to')).toBeVisible();
  await expect(page1.locator('#PageHeader')).toContainText('Your Company Profile (Facility)');
  // Verify the text
  await expect(page1.locator('#Table1')).toContainText('Enter the following to display in your organization profile details:');
  await YourCompanyProfileFacility.clicktextboxemail();
  // Clear Email field and verify Email field validation message
  await YourCompanyProfileFacility.filltextboxemail('');
  await page1.getByRole('button', { name: 'Apply' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#PageValidationSummary')).toContainText('\'Email Address\' is a required field');
  await YourCompanyProfileFacility.clicktextboxemail();
  await YourCompanyProfileFacility.filltextboxemail('asha.fernandes@wellsky.com');
  await YourCompanyProfileFacility.clickphoneextension();
  await YourCompanyProfileFacility.fillphoneextension('');
  await YourCompanyProfileFacility.clickphonenumber();
  await YourCompanyProfileFacility.pressphonenumber();
  await YourCompanyProfileFacility.pressphonenumber();
  await YourCompanyProfileFacility.fillphonenumber('');
  await YourCompanyProfileFacility.clickphoneexchange();
  await YourCompanyProfileFacility.pressphoneexchange();
  await YourCompanyProfileFacility.fillphoneexchange('');
  await YourCompanyProfileFacility.clickphoneareacode();
  await YourCompanyProfileFacility.pressphoneareacode();
  await YourCompanyProfileFacility.fillphoneareacode(''); 
  // Clear Phone field and verify Phone field validation message
  await page1.getByRole('button', { name: 'Apply' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.getByText('Phone Number is required.')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#PageValidationSummary')).toContainText('Phone Number is required.');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ctl0_TextBoxEmail')).toHaveValue('asha.fernandes@wellsky.com');
  await YourCompanyProfileFacility.clickphoneareacode();
  await YourCompanyProfileFacility.fillphoneareacode('919');
  await YourCompanyProfileFacility.clicktextboxemail();
  await YourCompanyProfileFacility.clicktextboxemail();
  await YourCompanyProfileFacility.clicktextboxemail();
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.filltextboxemail('asha.flsky.com');
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.presstextboxemail();
  await YourCompanyProfileFacility.filltextboxemail('asha.com');

  await page1.getByRole('button', { name: 'Apply' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
// Clear Email and Phone field and verify validation message
  await expect(page1.getByText('\'Email Address\' must be a valid emailPhone number is invalid.')).toBeVisible();
  await expect(page1.locator('#PageValidationSummary')).toContainText('\'Email Address\' must be a valid emailPhone number is invalid.');
  await page1.locator('#ctl0_TextBoxEmail').click({
    clickCount: 3
  });
  await page1.locator('#ctl0_TextBoxEmail').fill('asha.fernandes@wellsky.com');
  await page1.locator('#ctl0_Phone_Exchange').click();
  await page1.locator('#ctl0_Phone_Exchange').fill('898');
  await page1.locator('#ctl0_Phone_Number').fill('9878');
  await page1.locator('#ctl0_Phone_Extension').fill('99899');
  await page1.locator('#ctl0_TextBoxFirstName').click();
  await page1.locator('#ctl0_TextBoxFirstName').fill('Automation');
  await page1.locator('input[name="ctl0\\$TextBoxLastName"]').click();
  await page1.locator('input[name="ctl0\\$TextBoxLastName"]').fill('Test');
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').fill('979');
  await page1.locator('#ctl0_PagerPhone_AreaCode').click();
  await page1.locator('#ctl0_PagerPhone_AreaCode').fill('787');
  await page1.getByRole('button', { name: 'Apply' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
// Enter invalid Fax and Pager Phone field and verify validation message
 // await expect(page1.getByText('Phone number is invalid.Phone')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ctl0_TextBoxFirstName')).toHaveValue('Automation');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('input[name="ctl0\\$TextBoxLastName"]')).toHaveValue('Test');
  await page1.locator('#ctl0_FaxPhone_Exchange').click();
  await page1.locator('#ctl0_FaxPhone_Exchange').fill('878');
  await page1.locator('#ctl0_FaxPhone_Number').fill('9898');
  await page1.locator('#ctl0_PagerPhone_Exchange').click();
  await page1.locator('#ctl0_PagerPhone_Exchange').fill('666');
  await page1.locator('#ctl0_PagerPhone_Number').fill('6666');
  await page1.getByRole('button', { name: 'Apply' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ctl0_TextBoxFirstName')).toHaveValue('Automation');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('input[name="ctl0\\$TextBoxLastName"]')).toHaveValue('Test');
  await expect(page1.locator('#ctl0_TextBoxEmail')).toHaveValue('asha.fernandes@wellsky.com');
  await expect(page1.locator('#ctl0_Phone_AreaCode')).toHaveValue('919');
  await expect(page1.locator('#ctl0_Phone_Exchange')).toHaveValue('898');
  await expect(page1.locator('#ctl0_Phone_Number')).toHaveValue('9878');
  await expect(page1.locator('#ctl0_Phone_Extension')).toHaveValue('99899');
  await expect(page1.locator('#ctl0_FaxPhone_AreaCode')).toHaveValue('979');
  await expect(page1.locator('#ctl0_FaxPhone_Exchange')).toHaveValue('878');
  await expect(page1.locator('#ctl0_FaxPhone_Number')).toHaveValue('9898');
  await expect(page1.locator('#ctl0_PagerPhone_AreaCode')).toHaveValue('787');
  await expect(page1.locator('#ctl0_PagerPhone_Exchange')).toHaveValue('666');
  await expect(page1.locator('#ctl0_PagerPhone_Number')).toHaveValue('6666');
  await page1.getByRole('link', { name: 'Level of Care' }).click();
  await page1.getByRole('link', { name: 'Contact Information' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page1.locator('#ctl0_TextBoxEmail')).toHaveValue('asha.fernandes@wellsky.com');
  await expect(page1.locator('#ctl0_TextBoxFirstName')).toHaveValue('Automation');
  await expect(page1.locator('#ctl0_Phone_Number')).toHaveValue('9878');
  await expect(page1.locator('#ctl0_PagerPhone_Number')).toHaveValue('6666');
  await page1.locator('#ctl0_TextBoxFirstName').click();
  await page1.locator('#ctl0_TextBoxFirstName').fill('');
  await page1.locator('input[name="ctl0\\$TextBoxLastName"]').click();
  await page1.locator('input[name="ctl0\\$TextBoxLastName"]').fill('');
  await page1.locator('#ctl0_FaxPhone_Number').click();
  await page1.locator('#ctl0_FaxPhone_Number').press('ArrowRight');
  await page1.locator('#ctl0_FaxPhone_Number').press('ArrowRight');
  await page1.locator('#ctl0_FaxPhone_Number').fill('');
  await page1.locator('#ctl0_FaxPhone_Exchange').click({
    clickCount: 3
  });
  await page1.locator('#ctl0_FaxPhone_Exchange').fill('');
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').click();
  await page1.locator('#ctl0_FaxPhone_AreaCode').click({
    clickCount: 3
  });
  await page1.locator('#ctl0_FaxPhone_AreaCode').fill('');
  await page1.locator('#ctl0_PagerPhone_Number').click({
    clickCount: 3
  });
  await page1.locator('#ctl0_PagerPhone_Number').fill('');
  await page1.locator('#ctl0_PagerPhone_Exchange').click({
    clickCount: 3
  });
  await page1.locator('#ctl0_PagerPhone_Exchange').click();
  await page1.locator('#ctl0_PagerPhone_Exchange').click();
  await page1.locator('#ctl0_PagerPhone_Exchange').click();
  await page1.locator('#ctl0_PagerPhone_Exchange').fill('66');
  await page1.locator('#ctl0_PagerPhone_Exchange').press('ArrowRight');
  await page1.locator('#ctl0_PagerPhone_Exchange').fill('');
  await page1.locator('#ctl0_PagerPhone_AreaCode').click();
  await page1.locator('#ctl0_PagerPhone_AreaCode').press('ArrowRight');
  await page1.locator('#ctl0_PagerPhone_AreaCode').fill('');
  await page1.goto('https://pv02.extendedcare.health/professional/Configure/CompanyProfileFacilityProvider.aspx');
});