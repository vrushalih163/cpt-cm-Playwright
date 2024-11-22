// Author - Micho Eshete Date: 11/04/2024
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AddSecurityGroups } from '../../pages/AddSecurityGroupPage_1274';
import { AddUserPage } from '../../pages/AddUser_115';
import { usersPage } from '../../pages/usersPage_27';
import { editOwnedUser } from '../../pages/editOwnedUserPage_114';
import { editUserRoles } from '../../pages/editUserRolesPages_117';
import { MyProfile } from '../../pages/myProfilePage_4';
import { AssociateSecurityGroups } from '../../pages/AssociateSecurityGroupsPage_1277';
import { ManageSecurityGroups } from '../../pages/ManageSecurityGroupsPage_1273';

const { user, password } = process.env;



test('Standard Edit Owned User & My Profile - Roles associated at user level and Roles associated at security group level', async ({ page }) => {

  // Step -1: Login into CM application 
  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  // Initializes a new instance of the ApplicationNavigator class.
  const Appnav = new ApplicationNavigator(page1);

  //Calling & Passing Org name to NavigateToChangeOrg method
  //await Appnav.NavigateToChangeOrg('Allscripts QA Hospital 2 (harpo - 226281)');

  // Step 2 - Go to Configure / Security Group / Manage Security Groups
  await Appnav.NavigateToManageSecurityGroups();

  // Instance of AddSecurityGroups class used to manage security groups.
  const AddSGP = new AddSecurityGroups(page1);

  // Step 3 - Create a new Security Group
  const securityGroupName = 'JS Security 1 & (123. JS Security 1 & (12end';
  const securityGroupDescription = 'JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security end';
  await AddSGP.createSecurityGroup(securityGroupName, securityGroupDescription);

  // Step 4 - Go to Configure / Security / Users
  await Appnav.clickConfigureSecurityUsers();

  // Create an instance of AddUser
  const AddUser = new AddUserPage(page1);

  // Step 5 - Create a new user and capture the username and password
  const { newUserName, newUserPassword, lName, fName } = await AddUser.createNewUser();

  // logout as the current user
  await Appnav.LogOff();

  // Step 6 - login as the new user creaatd in step 5
  //const Login2 = new LoginPage(page); 
  const page2 = await Login.login(newUserName, newUserPassword);

  // Create a new instance of ApplicationNavigator for the new page
  const Appnav2 = new ApplicationNavigator(page2);

  // Go to Configure / Security / Users
  await Appnav2.clickConfigureSecurityUsers();

  // Step 7 - Search for the user created in step 5 and click on the user name
  const users = new usersPage(page2);
  await users.searchNameOrUserName(lName + ', ' + fName);
  await users.clickUserName(lName + ', ' + fName);

  // Step 8 - Click on the 'Edit' link next to 'User Roles'
  const ownedUser = new editOwnedUser(page2);
  await ownedUser.clickEditUserRolesLInk();

  // Uncheck the checkboxes next to all roles except 'Discharge Planner
  const editUser = new editUserRoles(page2);
  await editUser.uncheckMultipleRolesExcept('Discharge Planner');

  // *****************************Step 9 - Go to Info / My Profile*************
  // Improve My Profile opens 'Discharge Planner' is the only row that appears under 'User Roles' section Under the 'User Roles' section
  const myProfile = new MyProfile(page2);
  await myProfile.checkUserRolesAssociated('Discharge Planner');

  // Step 10 - Go to Configure / Security / Users
  await Appnav2.clickConfigureSecurityUsers();

  // Step 11 - Search for the user created in step 5 and click on the user name
  await users.searchNameOrUserName(lName + ', ' + fName);
  await users.clickUserName(lName + ', ' + fName);

  // Step 12 - Click on the 'Edit' link next to 'Security Group Association'
  await ownedUser.clickSecurityGroupAssociationLink();

  // Page Associate Security Groups opens 
  const associateSG = new AssociateSecurityGroups(page2);
  await associateSG.checkSecurityGroupAssociationTitle('Associated Security Groups');


  // Step 12 - check the checkbox "Under 'Available Security Groups'
  await associateSG.selectSecurityGroupAndAssociate();

  // Step 13 -  Click on the 'Yes' link for 'Denial Reviewer' and verify the security group modal
  await ownedUser.clickYesNoLink('Yes');
  const nameAndDescription = 'JS Security 1 & (123. JS Security 1 & (12endJS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security end';
  await ownedUser.verifySecurityGroupsModal(nameAndDescription);

  // Step 14 - Go to Info / My Profile
  await Appnav2.navigateToMyProfile();

  // Step 15 -  Click on the 'Yes' link for 'Denial Reviewer' and verify the security group modal
  await ownedUser.clickYesNoLink('Yes');
  await ownedUser.verifySecurityGroupsModal(nameAndDescription);


  // **********************Clean up the security group created at step 5*************************
  await Appnav2.NavigateToManageSecurityGroups();

  const manageSG = new ManageSecurityGroups(page2);
  const sGroupName = 'JS Security 1 & (123. JS Security 1 & (12end';
  await manageSG.deleteSecurityGroupByName(sGroupName);

  // Log off as the current user 
  await Appnav2.LogOff();


  // *********************/ Clean up the user created at step 6***********************

  const page3 = await Login.login(user, password);

  // Go to Configure / Security / Users
  const Appnav3 = new ApplicationNavigator(page3);
  await Appnav3.clickConfigureSecurityUsers();

  // Search for the user created in step 5 and click on the user name
  const users2 = new usersPage(page3);
  await users2.searchNameOrUserName(lName + ', ' + fName);

  // Click on the 'Delete' link
  await users2.deleteUser();

  // Log off as the current user
  await Appnav3.LogOff();













}); 