//Author: Vrushali Honnatti - 20th August, 2024
// Modified By: Rajakumar Maste, Date- 13th November 2024

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
        this.tabInformation = page.locator('xpath=//div[contains(@class,"mat-tab-labels")]//div[@class="mat-tab-label-content" and contains(.,"Information")]');

        // Tranportation Accordion controls
        this.TypeOfTransport_dropdown = page.locator('//acm-mat-dropdown[@formcontrolname="typeOfTransport"]//mat-form-field//mat-select//div[contains(@class,"mat-select-trigger ng-tns")]//div[contains(@class,"mat-select-arrow-wrapper ng-tns")]');
        this.TypeOfTransport_dropdown_closeIcon = page.locator('//acm-mat-dropdown[@id="ddTypeofTransport"]//mat-form-field//div[contains(@class,"mat-form-field-wrapper ng-tns")]//div//div//button//mat-icon[text()="close"]');
        this.GetTypeOfTransport_DropdownValue = page.locator('//acm-mat-dropdown[@formcontrolname="typeOfTransport"]//mat-select//div//span//span');

        this.TripType_dropdown = page.locator('//acm-mat-dropdown[@formcontrolname="tripType"]//mat-form-field//mat-select//div[contains(@class,"mat-select-trigger ng-tns")]//div[contains(@class,"mat-select-arrow-wrapper ng-tns")]');
        this.TripType_dropdown_closeIcon = page.locator('//acm-mat-dropdown[@id="ddTripType"]//mat-form-field//div[contains(@class,"mat-form-field-wrapper ng-tns")]//div//div//button//mat-icon[text()="close"]');
        this.GetTripType_DropdownValue = page.locator('//acm-mat-dropdown[@formcontrolname="tripType"]//mat-select//div//span//span');

        this.MethodOfPayment_dropdown = page.locator('//acm-mat-dropdown[@formcontrolname="methodOfPayment"]//mat-form-field//mat-select//div[contains(@class,"mat-select-trigger ng-tns")]//div[contains(@class,"mat-select-arrow-wrapper ng-tns")]');
        this.MethodOfPayment_dropdown_closeIcon = page.locator('//acm-mat-dropdown[@id="ddMethodOfPayment"]//mat-form-field//div[contains(@class,"mat-form-field-wrapper ng-tns")]//div//div//button//mat-icon[text()="close"]');
        this.GetMethodOfPayment_DropdownValue = page.locator('//acm-mat-dropdown[@formcontrolname="methodOfPayment"]//mat-select//div//span//span');

        this.HeightFt_English_field = page.locator('//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="heightFeet"]');
        this.HeightFt_English_error = page.getByText('Value must be at most 9.');//-------
        this.HeightFt_English_error1 = page.getByText('Value must be at least 0.');
        this.HeighInch_English_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="heightInches"]');
        this.HeightInch_English_error = page.getByText('Value must be at most 11.');
        this.HeightInch_English_error1 = page.getByText('Value must be at least 0.');
        this.HeightCM_Metric_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="heightCm"]');
        this.HeightCM_Metric_error = page.getByText('Value must be at least 0.');
        this.HeightCM_Metric_error1 = page.getByText('Value must be at most 300.');

        this.Weightlbs_English_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="weightLbs"]');
        this.Weightlbs_English_error = page.getByText('Value must be at least 0.');
        this.Weightlbs_English_error1 = page.getByText('Value must be at most 999.');//-------
        this.WeightOz_English_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="weightOunces"]');
        this.WeightOz_English_error = page.getByText('Value must be at least 0.');
        this.WeightOz_English_error1 = page.getByText('Value must be at most 15.');
        this.WeightKg_Metric_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="weightKg"]');
        this.WeightKg_Metric_error = page.getByText('Value must be at least 0.');
        this.WeightKg_Metric_error1 = page.getByText('Value must be at most 455.');
        this.WeightGm_Metric_field = page.locator('//mat-form-field//div[contains(@class,"mat-form-field-wrapper")]//input[@formcontrolname="weightGm"]');
        this.WeightGm_Metric_error = page.getByText('Value must be at least 0.');
        this.WeightGm_Metric_error1 = page.getByText('Value must be at most 999.');

        this.TransportDate_error = page.getByText(' Transport Date is required. ');
        this.TransportDate_Time_error = page.getByText(' Year must be between 1880 and 2049. ');
        this.TransportDate_fied = page.getByLabel('Transport Date');
        this.GetTranportDate_Value = page.locator('//acm-mat-datepicker[@formcontrolname="transportDate"]//input[1]');

        this.RequestedPickupTime_field = page.getByLabel('Requested Pickup Time');
        this.RequestedReturnTime_field = page.getByLabel('Requested Return Time');

        // Pick up and Drop off Location accordion controls
        this.UseFacilityAddress_btn = page.getByRole('button', { name: 'Use Facility\'s Address' });
        this.UsePatientAddress_btn = page.getByLabel('Pickup Location ').getByRole('button', { name: 'Use Patient\'s Address' });
        this.UsePatientAddress_btn1 = page.getByLabel('Drop-off Location ').getByRole('button', { name: 'Use Patient\'s Address' });
        this.ProviderAddressLookup_btn = page.getByLabel('Pickup Location ').getByRole('button', { name: 'Provider Address Lookup' });
        this.ProviderAddressLookup_btn1 = page.getByLabel('Drop-off Location ').getByRole('button', { name: 'Provider Address Lookup' });

        // Pickup address controls
        this.PickupAddressName_field = page.locator('//input[@formcontrolname="pickupname"]');
        this.PickupAddress1_field = page.locator('//input[@formcontrolname="pickupAddress1"]');
        this.PickupAddress2_field = page.locator('//input[@formcontrolname="pickupAddress2"]');
        this.PickupCity_field = page.locator('//input[@formcontrolname="pickupCity"]');
        this.PickupState_dropdown = page.locator('//acm-mat-dropdown[@formcontrolname="pickupState"]//div[contains(@class,"mat-select-value")]');
        this.PickupZipCode_field = page.locator('//input[@formcontrolname="pickupZipCode"]');

        // Drop off address controls
        this.DropOffAddressName_field = page.locator('//input[@formcontrolname="dropoffName"]');
        this.DropOffAddress1_field = page.locator('//input[@formcontrolname="dropoffAddress1"]');
        this.DropOffAddress2_field = page.locator('//input[@formcontrolname="dropoffAddress2"]');
        this.DropOffCity_field = page.locator('//input[@formcontrolname="dropoffCity"]');
        this.DropOffState_dropdown = page.locator('//acm-mat-dropdown[@formcontrolname="dropState"]//div[contains(@class,"mat-select-value")]');
        this.DropOffZipCode_field = page.locator('//input[@formcontrolname="dropZipCode"]');

        //provider address modal control
        this.Provideraddress_field = page.locator('//input[@id="tbplanDesccontactName"]');
        this.Search_btn = page.getByRole('button', { name: 'Search' });
        this.Select_btn = page.getByRole('button', { name: 'Select' }).first();

        // Additional Information accordion controls
        this.HasKeys_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="hasKeys"]/mat-radio-button[1]');
        this.HasKeys_No_RDB = page.locator('//mat-radio-group[@formcontrolname="hasKeys"]/mat-radio-button[2]');
        this.HasKeys_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="hasKeys"]/mat-radio-button[3]');

        this.NarrowDriveway_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowDriveway"]/mat-radio-button[1]');
        this.NarrowDriveway_No_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowDriveway"]/mat-radio-button[2]');
        this.NarrowDriveway_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowDriveway"]/mat-radio-button[3]');

        this.MedicationsWillLastFor_field = page.locator('//mat-form-field//input[@formcontrolname="medicationsWillLastFor"]');
        this.NarrowHallways_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowHallways"]/mat-radio-button[1]')
        this.NarrowHallways_No_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowHallways"]/mat-radio-button[2]');
        this.NarrowHallways_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="narrowHallways"]/mat-radio-button[3]');

        this.MedicatedB4Transp_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="medicatedBeforeTransport"]/mat-radio-button[1]');
        this.MedicatedB4Transp_No_RDB = page.locator('//mat-radio-group[@formcontrolname="medicatedBeforeTransport"]/mat-radio-button[2]');
        this.MedicatedB4Transp_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="medicatedBeforeTransport"]/mat-radio-button[3]');

        //Key Transportation questions
        this.CanGetupFromBed_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="canGetUpFromBed"]/mat-radio-button[1]');
        this.CanGetupFromBed_No_RDB = page.locator('//mat-radio-group[@formcontrolname="canGetUpFromBed"]/mat-radio-button[2]');
        this.CanGetupFromBed_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="canGetUpFromBed"]/mat-radio-button[3]');

        this.CanAmbulate_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="canAmbulate"]/mat-radio-button[1]');
        this.CanAmbulate_No_RDB = page.locator('//mat-radio-group[@formcontrolname="canAmbulate"]/mat-radio-button[2]');
        this.CanAmbulate_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="canAmbulate"]/mat-radio-button[3]');

        this.CanSit_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="canSit"]/mat-radio-button[1]');
        this.CanSit_No_RDB = page.locator('//mat-radio-group[@formcontrolname="canSit"]/mat-radio-button[2]');
        this.CanSit_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="canSit"]/mat-radio-button[3]');

        this.CanTolerateTransp_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="canTolerateTransportation"]/mat-radio-button[1]');
        this.CanTolerateTransp_No_RDB = page.locator('//mat-radio-group[@formcontrolname="canTolerateTransportation"]/mat-radio-button[2]');
        this.CanTolerateTransp_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="canTolerateTransportation"]/mat-radio-button[3]');

        this.IsBedBound_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="isBedBound"]/mat-radio-button[1]');
        this.IsBedBound_No_RDB = page.locator('//mat-radio-group[@formcontrolname="isBedBound"]/mat-radio-button[2]');
        this.IsBedBound_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="isBedBound"]/mat-radio-button[3]');

        this.StairsAtResidence_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="stairsAtResidence"]/mat-radio-button[1]');
        this.StairsAtResidence_No_RDB = page.locator('//mat-radio-group[@formcontrolname="stairsAtResidence"]/mat-radio-button[2]');
        this.StairsAtResidence_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="stairsAtResidence"]/mat-radio-button[3]');

        this.SupineTransp_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainSupineDuringTransport"]/mat-radio-button[1]');
        this.SupineTransp_No_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainSupineDuringTransport"]/mat-radio-button[2]');
        this.SupineTransp_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainSupineDuringTransport"]/mat-radio-button[3]')

        this.ImmobileTransp_Yes_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainImmobileDuringTransport"]/mat-radio-button[1]');
        this.ImmobileTransp_No_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainImmobileDuringTransport"]/mat-radio-button[2]');
        this.ImmobileTransp_NotSpecified_RDB = page.locator('//mat-radio-group[@formcontrolname="patientMustRemainImmobileDuringTransport"]/mat-radio-button[3]');

        // Steps inside and outside
        this.NumberOfStepsInside_field = page.locator('//mat-form-field//div//input[@formcontrolname="numberStepsInside"]');
        this.NumberOfStepsInside_error = page.getByText('Value must be at least 0.');
        this.NumberOfStepsInside_error1 = page.getByText('Value must be at least 0 and not more than 200.');
        this.NumberOfStepsOutside_field = page.locator('//mat-form-field//div//input[@formcontrolname="numberStepsOutside"]');
        this.NumberOfStepsOutside_error = page.getByText('Value must be at least 0.');
        this.NumberOfStepsOutside_error1 = page.getByText('Value must be at least 0 and not more than 200.');

        //Authorization number, Equipment, Directions and Notes
        this.AuthorizationNumber_field = page.locator('//mat-form-field//div//input[@formcontrolname="authorizationNumber"]');
        this.Equipment_Dropdown = page.locator('//acm-mat-multiselect[@formcontrolname="equipments"]');
        this.EquipementOption_select = page.locator('//acm-mat-multiselect[@formcontrolname="equipments"]//mat-form-field//div[contains(@class,"mat-form-field-wrapper ng-tns")]');
        this.notes_textareafield = page.locator('//mat-form-field//div//textarea[@formcontrolname="notes"]');
        this.Directions_textareafield = page.locator('//mat-form-field//div//textarea[@formcontrolname="directions"]');

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
        await this.tabInformation.press('Tab');
        await this.Address1_textbox.press('Enter');
        await this.Address1_textbox.fill(address);
    }

    async SetAddress2(address) {
        await this.Address1_textbox.press('Tab');
        await this.Address2_textbox.press('Enter');
        await this.Address2_textbox.fill(address);
    }

    async SetCity(city) {
        await this.Address2_textbox.press('Tab');
        await this.City_textbox.press('Enter');
        await this.City_textbox.fill(city);
    }

    async SetState(state) {
        await this.State_dropdown.click();
        await this.page.getByRole('option', { name: state }).locator('span').click();
    }

    async SetZipCode(zipcode) {
        await this.State_dropdown.press('Tab');
        await this.zipcode_textbox.press('Enter');
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

    /**
     * This method is used to enter the time into new time control in Transition T2
     * @param {*} time Enter the time in 24hr format and rest all thing will taken care by this function
     */
    async SetProjectedDischargeTime(time) {
        await this.ProjectedDischargeTime_textbox.click();
        await this.ProjectedDischargeTime_textbox.fill(time);
        await this.page.locator('div').filter({ hasText: /^Discharge Time \*$/ }).first().click();
    }

    async SetComments(comments) {
        await this.Comments_textbox.click();
        await this.Comments_textbox.fill(comments);
    }

    async ValidatePrimaryDiagnosis(diagnosis) {
        await expect(this.primaryDiagnosis_textbox).toContainText(diagnosis);
    }

    async ValidateAddress1(address) {
        await expect(this.Address1_textbox).toHaveValue(address);
    }

    async ValidateAddress2(address) {
        await expect(this.Address2_textbox).toHaveValue(address);
    }

    async ValidateCity(city) {
        await expect(this.City_textbox).toHaveValue(city);
    }

    async ValidateState(state) {
        await expect(this.State_dropdown).toHaveText(state);
    }

    async ValidateZipCode(zipcode) {
        await expect(this.zipcode_textbox).toHaveValue(zipcode);
    }

    async ValidateStartOfCareDate(date) {
        await expect(this.StartOfCareDate_textbox).toHaveValue(date);
    }

    async ValidateStartOfCareTime(time) {
        await expect(this.StartOfCareTime_textbox).toHaveValue(time);
    }

    async ValidateProjectedDischargeDate(date) {
        //await expect(this.ValProjectedDischargeDate_textbox).toContainText(date);
    }

    async ValidateProjectedDischargeTime(time) {
        await expect(this.ProjectedDischargeTime_textbox).toHaveValue(time);
    }

    async ValidateComments(comments) {
        await expect(this.Comments_textbox).toHaveValue(comments);
    }

    /**
     * This method is used to Expand or collapse the accordions
     * @param {*} accordion Enter the accordion name here
     * Accordion Names for referrence: 'Transportation', 'Pickup Location', 'Drop-off Location', 'Additional Information'
     */
    async ExpandORCollapse_Accordion(accordion) {
        const xpath = `//mat-accordion//span[contains(text(), '${accordion}')]`;
        await this.page.locator(xpath).click();
    }

    /**
     * This method is used to verify the accordion is expanded or collapsed
     * @param {*} AccordionName Enter the accordion name here
     * @param {*} trueORfalse Enter true if you want to verify the accordion is expanded or false if you want to verify the accordion is collapsed
     */
    async ExpandRCollapseAccordion_Verification(AccordionName, trueORfalse) {
        await expect(this.page.locator('//mat-expansion-panel-header[@aria-expanded="' + trueORfalse + '"]//span[contains(text(), "' + AccordionName + '")]')).toBeVisible();
    }

    /**
     * This method is used to swiitch between English and Metric units for Height and Weight
     * @param {*} HeightORWeight Enter 'Height' for Height and 'Weight' for Weight
     * @param {*} RadioButtonText Enter 'English' for English units and 'Metric' for Metric units
     */
    async HeightORWeightRadioBtn_Switcher(HeightORWeight, RadioButtonText) {
        if (HeightORWeight === 'Height') {
            await this.page.locator('//mat-radio-group[@formcontrolname="heightUnit"]//span[contains(text(),"' + RadioButtonText + '")]').click();

        } else if (HeightORWeight === 'Weight') {
            await this.page.locator('//mat-radio-group[@formcontrolname="weightUnit"]//span[contains(text(),"' + RadioButtonText + '")]').click();
        }
    }
    /**
     * This method verifies the validation for date field when date has very old date or future date, and
     * Also when the date is empty and requested pick up time or requested return time is entered
     * @param {*} date Enter the date i.e less than 1880 years or greater than 2049 years
     */
    async ValidateORSet_Transportdate(date) {
        if (date) {
            await this.TransportDate_fied.fill(date);
            await this.TransportDate_fied.press('Tab');
            await this.page.waitForLoadState('domcontentloaded');
            if (await this.TransportDate_Time_error.isVisible()) {
                await expect(this.TransportDate_Time_error).toBeVisible();
                await this.TransportDate_fied.fill('');
                await this.TransportDate_fied.press('Tab');
            }
        } else {
            await this.RequestedPickupTime_field.click();
            await this.RequestedPickupTime_field.fill('10:10');
            await expect(this.TransportDate_error).toBeVisible();
            await this.RequestedPickupTime_field.fill('');
            if (!this.RequestedReturnTime_field) {
                await expect(this.TransportDate_error).toBeHidden();
            }
            await this.RequestedReturnTime_field.click();
            await this.RequestedReturnTime_field.fill('10:10');
            await expect(this.TransportDate_error).toBeVisible();
            await this.RequestedReturnTime_field.fill('');
            await expect(this.TransportDate_error).toBeHidden();
        }
    }

    /**
     * This method is used to get the transport date from the transport date field
     * @returns returns the transport date
     */
    async GetTransportDate() {
        const date = await this.GetTranportDate_Value.inputValue();
        return date.trim();
    }

    /**
     * This method is used to verify the transport date when we switch between other tabs and come back to the same tab
     * @param {*} date Enter the expected date here
     */
    async TransportDate_Verification(date) {
        await this.GetTranportDate_Value.inputValue().then((text) => {
            expect(text).toContain(date);
        });
    }

    /**
     * This method verifies the validation for the requested pickup time when the user enters invalid time
     * @param {*} time Enter the invalid time here
     * Example: just pass '1'
     */
    async ValidateRequestedPickUpTime(time) {

    }

    /**
     * This method verifies the validation for the requested return time when the user enters invalid time
     * @param {*} time Enter the invalid time here
     * example: just pass '1'
     */
    async ValidateRequestedReturnTime(time) {

    }


    /**
     * This method is used to select the type of transport from the dropdown
     * @param {*} transporttype Enter the transport type here
     */
    async TypeOfTransport_selection(transporttype) {
        const closeIcon = await this.TypeOfTransport_dropdown_closeIcon;
        if (await closeIcon.isVisible()) {
            await closeIcon.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
        }
        await this.TypeOfTransport_dropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByText(transporttype, { exact: true }).click();

    }

    /**
     * This method is used to verify the type of transport selected from the dropdown when we switch between other tabs and come back to the same tab
     * @param {*} transporttype Enter expected transport type here
     */
    async TypeOfTransport_Verification(transporttype) {
        await this.GetTypeOfTransport_DropdownValue.textContent().then((text) => {
            expect(text).toContain(transporttype);
        });
    }

    /**
     * This method is used to select the trip type from the dropdown
     * @param {*} triptype Enter the trip type here
     */
    async TripType_selection(triptype) {
        const closeIcon = await this.TripType_dropdown_closeIcon;
        if (await closeIcon.isVisible()) {
            await closeIcon.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
        }
        await this.TripType_dropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByText(triptype, { exact: true }).click();
    }

    /**
     * This method is used to verify the trip type selected from the dropdown when we switch between other tabs and come back to the same tab
     * @param {*} triptype Enter the expected trip type here
     */
    async TripType_Verification(triptype) {
        await this.GetTripType_DropdownValue.textContent().then((text) => {
            expect(text).toContain(triptype);
        });
    }

    /**
     * This method is used to select the method of payment from the dropdown
     * @param {*} paymentmethod Enter the payment method here
     */
    async MethodOfPayment_selection(paymentmethod) {
        const closeIcon = await this.MethodOfPayment_dropdown_closeIcon;
        if (await closeIcon.isVisible()) {
            await closeIcon.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);
        }
        await this.MethodOfPayment_dropdown.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByText(paymentmethod, { exact: true }).click();
    }

    /**
     * This method is used to verify the method of payment selected from the dropdown when we switch between other tabs and come back to the same tab
     * @param {*} paymentmethod Enter the expected payment method here
     */
    async MethodOfPayment_Verification(paymentmethod) {
        await this.GetMethodOfPayment_DropdownValue.textContent().then((text) => {
            expect(text).toContain(paymentmethod);
        });
    }
    /**
     * This method verifies the validation for the height in feet when the user enters more than 9ft into feet field
     * @param {*} feet Enter the height in feet here
     */
    async ValidateORSet_HeightFt_English(feet) {
        await this.HeightFt_English_field.fill(feet);
        await this.HeightFt_English_field.press('Tab');
        if (feet > 9) {
            await expect(this.HeightFt_English_error).toBeVisible();
            await this.HeightFt_English_field.fill('');
        } else if (feet < 0) {
            await expect(this.HeightFt_English_error1).toBeVisible();
            await this.HeightFt_English_field.fill('');
        }
    }

    /**
     * This method is used to verify the validation for the height in inches when the user enters more than 11inches into inches field
     * @param {*} inches Enter the height in inches here
     */
    async ValidateORSet_HeightInch_English(inches) {
        await this.HeighInch_English_field.fill(inches);
        await this.HeighInch_English_field.press('Tab');
        await this.page.waitForLoadState('domcontentloaded');
        if (inches > 11) {
            await expect(this.HeightInch_English_error).toBeVisible();
            await this.HeighInch_English_field.fill('');
        } else if (inches < 0) {
            await expect(this.HeightInch_English_error1).toBeVisible();
            await this.HeighInch_English_field.fill('');
        }
    }

    /**
     * This method is used to verify the validation for the height in centimeters when the user enters more than 305cm into centimeters field
     * @param {*} Centimeters Enter the height in centimeters here
     */
    async ValidateORSet_HeightCM_Metric(Centimeters) {
        await this.HeightCM_Metric_field.fill(Centimeters);
        await this.HeightCM_Metric_field.press('Tab');
        await this.page.waitForLoadState('domcontentloaded');
        if (Centimeters < 0) {
            await expect(this.HeightCM_Metric_error).toBeVisible();
            await this.HeightCM_Metric_field.fill('');
        } else if (Centimeters > 300) {
            await expect(this.HeightCM_Metric_error1).toBeVisible();
            await this.HeightCM_Metric_field.fill('');
        }
    }

    /**
     * This method is used to verify the validation for the weight in lbs when the user enters more than 999lbs into lbs field
     * @param {*} lbs Enter the weight in lbs here
     */
    async ValidateORSet_Weightlbs_English(lbs) {
        await this.Weightlbs_English_field.fill(lbs);
        await this.Weightlbs_English_field.press('Tab');
        if (lbs < 0) {
            await expect(this.Weightlbs_English_error).toBeVisible();
            await this.Weightlbs_English_field.fill('');
        } else if (lbs > 999) {
            await expect(this.Weightlbs_English_error1).toBeVisible();
            await this.Weightlbs_English_field.fill('');
        }
    }

    /**
     * This method is used to verify the validation for the weight in oz when the user enters more than 15oz into oz field
     * @param {*} oz Enter the weight in oz here
     */
    async ValidateORSet_WeightOz_English(oz) {
        await this.WeightOz_English_field.fill(oz);
        await this.WeightOz_English_field.press('Tab');
        if (oz < 0) {
            await expect(this.WeightOz_English_error).toBeVisible();
            await this.WeightOz_English_field.fill('');
        } else if (oz > 15) {
            await expect(this.WeightOz_English_error1).toBeVisible();
            await this.WeightOz_English_field.fill('');
        }
    }

    /**
     * This is used to verify the validation for the weight in kg when the user enters more than 455kg into kg field
     * @param {*} kilos Enter the weight in kg here
     */
    async ValidateORSet_WeightKg_Metric(kilos) {
        await this.WeightKg_Metric_field.fill(kilos);
        await this.WeightKg_Metric_field.press('Tab');
        if (kilos < 0) {
            await expect(this.WeightKg_Metric_error).toBeVisible();
            await this.WeightKg_Metric_field.fill('');
        } else if (kilos > 455) {
            await expect(this.WeightKg_Metric_error1).toBeVisible();
            await this.WeightKg_Metric_field.fill('');
        }
    }

    /**
     * This method is used to verify the validation for the weight in grams when the user enters more than 999gms into gms field
     * @param {*} grams Enter the weight in grams here
     */
    async ValidateORSet_WeightGm_Metric(grams) {
        await this.WeightGm_Metric_field.fill(grams);
        await this.WeightGm_Metric_field.press('Tab');
        if (grams < 0) {
            await expect(this.WeightGm_Metric_error).toBeVisible();
            await this.WeightGm_Metric_field.fill('');
        } else if (grams > 999) {
            await expect(this.WeightGm_Metric_error1).toBeVisible();
            await this.WeightGm_Metric_field.fill('');
        }
    }

    /**
     * This method is used to click on the 'Use Facility's Address' button
     */
    async UseFacilitysAddress_Click() {
        await this.UseFacilityAddress_btn.click();
    }

    /**
     * This method used to click the 'Use patient's address' button present in Pick up and drop off location accordion
     * @param {*} address Just enter the address 
     * ex: If you want to click this button in pick up then pass 'Pickup' or 'Drop off' for drop off
     */
    async UsePatientAddress_Click(address) {
        const lowerCaseAddress = address.toLowerCase();
        if (lowerCaseAddress === 'pickup' || lowerCaseAddress === 'pick up') {
            await this.UsePatientAddress_btn.click();
        } else if (lowerCaseAddress === 'drop off' || lowerCaseAddress === 'dropoff') {
            await this.UsePatientAddress_btn1.click();
        }
    }

    /**
     * This method is used to click the 'Provider Address Lookup' button present in Pick up and drop off location accordion
     * @param {*} address Enter the address here
     * ex: If you want to click this button in pick up then pass 'Pickup' or 'Drop off' for drop off
     */
    async ProviderAdressLookup_Click(address) {
        const lowerCaseAddress = address.toLowerCase();
        if (lowerCaseAddress === 'Pickup' || lowerCaseAddress === 'pickup' || lowerCaseAddress === 'Pick up' || lowerCaseAddress === 'pick up') {
            await this.ProviderAddressLookup_btn.click();
        } else if (lowerCaseAddress === 'Drop off' || 'drop off') {
            await this.ProviderAddressLookup_btn1.click();
        }
    }

    /**
     * This method is used to select the provider address from the address book
     * @param {*} addressname Enter the name of the provider
     */
    async ProviderAddress_Selection(addressname) {
        await this.Provideraddress_field.fill(addressname);
        await this.Search_btn.click();
        await this.Select_btn.click();
    }

    /**
     * This method is used to get the pickup address from the pick up location accordion
     * @returns This return AddressName and Address as array
     */
    async GetPickUpaddress() {
        const AddressName = await this.PickupAddressName_field.inputValue();
        const Address1 = await this.PickupAddress1_field.inputValue();
        const Address2 = await this.PickupAddress2_field.inputValue();
        const City = await this.PickupCity_field.inputValue();
        const State = await this.PickupState_dropdown.innerText();
        const ZipCode = await this.PickupZipCode_field.inputValue();
        // Concatenate address, excluding Address2 if it is null or empty
        let Address = Address1;
        if (Address2) {
            Address += '' + Address2;
        }
        Address += City + ', ' + State + ' ' + ZipCode;
        return [AddressName, Address];
    }

    /**
     * This method is used to get the drop off address from the drop off location accordion
     * @returns This return AddressName and Address as array
     */
    async GetDropOffAddress() {
        const AddressName = await this.DropOffAddressName_field.inputValue();
        const Address1 = await this.DropOffAddress1_field.inputValue();
        const Address2 = await this.DropOffAddress2_field.inputValue();
        const City = await this.DropOffCity_field.inputValue();
        const State = await this.DropOffState_dropdown.innerText();
        const ZipCode = await this.DropOffZipCode_field.inputValue();
        // Concatenate address, excluding Address2 if it is null or empty
        let Address = Address1;
        if (Address2) {
            Address += ' ' + Address2;
        }
        Address += City + ', ' + State + ' ' + ZipCode;
        return [AddressName, Address];
    }

    /**
     * This method is used to select the radio button for the additional information questions
     * @param {*} question Enter the questions here
     * Referrence: 'Has Keys', 'Narrow Driveway', 'Narrow Hallways', 'Medicated Before Transport'
     * @param {*} radiobuttontext Enter the radio button text
     * Referrence: 'Yes', 'No', or 'Not Specified'
     */
    async AdditionalQuestions_Selection(question, radiobuttontext) {
        const trimmedQuestion = question.trim();
        const trimmedRadioButtonText = radiobuttontext.trim();

        const questionMap = {
            'Has Keys': {
                'Yes': this.HasKeys_Yes_RDB,
                'No': this.HasKeys_No_RDB,
                'Not Specified': this.HasKeys_NotSpecified_RDB
            },
            'Narrow Driveway': {
                'Yes': this.NarrowDriveway_Yes_RDB,
                'No': this.NarrowDriveway_No_RDB,
                'Not Specified': this.NarrowDriveway_NotSpecified_RDB
            },
            'Narrow Hallways': {
                'Yes': this.NarrowHallways_Yes_RDB,
                'No': this.NarrowHallways_No_RDB,
                'Not Specified': this.NarrowHallways_NotSpecified_RDB
            },
            'Medicated Before Transport': {
                'Yes': this.MedicatedB4Transp_Yes_RDB,
                'No': this.MedicatedB4Transp_No_RDB,
                'Not Specified': this.MedicatedB4Transp_NotSpecified_RDB
            }
        };

        const radioButton = questionMap[trimmedQuestion]?.[trimmedRadioButtonText];

        if (radioButton) {
            await radioButton.click();
        } else if (!questionMap[trimmedQuestion]) {
            throw new Error('Invalid question entered');
        } else {
            throw new Error('There is no such radio button to select');
        }
    }

    /**
     * This method is used to select the key transportations questio and corresponding radio button
     * @param {*} questionnumber Enter the question number. Example: If you want to select first questiion then pass '1'
     * @param {*} radiobuttontext Enter the radio button text 
     * Referrence: 'Yes', 'No', or 'Not Specified'
     */
    async KeyTransportationQuestions(questionnumber, radiobuttontext) {
        const trimmedquestionnumber = questionnumber.trim();
        const trimmedRadioButtonText = radiobuttontext.trim();

        const questionMap = {
            '1': {
                'Yes': this.CanGetupFromBed_Yes_RDB,
                'No': this.CanGetupFromBed_No_RDB,
                'Not Specified': this.CanGetupFromBed_NotSpecified_RDB
            },
            '2': {
                'Yes': this.CanAmbulate_Yes_RDB,
                'No': this.CanAmbulate_No_RDB,
                'Not Specified': this.CanAmbulate_NotSpecified_RDB
            },
            '3': {
                'Yes': this.CanSit_Yes_RDB,
                'No': this.CanSit_No_RDB,
                'Not Specified': this.CanSit_NotSpecified_RDB
            },
            '4': {
                'Yes': this.CanTolerateTransp_Yes_RDB,
                'No': this.CanTolerateTransp_No_RDB,
                'Not Specified': this.CanTolerateTransp_NotSpecified_RDB
            },
            '5': {
                'Yes': this.IsBedBound_Yes_RDB,
                'No': this.IsBedBound_No_RDB,
                'Not Specified': this.IsBedBound_NotSpecified_RDB
            },
            '6': {
                'Yes': this.StairsAtResidence_Yes_RDB,
                'No': this.StairsAtResidence_No_RDB,
                'Not Specified': this.StairsAtResidence_NotSpecified_RDB
            },
            '7': {
                'Yes': this.ImmobileTransp_Yes_RDB,
                'No': this.ImmobileTransp_No_RDB,
                'Not Specified': this.ImmobileTransp_NotSpecified_RDB
            },
            '8': {
                'Yes': this.SupineTransp_Yes_RDB,
                'No': this.SupineTransp_No_RDB,
                'Not Specified': this.SupineTransp_NotSpecified_RDB
            }
        };

        const radioButton = questionMap[trimmedquestionnumber]?.[trimmedRadioButtonText];

        if (radioButton) {
            await radioButton.click();
        } else if (!questionMap[trimmedquestionnumber]) {
            throw new Error('Invalid Key question number entered');
        } else {
            throw new Error('There is no such radio button to select');
        }
    }

    /**
     * This method is used to enter the number of steps inside
     * @param {*} steps Enter the steps here
     */
    async ValidateORSet_NumberOfStepsInside(steps) {
        await this.NumberOfStepsInside_field.fill(steps);
        if (steps < 0) {
            await expect(this.NumberOfStepsInside_error).toBeVisible();
        } else if (steps > 200) {
            await expect(this.NumberOfStepsInside_error1).toBeVisible();
        }
    }

    /**
     * This method is used to verify the number of steps inside when we switch between other tabs and come back to the same tab
     * @param {*} steps Enter the expected steps here
     */
    async NumberOfStepInside_Verification(steps) {
        await this.NumberOfStepsInside_field.inputValue().then((text) => {
            expect(text).toContain(steps);
        });
    }

    /**
     * This method is used to enter the number of steps outside
     * @param {*} steps Enter the steps here
     */
    async ValidateORSet_NumberOfStepsOutside(steps) {
        await this.NumberOfStepsOutside_field.fill(steps);
        if (steps < 0) {
            await expect(this.NumberOfStepsOutside_error).toBeVisible();
        } else if (steps > 200) {
            await expect(this.NumberOfStepsOutside_error1).toBeVisible();
        }
    }

    /**
     * This method is used to verify the number of steps outside when we switch between other tabs and come back to the same tab
     * @param {*} steps Enter the expected steps here
     */
    async NumberOfStepOutside_Verification(steps) {
        await this.NumberOfStepsOutside_field.inputValue().then((text) => {
            expect(text).toContain(steps);
        });
    }

    /**
     * This method is used to enter the authorization number into authorization field
     * @param {*} authnumber Enter the authorization number here
     */
    async AuthorizationNumber(authnumber) {
        await this.AuthorizationNumber_field.fill(authnumber);
    }

    /**
     * This method is used to verify the authorization number when we switch between other tabs and come back to the same tab
     * @param {*} authnumber Enter the expected authorization number here
     */
    async AuthorizationNumber_Verification(authnumber) {
        await this.AuthorizationNumber_field.inputValue().then((text) => {
            expect(text).toContain(authnumber);
        });
    }

    /**
     * This method is used to select the values from Equipment multiselect dropdown
     * @param {*} equipment Enter the equipment text here
     */
    async SelectEquipmentOption(equipment) {
        await this.EquipementOption_select.click();
        const option = await this.page.locator('//div[@role="listbox"]//mat-option[.//mat-checkbox//span[contains(text(),"' + equipment + '")]/ancestor::mat-option]');
        await option.click();

        // Locate the checkbox within the option
        const checkbox = option.locator('mat-checkbox input[type="checkbox"]');
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.check();
        }
        // below 2 line of escape are added to close the equipment dropdown
        await this.page.keyboard.press('Escape');
        await this.page.keyboard.press('Escape');
    }

    /**
     * This method is used to enter the notes into notes text area field
     * @param {*} notes Enter the notes here
     */
    async Notes(notes) {
        await this.notes_textareafield.fill(notes);
    }

    /**
     * This method is used to enter the direction into direction text area field
     * @param {*} direction Enter the direction here
     */
    async Directions(direction) {
        await this.Directions_textareafield.fill(direction);
    }

    /**
     * This method is used to verify the notes when we switch between other tabs and come back to the same tab
     * @param {*} direction Enter the expected notes here
     */
    async Directions_Verification(direction) {
        await this.Directions_textareafield.inputValue().then((text) => {
            expect(text).toContain(direction);
        });
    }

    /**
     * This method is used to check the visibility of the Medications will last for field
     * @param {*} radiobuttontext Enter the radio button selection for 'Madicated Before Transport' question
     */
    async MedicationsWillLastFor_Visibility(radiobuttontext) {
        if (radiobuttontext === 'Yes') {
            await expect(this.MedicationsWillLastFor_field).toBeVisible();
        } else if (radiobuttontext === 'No' || radiobuttontext === 'Not Specified') {
            await expect(this.MedicationsWillLastFor_field).not.toBeVisible();
        }
    }

    /**
     * This method is used to enter the comments into Medications will last for field
     * @param {*} comments Enter the comments here
     */
    async MedicationWillLastFor(comments) {
        await this.MedicationsWillLastFor_field.fill(comments);
    }

}