
import { test, expect } from '@playwright/test';



test('CM: CRI Info Left Navigation Icon', async ({ page }) => {

  await page.goto('https://pv02.extendedcare.health/professional/home/logon.aspx');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#UserNameTextBox').click();
  await page.locator('#UserNameTextBox').fill('automation');
  await page.locator('#PasswordTextBox').click();
  await page.locator('#PasswordTextBox').fill('Organization=17');
  await page.getByText('Log In').click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByRole('link', { name: 'Change Organization' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('link', { name: 'Allscripts QA Provider 50 -' }).click();
  await page.waitForTimeout(4000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('link', { name: ' Info' })).toBeVisible();
  await expect(page.locator('#MenuBar_Info_Header')).toContainText('Info');
  await page.getByRole('link', { name: ' Info' }).click();
  await expect(page.locator('div').filter({ hasText: /^Info$/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Profile' })).toBeVisible();
  await page.getByRole('link', { name: 'My Profile' }).click();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('User Information')).toBeVisible();
  await expect(page.getByText('CarePort Start Page:')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  var attributeValue = await page.locator('select#DropDownListEcinStartPage').getAttribute('disabled');
  await page.waitForTimeout(2000);
  await page.waitForLoadState('domcontentloaded');
  //attributeValue = attributeValue.toString();
  await expect(attributeValue).toBe('disabled');

//0PTIONAL

 // await page.getByRole('link', { name: ' Home' }).click();

 // await page.getByRole('link', { name: 'Home Page' }).click();

 // await expect(page.getByRole('heading', { name: 'Welcome Back automation' })).toBeVisible();

});

