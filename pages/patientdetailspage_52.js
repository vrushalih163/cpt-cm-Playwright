
// Author - Vrushali Honnatti Date:10th July, 2024

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


}