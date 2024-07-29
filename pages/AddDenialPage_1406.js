// Author - Vrushali Honnatti Date:10th July, 2024
export class AddDenialPage {
//exports.LoginPage = class PatientdefaultviewsPage {

constructor(page) {
      this.page = page;
      this.assignedUser_textbox = page.getByRole('link', { name: 'Add a Patient' });
      
}

async  fillAssignedUser(assignedUser){
        
      await this.assignedUser_textbox.fill(assignedUser);
           
}

}