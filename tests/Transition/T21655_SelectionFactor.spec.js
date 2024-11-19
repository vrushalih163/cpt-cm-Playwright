//Author - Nagapradeep Kolasani Date: 11th November 2024
//Modified - Rajakumar Maste Date: 19th November, 2024
import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { ProviderTab } from '../../pages/Transition_Pages/ProviderTabPage';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';

var { QAProvider1, QAProvider2, TransitionlaunchUrl } = process.env;
const ReferralType = 'Automation - With Selection Factor';
const ReferralType1 = 'Automation - Without Selection Factor';
const SelectionFactor = 'Active with Agency';
const SelectionFcator1 = 'Cost';

var QAProvider1 = QAProvider1.replace("Allscripts ", "");// Output: "Provider Online (226537)"
var QAProvider2 = QAProvider2.replace("Allscripts ", "");// Output: "Provider Online Second"

test('Transition - Support Selection Factors', async ({ }) => {
  // Step 1: Launch EPIC on FHIR or Transition application
  const Library = new LIB();

  const newPage = await Library.HandleAppLaunch('Grand Central, John', 'E3228', 'Manage Referrals', TransitionlaunchUrl);
  const MngReferral = new ManageReferral(newPage);

  // Create a referral with selection factor
  await MngReferral.CreateNewReferral(ReferralType);

  // Step 2: Select the provider and send the referral
  const providerSearch = new ProviderSearchPage(newPage);
  const TranContextNav = new TransitionContextNavigator(newPage);
  await providerSearch.ClickSearchProviderButton();
  await providerSearch.SearchProvider(QAProvider1);
  await newPage.waitForTimeout(2000);
  await TranContextNav.ClickProviderSearchIcon();
  await providerSearch.SearchProvider(QAProvider2);
  await TranContextNav.ClickSendReferralButton();
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForTimeout(12000);
  await MngReferral.ClickFirstReferral();

  const Provdertab = new ProviderTab(newPage);
  // Step 3: Validate Place Referral modal
  await Provdertab.Click_EllipseIcon(0);
  await Provdertab.Click_PlaceReferral();
  await newPage.waitForTimeout(2000);

  // Step 4: Validate Selection Factors dropdown
  await Provdertab.SelectionFactor_ValidationMessage();
  await Provdertab.PlaceBtn_Disabled();
  await Provdertab.SelectedProvider_Dropdown(QAProvider1);
  await Provdertab.SelectionFactors_dropdown_Enabled();
  await Provdertab.SelectionFactor_OptionSelection(SelectionFactor);
  await Provdertab.PlaceBtn_Enabled();
  await Provdertab.PlaceBtn_Click();
  await Provdertab.ReferralPlaced_ToastMessage();

  //Placed label visibility
  await Provdertab.PlacedLabel_Visible();
  
  // Step 10, 11 and 12: Click on Edit icon for Selection Factors on Providers tab
  //Edit icon click
  await Provdertab.EditIcon_Click();  
  await Provdertab.SelectionFactor_ValidationOnEditModal();
  await Provdertab.SelectionFactor_OptionSelection(SelectionFcator1);
  await Provdertab.UpdateSelectionFactorsBtn_Click();
  await Provdertab.PlacedLabel_Visible();

  // Step 7 and 13: Click on Action ellipse for Provider (QAProvider1) and Unplace the Referral
  await Provdertab.Click_EllipseIcon(0);
  await Provdertab.Click_UnPlaceReferral();
  await Provdertab.UnPlaceBtn_Click();
  await Provdertab.ReferralUnPlaced_ToastMessage();
  await Provdertab.PlaceLabel_NotVisible();
  await newPage.waitForTimeout(2000);

  //Step 5: Choose the Placement option as "None" from Selected Provider dropdown and validate the Selection Factors dropdown
  //Place the referral with None
  await Provdertab.Click_EllipseIcon(0);
  await Provdertab.Click_PlaceReferral();
  await Provdertab.PlaceBtn_Disabled();

  await Provdertab.SelectedProvider_Dropdown('None');
  await Provdertab.SelectionFactors_dropdown_Disabled();
  await Provdertab.PlaceBtn_Enabled();
  await Provdertab.PlaceBtn_Click();
  await Provdertab.PlaceLabel_NotVisible();

  // Step 14, 15, 16, 17: Click on Edit icon for Selection Factors on Providers tab
  //Creating referral without selection factor
  await TranContextNav.ClickManageReferralIcon();
  await MngReferral.CreateNewReferral(ReferralType1);
  await providerSearch.ClickSearchProviderButton();
  await providerSearch.SearchProvider(QAProvider1);
  await TranContextNav.ClickSendReferralButton();
  await MngReferral.ClickFirstReferral();

  //ellipse icon click
  await Provdertab.Click_EllipseIcon(0);
  await Provdertab.Click_PlaceReferral();
  await Provdertab.SelectionFactor_dropdown_NotVisible();
  await Provdertab.PlaceBtn_Click();
  await Provdertab.ReferralPlaced_ToastMessage();
  await Provdertab.PlaceLabel_NotVisible();

});
