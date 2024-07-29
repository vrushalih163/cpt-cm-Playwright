
// Author - Vrushali Honnatti Date:10th July, 2024
export class SendReferralPage {

constructor(page) {
      this.page = page;
      this.sendReferral_button = page.getByRole('button', { name: 'Send Referral' });
      this.unmaskCheckBox_1 = page.locator('xpath=//tr[@id="ApiGridSelectedRecipients-data-row-entity-index-0"]//td[5]//a//i');
      this.sendReferrralcheckBox_1 = page.locator('xpath=//tr[@id="ApiGridSelectedRecipients-data-row-entity-index-0"]//td[6]//span//input');
}

async checkSendReferralCB_row1()
{
      await this.sendReferrralcheckBox_1.click();
}

async  clickSendReferralButton(){

      await this.sendReferral_button.click();
           
}

async unMaskAllPatientInfo(){
    await this.page.locator('#ApiGridSelectedRecipients_action_2').click();
}
}