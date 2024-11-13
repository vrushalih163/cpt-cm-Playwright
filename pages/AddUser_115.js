// Author - Micho Eshete Date: 11/04/2024

import { page } from '@playwright/test';
import { LIB } from '../bizLibs/lib.js';
import { usersPage } from './usersPage_27.js';

export class AddUserPage {

    constructor(page) {
        this.page = page;
        this.lib = new LIB(page);
        this.users = new usersPage(page);
        this.userName_textbox = page.locator('#TextBoxUserName');
        this.firstName_textbox = page.locator('#TextBoxFirstName');
        this.lastName_textbox = page.locator('#TextBoxLastName');
        this.displayName_textbox = page.locator('#TextBoxDisplayName');
        this.email_textbox = page.locator('#TextBoxEmail');
        this.password_textbox = page.locator('#TextBoxPassword');
        this.confirmPassword_textbox = page.locator('#TextBoxRetypePassword');
        this.save_button = page.locator('#ButtonBarSave');
        this.selectOneRole_radio = page.locator('#rbSelectRoles');
        // Locate all checkboxes within the container (div.clsItemUnChecked is used here as the ancestor element)
        this.selectMultipleRoles_checkboxes = page.locator('div.clsItemUnChecked input[type="checkbox"]');
    }

    async enterUserName() {
        const uniqueText = await this.lib.generateUniqueText(6);
        const uniqueInt = await this.lib.generateUniqueIntegerString(4);
        const uniqueUserName = `${uniqueText}${uniqueInt}`;
        await this.userName_textbox.fill(uniqueUserName);
        return uniqueUserName;
    }

    async enterFirstName() {
        const uniqueFirstName = await this.lib.generateUniqueText(6);
        await this.firstName_textbox.fill(uniqueFirstName);
        return uniqueFirstName;
    }
    

    async enterLastName() {
        const uniqueLastName = await this.lib.generateUniqueText(6);
        await this.lastName_textbox.fill(uniqueLastName);
        return uniqueLastName;
    }

    async enterDisplayName() {   
        const uniqueDisplayName = await this.lib.generateUniqueText(6);
        await this.displayName_textbox.fill(uniqueDisplayName);
        return uniqueDisplayName;
    }


    async enterPassword(password) {
        await this.password_textbox.fill(password);
    }

    async enterConfirmPassword(confirmPassword) {
        await this.confirmPassword_textbox.fill(confirmPassword);
    }

    async enterEmail() {
        const uniqueText = await this.lib.generateUniqueText(6);
        const uniqueInt = await this.lib.generateUniqueIntegerString(4);
        const uniqueEmail = `${uniqueText}${uniqueInt}`;
        await this.email_textbox.fill(uniqueEmail + '@gmail.com');
        return uniqueEmail;
    }

    async clickSave() {
        await this.save_button.click();
    }



    async fillNewUserInformation() {
        await this.users.clickAddUser();
        const userName = await this.enterUserName();
        const password = 'Orginization=17'; // Assuming the password is fixed
        await this.enterFirstName();
        await this.enterLastName();
        await this.enterDisplayName();
        await this.enterEmail();
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
        return { userName, password };
        
    }

    async selectMultipleRoles() {
        await this.selectOneRole_radio.waitFor({ state: 'visible' });
        await this.selectOneRole_radio.evaluate(node => node.click()); // Use evaluate to click the radio button
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        const checkboxes = await this.selectMultipleRoles_checkboxes.elementHandles();
        for (const checkbox of checkboxes) {
            await checkbox.scrollIntoViewIfNeeded();
            await checkbox.evaluate(node => node.click()); // Use evaluate to click the checkbox
        }
        await this.page.waitForTimeout(2000);
        
        
    }

    async createNewUser() {
        const { userName, password } = await this.fillNewUserInformation();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await this.selectMultipleRoles();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await this.clickSave();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        console.log('User created successfully' + '\n' + 'Username:' +  userName + '\n' + 'Passowrd:' + password);
        return { userName, password };
    
    }

}