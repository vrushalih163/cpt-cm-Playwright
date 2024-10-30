// Author - Vrushali Honnatti Date:10th July, 2024
import { page, Locator, expect } from '@playwright/test';
import { time } from 'console';
export class ApplicationNavigator {

  constructor(page, page2) {
    this.page = page;
    this.page2 = page2;

    this.refresh_link = page.getByRole('link', { name: 'PageHeader$IonHeaderRefreshButton' });
    this.manage_link = page.getByRole('link', { name: ' Manage' });
    this.admin_icon = page.getByRole('link', { name: ' Admin' });
    this.orglookup_link = page.getByRole('link', { name: 'Organization Lookup' });

    this.patients_link = page.getByRole('link', { name: 'Patients ' });
    this.patientsdefaultview_link = page.getByRole('link', { name: 'Patients Default View' });

    this.Admission_link = page.getByRole('link', { name: 'Admissions ' });
    this.AdmissionDefaultView_link = page.getByRole('link', { name: 'Admissions Default View' });

    this.IncomingReferrals_link = page.getByRole('link', { name: 'Incoming Referrals ' });
    this.IncomingReferralsEnhancedView_link = page.getByRole('link', { name: 'Incoming Referrals View -' });

    //this.home_link = page.getByRole('link', { name: ' Home' });
    this.home_link = page.locator('a#MenuBar_Home_Header');
    this.changeOrg_link = page.getByRole('link', { name: 'Change Organization' });

    //Configure icon 
    this.configure_link = page.locator('#MenuBar_Configure_Header');

    //Discharge planning link
    this.DischargePlanning_link = page.locator('//a[@data-id="Configure_Header_Configure_Header_Menu_Discharge Planning"]');

    //Referral type editor link
    this.ReferralTypeEditor_link = page.getByRole('link', { name: 'Referral Type Editor' });

    //Referral configuration link
    this.ReferralConfiguration_link = page.getByRole('link', { name: 'Referral Configuration' });

    // configure - Security menu links 
    this.configure_link = page.locator('#MenuBar_Configure_Header');
    this.menu_security = page.locator('#Configure_Header_Configure_Header_Menu_Security');
    this.address_filters_link = page.locator('a[name="security_address_filters"]');
    this.certificates_link = page.locator('a[name="security_certificates"]');
    this.security_configuration_link = page.locator('a[name="security_security_configuration"]');
    this.users_link = page.locator('a[name="security_users"]');
   
    // User Admins navigation back links
    this.top_Nav_Back_Links = page.locator('//td[@class="clsTopNavBackLinks"]/a');

    // Help menu links
    this.home_link = page.locator('a#MenuBar_Home_Header');
    this.changeOrg_link = page.locator('a[name*="home_change_organization"]'); 
    this.help_link = page.locator('#MenuBar_Help_Header');
    this.menu_bar_links = (menuName) => page.locator(`a[class="ion-submenu-link"]:has-text("${menuName}")`);

    // RM Online Help page title
    this.page_title = (page) =>page.frameLocator('#LoadHelpPage').locator('h1.home');
   
    //Contact List
    this.contactList_link = page.getByRole('link', { name: 'Contact List', exact: true });

    this.logOff_link = page.locator('//a[@title="Logoff"]');


    //Referral lookup link
    this.ReferralLookup_link = page.getByRole('link', { name: 'Referral Lookup' });

    //Save Popup Modal Controls
    this.SaveContinue_button = page.locator(`//div[@class='ion-modal-footer-panel']/button[.='Save and Continue']`);
  }

  async clickRefresh() {
    await this.refresh_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async NavigateToPatientsDefaultView() {

    await this.manage_link.click();
    await this.patients_link.click();
    await this.patientsdefaultview_link.click();
  }

  async NavigateToAdmissionDefaultView() {
    await this.page.waitForTimeout(3000);
    await this.manage_link.click();
    await this.Admission_link.click();
    await this.page.waitForTimeout(500);
    await this.AdmissionDefaultView_link.click();
  }

  async NavigateToIncomingReferralsEnhancedView() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    await this.manage_link.click();
    await this.IncomingReferrals_link.click();
    await this.IncomingReferralsEnhancedView_link.click();
  }

  async NavigateToChangeOrg(orgName) {
    
    await this.home_link.click();
    await this.page.waitForTimeout(2000);
    await this.changeOrg_link.click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: orgName, exact: true }).click();
    //await this.page.locator("//a[text()='${orgName}']").click();
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForTimeout(7000);
    return this.page;
  }

  /**
   * Navigate to Discharge Planning -> Referral Type Editor
   */
  async NavigateToReferralTypeEditor() {
    await this.configure_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.DischargePlanning_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.ReferralTypeEditor_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return this.page;
  }

  /**
   * Navigate to Discharge Planning -> Referral Configuration
   */
  async NavigateToReferralConfiguration() {
    await this.configure_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.DischargePlanning_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.ReferralConfiguration_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return this.page;
  }

  /**
   * Navigate to Configure -> Contact List
   */
  async NavigateToContactList() {
    await this.configure_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.contactList_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
  /**
 * Clicks the security navigation elements based on the provided element names.
 */
async ConfigureSecurityNavigation(elementNames) {
  const elementMap = {
    configureLink: this.configure_link,
    menuSecurity: this.menu_security,
    usersLink: this.users_link,
    addressFiltersLink: this.address_filters_link,
    certificatesLink: this.certificates_link,
    securityConfigurationLink: this.security_configuration_link
  };

  const elementsToClick = elementNames.map(name => elementMap[name]).filter(Boolean);

  await this.clickElement(elementsToClick);
}


/**
 * Clicks on an array of elements.
 * 
 */
async clickElement(elements) {
  for (const element of elements) {
    try {
      await element.click();
    } catch (error) {
      console.error(`Failed to click on element: ${element}`, error);
    }
  }
  await this.page.waitForTimeout(2000);
}
 
/**
 * Clicks on the top navigation back links with the specified name.
 * 
 * @param {string} name - The name of the link to click.
 * @throws {Error} - If no link is found with the specified name.
 */
 async clickTopNavBackLinks(name) {
  const allLinks = await this.top_Nav_Back_Links.elementHandles();
  for (const link of allLinks) {
    const linkText = await link.innerText();
    if (linkText.trim() === name) {
      await link.click();
      await this.page.waitForLoadState('domcontentloaded');
      return;
    }
  }
  throw new Error(`No link found with name: ${name}`);
}
  /**   * Navigate to Referral Lookup   */
  async navigateToReferralLookup() {
    await this.manage_link.click();
    await this.ReferralLookup_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
}

async LogOff() {
  await this.logOff_link.click();
}


  /**
   * Navigate to the online Help left navigation icon page based on the menu name
   * @param {string} menuName - The name of the menu item to click
   */
async navigateToOnlineHelp(menuName) {
  // Check if Help menu is loaded and visible
  await expect(this.help_link).toHaveText('Help');
  await this.help_link.click();
  const pagePromise = this.page.waitForEvent('popup');
  await this.menu_bar_links(menuName).click({timeout: 20000});
  const page = await pagePromise;
  await this.page.waitForLoadState('domcontentloaded');
  return page;
}
 
/**
   * Assert that RM online help page contains the expected text
   * @param {page} page - The new page object
   * @param {string} expectedText - The expected text to verify
   */
async assertOnlineHelpPageContainsText(page, expectedText) {

  await expect(this.page_title(page)).toContainText(expectedText);
}
async adminOrgLookupNavigation(){
  // Click on Admin link
  this.admin_icon.click();
  this.page.waitForTimeout(2000);

  // Click on Organization Lookup link
  this.orglookup_link.click();
  this.page.waitForTimeout(2000);
}

/**
 * Click on the Save and Continue button on the Save Popup Modal
 */
async SaveContinue() {
  await this.page.waitForTimeout(2000);
  await this.SaveContinue_button.click();
  await this.page.waitForTimeout(2000);
}


/**
    * Navigates to Facilities page
    */ 
async NavigatetoFacilities() {  
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(5000);
  await this.configure_link.click();
  await this.page.waitForTimeout(2000);
  await this.Facilities_link.click();
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(3000);
}

} 




