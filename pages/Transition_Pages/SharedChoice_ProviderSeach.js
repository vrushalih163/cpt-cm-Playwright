//Author: Rajakumar Maste, Created Date: 13 August 2024

export class SCProviderSearch {
    constructor(page) {
        this.page = page;
        this.providersearchresult = page.locator('//provider-search-results//form//provider-search-result-item//label//span');
        this.selectall_providersearchresult = page.locator('(//provider-search-results//form//acm-infinite-scroll//label//span)[1]');
        this.addtochoice_button = page.locator('#btnAdd');
        this.textORemail = page.getByRole('button', { name: 'Text / Email' });
        this.SeperateMultipleRecipients_field = page.getByLabel('Separate multiple recipients');
        this.Share_button = page.getByRole('button', { name: 'Share' });
        this.printsharedchoice_button = page.getByRole('button', { name: 'Print' });
        this.printButton_On_PrintSelectedResults = page.locator('//app-print-modal//button');

        //go back to transition
        this.goToTransition = page.getByRole('button', { name: 'Go to Transition' });
    }
    /**
     * Enter the integer number of providers to select
     * @param {*} ProviderCount 
     * This method selects the provider from the search result.
     * 
     * If the count is less than the search result count, it selects the provider based on the count.
     * If the count is greater than the search result count, it selects all the providers.
     */
    async SelectProvider(ProviderCount) {
        await this.page.waitForLoadState('networkidle');
        const pscount = await this.providersearchresult.count();
        console.log('Provider Search Result Count: ' + pscount);
        if (ProviderCount < pscount) {
            for (var i = 0; i < ProviderCount; i++) {
                await this.providersearchresult.nth(i).click();
            }
        } else {
            await this.selectall_providersearchresult.click();
        }
    }

    /** 
     * This method clicks on the Add button to add the selected providers to the choice.
     */
    async AddToChoice(){
        await this.addtochoice_button.click();
    }
    /**
     * This method clicks on the Text/Email button and enters the recipient email id and clicks on Share button
     */
    async TextOREmail(SharedChoiceRecepientUser){
        await this.textORemail.click();
        await this.SeperateMultipleRecipients_field.fill(SharedChoiceRecepientUser);
        await this.Share_button.click();
    }

    /**
     * This method clicks on the Print button on the Shared Choice page and takes the screenshot of the printed page.
     */
    async PrintSharedChoice(){
        await this.printsharedchoice_button.click();
        await expect(this.page.getByRole('heading', { name: 'Print Selected Results' })).toBeVisible();
        await this.printButton_On_PrintSelectedResults.click();
        await this.page.screenshot({ path: `C:\\TransitionAutomation_Screenshots\\PrintedSharedChoice_${new Date().toISOString()}.png`, type: 'png' });
        //this.page.screenshot({ path: `C:\\TransitionAutomation_Screenshots\\PrintedSharedChoice_${new Date().toISOString()}.jpg`, type: 'jpeg'});
        
    }

    /**
     * This method clicks on the Go to Transition button.
     */
    async GoToTransition(){
        await this.goToTransition.click();
    }

    /**
     * This method verifies the success message 'Choice shared' toast message.
     */
    async ToastMessage_ChoiceShared(){
        await expect(this.page.getByText('Success: Choice shared')).toBeVisible();
    }
}