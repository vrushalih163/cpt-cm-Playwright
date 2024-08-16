// Author - Vrushali Honnatti Date:10th July, 2024
//Modified By - Rajakumar Maste, Modified Date: 16th Aug 2024
//comment - Edited the SearchPatientByMRN method
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


    async SearchPatientByMRN(MRN) {
      if(await this.page.locator('#viewsearchminimizedlink'))
            await this.page.locator('#viewsearchmaximizedlink').click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('#ViewSearchBar_MRN').click();
        await this.page.locator('#ViewSearchBar_MRN').fill(MRN);
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        
   }





}