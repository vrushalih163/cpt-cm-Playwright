// Author - Rajakumar Maste, Created Date: 29 July 2024
import { test, expect, Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { AddEditTaskModal } from '../../pages/Transition_Pages/AddEditTaskModal';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { LIB } from '../../bizLibs/lib';

test('Create Task', async ({ }) => {
    test.setTimeout( 10 * 60 * 1000);//5mins in milliseconds

    const Library = new LIB();
    
    //getting persistant context
    var library = Library.DataDirectory();
    const userpath = ((await library).toString());
    const browser = await chromium.launchPersistentContext(userpath);
    const pages = browser.pages();
    const page = pages[0];

    //EPIC Oauth popup details fill up and logging into Transition
    const library1 = new LIB(page);
    const  newPage = await library1.TransitionLogin('Clin Doc, Henry');

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