// Author - Vrushali Honnatti Date:22nd July, 2024

export class CommunicationsPage {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.Finish_button = page.getByRole('button', { name: 'Finish', exact: true });
      this.Back_button = page.getByRole('button', { name: 'Back', exact: true });
      this.LockFinish_button = page.locator('#ButtonBarFinishAndLock');
      this.LockAdd_button = page.locator('#ButtonBarLockAndFinish');

      this.EditCommunication_link = page.locator('#dgCommunications_ctl03_lnkContactDateValue');
      this.AddCommunication_link = page.locator('#dgReviewVersion_ctl03_lnkAdd');
      
}

async  clickFinish(){
      await this.Finish_button.click();
}

async  clickBack(){
    await this.Back_button.click(); 
}

async  clickLockFinish(){
    await this.LockFinish_button.click();    
}

async  clickLockAdd(){
    await this.LockAdd_button.click();       
}

async  clickEditCommunication(){
    await this.EditCommunication_link.click();  
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async  clickAddCommunication(){
    await this.AddCommunication_link.click();  
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}
}