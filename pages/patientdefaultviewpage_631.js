// Author - Vrushali Honnatti Date:10th July, 2024
//Modified By - Rajakumar Maste, Modified Date: 11 Sept 2024
//comment - Edited the SearchPatientByMRN method
import { expect } from '@playwright/test';
export class PatientdefaultviewPage {

      constructor(page) {
            this.page = page;
            this.addapatient_link = page.getByRole('link', { name: 'Add a Patient' });
            this.action_dropdownbox = page.locator('select[onchange="ValidateAndTriggerPostback();"]');
            this.Default_button = page.locator('#ViewSearchBar_ViewSearchClearButton');
      }

      async clickaddapatient() {
            await this.addapatient_link.click();
      }

      //Method to select item from actions dropdown

      async NavigateActionDDBox(action) {
            await this.action_dropdownbox.selectOption(action)
            this.page.waitForTimeout(2000);
            //await this.page.getByText(action).click();
      }

      /**
   * Selects an option from the Navigate Action dropdown box.
   *
   * @param {string} optionText - The text of the option to select.
   * @returns {Promise<void>}
   */
  async selectOptionFromActionDropDown(optionText) {
      //try {
        //console.log(`Attempting to select option: ${optionText} from Navigate Action dropdown box`);
   
        // Select the option by its visible text
        await this.action_dropdownbox.click();
        await this.page.waitForTimeout(2000);
        await this.action_dropdownbox.selectOption({ label: optionText });
        await this.page.waitForTimeout(2000);
   /*
        // Verify the option is selected
        const selectedOptionText = await this.page.evaluate(
            (dropdown, optionText) => {
                  const selectOption = Array.from(dropdown.options).find(option => option.selected);
                  return selectOption ? selectOption.text : null;
            },
            await this.action_dropdownbox.elementHandle(),
            optionText
        );
        expect(selectedOptionText).toBe(optionText);
   
        console.log(`Successfully selected option: ${optionText} from Navigate Action dropdown box`);
      } catch (error) {
        console.error(`Failed to select option: ${optionText} from Navigate Action dropdown box`, error);
        throw error;
}
        **/
    }

      //Method to search patient by MRN
      async SearchPatientByMRN(MRN) {
            //if (await this.page.locator('#viewsearchminimizedlink'))
           //       await this.page.locator('#viewsearchmaximizedlink').click();
            //if (await this.page.getByRole('link', { name: 'Maximize Panel' }));
            await this.page.waitForTimeout(2000);
            try {
                  //console.log(`Searching for patient with MRN: ${MRN}`);
 
                  const minimizedLink = this.page.locator('a#viewsearchmaximizedlink[onclick="return ViewSearchBar_ShowPanel();"]');
                  if (await minimizedLink.isVisible()) {
                        await this.page.locator('a#viewsearchmaximizedlink[onclick="return ViewSearchBar_ShowPanel();"]').click();
                  }

            //await this.page.getByRole('link', { name: 'Maximize Panel' }).click();
            await this.page.waitForTimeout(2000);
            await this.Default_button.click();
            await this.page.locator('#ViewSearchBar_MRN').fill(MRN);
            await this.page.getByRole('button', { name: 'Search' }).click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);

            } catch (error) {
                  console.error(`Failed to search for patient with MRN: ${MRN}`, error);
                  throw error;
            }

      }

}