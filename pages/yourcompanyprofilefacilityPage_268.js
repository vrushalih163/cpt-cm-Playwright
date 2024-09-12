export class YourCompanyProfileFacilityPage {
    constructor(page) {
        this.page = page;
        this.textboxemail=page.locator('#ctl0_TextBoxEmail');
    }

    async  filltextboxemail(result){

        await this.textboxemail.fill(result);
             
  }

  async  clicktextboxemail(){

    await this.textboxemail.click();
         
}


}