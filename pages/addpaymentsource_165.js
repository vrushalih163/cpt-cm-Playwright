// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
import { AdmissionFinancialInformationPage } from '../pages/AdmissionFinancialInformationPage_55';
import { ManageContextNavigator } from '../pages/ManageContextNavigator';
export class AddPaymentSourcePage {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.finClass_select = page.locator('#listPaymentType');
      this.PlanDesc_select = page.locator('#txtPlanDescription');
      this.PlanNo_select = page.locator('#txtPlanNumber');
      this.save_button = page.getByRole('button', { name: 'Save' });

      this.addfinancial_link = page.locator('#LinkAddPaymentSource');
}


async  setFinClass(finClass){

     await this.finClass_select.selectOption(finClass);
     await this.save_button.click();
           
}

async SetPlanDescAndNo(planDesc, planNo) {
      await this.PlanDesc_select.fill(planDesc);
      await this.PlanNo_select.fill(planNo);
      await this.save_button.click();
}

async createFinancial(finClass, planDesc, planNo) {

      const ManageContextNav = new ManageContextNavigator(this.page);
      const AdmissionFinancialInformation = new AdmissionFinancialInformationPage(this.page)

      await ManageContextNav.NavigateToFinancial();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);

      await AdmissionFinancialInformation.clickaddfinancial();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);

      await this.finClass_select.selectOption(finClass);

      await this.PlanDesc_select.fill(planDesc);
      await this.PlanNo_select.fill(planNo);
      await this.save_button.click();

      return planDesc + ' - ' + planNo;
  }
}