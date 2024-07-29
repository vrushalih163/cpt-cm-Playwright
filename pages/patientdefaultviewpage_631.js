// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class PatientdefaultviewPage {

constructor(page) {
      this.page = page;
      this.addapatient_link = page.getByRole('link', { name: 'Add a Patient' });
      this.action_dropdownbox = page.locator('#ucViewGrid_dgView_ctl03_Actions_0_0_0_ActionItems');
}

async  clickaddapatient(){
      await this.addapatient_link.click();
}

async NavigateActionDDBox(action) {
      await this.action_dropdownbox.selectOption(action)
      this.page.waitForTimeout(2000);
      //await this.page.getByText(action).click();
    }

}