export class TransitionContextNavigator{
    constructor(page){
        this.page = page;
        this.tabProviders = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Providers")]');
        this.tabSharedChoice = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Shared Choice")]');
        this.tabAttachments = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Attachments")]');
        this.tabClinical = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Clinical")]');
        this.tabForms = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Forms")]');
        this.tabInformation = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Information")]');
        this.tabSend = page.locator('xpath=//div[@class="mat-tab-labels"]"//div[@class="mat-tab-label-content" and contains(.,"Send")]');
        this.lnkManageReferralBreadCrumb = page.locator('xpath=//span[@class="breadcrumb-item"]//a[@id="anchorLabelClick1"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
        this.iconProviderSearch = page.locator('xpath=//mat-icon[@id="iconSearch"]/parent::div[@class="col-auto ng-star-inserted"]');
        this.iconManageReferral = page.locator('xpath=//div[@id="infoIconDiv"]//mat-icon[@id="iconDashboardCustomize"]');
    }

    async ClickManageReferralBreadCrumb(){
        await this.lnkManageReferralBreadCrumb.click();
    }
}