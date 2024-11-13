// Author - Micho Eshete Date: 11/04/2024

import { page } from '@playwright/test';
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
        
       
    }

    async enterSecurityGroupName(securityGroupName) {
        await this.securityGroupName_textbox.fill(securityGroupName);
    }

    async enterSecurityGroupDescription(securityGroupDescription) {
        await this.securityGroupDescription_textbox.fill(securityGroupDescription);
    }

    async selectRoles() {
        await this.selectRoles_radio.check();
    }

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
        await this.page.waitForTimeout(2000);
    }



}