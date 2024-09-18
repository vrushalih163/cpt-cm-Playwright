// Author - Vrushali Honnatti Date:10th July, 2024
// Modified by - Rajakumar Maste, modified date - 18 Sept 2024
// Added Click_Dignoses() and NavigateToProcedure() methods

import { Page, Locator, test, expect } from '@playwright/test';

export class ManageContextNavigator {

  constructor(page) {
    this.page = page;

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

}
