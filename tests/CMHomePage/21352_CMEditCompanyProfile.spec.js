//Author - Priyanka Bachwal Date: 09/16/2024

const { user, password } = process.env;
import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib.js';
import { LoginPage } from '../../pages/PageLogin_111.js';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator.js';
import { OrganizationLookup } from '../../pages/OrganizationLookupPage_595.js';
import {OrganizationDetailsPage} from '../../pages/organizationDetailsPage_287.js';
import {EditCompanyProfilePage} from '../../pages/editCompanyProfilePage_350.js';

test('CM- Prevent Saving Non Unique Provider IDs', async ({ page }) => {
    
        //Step 1: login to the app
        const Login = new LoginPage(page);
        const page1 = await Login.login(user, password);
        await page1.waitForTimeout(2000);

        //creates a new instance of the classes 
        const lib1 = new LIB(page1);
        const AppNav = new ApplicationNavigator(page1);
        const OrgDetails = new OrganizationDetailsPage(page1);
        const EditCompanyProfile = new EditCompanyProfilePage(page1);
    
       //Step-2: Navigate to Change Organization
       await AppNav.NavigateToChangeOrg('ECIN Administrative Organization');
       
       //step 3: Navigate to Admin Module
        await AppNav.adminOrgLookupNavigation();
               
        //Step 4: Search for an Organization of type Facility Provider
        const orgLookup = new OrganizationLookup(page1);
        await orgLookup.searchAnOrganization('Facility Provider', '80891');

        //Step 5: Click on Organization Settings icon
        await orgLookup.clickOrgnizationSettingsicon();
       
        //Step 6: Verify the Edit Company Profile page
        await OrgDetails.clickEditCompanyProfileLink();
     
        //step 7: Verify the Company Profile Information details page 350
        await EditCompanyProfile.enterNonUniqueProviderId('12345');

        //Step 8: Generate a unique provider id and verify the success message
        await lib1.generateUniqueIntegerString(6).then(async (uniqueProviderId) => {
        await EditCompanyProfile.enterUniqueProviderId(uniqueProviderId);
        }
)}
);
