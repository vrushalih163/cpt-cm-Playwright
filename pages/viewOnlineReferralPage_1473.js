// Author - Vrushali Honnatti Date:10th July, 2024
// Modified By: Rajakumar Maste, Date- 13th November 2024
import { expect } from '@playwright/test';
export class ViewOnlineReferralPage {

    constructor(page) {
        this.page = page;
        this.sendResponse_button = page.getByRole('button', { name: 'Send Response' });
        this.jumpToReferralSource_link = page.locator('xpath=//a[@mattooltip="Jump to Referral Source"]')
        this.comment_textarea = page.locator('//textarea[@formcontrolname="providerComment"]');

        // Transportation controls
        this.TransportDate_Cell = page.locator('//table//td[contains(text(), "Transport Date:")]//following-sibling::td');
        this.TypeOfTransport_Cell = page.locator('//table//td[contains(text(), "Type of Transport:")]//following-sibling::td');
        this.TripType_cell = page.locator('//table//td[contains(text(), "Trip Type:")]//following-sibling::td');
        this.MethodOfPayment = page.locator('//table//td[contains(text(), "Method of Payment:")]//following-sibling::td');
        this.PickUpLocation_Name = page.locator('//table//td[contains(text(), "Pickup Location")]//following::table[1]//td[contains(text(), "Name:")]//following-sibling::td');
        this.PickUpLocation_Address = page.locator('//table//td[contains(text(), "Pickup Location")]//following::table[1]//td[contains(text(), "Address:")]//following-sibling::td');
        this.DropOffLocation_Name = page.locator('//table//td[contains(text(), "Drop-off Location")]//following::table[1]//td[contains(text(), "Name:")]//following-sibling::td');
        this.DropOffLocation_Address = page.locator('//table//td[contains(text(), "Drop-off Location")]//following::table[1]//td[contains(text(), "Address:")]//following-sibling::td');
        this.HasKey_Cell = page.locator('//table//td[contains(text(), "Has Key")]//following-sibling::td');
        this.NarrowDriveway_cell = page.locator('//table//td[contains(text(), "Narrow Driveway:")]//following-sibling::td');
        this.NarrowHallway_cell = page.locator('//table//td[contains(text(), "Narrow Hallways:")]//following-sibling::td');
        this.MedicatedBeforeTransport_cell = page.locator('//table//td[contains(text(), "Medicated Before Transport:")]//following-sibling::td');
        this.MedicationsWillLastFor_cell = page.locator('//table//td[contains(text(), "Medications Will Last For:")]//following-sibling::td');

        // Key Transportation Questions
        this.CanGetUpFromBed_cell = page.locator('//table//td[contains(text(), "patient get up from bed")]//following-sibling::td');
        this.PatientAmbulate_cell = page.locator('//table//td[contains(text(), "patient ambulate/walk")]//following-sibling::td');
        this.PatientSitInChairOrWheelchair_cell = page.locator('//table//td[contains(text(), "sit in chair or wheelchair")]//following-sibling::td');
        this.PatientAbletoTolerateTransport_cell = page.locator('//table//td[contains(text(), " patient able to tolerate")]//following-sibling::td');
        this.PatientBedBound_cell = page.locator('//table//td[contains(text(), "patient bedbound")]//following-sibling::td');
        this.PatientResidence_cell = page.locator('//table//td[contains(text(), "patient\'s residence")]//following-sibling::td');
        this.PatientRemainImmobile_cell = page.locator('//table//td[contains(text(), "patient remain immobile")]//following-sibling::td');
        this.PatientRemainSupine_cell = page.locator('//table//td[contains(text(), "patient remain supine")]//following-sibling::td');
        this.TranspNotes_cell = page.locator('//td[contains(text(), "Notes")]//following::tr[1]//td');
        this.Directions_cell = page.locator('//td[contains(text(), "Directions")]//following::tr[1]//td');

        this.numberOfStepsInside_cell = page.locator('//tbody//td[contains(text(), "Steps Inside:")]//following-sibling::td');
        this.numberOfStepsOutside_cell = page.locator('//tbody//td[contains(text(), "Steps Outside:")]//following-sibling::td');
    }

    async selectResponse(response) {

        //click on the arrow in the right of the drop down 
        await this.page.locator('xpath=//acm-mat-dropdown[@id="ddResponse"]//div[contains(@class,"mat-select-arrow-wrapper")]').click();
        await this.page.waitForTimeout(5000);

        await this.page.locator('span:has-text("' + response + '")').first().click();
    }

    async SetComment(comment) {
        await this.comment_textarea.fill(comment);
    }

    async clickSendResponse() {
        await this.sendResponse_button.click();
    }

    async clickJumpToReferralSource() {

        await this.jumpToReferralSource_link.click();
    }

    /**
     * This method verifies the 'Transport Date' on the 'View Online Referral' page
     * @param {*} date Expected date in MM/DD/YYYY format
     */
    async ValidateTransportation_Date(date) {
        // Check if the TransportDate_Cell is visible
        const isVisible = await this.TransportDate_Cell.isVisible();

        if (!date) {
            // If date is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If date is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);

            // Get the text content of the date cell
            const actualDate = await this.TransportDate_Cell.textContent();

            // Format the actual date to MM/DD/YYYY
            const [month, day, year] = actualDate.trim().split('/');
            const formattedActualDate = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;

            // Validate that the date matches the expected date
            expect(formattedActualDate).toBe(date);
        }
    }

    /**
     * This method verifies the 'Type of Transport' on the 'View Online Referral' page
     * @param {*} time Expected Type of Transport
     */
    async ValidateTypeOfTransport(transportType) {        
        // Check if the TypeOfTransport_Cell is visible
        const isVisible = await this.TypeOfTransport_Cell.isVisible();

        if (!transportType) {
            // If transportType is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If transportType is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);

            // Get the text content of the type cell
            const actualTransportType = await this.TypeOfTransport_Cell.textContent();

            // Validate that the transport type matches the expected transport type
            expect(actualTransportType.trim()).toBe(transportType);
        }
    }

    /**
     * This method verifies the 'Trip Type' on the 'View Online Referral' page
     * @param {*} time Expected Trip Type
     */
    async ValidateTripType(tripType) {
        // Check if the TypeOfTransport_Cell is visible
        const isVisible = await this.TripType_cell.isVisible();

        if (!tripType) {
            // If transportType is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If transportType is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);

            // Get the text content of the type cell
            const actualTripType = await this.TripType_cell.textContent();

            // Validate that the transport type matches the expected transport type
            expect(actualTripType.trim()).toBe(tripType);
        }
    }

    /**
     * This method verifies the 'Method of Payment' on the 'View Online Referral' page
     * @param {*} time Expected Method of Payment
     */
    async ValidateMethodOfPayment(methodOfPayment) {
        // Check if the MethodOfPayment cell is visible
        const isVisible = await this.MethodOfPayment.isVisible();

        if (!methodOfPayment) {
            // If methodOfPayment is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If methodOfPayment is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);

            // Get the text content of the method of payment cell
            const actualMethodOfPayment = await this.MethodOfPayment.textContent();

            // Validate that the method of payment matches the expected method of payment
            expect(actualMethodOfPayment.trim()).toBe(methodOfPayment);
        }
    }

    /**
     * This method validates the PickUpLocation fields on the 'View Online Referral' page
     * @param {*} AddressName Expected Address Name
     * @param {*} Address Expected Address
     */
    async ValidatePickUpLocation(AddressName, Address) {
        // Check if the PickUpLocation_Name cell is visible
        const isNameVisible = await this.PickUpLocation_Name.isVisible();

        // Check if the PickUpLocation_Address cell is visible
        const isAddressVisible = await this.PickUpLocation_Address.isVisible();

        // If AddressName is defined, assert that the PickUpLocation_Name cell should be visible
        if (AddressName) {
            expect(isNameVisible).toBe(true);
            // Locate the cell containing the address name
            const actualAddressName = await this.PickUpLocation_Name.textContent();
            // Truncate AddressName to the first 50 characters if it has more than 50 characters
            const truncatedAddressName = AddressName.length > 50 ? AddressName.substring(0, 50) : AddressName;
            // Validate that the address name matches the expected address name
            expect(actualAddressName.trim()).toContain(truncatedAddressName);
        } else {
            // If AddressName is null or not defined, assert that the cell should not be visible
            expect(isNameVisible).toBe(false);
        }

        // If Address is defined, assert that the PickUpLocation_Address cell should be visible
        if (Address) {
            expect(isAddressVisible).toBe(true);
            // Locate the cell containing the address
            const actualAddress = await this.PickUpLocation_Address.textContent();
            // Validate that the address matches the expected address
            expect(actualAddress.trim()).toContain(Address);
        } else {
            // If Address is null or not defined, assert that the cell should not be visible
            expect(isAddressVisible).toBe(false);
        }

    }

    /**
     * This method validates the DropOffLocation fields on the 'View Online Referral' page
     * @param {*} AddressName Expected Address Name
     * @param {*} Address Expected Address
     */
    async ValidateDropOffLocation(AddressName, Address) {
        // Check if the DropOffLocation_Name cell is visible
        const isNameVisible = await this.DropOffLocation_Name.isVisible();

        // Check if the DropOffLocation_Address cell is visible
        const isAddressVisible = await this.DropOffLocation_Address.isVisible();

        // If AddressName is defined, assert that the DropOffLocation_Name cell should be visible   
        if (AddressName) {
            expect(isNameVisible).toBe(true);
            // Locate the cell containing the address name
            const actualAddressName = await this.DropOffLocation_Name.textContent();
            // Truncate AddressName to the first 50 characters if it has more than 50 characters
            const truncatedAddressName = AddressName.length > 50 ? AddressName.substring(0, 50) : AddressName;
            // Validate that the address name matches the expected address name
            expect(actualAddressName.trim()).toContain(truncatedAddressName);
        } else {
            // If AddressName is null or not defined, assert that the cell should not be visible
            expect(isNameVisible).toBe(false);
        }
        if (Address) {
            expect(isAddressVisible).toBe(true);
            // Locate the cell containing the address
            const actualAddress = await this.DropOffLocation_Address.textContent();
            // Validate that the address matches the expected address
            expect(actualAddress.trim()).toContain(Address);
        } else {
            // If Address is null or not defined, assert that the cell should not be visible
            expect(isAddressVisible).toBe(false);
        }
    }

    /**
    * This method validates the 'Has Key' field on the 'View Online Referral' page
    * @param {*} key Expected key value like 'Yes'/'No'/'Not Specified'
    */
    async ValidateHasKey(key) {
        // Check if the HasKey_Cell is visible
        const isVisible = await this.HasKey_Cell.isVisible();
        if (key === 'Not Specified') {
            // If key is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If key is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);
            // Get the text content of the key cell
            const actualKey = await this.HasKey_Cell.textContent();
            // Validate that the key matches the expected key
            expect(actualKey.trim()).toBe(key);
        }
    }

    /**
     * This method validates the 'Narrow Driveway' field on the 'View Online Referral' page
     * @param {*} narrowDriveway Expected narrowDriveway value like 'Yes'/'No'/'Not Specified'
     */
    async ValidateNarrowDriveway(narrowDriveway) {
        // Check if the NarrowDriveway_cell is visible
        const isVisible = await this.NarrowDriveway_cell.isVisible();
        if (narrowDriveway === 'Not Specified') {
            // If narrowDriveway is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If narrowDriveway is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);
            // Get the text content of the narrowDriveway cell
            const actualNarrowDriveway = await this.NarrowDriveway_cell.textContent();
            // Validate that the narrowDriveway matches the expected narrowDriveway
            expect(actualNarrowDriveway.trim()).toBe(narrowDriveway);
        }
    }

    /**
     * This method validates the 'Narrow Hallway' field on the 'View Online Referral' page
     * @param {*} narrowHallway Expected narrowHallway value like 'Yes'/'No'/'Not Specified'
     */
    async ValidateNarrowHallway(narrowHallway) {
        // Check if the NarrowHallway_cell is visible
        const isVisible = await this.NarrowHallway_cell.isVisible();
        if (narrowHallway === 'Not Specified') {
            // If narrowHallway is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If narrowHallway is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);
            // Get the text content of the narrowHallway cell
            const actualNarrowHallway = await this.NarrowHallway_cell.textContent();
            // Validate that the narrowHallway matches the expected narrowHallway
            expect(actualNarrowHallway.trim()).toBe(narrowHallway);
        }
    }

    /**
     * This method validates the 'Medicated Before Transport' field on the 'View Online Ref
     * @param {*} medicatedBeforeTransport Expected medicatedBeforeTransport value like 'Yes'/'No'/'Not Specified'
     */
    async ValidateMedicatedBeforeTransport(medicatedBeforeTransport) {
        // Check if the MedicatedBeforeTransport_cell is visible
        const isVisible = await this.MedicatedBeforeTransport_cell.isVisible();
        if (medicatedBeforeTransport === 'Not Specified') {
            // If medicatedBeforeTransport is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If medicatedBeforeTransport is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);
            // Get the text content of the medicatedBeforeTransport cell
            const actualMedicatedBeforeTransport = await this.MedicatedBeforeTransport_cell.textContent();
            // Validate that the medicatedBeforeTransport matches the expected medicatedBeforeTransport
            expect(actualMedicatedBeforeTransport.trim()).toBe(medicatedBeforeTransport);
        }
    }

    /**
     * This method validates the 'Medications Will Last For' field on the 'View Online Referral' page
     * @param {*} medicationsWillLastFor Expected medicationsWillLastFor value
     */
    async ValidateMedicationsWillLastFor(medicationsWillLastFor) {
        // Check if the MedicationsWillLastFor_cell is visible
        const isVisible = await this.MedicationsWillLastFor_cell.isVisible();
        if (!medicationsWillLastFor) {
            // If medicationsWillLastFor is null or not defined, assert that the cell should not be visible
            expect(isVisible).toBe(false);
        } else {
            // If medicationsWillLastFor is defined, assert that the cell should be visible
            expect(isVisible).toBe(true);
            // Get the text content of the medicationsWillLastFor cell
            const actualMedicationsWillLastFor = await this.MedicationsWillLastFor_cell.textContent();
            // Validate that the medicationsWillLastFor matches the expected medicationsWillLastFor
            expect(actualMedicationsWillLastFor.trim()).toBe(medicationsWillLastFor);
        }
    }

    /**
     * This method validates the Key Transportation Questions on the 'View Online Referral' page
     * @param {*} questionNumber The question number to validate
     * @param {*} answer The expected answer for the question
     */
    async ValidateKeyTransportationQuestions(questionNumber, answer) {
        const questionMap = {
            '1': this.CanGetUpFromBed_cell,
            '2': this.PatientAmbulate_cell,
            '3': this.PatientSitInChairOrWheelchair_cell,
            '4': this.PatientAbletoTolerateTransport_cell,
            '5': this.PatientBedBound_cell,
            '6': this.PatientResidence_cell,
            '7': this.PatientRemainImmobile_cell,
            '8': this.PatientRemainSupine_cell
        };
        const question = questionMap[questionNumber];
        if (!question) {
            throw new Error('Invalid question number');
        }

        const isQuestionVisible = await question.isVisible();

        if (answer === 'Not Specified') {
        // If answer is 'Not Specified', assert that the question should not be visible
        expect(isQuestionVisible).toBe(false);
        } else {
        // If answer is 'Yes' or 'No', assert that the question should be visible
        expect(isQuestionVisible).toBe(true);

        // Get the text content of the question cell
        const actualAnswer = await question.textContent();
        expect(actualAnswer.trim()).toBe(answer);
        }
    }

    /**
     * This method validates the 'Notes' field on the 'View Online Referral' page
     * @param {*} notes Expected notes
     */
    async ValidateTransportation_Notes (notes) {
       const actualNotes = await this.TranspNotes_cell.textContent();
         expect(actualNotes.trim()).toContain(notes);
    }

    /**
     * This method validates the 'Directions' field on the 'View Online Referral' page
     * @param {*} directions Expected directions
     */
    async ValidateDirections(directions) {
        const actualDirections = await this.Directions_cell.textContent();
        expect(actualDirections.trim()).toContain(directions);
    }

    /**
     * This method validates the 'Number of Steps Inside' field on the 'View Online Referral' page
     * @param {*} numberOfSteps Expected number of steps inside
     */
    async ValidateNumberOfStepsInside(numberOfSteps) {
          await this.numberOfStepsInside_cell.textContent().then((steps) => {
            expect(steps.trim()).toBe(numberOfSteps);
        });
    }

    /**
     * This method validates the 'Number of Steps Outside' field on the 'View Online Referral' page
     * @param {*} numberOfSteps Expected number of steps outside
     */
    async ValidateNumberOfStepsOutside(numberOfSteps) {
        await this.numberOfStepsOutside_cell.textContent().then((steps) => {
            expect(steps.trim()).toBe(numberOfSteps);
        });
    }
}