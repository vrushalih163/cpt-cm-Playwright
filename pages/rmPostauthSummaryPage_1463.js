// Author - Vrushali Honnatti Date:10th July, 2024
const { test, expect } = require("@playwright/test")
export class RmPostauthSummaryPage {

    constructor(page) {
        this.page = page;

        //summary page
        this.vertical_menuButton = page.locator('xpath=//a[@aria-label="Example icon-button with a menu"]').first()
        this.requestAuth_link = page.getByRole('menuitem', { name: 'Request Authorization' });
        this.documentation_link = page.getByRole('menuitem', { name: 'Document Notes/Responses' });
        this.NotResponsibleForAuth_link = page.getByRole('menuitem', { name: 'Not Responsible for Auth' });
        this.summaryPageRowData = page.locator('xpath=//postacuteauth-inquiry-payor-summary//table[@role="grid"]').getByRole('rowgroup');


        //Request Auth Popup
        this.AddressBook_button = page.locator('#btnAddressBook');
        this.SearchAB_providerName = page.getByLabel('Plan Description or Contact');
        this.SearchAB_SearchButton = page.getByRole('button', { name: 'Search' });
        this.HospitalContact_textbox = page.getByLabel('Hospital Contact').getByLabel('Contact Name');
        this.sendRequest_button = page.getByRole('button', { name: 'Send Request' });

        //Record Communication Popup
        this.save_button = page.getByRole('button', { name: 'Save' });
        this.payorResponse_dropdown = page.locator('xpath=//acm-mat-dropdown[@id="ddcommpayorResponse"]//div[contains(@class, "mat-select-arrow-wrapper"))]');
        this.payorResponseReason_dropdown = page.locator('xpath=//acm-mat-dropdown[@id="ddcommresponseReason"]//div[contains(@class, "mat-select-arrow-wrapper"))]');

        //Not Reponsible for Auth Popup
    }

    //Summary Page
    async clickRequestAuth() {

        await this.vertical_menuButton.click();
        this.page.waitForTimeout(1000);
        await this.requestAuth_link.click();

    }

    async clickRecordCommunication() {

        await this.vertical_menuButton.click();
        this.page.waitForTimeout(1000);
        await this.documentation_link.click();

    }

    async clickNotResponsibleForAuth() {

        await this.vertical_menuButton.click();
        this.page.waitForTimeout(1000);
        await this.NotResponsibleForAuth_link.click();

    }

    async ValidateDataSummaryPage(text) {
        await expect(this.summaryPageRowData).toContainText(text);
    }

    // Request Auth Popup
    async clickAddressBookButton() {
        await this.AddressBook_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async searchAddressBook(providerName) {

        await this.SearchAB_providerName.click();
        await this.SearchAB_providerName.fill(providerName);
        await this.SearchAB_SearchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async selectAddressBook(providerName) {

        await this.page.getByRole('row', { name: 'Select ' + providerName }).locator('#btnAddressBookSelect').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async selectLOC() {
        await this.page.getByLabel('Level of Care *').locator('div').nth(2).click();
        await this.page.locator('xpath=//mat-option//span[@class="mat-option-text" and contains(.,"COVID-19: Willing/Equipped to accept")]').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async setHospitalDetails(hosContact) {

        await this.page.HospitalContact_textbox.fill(hosContact);
    }

    async clickSendRequest() {
        await this.page.getByRole('button', { name: 'Send Request' }).click();
    }

    //Documentation/Notes Popup

    async setPayorResponse(response) {
        //await this.page.payorResponse_dropdown.click();
        await this.page.getByLabel('Payor Response *').locator('div').nth(2).click();
        await this.page.getByText(response).click();
    }

    async setPayorResponseReason(responseReason) {
        //await this.page.payorResponseReason_dropdown_dropdown.click();
        await this.page.getByLabel('Payor Response Reason *').locator('div').nth(3).click();
        await this.page.getByText(responseReason).click();
    }

    async clickSave() {
        //await this.page.save_button.click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }


}