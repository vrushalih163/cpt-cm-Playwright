//Author: Vrushali Honnatti - 20th August, 2024
import { expect } from '@playwright/test';
import { InformationPage } from './InformationPage';
export class TransitionContextNavigator {
    constructor(page) {
        this.page = page;
        this.tabProviders = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Providers")]');
        this.tabSharedChoice = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Shared Choice")]');
        this.tabAttachments = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Attachments")]');
        this.tabClinical = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Clinical")]');
        this.tabForms = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Forms")]');
        this.tabInformation = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Information")]');
        this.tabSend = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Send")]');
        this.lnkManageReferralBreadCrumb = page.locator('xpath=//span[contains(@class,"breadcrumb-item")]//a[@id="anchorLabelClick1"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
        this.iconProviderSearch = page.locator('xpath=//mat-icon[@id="iconSearch"]/parent::div[@class="col-auto ng-star-inserted"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
        this.SendReferralButton_disabled = page.locator('#anchorSendReferralDisabled');
        this.SendReferralButton = page.locator('#anchorSendReferral');

        //Clinical tab error msg
        this.error_Popup = page.locator('//p-toastitem[contains(@class,"ng-trigger-toastAnimation")]//button').first();
    }

    async ClickManageReferralBreadCrumb() {
        await this.lnkManageReferralBreadCrumb.click();
    }

    async ClickProvidersTab() {
        await this.tabProviders.click();
    }

    async ClickSharedChoiceTab() {
        await this.tabSharedChoice.click();
    }

    async ClickAttachmentsTab() {
        await this.tabAttachments.click();
    }

    async ClickClinicalTab() {
        await this.tabClinical.click();
    }

    async ClickFormsTab() {
        await this.tabForms.click();
    }

    async ClickInformationTab() {
        await this.tabInformation.click();
    }

    async ClickSendTab() {
        const elementSelector = '//p-toastitem[contains(@class,"ng-trigger-toastAnimation")]//button';
        let isVisible = await this.page.isVisible(elementSelector);

        while (isVisible) {
            await this.error_Popup.click();
            await this.page.waitForTimeout(2000);
            isVisible = await this.page.isVisible(elementSelector);
        }
        await this.tabSend.click();
    }

    async ClickProviderSearchIcon() {
        const elementSelector = '//p-toastitem[contains(@class,"ng-trigger-toastAnimation")]//button';
        let isVisible = await this.page.isVisible(elementSelector);

        while (isVisible) {
            await this.error_Popup.click();
            await this.page.waitForTimeout(2000);
            isVisible = await this.page.isVisible(elementSelector);
        }
        await this.iconProviderSearch.click();
    }

    async ClickManageReferralIcon() {
        await this.iconManageReferral.click();
    }

    async ClickSendReferralButton() {
        await this.SendReferralButton.click();
    }

    async ValidateSendReferralButtonDisabled() {
        await expect(this.SendReferralButton_disabled).toBeVisible();
    }

    async ValidateProviderSearchIconNotExists() {
        await expect(this.iconProviderSearch).not.toBeVisible();
    }

    async ValidateProviderSearchIconExists() {
        await expect(this.iconProviderSearch).toBeVisible();
    }

    async SetInfoValues() {
        if (await expect.soft(this.SendReferralButton).not.toBeVisible()) {
            await this.ClickInformationTab();

            const Info = new InformationPage(this.page);
            await Info.SetProjectedDischargeDate('12/12/2022');
            await Info.SetProjectedDischargeTime('11:45 AM');
        }
    }
}