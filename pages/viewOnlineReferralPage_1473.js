// Author - Vrushali Honnatti Date:10th July, 2024
export class ViewOnlineReferralPage {

constructor(page) {
      this.page = page;
      this.sendResponse_button =  page.getByRole('button', { name: 'Send Response' });
      this.jumpToReferralSource_link = page.locator('xpath=//a[@mattooltip="Jump to Referral Source"]')
      this.comment_textarea = page.locator('//textarea[@formcontrolname="providerComment"]');
}

async  selectResponse(response){

   //click on the arrow in the right of the drop down 
await this.page.locator('xpath=//acm-mat-dropdown[@id="ddResponse"]//div[contains(@class,"mat-select-arrow-wrapper")]').click();
await this.page.waitForTimeout(5000);

await this.page.locator('span:has-text("' + response +'")').first().click();
}

async SetComment(comment){
    await this.comment_textarea.fill(comment);
}   

async clickSendResponse(){
    await this.sendResponse_button.click();
}

async clickJumpToReferralSource(){

    await this.jumpToReferralSource_link.click();
}
}