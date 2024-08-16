//Autor: Rajakumar Maste, Created Date: 16 Aug 2024

export class AdmissionFaceSheet{
    constructor(page){
        this.page = page;
        this.TransitionDignosis_Link = page.getByRole('link', { name: 'Transition Diagnostics' });
    }

    /**
     * Click on Transition Diagnostics link
     */
    async TransitionDignosis_LinkClick(){
        await this.TransitionDignosis_Link.click();
        return this.page;
    }

}