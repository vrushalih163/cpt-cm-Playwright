// Author - Vrushali Honnatti Date:22nd July, 2024

import {Page, Locator, test, expect } from '@playwright/test';
export class PayorCommunicationPage {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.Apply_button = page.getByRole('button', { name: 'Apply', exact: true });
      this.Back_button = page.getByRole('button', { name: 'Back', exact: true });
      this.Reset_button = page.locator('#ButtonBarReset');
      this.Complete_button = page.locator('ButtonBarComplete');

      this.PlanDescription_dropdown = page.locator('#m_PlanDescriptionList');
      this.ContactMethod_dropdown = page.locator('#m_ContactMethodList');
      this.UMStatus_dropdown = page.locator('#ddlUMStatus');
      
}

async  clickBack(){
        
    await this.Back_button.click();
         
}

async  clickApply(){
        
    await this.Apply_button.click();    
}

async  clickReset(){
        
    await this.Reset_button.click();
}

async  clickComplete(){
        
    await this.Complete_button.click();
}

async  SetPlanDescription(planDesc){
        
    await this.PlanDescription_dropdown.selectOption(planDesc);
}

async  SetContactMethod(){
        
    await this.ContactMethod_dropdown.selectOption('1');
}

async  SetUMStatus(umStatus){
        
    await this.UMStatus_dropdown.selectOption(umStatus);
}

async ValidateUMStatus(umStatus){
            
        expect(this.UMStatus_dropdown).toContainText(umStatus);
}
}