import { test, expect } from '@playwright/test';
import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { LoginPage } from '../../pages/PageLogin_111';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { ConnectTimelinePage } from '../../pages/ConnectTimelinePage_2222';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { DischargePlanningPage } from '../../pages/DischargePlanningPage_1443';

const { ConnectIntegrationUser, ConnectIntegrationPassword } = process.env;

// test('test', async ({ page }) => {

    const connectlogin = new LoginPage(page);
    const pageA = await connectlogin.login(ConnectIntegrationUser, ConnectIntegrationPassword);
    const AppNav = new ApplicationNavigator(pageA)
    const page1 = await AppNav.NavigateToChangeOrg('Allscripts QA Hospital 1 (harpo - 226280)');
    await page1.waitForTimeout(5000);

    //Searching patient in Patient Default View

    await AppNav.NavigateToPatientsDefaultView();
    const PatientDefaultView = new PatientdefaultviewPage(page1);
    await PatientDefaultView.SearchPatientByMRN('Connect Int 1');
    await PatientDefaultView.NavigateActionDDBox('Show Admissions');
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);


    //calling new method in Admission default view page to verify the Connect Timeline link is visibles

    const AdmissionDefaultView = new AdmissionDefaultViewPage(page1);
    await AdmissionDefaultView.ClickConnectTimeline();

    // calling new method in Connect Timeline page to verify the Connect Timeline page is opened

    const ConnectTimeline = new ConnectTimelinePage(page1);
    await ConnectTimeline.ValidateConnectTimelinePage();
    await ConnectTimeline.ClickContinuityOfCareDocument();

    // Below code is for navigating to DP page

    const ManageContextNavigator1 = new ManageContextNavigator(page1);
    await ManageContextNavigator1.NavigateToDischargePlanning();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(5000);

    // Below code is for verifying the Connect Timeline functionality in Discharge Planning page

    const DischargePlanning = new DischargePlanningPage(page1);
    await DischargePlanning.ConnectTimelineValidationinDischargePlanning();

// });



