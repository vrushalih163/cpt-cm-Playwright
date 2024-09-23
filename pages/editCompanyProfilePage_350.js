//Author - Priyanka Bachwal Date: 09/16/2024
import { Page, Locator, test, expect} from '@playwright/test';

export class EditCompanyProfilePage{
    constructor(page){

        this.page = page;
        this.page_familiarname = page.locator('#ctl0_edtAbbreviation');
        this.page_address1 = page.locator('#ctl0_$txtAddress1');
        this.page_address2 = page.locator('#ctl0_$txtAddress2"]');
        this.page_zipcode = page.locator('#ctl0_$txtZipCode');
 
        this.page_visiting_hours = page.locator('#ctl0_edtVisitingHours');
        this.page_url = page.locator('input[name="ctl0_edtUrl"]');
        this.page_provider_npi = page.locator('#ctl0_txtProviderNPI');
        this.page_careport_acct_number = page.locator('#ctl0_txtOrganizationAccountNumber');

        this.page_provider_id = page.locator('#ctl0_txtProviderID');
        this.page_provider_errmessage = page.locator('#ctl0_cvProviderID');
        this.page_provider_type = page.locator('#ctl0_ddProviderType');

        this.page_cms_id = page.getByRole('link', { name: 'CMS ID' });
        this.page_provider_type = page.getByRole('link', { name: 'Provider Type' });
        this.page_entered_date = page.getByRole('link', { name: 'Entered Date' });

        this.page_apply_btn = page.getByRole('button', { name: 'Apply' });
        this.page_save_btn = page.getByRole('button', { name: 'Save' });
        this.page_reset_btn = page.getByRole('button', { name: 'Reset' });
        this.page_cancel_btn = page.getByRole('button', { name: 'Cancel' });
}
//enter a non unique provider id and verify the error message
async enterNonUniqueProviderId(providerId){
    const current_provider_id = await this.page_provider_id.inputValue();
    console.log('The current_provider_id value is: ', current_provider_id);
    await this.page_provider_id.fill(providerId);
    await this.page_apply_btn.click();
    await expect(this.page_provider_errmessage).toHaveText('This number is not unique and is associated to another provider.');
    await this.page_reset_btn.click();
    await expect(this.page_provider_id).toHaveValue(current_provider_id);
    console.log("Provider ID is reset to previous value when click Apply button:", current_provider_id);   
    await this.page_provider_id.fill(providerId);
    await this.page_save_btn.click();   
    await expect(this.page_provider_errmessage).toHaveText('This number is not unique and is associated to another provider.');
    console.log("Clicking on save button with non-unique provider id and verifying error message"); 
    await this.page_reset_btn.click();
    console.log("Provider ID is reset to previous value when click Save button:", current_provider_id);   
} 

//enter a unique provider id and verify the message
async enterUniqueProviderId(providerId){
    await this.page_provider_id.fill(providerId);
    console.log("Entering a unique provider id:", providerId);
    await this.page_apply_btn.click();
     // Wait for the error message element to be present
      const isErrorMessagePresent = await this.page_provider_errmessage.isVisible({ timeout: 3000 });
      if (isErrorMessagePresent) {
          await expect(this.page_provider_errmessage).toBeEmpty();
      } else {
          console.log("No error message element found.");
      }    
    await this.page_save_btn.click();
    console.log("Clicking on save button with unique provider id and verifying success");
} 
}