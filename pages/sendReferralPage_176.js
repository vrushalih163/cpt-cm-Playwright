
// Author - Vrushali Honnatti Date:10th July, 2024
export class SendReferralPage {

      constructor(page) {
            this.page = page;
            this.sendReferral_button = page.getByRole('button', { name: 'Send Referral' });
            this.unmaskCheckBox_1 = page.locator('xpath=//tr[@id="ApiGridSelectedRecipients-data-row-entity-index-0"]//td[5]//a//i');
            this.sendReferrralcheckBox_1 = page.locator('xpath=//tr[@id="ApiGridSelectedRecipients-data-row-entity-index-0"]//td[6]//span//input');

            //send later controls
            this.sendLater_radioButton = page.locator('xpath=//input[@id="ucSendReferral_rdoSendLater"]');
            this.sendLaterTime_radioButton = page.locator('xpath=//input[@id="ucSendReferral_rdoTimeDeferred"]');
            this.hours_textbox = page.locator('xpath=//input[@id="ucSendReferral_neHours_Number"]');
            this.minutes_textbox = page.locator('xpath=//input[@id="ucSendReferral_neMinutes_Number"]');
            this.comments_textbox = page.locator('xpath=//textarea[@id="m_Comments"]');

      }

      async checkSendReferralCB_row1() {
            await this.sendReferrralcheckBox_1.click();
      }

      async clickSendReferralButton() {

            await this.sendReferral_button.click();

      }

      async unMaskAllPatientInfo() {
            // await this.page.reload();
            // this.page.waitForLoadState('domcontentloaded');
            await this.page.locator('#ApiGridSelectedRecipients_action_2').click();
      }

      async SendLater() {
            await this.sendLater_radioButton.click();
            await this.sendLaterTime_radioButton.click();
            await this.hours_textbox.fill('0');
            await this.minutes_textbox.fill('2');
            await this.comments_textbox.fill('Sending later');
      }

}