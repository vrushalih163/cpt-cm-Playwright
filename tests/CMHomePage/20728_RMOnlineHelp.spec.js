// Author - Micho Eshete Date: 08/23/2024
const { user, password } = process.env;
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { CMHomePage } from '../../pages/CMHomePage_111';



test('Home Page - RM Online Help - RM Online Help is accessible via the Home Page', async ({ page }) => {

    //creates a new instance of class 
    //Step 1: login to the app
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);
    const AppNav = new ApplicationNavigator(page1);
    const homePage = new CMHomePage(page1);


    /**
     * Step 2: Login to QA Provider #1 configured with "Org Can Receive Professional Referrals": TRUE and  
     * configured with "Can Receive Referrals Online": TRUE
     */
    await AppNav.NavigateToChangeOrg('QA Provider #1');

    // Step 3: Click on the "Online Help" card on Home Page
    const homePagePromise = await Login.clickCardsOnHomePage('Online Help');

    // Step 4: Maximize the Online Help page
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 5: Verify the user is navigated to the Careport Referral Management Online Help page in a new window
    await AppNav.assertOnlineHelpPageContainsText(homePagePromise, 'CarePort Referral Management Online Help');

    // Step 6: close the CM OnlineHelp window
    await homePagePromise.close();

    // Step 7: Click on "Referal Mamangemetn Online Help" option under Help left navigation icon
    const providerOnehelpPagePromise = await AppNav.navigateToOnlineHelp('Referral Management Online Help');

    // Step 8: Verify the user is navigated to the Careport Referral Management Online Help page in a new window
    await AppNav.assertOnlineHelpPageContainsText(providerOnehelpPagePromise, 'CarePort Referral Management Online Help');

    // Step 9: close the CM OnlineHelp window
    await providerOnehelpPagePromise.close();

    /**
    *  Step 10: Login to QA Provider #2 configured with Org "Can Receive Professional Referrals": TRUE 
    *  configured with Can "Receive Referrals Online": FALSE
    */
    await AppNav.NavigateToChangeOrg('QA Provider #2');

    // Verify Provider #2 is configured with "Can Receive Referrals Online": FALSE

    // Step 11: Verfy user does not see the "Online Help" card on the Home Page
    await Login.verifyCardNotDisplayed('Online Help');

    // Step 12: Click on "Referal Mamangemetn Online Help" option under Help left navigation icon
    const providerTwoHelpPagePromise = await AppNav.navigateToOnlineHelp('Referral Management Online Help');

    // Step 13: Verify Clicking on "Referal Mamangemetn Online Help" option leads the user to the RM OnlineHelp in a new window
    await AppNav.assertOnlineHelpPageContainsText(providerTwoHelpPagePromise, 'CarePort Referral Management Online Help');

    // Step 14: close the CM OnlineHelp window
    await providerTwoHelpPagePromise.close();




}); 