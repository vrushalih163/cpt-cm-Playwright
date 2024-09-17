// Author - Vrushali Honnatti Date:10th July, 2024
import {expect } from '@playwright/test';
export class CmPostauthSummaryPage {

constructor(page) {
      this.page = page;
      
      //summary page
      this.vertical_menuButton = page.locator('xpath=//a[@aria-label="Example icon-button with a menu"]//mat-icon[@id="iconEllipse"]').first()
      this.requestAuth_link = page.getByRole('menuitem', { name: 'Request Authorization' });
      this.documentation_link = page.getByRole('menuitem', { name: 'Document Notes/Responses' });
      this.NotResponsibleForAuth_link = page.getByRole('menuitem', { name: 'Not Responsible for Auth' });
      this.summaryPageRowData = page.locator('#payor-summary-table').getByRole('rowgroup');
      

      //Request Auth Popup
      this.AddressBook_button = page.locator('#btnAddressBook');
      this.SearchAB_providerName = page.getByLabel('Plan Description or Contact');
      this.SearchAB_SearchButton = page.getByRole('button', { name: 'Search' });
        this.sendRequest_button = page.getByRole('button', { name: 'Send Request' });

      //Record Communication Popup

      //Not Reponsible for Auth Popup
      this.noRadioButton = page.locator('#rdbtnNo > .mat-radio-label > .mat-radio-container > .mat-radio-outer-circle');
      this.save_button = page.getByRole('button', { name: 'Save' });
}


//Summary Page
async  clickRequestAuth(){
        
      await this.vertical_menuButton.click();
      this.page.waitForTimeout(1000);
      await this.requestAuth_link.click();
           
}

async  clickRecordCommunication(){
        
    await this.vertical_menuButton.click();
    this.page.waitForTimeout(1000);
    await this.documentation_link.click();
         
}

async  clickNotResponsibleForAuth(){
        
    await this.vertical_menuButton.click();
    this.page.waitForTimeout(1000);
    await this.NotResponsibleForAuth_link.click();
         
}

async ValidateSummaryPageData(message){
    await expect(this.summaryPageRowData).toContainText(message);
}

// Request Auth Popup

async clickAddressBookButton()
{
    await this.AddressBook_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async searchAddressBook(providerName){

    await this.SearchAB_providerName.click();
    await this.SearchAB_providerName.fill(providerName);
    await this.SearchAB_SearchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async selectAddressBook(providerName){

    await this.page.getByRole('row', { name: 'Select ' + providerName }).locator('#btnAddressBookSelect').click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async selectLOC(){
    await this.page.getByLabel('Level of Care *').locator('div').nth(3).click();
    await this.page.getByRole('option').first().locator('span').click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async setHospitalDetails(providerName){

    await this.page.getByLabel('Provider', { exact: true }).locator('div').nth(3).click();
    await this.page.getByText(providerName).click();
    await this.page.getByLabel('Level of care ordered by').locator('div').nth(2).click();
    await this.page.getByText('Attending Physician').click();
    await this.page.waitForTimeout(2000);

}

async clickSendRequest(){
    await this.sendRequest_button.click();
}


//Documentation and Notes popup

async SetPayorResponse(response){
    await this.page.getByLabel('Payor Response *').locator('div').nth(2).click();
    await this.page.getByText(response).click();
}

//Not responsible for Auth Popup

async SelectNoNotResForAuth(providerName){
    await this.noRadioButton.click();
    await this.page.getByLabel('Post-Acute Authorization').locator('span').click();
    await this.page.getByText('PostAutoReason1').click();
    await this.page.getByLabel('Post-Acute Provider').locator('span').click();
    await this.page.getByText(providerName, { exact: true }).click();
    await this.page.getByLabel('Comment').click();
    await this.page.getByPlaceholder('Leave your comments here...').fill('test');
}

async clickSave(){
    await this.save_button.click();
}

}