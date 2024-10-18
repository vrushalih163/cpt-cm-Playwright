// Author: Micho Eshete Date: 08/19/2024
import { test, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { LoginPage } from '../../pages/PageLogin_111';
import { AdmissionFaceSheet } from '../../pages/AdmisssionFaceSheet_51';
import { TaskDetailsPage } from '../../pages/TaskDetailsPage_767';

const { admissionTaskCreatorUser, password } = process.env


test('Tasking - Admission Task (Assigned, Pastdue and Completed), Notifications by Pager and Email', async ({ page }) => {
    //Step -1: Login into CM application and navigate to Wellsky QA Hospital 1.
    const Login = new LoginPage(page);
    const page1 = await Login.login(admissionTaskCreatorUser, password);

    //Creating a object to ApplicationNavigator class
    const Appnav = new ApplicationNavigator(page1);

    //Calling & Passing Org name to NavigateToChangeOrg method
    //await Appnav.NavigateToChangeOrg('CM Automation Hospital');

    //Navigating to Mangage -> Admissions -> Admission Default View
    await Appnav.NavigateToAdmissionDefaultView();

    //Creating a object to AdmissionDefaultViewPage class
    const AdmissionDefaultView = new AdmissionDefaultViewPage(page1);

    //Search for an admission
    await AdmissionDefaultView.SearchAdmission('123456');

    // Select Edit Admission from the Actions drop down and click Go
    await AdmissionDefaultView.navigateActionDDBox('Edit Admission');
    
    //Creating a object to AdmissionFaceSheet class
    const AdmiFaceSheet = new AdmissionFaceSheet(page1);

    // Click on Task Details link
    await AdmiFaceSheet.TaskDetailsLinkClick();

    // create an object to TaskDetailsPage class
    const TaskDetails = new TaskDetailsPage(page1);
   
    // Select Category as Admission, Task as Regressionadmission, Owner/AssingTo as from the precondtion on Task Details Page 
    await TaskDetails.selectCategory('Admission');
    await TaskDetails.selectTaskItem('Regressionadmission');
    await TaskDetails.selectAssignTo('Owner, AdmissionTask');

    
    // Verify Start on date is populated correctly based on the precondition - Start on date will be displayed as Next day.
    await TaskDetails.verifyStartOnDate();

    // Verify Start on Time is populated correctly based on the precondition - Start on Time will be displayed as Current time.
    await TaskDetails.verifyStartOnTime();

    // Verify Due by date ipopulated correctly based on the precondition - Due By date will be displayed as Next day.
    await TaskDetails.verifyDueByDate();

    // Verify Due by Time ipopulated correctly based on the precondition - Due By Time will be displayed as Current time.
    await TaskDetails.verifyDueByTime();

    // Verify Priority - Priority will be displayed as High.
    await TaskDetails.verifyPriority('High');

    // Verify Status - Status will be displayed as In Progress
    await TaskDetails.verifyStatus('In Progress');
    
    // Select other checkboxes for Notify When Task is Past Due, Notify When Task is Completed
    await TaskDetails.clickOthersLinkAndSelectOtherUsers('Other');

    // verify checkbox for creator and Owner is checked for Notify When Task is Assigned  
    await TaskDetails.verifyNotifyWhenTaskIsAssigned();

    // Verify checkbox for creator and Owner is checked for Notify When Task is Past Due 
    await TaskDetails.verifyNotifyWhenTaskIsPastDue();

    // Verify checkbox for creator and Owner is checked for Notify When Task is Completed
    await TaskDetails.clickCheckboxNotifyWhenTaskIsCompleted();
    
    // Veirfy Modal dialog is displayed with Note textbox, add a not and click on Save button
    await TaskDetails.verifyModalAndAddTaskNote('Automation- Regression Admission Task Note');

    // Click on Apply button
    await TaskDetails.clickApplyButton();

    // Verify Task is created successfully
    await TaskDetails.verifyTaskCreatedDetailsPage();
    

    // Verify Task is created successfully
    //await TaskDetails.verifyTaskNotesSection('Automation- Regression Admission Task Note', 'admissionTaskCreator');

  



});

