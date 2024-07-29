
// Author - Vrushali Honnatti Date:10th July, 2024
export class ChooseRecipientsPage {

      constructor(page) {
            this.page = page;
            this.clearSearchFilter_button = page.getByLabel('Clear');
            this.searchZipCode_text = page.locator('xpath=//acm-mat-placegeo-autocomplete[@formcontrolname="placeGeoAddress"]//input');
            this.searchName_text = page.locator('//acm-label-textbox[@id="tbProviderName"]//input');
            this.firstSearchResult_checkBox = page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]')
            this.AddToReferral_Button = page.getByRole('button', { name: 'Add 1 to Referral' });
      }


      async choose1Recipient(providerName) {

            await this.page.getByLabel('Clear').click();
            await this.page.getByPlaceholder('Search by address, city,').click();
            await this.page.keyboard.type('Hagåtña, 96910, Guam', { delay: 300 });

            await this.page.getByText('Hagåtña, 96910, Guam', { exact: true }).click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.getByRole('textbox', { name: 'Search by Name' }).type(providerName);
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(8000);
            await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]').click();
            await this.page.getByRole('button', { name: 'Add 1 to Referral' }).click();
      }
}