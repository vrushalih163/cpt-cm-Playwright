// Author - Rajakumar Maste, Created Date: 29 July 2024
// Modified By- Rajakumar Maste, Modified Date: 11 Sept 2024
// Comment - Updated test case title 
import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { AddEditTaskModal } from '../../pages/Transition_Pages/AddEditTaskModal';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { LIB } from '../../bizLibs/lib';

test('CM- Transition Management Page - User Can Add Tasks on the Transition Referral Landing Page and Within a Referral', async ({ }) => {
    test.setTimeout( 5 * 60 * 1000);//5mins in milliseconds

    //Creating an Object to LIB class
    const Library = new LIB();

    //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
    const newPage = await Library.HandleAppLaunch('Cadence, Anna','E1703','Manage Referrals');

    //Click on patient task worklist icon manage referral page.
    const PTaskWorklist = new ManageReferral(newPage);
    await PTaskWorklist.PatientTaskWorkList();
    
    //Click on add task icon 
    await newPage.getByText('add', { exact: true }).click();
    await newPage.waitForLoadState('domcontentloaded');

    //Add task modal activities
    const AddEditTask = new AddEditTaskModal(newPage);
    //Transition category selection
    await AddEditTask.TaskCategory(' Transition Admission ');

    //task name selection which is associated to transition category
    await AddEditTask.TaskName('Automation - Transition Admission');

    // Owner name selection
    await AddEditTask.OwnerName('maste, rajakumar');

    // start on date updated
    await AddEditTask.StartOnDate('+0');
    //start on time updated
    await AddEditTask.StartOnTime('08:10');

    //due date updated
    await AddEditTask.DueBy('+1');
    //due on updated
    await AddEditTask.DueByTime('14:15');
    await AddEditTask.TaskNote('Automation - Task Creation with Transition Admission category');//added task note
    await AddEditTask.NotifyWhenTaskIsAssigned_EditLink();
    await AddEditTask.Toastmessage_TaskCreated();
    await AddEditTask.AssignUser('maste');
    await AddEditTask.Toastmessage_AssignedUser();
    await newPage.getByPlaceholder('Enter the value to filter').fill('');
    await AddEditTask.AssignUser('kolasani');
    await AddEditTask.Toastmessage_AssignedUser();     
    await AddEditTask.CloseAssignedUserModal();
    await AddEditTask.NotifyWhenTaskIsAssigned_EditLink();  
    //await AddEditTask.UnassignUser('Maste, Rajakumar');
    await AddEditTask.CloseAssignedUserModal();
    await AddEditTask.CreateORUpdateClick();//create/update button clicked
    await newPage.locator('//app-inside-p-task-list//h3//mat-icon').click();

    //------------- Add a task for the Transition Referral category----------------------//

    await PTaskWorklist.CreateNewReferral('ATAutomation');//Create a new referral
    
    await PTaskWorklist.PatientTaskWorkList(); 
    //Click on add task icon 
    await newPage.getByText('add', { exact: true }).click();
    await newPage.waitForLoadState('domcontentloaded');
    //Transition category selection
    await AddEditTask.TaskCategory(' Transition Referral ');

    //task name selection which is associated to transition category
    await AddEditTask.TaskName('Automation - Transition Referral');

    // Owner name selection
    await AddEditTask.OwnerName('maste, rajakumar');

    // start on date updated
    await AddEditTask.StartOnDate('+0');
    //start on time updated
    await AddEditTask.StartOnTime('08:10');

    //due date updated
    await AddEditTask.DueBy('+1');
    //due on updated
    await AddEditTask.DueByTime('14:15');
    await AddEditTask.TaskNote('Automation - Task Creation with Transition Referral category');//added task note
    await AddEditTask.NotifyWhenTaskIsAssigned_EditLink();
    await AddEditTask.Toastmessage_TaskCreated();
    await AddEditTask.AssignUser('maste');
    await AddEditTask.Toastmessage_AssignedUser();     
    await AddEditTask.CloseAssignedUserModal();
    await AddEditTask.CreateORUpdateClick();//create/update button clicked
    await newPage.close();
});