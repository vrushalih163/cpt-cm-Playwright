// Author - Rajakumar Maste, Created Date: 29 July 2024
// Modified By- Rajakumar Maste, Modified Date: 16 Aug 2024
// Comment - Upadted login code with new loggin method
import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { AddEditTaskModal } from '../../pages/Transition_Pages/AddEditTaskModal';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { LIB } from '../../bizLibs/lib';

test('Create Task', async ({ }) => {
    test.setTimeout( 5 * 60 * 1000);//5mins in milliseconds

    //Creating an Object to LIB class
    const Library = new LIB();

    //calling HandleAppLaunch() method and passing - Patient name, MRN, Navigator page name
    const newPage = await Library.HandleAppLaunch('Cadence, Anna','E1703','Patient Choice');

    //Click on patient task worklist icon manage referral page.
    const PTaskWorklist = new ManageReferral(newPage);
    await PTaskWorklist.PatientTaskWorkList();
    
    //Click on add task icon 
    await newPage.getByText('add', { exact: true }).click();
    await newPage.waitForLoadState('domcontentloaded');

    //Add task modal activities
    const AddEditTask = new AddEditTaskModal(newPage);
    await AddEditTask.taskCategory('transition admission');//Transition category selection
    await AddEditTask.taskName('rajakumar Admission Task');//task name selection which is associated to transition category
    await AddEditTask.ownerName('maste, rajakumar');// Owner name selection
    await AddEditTask.startOnDate('07/22/2024');//start on date updated
    await AddEditTask.startOnTime('08:10');//start on time updated
    await AddEditTask.dueBy('07/23/2024');//due date updated
    await AddEditTask.dueByTime('14:15');//due on updated
    await AddEditTask.taskNote('Automation first script');//added task note

    await AddEditTask.NotifyWhenTaskIsAssigned_EditLink();
    await AddEditTask.Toastmessage_TaskCreated();

    await AddEditTask.AssignUser('maste');
    await AddEditTask.Toastmessage_AssignedUser;
    await newPage.getByPlaceholder('Enter the value to filter').fill('');
    await AddEditTask.AssignUser('kolasani');
    await AddEditTask.Toastmessage_AssignedUser;    
    
    await AddEditTask.CloseAssignedUserModal();

    await AddEditTask.NotifyWhenTaskIsAssigned_EditLink();
    
    await AddEditTask.UnassignUser('Maste, Rajakumar');

    await AddEditTask.CloseAssignedUserModal();

    await AddEditTask.CreateORUpdateClick();//create/update button clicked
    await browser.close();
});