// Author - Micho Eshete Date: 11/04/2024

import { expect } from '@playwright/test';
import { ManageSecurityGroups } from './ManageSecurityGroupsPage_1273';

export class AddSecurityGroups {
    constructor (page) {
        this.page = page; 
        this.manageSecurityGroups = new ManageSecurityGroups(page);
        this.securityGroupName_textbox = page.locator('#txtboxSecurityTemplateName');
        this.securityGroupDescription_textbox = page.locator('#txtboxDescription');
        this.selectRoles_radio = page.locator('#rbSelectRoles'); 
        //this.denialReviewer_checkbox = page.getByLabelText('Denial Reviewer'); 
        this.denialReviewer_checkbox = page.locator('//label[text()="Denial Reviewer"]/preceding-sibling::input[@type="checkbox"]'); 
        this.save_button = page.locator('#ButtonBarSave');
        this.newSecurityValidation_summary = page.locator('#PageValidationSummary');
        
       
    }

    async enterSecurityGroupName(securityGroupName) {
        await this.securityGroupName_textbox.fill(securityGroupName);
    }

    async enterSecurityGroupDescription(securityGroupDescription) {
        await this.securityGroupDescription_textbox.fill(securityGroupDescription);
    }

    /**
     * Selects the roles by checking the corresponding radio button.
     */
    async selectRoles() {
        await this.selectRoles_radio.check();
    }

    /**
     * Selects the denial reviewer by checking the corresponding checkbox.
     * 
     */
    async selectDenialReviewer() {
        await this.denialReviewer_checkbox.check();
    }


    async clickSave() {
        await this.save_button.click();
    }

    async createSecurityGroup(securityGroupName, securityGroupDescription) {
        await this.manageSecurityGroups.clickAddSecurityGroup();
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForTimeout(2000);
        await this.enterSecurityGroupName(securityGroupName);
        await this.page.waitForTimeout(2000);
        await this.enterSecurityGroupDescription(securityGroupDescription);
        await this.page.waitForTimeout(2000);
        await this.selectRoles();
        await this.page.waitForTimeout(2000);
        await this.selectDenialReviewer();
        await this.clickSave();
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForTimeout(2000);
        const validationSummaryText = await this.newSecurityValidation_summary.textContent();
        if (validationSummaryText.includes('Security Group Name is already taken, please select another.')) {
            console.log('Error: Security Group Name is already taken, please provide another security Group Name or Delete existing .');
        } else if (validationSummaryText.includes('The security group is added successfully.')) {
            console.log('Success: The security group is added successfully.');
        } else {
            console.log('Unexpected validation summary text:', validationSummaryText);
        }


    }



}