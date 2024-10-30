// Author: Micho Eshete Date: 08/19/2024
import { test, chromium } from '@playwright/test';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import { AdmissionDefaultViewPage } from '../../pages/AdmissionDefaultViewPage_631';
import { LoginPage } from '../../pages/PageLogin_111';
import { AdmissionFaceSheet } from '../../pages/AdmisssionFaceSheet_51';
import { TaskDetailsPage } from '../../pages/TaskDetailsPage_767';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';

const { admissionTaskCreatorUser, password } = process.env


test('Tasking - Admission Task (Assigned, Pastdue and Completed), Notifications by Pager and Email', async ({ page }) => {
    // Step -1: Login into CM application and navigate to Wellsky QA Hospital 1.
    const Login = new LoginPage(page);
    const page1 = await Login.login(admissionTaskCreatorUser, password);

    //Creating a object to ApplicationNavigator class
    const Appnav = new ApplicationNavigator(page1);

    //Calling & Passing Org name to NavigateToChangeOrg method
    //await Appnav.NavigateToChangeOrg('CM Automation Hospital');

    // Step 2 - Navigating to Mangage -> Admissions -> Admission Default View
    await Appnav.NavigateToAdmissionDefaultView();

    // Creating a object to AdmissionDefaultViewPage class
    const AdmissionDefaultView = new AdmissionDefaultViewPage(page1);

    // Step 3 - Search for an admission
    await AdmissionDefaultView.SearchAdmission('123456');

    // Step 4 - Select Edit Admission from the Actions drop down and click Go
    await AdmissionDefaultView.navigateActionDDBox('Edit Admission');
    
    //Creating a object to AdmissionFaceSheet class
    const AdmiFaceSheet = new AdmissionFaceSheet(page1);

    // Step 5- Click on Task Details link
    await AdmiFaceSheet.TaskDetailsLinkClick();

    // create an object to TaskDetailsPage class
    const TaskDetails = new TaskDetailsPage(page1);
   
    // Step 6 - Select Category as Admission, Task as Regressionadmission, Owner/AssingTo as from the precondtion on Task Details Page 
    await TaskDetails.selectCategory('Admission');
    await TaskDetails.selectTaskItem('Regressionadmission');
    await TaskDetails.selectAssignTo('Owner, AdmissionTask');

    // Step 7
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
    
    // Step 8 - Click on the Add task note, Veirfy Modal dialog is displayed, add a note and click on Save button
    await TaskDetails.verifyModalAndAddTaskNote('Automation- Regression Admission Task Note');

    // Step 9 - Click on Apply button
    await TaskDetails.clickApplyButton();

    // Step 10 - Verify Task is created successfully
    await TaskDetails.verifyTaskCreatedDetailsPage();
    
    // Step 11-  Verify Task Notes link, Creaetd By, Note Section is displayed with the note added in Step 8
    await TaskDetails.verifyTaskNotesSection('Automation- Regression Admission Task Note', 'admissionTaskCreator');

    // Creating a object to ManageContextNavigator class
    const ManageContextNav = new ManageContextNavigator(page1);
    await page.pause();

    // Step 12 - Navigate to Manage>Tasks>Task Default View and 
    await ManageContextNav.navigateToTaskDefaultView();

    // Step 13 - locate the task that was created in step 10 
    await AdmissionDefaultView.SearchAdmission('123456');

    // Step 14 - Select "Mark as Complete" from the Actions drop down. Click Go

    // Step 15 - verify Task is Assigned - Pager Notification is received by creator, Owner and other user.

    // Step 16 - verify Task is Assigned - Email Notification is received by creator, Owner and other user.
    
    const expectedNote = 'Wellsky Note from Tasking: Past Due: ';
    const loggedInUser = 'admissionTaskCreator';
    const recipientEmail = 'recipient-email@gmail.com';
    const emailSubject = 'Regressionadmission : Assigned';

    // Verify email notification
    //const assignedEmailVerified = await TaskDetails.verifyTaskEmailNotification(emailSubject, expectedNote);
    //expect(assignedEmailVerified).toBe(true);

    // Step 17 - verify Task is Past Due - Pager Notification is received by creator, Owner and other user.

    // Step 18 - verify Task is Past Due - Email Notification is received by creator, Owner and other user.
    //const pastDueEmailVerified = await TaskDetails.verifyTaskEmailNotification(emailSubject, expectedNote);
    //expect(pastDueEmailVerified).toBe(true);

    // Step 19 - verify Task is Completed - Pager Notification is received by creator, Owner and other user.

    // Step 20 - verify Task is Completed - Email Notification is received by creator, Owner and other user.
    //const completedEmailVerified = await TaskDetails.verifyTaskEmailNotification(emailSubject, expectedNote);
    //expect(completedEmailVerified).toBe(true);


  


});

