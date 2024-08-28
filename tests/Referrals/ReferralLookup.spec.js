//Author -- Priyanka Bachwal Date: August 21,2024

const {test, expect} = require ("@playwright/test")

import { LoginPage } from "../../pages/PageLogin_111";
import { ApplicationNavigator } from "../../pages/ApplicationNavigator";
import { ReferralLookupPage } from "../../pages/referralLookupPage_216";

const {user, password} = process.env
test('Referral Lookup', async ({ page }) => {

    //Step-1: Login to the app 
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);
    
    const ReferralLookup = new ReferralLookupPage(page1);
    const AppNav = new ApplicationNavigator(page1);

    //Step-2: Navigate to Change Organization
    await AppNav.NavigateToChangeOrg('CM Automation Hospital');

    //Step-3: Navigate to Referral Lookup Page:216
    await AppNav.navigateToReferralLookup();

    //Step-4: Verify the Referral Lookup page is displayed
    await ReferralLookup.validateReferralLookuppage();

    //Step-5: Fill the Referral Number
    await ReferralLookup.searchByReferralNum('5139682');
});