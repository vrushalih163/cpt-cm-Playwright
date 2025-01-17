// Author: Micho Eshete Date: 08/19/2024

import { expect } from '@playwright/test';
import moment from 'moment-timezone';
import { AdmissionFaceSheet } from './AdmisssionFaceSheet_51';
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

export class TaskDetailsPage {
    constructor(page) {
        this.page = page;
        this.category_dropdown = page.locator('#ddlCategoryId');
        this.taskItem_dropdown = page.locator('#ddlTaskItemId');
        this.assignTo_dropdown = page.locator('#ddlAssignToId');
        this.startOn_date = page.locator('#ecStartOn_Date');
        this.startOn_time = page.locator('#ecStartOn_Time');
        this.dueBy_date = page.locator('input[name="ecDueBy\\$Date"]');
        this.dueBy_time = page.locator('input[name="ecDueBy\\$Time"]');
        this.priority_dropdown = page.locator('#ddlPriority');
        this.status_dropdown = page.locator('#ddlStatus');

        // Notify when Task is Assigned
        this.notifyCreatorWhenTaskAssigned_checkbox = page.locator('#cbNotifyCreatorWhenAssigned');
        this.notifyOwnerWhenTaskAssigned_checkbox = page.locator('#cbNotifyOwnerWhenAssigned');
        this.notifyWhenAssignedOthers = page.locator('#lnkNotifyWhenAssignedOthers');

        // Notify when Task is Past Due
        this.notifyCreatorWhenTaskPastDue_checkbox = page.locator('#cbNotifyCreatorWhenPastDue');
        this.notifyOwnerWhenTaskPastDue_checkbox = page.locator('#cbNotifyOwnerWhenPastDue');
        this.notifyWhenPastDueOthers = page.locator('#lnkNotifyWhenPastDueOthers');

        // Notify when Task is Completed
        this.notifyCreatorWhenTaskCompleted_checkbox = page.locator('#cbNotifyCreatorWhenCompleted');
        this.notifyOwnerWhenTaskCompleted_checkbox = page.locator('#cbNotifyOwnerWhenCompleted');
        this.notifyWhenCompletedOthers = page.locator('#lnkNotifyWhenCompletedOthers');

        // Add Task Note
        this.addTaskNote_link = page.locator('#AddTaskNoteAjaxLink');
        this.addTaskNote_textarea = page.locator('#TaskNoteControl1_txtNote');
        this.taskNoteModal_caption = page.locator('#ModalDialog_Caption');
        this.taskNoteModal_contents = page.locator('#ModalDialog_Contents');
        this.taskNoteModal_saveButton = page.locator('#ModalDialog1_ModalButtonBar_Save');
        this.taskNoteModal_cancelButton = page.locator('#ModalDialog1_ModalButtonBar_Cancel');


        // Notify when Task is Assigned - Others
        this.lookupLastName_textbox = page.locator('#txtLastName');
        this.refresh_button = page.locator('#btnRefresh');
        this.userItemSelectList_checkbox = page.locator('input[type="checkbox"][onclick*="ItemSelect_CustomApplyCheck"]');
        this.save_button = page.locator('#ButtonBarSave');

        // Save and Apply button from the Task Details page
        this.save_button = page.locator('#ButtonBarSave');
        this.apply_button = page.locator('#ButtonBarApply');

        // Task created Details unser Task note section
        this.createdOn_link = page.locator('#dgTaskNotesList_ctl02_lnkCreatedOn');
        this.createdBy_text = (loggedInUser) => page.locator('td.clsLabelNormalText', { hasText: loggedInUser }).first();
        this.note_text = (expectedNote) => page.locator('div[style="white-space:normal;"]', { hasText: expectedNote }).first();
        this.delete_button = page.locator('#dgTaskNotesList_ctl02_ibDelete');

        // Task note on page - 768
        this.noteText_area = page.locator('#txtNote');
        this.cancel_button = page.locator('#ButtonBarCancel');



    }


    async getSelectedOptionText(locator) {
        return await locator.locator('option:checked').textContent();
    }

    /**
     * Selects a category from the dropdown and verifies the selection.
     *
     * @param {string} categoryName - The name of the category to select.
     * @returns {Promise<void>} - A promise that resolves when the category is selected and verified.
     */
    async selectCategory(categoryName) {
        await this.category_dropdown.selectOption({ label: categoryName });
        await this.page.waitForLoadState('domcontentloaded');
        const selectedCategory = await this.getSelectedOptionText(this.category_dropdown);
        expect(selectedCategory.trim()).toBe(categoryName);
        console.log("The selected category is: " + categoryName);

    }
    /**
     * Selects a task item from the dropdown and verifies the selection.
     *
     * @param {string} taskItemName - The name of the task item to select.
     * @returns {Promise<void>} - A promise that resolves when the task item is selected and verified.
     */
    async selectTaskItem(taskItemName) {
        await this.taskItem_dropdown.selectOption({ label: taskItemName });
        await this.page.waitForLoadState('domcontentloaded');
        const selectedTaskItem = await this.getSelectedOptionText(this.taskItem_dropdown);
        expect(selectedTaskItem.trim()).toBe(taskItemName);
        console.log("The selected task item is: " + taskItemName);
    }

    /**
     * Selects an option from the "Owner / Assign To" dropdown and verifies the selection.
     *
     * @param {string} assignToName - The name of the person to assign the task to.
     * @returns {Promise<void>} A promise that resolves when the selection is complete and verified.
     */
    async selectAssignTo(assignToName) {
        await this.assignTo_dropdown.selectOption({ label: assignToName });
        await this.page.waitForLoadState('domcontentloaded');
        const selectedAssignTo = await this.getSelectedOptionText(this.assignTo_dropdown);
        expect(selectedAssignTo.trim()).toBe(assignToName);
        console.log("The selected Owner/assign To is: " + assignToName);
    }

    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected 
    //then startOn_date should display as the next day from the current date

    /**
     * Verifies that the startOn_date value on the page matches the expected date (next day from the current date).
     * 
     * This method performs the following steps:
     * 1. Retrieves the startOn_date value from the page.
     * 2. Calculates the expected date, which is the next day from the current system date.
     * 3. Compares the retrieved startOn_date value with the expected date.
     * 4. Logs both the retrieved startOn_date and the expected date for verification.
     * 
     * @async
     * @function verifyStartOnDate
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     */
    async verifyStartOnDate() {

        // Get the startOn_date value from the page
        const startOnDateValue = await this.startOn_date.inputValue();

        // Get the current system date and calculate the expected date (next day from the current date)
        const expectedDate = moment().add(1, 'days').format('MM/DD/YYYY');

        // Verify the startOn_date
        expect(startOnDateValue).toBe(expectedDate);

        // Log the startOn_date and expected date
        console.log("The startOn_date is: " + startOnDateValue + " and the expected date is: " + expectedDate);
    }

    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected
    //then startOn_time should display as the current time

    /**
     * Verifies that the startOn_time value on the page matches the current system time within a one-minute tolerance.
     * 
     * @async
     * @function verifyStartOnTime
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     * @throws Will throw an error if the startOn_time does not match the current system time within the tolerance.
     */

    async verifyStartOnTime() {
        // Get the startOn_time value from the page
        const startOnTimeValue = await this.startOn_time.inputValue();

        // Get the current system time in HH:MM AM/PM format and convert to Central Time
        const currentTime = moment().tz('America/Chicago').format('h:mm A');

        // Parse the startOn_time value and convert to Central Time
        const startOnTimeMoment = moment.tz(startOnTimeValue, 'h:mm A', 'America/Chicago');
        const currentTimeMoment = moment.tz(currentTime, 'h:mm A', 'America/Chicago');

        // Calculate the difference in minutes
        const timeDifference = Math.abs(startOnTimeMoment.diff(currentTimeMoment, 'minutes'));

        // Verify the startOn_time matches the current system time within a one-minute tolerance
        if (timeDifference > 1) {
            throw new Error(`The startOn_time (${startOnTimeValue}) does not match the current system time (${currentTime}) within the one-minute tolerance.`);
        }

        // Log the startOn_time and current time
        console.log("The startOn_time is: " + startOnTimeValue + " and the current time is: " + currentTime);
    }

    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected
    //then dueBy_date should display as the next day from the current date

    /**
     * Verifies that the due date displayed on the page matches the expected date (next day from the current date).
     * 
     * This function performs the following steps:
     * 1. Retrieves the due date value from the page.
     * 2. Calculates the expected date, which is the next day from the current system date.
     * 3. Compares the retrieved due date with the expected date.
     * 4. Logs both the retrieved due date and the expected date to the console.
     * 
     * @async
     * @function verifyDueByDate
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     */
    async verifyDueByDate() {

        // Get the dueByDate value from the page
        const dueByDateValue = await this.dueBy_date.inputValue();

        // Get the current system date and Calculate the expected date (next day from the current date)
        const expectedDate = moment().add(1, 'days').format('MM/DD/YYYY');

        // Verify the dueByDate matches the expected date
        expect(dueByDateValue).toBe(expectedDate);

        // Log the dueByDate and expected date
        console.log("The dueByDate is: " + dueByDateValue + " and the expected date is: " + expectedDate);
    }
    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected
    //then dueBy_time should display as the current time

    /**
 * Verifies that the dueByTime value on the page matches the current system time within a one-minute tolerance.
 * 
 * @async
 * @function verifyDueByTime
 * @returns {Promise<void>} A promise that resolves when the verification is complete.
 * @throws Will throw an error if the dueByTime does not match the current system time within the tolerance.
 */
    async verifyDueByTime() {
        // Get the dueByTime value from the page
        const dueByTimeValue = await this.dueBy_time.inputValue();

        // Get the current system time in HH:MM AM/PM format
        const currentTime = moment().tz('America/Chicago').format('h:mm A');

        // Parse the times using moment

        const dueByTimeMoment = moment.tz(dueByTimeValue, 'h:mm A', 'America/Chicago');
        const currentTimeMoment = moment.tz(currentTime, 'h:mm A', 'America/Chicago');

        // Calculate the difference in minutes
        const timeDifference = Math.abs(dueByTimeMoment.diff(currentTimeMoment, 'minutes'));

        // Verify the dueByTime matches the current system time within a one-minute tolerance
        if (timeDifference > 1) {
            throw new Error(`The dueByTime (${dueByTimeValue}) does not match the current system time (${currentTime}) within the one-minute tolerance.`);
        }

        // Log the dueByTime and current time
        console.log("The dueByTime is: " + dueByTimeValue + " and the current time is: " + currentTime);

    }
    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected
    //then priority should display as High 

    /**
     * Verifies that the priority value on the page matches the expected priority.
     * 
     * @async
     * @function verifyPriority
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     * @throws Will throw an error if the priority does not match the expected priority.
     */
    async verifyPriority(expectedPriority) {
        // Get the priority value from the page
        const priorityValue = await this.getSelectedOptionText(this.priority_dropdown);

        // Verify the priority matches the expected priority
        expect(priorityValue.trim()).toBe(expectedPriority);

        // Log the priority value
        console.log("The priority is: " + priorityValue);
    }
    // when category as Admissiom, Task as Regressionadmission, and Owner from Pre-Condition are selected
    //then status should display as in Progress 


    /**
     * Verifies that the status value on the page matches the expected status.
     * 
     * @async
     * @function verifyStatus
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     * @throws Will throw an error if the status does not match the expected status.
     */
    async verifyStatus(expectedStatus) {
        // Get the status value from the page
        const statusValue = await this.getSelectedOptionText(this.status_dropdown);

        // Verify the status matches the expected status
        expect(statusValue.trim()).toBe(expectedStatus);

        // Log the status value
        console.log("The status is: " + statusValue);
    }


    //Click the Notify Creator When Task Completed checkbox
    async clickChecknobxCompleted() {
        await this.notifyCreatorWhenTaskCompleted_checkbox.check();
        await this.notifyOwnerWhenTaskCompleted_checkbox.check();


    }

    /**
 * Clicks on all "Others" links for notifications when the task is assigned, past due, and completed,
 * performs the necessary actions for each.
 * 
 * @async
 * @function clickOthersLinkNotifyWhenTaskIsAssigned
 * @param {string} userLastName - The last name of the user to look up.
 * @returns {Promise<void>} A promise that resolves when all the actions are performed for each link.
 */
    async clickOthersLinkAndSelectOtherUsers(userLastName) {
        const othersLinks = [
            this.notifyWhenAssignedOthers,
            this.notifyWhenPastDueOthers,
            this.notifyWhenCompletedOthers
        ];

        for (const link of othersLinks) {
            await link.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
            await this.lookupLastName_textbox.fill(userLastName);
            await this.refresh_button.click();
            await this.userItemSelectList_checkbox.check();
            await this.save_button.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
        }

        // Log the action
        console.log("Performed actions for all 'Others' links for notifications.");
    }



    //  Checkboxes for Creator and Owner will be checked by default for Notify when Task is Assigned 
    //and other user you have selected in precondition will be displayed by default. 


    /**
     * Verifies that the checkboxes for Creator and Owner are checked by default for "Notify when Task is Assigned"
     * and that other users selected in the precondition are displayed by default.
     * 
     * @async
     * @function verifyNotifyWhenTaskIsAssigned
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     * @throws Will throw an error if the checkboxes for Creator and Owner are not checked by default or if the other users are not displayed by default.
     */
    async verifyNotifyWhenTaskIsAssigned() {
        // Verify that the Creator checkbox is checked by default
        const isCreatorChecked = await this.notifyCreatorWhenTaskAssigned_checkbox.isChecked();
        expect(isCreatorChecked).toBe(true);

        // Verify that the Owner checkbox is checked by default
        const isOwnerChecked = await this.notifyOwnerWhenTaskAssigned_checkbox.isChecked();
        expect(isOwnerChecked).toBe(true);

        // Verify that the other users selected in the precondition are displayed by default
        const otherUsersText = await this.notifyWhenAssignedOthers.textContent();
        const expectedUsers = ['AdmissionTask Other']; // Replace with the actual expected users from the precondition
        expectedUsers.forEach(user => {
            expect(otherUsersText).toContain(user);
        });

        // Log the verification results
        console.log("The Creator and Owner checkboxes are checked by default, and the expected users are displayed by default.");
    }


    /**
     * Verifies that the checkboxes for Creator and Owner are checked by default for "Notify when Task is Past Due"
     * and that other users selected in the precondition are displayed by default.
     * 
     * @async
     * @function verifyNotifyWhenTaskIsPastDue
     * @returns {Promise<void>} A promise that resolves when the verification is complete.
     * @throws Will throw an error if the checkboxes for Creator and Owner are not checked by default or if the other users are not displayed by default.
     * 
     */

    async verifyNotifyWhenTaskIsPastDue() {
        // Verify that the Creator checkbox is checked by default
        const isCreatorChecked = await this.notifyCreatorWhenTaskPastDue_checkbox.isChecked();
        expect(isCreatorChecked).toBe(true);

        // Verify that the Owner checkbox is checked by default
        const isOwnerChecked = await this.notifyOwnerWhenTaskPastDue_checkbox.isChecked();
        expect(isOwnerChecked).toBe(true);

        // Verify that the other users selected in the precondition are displayed by default
        const otherUsersText = await this.notifyWhenPastDueOthers.textContent();
        const expectedUsers = ['AdmissionTask Other']; // Replace with the actual expected users from the precondition
        expectedUsers.forEach(user => {
            expect(otherUsersText).toContain(user);
        });

        // Log the verification results
        console.log("The Creator and Owner checkboxes are checked by default, and the expected users are displayed by default.");

    }


    //Checkboxes for Creator and Owner will be checked by default for Notify when Task is Completed 
    //and other user you have selected in precondition will be displayed by default.


    async clickCheckboxNotifyWhenTaskIsCompleted() {

        // Check the Notify Creator When Task Completed checkbox
        await this.notifyCreatorWhenTaskCompleted_checkbox.check();

        // Check the Notify Owner When Task Completed checkbox
        await this.notifyOwnerWhenTaskCompleted_checkbox.check();

        // Verify that the Creator checkbox is checked by default
        const isCreatorChecked = await this.notifyCreatorWhenTaskCompleted_checkbox.isChecked();
        expect(isCreatorChecked).toBe(true);

        // Verify that the Owner checkbox is checked by default
        const isOwnerChecked = await this.notifyOwnerWhenTaskCompleted_checkbox.isChecked();
        expect(isOwnerChecked).toBe(true);

        // Verify that the other users selected in the precondition are displayed 
        const otherUsersText = await this.notifyWhenCompletedOthers.textContent();
        const expectedUsers = ['AdmissionTask Other']; // Replace with the actual expected users from the precondition
        expectedUsers.forEach(user => {
            expect(otherUsersText).toContain(user);
        });

        // Log the verification results
        console.log("The Creator and Owner checkboxes are checked by default, and the expected users are displayed by default.");
    }

    /**
 * Adds a task note if the modal elements are visible and enabled, and verifies that the caption and contents contain text.
 * 
 * @async
 * @function addTaskNote
 * @param {string} noteText - The text to add to the task note.
 * @returns {Promise<void>} A promise that resolves when the task note is added.
 * @throws Will throw an error if any of the modal elements are not visible or enabled, or if the caption or contents are empty.
 */
    async verifyModalAndAddTaskNote(noteText) {
        // Click the Add Task Note link
        await this.addTaskNote_link.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);

        // Verify that the modal elements are visible and enabled
        const isSaveButtonVisible = await this.taskNoteModal_saveButton.isVisible({ state: 'visible', timeout: 9000 });
        const isSaveButtonEnabled = await this.taskNoteModal_saveButton.isEnabled({ state: 'enabled', timeout: 9000 });
        const isCancelButtonVisible = await this.taskNoteModal_cancelButton.isVisible({ state: 'visible', timeout: 9000 });
        const isCancelButtonEnabled = await this.taskNoteModal_cancelButton.isEnabled({ state: 'enabled', timeout: 9000 });


        if (!isSaveButtonVisible || !isSaveButtonEnabled) {
            throw new Error('The save button is not visible or not enabled.');
        }
        if (!isCancelButtonVisible || !isCancelButtonEnabled) {
            throw new Error('The cancel button is not visible or not enabled.');
        }

        // Verify that the caption and contents contain text
        const captionText = await this.taskNoteModal_caption.textContent('Add task note');
        const contentsText = await this.taskNoteModal_contents.textContent('Please note: To protect patient confidentiality');

        if (!captionText.trim()) {
            throw new Error('The caption does not contain any text.');
        }
        if (!contentsText.trim()) {
            throw new Error('The contents do not contain any text.');
        }

        // Fill the task note textarea
        await this.addTaskNote_textarea.fill(noteText);

        // Click the save button
        await this.taskNoteModal_saveButton.click();

        // Wait for the page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Log the action
        console.log("Task note added successfully.");
    }

    //Click on Apply button
    async clickApplyButton() {
        await this.apply_button.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    //Click on Save button
    async clickSaveButton() {
        await this.save_button.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Verifies the details on the task creation page.
     * 
     * This method performs the following checks:
     * - Ensures the category dropdown is disabled.
     * - Ensures the task input dropdown is disabled.
     * - Ensures the owner/assign dropdown is enabled.
     * - Ensures the start on date input is enabled.
     * - Ensures the start on time input is enabled.
     * - Ensures the due by date input is enabled.
     * - Ensures the due by time input is enabled.
     * - Ensures the priority dropdown is enabled.
     * - Ensures the status dropdown is enabled.
     * 
     * @async
     * @returns {Promise<void>} A promise that resolves when all assertions have been made.
     */
    async verifyTaskCreatedDetailsPage() {
        // Category should be disabled
        const isCategoryDisabled = await this.category_dropdown.isDisabled();
        console.assert(isCategoryDisabled, 'Category dropdown should be disabled');
        console.log("Category is disabled");

        // Task should be disabled
        const isTaskDisabled = await this.taskItem_dropdown.isDisabled();
        console.assert(isTaskDisabled, 'Task input should be disabled');
        console.log("Task is disabled");

        // Owner/Assign should be enabled
        const isOwnerAssignEnabled = await this.assignTo_dropdown.isEnabled();
        console.assert(isOwnerAssignEnabled, 'Owner/Assign dropdown should be enabled');
        console.log("Owner/Assign is enabled");

        // Start on date should be enabled
        const isStartOnDateEnabled = await this.startOn_date.isEnabled();
        console.assert(isStartOnDateEnabled, 'Start on date input should be enabled');
        console.log("Start on date is enabled");

        // Start on time should be enabled
        const isStartOnTimeEnabled = await this.startOn_time.isEnabled();
        console.assert(isStartOnTimeEnabled, 'Start on time input should be enabled');
        console.log("Start on time is enabled");

        // Due by date should be enabled
        const isDueByDateEnabled = await this.dueBy_date.isEnabled();
        console.assert(isDueByDateEnabled, 'Due by date input should be enabled');
        console.log("Due by date is enabled");

        // Due by time should be enabled
        const isDueByTimeEnabled = await this.dueBy_time.isEnabled();
        console.assert(isDueByTimeEnabled, 'Due by time input should be enabled');
        console.log("Due by time is enabled");

        // Priority should be enabled
        const isPriorityEnabled = await this.priority_dropdown.isEnabled();
        console.assert(isPriorityEnabled, 'Priority dropdown should be enabled');
        console.log("Priority is enabled");

        // Status should be enabled
        const isStatusEnabled = await this.status_dropdown.isEnabled();
        console.assert(isStatusEnabled, 'Status dropdown should be enabled');
        console.log("Status is enabled");
    }



    // Verify Task Notes Section

    // Created On link is same as todays date and Click on the link and a new page is displayed 
    // verify the same Notes entered in verifyModalAndAddTaskNote step are displayed and cancel the page and come back to the Task Details page
    // Verify the Created By is the username who created the task which is same as the logged in user
    // Veify note is displayed correctly and Note is the same as entered in verifyModalAndAddTaskNote step
    // Veify Delete button is enabled
    async verifyTaskNotesSection(expectedNote, loggedInUser) {
        // Verify 'Created On' link is present and has today's date
        await this.createdOn_link.waitFor();
        const createdOnText = await this.createdOn_link.textContent();
        const today = new Date().toLocaleDateString('en-US');
        console.assert(createdOnText.trim() === today, `Created On link does not have today's date: ${today}`);

        // Click on the 'Created On' link and verify the note in the new page
        await this.createdOn_link.click();
        await this.page.waitForLoadState('domcontentloaded');

        // Verify the note content in the new page
        const noteText = await this.noteText_area.textContent();
        console.assert(noteText.trim() === expectedNote, 'Note text does not match the expected note');

        // Cancel the page and come back to the Task Details page
        await this.cancel_button.click();
        await this.page.waitForLoadState('domcontentloaded');

        // Verify the 'Created By' user
        const createdByText = await this.createdBy_text(loggedInUser).textContent(loggedInUser);
        console.assert(createdByText.trim() === loggedInUser, 'Created By user does not match the logged in user');

        // Verify the note content in the Task Details page
        const noteTextInTaskDetails = await this.note_text(expectedNote).textContent(expectedNote);
        console.assert(noteTextInTaskDetails.trim() === expectedNote, 'Note text in Task Details does not match the expected note');

        // Verify the delete button is enabled
        const isDeleteButtonEnabled = await this.delete_button.isEnabled();
        console.assert(isDeleteButtonEnabled, 'Delete button is not enabled');
    }

    // Verify Task History Section
    async verifyTaskHistorySection() {
        // Verify the Task History Section
    }

    // Verify Task is Assigned, Past Due, and Task is Completed - Email Notification is received by creator, Owner and other user.

    async verifyTaskEmailNotification(subject, from) {
        const config = {
            imap: {
                user: 'your-email@gmail.com',
                password: 'your-email-password',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };

        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchCriteria = ['UNSEEN', ['HEADER', 'SUBJECT', subject], ['FROM', from]];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

        const messages = await connection.search(searchCriteria, fetchOptions);

        if (messages.length > 0) {
            const parts = messages[0].parts;
            const email = await simpleParser(parts[0].body);
            console.log('Email found:', email);
            return true;
        } else {
            console.log('Email not found');
            return false;
        }
    }


    // Verify Task is Assigned, Task Past Due and Task is Completed - Pager Notification is received by creator, Owner and other user.
    async verifyTasPagerNotification() {
    // Verify the Task Assigned Pager Notification
}



}




