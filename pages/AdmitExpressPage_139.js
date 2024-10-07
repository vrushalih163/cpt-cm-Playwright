// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class AdmitExpressPage {

constructor(page) {
      this.page = page;
      this.ReferralType_dropdown = page.locator('#m_ReferralTypesList');
      this.FirstName_textbox = page.locator('#m_FirstNameText');
        this.LastName_textbox = page.locator('#m_LastNameText');
        this.MRN_textbox = page.locator('#m_MRNText');
        this.AccountNumber_textbox = page.locator('#m_AcctNumberText');
        this.DOB_textbox = page.locator('#m_DOBDate_Date');
        this.Gender_dropdown = page.locator('#m_ddlGender');
        this.City_textbox = page.locator('#m_CityText');
        this.State_dropdown = page.locator('#m_StateList_States');
        this.AdmissionDate_textbox = page.locator('#m_AdmissionDate_Date');
        this.AdmissionTime_textbox = page.locator('#m_AdmissionDate_Time');
        this.ProjDschDate_textbox = page.locator('#m_ProjDschDate_Date');
        this.ProjDschTime_textbox = page.locator('#m_ProjDschDate_Time');
        this.PrimaryDiagnosis_textbox = page.locator('input[name="m_PrimDgText"]');
        this.PrimayPaymentSource_link = page.getByRole('link', { id: 'm_PaySrcLink' });
        this.AdmissionComment_textbox = page.locator('#m_AssessText');
        this.ReferralComment_textbox = page.locator('#m_RefCommentsText');
        this.OrganizationState_dropdown = page.locator('#m_OrgStateList_States');
        this.OrganizationName_textbox = page.locator('#m_OrgNameText');
        this.OrganizationFind_button = page.locator('#m_OrgFindButton');
        this.OrganizationAvailableList_dropdown = page.locator('#m_OrgAvailList');
        this.AddSelected_button = page.getByRole('button', { name: '+ Add Selected' });
        this.AddAll_button = page.getByRole('button', { name: '+ Add All' });
        this.UnmaskPatientInfo_checkbox = page.getByLabel('Unmask Patient Info');
        this.SendReferral_button = page.getByRole('button', { name: 'Send Referral' });

}

/**
 * This method is used to fill the information in the Admit Express page.
 * @param {string} result
 */
async SetInformationSection(result){
    await this.FirstName_textbox.fill('AutoFN' + result);
    await this.LastName_textbox.fill('AutoLN' + result);
    await this.MRN_textbox.fill('AutoMRN' + result);
    await this.AccountNumber_textbox.fill('AutoAcctNo' + result);
    await this.DOB_textbox.fill(+1);
    await this.PrimaryDiagnosis_textbox.fill('AutoPD' + result);
}

/**
 * This method is used to Choose Recipients in the Admit Express page.
 * @param {string} providerName
 */
async ChooseRecipients(providerName){
    await this.OrganizationState_dropdown.selectOption('GU');
    await this.OrganizationName_textbox.fill(providerName);
    await this.OrganizationFind_button.click();
    await this.AddAll_button.click();
}

/**
 * This method is used to Click on Send Referral button in the Admit Express page.
 */
async ClickSendReferral(){
    await this.SendReferral_button.click();
}

/**
 * This method is used to Unmask Patient Info in the Admit Express page.
 */
async unMaskAllPatientInfo(){
    await this.UnmaskPatientInfo_checkbox.click();
}

/**
 * This method is used to Select Referral Type in the Admit Express page.
 * @param {string} referralName
 */
async SelectReferralType(referralName)
{
    await this.ReferralType_dropdown.selectOption(referralName);
}
}