const { user, password, ExternalAuthProvider, ECINHospital } = process.env;
import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { OrganizationLookup } from '../../pages/OrganizationLookupPage_595.js';
import { OrganizationDetailsPage } from '../../pages/organizationDetailsPage_287.js';
import { editOwnedUser } from '../../pages/editOwnedUserPage_114';
import { usersPage } from '../../pages/usersPage_27';

test('Home Page - RM Online Help - RM Online Help is accessible via the Home Page', async ({ page }) => {

  const userFirstName = 'WellSky';
  const userLastName = 'Automation';
  const SAMLAuthProvider = 'AzureKiranSAML';

  //Senario 1:
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);
  const AppNav = new ApplicationNavigator(page1);
  await AppNav.NavigateToChangeOrg('ECIN Administrative Hospital');
  await AppNav.adminOrgLookupNavigation();

  const orgLookup = new OrganizationLookup(page1);
  await orgLookup.searchAnOrganization('Facility Provider', ExternalAuthProvider);
  await orgLookup.clickOrgnizationSettingsicon();

  const OrgDetails = new OrganizationDetailsPage(page1);
  await OrgDetails.ClickExternalAuthCheckbox(true, SAMLAuthProvider);
  await OrgDetails.clickSaveButton();

  await AppNav.NavigateToChangeOrg(ExternalAuthProvider);
  await AppNav.clickConfigureSecurityUsers();
  const users = new usersPage(page1);
  await users.searchNameOrUserName(userLastName + ', ' + userFirstName);
  await users.clickUserName(userLastName + ', ' + userFirstName);

  const ownedUser = new editOwnedUser(page1);
  await ownedUser.ClickExternalAuthCheckbox(true);
  await ownedUser.clickSaveButton();
  await AppNav.LogOff();
  await page1.close();

  const browser = await chromium.launch();
  const page3 = await browser.newPage();

  const Login2 = new LoginPage(page3);

  const page2 = await Login2.SAMLLogin('AzureKiranSAML');

  await page2.close();

  //Scenario 2:
  const browser2 = await chromium.launch();
  const page4 = await browser2.newPage();

  const Login3 = new LoginPage(page4);

  const page5 = await Login3.login(user, password);
  const AppNav2 = new ApplicationNavigator(page5);
  await AppNav2.NavigateToChangeOrg(ECINHospital);
  await AppNav2.adminOrgLookupNavigation();

  const orgLookup2 = new OrganizationLookup(page5);
  await orgLookup2.searchAnOrganization('Facility Provider', ExternalAuthProvider);
  await orgLookup2.clickOrgnizationSettingsicon();

  const OrgDetails2 = new OrganizationDetailsPage(page5);
  await OrgDetails2.ClickExternalAuthCheckbox(false, SAMLAuthProvider);
  await OrgDetails2.clickSaveButton();

  await AppNav2.LogOff();
  await page3.close();

  const page6 = await Login.SAMLLoginInvalid('AzureKiranSAML');
  await page6.close();

  //Scenario 4:
});