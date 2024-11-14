//Autor: Vrushali Honnatti, Created Date: 14th Nov, 2024
import { page, expect } from '@playwright/test';

export class UMConfigPage{
    constructor(page){
        this.page = page;
        this.cbAllowReviewsToBeLocked_CB = page.locator('#cbAllowReviewsToBeLocked');
        this.Apply_button = page.locator('#ButtonBarApply');
    }

    /**
     * Check Allow Reviews To Be Locked checkbox
     */
    async SetAllowReviewsToBeLocked(){
        
        if(expect(this.cbAllowReviewsToBeLocked_CB).toBeChecked(false))
            await this.cbAllowReviewsToBeLocked_CB.click();
    }

    /**
     * UnCheck Allow Reviews To Be Locked checkbox
     */
    async ResetAllowReviewsToBeLocked(){
        
        if(expect(this.cbAllowReviewsToBeLocked_CB).toBeChecked(true))
            await this.cbAllowReviewsToBeLocked_CB.click();
    }
   
    /**
     * Click on Apply button
     */
    async ClickApply(){
        await this.Apply_button.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
}