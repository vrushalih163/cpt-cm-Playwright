export class YourCompanyProfileFacilityPage {
    constructor(page) {
        this.page = page;
        this.textboxemail=page.locator('#ctl0_TextBoxEmail');
        this.phoneextension=page.locator('#ctl0_Phone_Extension');
        this.phonenumber=page.locator('#ctl0_Phone_Number');
        this.phoneexchange=page.locator('#ctl0_Phone_Exchange');
        this.phoneareacode=page.locator('#ctl0_Phone_AreaCode');   
        this.textboxemail=page.locator('#ctl0_TextBoxEmail');     
    }

    async  filltextboxemail(result){

        await this.textboxemail.fill(result);
             
  }

  async  clicktextboxemail(){

    await this.textboxemail.click();
         
}

async  fillphoneextension(result){

    await this.phoneextension.fill(result);
         
}

async  clickphoneextension(){

await this.phoneextension.click();
     
}

async  fillphonenumber(result){

    await this.phonenumber.fill(result);
         
}

async  clickphonenumber(){

await this.phonenumber.click();
     
}

async  pressphonenumber(){

await this.phonenumber.press('ArrowRight');
     
}
async  fillphoneexchange(result){

    await this.phoneexchange.fill(result);
         
}

async  clickphoneexchange(){

await this.phoneexchange.click();
     
}

async  pressphoneexchange(){

await this.phoneexchange.press('ArrowRight');
     
}

async  fillphoneareacode(result){

    await this.phoneareacode.fill(result);
         
}

async  clickphoneareacode(){

await this.phoneareacode.click();
     
}

async  pressphoneareacode(){

await this.phoneareacode.press('ArrowRight');
     
}

async  filltextboxemail(result){

    await this.textboxemail.fill(result);
         
}

async  clicktextboxemail(){

await this.textboxemail.click();
     
}

async  presstextboxemail(){

await this.textboxemail.press('ArrowRight');
     
}


}