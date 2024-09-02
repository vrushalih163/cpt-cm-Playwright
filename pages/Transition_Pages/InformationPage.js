//Author: Vrushali Honnatti - 20th August, 2024
import { expect } from '@playwright/test';

export class InformationPage {
    constructor(page) {
        this.page = page;
        this.Address1_textbox = page.getByPlaceholder('Enter the Address 1');
        this.Address2_textbox = page.getByPlaceholder('Enter the Address 2');
        this.City_textbox = page.getByPlaceholder('Enter the City');
        this.State_dropdown = page.locator('//mat-select[@id="visitLocationState"]//div[contains(@class,"mat-select-arrow-wrapper")]');
        this.zipcode_textbox = page.getByPlaceholder('Enter the Zip Code');
        this.StartOfCareDate_textbox = page.getByLabel('Start of Care Date *');
        this.StartOfCareTime_textbox = page.getByLabel('Start of care Time *');
        this.primaryDiagnosis_textbox = page.getByPlaceholder('Enter the primary Diagnosis');
        this.primaryDiagnosis_error = page.getByText('Primary Diagnosis is required');
        this.DischargeTime_error = page.getByText('Discharge time is required');
        this.CareTime_error = page.getByText('Start of Care Time is required');
        this.CareDate_error = page.getByText('Start Date of Care is required');
        this.CareDateRange_error = page.locator('#errorstartDateOfCareDateRangeValidation');
        this.DischargeDateRange_error = page.locator('#errorDischargeDateOnDateRangeValidation');
        this.ProjectedDischargeDate_textbox = page.getByLabel('Projected Discharge Date *');
        this.ValProjectedDischargeDate_textbox = page.locator('//acm-mat-datepicker[@id="lblProjectedDischargeDate"]//input[@placeholder="Choose a date"]');

        this.ProjectedDischargeTime_textbox = page.getByLabel('Discharge Time *');
        this.Comments_textbox = page.getByLabel('Comments');
    }

    async ValidatePrimaryDiagnosisError() { 
        await expect(this.primaryDiagnosis_error).toBeVisible();
    }

    async ValidateCareTimeError() { 
        await expect(this.CareTime_error).toBeVisible();
    }

    async ValidateCareDateError() { 
        await expect(this.CareDate_error).toBeVisible();
    }

    async ValidateCareDateRangeError() {
        await this.page.waitForTimeout(2000);
        await expect(this.CareDateRange_error).toBeVisible();
    }

    async ValidateDischargeDateRangeError() {
        await this.page.waitForTimeout(2000);
        await expect(this.DischargeDateRange_error).toBeVisible();
    }

    async ValidateDischargeTimeError() {
        await expect(this.DischargeTime_error).toBeVisible();
    }

    async SetAddress1(address) {
        await this.Address1_textbox.click();
        await this.Address1_textbox.fill(address);
    }

    async SetAddress2(address) {
        await this.Address2_textbox.click();
        await this.Address2_textbox.fill(address);
    }

    async SetCity(city) {   
        await this.City_textbox.click();
        await this.City_textbox.fill(city);
    }

    async SetState(state) {
        await this.State_dropdown.click();
        await this.page.getByRole('option', { name: state }).locator('span').click();
    }

    async SetZipCode(zipcode) { 
        await this.zipcode_textbox.click();
        await this.zipcode_textbox.fill(zipcode);
    }

    async SetStartOfCareDate(date) {
        await this.StartOfCareDate_textbox.click();
        await this.StartOfCareDate_textbox.fill(date);
    }

    async SetStartOfCareTime(time) {   
        await this.StartOfCareTime_textbox.fill(time);
    } 

    async SetPrimaryDiagnosis(diagnosis) {
        await this.primaryDiagnosis_textbox.click();
        await this.primaryDiagnosis_textbox.fill('');
        await this.primaryDiagnosis_textbox.fill(diagnosis);
        await this.primaryDiagnosis_textbox.press('Tab');
    }    

    async SetProjectedDischargeDate(date) {
        await this.ProjectedDischargeDate_textbox.click();
        await this.ProjectedDischargeDate_textbox.click();
        await this.ProjectedDischargeDate_textbox.fill(date);
        await this.ProjectedDischargeDate_textbox.press('Tab');
    }

    async SetProjectedDischargeTime(time) {
        await this.ProjectedDischargeTime_textbox.fill(time);
    }

    async SetComments(comments) {
        await this.Comments_textbox.click();
        await this.Comments_textbox.fill(comments); 
    }

    async ValidatePrimaryDiagnosis(diagnosis){
        await expect(this.primaryDiagnosis_textbox).toContainText(diagnosis);
    }

    async ValidateAddress1(address){
        await expect(this.Address1_textbox).toHaveValue(address);
    }

    async ValidateAddress2(address){    
        await expect(this.Address2_textbox).toHaveValue(address);
    }

    async ValidateCity(city){
        await expect(this.City_textbox).toHaveValue(city);
    }

    async ValidateState(state){
        await expect(this.State_dropdown).toHaveText(state);
    }

    async ValidateZipCode(zipcode){
        await expect(this.zipcode_textbox).toHaveValue(zipcode);
    }

    async ValidateStartOfCareDate(date){
        await expect(this.StartOfCareDate_textbox).toHaveValue(date);
    }

    async ValidateStartOfCareTime(time){
        await expect(this.StartOfCareTime_textbox).toHaveValue(time);
    }

    async ValidateProjectedDischargeDate(date){
        //await expect(this.ValProjectedDischargeDate_textbox).toContainText(date);
    }

    async ValidateProjectedDischargeTime(time){
        await expect(this.ProjectedDischargeTime_textbox).toHaveValue(time);
    }

    async ValidateComments(comments){
        await expect(this.Comments_textbox).toHaveValue(comments);
    }
    
}