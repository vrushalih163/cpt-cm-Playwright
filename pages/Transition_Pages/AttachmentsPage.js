// Author - Vrushali Honnatti Date:7th August, 2024
import fs from 'fs';

export class AttachmentsPage {
    constructor(page) {
        this.page = page;
        this.AddAttachment_button = page.getByText('add_circle_outline').first();
        this.Attachment_checkbox = page.locator('xpath=//mat-checkbox[contains(@id,"mat-checkbox")]//label[contains(@class,"mat-checkbox-layout")]//span[contains(@class,"mat-checkbox-inner-container")]');
        
        //row action controls
        this.AnchorMoreVert = page.locator('#anchorMoreVert');
        this.Delete_menuItem = page.getByRole('menuitem', { name: 'Delete' });
        this.View_menuItem = page.getByRole('menuitem', { name: 'View' });
        this.Cancel_button = page.getByRole('button', { name: 'Cancel' });
        this.Delete_button = page.getByRole('button', { name: 'Delete' });

        //attachment popup controls
        this.AttachmentDesc_textbox = page.getByLabel('Add the description here');
        this.Add_button = page.getByRole('button', { name: 'Add' });
    }

    async ClickAddAttachmentButton() {
        await this.AddAttachment_button.click();
    }

    async ClickAttachmentCheckBox(index) {
        await this.Attachment_checkbox.nth(index).click();;
    }

    async UploadFile(filePath) {
        const buffer = fs.readFileSync(filePath);

        // Create a DataTransfer object with the file
        const dataTransfer = await this.page.evaluateHandle((data) => {
            const dt = new DataTransfer();
            const file = new File([data], 'file.pdf', { type: 'application/pdf' });
            dt.items.add(file);
            return dt;
        }, buffer);

        // Dispatch the drop event with the DataTransfer object
        const dropZone = await this.page.locator('xpath=//h1[text()="Drag & Drop"][1]');
        await dropZone.dispatchEvent('drop', { dataTransfer });
    }

    async SelectAttachment() {
        await this.AttachmentDesc_textbox.click();
        await this.AttachmentDesc_textbox.fill('test automation');
        await this.Add_button.click();
        await this.page.waitForTimeout(5000);
    }

    async DeleteAttachment() {
        await this.AnchorMoreVert.first().click();
        await this.Delete_menuItem.click();
        await this.Delete_button.click();
    }

    async CancelDeleteAttachment() {
        await this.AnchorMoreVert.first().click();
        await this.Delete_menuItem.click();
        await this.Cancel_button.click();
    }
}