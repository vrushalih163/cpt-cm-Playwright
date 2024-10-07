
// Author - Vrushali Honnatti Date:10th July, 2024
import { Page, Locator, test, expect } from '@playwright/test';
export class ReferralConfirmationPage {

      constructor(page) {
            this.page = page;
            // this.continue_button = page.getByRole('button', { name: 'Continue' });
            // this.confirm_label = page.locator('#m_ConfirmText');
            // this.jumpToProvider_link = page.locator('#rptJumpToOrg_ctl01_lnkChangeOrg');
      }

      async ClickContinue() {

            await this.page.getByRole('button', { name: 'Continue' }).click();

      }

      async validateConfirmationText(message) {
            await expect(this.page.locator('#m_ConfirmText')).toContainText(message);
      }

      async getReferralId() {
            let textMsg = await this.page.locator('#m_ConfirmText').textContent();
            let referralId = textMsg.split('-')
            let temp = referralId[1].split(' ')
            return String(temp[0]);
      }

      async clickJumpToProvider() {
            //await this.jumpToProvider_link.click();
            await this.page.locator('#rptJumpToOrg_ctl01_lnkChangeOrg').click();
      }
}