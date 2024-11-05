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
import { LoginPage } from '../../pages/PageLogin_111';

test('87411_6785175 To verify that user is able to exclude the Post auth for a Provider', async ({ page }) => {
  
    //Step -1: Login to the app
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);
  
    const lib1 = new LIB(page1);
    
    //Step 2- Create patient and admission
    await lib1.createptandadm();
    await page1.waitForTimeout(2000);

    await lib1.createFinancial('AUTOTST')
    await page1.waitForTimeout(2000);

    const ReferralConfirmation = new ReferralConfirmationPage(page1);

    const ReferralFacesheet = new ReferralFacesheetPage(page1);
    const ChooseRecipients = new ChooseRecipientsPage(page1);
    const SendReferral = new SendReferralPage(page1);
    const ManageContextNav = new ManageContextNavigator(page1);
    const CmPostauthSummary = new CmPostauthSummaryPage(page1);

    await ManageContextNav.NavigateToCreateReferral();
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

    await ReferralFacesheet.createReferral('Post Auth Referral');
    await page1.waitForLoadState('domcontentloaded');
    await page1.waitForTimeout(2000);

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

    await ReferralConfirmation.ClickContinue();
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
