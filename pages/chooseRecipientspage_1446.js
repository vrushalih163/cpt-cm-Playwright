
// Author - Vrushali Honnatti Date:10th July, 2024
export class ChooseRecipientsPage {

      constructor(page) {
            this.page = page;
            this.clearSearchFilter_button = page.getByLabel('Clear');
            this.searchZipCode_text = page.locator('xpath=//acm-mat-placegeo-autocomplete[@formcontrolname="placeGeoAddress"]//input');
            this.searchName_text = page.locator('//acm-label-textbox[@id="tbProviderName"]//input');
            this.firstSearchResult_checkBox = page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]')
            this.AddToReferral_Button = page.getByRole('button', { name: 'Add 1 to Referral' });
            this.Next_button = page.locator('#ButtonBarNext');
            this.Back_button = page.locator('#ButtonBarBack');
            this.Apply_button = page.locator('#ButtonBarApply');

            //Provider Side Controls
            this.State_select = page.locator('#m_StatesList_States');
            this.providerName_text = page.locator('#m_NameText');
            this.Find_button = page.locator('#m_NameButton_Button');
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

      async ClearProviderNameTextbox() {
            await this.page.locator('//acm-label-textbox[@id="tbProviderName"]//span[@title="Clear"]').click();
      }

      /**
       * Click on Next button
       */
      async ClickNext() {
            this.Next_button.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
      }

      /**
       * Click on Back button
       */
      async ClickBack() {
            this.Back_button.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
      }

      /**
       * Click on Apply button
       */
      async ClickApply() {
            this.Apply_button.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
      }

      /////////////////////////////// Provider Side Methods ///////////////////////////////
      /**
       * This method helps to search provider name
       * @param {string} providerName 
       */
      async SearchProviderName(providerName) {
            await this.State_select.selectOption('GU');
            await this.providerName_text.fill(providerName);
            await this.Find_button.click();
      }

      /**
       * This method helps to select provider from the list
       * @param {number} index 
       */
      async SelectProvider(index) {
            await this.page.locator(`(//div[@class='clsItemUnChecked']//span[@class='clsLabelNormalText']//input[contains(@id,'m_RecipientsList_List_Container')])[${index}]`).click();
      }

      /**
       * 
       * Check/uncheck the checkbox 'Unmask patient information'
       * @param index 
       */
      async UnmaskPatientInformation(index) {
            await this.page.locator('//input[@id="m_RecipientList_ctl0' + index + '_m_UnmaskCheck" and @type="checkbox"]').click();
      }
}