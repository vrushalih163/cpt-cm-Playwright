//Author - Priyanka Bachwal Date: 09/17/2024
import { Page, Locator, test, expect} from '@playwright/test';
export class OrganizationDetailsPage{
    constructor(page){
        this.page = page;
     
        // Verify Organization Details Information details page 287
        this.organization_information_lable = page.locator('#LabelOrganizationInfoHeader');
        this.organization_name = page.locator('#LabelOrganizationNameValue');
        this.organization_type = page.locator('#LabelOrganizationTypeValue');
        this.organization_status = page.locator('#LabelOrganizationStatusValue');
        this.organization_id = page.locator('#LabelOrganizationIdValue');
        this.organization_address = page.locator('#LabelOrganizationAddressValue');
        this.organization_city = page.locator('#LabelOrganizationCityValue');
        this.organization_state = page.locator('#LabelOrganizationStateValue');
        this.organization_zip = page.locator('#LabelOrganizationZipValue');
        this.organization_country = page.locator('#LabelOrganizationCountryValue');
        this.organization_phone = page.locator('#LabelOrganizationPhoneValue');
        this.organization_email = page.locator('#LabelOrganizationEmailValue');
        this.organization_website = page.locator('#LabelOrganizationWebsiteValue');
        this.organization_logo = page.locator('#ImageOrganizationLogo');
        this.organization_description = page.locator('#LabelOrganizationDescriptionValue');
        this.organization_notes = page.locator('#LabelOrganizationNotesValue');
        this.organization_tags = page.locator('#LabelOrganizationTagsValue');
        this.organization_orgtype = page.getByText('Org Type:');
        this.organization_editcompanyprofilelink = page.getByRole('link', { name: 'Edit Company Profile' });
        this.organization_pagination =  page.getByRole('link', { name: '' });
      }

        async clickEditCompanyProfileLink(){
            await this.organization_editcompanyprofilelink.click();
    }
   }


  
            

