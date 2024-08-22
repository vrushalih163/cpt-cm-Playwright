// // Author - Micho Eshete Date: 08/16/2024
import { Page, Locator, test, expect, } from '@playwright/test';

export class associatedOrganizationsPage {
  constructor(page) {
    this.page = page;
    this.associated_organizations_title = page.locator('span.ion-page-header-page-title', { hasText: 'Select Associated Organizations' });
  }



async associatedOrganizationsPageTitle(expectedTitle) {
  await expect(this.associated_organizations_title).toContainText(expectedTitle);
}

}