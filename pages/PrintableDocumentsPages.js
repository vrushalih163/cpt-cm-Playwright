// Author - Vrushali Honnatti Date:10th July, 2024
import {Page, Locator, test } from '@playwright/test';
export class PrintableDocumentsPages {

constructor(page) {
      this.page = page;
      
}

async ValidateAllPrintableDocuments(){
  
  //Admission Timeline
  await this.page.getByRole('link', { name: 'Admission Timeline' }).click();
  
  //Call List
  await this.page.getByRole('link', { name: 'Call List' }).click();
  const page8Promise = this.page.waitForEvent('popup');
  await this.page.getByRole('button', { name: 'Generate' }).click();
  const page8 = await page8Promise;
  await page8.getByRole('img', { name: 'Close Window' }).click();

  //Discharge Summary
  const page18Promise = this.page.waitForEvent('popup');
  await this.page.getByRole('link', { name: 'Discharge Summary' }).click();
  const page18 = await page18Promise;
  await page18.getByRole('img', { name: 'Close Window' }).click();

  //Fax Patient Data
  await this.page.getByRole('link', { name: 'Fax Patient Data' }).click();
  await this.page.locator('#m_Recent0').click();
  await this.page.locator(`//td[@id='RecentList_Content_Cell']//a[text()='Use']`).first().click();
  await this.page.locator('#txtSubject0').click();
  await this.page.locator('#txtSubject0').fill('Testing in automation');
  await this.page.getByLabel('Include Patient Information').check();
  await this.page.getByRole('button', { name: 'Generate' }).click();

  //Fax-To-Me
  await this.page.getByRole('link', { name: 'Fax-To-Me' }).click();
  await this.page.getByRole('button', { name: 'Generate' }).click();

  //Patient Information
  const page0Promise = this.page.waitForEvent('popup');
  await this.page.getByRole('link', { name: 'Patient Information' }).click();
  const page10 = await page0Promise;
  await page10.getByRole('img', { name: 'Close Window' }).click();

  //Review History
  const page1Promise = this.page.waitForEvent('popup');
  await this.page.getByRole('link', { name: 'Review History' }).click();
  const page12 = await page1Promise;
  await page12.getByRole('img', { name: 'Close Window' }).click();
}
}