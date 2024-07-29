// Author - Vrushali Honnatti Date:10th July, 2024
export class ReferralFacesheetPage {

constructor(page) {
      this.page = page;
      this.referralType_select =  page.locator('#ddReferralTypes');
      this.projectedDischargeDate_text =  page.locator('#dtProjectedDischarge_Date');
      this.next_button =  page.locator('#ButtonBarNext');
}


async  createReferral(referralType){

      this.referralType_select.selectOption(referralType);
      this.projectedDischargeDate_text.fill('+1');
      this.next_button.click();
           
}

}