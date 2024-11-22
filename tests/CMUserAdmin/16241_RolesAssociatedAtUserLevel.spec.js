// Author - Micho Eshete Date: 11/04/2024
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AddSecurityGroups } from '../../pages/AddSecurityGroupPage_1274';
import { AddUserPage } from '../../pages/AddUser_115';
import { usersPage } from '../../pages/usersPage_27';
const { user, password } = process.env


test('Standard Edit Owned User & My Profile - Roles associated at user level and Roles associated at security group level', async ({ page}) => {

    // Step -1: Login into CM application 
    const Login = new LoginPage(page); 
    const page1 = await Login.login(user, password);

    //Creating a object to ApplicationNavigator class
    const Appnav = new ApplicationNavigator(page1); 

    //Calling & Passing Org name to NavigateToChangeOrg method
    //await Appnav.NavigateToChangeOrg('Allscripts QA Hospital 2 (harpo - 226281)');

    // Step 2 - Go to Configure / Security Group / Manage Security Groups
    await Appnav.NavigateToManageSecurityGroups();

    //Creating a object to AddSecurityGroups class
    const AddSGP= new AddSecurityGroups(page1);

    // Step 3 - Create a new Security Group
   await AddSGP.createSecurityGroup('JS Security 1 & (123. JS Security 1 & (12end', 'JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security 1 Desc & (123. JS Security end');

   // Step 4 - Go to Configure / Security / Users
   const elementNames = ['configureLink', 'menuSecurity', 'usersLink'];
   await Appnav.ConfigureSecurityNavigation(elementNames);
   
   // Create an instance of AddUser
   const AddUser = new AddUserPage(page1);

   // Step 5 - Create a new user and capture the username and password
   const { newUserName, newUserassword } = await AddUser.createNewUser();

   // logout as the current user
  
    
   // Step 6 - login as the new user creaatd in step 5
    const Login1 = new LoginPage(page);
    await page.pause();

    const page2 = await Login1.login(newUserName, newUserassword);

    // Go to Configure / Security / Users
    await Appnav.ConfigureSecurityNavigation(elementNames);

    // Step 7 - Search for the user created in step 5 and click on the user name
    const users = new usersPage(page);
    await users.searchNameOrUserName(newUserName);

    // Step 8 - Click on the 'Edit' link next to 'User Roles'
    








}); 