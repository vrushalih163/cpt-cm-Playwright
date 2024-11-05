// Author - Vrushali Honnatti Date:4th November, 2024
import {Page, Locator, test } from '@playwright/test';
export class ResponseNotesPage {

constructor(page) {
      this.page = page;
      this.CallerName_textbox = page.locator('#m_CallerText');
      this.YesResponse_RB = page.locator('#m_ResponsesList_0');
      this.InterestedResponse_RB = page.locator('#m_ResponsesList_1');
      this.NoResponse_RB = page.locator('#m_ResponsesList_2');
      this.ReferralReceivedResponse_RB = page.locator('#m_ResponsesList_3');
      this.Comments_textbox = page.locator('#m_CommentsText');
      this.Save_button = page.locator('#ButtonBarSave')

}

async SetCallerName(name){
    await this.CallerName_textbox.fill(name);
}

async ClickInterestedResponse(){
    await this.InterestedResponse_RB.click();
}

async SetComments(comments){
    await this.Comments_textbox.fill(comments);
}

async ClickSave(){
    await this.Save_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

}