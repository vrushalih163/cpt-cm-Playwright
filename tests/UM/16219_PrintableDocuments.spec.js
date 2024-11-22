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
import { AdmissiondetailsPage } from '../../pages/admissiondetailspage_54';
import { ReviewFaceSheetPage } from '../../pages/reviewFaceSheetPage_662';
import { ReviewCriteriaPage } from '../../pages/reviewCriteriaPage_663';
import { ReviewSummaryPage } from '../../pages/reviewSummaryPage_678';
import { PayorCommunicationPage } from '../../pages/PayorCommunicationPage_671';
import { CommunicationsPage } from '../../pages/communicationsPage_664';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AddPaymentSourcePage } from '../../pages/addpaymentsource_165';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { PayorAuthorization } from '../../pages/PayorAuthorizationPage_812';
import { PayorAuthorizations } from '../../pages/PayorAuthorizationsPage_745';
import { AddEditUMNotes } from '../../pages/AddEditUMNotesPage_746';
import { ReportLibraryPage } from '../../pages/ReportLibraryPage_1113';
import { PrintableDocumentsPages } from '../../pages/PrintableDocumentsPages';

test('87591_3925015 UM Status - Roll Up and Roll Down logic on admission detail and UM pages', async ({ page }) => {
  
    //Step -1: Logon to QA Test Hospital
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);
  
    
    //Step - 2: Select a patient
    //Step - 3: Create an Admission or Edit an available Admission
    const AppNav = new ApplicationNavigator(page1);
    
    AppNav.NavigateToAdmissionDefaultView();
    const admissionDefaultView = new AdmissionDefaultViewPage(page1);
    await admissionDefaultView.SearchAdmission('AutoAccntNo');
    await admissionDefaultView.navigateActionDDBox('Admission Details');

    //Step - 4: Select Printable Documents
    const ManageContextNav = new ManageContextNavigator(page1);
    ManageContextNav.NavigateToPrintableDocuments();

    const PrintableDocuments = new PrintableDocumentsPages(page1);
    //Step - 5: Generate and validate the pages listed under Printable Documents in Summary section
    //Step - 6: Click on the print option available after report generation.
    //Step - 7: Print the report/document onto a page or pdf. file
    await PrintableDocuments.ValidateAllPrintableDocuments();


    
});
