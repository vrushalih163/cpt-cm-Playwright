// Author - Micho Eshete Date: 08/19/2024
const { user, password } = process.env

import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { usersPage } from '../../pages/usersPage_27';
import { editNonOwnedUserPage } from '../../pages/editNonOwnedUserPage_127';
import { UserAdminPage } from '../../pages/UserAdminPage_1176.js';
import { OrganizationLookup } from '../../pages/OrganizationLookupPage_595';
import { associatedOrganizationsPage } from '../../pages/associatedOrganizationsPage_1177';


test('User Admin', async ({ page }) => {
    //Step 1: Login to the app
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);

    const AppNav = new ApplicationNavigator(page1);
    const UsersPage = new usersPage(page1);
    const nonOwnedUserPage = new editNonOwnedUserPage(page1);
    const userAdmin = new UserAdminPage(page1);
    const orgLookup = new OrganizationLookup(page1);
    const associatedOrg = new associatedOrganizationsPage(page1);
    // User Information Elements to be verified 
    const UserInformationElements = {
        PageHeader: 'Edit Non-Owned User', userInformation: 'User Information', userName: 'cmautomationuser001',
        userFirstName: 'cmfirstname', userLastName: 'cmlastname', displayName: 'cmfirstname cmlastname', departmentLabel: '', startPageList: 'Home Page',
        defaultOrgName: 'CM Automation Hospital', downloadCertificate: 'Download certificate'
    };

    //Step 2: Change org to Allscripts QA Hos 1
    const spanById = page.locator('#lblDefaultOrganization');
    await AppNav.NavigateToChangeOrg('Allscripts QA Hospital 1 (');

    // Array of links to be clicked  
    const elementNames = ['configureLink', 'menuSecurity', 'usersLink'];
    // Step 3: Navigate to Configure security Users
    await AppNav.ConfigureSecurityNavigation(elementNames);

    // Step 4: Search for a user and click on the user - page: 27 
    await UsersPage.searchNameOrUserName('cmlastname, cmfirstname');

    // Step 5: Verify Non-Owned User Information details - page: 127
    await nonOwnedUserPage.verifyNonOwnedUserUserInformation(UserInformationElements);

    //Step 6: Verify User Organizations and click on Edit link - page: 127 and assert the page - page: 1177
    await nonOwnedUserPage.clickOrgAssociationsEditLink();

    //Step 7: Verify User Admin page - 1176
    await userAdmin.UserAdminPageTitle('User Admin');
    
    // Step 8: Verify user admin page tab order page - 1176
    await userAdmin.testTabOrder();

    // Step 9: Verify clik on Edit Associations link
    await userAdmin.clickEditAssociationsLink();

    // Step 10: Verify landing on associated organizations page - 1177 
    await associatedOrg.associatedOrganizationsPageTitle('Select Associated Organizations');

    // Step 11: Change to ECIN Administrative Organization Hospital
    await AppNav.NavigateToChangeOrg('ECIN Administrative Organization');

    // setp 12: Search for ECIN admin organization
    //await page.pause();
    await orgLookup.SearchOrganization('Hospital', '226280');

    // Step 13: click on user icon
    await orgLookup.userIcon();

    // Step 14: Click on the user link
    await orgLookup.clickUserLogonLinkByUsername('cmautomationuser001');

    // Step 15: Verify user admin page title page - 338
    await userAdmin.UserAdminPageTitle('User Admin');
    

    // Step 16: Verify user admin page Tab order page - 338

    // Step 17: Verify click on Edit Associations link
    await userAdmin.clickEditAssociationsLink();

    // Step 18: Verify landing on associated organizations page - 343 
    await associatedOrg.associatedOrganizationsPageTitle('Select Associated Organizations');


});