// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test, expect } from '@playwright/test';
export class ReferralCommentsPage {

constructor(page) {
      this.page = page;
      this.NotifyCheckCheckbox = page.locator('#m_NotifyCheck');
      this.SendReferralCheckbox = page.locator('#m_SendReferralCheck');
      this.UnmaskCheckbox = page.locator('#m_UnmaskCheck');
      this.ReferralCommentsTextbox = page.locator('#m_CommentsText');
      this.SendReferralButton = page.locator('#ButtonBarSendResponse');
      this.action_dropdownbox = page.locator('#ucViewGrid_dgView_ctl03_Actions_0_0_0_ActionItems');
      
}

/**
 * Click on Notify Check Checkbox
 */
async  clickNotifyCheck(){
      await this.NotifyCheckCheckbox.check();
}

/**
 * Click on Send Referral Check Checkbox
 */
async  clickSendReferralCheck(){
      await this.SendReferralCheckbox.check();
}

/**
 * Click on Unmask Check Checkbox
 */
async  clickUnmaskCheck(){
      await this.UnmaskCheckbox.check();
}

/**
 * Enter Referral Comments
 */
async  enterReferralComments(comments){
      await this.ReferralCommentsTextbox.fill(comments);
}

/**
 * Click on Send Referral Button
 */
async  clickSendReferralButton(){
      await this.SendReferralButton.click();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
}

async ValidateNotifyChecked(bFlag){
        await expect(this.NotifyCheckCheckbox).toBeChecked(bFlag);
}

async ValidateSendReferralChecked(bFlag){
        await expect(this.SendReferralCheckbox).toBeChecked(bFlag);
}

async ValidateUnmaskChecked(bFlag){
        await expect(this.UnmaskCheckbox).toBeChecked(bFlag);
}

async ValidateReferralComments(comments){
        await expect(this.ReferralCommentsTextbox).toHaveValue(comments);
}

async navigateActionDDBox(action) {
    await this.action_dropdownbox.selectOption(action)
    this.page.waitForTimeout(2000);
    //await this.page.getByText(action).click();
  }
}