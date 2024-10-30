// Author - Vrushali Honnatti Date:10th July, 2024
// Modified by: Rajakumar Maste, Modified on: 24 Sept 2024

import { Page, Locator, test, expect } from '@playwright/test';
import { ApplicationNavigator } from './ApplicationNavigator';

export class ManageContextNavigator {

  constructor(page) {
    this.page = page;
    // Create an instance of ApplicationNavigator
    this.appNav = new ApplicationNavigator(page); 

    //Admission Controls
    this.admissionplusicon_link = page.getByRole('link', { name: '' });
    this.admissionLeftNav_link = page.getByRole('link', { name: 'Admission' });
    this.financial_link = page.getByRole('link', { name: 'Financial' });
    this.Dignosis_link = page.getByRole('link', { name: 'Diagnoses' });
    this.Procedure_link = page.getByRole('link', { name: 'Procedure' });

    //Referral Controls
    this.createNewReferral_link = page.getByTitle('Create a new referral');
    this.chooseRecipients_link = page.locator('xpath=//a[contains(@name,"choose_recipients")]');
    this.sendReferral_link = page.locator('xpath=//a[contains(@name,"___send_referral")]')

    //Navigation Panel Controls
    this.OpenNavPanel_link = page.locator('#maximizedlink');
    this.CloseNavPanel_link = page.locator('#minimizedlink');

    //Documentation Controls
    this.Documentation_link = page.getByRole('link', { name: 'Documentation' });
    this.SavedDays_link = page.locator('xpath=//a[contains(@name, "navbar_saved_days")]');
    this.PayorAuthorizations_link = page.locator('//div//a[contains(@name, "navbar_payor_authorizations")]');
    this.BusinessLetter_link = page.locator('//div//a[contains(@name, "navbar_business_letters")]');
    this.DocPostAuth_link = page.locator('xpath=//a[contains(@name,"navbar_post_acute_auth")]');
    this.ToggleDocumentationFunctions_button = page.locator('xpath=//div/span[@class="ion-menu-toggle-span"][following-sibling::a[text()="Documentation"]]');

    //CM Assessments Controls
    this.CMAssesments_link = page.getByRole('link', { name: 'CM Assessments' });

    //Review Controls
    this.newReview_link = page.getByTitle('Create a new review');
    this.reviewCriteria_link = page.locator('xpath=//ul[@class="ion-navbaritem-list"]/li/div/a[contains(@name, "navbar_step") and contains(@name,"review_criteria")]');
    this.communications_link = page.locator('xpath=//ul[@class="ion-navbaritem-list"]/li/div/a[contains(@name, "navbar_step") and contains(@name,"communications")]');
    this.typeFacesheet_link = page.locator('xpath=//ul[@class="ion-navbaritem-list"]/li/div/a[contains(@name, "navbar_step") and contains(@name,"type_and_face_sheet")]');

    //Discharge Planning Controls
    this.DischargePlanning_link = page.getByRole('link', { name: 'Discharge Planning' })
    

    // Tasks Default View
    this.task_link = page.locator('#Manage_Header_Manage_Header_Menu_Tasks');
    this.taskDefaultView_link = page.locator('[name="tasks_tasks_default_view"]');
    
        
  }


  async clickadmissionplusicon() {

    await this.admissionplusicon_link.click();

  }

  async NavigateToFinancial() {
    this.admissionLeftNav_link.click();
    this.financial_link.click();
  }

  async NavigateToCreateReferral() {

    await this.createNewReferral_link.click();

  }

  async NavigateToAdmissionDetails() {
    await this.page.locator('li').filter({ hasText: 'Admission Admission Details' }).locator('i').first().click();
    await this.page.getByRole('link', { name: 'Admission Details' }).click();

  }
  async NavigateToChooseRecipients() {

    await this.chooseRecipients_link.click();
  }

  async NavigateToSendReferrals() {

    await this.sendReferral_link.click();
  }

  async OpenNavigationPanel() {
    if (await this.OpenNavPanel_link.isVisible()) {
      await this.OpenNavPanel_link.click();
    }
  }

  async NavigateToDocumentationPostAuth() {
    if (await this.OpenNavPanel_link.isVisible()) {
      await this.OpenNavPanel_link.click();
    }

    if (await this.DocPostAuth_link.isVisible() != true) {
      this.ToggleDocumentationFunctions_button.click();
      await this.page.waitForTimeout(1000);
    }

    this.DocPostAuth_link.click();


  }

  async NavigateTOCMAssessments() {
    this.CMAssesments_link.click();
  }

  async ClickCreateNewReview() {

    await this.newReview_link.click();
  }

  async NavigateToReviewCriteria() {

    await this.reviewCriteria_link.click();
  }

  async NavigateToCommunications() {

    await this.communications_link.click();
  }

  async NavigateToTypeFaceSheet() {

    await this.typeFacesheet_link.click();
  }

  async NavigateToDischargePlanning() {
    await this.DischargePlanning_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  /**
   * This method is used to click on Diagnosis link
   */
  async Click_Dignoses() {
    await this.Dignosis_link.click();
  }

  /**
   * This method is used to click on Procedure
   */
  async NavigateToProcedure() {
    await this.Procedure_link.click();
    await expect(this.page.locator('#ECIN_Pagelet_Content')).toBeVisible();
  }

  /**
   * This method is used to click on Documentation link
   */
  async Click_Documentation() {
    await this.Documentation_link.click();
  }

  /**
   * This method is used to navigate to Saved Days
   */
  async NavigateToSavedDays() {
    await this.SavedDays_link.click();
  }

  /**
   * This method is used to navigate to Payor Authorizations
   */
  async PayorAuthorizations_Click() {
    await this.PayorAuthorizations_link.click();
  }

  /**
   * This method is used to navigate to Business Letter
   */
  async BusinessLetter_Click() {
    await this.BusinessLetter_link.click();
  }


   // Navigate to Task Default View
   async navigateToTaskDefaultView() {
    // Navigate to Manage > Tasks > Task Default View
    await this.appNav.manage_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.task_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.taskDefaultView_link.click();
    await this.page.waitForLoadState('domcontentloaded');
}


  
}
