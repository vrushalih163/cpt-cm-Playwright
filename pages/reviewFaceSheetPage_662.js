// Author - Vrushali Honnatti Date:22nd July, 2024
export class ReviewFaceSheetPage {

    constructor(page) {
        this.page = page;
        this.reviewType_dropdown = page.locator('#ddReviewTypes');
        this.next_button = page.getByRole('button', { name: 'Next' });

    }

    async SelectReviewType(reviewName) {

        await this.reviewType_dropdown.selectOption(reviewName);

    }

    async ClickNext() {

        await this.next_button.click();
    }


}