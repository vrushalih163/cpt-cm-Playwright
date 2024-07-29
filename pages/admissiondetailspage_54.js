
// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class AdmissiondetailsPage {

constructor(page) {
      this.page = page;
      this.admissionid_field = page.locator('#txtHospitalAdmissionID');
      this.admissiondate_field = page.locator('#dtPatientAdmission_Date');
      this.admissiontime_field = page.locator('#dtPatientAdmission_Time');
      this.primarydiagnosis_field = page.locator('#txtPrimaryDiagnosis');
      this.facility_dropdown = page.locator('#ddFacilityTypes');
      this.save_button = page.getByRole('button', { name: 'Save' });
      this.apply_button = page.getByRole('button', { name: 'Apply' });

}

async createAdmission(result)
{
    await this.admissionid_field.fill('AutoAccntNo' + result);
    await this.admissiondate_field.fill('+0');
    await this.admissiontime_field.fill('10:10');
    await this.primarydiagnosis_field.fill('fever');
    await this.save_button.click();
}
async  clicksave(){

      await this.save_button.click();
           
}

async  clickApply(){

      await this.apply_button.click();
           
}

async  filladmissionid(result){

      await this.admissionid_field.fill(result);
           
}

async  filladmissiondate(){

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


}