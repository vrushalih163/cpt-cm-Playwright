
// Author - Vrushali Honnatti Date:10th July, 2024
import { expect } from '@playwright/test';

export class PatientdetailsPage {

constructor(page) {
      this.page = page;
      this.mrn_field = page.getByLabel('MRN:');
      this.firstname_field = page.getByLabel('First Name:', { exact: true });
      this.lastname_field = page.getByLabel('Last Name:', { exact: true });
      this.dateofbirth_field = page.locator('#ECINCalendarDateOfBirth_Date');
      this.gender_field = page.getByLabel('Sex at Birth:');
      this.save_button = page.getByRole('button', { name: 'Save' });
      this.admissionplusicon_link = page.getByRole('link', { name: '' });
      this.zip_field = page.locator('#Address1_ZipCode_ZipCode');

}

async CreatePatient(result){
    await this.mrn_field.fill('AutoMRN' + result);
    await this.firstname_field.fill('AutoFN' + result);
    await this.lastname_field.fill('AutoLN' + result);
    await this.gender_field.selectOption('Female')
    await this.dateofbirth_field.fill('-9999');
    await this.save_button.click();
}


async  clicksave(){

      await this.save_button.click();
           
}

async  fillmrn(result){

      await this.mrn_field.fill(result);
           
}

async  fillfirstname(result){

      await this.firstname_field.fill(result);
           
}

async  filllastname(result){

      await this.lastname_field.fill(result);
           
}

async  filldateofbirth(){

      await this.dateofbirth_field.fill('-9999');
           
}

async  selectgender(){

      await this.gender_field.selectOption('Female')
           
}

async  clickadmissionplusicon(){

      await this.admissionplusicon_link.click();
           
}

async validatePatientDetails(expectedMRN, expectedFirstName, expectedLastName, expectedDOB, expectedZip) {
      await expect(this.mrn_field).toHaveValue(expectedMRN, { timeout: 10000 });
      await expect(this.firstname_field).toHaveValue(expectedFirstName, { timeout: 10000 });
      await expect(this.lastname_field).toHaveValue(expectedLastName, { timeout: 10000 });
      await expect(this.dateofbirth_field).toHaveValue(expectedDOB, { timeout: 10000 });
      await expect(this.zip_field).toHaveValue(expectedZip, { timeout: 10000 });
}

}