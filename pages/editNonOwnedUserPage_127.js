// Author - Micho Eshete Date: 08/08/2024
import { Page, Locator, test, expect} from '@playwright/test';

export class editNonOwnedUserPage {
    constructor(page) {
        this.page = page;
        // Verify Non-Owned User Information details page 127
        this.page_header = page.locator('#PageHeader');
        this.user_information_lable = page.locator('#LabelUserInfoHeader');
        this.user_name = page.locator('#LabelUserNameValue');
        this.user_first_name = page.locator('#LabelFirstNameValue');
        this.user_last_name = page.locator('#LabelLastNameValue');
        this.display_name = page.locator('#LabelDisplayNameValue');
        this.departent_label = page.locator('#LabelDepartmentValue');
        this.start_page_list = page.locator('#DropDownListEcinStartPage');
        this.default_org_name = page.locator('#lblDefaultOrganization');
        this.download_certificate = page.locator('#LinkDownloadCertificate');
        this.midddle_initail = page.locator('#LabelMiddleInitialValue');
        this.position = page.locator('#LabelPositionValue');
        

        // user organanization edit link
        this.user_org_lable = page.locator('#Label25');
        this.org_associations_link = page.locator('#lnkAssociateOrgs');
        this.org_associations_page_header = page.locator('//span[@title="Select Associated Organizations"]');
    }

    /**
  * Clicks on the "Org Associations Edit" link and and assert the page.
  */
    async clickOrgAssociationsEditLink() {
        await expect(this.user_org_lable).toContainText('User Organizations');
        await this.org_associations_link.click({ timeout: 9000 });
        await this.page.waitForLoadState('domcontentloaded');
     

    }

    /**
     * Verifies the user information for a non-owned user.
     */
    async verifyNonOwnedUserUserInformation(expectedValues) {
        if (expectedValues.PageHeader) {
            await expect(this.page_header).toContainText(expectedValues.PageHeader);
        }
        if (expectedValues.userInformation) {
            await expect(this.user_information_lable).toContainText(expectedValues.userInformation);
        }
        if (expectedValues.userName) {
            await expect(this.user_name).toContainText(expectedValues.userName);
        }

        if (expectedValues.userFirstName) {
            await expect(this.user_first_name).toContainText(expectedValues.userFirstName);
        }

        if (expectedValues.userLastName) {
            await expect(this.user_last_name).toContainText(expectedValues.userLastName);
        }

        if (expectedValues.displayName) {
            await expect(this.display_name).toContainText(expectedValues.displayName);
        }

        if (expectedValues.departmentLabel) {
            await expect(this.departent_label).toContainText(expectedValues.departmentLabel);
        }

        if (expectedValues.startPageList) {
            await expect(this.start_page_list).toContainText(expectedValues.startPageList);
        }

        if (expectedValues.defaultOrgName) {
            await expect(this.default_org_name).toContainText(expectedValues.defaultOrgName);
        }

        if (expectedValues.downloadCertificate) {
            await expect(this.download_certificate).toContainText(expectedValues.downloadCertificate);
        }

        if (expectedValues.middleInitial) {
            await expect(this.midddle_initail).toContainText(expectedValues.middleInitial);
        }

        if (expectedValues.position) {
            await expect(this.position).toContainText(expectedValues.position);
        }


    }
}


