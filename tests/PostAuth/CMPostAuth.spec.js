// Author - Vrushali Honnatti Date:10th July, 2024
const {QAProvider1, QAProvider2, user, password} = process.env
import { LIB } from '../../bizLibs/lib';
import { test } from '../../pages/PageStart';
import { ReferralConfirmationPage } from '../../pages/referralConfirmationPage_188';
import { ReferralFacesheetPage } from '../../pages/referralfacesheetpage_145';
import { ChooseRecipientsPage } from '../../pages/chooseRecipientspage_1446';
import { SendReferralPage } from '../../pages/sendReferralPage_176';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { CmPostauthSummaryPage } from '../../pages/cmPostauthSummaryPage_1467';

test('CM Post Auth', async ({ page }) => {
  
    //Step -1: Login to the app
    const Login = new LoginPage(page);
    await Login.login(user, password);
  
    const lib1 = new LIB(page);
    
    //Step 2- Create patient and admission
    await lib1.createptandadm();
    await page.waitForTimeout(2000);

    page = await lib1.createFinancial('AUTOTST')
    await page.waitForTimeout(2000);

    const ReferralConfirmation = new ReferralConfirmationPage(page);

    const ReferralFacesheet = new ReferralFacesheetPage(page);
    const ChooseRecipients = new ChooseRecipientsPage(page);
    const SendReferral = new SendReferralPage(page);
    const ManageContextNav = new ManageContextNavigator(page);
    const CmPostauthSummary = new CmPostauthSummaryPage(page);

    await ManageContextNav.NavigateToCreateReferral();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await ReferralFacesheet.createReferral('Post Auth Referral');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await ManageContextNav.NavigateToChooseRecipients();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await ChooseRecipients.choose1Recipient('Provider Online (226537)');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await ManageContextNav.NavigateToSendReferrals()
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(4000);

    await SendReferral.unMaskAllPatientInfo();
    await SendReferral.clickSendReferralButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(4000);

    await ReferralConfirmation.validateConfirmationText('has been posted by automation');

    await ReferralConfirmation.clickcontinue();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(8000);

    await ManageContextNav.NavigateToDocumentationPostAuth();

    await CmPostauthSummary.clickRequestAuth();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    await CmPostauthSummary.clickAddressBookButton();
    await CmPostauthSummary.searchAddressBook(QAProvider2)
    await CmPostauthSummary.selectAddressBook(QAProvider2)

    await CmPostauthSummary.selectLOC();

    await CmPostauthSummary.setHospitalDetails(QAProvider1);
    await CmPostauthSummary.clickSendRequest();

    await CmPostauthSummary.clickRecordCommunication();

    await CmPostauthSummary.SetPayorResponse('In Progress')
    await CmPostauthSummary.clickSave();

    await CmPostauthSummary.clickNotResponsibleForAuth()
    
    await CmPostauthSummary.SelectNoNotResForAuth(QAProvider1)
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await CmPostauthSummary.clickSave();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await CmPostauthSummary.ValidateSummaryPageData('Exclusion for Post-Acute Authorization');
    await CmPostauthSummary.ValidateSummaryPageData('Communication');
    await CmPostauthSummary.ValidateSummaryPageData('Post-Acute Authorization Request');
    await CmPostauthSummary.ValidateSummaryPageData('Received From: '+ QAProvider2 +' Method: Online');
    await CmPostauthSummary.ValidateSummaryPageData('Sent To: ' + QAProvider1 +' Method: Online');
    await CmPostauthSummary.ValidateSummaryPageData('Sent To: '+ QAProvider2 +'Method: Online');
});
