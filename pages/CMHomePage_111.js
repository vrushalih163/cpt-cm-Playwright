import { time } from "console";

// Author - Micho Eshete Date: 08/23/2024
export class CMHomePage {
    constructor(page) {
        this.page = page;
        this.cards_queue_count = (cardText) => page.locator(`app-queue-count-card:has-text("${cardText}")`);
        
    }


    /**
     * Clicks on a card on the home page identified by cardText.
     * 
     * cardText - The text of the card to click.
     * pagePromise - A promise that resolves to the page that opened in a new tab, if applicable.
     */
    async clickCardsOnHomePage(cardText) {
        let pagePromise;
        if (cardText === 'Online Help') {
            pagePromise = this.page.waitForEvent('popup');
        }
        await this.cards_queue_count(cardText).click({timeout: 20000});
        let page;
        if (pagePromise) {
            page = await pagePromise;
            await page.waitForLoadState('domcontentloaded');
        }
        return page;
    }

    /**
     * Verifies that the specified card is not displayed on the home page basend on the configeration.
     * 
     * cardText - The text of the card to verify is not displayed.
     */
    async verifyCardNotDisplayed(cardText) {
        await expect(this.cards_queue_count(cardText)).not.toBeVisible();
    }


}

