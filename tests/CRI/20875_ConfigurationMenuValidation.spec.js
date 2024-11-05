// Author - Nikhil Hiwarkhede: Story ID: CCM:20291

import { LIB } from '../../bizLibs/lib';
import { test, expect } from '../../pages/PageStart';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const {user, password} = process.env
test('CRI Configure Left Navigation Icon - MVP', async ({ page }) => {
  
  // This method is created for wait execution for given time in milliseconds
  async function customWait(page,TimeInMilliSeconds){
  await page.waitForTimeout(TimeInMilliSeconds);
  await page.waitForLoadState('domcontentloaded');
  }

  // Step1: Login to Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const Navigate = new ApplicationNavigator(page1);
  await Navigate.NavigateToChangeOrg('Allscripts QA Provider 50 - PV2 DB Split Testing/Allscripts');
  await expect(page1.getByRole('heading', { name: 'CarePort Referral Intake' })).toBeVisible();
  await expect(page1.locator('h3')).toContainText('CarePort Referral Intake');

  // Step 2&3: Left Nav "Configure" icon and SUb Menu under Configure option
  await expect(page1.locator('#MenuBar_Configure_Header')).toContainText('Configure');

  // Step 4: To verify Configurable list submenu option under Configure
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Configurable Lists' })).toBeVisible();
  await expect(page1.locator('//a[@name= "configure_configurable_lists"]')).toContainText('Configurable Lists');
  await page1.getByRole('link', { name: 'Configurable Lists' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('List:')).toBeVisible();
  await expect(page1.getByRole('button', { name: 'Add' })).toBeVisible();

  // Step 5: To verify "Contact list" submenu option under Configure  
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Contact List' })).toBeVisible();
  await expect(page1.locator('//a[@name= "configure_contact_list"]')).toContainText('Contact List');
  await page1.getByRole('link', { name: 'Contact List' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('heading', { name: 'Contact List' })).toBeVisible();
  await expect(page1.getByText('Configurations', { exact: true })).toBeVisible();
  await expect(page1.getByText('Add or Edit Schedule')).toBeVisible();
  await expect(page1.getByLabel('Add or Edit Schedule').getByText('User', { exact: true })).toBeVisible();
  // Step 6: To verify "News Items" submenu option under Configure    
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'News Items' })).toBeVisible();
  await expect(page1.locator('//a[@name= "configure_news_items"]')).toContainText('News Items');
  await page1.getByRole('link', { name: 'News Items' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: '[add]' })).toBeVisible();
  await page1.getByRole('link', { name: '[add]' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Title:')).toBeVisible();
  await expect(page1.getByText('Details:')).toBeVisible();
  await expect(page1.getByText('Expiration Date:')).toBeVisible();
  await expect(page1.locator('//div[@class="ion-action-bar-LowerLevelpanel"]')).toBeVisible();
  await customWait(page1,2000);
  
  // Step 7: To verify "Organization Configuration" submenu option under Configure  
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Organization Configuration' })).toBeVisible();
  await expect(page1.locator('//a[@name= "configure_organization_configuration"]')).toContainText('Organization Configuration');
  await page1.getByRole('link', { name: 'Organization Configuration' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Time Zone:')).toBeVisible();
  await expect(page1.getByText('State Identification Number:')).toBeVisible();

  // Step 8: To verify "Security" submenu option under Configure   
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Security ' })).toBeVisible();
  await expect(page1.locator('#Configure_Header_Configure_Header_Menu_Security')).toContainText('Security');
  await page1.getByRole('link', { name: 'Security ' }).click();
  await customWait(page1,2000);

  // Step 9: To verify "Address Filters" submenu option under Configure>Security
  await expect(page1.getByRole('link', { name: 'Address Filters' })).toBeVisible();
  await expect(page1.locator('//a[@name="security_address_filters"]')).toContainText('Address Filters');
  await page1.getByRole('link', { name: 'Address Filters' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Grant Access for unknown')).toBeVisible();
  await expect(page1.locator('#AccessRadioButtonList')).toContainText('Grant Access for unknown addresses');
  await expect(page1.getByText('Deny Access for unknown')).toBeVisible();
  await expect(page1.locator('#AccessRadioButtonList')).toContainText('Deny Access for unknown addresses');
  await customWait(page1,2000);

  // Step 10: To verify "Security Configuration" submenu option under Configure>Security
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: 'Security ' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Security Configuration' })).toBeVisible();
  await expect(page1.locator('//a[@name="security_security_configuration"]')).toContainText('Security Configuration');
  await page1.getByRole('link', { name: 'Security Configuration' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('Lockout duration:')).toBeVisible();
  
  // Step 11: To verify "Users" submenu option under Configure>Security (//a[@id="MenuBar_Configure_Header"])
  await page1.locator('#MenuBar_Configure_Header').click();
  await customWait(page1,2000);
  await page1.getByRole('link', { name: 'Security ' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Users' })).toBeVisible();
  await expect(page1.locator('//a[@name="security_users"]')).toContainText('Users');
  await page1.getByRole('link', { name: 'Users' }).click();
  await customWait(page1,2000);

  // Step 12: To verify "Security Configuration" submenu option under Configure>Security
  await expect(page1.getByText('Name Filter:')).toBeVisible();
  await expect(page1.getByRole('button', { name: 'Refresh List' })).toBeVisible();
  await expect(page1.getByRole('link', { name: 'Add User' })).toBeVisible();
  await page1.getByPlaceholder('Type Name or Username').click();
  await page1.getByPlaceholder('Type Name or Username').fill('automation');
  await customWait(page1,2000);
  await page1.getByRole('button', { name: 'Refresh List' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'automation, qa' })).toBeVisible();
  await page1.getByRole('link', { name: 'automation, qa' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('User Information')).toBeVisible();
  await expect(page1.getByText('Username:')).toBeVisible();
  await expect(page1.locator('#LabelUserNameValue')).toBeVisible();
  await customWait(page1,2000);
  
  // Step 13: To verify “CarePort Start Page” setting.
  await expect(page1.getByText('CarePort Start Page:')).toBeVisible();
  var attributeValue = await page1.locator('select#DropDownListEcinStartPage').getAttribute('disabled');
  await customWait(page1,2000);
  await expect(attributeValue).toBe('disabled');

  // Step 14: To verify "Security Group" submenu option under Configure.
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Security Group ' })).toBeVisible();
  await expect(page1.locator('[id="Configure_Header_Configure_Header_Menu_Security\\ Group"]')).toContainText('Security Group');
  await page1.getByRole('link', { name: 'Security Group ' }).click();
  await customWait(page1,2000);

  // Step 15: To verify "Manage Security Groups" submenu option under Configure>Security Groups.
  await expect(page1.getByRole('link', { name: 'Manage Security Groups' })).toBeVisible();
  await expect(page1.locator('//a[@name="security_group_manage_security_groups"]')).toContainText('Manage Security Groups');
  await page1.getByRole('link', { name: 'Manage Security Groups' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Add Security Group' })).toBeVisible();
  await expect(page1.locator('#ApiGridManageSecurityGroup_action_0')).toContainText('Add Security Group');
  await expect(page1.getByRole('link', { name: 'Security Group Name' })).toBeVisible();
  await expect(page1.locator('#ApiGridManageSecurityGroup')).toContainText('Security Group Name');
  await customWait(page1,2000);
  
  // Step 16: To verify "Your Company Profile" submenu option under Configure.
  await page1.getByRole('link', { name: ' Configure' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'Your Company Profile' })).toBeVisible();
  await expect(page1.locator('//a[@name="configure_your_company_profile"]')).toContainText('Your Company Profile');
  await page1.getByRole('link', { name: 'Your Company Profile' }).click();
  await customWait(page1,2000);
  await expect(page1.getByRole('link', { name: 'General (zip, state)' })).toBeVisible();
  await page1.getByRole('link', { name: 'General (zip, state)' }).click();
  await customWait(page1,2000);
  await expect(page1.getByText('General Information')).toBeVisible();
  await expect(page1.getByRole('strong')).toContainText('General Information');

  console.log('Test Case Passed and Completed');
});