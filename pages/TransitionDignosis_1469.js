//Author - Rajakumar Maste, Created Date:16th Aug, 2024

export class TransitionDignosis {
    constructor(page) {
        this.page = page;
        this.NavigatorDropdown_click = page.getByLabel('Select Navigation Page').locator('span');

    }

    /**
     * This function is used to selecting options present in 'Select Navigation Page' dropdown 
     * @param {*} option 
     */
    async SelectNavigationPage_Dropdown(option) {
        await this.NavigatorDropdown_click.click();
        await this.page.getByRole('option', { name: option }).locator('span').click();
        return this.page;
    }
}
