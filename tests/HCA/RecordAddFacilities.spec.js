import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
export class Facilities {
    constructor(page) {
        this.page = page;
        this.addFacility_button = page.locator('#ApiGridFacilities_action_0');
        this.txtFacilityName = page.locator('#txtFacilityName');
        this.m_TimeZonesList = page.locator('#m_TimeZonesList');
        this.ObserveDST_checkbox = page.locator('#m_ObserveDSTCheck');
        this.displayTimeIn24HourFormat = page.locator('#m_TimeIn24Check');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    /**
     * This method is used to add facility along with required timezone, Observe DST and 24 hours format
     * @param {*} Timezonename Enter the timezone name Eg: 'Atlantic Time', 'Eastern Time', 'Central Time', 'Mountain Time', 'Pacific Time', 'Alaska Time', 'Hawaii-Aleutian Time', Greenwich Mean Time'
     * @param {*} ObserveDST Enter "Yes" if Observe DST is required else "No"
     * @param {*} hoursformat Enter "Yes" if 24 hours format is required else "No"
     */
    async addFacility(Timezonename, ObserveDST, hoursformat) {
        const facnamegen = new LIB();
        const uniqueText = await facnamegen.generateUniqueText(5); // Change the length as needed
        const FacName = 'Facility' + '_' + uniqueText; //Generating a unique Facilityname
        await this.addFacility_button.click();
        await this.txtFacilityName.fill(FacName);
        await this.m_TimeZonesList.selectOption(Timezonename);
        if(ObserveDST === 'Yes')
        await this.ObserveDST_checkbox.click();
        if(hoursformat === 'Yes')
        await this.displayTimeIn24HourFormat.click();
        await this.saveButton.click();
        
    }
    
}
