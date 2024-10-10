// Author - Rajakumar Maste, Created Date: 29 July 2024 
import { expect } from '@playwright/test';
export class AddEditTaskModal {
    constructor(page) {
        this.page = page;

        //Transition Task category
        this.TransitionCategory_field = page.locator('//acm-mat-dropdown[@formcontrolname="taskCategory"]//mat-form-field//div[contains(@class,"mat-select-arrow-wrapper")]');

        //Referral Id field
        this.ReferralId_field = page.locator('//acm-mat-dropdown[@formcontrolname="referralIDs"]//mat-form-field//div[contains(@class,"mat-select-arrow-wrapper")]');

        //Task Name field
        this.Taskname_field = page.locator('//acm-mat-dropdown[@formcontrolname="taskName"]//mat-form-field//div[contains(@class,"mat-select-arrow-wrapper")]');

        //Task Owner field
        this.TaskOwner_field = page.locator('//acm-mat-dropdown[@formcontrolname="taskOwner"]//mat-form-field//div[contains(@class,"mat-select-arrow-wrapper")]');

        //Task Note
        this.LastTasknote_field = page.locator('#add-task-text-area');

        //Create or Update button
        this.CreateOrUpdate_button = page.locator('//button[contains(@class,"mat-raised-button")]');

        //Start on Date
        this.StartDate = page.locator('//mat-label[text()="Start On"]');

        //Start on Time
        this.StartTime = page.locator('//mat-label[text()="Start On Time"]');

        //Due date or Due by
        this.Duedate = page.locator('//mat-label[text()="Due By"]');

        //Due time or Due By Date
        this.Duetime = page.locator('//mat-label[text()="Due By Time"]');

        //Notify when Task is Assigned
        this.NotifyTaskAssigned_Editlink = page.locator('//tbody[@role="rowgroup"]//tr[@class="mat-row cdk-row ng-star-inserted"][1]//a');

        //Notify when Task is Past Due
        this.NotifyTaskPastDue_Editlink = page.locator('//tbody[@role="rowgroup"]//tr[@class="mat-row cdk-row ng-star-inserted"][2]//a');

        //Notify when Task is Completed
        this.NotifyTaskCompleted_Editlink = page.locator('//tbody[@role="rowgroup"]//tr[@class="mat-row cdk-row ng-star-inserted"][3]//a');

        //Assigned user
        this.assignuser = page.getByPlaceholder('Enter the value to filter');

        //Unassign user
        //this.unassignuser = page.locator('//mat-dialog-container[contains(@id, "mat-dialog")]/app-assigned-user/form/mat-dialog-content/div/div[2]//tbody/tr');

        //close Assigned user modal
        this.AssignedUserModal_closeIcon = page.getByRole('heading', { name: '' }).locator('i');
    }

    /**
        * Task Category Selection under Add Task modal
        * 
        * **Usage**
        * Enter the transition category name. Example: 'Transition Admission' or 'Transition Referral'
        * 
        */
    async TaskCategory(Category) {
        try {
            await this.TransitionCategory_field.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.getByText(Category, { exact: true }).click();
        } catch {
            console.error('Error during test execution of Task Category:', error.message);
        }
    }

    /**
        * ReferralId Selection under Add Task modal
        * 
        * **Usage**
        * Enter the Referral Id with prefix. Example: 'ACU 5165941'
        * 
        */
    async referralId(ReferralId) {
        try {
            await this.ReferralId_field.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.getByText(ReferralId).click();
        } catch {
            console.error('Error during test execution of Referral Id Selection:', error.message);
        }
    }

    /**
    * Task name Selection under Add Task modal
    * 
    * **Usage**
    * Enter the Task name. Example: 'Transition task'
    * 
    */
    async TaskName(TaskName) {
        try {
            await this.Taskname_field.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
            // const options = await this.page.locator('//mat-option').allTextContents();//To get all the dropdown
            // console.log(options);
            await this.page.getByRole('option', { name: TaskName }).locator('span').click();
        } catch {
            console.error('Error during test execution of Task Name:', error.message);
        }
    }

    /**
           * Owner Name Selection under Add Task modal
           * 
           * **Usage**
           * Enter the Owner name. Example: 'Maste, Rajakumar'
           * 
           **/
    async OwnerName(TaskOwnerName) {
        try {
            await this.TaskOwner_field.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(3000);
            await this.page.getByRole('option', { name: TaskOwnerName }).locator('span').click();
        } catch {
            console.error('Error during test execution of Owner Name:', error.message);
        }
    }

    /**
            * Last Task Note
            * 
            * **Usage**
            * Enter the task note here.
            * 
            * **Note:**
            * Task notes field accepts max 500 characters.
            */
    async TaskNote(TaskNote) {
        try {
            await this.LastTasknote_field.fill(TaskNote);
        } catch {
            console.error('Error during test execution of Task Note:', error.message);
        }
    }

    /**
            * Create or Update button
            * 
            * **Usage**
            * This method will apply for create or update button present on the add/Edit task modal.
            * 
            */
    async CreateORUpdateClick() {
        try {
            await this.CreateOrUpdate_button.click();
        } catch {
            console.error('Error during test execution of Create/Update button:', error.message);
        }
    }

    /**
        * Start on Date - This is the task start on date. And Due should be in MM/DD/YYYY format.
        * 
        * **Disclaimer:**
        * You are going to override the start on date.
        * 
        */
    async StartOnDate(startdate) {
        try {
            await this.StartDate.fill('');
            await this.StartDate.fill(startdate);
        } catch {
            console.error('Error during test execution of Start On Date:', error.message);
        }
    }

    /**
        * Start On Time - This is the task start on time. Enter the time in 24hr format and the time picker will convert it to 12hrs format.
        * Example: 02:10 -> This time will be considered as 02:10 AM
        *          13:15 -> This time will be converted to 12hrs format i.e 01:15 PM
        * 
        * **Disclaimer:**
        * You are going to override the start on time.
        * 
        */
    async StartOnTime(starttime) {
        try {
            await this.StartTime.fill('');
            await this.StartTime.fill(starttime);
        } catch {
            console.error('Error during test execution of Start on Time:', error.message);
        }
    }

    /**
        * Due By - This is the task due date. And due date should be in MM/DD/YYYY format.
        * 
        * **Disclaimer:**
        * You are going to override the due date. Make sure that due by date should always be greater than start on date.
        * 
        */
    async DueBy(DueDate) {
        try {
            await this.Duedate.fill('');
            await this.Duedate.fill(DueDate);
        } catch {
            console.error('Error during test execution of due By:', error.message);
        }
    }

    /**
        * Due By Time - This is the task due on time. Enter the time in 24hrs format and the time picker will convert it to 12hrs format.
        * Example: 02:10 -> This time will be considered as 02:10 AM
        *          13:15 -> This time will be converted to 12hrs format i.e 01:15 PM
        * 
        * **Disclaimer:**
        * You are going to override the due by time.
        * 
        */
    async DueByTime(DueByTime) {
        try {
            await this.Duetime.fill('');
            await this.Duetime.fill(DueByTime);
        } catch {
            console.error('Error during test execution of Due by time:', error.message);
        }
    }
    /**
      * Toast Message Visibility
      * 
      * **Visibility**
      * Toast message stating - 'The record has been successfully saved' will be appeared upon clicking on Create button
      * and upon clicking on Edit Hyper links present in notification section.
      * 
      */
    async Toastmessage_TaskCreated() {
        await expect(this.page.getByText('The record has been successfully saved')).toBeVisible();
    }
    /**
    * Toast Message Visibility
    * 
    * **Visibility**
    * Toast message stating -'Success: User assigned' will be displayed once the user has assigned.
    * 
    */
    async Toastmessage_AssignedUser() {
        await expect(this.page.getByText('Success: User assigned')).toBeVisible();
    }
    /**
    * Toast Message Visibility
    * 
    * **Visibility**
    * Toast message stating -'Success: User unassigned' will be displayed once the user has unassigned.
    * 
    */
    async Toastmessage_UnassignedUser() {
        await expect(this.page.getByText('Success: User unassigned')).toBeVisible();
    }
    /**
    * Assigned User Modal
    * 
    * **Usage**
    * Assigned user modal will be opened upon clicking on 'Edit' hypper link present in notification section to notify when task is assigned
    * 
    */
    async NotifyWhenTaskIsAssigned_EditLink() {
        await this.NotifyTaskAssigned_Editlink.click();
    }
    /**
    * Assigned User Modal
    * 
    * **Usage**
    * Assigned user modal will be opened upon clicking on 'Edit' hypper link present in notification section to notify when task is past due
    * 
    */
    async NotifyWhenTaskIsPast() {
        await this.NotifyTaskPastDue_Editlink.click();
    }
    /**
    * Assigned User Modal
    * 
    * **Usage**
    * Assigned user modal will be opened upon clicking on 'Edit' hypper link present in notification section to notify when task is completed
    * 
    */
    async NotifyWhenTaskIsCompleted() {
        await this.NotifyTaskCompleted_Editlink.click();
    }
    async AssignUser(assignedUser) {
        await this.page.waitForTimeout(2000);
        if (this.assignuser) {
            await this.assignuser.type(assignedUser, { delay: 300 });
            await this.page.waitForTimeout(3000);
        } else {
            console.error('assignuser is undefined');
        }
        // Get all elements matching the locator
        let buttons = await this.page.locator('//button[@class="mat-focus-indicator pushico mat-fab mat-button-base mat-accent"]');
        // Loop until there are no more buttons to click
        while (await buttons.count() > 0) {
            // Click the first button in the list
            await buttons.first().click();
            await this.page.waitForTimeout(2000);
            // Update the buttons locator to reflect the current state of the page
            buttons = await this.page.locator('//button[@class="mat-focus-indicator pushico mat-fab mat-button-base mat-accent"]');
        }
    }
    async UnassignUser(UnAssignUserName) {
        // try {
        //     await this.page.pause();
        //     // Locate all rows in the table
        //     await this.page.waitForTimeout(2000);
        //     let rows = await this.page.locator('//mat-dialog-container[contains(@id, "mat-dialog")]/app-assigned-user/form/mat-dialog-content/div/div[2]//tbody/tr');
        //     await this.page.waitForTimeout(2000);
        //     // Get the count of rows
        //     const rowCount = await rows.count();
        //     console.log(rowCount)
        //     await this.page.waitForTimeout(2000);
        //     // Iterate through each row
        //     for (let i = 0; i < rowCount; i++) {
        //         // Get the text content of the current row
        //         const rowText = (await rows.nth(i).textContent()).trim();

        //         console.log(`Row ${i} text: ${rowText}`);
        //         // Check if the row contains the specified user name
        //         if (expect(rowText).toContainText(UnAssignUserName)) {
        //             // Click the cross icon in the matched row
        //             console.log('Match found for user:', UnAssignUserName);
        //             await this.page.waitForTimeout(2000);
        //             await rows.nth(i).locator('#Closebutton').click(); // Replace '.cross-icon-selector' with the actual selector
        //             break; // Exit the loop after clicking the cross icon
        //         }

        //     }
        // } catch (error) {
        //     console.error('Error during test execution of Unassign users:', error.message);
        // }
        // try {
        //     await this.page.pause();
        //     // Locate all rows in the table
        //     await this.page.waitForTimeout(2000);
        //     let rows = await this.page.locator('//mat-dialog-container[contains(@id, "mat-dialog")]/app-assigned-user/form/mat-dialog-content/div/div[2]//tbody/tr');
        //     await this.page.waitForTimeout(2000);
        //     // Get the count of rows
        //     const rowCount = await rows.count();
        //     console.log(rowCount);
        //     await this.page.waitForTimeout(2000);
        //     // Iterate through each row
        //     for (let i = 0; i < rowCount; i++) {
        //         // Get the text content of the current row
        //         const row = rows.nth(i);
        //         const rowText = (await row.textContent()).trim();

        //         console.log(`Row ${i} text: ${rowText}`);
        //         // Check if the row contains the specified user name
        //         if (await row.locator('text=' + UnAssignUserName).count() > 0) {
        //             // Click the cross icon in the matched row
        //             console.log('Match found for user:', UnAssignUserName);
        //             await this.page.waitForTimeout(2000);
        //             await row.locator('//mat-icon').click(); // Replace '#Closebutton' with the actual selector
        //             break; // Exit the loop after clicking the cross icon
        //         }
        //     }
        // } catch (error) {
        //     console.error('Error during test execution of Unassign users:', error.message);
        // }

        // try {
        //     await this.page.pause();
        //     // Locate all rows in the table
        //     await this.page.waitForTimeout(2000);
        //     let rows = await this.page.locator('//mat-dialog-container[contains(@id, "mat-dialog")]/app-assigned-user/form/mat-dialog-content/div/div[2]//tbody/tr');
        //     await this.page.waitForTimeout(2000);
        //     // Get the count of rows
        //     let rowCount = await rows.count();
        //     console.log(rowCount);
        //     await this.page.waitForTimeout(2000);
        //     // Initialize the row index
        //     let i = 0;
        //     // Iterate through each row using a while loop
        //     while (i < rowCount) {
        //         // Get the text content of the current row
        //         const row = rows.nth(i);
        //         const rowText = await row.textContent();

        //         console.log(`Row ${i} text: ${rowText}`);
        //         // Check if the row contains the specified user name
        //         if (await row.locator('text=' + UnAssignUserName).count() > 0) {
        //             // Click the cross icon in the matched row
        //             console.log('Match found for user:', UnAssignUserName);
        //             await this.page.waitForTimeout(2000);
        //             await row.locator('//mat-icon').click(); // Replace '#Closebutton' with the actual selector
        //             break; // Exit the loop after clicking the cross icon
        //         }
        //         i++;
        //     }
        // } catch (error) {
        //     console.error('Error during test execution of Unassign users:', error.message);
        // }

        try {
            await this.page.pause();
            // Locate all rows in the table
            await this.page.waitForTimeout(2000);
            let rows = await this.page.locator('//mat-dialog-container[contains(@id, "mat-dialog")]/app-assigned-user/form/mat-dialog-content/div/div[2]//tbody/tr');
            await this.page.waitForTimeout(2000);
            // Get the count of rows
            let rowCount = await rows.count();
            console.log(`Total rows found: ${rowCount}`);
            await this.page.waitForTimeout(2000);
            // Initialize the row index
            let i = 0;
            // Iterate through each row using a while loop
            while (i < rowCount) {
                // Get the text content of the current row
                const row = rows.nth(i);
                const rowText = (await row.textContent()).trim();
                await this.page.waitForTimeout(2000);
                console.log(`Row ${i} text: ${rowText}`);
                // Check if the row contains the specified user name
                const userLocator = row.locator(`text=${UnAssignUserName}`);
                await this.page.waitForTimeout(2000);
                const userCount = await userLocator.count();
                console.log(`User count in row ${i}: ${userCount}`);
                if (userCount > 0) {
                    // Click the cross icon in the matched row
                    console.log('Match found for user:', UnAssignUserName);
                    await this.page.waitForTimeout(2000);
                    await row.locator('//mat-icon').click(); // Replace '#Closebutton' with the actual selector
                    break; // Exit the loop after clicking the cross icon
                }
                i++;
            }
            if (i === rowCount) {
                console.log('No match found for user:', UnAssignUserName);
            }
        } catch (error) {
            console.error('Error during test execution of Unassign users:', error.message);
        }

    }
    async CloseAssignedUserModal() {
        await this.AssignedUserModal_closeIcon.click();
    }
}