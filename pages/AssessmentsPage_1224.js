
// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class Assessments {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.addAssessment_button = page.getByRole('link', { name: 'Add Assessment' });
      
}

async  clickAddAssessmentButton(){
        
      await this.addAssessment_button.click();
           
}

}