// Author - Vrushali Honnatti Date:10th July, 2024
import { Page, Locator, test } from '@playwright/test';
export class ForwardReferralPage {
      constructor(page) {
            this.page = page;
            this.Comments_text = page.locator('#rptForwardReferralComments_ctl01_txtForwardReferralComments');
            this.ForwardReferral_button = page.getByRole('button', { name: 'Forward' });
      }

      /**
       * This method is used to enter comments
       * @param {string} comments 
       */
      async EnterComments(comments) {
            await this.Comments_text.fill(comments);
      }

        /**
         * Click on Forward Referral button
         */
        async ClickForwardReferral() {
                await this.ForwardReferral_button.click();
        }

     
}