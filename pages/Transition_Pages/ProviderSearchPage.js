// Author - Rajakumar Maste, Created Date: 29 July 2024
//Modified By - Vrushali Honnatti, Date: 20th August, 2024 - modified Search Provider method
import { expect } from '@playwright/test';
export class ProviderSearchPage {
    constructor(page) {
        this.page = page;
        this.SearchProvider_button = page.getByText('add_circle_outline');
        this.SearchProvider_icon = page.locator('//div/mat-icon[@id="iconSearch"]');
        this.Provider_checkBox = page.locator('xpath=//table[@id="tblProviderSummary"]/tbody/tr/td/mat-checkbox/label/span[contains(@class,"mat-checkbox-inner-container")]');
        this.Place_button = page.getByRole('button', { name: 'Place' });
        this.Unplace_button = page.getByRole('button', { name: 'Unplace' });
        this.anchor_menu = page.locator('#anchorMenu');
        this.placeReferral_menuItem = page.getByRole('menuitem', { name: 'Place Referral' });
        this.unplaceReferral_menuItem = page.getByRole('menuitem', { name: 'Unplace Referral' });
        this.viewReferral_menuItem = page.getByRole('menuitem', { name: 'View Referral' });
        this.RemoveProvider_menuItem = page.getByRole('menuitem', { name: 'Remove Provider' });
        this.RemoveProvider_button = page.locator('#btnRemove');
        this.message_menuItem = page.getByRole('menuitem', { name: 'Message' });

        //Patient Choice controls
        this.AddToReferral_PCButton = page.getByRole('button', { name: 'Add To Referral' });
        this.ChoiceReason_PCButton = page.getByRole('button', { name: 'Choice Reason' });
        this.TextEmail_PCButton = page.getByRole('button', { name: 'Text / Email' });
        this.Print_PCButton = page.getByRole('button', { name: 'Print' });
        this.PC_Heading = page.getByRole('heading', { name: 'Patient Choice' });
        this.AddToReferral_message = page.getByText('Add to Referral will only add new providers');
        this.ClearProviders_PCButton = page.getByRole('button', { name: 'Clear Providers' });
        this.ClosePC_button = page.getByRole('img', { name: 'icon' });
        this.CartCount_button = page.locator('#btnChoiceCartCounts-not-ie');

        //Text/Email and Print controls
        this.RecipientsEmail_textbox = page.getByPlaceholder('Enter the recipients email');
        this.YourEmail_textbox = page.getByLabel('Your Email Address *');
        this.YourPhone_textbox = page.getByLabel('Your Phone Number');
        this.YourName_textbox = page.getByLabel('Your Name *');
        this.Message_textbox = page.getByLabel('Add A Message to the Patient');
        this.ShareButton = page.getByRole('button', { name: 'Share' });
        this.ClosePopup_Button = page.getByRole('button', { name: '' });
        this.PrintButton = page.getByRole('button', { name: 'Print' });
  
    }

    async ClickProviderCheckBox(index) {
        await this.Provider_checkBox.nth(index).click();
    }
    
    async ClickSearchProviderButton() {
        await this.SearchProvider_button.click();
    }

    async ClickSearchProviderIcon() {
        await this.SearchProvider_icon.click();
    }   

    async SearchProvider(providerName) {
        await this.page.getByLabel('Clear').click();
        await this.page.getByPlaceholder('Search by address, city,').click();
        await this.page.keyboard.type('Hagåtña, 96910, Guam', { delay: 300 });

        await this.page.getByText('Hagåtña, 96910, Guam', { exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).fill('');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).type(providerName);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(8000);
        await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]').click();
        await this.page.getByRole('button', { name: 'Add 1 to Referral' }).click();
    }

    async SearchProviderAndAddToCart(providerName) {
        await this.page.getByLabel('Clear').click();
        await this.page.getByPlaceholder('Search by address, city,').click();
        await this.page.keyboard.type('Hagåtña, 96910, Guam', { delay: 300 });

        await this.page.getByText('Hagåtña, 96910, Guam', { exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).fill('');
        await this.page.getByRole('textbox', { name: 'Search by Name' }).type(providerName);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(8000);
        await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[1]').click();
        await this.page.getByRole('button', { name: 'Add 1 to Choice' }).click();
    }

    async AddProviderToCart(index) {
        await this.page.locator('xpath=(//body[@id="body"]//app-root//form//provider-search-results//form//provider-search-result-item//label//span)[' + index +']').click();
        await this.page.getByRole('button', { name: 'Add 1 to Choice' }).click();
    }

    async ClickCartCount_button() {
        await this.CartCount_button.click();
    }
    async ClickPlaceButton() {
        await this.Place_button.click();
    }

    async ClickUnplaceButton() {
        await this.Unplace_button.click();
    }

    async ClickAnchorMenu(index) {   
        await this.anchor_menu.nth(index).click();
        await this.page.waitForTimeout(500);
    }

    async ClickPlaceReferralMenuItem() {
        await this.placeReferral_menuItem.click();
        await this.page.waitForTimeout(500);
    }

    async ClickUnplaceReferralMenuItem() {
        await this.unplaceReferral_menuItem.click();
        await this.page.waitForTimeout(500);
    }

    async ClickViewReferralMenuItem() {
        const page2Promise = this.page.waitForEvent('popup');
        await this.viewReferral_menuItem.click();
        const page2 = await page2Promise;
        await page2.getByRole('img', { name: 'Close Window' }).click();
        await this.page.waitForTimeout(500);
    }

    async ClickMessageMenuItem() {
        await this.message_menuItem.click();
        await this.page.waitForTimeout(500);
    }

    async ClickRemoveProviderMenuItem() {
        const element = await this.page.$('#anchorMenu');
        if(element != null) {
            await this.anchor_menu.first().click();
            await this.RemoveProvider_menuItem.click();
            await this.RemoveProvider_button.click();
            await this.page.waitForTimeout(500);
        }
    }

    async ClickAddToReferral_PCButton() {
        await this.AddToReferral_PCButton.click();
        
    }
    
    async ClickTextEmail_PCButton() {
        await this.TextEmail_PCButton.click();
        await this.page.waitForTimeout(500);
    }

    async ClickPrintButtonPopup() {
        await this.PrintButton.click();
        await this.page.waitForTimeout(500);
    }   

    async ClickShareButtonPopup() {
        await this.ShareButton.click();
        await this.page.waitForTimeout(500);
    }
    
    async ClickClearProviders_PCButton() {
        await this.ClearProviders_PCButton.click();
    }

    async ClickClosePC_button() {
        await this.ClosePC_button.click();
    }

    async ClosePopup() {
        await this.ClosePopup_Button.click();
    }

    async EnterRecipientsEmail(email) {
        await this.RecipientsEmail_textbox.fill('');
        await this.RecipientsEmail_textbox.type(email);
    }

    async EnterYourEmail(email) {
        await this.YourEmail_textbox.fill('');
        await this.YourEmail_textbox.type(email);
    }

    async EnterYourPhone(phone) {
        await this.YourPhone_textbox.fill('');
        await this.YourPhone_textbox.type(phone);
    }
    
    async EnterYourName(name) {
        await this.YourName_textbox.fill('');
        await this.YourName_textbox.type(name);
    }

    async EnterMessage(message) {
        await this.Message_textbox.fill('');
        await this.Message_textbox.type(message);
    }

    async ValidateAddToReferralMessage() {  
        await expect(this.AddToReferral_message).toBeVisible();
    }

    async ValidatePCHeading() {
        await expect(this.PC_Heading).toBeVisible();
    }
    
    async ValidateShareButtonDisabled() {
        await expect(this.ShareButton).toBeDisabled();
    }

    async ValidatePrintButtonDisabled() {
        await expect(this.PrintButton).toBeDisabled();
    }

    async ValidateShareButtonEnabled() {
        await expect(this.ShareButton).toBeEnabled();
    }

    async ValidatePrintButtonEnabled() {
        await expect(this.PrintButton).toBeEnabled();
    }

    async ValidateTextPopup_HelpText(){
        await expect(this.page.locator('mat-dialog-content')).toContainText('Send to the following email address(es) or phone number(s)');
    }

    /**
     * This method validates the Date of sharing, Providers conunt, Share method, 'Shared with',
     *  view icon, ellipse icon and background color of the first row in the shared choice page.
     * @param {*} timezone The input time zone string. Example: If the timezone is PT then pass 'pacific'.
     * @param {*} format The time format ('12hr' or '24hr').
     * @param {*} Rank Provider Rank
     * @param {*} Provider name of the provider
     * @param {*} Location Enter the Location of the provider
     * @param {*} LastResponse Enter the last response
     * @param {*} LastMessage Enter the last message
     */
    async Validate_First_row_Provider(timezone, format, Rank, Provider, Location, LastResponse, LastMessage) {
        const table = await this.page.locator('table#tblProviderSummary');

        // Locate the first row with white background
        const firstRow = await table.locator('tr');

        // Extract cell values
        var rank = (await firstRow.locator('td:nth-child(2)').first().textContent()).trim();

        const provider = (await firstRow.locator('td:nth-child(3)').first().textContent()).trim();;

        const location = (await firstRow.locator('td:nth-child(4)').first().textContent()).trim();

        const lastResponse = (await firstRow.locator('td:nth-child(6)').first().textContent()).trim();

        const lastMessage = (await firstRow.locator('td:nth-child(7)').first().textContent()).trim();

        

        const actionIcon = await firstRow.locator('td:nth-child(8) #anchorMenu');

        // //Create an instance for LIB class
        // const library = new LIB();
        // //call the getCurrentDateTimeInTimeZone method and passing the date and time format
        // var currentDateTime = await library.getCurrentDateTimeInTimeZone(timezone, format);

        // // Parse the dates using native JavaScript Date object to make sure both are same object befor comparison
        // const DateOfSharing = new Date(dateOfSharing);
        // currentDateTime = new Date(currentDateTime);

        // // Calculate the difference in milliseconds
        // const differenceInMilliseconds = Math.abs(currentDateTime - DateOfSharing);

        // // Convert the difference from milliseconds to minutes
        // const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

        // // Check if the difference is within the 2-minute tolerance
        // expect(DateOfSharing).toBeLessThanOrEqual(2, `The dates differ by more than 2 minutes. Difference: ${differenceInMinutes} minutes.`);

        // Validate cell values
        expect(rank).toEqual(Rank, `Rank: ${rank}`);
        expect(provider).toEqual(Provider, `Provider: ${provider}`);
        expect(location).toEqual(Location, `Location: ${location}`);
        expect(lastResponse).toEqual(LastResponse, `Last Response: ${lastResponse}`);
        expect(lastMessage).toEqual(LastMessage, `Last Message: ${lastMessage}`);

        expect(actionIcon).not.toBeNull();
    }
}


