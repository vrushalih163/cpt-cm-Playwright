//Author: Vrushali Honnatti - 20th August, 2024
import { expect } from '@playwright/test';
export class TransitionContextNavigator{
    constructor(page){
        this.page = page;
        this.tabProviders = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Providers")]');
        this.tabSharedChoice = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Shared Choice")]');
        this.tabAttachments = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Attachments")]');
        this.tabClinical = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Clinical")]');
        this.tabForms = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Forms")]');
        this.tabInformation = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Information")]');
        this.tabSend = page.locator('xpath=//div[@class="mat-tab-labels"]//div[@class="mat-tab-label-content" and contains(.,"Send")]');
        this.lnkManageReferralBreadCrumb = page.locator('xpath=//span[contains(@class,"breadcrumb-item")]//a[@id="anchorLabelClick1"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
        this.iconProviderSearch = page.locator('xpath=//mat-icon[@id="iconSearch"]/parent::div[@class="col-auto ng-star-inserted"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
        this.SendReferralButton_disabled = page.locator('#anchorSendReferralDisabled');
        this.SendReferralButton = page.locator('#anchorSendReferral');
    }

    async ClickManageReferralBreadCrumb(){
        await this.lnkManageReferralBreadCrumb.click();
    }

    async ClickProvidersTab(){
        await this.tabProviders.click();
    }   

    async ClickSharedChoiceTab(){
        await this.tabSharedChoice.click();
    }

    async ClickAttachmentsTab(){
        await this.tabAttachments.click();
    }

    async ClickClinicalTab(){
        await this.tabClinical.click();
    }

    async ClickFormsTab(){
        await this.tabForms.click();
    }

    async ClickInformationTab(){
        await this.tabInformation.click();
    }

    async ClickSendTab(){
        await this.tabSend.click();
    }

    async ClickProviderSearchIcon(){
        await this.iconProviderSearch.click();
    }

    async ClickManageReferralIcon(){
        await this.iconManageReferral.click();
    }

    async ClickSendReferralButton(){
        await this.SendReferralButton.click();
    }

    async ValidateSendReferralButtonDisabled(){
        await expect(this.SendReferralButton_disabled).toBeVisible();
    }
}