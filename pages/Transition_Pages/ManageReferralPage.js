// Author - Rajakumar Maste, Created Date: 29 July 2024
// Modified By - Vrushali Honnatti, Date: 31st July, 2024 - added code for various controls in the page
import { expect } from '@playwright/test';
export class ManageReferral {
    constructor(page) {
        this.page = page;
        this.PatientTaskWorkList_icon = page.locator('div').filter({ hasText: /^checklist$/ });
        this.createReferral_link = page.getByText('add_circle_outline');
        this.SearchReferralType_textbox = page.getByLabel('Search referral type');
        this.firstReferral_radioButton = page.locator('xpath=//mat-radio-button[contains(@id,"mat-radio")]//label//span[@class="mat-radio-container"]//span[contains(@class,"mat-radio-inner-circle")]');
        this.CreateReferral_button = page.locator('#btnCreatReferral');
        this.YesReferralConfirmation_button = page.getByRole('button', { name: 'Yes' });

        //card body
        this.card_body = page.locator('xpath=//div[@id="editTransitionReferralI"]//acm-card//div[@class="card-body"]');
        this.Referral_link = page.locator('xpath=//card-content[@id="transitionReferralContent"]"//div//h3[@class="mat-tooltip-trigger header3 card-ellipsis"]');
        this.ReferralStatus_label = page.locator('xpath=//div[@id="editTransitionReferralId"]//acm-card//div[@class="card-body"]//small[@id="textMutedReferralStatus"]')
        this.toggleReferralStatus_button = page.locator('xpath=//div[@id="divStopPropagation"]//mat-slide-toggle//div[@class="mat-slide-toggle-bar"]')
        this.ReferralID_label = page.locator('xpath=//card-content[@id="transitionReferralContent"]/div/h5');
    }

    /**
    * Manage Referral Page
    * 
    * **Visibility**
    * Patient task worklist icon will be visible in secondary banner of manage referral page. Upon clicking on this patient task worklist modal will get opened.
    * 
    */
    async PatientTaskWorkList() {
        await this.PatientTaskWorkList_icon.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
    /**
    * Manage Referral Page
    * 
    * Create a new Referral
    * 
    */
    async CreateNewReferral(referralName) {
        await this.createReferral_link.click();
        await this.SearchReferralType_textbox.click();
        await this.page.keyboard.type(referralName, { delay: 250 });
        await this.page.waitForTimeout(1000);
        await this.firstReferral_radioButton.first().click();
        await this.CreateReferral_button.click();
        await this.YesReferralConfirmation_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    /**
    * Manage Referral Page
    * 
    * Click on the first referral link
    * 
    */
    async ClickFirstReferral() {
        await this.Referral_link.first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    /**
    * Manage Referral Page
    * 
    * Click on the toggle button for the first Referral
    * 
    */
    async ToggleFirstReferralStatus() {
        await this.toggleReferralStatus_button.first().click();
        await this.page.waitForTimeout(500);
    }

    /**
    * Manage Referral Page
    * 
    * Validate the status of the first Referral
    * 
    */
    async ValidateFirstReferralStatus(status) {
        expect(await this.ReferralStatus_label.first()).toContainText(status);
    }

    async GetFirstReferralID() {
        let textMsg = await this.ReferralStatus_label.first().textContent();
        let referralId = textMsg.split('-');
        let temp = referralId[1].split(' ');
        return String(await temp[0]);
    }

    async ValidateFirstReferralCardExists(){
        expect(await this.card_body.first()).toBeVisible();
    }
}