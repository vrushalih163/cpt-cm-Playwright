
// Author - Vrushali Honnatti Date:10th July, 2024
// Modified by - Rajakumar Maste, modified date - 18 Sept 2024
// comment - updated the createAdmission method

import {Page, Locator, test, expect } from '@playwright/test';
export class AdmissiondetailsPage {

constructor(page) {
      this.page = page;
      this.admissionid_field = page.locator('#txtHospitalAdmissionID');
      this.admissiondate_field = page.locator('#dtPatientAdmission_Date');
      this.admissiontime_field = page.locator('#dtPatientAdmission_Time');
      this.primarydiagnosis_field = page.locator('#txtPrimaryDiagnosis');
      this.ProjectedDischargeDate_textBox = page.locator('#dtProjectedDischarge_Date');
      this.ProjectedDischargeTime_textbox = page.locator('#dtProjectedDischarge_Time');
      this.facility_dropdown = page.locator('#ddFacilityTypes');
      this.save_button = page.getByRole('button', { name: 'Save' });
      this.apply_button = page.getByRole('button', { name: 'Apply' });
      this.PatientTypeOrderDate_field = page.locator('#dtPatientTypeOrder_Date');
      this.PatientTypeOrderTime_field = page.locator('#dtPatientTypeOrder_Time');
      this.UMStatus_DD = page.locator('#ddlURStatus');

}

async createAdmission(result)
{
    await this.admissionid_field.fill('AutoAccntNo' + result);
    await this.admissiondate_field.fill('+0');
    await this.admissiontime_field.fill('10:10');
    await this.ProjectedDischargeDate_textBox.fill('+2');
    await this.ProjectedDischargeTime_textbox.fill('10:10');
    await this.primarydiagnosis_field.fill('fever');
    await this.PatientTypeOrderDate_field.fill('+0');
    await this.PatientTypeOrderTime_field.fill('10:10');          
    await this.save_button.click();
}
async  clicksave(){

      await this.save_button.click();
           
}

async  clickApply(){

      await this.apply_button.click();
           
}

async  SetAdmissiondate(){

      await this.admissiondate_field.fill('+0');
           
}

async  filladmissiontime(){

      await this.admissiontime_field.fill('10:10');
           
}

async  fillprimarydiagnosis(){

      await this.primarydiagnosis_field.fill('fever');
           
}

async selectFacility(facilityName){
      await this.page.locator('#AdmissionGeneralInformation').click(); //java script in the app is getting called
      await this.facility_dropdown.selectOption(facilityName);
}

async GetProjectedDischargeDate(){
      return await this.ProjectedDischargeDate_textBox.innerText();
}

async GetProjectedDischargeTime(){
      return await this.ProjectedDischargeTime_textbox.innerText();
}

async GetPrimaryDiagnosis(){
      return await this.primarydiagnosis_field.innerText();
}

async SetUMStatus(umStatus){
      await this.UMStatus_DD.selectOption(umStatus);
}

async ValidateUMStatus(umStatus){
      await expect(this.UMStatus_DD).toContainText(umStatus);
}
}