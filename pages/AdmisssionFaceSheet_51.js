//Autor: Rajakumar Maste, Created Date: 16 Aug 2024
import { page, expect } from '@playwright/test';

export class AdmissionFaceSheet{
    constructor(page){
        this.page = page;
        this.TransitionDignosis_Link = page.getByRole('link', { name: 'Transition Diagnostics' });
        this.taskDetails_Link = page.getByRole('link', { name: 'Task Details' });
    }

    /**
     * Click on Transition Diagnostics link
     */
    async TransitionDignosis_LinkClick(){
        await this.TransitionDignosis_Link.click();
        return this.page;
    }

    /**
     * Click on Task Details link
     */
    async TaskDetailsLinkClick(){
        await this.taskDetails_Link.click();
        return this.page;
    }    

}